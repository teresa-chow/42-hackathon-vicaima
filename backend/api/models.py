from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
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
        return self.user.username

