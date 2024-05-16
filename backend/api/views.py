from django.shortcuts import render
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .insert import AvaliacaoSerializer
from .models import Avaliacao, UserProfile, Form
from datetime import datetime
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from .management.commands import import_userprofiles_from_csv
from django.http import HttpResponse, Http404
from rest_framework import status
from rest_framework.views import APIView
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

        # Create a new form instance
        form = Form.objects.create()
        form.save()

        for avaliador in avaliadores:
            for avaliado in avaliados:
                Avaliacao.objects.create(avaliador_id=avaliador, avaliado_id=avaliado, data_inicial=data_inicial, data_final=data_final, form=form)

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
    
class ImportUserProfiles(generics.CreateAPIView):
    def post(self, request, format=None):
        data = request.data
        data_admissao = datetime.strptime(data['data_admissao'], '%Y-%m-%d').date()
        username = (data['primeiro_nome'] + "_" + data['numero_colaborador']).replace(' ', '')
        password = (data['primeiro_nome'] + data['ultimo_nome']).replace(' ', '')
        user, created = User.objects.get_or_create(username=username)
        if created:
            user.set_password(password)
            user.save()
        UserProfile.objects.update_or_create(
            numero_colaborador=data['numero_colaborador'],
            defaults={
                'user': user,
                'primeiro_nome': data['primeiro_nome'],
                'ultimo_nome': data['ultimo_nome'],
                'avaliador': data['avaliador'],
                'departamento': data['departamento'],
                'função': data['função'],
                'data_admissão': data_admissao,
                'grupo': data['grupo'],
                'diretor': data['diretor']
            }
        )
        return Response({"message": "User profile imported successfully"}, status=status.HTTP_201_CREATED)
    
class FormUpdateView(APIView):
    def patch(self, request, *args, **kwargs):
        data = request.data
        print(data)
        try:
            numero_colaborador = data.get('avaliador')
            # avaliador_profile = get_object_or_404(UserProfile, numero_colaborador=numero_colaborador)
            # print(avaliador_profile)
            try:
                avaliacao = get_object_or_404(Avaliacao, avaliador_id=numero_colaborador)
            except:
                print("fds")
            form = avaliacao.form
            form.assiduidade_in = data.get('assiduidade_in', form.assiduidade_in)
            form.assiduidade_ju = data.get('assiduidade_ju', form.assiduidade_ju)
            form.responsabilidade = data.get('responsabilidade', form.responsabilidade)
            form.disponiblidade = data.get('disponiblidade', form.disponiblidade)
            form.conhecimento = data.get('conhecimento', form.conhecimento)
            form.produtividade = data.get('produtividade', form.produtividade)
            form.save()

            return Response({'message': 'Form updated successfully'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)