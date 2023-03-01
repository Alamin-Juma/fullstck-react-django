# go from python object to json
from rest_framework import serializers
from .models import MyuSers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyuSers
        fields = ['id', 'firstname', 'secondname', 'email', 'phone', 'age']
