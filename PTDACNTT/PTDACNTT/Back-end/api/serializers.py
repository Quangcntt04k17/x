from rest_framework import serializers
from .models import BenhNhan, BacSi,HoSoBenhAn

class BenhNhanSerializer(serializers.ModelSerializer):
    class Meta:
        model = BenhNhan
        fields = '__all__' 

class BacSiSerializer (serializers.ModelSerializer):
    class Meta:
        model = BacSi
        fields = '__all__' 

class HoSoBenhAnSerializer(serializers.ModelSerializer):
    hoTenBenhNhan = serializers.CharField(source='benhNhan.hoTenBenhNhan', read_only=True)

    class Meta:
        model = HoSoBenhAn
        fields = '__all__'
    
    def validate_benhNhan(self, value):
        # Kiểm tra xem bệnh nhân có tồn tại trong cơ sở dữ liệu hay không
        if not BenhNhan.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Bệnh nhân không tồn tại.")
        return value 


'''

Trong Django REST Framework (DRF),
 serializers đóng vai trò rất quan trọng trong việc chuyển đổi dữ liệu giữa các loại dữ liệu phức tạp (như các mô hình Django)
 và các định dạng dễ sử dụng hơn, chẳng hạn như JSON hoặc XML. 
'''