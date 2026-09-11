import React from 'react';
import { Instagram, MessageCircle, Lock, MapPin, Phone } from 'lucide-react';
import { ContactInfo } from '../../types';

interface FooterProps {
  contact: ContactInfo;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ contact, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#08080B] border-t border-[#1C1C24] text-[#A1A1AA] text-sm pt-20 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-xl font-bold tracking-[-0.03em] text-white font-display">
                EVOLUTION
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C8102E]"></span>
            </div>
            <p className="text-xs text-[#A1A1AA] uppercase tracking-[0.12em] font-semibold mb-5">
              Academia • Três Rios - RJ
            </p>
            <div className="p-4 rounded-xl bg-[#121218] border border-[#1E1E28] text-xs leading-relaxed text-[#CBD5E1] italic font-normal">
              "O aluno não compra musculação. Ele compra transformação, pertencimento, autoestima, saúde e acompanhamento."
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-[0.08em] mb-5">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">Sobre a Academia</a>
              </li>
              <li>
                <a href="#modalidades" className="hover:text-white transition-colors">Modalidades</a>
              </li>
              <li>
                <a href="#acompanhamento" className="hover:text-white transition-colors">Acompanhamento</a>
              </li>
              <li>
                <a href="#fotos" className="hover:text-white transition-colors">Galeria</a>
              </li>
              <li>
                <a href="#horarios" className="hover:text-white transition-colors">Horários</a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-white transition-colors">Localização</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-[0.08em] mb-5">
              Contato e Endereço
            </h4>
            <div className="space-y-3.5 text-xs sm:text-[13px]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                <span>{contact.address}, {contact.cityState}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8102E] shrink-0" />
                <span>{contact.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#C8102E] shrink-0" />
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline"
                >
                  {contact.instagramHandle}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Horários & Admin */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-[0.08em] mb-5">
              Funcionamento
            </h4>
            <div className="space-y-2 text-xs sm:text-[13px] text-[#CBD5E1] mb-7 font-normal">
              <p><strong className="text-white font-semibold">Seg a Sex:</strong> 06:00 às 22:00</p>
              <p><strong className="text-white font-semibold">Sábado:</strong> 08:00 às 13:00</p>
              <p><strong className="text-white font-semibold">Domingo:</strong> Fechado</p>
            </div>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#A1A1AA] hover:text-white bg-[#14141B] hover:bg-[#1A1A24] border border-[#20202A] hover:border-[#2D2D3B] px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Acesso Administrativo</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#16161E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© {currentYear} Academia Evolution Fitness. Todos os direitos reservados. Três Rios - RJ.</p>
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] transition-colors p-1"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C] transition-colors p-1"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
