# Generated by Django 5.0.6 on 2024-12-04 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Appointment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='patient',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
