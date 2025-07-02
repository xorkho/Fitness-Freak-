from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Product
from .serializers import ProductSerializer  # Ensure you have created this serializer

# Product List View (API)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def product_list(request):
    products = Product.objects.all() 
    # Serialize the products data
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# Product Detail View (API)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def product_detail(request, id):
    product = get_object_or_404(Product, id=id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)
  
# Store Home View (API)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def store_home(request):
    return Response({"message": "Welcome to the store!"})
