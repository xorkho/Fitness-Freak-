from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

# Custom User Model
User = get_user_model()

# ✅ API for Index
@api_view(['GET'])
@permission_classes([AllowAny])   
def index(request):
    return Response({'message': 'Welcome!', 'user': request.user.username})

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def loginUser(request):
    if request.method == "POST":
        data = request.data
        username = data.get('username')
        password = data.get('password')

        # Check all fields filled
        if not username  or not password:
            return Response({'error': 'Please fill in all fields.'}, status=400)

        # Authenticate user using username and password only
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful', 'username': user.username})
        else:
            return Response({'error': 'Invalid username or password'}, status=400)
    

# ✅ API for Signup
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])    
def signup(request):
    if request.method == "POST":
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Ensure email is provided and is required
        if not username or not email or not password:
            return Response({'error': 'Please fill in all fields.'}, status=400)

        # Check if username already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'This username is already taken.'}, status=400)

        # Check if Email already exists
        if User.objects.filter(email=email).exists():
            return Response({'error': 'This Email is already taken.'}, status=400)

        # Create user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return Response({'message': 'User created successfully'}, status=201)
    


@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    email = request.data.get('email')

    if not email:
        return Response({'error': 'Email is required.'}, status=400)

    try:
        user = User.objects.get(email=email)
        
        # Dummy reset link (normally you will generate a secure token link)
        reset_link = f"http://localhost:3000/reset-password/{user.id}/"

        # Send email (you need to setup EMAIL settings in Django)
        send_mail(
            subject='Password Reset Request',
            message=f'We received a request to reset your password for your Fitness Freak account.\nClick the link below to reset your password: {reset_link}\nThanks,\nThe Fitness Freak Team\nwww.fitnessfreak.com',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response({'message': 'Reset link sent to your email.'})
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)



@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request, id):
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if not new_password or not confirm_password:
        return Response({'error': 'Both password fields are required.'}, status=400)

    if new_password != confirm_password:
        return Response({'error': 'Passwords do not match.'}, status=400)

    try:
        user = User.objects.get(id=id)
        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password updated successfully.'})
    except User.DoesNotExist:
        return Response({'error': 'Invalid reset link.'}, status=404)


# ✅ API for About Page
@csrf_exempt
@api_view(['GET'])
def about(request):
    return Response({'message': 'This is the about page'})


# ✅ API for Schedule Page
@csrf_exempt
@api_view(['GET'])
def schedule(request):
    return Response({'message': 'This is the schedule page'})

@api_view(['POST'])
def logoutUser(request):
    # Log the user out by clearing the session
    logout(request)
    return Response({'message': 'Successfully logged out.'})