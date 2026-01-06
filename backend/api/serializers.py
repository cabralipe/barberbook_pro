from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from .models import User, Barbershop, Service, Barber, Booking, Review

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name')

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name')

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class BarberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barber
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = '__all__'

class BarbershopSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    barbers = BarberSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Barbershop
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    services = serializers.PrimaryKeyRelatedField(many=True, queryset=Service.objects.all())
    
    class Meta:
        model = Booking
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['shop'] = BarbershopSerializer(instance.shop).data
        representation['barber'] = BarberSerializer(instance.barber).data
        representation['services'] = ServiceSerializer(instance.services, many=True).data
        return representation
