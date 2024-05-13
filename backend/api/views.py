from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission

# Create your views here.
class IsMemberOfGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='RH').exists() or request.user.is_staff or request.user.is_superuser
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsMemberOfGroup]

class CheckUserGroup(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        is_member_of_group = request.user.groups.filter(name='RH').exists()
        is_superuser = request.user.is_superuser
        return Response({'is_member_of_group': is_member_of_group, 'is_superuser': is_superuser})