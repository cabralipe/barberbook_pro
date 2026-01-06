export interface Service {
  id: string;
  name: string;
  price: number;
  durationMin: number;
  description?: string;
  category?: 'Cabelo' | 'Barba' | 'Combo' | 'Outros';
  discount?: number;
}

export interface Barber {
  id: string;
  name: string;
  avatar: string;
}

export interface Barbershop {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewsCount?: string; // e.g. "500+"
  image: string;
  logo?: string;
  status: 'Aberto' | 'Fechado' | 'Agenda Cheia' | 'Lotado';
  openingHours: string;
  phone: string;
  tags: string[];
  mainServicePrice: number;
  mainServiceName: string;
  services: Service[];
  barbers: Barber[];
}

export enum PaymentMethod {
  CREDIT_CARD = 'Cartão de Crédito',
  DEBIT_CARD = 'Cartão de Débito',
  PIX = 'PIX',
  CASH = 'Dinheiro',
}

export interface BookingState {
  step: 'shops' | 'services' | 'datetime' | 'payment' | 'confirmation';
  selectedShop: Barbershop | null;
  selectedServices: Service[];
  selectedBarber: Barber | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  paymentMethod: PaymentMethod | null;
}