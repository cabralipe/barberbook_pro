import { Barbershop, Service, Barber } from './types';

const COMMON_SERVICES: Service[] = [
  { id: 's1', name: 'Corte Degradê', price: 45, durationMin: 45, description: 'Corte moderno com acabamento em navalha, inclui lavagem e finalização com pomada.', category: 'Cabelo' },
  { id: 's2', name: 'Barba Terapia', price: 35, durationMin: 30, description: 'Ritual completo de barba com toalha quente, massagem facial e hidratação.', category: 'Barba' },
  { id: 's3', name: 'Combo Viking', price: 70, durationMin: 75, description: 'O pacote completo: Corte de cabelo + Barba Terapia. Saia pronto para a batalha.', category: 'Combo', discount: 10 },
  { id: 's4', name: 'Sobrancelha', price: 15, durationMin: 15, description: 'Design e limpeza de sobrancelha com navalha ou pinça.', category: 'Outros' },
  { id: 's5', name: 'Pigmentação', price: 30, durationMin: 25, description: 'Pintura para disfarçar falhas na barba ou cabelo, efeito natural.', category: 'Barba' },
  { id: 's6', name: 'Serviço Premium', price: 100, durationMin: 90, description: 'Corte, barba e massagem facial completa.', category: 'Combo' },
  { id: 's7', name: 'Pezinho (Acabamento)', price: 20, durationMin: 20, description: 'Apenas o acabamento nas laterais e nuca para manter o corte em dia.', category: 'Cabelo' },
];

const BARBERS: Barber[] = [
  { id: 'b1', name: 'Carlos "Navalha"', avatar: 'https://picsum.photos/id/1005/100/100' },
  { id: 'b2', name: 'André Silva', avatar: 'https://picsum.photos/id/1012/100/100' },
  { id: 'b3', name: 'Marcos Santos', avatar: 'https://picsum.photos/id/1025/100/100' },
  { id: 'b4', name: 'Pedro Alves', avatar: 'https://picsum.photos/id/1006/100/100' },
];

