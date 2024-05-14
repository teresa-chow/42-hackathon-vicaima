from django.contrib.auth.models import User, Group
from .models import UserProfile
from rest_framework import serializers
import csv

class UserProfileCreation(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['colab_num', 'first_name', 'last_name', 'department', 'function', 'group']

class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileCreation()

    class Meta:
        model = User
        fields = ["id", "username", "password", "user_profile"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validate_data):
        user_profile_data = validate_data.pop('user_profile')
        user = User.objects.create_user(**validate_data)
        UserProfile.objects.create(user=user, **user)
        groupRH, created = Group.objects.get_or_create(name="RH")
        groupRH.user_set.add(user)
        return user

    
