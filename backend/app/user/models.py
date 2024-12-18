from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    bio = models.CharField(max_length=1000, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png', blank=True, null=True)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - Profile"


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)
