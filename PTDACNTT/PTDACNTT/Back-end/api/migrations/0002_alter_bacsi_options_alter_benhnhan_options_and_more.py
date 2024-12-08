# Generated by Django 5.1.3 on 2024-12-01 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bacsi',
            options={'verbose_name': 'Bác sĩ', 'verbose_name_plural': 'Bác sĩ'},
        ),
        migrations.AlterModelOptions(
            name='benhnhan',
            options={'verbose_name': 'Bệnh nhân', 'verbose_name_plural': 'Bệnh nhân'},
        ),
        migrations.AlterModelOptions(
            name='hosobenhan',
            options={'verbose_name': 'Hồ sơ bệnh án', 'verbose_name_plural': 'Hồ sơ bệnh án'},
        ),
        migrations.AlterField(
            model_name='bacsi',
            name='gioiTinh',
            field=models.CharField(choices=[('M', 'Nam'), ('F', 'Nữ')], max_length=1),
        ),
        migrations.AlterField(
            model_name='bacsi',
            name='soCCCD',
            field=models.CharField(max_length=12, unique=True),
        ),
        migrations.AlterField(
            model_name='bacsi',
            name='soDienThoai',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='benhnhan',
            name='gioiTinh',
            field=models.CharField(choices=[('M', 'Nam'), ('F', 'Nữ')], max_length=1),
        ),
        migrations.AlterField(
            model_name='benhnhan',
            name='maBaoHiemYTe',
            field=models.CharField(blank=True, max_length=15, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='benhnhan',
            name='soCCCD',
            field=models.CharField(blank=True, max_length=12, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='benhnhan',
            name='soDienThoai',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='hosobenhan',
            name='thoiGianKham',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]