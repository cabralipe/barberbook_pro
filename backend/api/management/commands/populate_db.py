from django.core.management.base import BaseCommand
from api.models import Barbershop, Service, Barber, User

class Command(BaseCommand):
    help = 'Populates the database with mock data'

    def handle(self, *args, **kwargs):
        # Create a default user if not exists
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin')
            self.stdout.write(self.style.SUCCESS('Superuser "admin" created'))

        # Data from constants.ts
        
        # Services Data (Templates)
        common_services_data = [
            { 'name': 'Corte Degradê', 'price': 45, 'duration_min': 45, 'description': 'Corte moderno com acabamento em navalha, inclui lavagem e finalização com pomada.', 'category': 'Cabelo' },
            { 'name': 'Barba Terapia', 'price': 35, 'duration_min': 30, 'description': 'Ritual completo de barba com toalha quente, massagem facial e hidratação.', 'category': 'Barba' },
            { 'name': 'Combo Viking', 'price': 70, 'duration_min': 75, 'description': 'O pacote completo: Corte de cabelo + Barba Terapia. Saia pronto para a batalha.', 'category': 'Combo', 'discount': 10 },
            { 'name': 'Sobrancelha', 'price': 15, 'duration_min': 15, 'description': 'Design e limpeza de sobrancelha com navalha ou pinça.', 'category': 'Outros' },
            { 'name': 'Pigmentação', 'price': 30, 'duration_min': 25, 'description': 'Pintura para disfarçar falhas na barba ou cabelo, efeito natural.', 'category': 'Barba' },
            { 'name': 'Serviço Premium', 'price': 100, 'duration_min': 90, 'description': 'Corte, barba e massagem facial completa.', 'category': 'Combo' },
            { 'name': 'Pezinho (Acabamento)', 'price': 20, 'duration_min': 20, 'description': 'Apenas o acabamento nas laterais e nuca para manter o corte em dia.', 'category': 'Cabelo' },
        ]

        # Barbers Data
        barbers_data = [
            { 'name': 'Carlos "Navalha"', 'avatar': 'https://picsum.photos/id/1005/100/100' },
            { 'name': 'André Silva', 'avatar': 'https://picsum.photos/id/1012/100/100' },
            { 'name': 'Marcos Santos', 'avatar': 'https://picsum.photos/id/1025/100/100' },
            { 'name': 'Pedro Alves', 'avatar': 'https://picsum.photos/id/1006/100/100' },
        ]

        # Shops Data
        shops_data = [
            {
                'name': 'Barbearia Viking',
                'address': 'Rua das Flores, 123 - Centro',
                'rating': 4.8,
                'reviews_count': '120 avaliações',
                'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfiIkrCDHGGl2ye5DAlPRpOIXdqoXIIvaMnmzX3s39r6Iwb29VmTiQPTIcBYXnE4rnT29BAzwWCVE7K2wbQICDu0gdMuq3L2IQtQbBprGAKSLPzRRe42E89RHgwh7xJ4Z4ufOZ6LHBkbm9Z26yioAFxwI1mqULqaqJyFiMbCFInxwyoGbynXuLVyJXoRZZw-NtLZzEOy0hWvcmgXT_Bh8eFUb05FMh2cTQRiC7JCsukyONFjkKb9vGIfrme2sZQFBXjZzLqN6naQE',
                'logo': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvWDmTsHef8Qf-Wj6SzM7MmNQUnpfgXopluASc0wTy_zAmlr3CB8kpsyZezcbzLllSExjc46VLr_GJo2PjxcmyJmtngtPtCctf_mOSMXpYuCOI6wmK7u__1kcZdSAPX4Q95c2de7jUFfWjFyj6iMU-q7XkjhboJ0TmfcsSmJZzYzxr5BP4e5nz9M-Y8CEK7g-0HaScelu08mUaT3qNR_JFWbyZaN8ApKT9WzQW5a_cK8vL2ssKlX2HXpDOTqXdX7RUbjbuBS23Ezo',
                'status': 'Aberto',
                'opening_hours': '09:00 - 20:00',
                'phone': '(11) 99999-8888',
                'tags': ['Corte', 'Barba', 'Sobrancelha'],
                'main_service_price': 45,
                'main_service_name': 'Corte Degradê',
                'barber_indices': [0, 1, 2]
            },
            {
                'name': 'Estilo & Navalha',
                'address': 'Vila Madalena, SP',
                'rating': 4.7,
                'reviews_count': '85 avaliações',
                'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhj36tLftWNiOc-0h286B3O3rqg9nockMCbLdBgCcm67PmoxEv4npQuLuNhfKvX-C-gjOpjD73ece3nWpo8FiNkBdkPwMXVXP0eJ_da9wfwMyzzfPFpIxfBdyz6hejWtucLqCeoHlBwFNct8iYmSPOwFMqaPWRuPo9Uv8-sM1O8gBbRAtGUgI-OTQFEUUGCrMLsuvb6uLD0sqlx5J9eEJrJahVG1Guu7xNNPNASnsEj3LsWevhgpj-7yKCGvg74sQpUqZsCHomN5M',
                'logo': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkz0FeDNVkUm2oxlZf0j33y1SrAnzaKX6emYSwTBES9NBlsKDIL74GasUcotCeNJ4yCguJNKqGV4jY8ec8zGDeaKwYuaD1BFtYZTBE00DtwVnRt9aHd1TQJ9-g4rt4mm3aeSB1Qz2bHD1x-KR80zsNDd-Mn8Zvm9lD5EFWmM47qEONTSxwEFdZ6r78pEo6LSBmApQ_Nh5UYNUPwmqQBALx4Es-cp6M23e8RccwKu6FYEul1d_4FYQ6JZ5DTAI21-lx0TyshsfRZqQ',
                'status': 'Fechado',
                'opening_hours': '10:00 - 22:00',
                'phone': '(11) 98888-7777',
                'tags': ['Corte', 'Barboterapia'],
                'main_service_price': 60,
                'main_service_name': 'Corte + Barba',
                'barber_indices': [1, 2]
            },
            {
                'name': "Gentleman's Club",
                'address': 'Jardins, São Paulo',
                'rating': 5.0,
                'reviews_count': '210 avaliações',
                'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZH9IAPQEeC6I3MRD1w5dzyiuy9naIuzEfvq0xJDmeHE65iqyV6S_Tf8eHQTeDZd5IKyWAf_aaL9MfeE7Vd4qT07awsP_hsCPf_vwOi6V89fQlseijU1qJB3Q2uWl0al6WidgCtYI0LeVuB7jd0C9ZktaJtAgFCDWovILKql-I0x27deyGjM0a4OjlimIko8Api5LWs32KdXuu3Q3u5lyJjLx3Xf8Zn9wsBWN_hH0FrijdWeN5FddYwYRQUPrkT7mfY0YGA9dxHWk',
                'logo': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz6bgosPGpBjnA4nOgbWjPxU4-fEx9BH6kP5qzikloINfLeMLB510TljmVoo_20bUJOeAeqqqDcMYhYkwIH_AJaGthOhlLNRYsXI7J_N0tbwpAMbHJTzLlbmodPVnW8aUoUwNZ-wAv_1CVjvE4dIwet1gybIH7mZkl5JY8Ta6AJv7H-xTYtRfLl4RrTkLZNGRIjqZjCPQVjPGkS48RsJUOZHGv1tJIp3kwxqmWgUB-tjr61ogcjFpTw7EhC4diWEHDNHF4GLMMiR0',
                'status': 'Aberto',
                'opening_hours': '08:00 - 19:00',
                'phone': '(11) 97777-6666',
                'tags': ['Completo', 'Massagem'],
                'main_service_price': 80,
                'main_service_name': 'Serviço Premium',
                'barber_indices': [0, 2, 3]
            },
        ]

        for shop_data in shops_data:
            barber_indices = shop_data.pop('barber_indices')
            shop, created = Barbershop.objects.get_or_create(name=shop_data['name'], defaults=shop_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created shop: {shop.name}'))
            
            # Create Services for this shop
            for service_data in common_services_data:
                Service.objects.get_or_create(shop=shop, name=service_data['name'], defaults=service_data)
            
            # Create Barbers for this shop (using indices to pick from list)
            for idx in barber_indices:
                b_data = barbers_data[idx]
                Barber.objects.get_or_create(shop=shop, name=b_data['name'], defaults=b_data)

        self.stdout.write(self.style.SUCCESS('Database populated successfully'))
