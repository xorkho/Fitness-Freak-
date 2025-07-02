# Register your models here.
# admin.py

from django.contrib import admin
from .models import Cart

class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'price', 'id')  # Fields to display in the list view
    search_fields = ('user__username', 'product__name')  # Enable search by user or product name
    list_filter = ('user', 'product')  # Add filter options for easier navigation

admin.site.register(Cart, CartAdmin)
