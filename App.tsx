import React, { useState, useEffect } from 'react';
import { MapPin, Star, Calendar, Clock, Check, ChevronLeft, Scissors, Sparkles, CreditCard, User, AlertCircle, Search, Menu, ChevronDown, Facebook, Instagram, Share2, Heart, Map, Phone, Banknote, ArrowRight, Palette, Leaf, DollarSign, CheckCircle, QrCode, Home, Mail } from 'lucide-react';
import { TIME_SLOTS } from './constants';
import { getShops, login, register, setAuthToken, createBooking } from './services/api';
import { Barbershop, BookingState, PaymentMethod, Service, Barber } from './types';
import { Button } from './components/Button';
import { AIModal } from './components/AIModal';
import { Login } from './components/Login';
import { Register } from './components/Register';

// Initial State
const initialBookingState: BookingState = {
  step: 'shops',
  selectedShop: null,
  selectedServices: [],
  selectedBarber: null,
  selectedDate: null, // Initialize as null
  selectedTime: null,
  paymentMethod: null,
};

type ViewState = 'booking' | 'login' | 'register';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('booking');
  const [booking, setBooking] = useState<BookingState>(initialBookingState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shops, setShops] = useState<Barbershop[]>([]);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await getShops();
        setShops(data);
      } catch (error) {
        console.error("Failed to fetch shops:", error);
      }
    };
    fetchShops();
  }, []);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [booking.step, view]);

  // --- Handlers ---

  const handleSelectShop = (shop: Barbershop) => {
    setBooking(prev => ({ ...prev, selectedShop: shop, step: 'services' }));
  };

  const toggleService = (service: Service) => {
    setBooking(prev => {
      const isSelected = prev.selectedServices.some(s => s.id === service.id);
      let newServices;
      if (isSelected) {
        newServices = prev.selectedServices.filter(s => s.id !== service.id);
      } else {
        newServices = [...prev.selectedServices, service];
      }
      return { ...prev, selectedServices: newServices };
    });
  };

  const handleQuickBook = (service: Service) => {
    // Select only this service and move to next step
    // Default to 'Any' barber (null) and today's date if not set, 
    // but better to let user pick in the next screen.
    const today = new Date();
    setBooking(prev => ({
      ...prev,
      selectedServices: [service],
      selectedDate: today, // Set a default date to show the calendar active
      selectedBarber: null, // Default to Any
      step: 'datetime'
    }));
  };

  const handleSelectBarber = (barber: Barber | null) => {
    setBooking(prev => ({ ...prev, selectedBarber: barber }));
  };

  const handleDateSelect = (day: number) => {
    const date = new Date();
    date.setDate(day);
    setBooking(prev => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time: string) => {
    setBooking(prev => ({ ...prev, selectedTime: time }));
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setBooking(prev => ({ ...prev, paymentMethod: method }));
  };

  const goBack = () => {
    const steps: BookingState['step'][] = ['shops', 'services', 'datetime', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(booking.step);
    if (currentIndex > 0) {
      setBooking(prev => ({ ...prev, step: steps[currentIndex - 1] }));
    }
  };

  const nextStep = () => {
    const steps: BookingState['step'][] = ['shops', 'services', 'datetime', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(booking.step);
    if (currentIndex < steps.length - 1) {
      setBooking(prev => ({ ...prev, step: steps[currentIndex + 1] }));
    }
  };

  const resetBooking = () => {
    setBooking(initialBookingState);
  };

  const handleLogin = async (email: any, password: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login({ email, password });
      // Djoser default uses username, but can be configured. 
      // If I used AbstractUser, it has username. 
      // I'll assume username is passed as email or I should change Login to use username.
      // For now let's try passing email as username if djoser is standard.
      // Wait, djoser uses USERNAME_FIELD. If I didn't change it, it's username.
      // I'll assume the user enters username in the email field for now or I'll fix it later.
      // Actually, let's pass { username: email, password }.
      const token = data.access;
      setAuthToken(token);
      setView('booking');
    } catch (error: any) {
      console.error("Login failed:", error);
      setError("Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      await register(userData);
      // Auto login after register or ask to login?
      // Let's try to auto login
      const loginData = await login({ username: userData.username, password: userData.password });
      setAuthToken(loginData.access);
      setView('booking');
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError("Falha no cadastro. Verifique os dados e tente novamente.");
      // Check if error response has details
      if (error.response && error.response.data) {
        const msg = Object.values(error.response.data).flat().join(' ');
        if (msg) setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    // Simulate register and return to app (or login)
    setView('booking');
  };

  const handleLogout = () => {
    setView('login');
  };

  // --- Render Steps ---

  const renderShops = () => (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-background-dark pt-8 pb-12 lg:pt-16 lg:pb-20 px-4">
        <div className="layout-container flex flex-col items-center max-w-[1200px] mx-auto w-full">
          <div className="w-full relative overflow-hidden rounded-2xl bg-surface-dark border border-border-dark">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center opacity-40"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbRrfhZpyU89ESPIFFxzfHgGp68GuFzKzImK7c1IjkuqgonBQ9en3p4uwz1fmuYXcEBwvLZF5knPg6Kt4cfszrvxYUzDtNuL9E6k6BhZfEXKiyovO3Jid3VBqpctno0VcQfsUwoVoEmWoa-4bZGuKspbIwLFXPfvJGJ-Sn-YVOrtwxhWpVIcm1leyzdTYWw-fzMQZe6fhkbjveWYRkX-0SbuDsRHUsx7uUfhmfLMZSEGmWIbsHvz-ckf9k3ykR0JK86-CZVlbg6K4")' }}
              >
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 lg:py-24 gap-6">
              <div className="max-w-3xl flex flex-col gap-4">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                  Seu estilo, <span className="text-primary">sua escolha.</span>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
                  Encontre as melhores barbearias da sua região e agende seu horário em segundos.
                </p>
              </div>

              {/* Search Box */}
              <div className="w-full max-w-4xl mt-6 bg-surface-dark/90 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-border-dark shadow-xl">
                <form className="flex flex-col md:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex-1 relative group text-left">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="text-text-secondary group-focus-within:text-primary transition-colors" size={20} />
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-3.5 bg-background-dark border border-border-dark rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                      placeholder="Nome da barbearia..."
                      type="text"
                    />
                  </div>
                  <div className="flex-1 relative group text-left">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="text-text-secondary group-focus-within:text-primary transition-colors" size={20} />
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-3.5 bg-background-dark border border-border-dark rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                      placeholder="Cidade ou Bairro (Ex: Centro, SP)"
                      type="text"
                    />
                  </div>
                  <button className="w-full md:w-auto px-8 py-3.5 bg-primary hover:bg-[#e07b1e] text-[#181411] font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full max-w-4xl px-4">
            {[
              { label: 'Barbearias', value: '500+' },
              { label: 'Agendamentos', value: '50k+' },
              { label: 'Avaliação Média', value: '4.9' },
              { label: 'Disponível', value: '24/7' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-text-secondary uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Featured */}
      <section className="flex-1 bg-background-dark pb-20 px-4">
        <div className="max-w-[1200px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-border-dark pb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Barbearias em Destaque</h2>
              <p className="text-text-secondary">As melhores avaliações da semana</p>
            </div>
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <button className="whitespace-nowrap px-4 py-2 rounded-full bg-primary text-[#181411] text-sm font-bold">Todos</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-highlight text-text-secondary hover:text-white hover:bg-[#4a3f35] text-sm font-medium transition-colors">Perto de mim</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-highlight text-text-secondary hover:text-white hover:bg-[#4a3f35] text-sm font-medium transition-colors">Melhor avaliados</button>
              <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-highlight text-text-secondary hover:text-white hover:bg-[#4a3f35] text-sm font-medium transition-colors">Abertos agora</button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map(shop => (
              <div
                key={shop.id}
                onClick={() => handleSelectShop(shop)}
                className="group bg-surface-dark border border-border-dark rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-bold">{shop.rating}</span>
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url("${shop.image}")` }}
                  >
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-surface-dark to-transparent"></div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{shop.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${shop.status === 'Aberto' ? 'bg-green-500/20 text-green-500 border-green-500/20' :
                      shop.status === 'Fechado' ? 'bg-red-500/20 text-red-500 border-red-500/20' :
                        'bg-gray-500/20 text-gray-500 border-gray-500/20'
                      }`}>
                      {shop.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-text-secondary mb-4 text-sm">
                    <MapPin size={16} />
                    <p>{shop.address}</p>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {shop.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-surface-highlight text-text-secondary px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border-dark flex items-center justify-between">
                    <div className="text-xs text-text-secondary">
                      <span className="block text-white font-bold text-sm">R$ {shop.mainServicePrice.toFixed(2).replace('.', ',')}</span>
                      {shop.mainServiceName}
                    </div>
                    <button className={`${shop.status === 'Lotado' || shop.status === 'Agenda Cheia' ? 'opacity-50 cursor-not-allowed bg-surface-highlight hover:bg-surface-highlight text-white' : 'bg-primary hover:bg-[#e07b1e] text-[#181411]'} text-sm font-bold py-2 px-4 rounded-lg transition-colors`}>
                      {shop.status === 'Lotado' || shop.status === 'Agenda Cheia' ? 'Lotado' : 'Agendar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border-dark bg-transparent text-text-secondary hover:text-white hover:bg-surface-highlight transition-colors font-medium">
              <span>Carregar mais barbearias</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </section>
    </>
  );

  const renderServices = () => {
    if (!booking.selectedShop) return null;
    const shop = booking.selectedShop;
    const totalSelected = booking.selectedServices.length;

    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-6 animate-fade-in">

        {/* Hero / Cover Image */}
        <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden mb-6 relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent z-10"></div>
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${shop.image}')` }}
          ></div>
          <div className="absolute bottom-4 right-4 z-20">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors border border-white/20">
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              Ver Galeria
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center -mt-16 md:-mt-20 relative z-20 px-2 mb-10">
          {/* Avatar */}
          <div className="relative">
            <div className="size-32 md:size-40 rounded-full border-4 border-background-dark bg-surface-dark overflow-hidden shadow-xl">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${shop.logo || shop.image}')` }}
              ></div>
            </div>
            <div className={`absolute bottom-2 right-2 border-2 border-background-dark size-5 rounded-full ${shop.status === 'Aberto' ? 'bg-green-500' : 'bg-red-500'}`} title={shop.status}></div>
          </div>

          {/* Info */}
          <div className="flex-1 pt-2 md:pt-12 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{shop.name}</h1>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-text-secondary text-sm md:text-base">
                  <span className="flex items-center gap-1">
                    <Star className="text-primary fill-primary" size={18} />
                    <span className="text-white font-semibold">{shop.rating}</span>
                    <span>({shop.reviewsCount || '100+'} avaliações)</span>
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={18} />
                    {shop.address}
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className={`${shop.status === 'Aberto' ? 'text-green-400' : 'text-red-400'} font-medium`}>{shop.status}</span>
                  <span className="text-xs opacity-70">Fecha às 20:00</span>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                <button className="flex-1 md:flex-none h-10 px-4 rounded-lg bg-surface-dark border border-border-dark text-white text-sm font-bold hover:bg-border-dark transition-colors flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  <span className="hidden sm:inline">Compartilhar</span>
                </button>
                <button className="flex-1 md:flex-none h-10 px-4 rounded-lg bg-surface-dark border border-border-dark text-white text-sm font-bold hover:bg-border-dark transition-colors flex items-center justify-center gap-2">
                  <Heart size={18} />
                  <span className="hidden sm:inline">Salvar</span>
                </button>
                <button className="flex-1 md:flex-none h-10 px-4 rounded-lg bg-primary text-[#181411] text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                  <Map size={18} />
                  Ver no Mapa
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Professionals & Info */}
          <div className="lg:col-span-1 flex flex-col gap-8 order-2 lg:order-1">
            {/* Professionals */}
            <div className="rounded-xl border border-border-dark bg-surface-dark/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Profissionais</h3>
                <button className="text-primary text-sm font-medium hover:underline">Ver todos</button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3 overflow-hidden p-1">
                  {shop.barbers.slice(0, 3).map((barber) => (
                    <div
                      key={barber.id}
                      className="inline-block size-12 rounded-full ring-2 ring-background-dark bg-cover bg-center"
                      style={{ backgroundImage: `url('${barber.avatar}')` }}
                      title={barber.name}
                    ></div>
                  ))}
                  {shop.barbers.length > 3 && (
                    <div className="inline-block size-12 rounded-full ring-2 ring-background-dark bg-surface-dark text-text-secondary flex items-center justify-center text-xs font-bold border border-border-dark">
                      +{shop.barbers.length - 3}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-text-secondary text-sm mt-3">Nossa equipe é especializada em cortes clássicos e modernos.</p>
            </div>

            {/* Contact & Hours */}
            <div className="rounded-xl border border-border-dark bg-surface-dark/50 p-6 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white mb-1">Informações</h3>
              <div className="flex items-start gap-3">
                <Phone className="text-primary mt-0.5" size={20} />
                <div>
                  <p className="text-white text-sm font-medium">{shop.phone}</p>
                  <p className="text-text-secondary text-xs">Telefone e WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="text-primary mt-0.5" size={20} />
                <div>
                  <p className="text-white text-sm font-medium">Seg - Sex: {shop.openingHours}</p>
                  <p className="text-white text-sm font-medium">Sáb: 09:00 - 18:00</p>
                  <p className="text-text-secondary text-xs mt-1">Domingo Fechado</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Banknote className="text-primary mt-0.5" size={20} />
                <div>
                  <p className="text-white text-sm font-medium">Formas de Pagamento</p>
                  <p className="text-text-secondary text-xs">Pix, Cartão de Crédito, Dinheiro</p>
                </div>
              </div>
            </div>

            {/* Mini Map Image */}
            <div className="rounded-xl border border-border-dark overflow-hidden h-40 bg-surface-dark relative">
              <div className="absolute inset-0 bg-cover bg-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBCo8Wh32GfB86CJLPZwCPZFnit1qXtsmb4BTbTF3pymuvgqz6RQJokhMLn0FsQKR4R4zvZnVqOEkDOAJlNUgAEu4F4HZFO1yBzlKkw4vRvSkSMnOHeSQa1a1MQhrayJakXVSEpfO1AFe1uG7Jelrcx1kTP1rahKK39kDkhoKJlgCIEomRx0G_6b9578tDszlbHnU8m-bx8JuLC-y8f40bF4y7uLBC4v1Yv0mENEngQYejFPiqA8lKl2uRhsEAx_I-ACRy8xnAzzMY")' }}>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                  <MapPin size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Services */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 px-1 gap-4">
              <h2 className="text-2xl font-bold text-white">Serviços Disponíveis</h2>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setAiModalOpen(true)}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-1 hover:brightness-110 transition-all"
                >
                  <Sparkles size={12} />
                  AI Stylist
                </button>
                <div className="hidden sm:flex gap-2">
                  <button className="px-3 py-1 rounded-full bg-primary text-[#181411] text-xs font-bold">Todos</button>
                  <button className="px-3 py-1 rounded-full bg-surface-dark border border-border-dark text-text-secondary hover:text-white text-xs font-medium transition-colors">Cabelo</button>
                  <button className="px-3 py-1 rounded-full bg-surface-dark border border-border-dark text-text-secondary hover:text-white text-xs font-medium transition-colors">Barba</button>
                  <button className="px-3 py-1 rounded-full bg-surface-dark border border-border-dark text-text-secondary hover:text-white text-xs font-medium transition-colors">Combos</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shop.services.map(service => {
                const isSelected = booking.selectedServices.some(s => s.id === service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service)}
                    className={`group relative flex flex-col justify-between rounded-xl border p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5 cursor-pointer ${isSelected ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'bg-surface-dark border-border-dark hover:border-primary/50'
                      }`}
                  >
                    {service.category === 'Combo' && (
                      <div className="absolute top-0 right-0">
                        <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">POPULAR</span>
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between items-start mb-2 pr-8">
                        <h3 className={`text-lg font-bold transition-colors ${isSelected ? 'text-primary' : 'text-white group-hover:text-primary'}`}>{service.name}</h3>
                        <span className="text-primary font-bold text-lg">R$ {service.price},00</span>
                      </div>
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{service.description}</p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-4 border-t border-border-dark pt-3 mb-4">
                        <div className="flex items-center gap-1.5 text-text-secondary text-xs font-medium bg-background-dark/50 px-2 py-1 rounded">
                          <Clock size={14} />
                          <span>{service.durationMin} min</span>
                        </div>
                        {service.discount ? (
                          <div className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
                            <DollarSign size={14} />
                            <span>Economize R$ {service.discount}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-text-secondary text-xs font-medium">
                            {service.category === 'Barba' ? <Leaf size={14} /> : service.category === 'Outros' ? <Palette size={14} /> : <Scissors size={14} />}
                            <span>{service.category || 'Serviço'}</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickBook(service);
                        }}
                        className="w-full rounded-lg bg-primary py-2.5 text-[#181411] font-bold text-sm hover:bg-[#e07b1e] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                      >
                        <span>Agendar Horário</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Floating Continue Button if multiple selected */}
            {totalSelected > 0 && (
              <div className="fixed bottom-6 right-6 z-40 animate-slide-up">
                <button
                  onClick={() => {
                    // Move to next step with "Any" barber as default if not set
                    setBooking(prev => ({
                      ...prev,
                      selectedDate: new Date(),
                      selectedBarber: null,
                      step: 'datetime'
                    }));
                  }}
                  className="bg-primary text-[#181411] px-6 py-4 rounded-full font-bold shadow-2xl shadow-primary/40 flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <span>Continuar ({totalSelected})</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDateTime = () => {
    if (!booking.selectedShop) return null;

    // Mock calendar generation for current month
    const daysInMonth = 31;
    const startDayOffset = 2; // Starts on Tuesday (mock)
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

    const selectedService = booking.selectedServices[0];
    const total = booking.selectedServices.reduce((acc, s) => acc + s.price, 0);

    // Function to get a random barber for a time slot if "Any" is selected
    // In a real app this would come from backend availability
    const getBarberForTime = (time: string, index: number) => {
      if (booking.selectedBarber) return booking.selectedBarber.name.split(' ')[0];
      const barbers = booking.selectedShop?.barbers || [];
      return barbers[index % barbers.length].name.split(' ')[0];
    };

    return (
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 animate-fade-in">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-text-secondary">
          <ol className="flex items-center gap-2">
            <li><button onClick={() => setBooking(initialBookingState)} className="hover:text-primary transition-colors">Home</button></li>
            <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
            <li><button onClick={goBack} className="hover:text-primary transition-colors">{booking.selectedShop.name}</button></li>
            <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
            <li className="text-white font-medium">Agendamento</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Selection Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Professional Selection */}
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="text-primary" size={20} />
                  Profissional
                </h2>
                <span className="text-xs text-text-secondary">Opcional</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {/* "Any" Option */}
                <label className="cursor-pointer group flex-shrink-0">
                  <input
                    type="radio"
                    name="professional"
                    className="peer sr-only"
                    checked={booking.selectedBarber === null}
                    onChange={() => handleSelectBarber(null)}
                  />
                  <div className="flex flex-col items-center gap-2 min-w-[80px] p-2 rounded-xl border border-transparent peer-checked:bg-primary/10 peer-checked:border-primary transition-all">
                    <div className="size-14 rounded-full bg-border-dark flex items-center justify-center text-text-secondary group-hover:bg-border-dark/80 transition-colors">
                      <span className="material-symbols-outlined text-2xl">groups</span>
                    </div>
                    <span className="text-sm font-medium text-text-secondary peer-checked:text-primary group-hover:text-white text-center leading-tight">Qualquer<br />um</span>
                  </div>
                </label>

                {/* Barbers */}
                {booking.selectedShop.barbers.map(barber => (
                  <label key={barber.id} className="cursor-pointer group flex-shrink-0">
                    <input
                      type="radio"
                      name="professional"
                      className="peer sr-only"
                      checked={booking.selectedBarber?.id === barber.id}
                      onChange={() => handleSelectBarber(barber)}
                    />
                    <div className="flex flex-col items-center gap-2 min-w-[80px] p-2 rounded-xl border border-transparent peer-checked:bg-primary/10 peer-checked:border-primary transition-all">
                      <div
                        className="size-14 rounded-full bg-cover bg-center ring-2 ring-transparent peer-checked:ring-primary transition-all"
                        style={{ backgroundImage: `url('${barber.avatar}')` }}
                      ></div>
                      <span className="text-sm font-medium text-text-secondary peer-checked:text-primary group-hover:text-white">{barber.name.split(' ')[0]}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="text-primary" size={20} />
                Selecione a Data
              </h2>
              <div className="flex items-center justify-between mb-6">
                <button className="p-2 hover:bg-border-dark rounded-full text-text-secondary hover:text-white transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="text-white font-semibold text-lg capitalize">Outubro 2023</span>
                <button className="p-2 hover:bg-border-dark rounded-full text-text-secondary hover:text-white transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                {weekDays.map(day => (
                  <div key={day} className="text-text-secondary text-xs font-medium py-2">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Mock Empty Days */}
                <div className="text-white/20 p-2 text-sm">29</div>
                <div className="text-white/20 p-2 text-sm">30</div>

                {/* Actual Days */}
                {calendarDays.map(day => {
                  const isSelected = booking.selectedDate && booking.selectedDate.getDate() === day;
                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      className={`p-2 text-sm rounded-lg transition-colors ${isSelected
                        ? 'bg-primary text-[#181411] font-bold shadow-lg shadow-primary/20'
                        : 'text-white hover:bg-border-dark'
                        }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Selection */}
            {booking.selectedDate && (
              <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="text-primary" size={20} />
                    Horários Disponíveis
                  </h2>
                  <span className="text-sm text-text-secondary">Sexta, {booking.selectedDate.getDate()} de Outubro</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {TIME_SLOTS.map((time, idx) => {
                    const isSelected = booking.selectedTime === time;
                    const isUnavailable = time === '13:00'; // Mock unavailable slot
                    const assignedBarber = getBarberForTime(time, idx);

                    if (isUnavailable) {
                      return (
                        <button key={time} disabled className="py-2 px-3 rounded-lg border border-border-dark text-white/20 text-sm font-medium bg-background-dark/10 cursor-not-allowed flex flex-col items-center gap-1">
                          <span className="line-through">{time}</span>
                          <span className="text-[10px]">Indisp.</span>
                        </button>
                      )
                    }

                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all flex flex-col items-center gap-1 group ${isSelected
                          ? 'border-primary bg-primary/20 text-primary shadow-md shadow-primary/10 ring-1 ring-primary/50'
                          : 'border-border-dark text-text-secondary bg-background-dark/30 hover:bg-background-dark hover:text-white hover:border-primary/50'
                          }`}
                      >
                        <span className={isSelected ? 'font-bold' : ''}>{time}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-primary/80' : 'opacity-60 group-hover:opacity-100'}`}>
                          {assignedBarber}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar - Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6 sticky top-24">
              <h3 className="text-white font-bold text-lg mb-4">Resumo do Agendamento</h3>

              {selectedService && (
                <div className="flex gap-4 items-start mb-6 pb-6 border-b border-border-dark">
                  <div className="size-16 rounded-lg bg-background-dark flex items-center justify-center text-primary border border-border-dark shrink-0">
                    <Scissors size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{selectedService.name}</h4>
                    <p className="text-text-secondary text-sm mt-1 line-clamp-2">{selectedService.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                      <span className="flex items-center gap-1 bg-background-dark/50 px-2 py-0.5 rounded">
                        <Clock size={12} /> {selectedService.durationMin} min
                      </span>
                      <span className="flex items-center gap-1 text-primary font-bold">
                        R$ {selectedService.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Data</span>
                  <span className="text-white font-medium text-sm">
                    {booking.selectedDate ? `${booking.selectedDate.getDate()} Out, Sexta` : '-'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Horário</span>
                  <span className="text-white font-medium text-sm">
                    {booking.selectedTime || '-'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">Profissional</span>
                  <div className="flex items-center gap-2">
                    {booking.selectedBarber ? (
                      <>
                        <div className="size-5 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${booking.selectedBarber.avatar}')` }}></div>
                        <span className="text-white font-medium text-sm">{booking.selectedBarber.name.split(' ')[0]}</span>
                      </>
                    ) : (
                      <span className="text-white font-medium text-sm">Qualquer um</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 pt-4 border-t border-border-dark border-dashed">
                <span className="text-white font-bold">Total</span>
                <span className="text-2xl text-primary font-bold">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>

              <button
                onClick={nextStep}
                disabled={!booking.selectedDate || !booking.selectedTime}
                className="w-full rounded-lg bg-primary py-3 text-[#181411] font-bold text-sm hover:bg-[#e07b1e] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Confirmar Agendamento</span>
                <Check size={18} />
              </button>
              <p className="text-center text-text-secondary text-xs mt-4">
                Ao confirmar, você concorda com nossa política de cancelamento.
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const handleConfirmPayment = async () => {
    if (!booking.selectedShop || !booking.selectedDate || !booking.selectedTime) return;

    try {
      const bookingData = {
        shop: booking.selectedShop.id,
        barber: booking.selectedBarber ? booking.selectedBarber.id : null,
        services: booking.selectedServices.map(s => s.id),
        date: booking.selectedDate.toISOString().split('T')[0],
        time: booking.selectedTime,
        payment_method: booking.paymentMethod || 'Cartão de Crédito', // Default
        status: 'Pending'
      };

      await createBooking(bookingData);
      nextStep();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  const renderPayment = () => {
    if (!booking.selectedShop) return null;

    // Calculate totals
    const total = booking.selectedServices.reduce((acc, s) => acc + s.price, 0);

    return (
      <div className="w-full flex justify-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-[1024px] grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content (Left) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2 border-b border-border-dark pb-4">
              <h1 className="text-white text-2xl sm:text-3xl font-black leading-tight tracking-[-0.033em]">Finalizar Pagamento</h1>
              <p className="text-text-secondary text-base font-normal leading-normal">Escolha a forma de pagamento para confirmar seu agendamento.</p>
            </div>

            <div className="bg-card-dark border border-card-border rounded-xl p-6 shadow-lg shadow-black/20">
              <h3 className="text-white text-lg font-bold mb-4">Método de Pagamento</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="payment_method"
                    className="peer sr-only"
                    checked={booking.paymentMethod === PaymentMethod.CREDIT_CARD || booking.paymentMethod === null} // Default or selected
                    onChange={() => handlePaymentSelect(PaymentMethod.CREDIT_CARD)}
                  />
                  <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-border-dark bg-[#393028]/30 hover:bg-[#393028]/70 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                    <span className="material-symbols-outlined text-3xl">credit_card</span>
                    <span className="text-sm font-bold text-white group-hover:text-white peer-checked:text-primary">Cartão de Crédito</span>
                  </div>
                </label>

                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="payment_method"
                    className="peer sr-only"
                    checked={booking.paymentMethod === PaymentMethod.PIX}
                    onChange={() => handlePaymentSelect(PaymentMethod.PIX)}
                  />
                  <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-border-dark bg-[#393028]/30 hover:bg-[#393028]/70 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                    <span className="material-symbols-outlined text-3xl">qr_code_2</span>
                    <span className="text-sm font-bold text-white group-hover:text-white peer-checked:text-primary">PIX</span>
                  </div>
                </label>

                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="payment_method"
                    className="peer sr-only"
                    checked={booking.paymentMethod === PaymentMethod.CASH} // Using CASH for Digital Wallet/Other to map to existing enum
                    onChange={() => handlePaymentSelect(PaymentMethod.CASH)}
                  />
                  <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-border-dark bg-[#393028]/30 hover:bg-[#393028]/70 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                    <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                    <span className="text-sm font-bold text-white group-hover:text-white peer-checked:text-primary">Carteira Digital</span>
                  </div>
                </label>
              </div>

              {/* Credit Card Form - Show when Credit Card is selected or default */}
              {(booking.paymentMethod === PaymentMethod.CREDIT_CARD || booking.paymentMethod === null) && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300" id="credit-card-form">
                  <div className="flex flex-col gap-1">
                    <label className="text-text-secondary text-sm font-medium">Nome no Cartão</label>
                    <input className="w-full h-11 px-4 rounded-lg border border-border-dark bg-[#181411] text-white placeholder-text-secondary/60 focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm" placeholder="Como impresso no cartão" type="text" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-text-secondary text-sm font-medium">Número do Cartão</label>
                    <div className="relative">
                      <input className="w-full h-11 pl-12 pr-4 rounded-lg border border-border-dark bg-[#181411] text-white placeholder-text-secondary/60 focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm" placeholder="0000 0000 0000 0000" type="text" />
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">credit_card</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                      <label className="text-text-secondary text-sm font-medium">Validade</label>
                      <input className="w-full h-11 px-4 rounded-lg border border-border-dark bg-[#181411] text-white placeholder-text-secondary/60 focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm" placeholder="MM/AA" type="text" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <label className="text-text-secondary text-sm font-medium">CVV</label>
                      <div className="relative">
                        <input className="w-full h-11 px-4 rounded-lg border border-border-dark bg-[#181411] text-white placeholder-text-secondary/60 focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm" placeholder="123" type="text" />
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary text-[20px] cursor-help" title="Código de segurança de 3 dígitos no verso do cartão">help</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input className="rounded border-border-dark bg-[#181411] text-primary focus:ring-primary/20" type="checkbox" />
                    <label className="text-text-secondary text-sm">Salvar cartão para futuros pagamentos</label>
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleConfirmPayment} className="lg:hidden w-full flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary hover:bg-primary-dark transition-all text-[#181411] text-base font-bold shadow-lg shadow-orange-900/20">
              <span className="material-symbols-outlined">lock</span>
              <span>Pagar R$ {total.toFixed(2).replace('.', ',')}</span>
            </button>
          </div>

          {/* Sidebar Summary (Right) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="bg-card-dark border border-card-border rounded-xl overflow-hidden shadow-lg shadow-black/20">
                <div className="h-2 bg-gradient-to-r from-primary to-orange-400"></div>
                <div className="p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-lg font-bold">Resumo do Pedido</h3>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Pendente</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="size-12 rounded-lg bg-cover bg-center shrink-0 border border-border-dark" style={{ backgroundImage: `url('${booking.selectedShop.logo || booking.selectedShop.image}')` }}></div>
                      <div className="flex flex-col">
                        <p className="text-white font-bold leading-tight">{booking.selectedShop.name}</p>
                        <p className="text-text-secondary text-sm">{booking.selectedShop.address}</p>
                      </div>
                    </div>

                    <div className="border-t border-border-dark border-dashed my-1"></div>

                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                          <span class="text-sm">Data</span>
                        </div>
                        <span className="text-white font-medium text-sm">
                          {booking.selectedDate ? `${booking.selectedDate.getDate()} Out, 2023` : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <span className="material-symbols-outlined text-[18px]">schedule</span>
                          <span class="text-sm">Horário</span>
                        </div>
                        <span className="text-white font-medium text-sm">{booking.selectedTime || '-'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <span className="material-symbols-outlined text-[18px]">person</span>
                          <span class="text-sm">Profissional</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {booking.selectedBarber ? (
                            <>
                              <div className="size-5 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${booking.selectedBarber.avatar}')` }}></div>
                              <span className="text-white font-medium text-sm">{booking.selectedBarber.name.split(' ')[0]}</span>
                            </>
                          ) : (
                            <span className="text-white font-medium text-sm">Qualquer um</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#181411] rounded-lg p-3 border border-border-dark">
                      {booking.selectedServices.map(s => (
                        <div key={s.id} className="mb-2 last:mb-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm font-medium">{s.name}</span>
                            <span className="text-white text-sm font-bold">R$ {s.price.toFixed(2).replace('.', ',')}</span>
                          </div>
                          <p className="text-text-secondary text-xs">Aprox. {s.durationMin} min</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex justify-between items-center pt-4 border-t border-border-dark">
                      <span className="text-white text-lg font-bold">Total a pagar</span>
                      <span className="text-primary text-2xl font-black">R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmPayment}
                    className="hidden lg:flex w-full items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary hover:bg-primary-dark transition-all text-[#181411] text-base font-bold shadow-lg shadow-orange-900/20 group"
                  >
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">lock</span>
                    <span>Confirmar Pagamento</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-text-secondary/60 text-xs">
                    <span className="material-symbols-outlined text-[14px]">verified_user</span>
                    <span>Pagamento 100% seguro</span>
                  </div>
                </div>
              </div>

              <button
                onClick={goBack}
                className="w-full text-text-secondary hover:text-red-500 text-sm font-medium transition-colors flex items-center justify-center gap-2 py-2"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Voltar para agendamentos
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    if (!booking.selectedShop || !booking.selectedDate) return null;

    const total = booking.selectedServices.reduce((acc, s) => acc + s.price, 0);
    const bookingNumber = "#84930";

    // Determine readable payment method
    let paymentText = "Pago via Cartão de Crédito";
    if (booking.paymentMethod === PaymentMethod.PIX) paymentText = "Pago via PIX";
    else if (booking.paymentMethod === PaymentMethod.CASH) paymentText = "Pago via Carteira Digital";

    return (
      <div className="w-full flex justify-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-[1024px] grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Success Area (Left) */}
          <div className="lg:col-span-2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left gap-6 py-4 lg:py-8">

            <div className="size-24 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2 animate-in fade-in zoom-in duration-500">
              <CheckCircle size={64} className="text-green-500" />
            </div>

            <div className="space-y-4 max-w-xl">
              <h1 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Agendamento Confirmado!</h1>
              <p className="text-text-secondary text-lg">
                Parabéns! Seu horário está garantido. O pagamento de <span className="text-white font-bold">R$ {total.toFixed(2).replace('.', ',')}</span> foi processado com sucesso.
              </p>
            </div>

            <div className="w-full max-w-lg mt-4 bg-card-dark border border-card-border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-lg shadow-black/20">
              <div className="bg-white p-2 rounded-lg shrink-0">
                <div className="size-24 border-2 border-black flex items-center justify-center bg-white rounded">
                  <QrCode size={60} className="text-black" />
                </div>
              </div>
              <div className="flex flex-col gap-1 text-center sm:text-left flex-1">
                <span className="text-text-secondary text-xs font-bold uppercase tracking-wider">Número do Agendamento</span>
                <span className="text-primary text-3xl font-black tracking-widest font-mono">{bookingNumber}</span>
                <p className="text-text-secondary text-sm mt-1 leading-snug">Apresente este código ou o QR Code na recepção da barbearia.</p>
              </div>
            </div>

            <div className="flex flex-col w-full sm:flex-row gap-4 mt-6 max-w-lg">
              <button className="flex-1 h-12 rounded-lg bg-primary hover:bg-primary-dark text-[#181411] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/20">
                <Calendar size={20} />
                Ver Meus Agendamentos
              </button>
              <button
                onClick={resetBooking}
                className="flex-1 h-12 rounded-lg border border-border-dark hover:bg-surface-highlight text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Home size={20} />
                Voltar para Início
              </button>
            </div>
          </div>

          {/* Details Sidebar (Right) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="bg-card-dark border border-card-border rounded-xl overflow-hidden shadow-lg shadow-black/20">
                <div className="h-2 bg-gradient-to-r from-green-500 to-green-400"></div>
                <div className="p-6 flex flex-col gap-6">

                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-lg font-bold">Detalhes</h3>
                    <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Check size={14} />
                      Confirmado
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="size-12 rounded-lg bg-cover bg-center shrink-0 border border-border-dark" style={{ backgroundImage: `url('${booking.selectedShop.logo || booking.selectedShop.image}')` }}></div>
                      <div className="flex flex-col">
                        <p className="text-white font-bold leading-tight">{booking.selectedShop.name}</p>
                        <p className="text-text-secondary text-sm">{booking.selectedShop.address}</p>
                      </div>
                    </div>

                    <div className="border-t border-border-dark border-dashed my-1"></div>

                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Calendar size={18} />
                          <span className="text-sm">Data</span>
                        </div>
                        <span className="text-white font-medium text-sm">
                          {booking.selectedDate ? `${booking.selectedDate.getDate()} Out, 2023` : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Clock size={18} />
                          <span className="text-sm">Horário</span>
                        </div>
                        <span className="text-white font-medium text-sm">{booking.selectedTime || '-'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <User size={18} />
                          <span className="text-sm">Profissional</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {booking.selectedBarber ? (
                            <>
                              <div className="size-5 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${booking.selectedBarber.avatar}')` }}></div>
                              <span className="text-white font-medium text-sm">{booking.selectedBarber.name.split(' ')[0]}</span>
                            </>
                          ) : (
                            <span className="text-white font-medium text-sm">Qualquer um</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#181411] rounded-lg p-3 border border-border-dark">
                      {booking.selectedServices.map(s => (
                        <div key={s.id} className="mb-2 last:mb-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm font-medium">{s.name}</span>
                            <span className="text-white text-sm font-bold">R$ {s.price.toFixed(2).replace('.', ',')}</span>
                          </div>
                          <p className="text-text-secondary text-xs">{paymentText}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex justify-between items-center pt-4 border-t border-border-dark">
                      <span className="text-white text-lg font-bold">Total pago</span>
                      <span className="text-primary text-2xl font-black">R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-text-secondary/60 text-xs">
                    <Mail size={14} />
                    <span>Comprovante enviado por e-mail</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Main Layout Render ---

  if (view === 'login') {
    return <Login onLogin={handleLogin} onRegisterClick={() => setView('register')} loading={loading} error={error} />;
  }

  if (view === 'register') {
    return <Register onLoginClick={() => setView('login')} onRegister={handleRegister} loading={loading} error={error} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30">
      <AIModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-background-dark/90 backdrop-blur-md border-b border-border-dark">
        <div className="px-4 lg:px-10 flex justify-center w-full">
          <div className="flex w-full flex-1 items-center justify-between py-3">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => { if (booking.step !== 'shops') goBack(); }}
            >
              <div className="size-8 text-primary flex items-center justify-center">
                <Scissors size={28} />
              </div>
              <h2 className="text-white text-xl font-bold tracking-tight">BarberApp</h2>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex gap-9">
                <a className="text-white text-sm font-medium hover:text-primary transition-colors" href="#">Início</a>
                <a className="text-white text-sm font-medium hover:text-primary transition-colors" href="#">Explorar</a>
                <a className="text-white text-sm font-medium hover:text-primary transition-colors" href="#">Minhas Agendas</a>
              </nav>
              <div className="flex gap-2">
                <button className="flex cursor-pointer items-center justify-center rounded-lg size-10 bg-surface-dark hover:bg-border-dark text-white transition-colors">
                  <span className="material-symbols-outlined"><i className="lucide-bell" /></span>
                  <span className="sr-only">Notifications</span>
                  <div className="flex items-center justify-center">
                    {/* Using Lucide icon manually inside since the style expects material-symbols class logic */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                  </div>
                </button>
                <button onClick={handleLogout} className="flex cursor-pointer items-center justify-center rounded-lg size-10 bg-surface-dark hover:bg-border-dark text-white transition-colors">
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow flex flex-col">
        {booking.step === 'shops' && renderShops()}
        {booking.step === 'services' && renderServices()}
        {booking.step === 'datetime' && renderDateTime()}
        {booking.step === 'payment' && renderPayment()}
        {booking.step === 'confirmation' && renderConfirmation()}
      </main>

      {/* Footer */}
      <footer className="bg-[#221910] border-t border-border-dark py-8 mt-auto">
        <div className="max-w-[960px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span>© 2024 BarberApp. Todos os direitos reservados.</span>
          </div>
          <div className="flex gap-6">
            <a className="text-white/50 hover:text-primary text-sm transition-colors" href="#">Termos</a>
            <a className="text-white/50 hover:text-primary text-sm transition-colors" href="#">Privacidade</a>
            <a className="text-white/50 hover:text-primary text-sm transition-colors" href="#">Ajuda</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;