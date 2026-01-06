import React, { useState } from 'react';

interface RegisterProps {
  onLoginClick: () => void;
  onRegister: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onLoginClick, onRegister }) => {
  const [role, setRole] = useState<'client' | 'business'>('client');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-border-dark px-6 sm:px-10 py-4 bg-white dark:bg-background-dark/95 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">BarberManager</h2>
        </div>
        <div className="flex flex-1 justify-end gap-4">
          <span className="text-sm font-medium text-text-secondary self-center hidden sm:block">Já tem uma conta?</span>
          <button 
            onClick={onLoginClick}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-transparent border border-gray-300 dark:border-border-dark text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Entrar</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-full grow flex-col lg:flex-row">
        {/* Left Side: Image/Branding (Hidden on mobile, visible on desktop) */}
        <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-surface-dark items-center justify-center">
          <div className="absolute inset-0 opacity-60 bg-gradient-to-t from-background-dark to-transparent z-10"></div>
          <img 
            alt="Barber Shop Interior" 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRHxij05X6_9mumuokkMwKBijvZqUcKJ76vy1UFdKU-K9qmpUhhhE6cwfLhaNT2L13p2TbQ7Jfg4txYM5Zqw3L5cR6O2Eb5xJ3c_OY0S3r_WLYaq-TpPFCIpBEA_TM1CaTKzxOzElyvE8K0zoV3lf-bTvXRCNTxpCFNsRmsaaMvIj17xbBYvZuVi73c6HXxKIFbujmzrWhIktF3uu0RyFX7ZIM4xrKr-TNVbSCOCJuy761ZQqyRBuFev202KazKO36-JZuSzPi0o0"
          />
          <div className="relative z-20 p-12 text-white max-w-lg">
            <div className="mb-6 size-12 flex items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
              <span className="material-symbols-outlined text-3xl">content_cut</span>
            </div>
            <h3 className="text-4xl font-black mb-4 leading-tight">Transforme a gestão da sua barbearia.</h3>
            <p className="text-text-secondary text-lg">Junte-se a mais de 5.000 profissionais que usam o BarberManager para organizar agendamentos e fidelizar clientes.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-1 justify-center py-10 px-4 sm:px-12 lg:px-24 overflow-y-auto bg-background-light dark:bg-background-dark">
          <div className="flex flex-col w-full max-w-[560px]">
            {/* Heading */}
            <div className="flex flex-col gap-2 pb-8">
              <h1 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Crie sua conta</h1>
              <p className="text-slate-500 dark:text-text-secondary text-base font-normal leading-normal">Preencha seus dados abaixo para começar gratuitamente.</p>
            </div>

            {/* Role Switcher */}
            <div className="mb-8">
              <div className="flex h-12 w-full items-center justify-center rounded-xl bg-gray-200 dark:bg-surface-dark p-1 border border-transparent dark:border-border-dark">
                <label 
                  onClick={() => setRole('client')}
                  className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-bold leading-normal transition-all duration-200 ${role === 'client' ? 'bg-white dark:bg-background-dark shadow-sm dark:shadow-[0_0_4px_rgba(0,0,0,0.5)] text-primary' : 'text-slate-500 dark:text-text-secondary'}`}
                >
                  <span className="truncate flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    Sou Cliente
                  </span>
                  <input type="radio" name="user_role" className="invisible w-0" checked={role === 'client'} readOnly />
                </label>
                <label 
                  onClick={() => setRole('business')}
                  className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-bold leading-normal transition-all duration-200 ${role === 'business' ? 'bg-white dark:bg-background-dark shadow-sm dark:shadow-[0_0_4px_rgba(0,0,0,0.5)] text-primary' : 'text-slate-500 dark:text-text-secondary'}`}
                >
                  <span className="truncate flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">storefront</span>
                    Sou Profissional / Dono
                  </span>
                  <input type="radio" name="user_role" className="invisible w-0" checked={role === 'business'} readOnly />
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Nome Completo</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                    <span className="material-symbols-outlined text-[20px]">badge</span>
                  </span>
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-border-dark bg-gray-50 dark:bg-surface-dark focus:border-primary h-12 pl-12 pr-4 placeholder:text-slate-400 dark:placeholder:text-text-secondary/50 text-base font-normal leading-normal transition-all" placeholder="Ex: João Silva" />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal">E-mail</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </span>
                  <input type="email" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-border-dark bg-gray-50 dark:bg-surface-dark focus:border-primary h-12 pl-12 pr-4 placeholder:text-slate-400 dark:placeholder:text-text-secondary/50 text-base font-normal leading-normal transition-all" placeholder="seu@email.com" />
                </div>
              </div>

              {/* Phone & Password Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Telefone / WhatsApp</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </span>
                    <input type="tel" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-border-dark bg-gray-50 dark:bg-surface-dark focus:border-primary h-12 pl-12 pr-4 placeholder:text-slate-400 dark:placeholder:text-text-secondary/50 text-base font-normal leading-normal transition-all" placeholder="(11) 99999-9999" />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-900 dark:text-white text-sm font-medium leading-normal">Senha</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-border-dark bg-gray-50 dark:bg-surface-dark focus:border-primary h-12 pl-12 pr-12 placeholder:text-slate-400 dark:placeholder:text-text-secondary/50 text-base font-normal leading-normal transition-all" 
                      placeholder="Min. 8 caracteres" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 py-2">
                <div className="flex items-center h-5">
                  <input id="terms" type="checkbox" className="w-5 h-5 border border-gray-300 dark:border-border-dark rounded bg-gray-50 dark:bg-surface-dark focus:ring-2 focus:ring-primary text-primary cursor-pointer" />
                </div>
                <label htmlFor="terms" className="text-sm font-medium text-slate-500 dark:text-text-secondary leading-tight cursor-pointer">
                  Eu concordo com os <a href="#" className="text-primary hover:underline">Termos de Serviço</a> e <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
                </label>
              </div>

              {/* Submit Button */}
              <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-primary hover:bg-orange-600 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                <span className="truncate">Cadastrar</span>
              </button>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-border-dark"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 dark:text-text-secondary text-xs uppercase font-bold tracking-wider">Ou continue com</span>
                <div className="flex-grow border-t border-gray-300 dark:border-border-dark"></div>
              </div>

              {/* Social Login */}
              <button type="button" className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl h-12 px-4 bg-white dark:bg-white text-slate-900 dark:text-slate-900 border border-gray-200 text-sm font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-gray-50">
                <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOO4IDoxZQzL_GfnTn3R0dHmDQ_Bsu0BHUicnNkBji5dlmF89-FZNFhCsBQ3giHkoAH4ku16J27SgwUYXSUiXTYxlPd1I-depi9--RrzwAFdoDJPHHRwnBXnkPmVCU6w_1FrD9829NJi6_XxCCf55o3bIF1uvC7rdQyFGWIgfhAfJIUz_YDhvxEPRhE_sfdRc3DUF2AeiUh8oWfh51-fkk0hSUtTEXtS7LwkApfGdZL3E6dXo0-E2jlglB5oRy5lqsEKqoM3uSEoA"/>
                <span>Google</span>
              </button>
            </form>

            <div className="mt-8 text-center sm:hidden">
              <p className="text-slate-500 dark:text-text-secondary text-sm">
                Já tem uma conta? <button onClick={onLoginClick} className="text-primary font-bold hover:underline">Faça login</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
