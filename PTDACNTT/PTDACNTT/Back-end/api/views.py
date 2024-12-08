from django.shortcuts import render
from .serializers import BacSiSerializer,BenhNhanSerializer,HoSoBenhAnSerializer
from .models import BacSi,BenhNhan,HoSoBenhAn
# from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime

import requests #pip install requests , thu vien tra ve api tren http


# render ra view

class BacSiAPI(APIView):

    def get(self,request, id = None):
        if (id is not None):  # Nếu có id, lấy đối tượng cụ thể
            try:
                bac_si = BacSi.objects.get(id=id)
                serializer = BacSiSerializer(bac_si)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except BacSi.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:  # Nếu không có id, trả về tất cả
            bacsi = BacSi.objects.all()
            serializer = BacSiSerializer(bacsi,many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BacSiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # update Data
    def put(self, request, id):
        try:
            bac_si = BacSi.objects.get(id=id)
        except BacSi.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = BacSiSerializer(bac_si, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #delete data
    def delete(self, request, id):
        try:
            bac_si = BacSi.objects.get(id=id)
        except BacSi.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        bac_si.delete()
        return Response("Da xoa thanh cong",status=status.HTTP_204_NO_CONTENT)
    

class BenhNhanAPI(APIView):

    # get all infor
    def get(self, request):

        id = request.query_params.get('id', None)

        if id is not None:  # Nếu có id, lấy đối tượng cụ thể
            try:
                benh_nhan = BenhNhan.objects.get(id=id)
                serializer = BenhNhanSerializer(benh_nhan)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except BenhNhan.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:  # Nếu không có id, trả về tất cả
            queryset = BenhNhan.objects.all()
            serializer = BenhNhanSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # create data
    def post(self, request):
        serializer = BenhNhanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # update Data
    def put(self, request, id):
        try:
            benh_nhan = BenhNhan.objects.get(id=id)
        except BenhNhan.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = BenhNhanSerializer(benh_nhan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #delete data
    def delete(self, request, id):
        try:
            benh_nhan = BenhNhan.objects.get(id=id)
            benh_nhan.delete()
            return Response({'message': 'successful deleted'}, status=status.HTTP_200_OK)
        except BenhNhan.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    

    
class HoSoBenhAnAPI(APIView):

    
    def get(self, request):
        # Lấy các tham số từ query params
        id = request.query_params.get('id', None)
        ngay = request.query_params.get('ngay', None)
        
        if id is not None:  # Nếu có id, lấy hồ sơ bệnh án hoặc bệnh nhân cụ thể
            try:
                ho_so = HoSoBenhAn.objects.get(id=id)
                serializer = HoSoBenhAnSerializer(ho_so)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except HoSoBenhAn.DoesNotExist:
                return Response({"error": "Không tìm thấy hồ sơ bệnh án"}, status=status.HTTP_404_NOT_FOUND)
        elif ngay is not None:  # Nếu có ngày, lọc hồ sơ theo ngày khám
            try:
                # Định dạng ngày: 'YYYY-MM-DD'
                ngay_kham = datetime.strptime(ngay, '%Y-%m-%d').date()
                
                # Lọc hồ sơ theo ngày khám
                queryset = HoSoBenhAn.objects.filter(thoiGianKham__date=ngay_kham)
                
                serializer = HoSoBenhAnSerializer(queryset, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ValueError:
                return Response({"error": "Định dạng ngày không hợp lệ. Định dạng đúng: YYYY-MM-DD"}, status=status.HTTP_400_BAD_REQUEST)

        else:  
            # Trường hợp không có id và ngày, lấy tất cả hồ sơ bệnh án
            order = request.query_params.get('order', None)  # Lấy tham số 'order' từ query params
            queryset = HoSoBenhAn.objects.all()

            # Sắp xếp theo tham số 'order'
            if order == 'asc':
                queryset = queryset.order_by('thoiGianKham')  # Tăng dần
            elif order == 'desc':
                queryset = queryset.order_by('-thoiGianKham')  # Giảm dần

            serializer = HoSoBenhAnSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        

    def post(self, request):
        serializer = HoSoBenhAnSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # update Data
    def put(self, request, id):
        try:
            ho_so = HoSoBenhAn.objects.get(id=id)
        except HoSoBenhAn.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = HoSoBenhAnSerializer(ho_so, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #delete data
    def delete(self, request, id):
        try:
            ho_so = HoSoBenhAn.objects.get(id=id)
        except HoSoBenhAn.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        ho_so.delete()
        return Response("Da xoa thanh cong",status=status.HTTP_204_NO_CONTENT)





from django.utils.dateparse import parse_date
# khoang ngay // cai o duoi đổ dữ liệu vào templates de test cai thứ 2 ở dưới trả về dữ liệu

# def ho_so_benh_an_theo_khoang_ngay(request):
#     ngay_bat_dau = request.GET.get('ngay_bat_dau')
#     ngay_ket_thuc = request.GET.get('ngay_ket_thuc')
#     ho_so_benh_an = []

#     if ngay_bat_dau and ngay_ket_thuc:
#         # Chuyển đổi chuỗi sang đối tượng datetime
#         ngay_bat_dau = parse_date(ngay_bat_dau)
#         ngay_ket_thuc = parse_date(ngay_ket_thuc)

#         # Lọc hồ sơ theo khoảng thời gian
#         ho_so_benh_an = HoSoBenhAn.objects.filter(
#             thoiGianKham__date__gte=ngay_bat_dau,
#             thoiGianKham__date__lte=ngay_ket_thuc
#         )

#     context = {
#         'ho_so_benh_an': ho_so_benh_an,
#         'ngay_bat_dau': ngay_bat_dau,
#         'ngay_ket_thuc': ngay_ket_thuc
#     }
#     return render(request, 'ho_so_khoang_ngay.html', context)


from rest_framework.decorators import api_view
@api_view(['GET'])
def ho_so_benh_an_theo_khoang_ngay(request):
    ngay_bat_dau = request.GET.get('ngay_bat_dau')
    ngay_ket_thuc = request.GET.get('ngay_ket_thuc')

    try:
        if ngay_bat_dau and ngay_ket_thuc:
            # Chuyển đổi chuỗi sang đối tượng datetime
            ngay_bat_dau = parse_date(ngay_bat_dau)
            ngay_ket_thuc = parse_date(ngay_ket_thuc)

            if ngay_bat_dau and ngay_ket_thuc:
                # Lọc hồ sơ theo khoảng thời gian
                ho_so_benh_an = HoSoBenhAn.objects.filter(
                    thoiGianKham__date__gte=ngay_bat_dau,
                    thoiGianKham__date__lte=ngay_ket_thuc
                )
                # Chuyển dữ liệu thành danh sách JSON
                data = list(ho_so_benh_an.values())
            else:
                return Response({'error': 'Ngày bắt đầu hoặc ngày kết thúc không hợp lệ!'}, status=400)
        else:
            return Response({'error': 'Vui lòng cung cấp cả ngày bắt đầu và ngày kết thúc!'}, status=400)

    except Exception as e:
        return Response({'error': str(e)}, status=500)

    # Trả về dữ liệu JSON qua `Response`
    return Response({'ho_so_benh_an': data})


from rest_framework.exceptions import ValidationError



class DanhSachBenhAnView(APIView):
    def get(self, request):
        # Lấy tất cả các bệnh án
        benh_an_list = HoSoBenhAn.objects.all().order_by('-thoiGianKham')  # Sắp xếp theo ngày khám mới nhất
        
        # Nếu bạn muốn lọc theo số CCCD thì dùng đoạn mã dưới
        # so_cccd = request.GET.get('so_cccd', None)
        # if so_cccd:
        #     benh_an_list = benh_an_list.filter(so_cccd__so_cccd=so_cccd)

        # Serialize dữ liệu để trả về
        serializer = HoSoBenhAnSerializer(benh_an_list, many=True)
        return Response({'benh_an': serializer.data}, status=status.HTTP_200_OK)
    
    
class ThemHosoView(APIView):
    
    def post(self, request):
        # In ra dữ liệu nhận được để kiểm tra
        print("Received data:", request.data)

        # Chuyển dữ liệu từ request thành serializer để kiểm tra tính hợp lệ
        serializer = HoSoBenhAnSerializer(data=request.data)
        
        if serializer.is_valid():
            # Nếu dữ liệu hợp lệ, lưu bệnh án và trả về phản hồi thành công
            serializer.save()
            return Response({'message': 'Thêm bệnh án thành công!'}, status=status.HTTP_201_CREATED)
        else:
            # Nếu dữ liệu không hợp lệ, trả về lỗi
            print("Validation errors:", serializer.errors)
            raise ValidationError({'errors': serializer.errors})


class ThemBenhAnView(APIView):
# {
#     "id": "BA12345678",
#     "benhNhan": "1234567890",
#     "thoiGianKham": "2024-11-23T10:00:00Z",
#     "trieuChung": "Ho, sốt, đau họng",
#     "chuanDoan": "Viêm phổi",
#     "dieuTri": "Uống thuốc kháng sinh"
# }

    def post(self, request):
        # Lấy dữ liệu từ request
        data = request.data

        # Kiểm tra xem bệnh nhân có tồn tại không
        try:
            benhnhan = BenhNhan.objects.get(soCCCD=data['soCCCD'])
        except BenhNhan.DoesNotExist:
            raise ValidationError("Bệnh nhân không tồn tại!")

        # Kiểm tra nếu mã bệnh án đã tồn tại
        if HoSoBenhAn.objects.filter(id=data['id']).exists():
            return Response({"detail": "Mã bệnh án đã tồn tại!"}, status=status.HTTP_400_BAD_REQUEST)

        # Khởi tạo serializer với dữ liệu
        serializer = HoSoBenhAnSerializer(data=data)

        # Kiểm tra xem serializer có hợp lệ không
        if serializer.is_valid():
            # Lưu bệnh án và liên kết với bệnh nhân
            serializer.save(soCCCD=benhnhan)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimKiemCCCDView(APIView):
    def get(self, request):
        # Lấy giá trị số CCCD từ tham số truy vấn
        so_cccd = request.GET.get('soCCCD', None)
        
        if so_cccd is None:
            return Response({'error': 'Vui lòng cung cấp số CCCD.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Lọc bệnh án theo số CCCD của bệnh nhân
        benh_an_list = HoSoBenhAn.objects.filter(benhNhan__soCCCD=so_cccd).order_by('-thoiGianKham')
        
        if not benh_an_list.exists():
            return Response({'message': 'Không tìm thấy bệnh án nào cho số CCCD này.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Serialize dữ liệu và trả về kết quả
        serializer = HoSoBenhAnSerializer(benh_an_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    