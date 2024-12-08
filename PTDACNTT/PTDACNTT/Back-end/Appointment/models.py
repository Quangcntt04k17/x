from django.db import models
from api.models import BenhNhan, BacSi
# Create your models here.

class Appointment(models.Model):
    PATIENT_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    patient = models.CharField(max_length=255, unique=True)
    doctor_name = models.CharField( max_length=255, null=True)
    appointment_date = models.DateField()
    status = models.CharField(max_length=20, choices=PATIENT_STATUS_CHOICES, default='Pending')
    notes = models.TextField(blank=True, null=True)

    # appoitment_time:
    appointment_time = models.TimeField(null=True, blank=False)  # Không được rỗng

    # email:
    email = models.EmailField(max_length=255, null=True, blank=True)  # Có thể rỗng

    # phone_number:
    soDienThoai = models.CharField(max_length=15,null=True)  # Sử dụng CharField cho số điện thoại



    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Appointment with Dr. {self.doctor_name} on {self.appointment_date}"
