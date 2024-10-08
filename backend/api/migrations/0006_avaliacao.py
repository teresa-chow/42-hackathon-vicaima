# Generated by Django 5.0.6 on 2024-05-15 06:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_userprofile_user_alter_userprofile_data_admissão'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Avaliacao',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('data_inicial', models.DateField(null=True)),
                ('data_final', models.DateField(null=True)),
                ('avaliado', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='avaliacoes_recebidas', to=settings.AUTH_USER_MODEL)),
                ('avaliador', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='avaliacoes_dadas', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Avaliação',
                'verbose_name_plural': 'Avaliações',
            },
        ),
    ]