export const MOCK_SHOPS: Barbershop[] = [
  {
    id: 'shop1',
    name: 'Barbearia Viking',
    address: 'Rua das Flores, 123 - Centro',
    rating: 4.8,
    reviewsCount: '120 avaliações',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfiIkrCDHGGl2ye5DAlPRpOIXdqoXIIvaMnmzX3s39r6Iwb29VmTiQPTIcBYXnE4rnT29BAzwWCVE7K2wbQICDu0gdMuq3L2IQtQbBprGAKSLPzRRe42E89RHgwh7xJ4Z4ufOZ6LHBkbm9Z26yioAFxwI1mqULqaqJyFiMbCFInxwyoGbynXuLVyJXoRZZw-NtLZzEOy0hWvcmgXT_Bh8eFUb05FMh2cTQRiC7JCsukyONFjkKb9vGIfrme2sZQFBXjZzLqN6naQE',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvWDmTsHef8Qf-Wj6SzM7MmNQUnpfgXopluASc0wTy_zAmlr3CB8kpsyZezcbzLllSExjc46VLr_GJo2PjxcmyJmtngtPtCctf_mOSMXpYuCOI6wmK7u__1kcZdSAPX4Q95c2de7jUFfWjFyj6iMU-q7XkjhboJ0TmfcsSmJZzYzxr5BP4e5nz9M-Y8CEK7g-0HaScelu08mUaT3qNR_JFWbyZaN8ApKT9WzQW5a_cK8vL2ssKlX2HXpDOTqXdX7RUbjbuBS23Ezo',
    status: 'Aberto',
    openingHours: '09:00 - 20:00',
    phone: '(11) 99999-8888',
    tags: ['Corte', 'Barba', 'Sobrancelha'],
    mainServicePrice: 45,
    mainServiceName: 'Corte Degradê',
    services: COMMON_SERVICES,
    barbers: [BARBERS[0], BARBERS[1], BARBERS[2]],
  },
  {
    id: 'shop2',
    name: 'Estilo & Navalha',
    address: 'Vila Madalena, SP',
    rating: 4.7,
    reviewsCount: '85 avaliações',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhj36tLftWNiOc-0h286B3O3rqg9nockMCbLdBgCcm67PmoxEv4npQuLuNhfKvX-C-gjOpjD73ece3nWpo8FiNkBdkPwMXVXP0eJ_da9wfwMyzzfPFpIxfBdyz6hejWtucLqCeoHlBwFNct8iYmSPOwFMqaPWRuPo9Uv8-sM1O8gBbRAtGUgI-OTQFEUUGCrMLsuvb6uLD0sqlx5J9eEJrJahVG1Guu7xNNPNASnsEj3LsWevhgpj-7yKCGvg74sQpUqZsCHomN5M',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkz0FeDNVkUm2oxlZf0j33y1SrAnzaKX6emYSwTBES9NBlsKDIL74GasUcotCeNJ4yCguJNKqGV4jY8ec8zGDeaKwYuaD1BFtYZTBE00DtwVnRt9aHd1TQJ9-g4rt4mm3aeSB1Qz2bHD1x-KR80zsNDd-Mn8Zvm9lD5EFWmM47qEONTSxwEFdZ6r78pEo6LSBmApQ_Nh5UYNUPwmqQBALx4Es-cp6M23e8RccwKu6FYEul1d_4FYQ6JZ5DTAI21-lx0TyshsfRZqQ',
    status: 'Fechado',
    openingHours: '10:00 - 22:00',
    phone: '(11) 98888-7777',
    tags: ['Corte', 'Barboterapia'],
    mainServicePrice: 60,
    mainServiceName: 'Corte + Barba',
    services: COMMON_SERVICES,
    barbers: [BARBERS[1], BARBERS[2]],
  },
  {
    id: 'shop3',
    name: "Gentleman's Club",
    address: 'Jardins, São Paulo',
    rating: 5.0,
    reviewsCount: '210 avaliações',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZH9IAPQEeC6I3MRD1w5dzyiuy9naIuzEfvq0xJDmeHE65iqyV6S_Tf8eHQTeDZd5IKyWAf_aaL9MfeE7Vd4qT07awsP_hsCPf_vwOi6V89fQlseijU1qJB3Q2uWl0al6WidgCtYI0LeVuB7jd0C9ZktaJtAgFCDWovILKql-I0x27deyGjM0a4OjlimIko8Api5LWs32KdXuu3Q3u5lyJjLx3Xf8Zn9wsBWN_hH0FrijdWeN5FddYwYRQUPrkT7mfY0YGA9dxHWk',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz6bgosPGpBjnA4nOgbWjPxU4-fEx9BH6kP5qzikloINfLeMLB510TljmVoo_20bUJOeAeqqqDcMYhYkwIH_AJaGthOhlLNRYsXI7J_N0tbwpAMbHJTzLlbmodPVnW8aUoUwNZ-wAv_1CVjvE4dIwet1gybIH7mZkl5JY8Ta6AJv7H-xTYtRfLl4RrTkLZNGRIjqZjCPQVjPGkS48RsJUOZHGv1tJIp3kwxqmWgUB-tjr61ogcjFpTw7EhC4diWEHDNHF4GLMMiR0',
    status: 'Aberto',
    openingHours: '08:00 - 19:00',
    phone: '(11) 97777-6666',
    tags: ['Completo', 'Massagem'],
    mainServicePrice: 80,
    mainServiceName: 'Serviço Premium',
    services: COMMON_SERVICES,
    barbers: [BARBERS[0], BARBERS[2], BARBERS[3]],
  },
];

export const TIME_SLOTS = [
  '09:00', '09:45', '10:30', '11:15', '13:00', '13:45', '14:30', '15:15', '16:00', '16:45', '17:30', '18:15', '19:00'
];