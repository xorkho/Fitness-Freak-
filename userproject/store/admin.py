from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'quantity')  # Add 'id' here
    list_editable = ('quantity',)
    search_fields = ('name', 'description')  # Search products by name or description
    list_filter = ('price', 'quantity')  # Filter products by price and stock

admin.site.register(Product, ProductAdmin)
