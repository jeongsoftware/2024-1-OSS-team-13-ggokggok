# Generated by Django 5.0.3 on 2024-04-09 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0004_remove_answer_modify_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='modify_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='question',
            name='modify_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]