import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

print(f"Engine: {settings.DATABASES['default']['ENGINE']}")
print(f"Name: {settings.DATABASES['default']['NAME']}")
print(f"User: {settings.DATABASES['default'].get('USER')}")
print(f"Host: {settings.DATABASES['default'].get('HOST')}")
print(f"Port: {settings.DATABASES['default'].get('PORT')}")
