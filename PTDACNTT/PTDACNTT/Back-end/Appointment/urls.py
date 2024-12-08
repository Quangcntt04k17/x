from django.urls import path
from .views import AppointmentListView, AppointmentDetailView, AppointmentCreateView ,AppointmentListByStatusView,AppointmentsByDateAndStatusView
from .views import filter_appointments_by_date

urlpatterns = [
    path('appointments/', AppointmentListView.as_view(), name='appointment-list'),
    path('create_appointments/', AppointmentCreateView.as_view(), name='appointment-create'),
    path('appointments/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
    path('appointments/<str:status_type>/', AppointmentListByStatusView.as_view(), name='appointments_by_status'),
    path('appointments/filter/', AppointmentsByDateAndStatusView.as_view(), name='appointments_by_date_and_status'),
    path('appointments/filter_date/', filter_appointments_by_date, name='filter_appointments_by_date'),

    # status link http://127.0.0.1:8888/api/appointments/Pending/ or Confirmed ...

]
