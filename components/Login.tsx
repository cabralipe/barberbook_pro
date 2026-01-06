import React from 'react';

interface LoginProps {
  onLogin: () => void;
  onRegisterClick: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onRegisterClick }) => {
  return (
    <div className="bg-background-dark text-white h-screen w-full flex overflow-hidden font-sans">
      {/* Left Column: Visual/Marketing */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-marketing items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            alt="Classic dark barbershop interior" 
            className="w-full h-full object-cover opacity-60" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYzfQdcIq1YS9Bjvygb12mJTSzRKV-aQ3Glz6tGtlTVC4bF7qhf1tIkfts8ihY8iPFXdmCm-xd7UbN2JTrLgYQOSls1G10_qwBBAgzCQap6y5Og1NlVuyI_Pb7JwgpfsVu1nM_SJrYprV6lr-sYPeinQfZUqXOi8rDZnCC0WlgnJWQd0gW3edH7T58S7aItye8BCq8Wqdq7i7L42YoJtL6P93QHJwONkMbIac6JX7p7G84RmWBY7KcLUPfyY8BJLK31jFYp1qTdU0"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181411] via-[#181411]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[#181411]/30 backdrop-blur-[1px]"></div>
        </div>
        
        {/* Content over image */}
        <div className="relative z-10 max-w-lg px-10 text-center">
          <div className="mb-6 flex justify-center">
            <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-primary/30">
              <span className="material-symbols-outlined text-primary text-4xl">content_cut</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Gerencie seu estilo de vida</h2>
          <p className="text-lg text-gray-300">
            A plataforma completa para barbeiros profissionais, donos de barbearia e clientes exigentes.
          </p>
          
          {/* Testimonial/Badge */}
          <div className="mt-12 flex items-center justify-center gap-4 py-4 px-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 mx-auto w-fit">
            <div className="flex -space-x-3">
              <img alt="User avatar" className="w-10 h-10 rounded-full border-2 border-[#181411]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC11JgVvxUeQBpxOw8FauoEcGROFGk1ep_Rf_5g75o7bSp27URcy5229_tw_5EfRmwEkSPhQg4PmyTWExGYpdCI_M1T88zvoJx4Mh9EDV8CFtQFx5Yeum2OMraImvtRW1ajtm2FWfav8HcmyVdakr1xewfq-nwYkeQjcxWegaB7Hfg-OPywuuSnd3-EkapXX5X7YelfYmYNz5ZxawKdF21ITDLJxJ2yh4KkcPqd_iz9FYlvVgivLEu0WkVQm3aPP4o9Rtt67yEiAh8"/>
              <img alt="User avatar" className="w-10 h-10 rounded-full border-2 border-[#181411]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxmn1pheX9lvMyMqG7bFBck3T8fNjWBDfABQowA_DTBR50iR03hmfVnH5dGTI1qw7IhhIwjSMYwwL2EosCSheKU1gu0O-6wLR2C6k-Epbxo9pV-NrOJXUYU5VbVv8fHd9vQaT9238u7bGbGjBmNXSOmsTtYRLYweXTI-DzQTXWuYMxBbDM6N1KdiCoM9uCfNBtQThdmxt52H0VcEt91k7vYUAKR3iGQsE7vKC9weRBD1DTfkQRec5augCMU1ZeHpDBxs6_G7kGQj4"/>
              <img alt="User avatar" className="w-10 h-10 rounded-full border-2 border-[#181411]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3xvA6e7AAPk68dEsuREo4hBN8lzkQphZg53L1JGrNgjlExUc3V09sv0BuY1u26jZoQ_labQM1jKxS7OLwQYRgTD6ZzUvtJcp1ACKbq7WQxVTjiTY79YiBH6jGN3M_gv7-VjWDRFj0ZHCIpnln1-7XNBTIw6L-MxsH-QBPVdOu2Mx2n6f6XzL3_mHVgCZqZXGZl620KlXxpnKhBuUeQUTQybRL3pKIuMwCCI7kD07DWghVcv-fRVgEQSlTfQ4KqS3wMDQ2T3OEhcc"/>
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold">Mais de 5.000</p>
              <p className="text-text-secondary text-xs">Profissionais ativos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col h-full bg-background-dark overflow-y-auto">
        {/* Mobile Header (Logo) */}
        <div className="lg:hidden p-6 flex items-center gap-3">
          <div className="text-primary">
            <span className="material-symbols-outlined text-4xl">content_cut</span>
          </div>
          <span className="text-white text-lg font-bold tracking-tight">BarberManager</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 md:p-20">
          <div className="w-full max-w-[420px] flex flex-col gap-6">
            
            {/* Header Section */}
            <div className="mb-2">
              {/* Desktop Logo */}
              <div className="hidden lg:flex items-center gap-3 mb-8 text-primary">
                <span className="material-symbols-outlined text-4xl">content_cut</span>
                <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">BarberManager</h2>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Acesse sua conta</h1>
              <p className="text-text-secondary">Gerencie seus agendamentos e cortes com facilidade.</p>
            </div>

            {/* Form Section */}
            <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="flex flex-col gap-5 mt-2">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium leading-normal" htmlFor="email">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input 
                    className="form-input block w-full rounded-xl border border-input-border bg-input-bg text-white pl-10 pr-4 py-3.5 placeholder:text-text-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200" 
                    id="email" 
                    name="email" 
                    placeholder="seu@email.com" 
                    required 
                    type="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-white text-sm font-medium leading-normal" htmlFor="password">Senha</label>
                  <a className="text-primary text-sm font-medium hover:text-primary-hover hover:underline transition-colors" href="#">Esqueceu a senha?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input 
                    className="form-input block w-full rounded-xl border border-input-border bg-input-bg text-white pl-10 pr-12 py-3.5 placeholder:text-text-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200" 
                    id="password" 
                    name="password" 
                    placeholder="********" 
                    required 
                    type="password"
                  />
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-white transition-colors" type="button">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button 
                className="mt-2 w-full flex items-center justify-center rounded-xl bg-primary py-3.5 px-4 text-sm font-bold text-[#181411] shadow-lg shadow-primary/20 hover:bg-primary-hover hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-[#181411] transition-all duration-200" 
                type="submit"
              >
                Entrar
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-input-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background-dark px-3 text-sm text-text-secondary">Ou continue com</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-input-border bg-input-bg px-4 py-3 text-sm font-medium text-white hover:bg-surface-dark hover:border-text-secondary/50 transition-all duration-200" type="button">
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-4.6667-3.7833-8.45-8.45-8.45-4.6667 0-8.45 3.7833-8.45 8.45 0 4.6667 3.7833 8.45 8.45 8.45Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  <path d="M16 12h-4v4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-input-border bg-input-bg px-4 py-3 text-sm font-medium text-white hover:bg-surface-dark hover:border-text-secondary/50 transition-all duration-200" type="button">
                <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.2 12.5h-1.4v4.4h-2v-4.4H8.4V11h1.4V9.8c0-1.5.8-2.4 2.2-2.4.7 0 1.2.1 1.4.1v1.5h-.8c-.7 0-.8.3-.8.7V11h1.6l-.2 1.5z"></path>
                  <path clipRule="evenodd" d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z" fillRule="evenodd"></path>
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            {/* Sign Up Footer */}
            <p className="text-center text-sm text-text-secondary mt-4">
              Novo por aqui?{' '}
              <button 
                onClick={onRegisterClick}
                className="font-bold text-primary hover:text-primary-hover hover:underline transition-colors"
              >
                Cadastrar barbearia ou perfil
              </button>
            </p>
          </div>

          {/* Simple footer for links */}
          <div className="mt-auto pt-8 flex gap-6 text-xs text-text-secondary/50">
            <a className="hover:text-text-secondary" href="#">Termos</a>
            <a className="hover:text-text-secondary" href="#">Privacidade</a>
            <a className="hover:text-text-secondary" href="#">Ajuda</a>
          </div>
        </div>
      </div>
    </div>
  );
};
