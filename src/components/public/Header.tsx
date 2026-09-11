import React, { useState } from 'react';
import { Menu, X, MessageCircle, Lock, ShieldCheck } from 'lucide-react';
import { ContactInfo } from '../../types';

interface HeaderProps {
  contact: ContactInfo;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({ contact, onOpenAdmin, isAdminLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Modalidades', href: '#modalidades' },
    { label: 'Acompanhamento', href: '#acompanhamento' },
    { label: 'Fotos', href: '#fotos' },
    { label: 'Vídeos', href: '#videos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Horários', href: '#horarios' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0B0E]/95 backdrop-blur-md border-b border-[#1E1E28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-20">
          {/* Brand Logo */}
          <a
            href="#inicio"
            id="header-brand-link"
            className="flex flex-col group transition-opacity hover:opacity-90 shrink-0"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-[1.375rem] font-bold tracking-[-0.03em] text-white font-display leading-none">
                EVOLUTION
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C8102E]"></span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] text-[#94A3B8] uppercase mt-0.5">
              Academia • Três Rios
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4 xl:gap-5 2xl:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[13px] 2xl:text-[14px] font-medium text-[#A1A1AA] hover:text-white transition-colors cursor-pointer py-1 tracking-normal whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions & WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              id="header-admin-button"
              onClick={onOpenAdmin}
              className={`p-2.5 rounded-xl border transition-all text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isAdminLoggedIn
                  ? 'border-[#C8102E]/40 text-[#C8102E] bg-[#C8102E]/10 hover:bg-[#C8102E]/20'
                  : 'border-[#262634] text-[#94A3B8] hover:text-white hover:border-[#38384A] bg-[#14141B]'
              }`}
              title={isAdminLoggedIn ? 'Painel Administrativo Conectado' : 'Acesso Administrativo'}
            >
              {isAdminLoggedIn ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
                  <span>Painel</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span className="hidden md:inline">Admin</span>
                </>
              )}
            </button>

            <a
              id="header-whatsapp-cta"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-5 py-2.5 rounded-xl font-semibold text-xs xl:text-sm tracking-[0.02em] whitespace-nowrap shrink-0 transition-all shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">FALAR NO WHATSAPP</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              id="mobile-admin-btn"
              onClick={onOpenAdmin}
              className="p-2 rounded-lg border border-[#2D2D38] text-[#94A3B8]"
              title="Acesso Administrativo"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-[#181820] text-white hover:text-[#C8102E] border border-[#2D2D38] cursor-pointer"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#111116] border-b border-[#22222A] px-4 pt-3 pb-6 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-3 py-3 text-base font-medium text-[#E2E8F0] hover:text-[#C8102E] hover:bg-[#181820] rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-[#22222A] flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#C8102E] text-white py-3 rounded-lg font-semibold text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>FALAR NO WHATSAPP</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#181820] border border-[#2D2D38] text-[#CBD5E1] py-3 rounded-lg font-medium text-sm"
            >
              <Lock className="w-4 h-4" />
              <span>Painel Administrativo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
