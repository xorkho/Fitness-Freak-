from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid
from datetime import timedelta ,timezone


# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)  # Normalize the email
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, email, password, **extra_fields)

# Custom User Model
class User(AbstractBaseUser, PermissionsMixin):  # Inherit PermissionsMixin for permission functionality
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)  # Ensure email is unique and required
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']  # Ensure email is required for user creation

    objects = UserManager()  # Use the custom manager

    def __str__(self):
        return self.username
    
class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True)  # Unique token
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()  # Set the expiration time for the token
    
    def is_expired(self):
        return self.expires_at < timezone.now()

    def __str__(self):
        return f"Password reset token for {self.user.username}"