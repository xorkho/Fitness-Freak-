from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='product_list'),  # List of all products
    path('products/<int:id>/', views.product_detail, name='product_detail'),  # Product detail view
    path('store/', views.store_home, name='store_home'),  # Store home view (optional)
]
