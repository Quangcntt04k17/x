from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'doctor_name', 'appointment_date', 'status')
    list_filter = ('status', 'appointment_date')
    search_fields = ('doctor__name', 'patient__name')
