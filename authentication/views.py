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
import requests, time

# main user for session
usersession = None

# Web-site blocker function
blocked = [] # custom blocked website
# number_requests_total = 0

# Visited web site UNIX timestamp with block boolean (whether blocked or not)

# To enable and disable parental controls
enable = False

# Active time for each app.
total_screen = {
    'Monday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Tuesday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Wednesday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Thursday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Friday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Saturday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Sunday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0}
} # Will be set when Screen API is called

threshold = {
    'Monday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Tuesday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Wednesday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Thursday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Friday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Saturday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0},
    'Sunday': {'11pmto7am': 0, '7amto11am': 0, '11amto3pm': 0, '3pmto7pm': 0, '7pmto11pm': 0}
}
# For apps. Dummy app -> will contain a dictionary of each individual session duration with id
active = {
    'dummy': {
        'total': 50, # Total time spent on app
        'i': 2, # i is basically id iterator
        '1': 20, # 20 minutes app time in first session
        '2': 30 # 30 minutes app time in second session SImilarly other apps will have
    }
}

@api_view(['GET'])
@permission_classes([AllowAny])
def Visualize(request):
    return Response(total_screen, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def App_screen(request):
    global active
    app_screen = request.data.get('app_screen')
    name = request.data.get('name')
    i += 1
    active[name]['i'] = i
    active[name][i] = app_screen
    active[name]['total'] += app_screen
    return Response({'ok': 'app screen time recorded for this session'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def Screen(request):
    global total_screen, threshold
    total_time = request.data.get('screentime')
    day = request.data.get('day')
    slot = request.data.get('slot')
    total_screen[day][slot] += total_time
    if total_screen[day][slot] > threshold[day][slot]:
        send_mail(
                settings.OTP_EMAIL_SUBJECT,
                f'Screen time threshold for {day} and {slot} has been crossed.',
                settings.OTP_EMAIL_SENDER,
                [usersession.email],
                fail_silently=False,
            )
    return Response({'ok': 'true'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def Set_threshold(request):
    global threshold
    day = request.data.get('day')
    slot = request.data.get('slot')
    threshold_user = request.data.get('threshold')
    threshold[day][slot] = threshold_user
    return Response({'ok':'threshold set'}, status=status.HTTP_200_OK)

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
    global usersession
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    usersession = user
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

@api_view(['POST'])
@permission_classes([AllowAny])
def Web_Block(request, url):
    if enable == False:
        return Response({'error': 'request denied'}, status=status.HTTP_403_FORBIDDEN)
    url = request.data.get('url')
    # url = 'http://www.ucoz.com/'
    # url = url
    params = {'apikey': '479cb6bdf948a472d920934d84df34fb26559f485ef6c2c2e1306ad647ce3613', 'resource': url}
    response = requests.get('https://www.virustotal.com/vtapi/v2/url/report', params=params)

    if response.json()['positives'] > 0:
        print('The URL is malicious.')
        return Response({'status': 'malicious'}, status=status.HTTP_200_OK)
    else:
        print('The URL is safe.')
        return Response({'status': 'safe'}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def Enable(request):
    global enable
    enable = True
    return Response({'enable': 'True'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def Disable(request):
    global enable
    enable = False
    return Response({'disable': 'True'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def SafeSearch(request):
    API_KEY = 'AIzaSyD0SW87UPDScKW3jgpn6jFxQPUUG6e_WFo'
    SEARCH_ENGINE_ID = 'e2df6f3212e754b14'
    # SEARCH_QUERY = 'Microsoft'
    SEARCH_QUERY = request.data.get('query')
    MAX_RESULTS = 100

    url = f'https://www.googleapis.com/customsearch/v1?key={API_KEY}&cx={SEARCH_ENGINE_ID}&q={SEARCH_QUERY}&safe=active'
    url_template = 'https://www.googleapis.com/customsearch/v1?key={}&cx={}&q={}&safe=active&start={}'
    response = requests.get(url)

    # parse the response data
    data = response.json()

    # # loop through the search results and display the title and link for each result
    # for item in data['items']:
    #     # check if SafeSearch blocked this result
    #     if 'blockReasons' in item:
    #         print(f"Blocked result: {item['title']} ({item['link']})")
    #         print(f"Reason: {item['blockReasons'][0]['reason']}")
    #         print()
    #     else:
    #         print(f"Title: {item['title']}")
    #         print(f"Link: {item['link']}")
    #         print()
    results = []
    for i in range(1, MAX_RESULTS+1, 10):
        url = url_template.format(API_KEY, SEARCH_ENGINE_ID, SEARCH_QUERY, i)
        response = requests.get(url)
        data = response.json()
        results += data['items']

    # for item in results:
    #     print(f"Title: {item['title']}")
    #     print(f"Link: {item['link']}")
    #     print()

    return Response({'results': results}, status=status.HTTP_200_OK)