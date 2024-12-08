from django.urls import path
from .views import BenhNhanAPI, BacSiAPI, HoSoBenhAnAPI
from api import views

urlpatterns = [
    # API danh sách bác sĩ, bệnh nhân và hồ sơ
    path('viewsAPIBacSi/', BacSiAPI.as_view(), name="bac-si-list"),
    path('viewsAPIBenhNhan/', BenhNhanAPI.as_view(), name="benh-nhan-list"),
    path('viewsAPIHoSo/', HoSoBenhAnAPI.as_view(), name="ho-so-list"),
    
    # API chi tiết bác sĩ, bệnh nhân, hồ sơ theo ID
    path('viewsAPIBacSi/<int:id>/', BacSiAPI.as_view(), name='bac-si-detail'),  # PUT, DELETE
    path('viewsAPIBenhNhan/<int:id>/', BenhNhanAPI.as_view(), name='benh-nhan-detail'),  # PUT, DELETE
    path('viewsAPIHoSo/<int:id>/', HoSoBenhAnAPI.as_view(), name='ho-so-detail'),  # PUT, DELETE
    
    # Danh sách hồ sơ bệnh án theo thời gian
    # path('danh_sach_hoso_view/', views.danh_sach_hoso_view, name='ho_so_benh_an_theo_thoi_gian'),

    # Hồ sơ bệnh án theo ngày
    # path('ho_so_benh_an_date/', views.ho_so_benh_an_theo_ngay, name='ho_so_benh_an_theo_ngay'),

    # Hồ sơ bệnh án theo khoảng ngày
    path('ho_so_khoang_ngay/', views.ho_so_benh_an_theo_khoang_ngay, name='ho_so_benh_an_theo_khoang_ngay'),

    # Danh sách hồ sơ và bệnh án
    # path('hosolist/', views.DanhSachHosoView.as_view(), name='danh_sach_hoso'),
    path('benhanlist/', views.DanhSachBenhAnView.as_view(), name='benhanlist'),
    
    # Thêm hồ sơ và bệnh án
    path('addhoso/', views.ThemHosoView.as_view(), name='them_hoso'),
    path('addbenhan/', views.ThemBenhAnView.as_view(), name='them_benh_an'),
    
    # Tìm kiếm theo CCCD
    path('timkiem/', views.TimKiemCCCDView.as_view(), name='tim_kiem_cccd'),
]
