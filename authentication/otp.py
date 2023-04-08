# from django_otp import devices_for_user
# from django_otp.plugins.otp_totp.models import TOTPDevice
# from django_otp.util import random_hex
from django.core.mail import send_mail
from django.conf import settings
from django_otp import user_has_device
from django_otp.plugins.otp_totp.models import TOTPDevice
from django_otp.util import hex_validator
import base64, os, datetime, time
# from .models import *
from django_otp import devices_for_user
from django_otp.plugins.otp_totp.models import TOTPDevice
from pyotp import random_base32, TOTP
import time, hmac, hashlib, struct

def generate_challenge():
    # secret_key = random_base32()
    # interval = int(time.time()) // 30
    # message = struct.pack('>Q', interval)
    # secret = bytes.fromhex(secret_key)
    # hash_value = hmac.new(secret, message, hashlib.sha1).digest()
    # offset = hash_value[-1] & 0x0F
    # truncated_hash = hash_value[offset:offset+4]
    # code = struct.unpack('>L', truncated_hash)[0]
    # code &= 0x7FFFFFFF
    # code %= 1000000
    # print('{:06d}'.format(code))
    # return '{:06d}'.format(code)
    secret_key = random_base32()

    # create a TOTP object with the secret key and a 6-digit code
    totp = TOTP(secret_key, digits=6, interval=60)

    # get the current TOTP code
    totp_code = totp.now()
    return totp_code #, secret_key, totp


def create_totp_device(user):
    # Get all existing OTP devices for the user
    devices = devices_for_user(user)

    # Check if the user already has a TOTP device
    totp_device = next((dev for dev in devices if isinstance(dev, TOTPDevice)), None)
    if totp_device:
        # If the user already has a TOTP device, return it
        return totp_device
    key = base64.b32encode(os.urandom(20)).decode()
    # Otherwise, create a new TOTP device for the user
    totp_device = TOTPDevice.objects.create(
        user=user,
        name='default',  # name can be anything you want
        key=key,  # key will be generated automatically
        step=30,  # default TOTP step is 30 seconds
        t0=0,  # default TOTP epoch is 0
        digits=6,  # default TOTP code length is 6 digits
        drift=0,  # default TOTP drift is 0
        last_t=int(time.mktime(datetime.datetime.now().timetuple())),  # default TOTP last_t is None
    )
    return totp_device


def send_otp_email(device, user):
    # Generate OTP
    device = TOTPDevice.objects.get(user=user)
    otp = device.generate_token()

    # Save OTP in user model
    user.otp_secret_key = device.secret
    user.save()

    # Send OTP via email
    email_body = f'Your OTP is {otp}'
    send_mail(
        settings.OTP_EMAIL_SUBJECT,
        email_body,
        settings.OTP_EMAIL_SENDER,
        [user.email],
        fail_silently=False,
    )

# def verify_otp(user, otp):
#     # Check if user has TOTP device
#     if not user_has_device(user, TOTPDevice):
#         return False

#     # Verify OTP
#     # device = TOTPDevice.objects.get(user=user)
#     device = create_totp_device(user)
#     if not hex_validator.match(otp):
#         return False
#     if not device.verify(otp):
#         return False

#     # Clear OTP secret key from user model
#     user.otp_secret_key = None
#     user.save()

#     return True

def verify_otp(user_otp, temp_otp):
    """
    Verify the user-provided TOTP code against the given secret key.
    """
    # totp = TOTP(secret_key, digits=6, interval=60)
    # return totp.now(), totp.verify(user_otp)
    return user_otp == temp_otp
