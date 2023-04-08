from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import Register, Login, Logout, Otp

urlpatterns = [
    path('api/register/', Register, name='register'),
    path('api/token/', obtain_auth_token, name='token'),
    path('api/login/', Login, name='login'),
    path('api/logout/', Logout, name='logout'),
    path('api/otp/', Otp, name='otp')
]