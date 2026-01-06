export interface Service {
  id: string;
  name: string;
  price: number | string;
  duration_min: number;
  description?: string;
  category?: 'Cabelo' | 'Barba' | 'Combo' | 'Outros';
  discount?: number | string;
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
  reviews_count?: string; // e.g. "500+"
  image: string;
  logo?: string;
  status: 'Aberto' | 'Fechado' | 'Agenda Cheia' | 'Lotado';
  opening_hours: string;
  phone: string;
  tags: string[];
  main_service_price: number | string;
  main_service_name: string;
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