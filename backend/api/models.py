from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class User(AbstractUser):
    pass

class Barbershop(models.Model):
    STATUS_CHOICES = (
        ('Aberto', 'Aberto'),
        ('Fechado', 'Fechado'),
        ('Agenda Cheia', 'Agenda Cheia'),
        ('Lotado', 'Lotado'),
    )

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    rating = models.FloatField(default=0.0, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    reviews_count = models.CharField(max_length=50, default="0 avaliações") # Keeping as string to match frontend "500+" style, or could be int
    image = models.URLField(max_length=1000)
    logo = models.URLField(max_length=1000, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Aberto')
    opening_hours = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    tags = models.JSONField(default=list) # Store tags as a list of strings
    main_service_price = models.DecimalField(max_digits=6, decimal_places=2)
    main_service_name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Service(models.Model):
    CATEGORY_CHOICES = (
        ('Cabelo', 'Cabelo'),
        ('Barba', 'Barba'),
        ('Combo', 'Combo'),
        ('Outros', 'Outros'),
    )

    shop = models.ForeignKey(Barbershop, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    duration_min = models.IntegerField()
    description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Outros')
    discount = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.shop.name}"

class Barber(models.Model):
    shop = models.ForeignKey(Barbershop, on_delete=models.CASCADE, related_name='barbers')
    name = models.CharField(max_length=100)
    avatar = models.URLField(max_length=1000)

    def __str__(self):
        return self.name

class Booking(models.Model):
    PAYMENT_METHODS = (
        ('Cartão de Crédito', 'Cartão de Crédito'),
        ('Cartão de Débito', 'Cartão de Débito'),
        ('PIX', 'PIX'),
        ('Dinheiro', 'Dinheiro'),
    )
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
        ('Completed', 'Completed'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    shop = models.ForeignKey(Barbershop, on_delete=models.CASCADE, related_name='bookings')
    barber = models.ForeignKey(Barber, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    services = models.ManyToManyField(Service, related_name='bookings')
    date = models.DateField()
    time = models.CharField(max_length=10) # e.g. "09:00"
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHODS, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} - {self.user.username} at {self.shop.name}"

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    shop = models.ForeignKey(Barbershop, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} for {self.shop.name}"
