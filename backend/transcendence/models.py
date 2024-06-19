from django.contrib.auth.models import AbstractUser
from django.db import models
import os
import random

def get_random_profile_image():
    media_path = os.path.join(os.path.dirname(__file__), 'media/default')
    images = os.listdir(media_path)
    return os.path.join('default', random.choice(images))

class User(AbstractUser):
    
    birth_date = models.DateField(null=True, blank=True)
    registered_via_oauth = models.BooleanField(default=False)

    spaceInvadersGamesPlayed = models.IntegerField(default=0)
    spaceInvadersWins = models.IntegerField(default=0)
    spaceInvadersLosses = models.IntegerField(default=0)
    spaceInvadersTie = models.IntegerField(default=0)

    pongGamesPlayed = models.IntegerField(default=0)
    pongWins = models.IntegerField(default=0)
    pongLosses = models.IntegerField(default=0)
    pongTie = models.IntegerField(default=0)

    status = models.BooleanField(default=False)
    friends = models.ManyToManyField('self', blank=True, symmetrical=True)
    profile_image = models.ImageField(upload_to='profiles/', default=get_random_profile_image)

    def save(self, *args, **kwargs):
        if not self.registered_via_oauth and not self.birth_date:
            raise ValueError("La data di nascita è necessaria per gli utenti non registrati via OAuth")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
