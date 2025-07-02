# Create your models here.
from django.db import models
from django.conf import settings
from django.db import models
from store.models import Product

class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Snapshot of product price

    def __str__(self):
        return f"{self.user.username if self.user else 'Guest'}"
    
    def get_item_total(self):
        return self.price * self.quantity