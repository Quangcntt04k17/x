from django.contrib import admin
from .models import *


# class BenhNhanAdmin(admin.ModelAdmin):
#     fields = ['maBenhNhan', 'soCCCD', 'maBaoHiemYTe', 'hoTenBenhNhan', 'tuoi', 'gioiTinh', 'soDienThoai', 'diaChi']
#     list_display = ['maBenhNhan', 'hoTenBenhNhan', 'tuoi', 'gioiTinh']



# Register your models here.
admin.site.register(BacSi)
admin.site.register(BenhNhan)
admin.site.register(HoSoBenhAn)