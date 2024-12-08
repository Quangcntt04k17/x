
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Manager
from .serializers import ManagerSerializer



class ManagerProfileView(APIView):
    # Không cần thêm `permission_classes` ở đây nếu middleware đã xác thực
    def get(self, request):
        if not request.manager:
            return Response({'error': 'Unauthorized'}, status=401)

        # Lấy thông tin người dùng từ request.Manager
        manager_data = ManagerSerializer(request.manager)
        print("hello")

        print("hi")
        return Response({'Manager': manager_data.data}, status=200)

class CreateManagerView(APIView):
    permission_classes = [AllowAny]  #Cho phép tất cả người dùng truy cập
    print(6)
    def post(self, request):
        serializer = ManagerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateManagerView(APIView):
    
    def put(self, request):
        #Dữ liệu người dùng đã đăng nhập từ request.manager
        manager = request.manager
        print("ahhh")
        serializer = ManagerSerializer(manager, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
         #Dữ liệu người dùng đã đăng nhập từ request.Manager
        manager = request.manager
        print("bad")
        serializer = ManagerSerializer(manager, data=request.data, partial=True)   #partial=True cho phép cập nhật một phần

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from django.contrib.auth.hashers import check_password
class LoginView(APIView):
    permission_classes = [AllowAny]  
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            manager = Manager.objects.get(email=email)
            
            # Sử dụng check_password để xác thực mật khẩu
            if check_password(password, manager.password):
                serializer = ManagerSerializer(manager)
                refresh = RefreshToken.for_user(manager)
                access_token = str(refresh.access_token)  
                refresh_token = str(refresh) 
                return Response(
                    {
                        "message": "Login successful!",
                        "Manager": serializer.data,
                        "access_token": access_token,
                        "refresh_token": refresh_token 
                    }, 
                    status=status.HTTP_200_OK
                )
            else:
                return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)
        except Manager.DoesNotExist:
            return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)

        

class GetAccountsView(APIView):
   

    def get(self, request):
        # Kiểm tra tài khoản hiện tại có is_active không
        if not request.user.is_active:
            return Response({'detail': 'Tài khoản của bạn không được kích hoạt.'}, status=403)

        # Lấy danh sách tài khoản admin có is_active = True
        admin_accounts = Manager.objects.filter(is_active=True)
        admin_data = ManagerSerializer(admin_accounts, many=True).data
        return Response({'admins': admin_data}, status=200)
    
from .models import BlacklistedToken


class LogoutView(APIView):
    def post(self, request):
        try:
            # Lấy refresh_token từ request data
            refresh_token = request.data.get("refresh_token")

            if refresh_token:
                # Kiểm tra nếu refresh_token đã có trong blacklist
                if BlacklistedToken.objects.filter(token=refresh_token).exists():
                    return Response({"message": "Token has already been blacklisted."}, status=status.HTTP_400_BAD_REQUEST)
                
                # Nếu không có, tạo mới đối tượng BlacklistedToken
                BlacklistedToken.objects.create(token=refresh_token)
                print('Token added to blacklist')

                # Trả về thông báo logout thành công
                return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "No refresh token provided"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# tạo access token mới nếu mà refresh token có tồn tại trong blacklist
# thì không tạo access token mới

class TokenRefreshView(APIView):
    permission_classes = [AllowAny]  
    def post(self, request):
        refresh_token = request.data.get("refresh_token")
        
        print('dong1')

        # Kiểm tra refresh token có tồn tại
        if not refresh_token:
            return Response({"error": "No refresh token provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Kiểm tra refresh token trong danh sách blacklist
        if BlacklistedToken.objects.filter(token=refresh_token).exists():
            return Response({"error": "This token has been blacklisted"}, status=status.HTTP_401_UNAUTHORIZED)
        
        print('dong2')

        try:
            # Xác thực và tạo access token mới
            token = RefreshToken(refresh_token)
            new_access_token = str(token.access_token)
            return Response({
                "access_token": new_access_token,
                "refresh_token": refresh_token  # Giữ lại refresh token cũ
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)

