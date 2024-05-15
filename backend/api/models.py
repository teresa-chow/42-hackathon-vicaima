from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    numero_colaborador = models.IntegerField(unique=True, null=True)
    primeiro_nome = models.CharField(max_length=100, null=True)
    ultimo_nome = models.CharField(max_length=100, null=True)
    avaliador = models.IntegerField(unique=False, null=True)
    departamento = models.CharField(max_length=100, null=True)
    função = models.CharField(max_length=100, null=True)
    data_admissão = models.DateField(null=True)
    grupo = models.CharField(max_length=100, null=True)
    diretor = models.CharField(max_length=10, null=True)

    def __str__(self):
        return self.user.username if self.user else ''
    
class Avaliacao(models.Model):
    id = models.AutoField(primary_key=True)
    avaliador = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, related_name='avaliacoes_dadas')
    avaliado = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, related_name='avaliacoes_recebidas')
    data_inicial = models.DateField(null=True)
    data_final = models.DateField(null=True)

    class Meta:
        verbose_name = 'Avaliação'
        verbose_name_plural = 'Avaliações'

    def __str__(self):
        return f'Avaliação de {self.avaliador} para {self.avaliado}'

