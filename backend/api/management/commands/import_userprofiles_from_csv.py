from django.core.management.base import BaseCommand
from api.models import UserProfile
import csv
from datetime import datetime
from django.contrib.auth.models import User

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **options):
        f = options['csv_file']
        reader = csv.reader(f, delimiter=';')
        next(reader)  # Skip the header row
        for row in reader:
            data_admissao = datetime.strptime(row[6], '%d/%m/%Y').date()
            username = (row[1] + "_" + row[0]).replace(' ', '')
            password = (row[1] + row[2]).replace(' ', '')
            user, created = User.objects.get_or_create(username=username)
            if created:
                user.set_password(password)
                user.save()
                print(f'Created user {username}')
            else:
                print(f'User {username} already exists')
            UserProfile.objects.update_or_create(
                numero_colaborador=row[0],
                defaults={
                    'user': user,
                    'primeiro_nome': row[1],
                    'ultimo_nome': row[2],
                    'avaliador': row[3],
                    'departamento': row[4],
                    'função': row[5],
                    'data_admissão': data_admissao,
                    'grupo': row[7],
                    'diretor': row[8]
                }
            )