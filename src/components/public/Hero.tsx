import React from 'react';
import { MessageCircle, ArrowRight, MapPin, CheckCircle2, Shield } from 'lucide-react';
import { HeroContent, ContactInfo } from '../../types';

interface HeroProps {
  hero: HeroContent;
  contact: ContactInfo;
}

export const Hero: React.FC<HeroProps> = ({ hero, contact }) => {
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}`;

  const scrollToModalities = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('modalidades');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-18 lg:pt-36 lg:pb-20 overflow-hidden bg-[#0B0B0E]">
      {/* Subtle architectural background ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#C8102E]/10 blur-[140px] rounded-full"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#14141B_1px,transparent_1px),linear-gradient(to_bottom,#14141B_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline Section (Spanning wide for amplitude and prominence) */}
        <div className="max-w-5xl mb-6 sm:mb-8">
          {/* Location & Academy Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141A] border border-[#22222D] mb-5 sm:mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase">
              Três Rios - RJ • {contact.address}
            </span>
          </div>

          {/* Main Headline (H1: dominant, editorial, elegant line-height) */}
          <h1
            id="hero-headline"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.875rem] font-bold tracking-[-0.035em] text-white font-display leading-[1.12] sm:leading-[1.08]"
          >
            {hero.headline || 'Cada treino é um passo na sua evolução.'}
          </h1>
        </div>

        {/* Content & Editorial Balance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-start mb-10 sm:mb-12">
          {/* Left Column: Subtitle & Action CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
            <p
              id="hero-subtitle"
              className="text-base sm:text-lg lg:text-[1.125rem] text-[#A1A1AA] leading-[1.75] font-normal max-w-2xl mb-7 sm:mb-9"
            >
              {hero.subtitle}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                id="hero-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#C8102E] hover:bg-[#A60D24] text-white px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base tracking-[0.01em] whitespace-nowrap transition-all shadow-md active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{hero.primaryButtonText || 'FALAR NO WHATSAPP'}</span>
              </a>

              <button
                id="hero-modalities-btn"
                onClick={scrollToModalities}
                className="inline-flex items-center justify-center gap-2 bg-[#14141B] hover:bg-[#1A1A24] text-[#E2E8F0] hover:text-white border border-[#242432] px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap transition-all cursor-pointer"
              >
                <span>{hero.secondaryButtonText || 'VER MODALIDADES'}</span>
                <ArrowRight className="w-4 h-4 text-[#C8102E]" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Brand Highlight (Discreet, Institutional, Non-Dashboard) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="rounded-2xl bg-[#121217]/90 border border-[#1E1E26] p-6 sm:p-7 relative">
              <div className="mb-5">
                <span className="text-[11px] font-semibold text-[#C8102E] tracking-[0.14em] uppercase block mb-1 font-sans">
                  Institucional • Três Rios
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
                  Academia Evolution Fitness
                </h2>
              </div>

              <p className="text-xs sm:text-[13px] text-[#A1A1AA] leading-relaxed mb-5 font-normal">
                Estrutura pensada para treinos consistentes, com professores disponíveis em sala para orientar a execução de cada exercício.
              </p>

              <div className="space-y-3 pt-4 border-t border-[#1C1C24] text-xs sm:text-[13px]">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[#71717A] font-normal">Segunda a Sexta</span>
                  <span className="text-[#E2E8F0] font-medium">06:00 às 22:00</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[#71717A] font-normal">Sábado</span>
                  <span className="text-[#E2E8F0] font-medium">08:00 às 13:00</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[#71717A] font-normal">Endereço</span>
                  <span className="text-[#E2E8F0] font-medium text-right">{contact.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Propositions / Differentials below the CTA (Clean, balanced horizontal banner) */}
        <div className="pt-6 sm:pt-8 border-t border-[#1A1A22]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className="py-4 px-5 sm:py-4.5 sm:px-6 rounded-xl bg-[#121217]/70 border border-[#1E1E26] flex items-center gap-3.5 transition-colors hover:border-[#2C2C38]">
              <div className="w-9 h-9 rounded-lg bg-[#181822] border border-[#242432] flex items-center justify-center shrink-0 text-[#C8102E]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-[14px] font-medium text-[#E2E8F0] leading-snug">
                Acompanhamento próximo e individualizado
              </span>
            </div>

            <div className="py-4 px-5 sm:py-4.5 sm:px-6 rounded-xl bg-[#121217]/70 border border-[#1E1E26] flex items-center gap-3.5 transition-colors hover:border-[#2C2C38]">
              <div className="w-9 h-9 rounded-lg bg-[#181822] border border-[#242432] flex items-center justify-center shrink-0 text-[#C8102E]">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-[14px] font-medium text-[#E2E8F0] leading-snug">
                Ambiente acolhedor e humanizado
              </span>
            </div>

            <div className="py-4 px-5 sm:py-4.5 sm:px-6 rounded-xl bg-[#121217]/70 border border-[#1E1E26] flex items-center gap-3.5 transition-colors hover:border-[#2C2C38]">
              <div className="w-9 h-9 rounded-lg bg-[#181822] border border-[#242432] flex items-center justify-center shrink-0 text-[#C8102E]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-[14px] font-medium text-[#E2E8F0] leading-snug">
                Musculação e aulas dinâmicas em grupo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


