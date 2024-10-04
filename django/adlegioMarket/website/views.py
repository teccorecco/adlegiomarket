
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def features(request):
    return render(request, 'features.html')

def aboutus(request):
    return render(request, 'aboutus.html')

def contacts(request):
    return render(request, 'contacts.html')

def agb_datenschutz(request):
    return render(request, 'agb_datenschutz.html')

def impressum(request):
    return render(request, 'impressum.html')
