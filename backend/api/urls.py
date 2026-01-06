from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BarbershopViewSet, ServiceViewSet, BarberViewSet, BookingViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'shops', BarbershopViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'barbers', BarberViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
