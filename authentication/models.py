from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django_otp.models import Device

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, name, mobile, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            name=name,
            mobile=mobile,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, name, mobile, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, name, mobile, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True, verbose_name='email address')
    username = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=30)
    mobile = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

class TOTPDevice(Device):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='auth_totp_devices')