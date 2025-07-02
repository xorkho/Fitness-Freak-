from home.models import User
from store.models import Product
from cart.models import Cart
#user create
user = User.objects.create_user(username='umer123', email='umer@example.com', password='testpassword123')
print(user)

user = User.objects.get(username='umer123')  # Replace 'umer123' with your username
print(user)

product_id = 2  # Yahan apni desired product ki ID specify karo
product = Product.objects.get(id=product_id)  # Specific product fetch karo
print(product)


#add to cart
cart_item, created = Cart.objects.get_or_create(
    user=user,  # Yahan apna logged-in user specify karo
    product=product,
    defaults={'quantity': 1, 'price': product.price}
)
if not created:
    cart_item.quantity += 1  # Agar pehle se hai, to quantity increase karo
    cart_item.save()

print(f"Added/Updated Cart: {cart_item.product.name}, Quantity: {cart_item.quantity}, Price: {cart_item.price}")

#view
cart_items = Cart.objects.filter(user=user)
for item in cart_items:
    print(f"Product: {item.product.name}, Quantity: {item.quantity}, Price: {item.price}")


#remove product
cart_item = Cart.objects.get(user=user, product=product)
cart_item.delete()
print(f"Removed {product.name} from cart")

#clear cart
Cart.objects.filter(user=user).delete()
print("Cart cleared")
