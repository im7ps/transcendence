# Generated by Django 4.2.11 on 2024-05-02 07:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transcendence', '0004_user_friends_user_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='profiles/'),
        ),
    ]
