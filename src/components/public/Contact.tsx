import React from 'react';
import { MessageCircle, Instagram, MapPin, Phone, Send, Clock } from 'lucide-react';
import { ContactInfo } from '../../types';

interface ContactProps {
  contact: ContactInfo;
}

export const Contact: React.FC<ContactProps> = ({ contact }) => {
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}`;

  return (
    <section id="contato" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-[#0E0E12] border-t border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161F] border border-[#262633] text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase mb-4">
            <Phone className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>Canais Oficiais</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-white tracking-[-0.025em] font-display leading-[1.2] mb-4">
            Fale com a Evolution Fitness
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.75] font-normal">
            Estamos prontos para tirar suas dúvidas, apresentar os planos e agendar sua visita à academia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* WhatsApp Direct Card */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 sm:p-9 rounded-2xl bg-[#14141B] border border-[#20202A] hover:border-[#C8102E]/60 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1A1A24] border border-[#262634] flex items-center justify-center text-[#25D366] mb-6 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white font-display tracking-[-0.015em] mb-1.5">WhatsApp Oficial</h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mb-5 font-normal">Atendimento direto com nossa recepção</p>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] font-display">
                {contact.phoneDisplay}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#1E1E28] flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C8102E]">
              <span>Iniciar conversa no WhatsApp</span>
              <Send className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 sm:p-9 rounded-2xl bg-[#14141B] border border-[#20202A] hover:border-[#E1306C]/60 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1A1A24] border border-[#262634] flex items-center justify-center text-[#E1306C] mb-6 group-hover:scale-105 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white font-display tracking-[-0.015em] mb-1.5">Instagram</h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mb-5 font-normal">Acompanhe treinos, rotinas e comunicados</p>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] font-display">
                {contact.instagramHandle}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#1E1E28] flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#CBD5E1] group-hover:text-white transition-colors">
              <span>Acessar perfil @evolutionfitness_tr</span>
              <Send className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Academy Address Card */}
          <div className="p-8 sm:p-9 rounded-2xl bg-[#14141B] border border-[#20202A] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1A1A24] border border-[#262634] flex items-center justify-center text-[#C8102E] mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white font-display tracking-[-0.015em] mb-1.5">Nossa Academia</h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mb-5 font-normal">Três Rios - Rio de Janeiro</p>
              <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                {contact.address}
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1 font-normal">{contact.cityState} • CEP {contact.zipCode}</p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#1E1E28] flex items-center gap-2 text-xs sm:text-sm font-medium text-[#A1A1AA]">
              <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Seg–Sex: 06h às 22h | Sáb: 08h às 13h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
