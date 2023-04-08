# from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth import authenticate, logout
from .serializers import UserSerializer
from .models import *
from .otp import *
from django_otp import verify_token
# from ..parental_control_system.settings import *
from django.conf import settings

# Web-site blocker function
number_requests_total = 0

# Visited web site UNIX timestamp with block boolean (whether blocked or not)


# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def Register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({'id': CustomUser.objects.get(username=request.data.get('username')).id, 'token': token.key, 'email': request.data.get('email')}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

temp_otp = None
timeout_start = None
timeout_end = None

@api_view(['POST'])
@permission_classes([AllowAny])
def Login(request):
    global temp_otp
    global timeout_start
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    # device = create_totp_device(user)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        totp_devices = devices_for_user(user, TOTPDevice)
        if totp_devices:
            # generate TOTP code
            # totp_device = list(totp_devices)[0]
            # totp_code = totp_device.generate_challenge()
            totp_code = temp_otp = generate_challenge()
            timeout_start = time.time()
            print(totp_code)
            # send TOTP code via email
            send_mail(
                settings.OTP_EMAIL_SUBJECT,
                f'Your OTP for login is {totp_code}.',
                settings.OTP_EMAIL_SENDER,
                [user.email],
                fail_silently=False,
            )
            return Response({'detail': 'OTP sent via email'})
        else:
            # user does not have a TOTP device configured
            return Response({'token': token.key})
    return Response({'Error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Logout(request):
    request.user.auth_token.delete()
    logout(request)
    return Response('User Logged out successfully')

@api_view(['POST'])
@permission_classes([AllowAny])
def Otp(request):
    global timeout_end
    email = request.data.get('email')
    otp = request.data.get('otp')
    timeout_end = time.time()
    # secret_key = request.data.get('secret_key')
    user = CustomUser.objects.get(email=email)
    totp_devices = devices_for_user(user, TOTPDevice)
    if totp_devices:
        # totp_device = totp_devices[0]
        # print('yes')
        result = verify_otp(otp, temp_otp)
        # print(otp)
        if (timeout_end - timeout_start) < 60 and result:
            # print('yes')
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
    return Response({'Error': 'Invalid OTP'}, status=status.HTTP_401_UNAUTHORIZED)