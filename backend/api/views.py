from django.shortcuts import render
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import generics
from .insert import UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission

# Create your views here.
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class CheckUserGroup(generics.CreateAPIView):
    def get(self, request):
        is_member_of_group = request.user.groups.filter(name='RH').exists()
        is_superuser = request.user.is_superuser
        return Response({'is_member_of_group': is_member_of_group, 'is_superuser': is_superuser})
    permission_classes = [IsAuthenticated]