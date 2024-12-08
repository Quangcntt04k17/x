from django.db import models
from django.contrib.auth.hashers import make_password

class Manager(models.Model):
    fullName = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[('Male', 'Nam'), ('Female', 'Nữ')])
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=128)  # Độ dài này tương thích với mật khẩu mã hóa
    is_active = models.BooleanField(default=True)
    
    def save(self, *args, **kwargs):
        # Mã hóa mật khẩu trước khi lưu
        if not self.id:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


class BlacklistedToken(models.Model):
    token = models.CharField(max_length=255, unique=True)
    
    def __str__(self):
        return self.token
