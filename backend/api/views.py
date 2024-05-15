from django.shortcuts import render
from django.contrib.auth.models import User
from .insert import AvaliacaoSerializer
from .models import Avaliacao
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from .management.commands import import_userprofiles_from_csv
from django.http import HttpResponse, Http404
from rest_framework import status
import io
# Create your views here.

class CheckUserGroup(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("CheckUserGroup view called")
        return Response({'is_superuser': request.user.is_superuser})

class FileUploadView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
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
    

class AvaliacaoCreateView(generics.CreateAPIView):
    queryset = Avaliacao.objects.all()
    serializer_class = AvaliacaoSerializer

    def create(self, request, *args, **kwargs):
        avaliadores = request.data.get('avaliadores')
        avaliados = request.data.get('avaliados')
        data_inicial = request.data.get('data_inicial')
        data_final = request.data.get('data_final')

        if not avaliadores or not avaliados:
            return Response({'error': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)

        for avaliador in avaliadores:
            for avaliado in avaliados:
                Avaliacao.objects.create(avaliador_id=avaliador, avaliado_id=avaliado, data_inicial=data_inicial, data_final=data_final)

        return Response(status=status.HTTP_201_CREATED)

class AvaliacaoListView(generics.ListAPIView):
    queryset = Avaliacao.objects.all()
    serializer_class = AvaliacaoSerializer

class AvaliacaoDeleteView(generics.DestroyAPIView):
    def delete(self, request, *args, **kwargs):
        avaliador = self.kwargs.get('avaliador')
        avaliado = self.kwargs.get('avaliado')
        count, _ = Avaliacao.objects.filter(avaliador=avaliador, avaliado=avaliado).delete()
        if count == 0:
            return Response({'message': 'No Avaliacoes to delete'}, status=404)
        else:
            return Response({'message': 'Avaliacoes deleted successfully'})
        
class UserDetailView(generics.RetrieveAPIView):
    def get_object(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, username, format=None):
        user = self.get_object(username)
        return Response(user.to_dict())