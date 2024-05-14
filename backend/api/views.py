from django.shortcuts import render
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import generics
from .insert import UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from .management.commands import import_userprofiles_from_csv
from django.http import HttpResponse
import io
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

class FileUploadView(generics.CreateAPIView):
    def post(self, request):
        csv_file = request.FILES['file']
        if not csv_file.name.endswith('.csv'):
            return HttpResponse(status=400)  # Bad request

        data = csv_file.read()
        text = data.decode('ISO-8859-1')
        file_like_object = io.StringIO(text)

        command = import_userprofiles_from_csv.Command()
        command.handle(csv_file=file_like_object)

        return HttpResponse(status=204)