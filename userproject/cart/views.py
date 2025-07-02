from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Cart, Product

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request, product_id):
    try:
        data = request.data
        quantity = int(data.get('quantity', 1))

        product = get_object_or_404(Product, id=product_id)

        if product.quantity < quantity:
            print("Not enough stock condition triggered")
            return Response({'status': 'error', 'message': 'Not enough stock available.'}, status=400)

        cart_item, created = Cart.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={'price': product.price, 'quantity': 0}
        )

        cart_item.quantity += quantity
        cart_item.save()

        product.quantity -= quantity
        product.save()

        return Response({'status': 'success', 'message': 'Product added to cart'})

    except Exception as e:
        return Response({'status': 'error', 'message': f'Error: {str(e)}'}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    cart_items = Cart.objects.filter(user=request.user)
    data = []

    for item in cart_items:
        data.append({
            'id': item.id,
            'product_id': item.product.id,
            'product_name': item.product.name,
            'price': float(item.price),
            'quantity': item.quantity,
            'total': float(item.price * item.quantity)
        })

    total_price = sum(item['total'] for item in data)

    return Response({'status': 'success', 'cart': data, 'total_price': total_price})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    try:
        cart_item = get_object_or_404(Cart, user=request.user, product_id=product_id)
        product = cart_item.product
        product.quantity += cart_item.quantity
        product.save()
        cart_item.delete()
        return Response({'status': 'success', 'message': 'Product removed from cart'})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkout(request):
    cart_items = Cart.objects.filter(user=request.user)

    if not cart_items.exists():
        return Response({'status': 'error', 'message': 'Cart is empty'}, status=400)

    bill_details = []
    total_price = 0

    for item in cart_items:
        bill_details.append({
            'product_name': item.product.name,
            'quantity': item.quantity,
            'price': float(item.price),
            'total': float(item.price * item.quantity)
        })
        total_price += item.price * item.quantity


    return Response({
        'status': 'success',
        'bill': bill_details,
        'total_price': total_price
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    try:
        cart_items = Cart.objects.filter(user=request.user)
        for item in cart_items:
            product = item.product
            product.quantity += item.quantity
            product.save()
        cart_items.delete()
        return Response({'status': 'success', 'message': 'Cart cleared'})
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)
