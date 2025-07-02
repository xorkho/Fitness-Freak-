from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.loginUser, name='api_login'),
    path('signup/', views.signup, name='api_signup'),
    path('logout/', views.logoutUser, name='api_logout'),
    path('forgot-password/', views.forgot_password, name='forgot-password'),
    path('reset-password/<int:id>/', views.reset_password, name='reset-password'),

    path('about/', views.about, name='api_about'),
    path('schedule/', views.schedule, name='api_schedule'),
]

