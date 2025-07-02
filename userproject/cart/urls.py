from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('', views.view_cart, name='view_cart'),  # GET: View cart (returns cart details in JSON)
    path('add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),  # POST: Add item to cart (JSON response)
    path('remove/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),  # DELETE: Remove item (JSON response)
    path('clear/', views.clear_cart, name='clear_cart'),  # POST: Clear cart (JSON response)
    path('checkout/', views.checkout, name='checkout'),  # GET: Checkout (returns bill details in JSON)
]
