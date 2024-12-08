from django.db import models

class BenhNhan(models.Model):
    GIOI_TINH_CHOICES = [
        ('M', 'Nam'),
        ('F', 'Nữ'),
    ]
    
    soCCCD = models.CharField(max_length=12, unique=True, null=True, blank=True)  # Thay IntegerField thành CharField
    maBaoHiemYTe = models.CharField(max_length=15, unique=True, null=True, blank=True)  # Sử dụng CharField cho mã bảo hiểm y tế
    hoTenBenhNhan = models.CharField(max_length=50)
    tuoi = models.IntegerField()
    gioiTinh = models.CharField(max_length=1, choices=GIOI_TINH_CHOICES)  # Giới hạn độ dài cho giới tính
    soDienThoai = models.CharField(max_length=15)  # Sử dụng CharField cho số điện thoại
    diaChi = models.CharField(max_length=255)

    def __str__(self):
        return self.hoTenBenhNhan

    class Meta:
        verbose_name = 'Bệnh nhân'
        verbose_name_plural = 'Bệnh nhân'


class BacSi(models.Model):
    GIOI_TINH_CHOICES = [
        ('M', 'Nam'),
        ('F', 'Nữ'),
    ]

    soCCCD = models.CharField(max_length=12, unique=True)  # Thay IntegerField thành CharField
    hoTenBacSi = models.CharField(max_length=50)
    tuoi = models.IntegerField()
    gioiTinh = models.CharField(max_length=1, choices=GIOI_TINH_CHOICES)  # Giới hạn độ dài cho giới tính
    soDienThoai = models.CharField(max_length=15)  # Sử dụng CharField cho số điện thoại
    diaChi = models.CharField(max_length=255)

    def __str__(self):
        return self.hoTenBacSi

    class Meta:
        verbose_name = 'Bác sĩ'
        verbose_name_plural = 'Bác sĩ'


class HoSoBenhAn(models.Model):
    benhNhan = models.ForeignKey(BenhNhan, on_delete=models.CASCADE)
    thoiGianKham = models.DateTimeField(auto_now_add=True)  # auto_created -> auto_now_add
    trieuChung = models.CharField(max_length=255)
    chuanDoan = models.CharField(max_length=255)
    dieuTri = models.CharField(max_length=255)

    def __str__(self):
        return f"Hồ sơ bệnh án của {self.benhNhan.hoTenBenhNhan} vào {self.thoiGianKham}"

    class Meta:
        verbose_name = 'Hồ sơ bệnh án'
        verbose_name_plural = 'Hồ sơ bệnh án'
