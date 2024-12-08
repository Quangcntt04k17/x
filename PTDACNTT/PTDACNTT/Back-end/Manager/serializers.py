from rest_framework import serializers
from .models import Manager,BlacklistedToken

class ManagerSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Manager
        fields = '__all__'


def create(self, validated_data):
        return super(ManagerSerializer, self).create(validated_data)

def update(self, instance, validated_data):
    if 'password' in validated_data:
        instance.password = validated_data['password']
    return super(ManagerSerializer, self).update(instance, validated_data)



class BlacklistedTokenSerializer(serializers.ModelSerializer):
    class Meta: 
        model = BlacklistedToken
        fields = '__all__'
