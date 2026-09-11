import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';
import { ContactInfo } from '../../types';

interface LocationProps {
  contact: ContactInfo;
}

export const Location: React.FC<LocationProps> = ({ contact }) => {
  const [copied, setCopied] = useState(false);

  const fullAddress = `${contact.address}, ${contact.cityState}, CEP: ${contact.zipCode}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // OpenStreetMap embed for Rua Doutor Valmir Peçanha, Três Rios - RJ (approx coords -22.115, -43.208)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${contact.address}, ${contact.cityState}`
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="localizacao" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-[#0B0B0E] border-t border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161F] border border-[#262633] text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>Fácil Acesso</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-white tracking-[-0.025em] font-display leading-[1.2] mb-4">
            Nossa Localização em Três Rios
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.75] font-normal">
            Localizada em ponto estratégico e de fácil acesso para sua comodidade no dia a dia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Navigation Action Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#14141B] border border-[#20202A] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1A1A24] border border-[#262634] flex items-center justify-center mb-6 text-[#C8102E]">
                <MapPin className="w-6 h-6" />
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-white font-display tracking-[-0.015em] mb-3.5">
                {contact.studioName}
              </h3>

              <div className="space-y-1.5 text-sm text-[#CBD5E1] mb-6 font-normal">
                <p className="font-semibold text-white text-base sm:text-lg">{contact.address}</p>
                <p className="text-[#A1A1AA]">{contact.cityState}</p>
                <p className="text-xs text-[#A1A1AA]">CEP: {contact.zipCode}</p>
              </div>

              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#A1A1AA] hover:text-white bg-[#181822] border border-[#262634] px-4 py-2.5 rounded-lg transition-colors cursor-pointer mb-8"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#10B981]">Endereço copiado com sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar endereço completo</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-3.5 pt-6 border-t border-[#1E1E28]">
              <a
                id="location-how-to-arrive-btn"
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#C8102E] hover:bg-[#A60D24] text-white px-7 py-4 rounded-xl font-semibold text-sm sm:text-base tracking-[0.01em] transition-all shadow-md active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>COMO CHEGAR</span>
              </a>

              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#16161F] hover:bg-[#1E1E28] text-[#CBD5E1] hover:text-white border border-[#272736] px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all"
              >
                <span>Abrir no Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 rounded-2xl bg-[#14141B] border border-[#20202A] overflow-hidden min-h-[360px] relative">
            <iframe
              title="Mapa Academia Evolution Fitness"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[380px] border-0 grayscale-[40%] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
