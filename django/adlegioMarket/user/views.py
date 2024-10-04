from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful"}, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
    return render(request, 'login.html')

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        password_repeat = data.get('password_repeat')

        if password != password_repeat:
            return JsonResponse({"error": "Passwords do not match"}, status=400)

        try:
            user = User.objects.create_user(username=email, email=email, password=password)
            return JsonResponse({"message": "Registration successful"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return render(request, 'signup.html')

def forgot(request):
    return render(request, 'forgotten-password.html')
