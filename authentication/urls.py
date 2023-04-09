from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import Register, Login, Logout, Otp, Web_Block, Enable, Disable, Screen, Set_threshold, SafeSearch, App_screen, Visualize

urlpatterns = [
    path('api/register/', Register, name='register'),
    path('api/token/', obtain_auth_token, name='token'),
    path('api/login/', Login, name='login'),
    path('api/logout/', Logout, name='logout'),
    path('api/otp/', Otp, name='otp'),
    path('api/web_block/', Web_Block, name='web_block'),
    path('api/enable/', Enable, name='enable'),
    path('api/disable/', Disable, name='disable'),
    path('screen/', Screen, name='screen'),
    path('set_threshold', Set_threshold, name='set_threshold'),
    path('safesearch/', SafeSearch, name='safesearch'),
    path('appscreen/', App_screen, name='app_screen'),
    path('visualize', Visualize, name='visualize')
]