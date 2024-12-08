from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.permissions import AllowAny


class AppointmentListView(APIView):
    def get(self, request):
        """Lấy danh sách tất cả lịch hẹn."""
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

class AppointmentCreateView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        """Tạo mới một lịch hẹn."""
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AppointmentDetailView(APIView):
    def get(self, request, pk):
        """Lấy chi tiết một lịch hẹn."""
        try:
            appointment = Appointment.objects.get(pk=pk)
            serializer = AppointmentSerializer(appointment)
            return Response(serializer.data)
        except Appointment.DoesNotExist:
            return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        """Cập nhật thông tin lịch hẹn."""
        try:
            appointment = Appointment.objects.get(pk=pk)
            serializer = AppointmentSerializer(appointment, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Appointment.DoesNotExist:
            return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        """Xóa một lịch hẹn."""
        try:
            appointment = Appointment.objects.get(pk=pk)
            appointment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Appointment.DoesNotExist:
            return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

# hiển thị theo trạng thái
# Pending, Confirmed, Completed, Cancelled tương ứng

class AppointmentListByStatusView(APIView):
    def get(self, request, status_type):
        # Lọc danh sách lịch hẹn theo trạng thái
        appointments = Appointment.objects.filter(status=status_type)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# lịch hẹn theo ngày và trạng thái dùng để hiển thị.
from django.utils.dateparse import parse_date

class AppointmentsByDateAndStatusView(APIView):
    def get(self, request):
        # Lấy tham số ngày và trạng thái từ query params
        appointment_date = request.query_params.get('date')
        status_type = request.query_params.get('status')

        # Kiểm tra xem các tham số có tồn tại không
        if not appointment_date or not status_type:
            return Response(
                {'error': 'Missing required parameters: date and status'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Xử lý ngày
        try:
            date_obj = parse_date(appointment_date)
            if not date_obj:
                raise ValueError
        except ValueError:
            return Response(
                {'error': 'Invalid date format. Use YYYY-MM-DD'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Lọc các lịch hẹn theo ngày và trạng thái
        appointments = Appointment.objects.filter(
            appointment_date__date=date_obj,
            status=status_type
        )

        # Kiểm tra xem có lịch hẹn nào không
        if not appointments.exists():
            return Response(
                {'message': f'No appointments found for date {appointment_date} with status {status_type}.'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Serialize dữ liệu và trả về dưới dạng JSON (danh sách)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.decorators import api_view
from datetime import datetime

@api_view(['GET'])
def filter_appointments_by_date(request):
    date_str = request.query_params.get('date')  # Lấy ngày từ tham số query
    if not date_str:
        return Response({"error": "Date parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        appointment_date = datetime.strptime(date_str, '%Y-%m-%d').date()  # Chuyển đổi ngày từ chuỗi
    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
    
    appointments = Appointment.objects.filter(appointment_date=appointment_date)  # Lọc theo ngày
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


