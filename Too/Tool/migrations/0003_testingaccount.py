# Generated by Django 4.2.13 on 2024-07-15 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tool', '0002_name_delete_names'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestingAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_type', models.CharField(max_length=100)),
                ('user_id', models.CharField(max_length=100)),
                ('password_sso', models.CharField(max_length=100)),
            ],
        ),
    ]
