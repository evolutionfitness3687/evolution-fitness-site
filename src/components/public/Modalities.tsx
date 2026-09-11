import React from 'react';
import { Dumbbell, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Modality, ContactInfo } from '../../types';

interface ModalitiesProps {
  modalities: Modality[];
  contact: ContactInfo;
}

export const Modalities: React.FC<ModalitiesProps> = ({ modalities, contact }) => {
  // Sort by order and filter only active modalities
  const activeModalities = [...modalities]
    .filter((m) => m.isActive)
    .sort((a, b) => a.order - b.order);

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de mais informações sobre as modalidades da Academia Evolution Fitness.'
  )}`;

  return (
    <section id="modalidades" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-[#0B0B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161F] border border-[#262633] text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase mb-4">
              <Dumbbell className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Modalidades e Treinos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-white tracking-[-0.025em] font-display leading-[1.2] mb-4">
              Encontre o treino ideal para a sua evolução
            </h2>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.75] font-normal">
              Da musculação às aulas coletivas de alta energia, cada modalidade conta com a orientação atenta dos nossos profissionais.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#16161F] hover:bg-[#1E1E28] text-white border border-[#272736] px-6 py-3.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all self-start md:self-auto shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#C8102E]" />
            <span>Consultar Turmas no WhatsApp</span>
          </a>
        </div>

        {/* Modalities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeModalities.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col rounded-2xl overflow-hidden border transition-all ${
                item.isReturningSoon
                  ? 'bg-[#121217] border-[#2E2E3C] opacity-95'
                  : 'bg-[#14141B] border-[#20202A] hover:border-[#353545]'
              }`}
            >
              {/* Optional Modality Image if uploaded by admin */}
              {item.imageUrl ? (
                <div className="relative h-48 sm:h-52 w-full bg-[#1A1A24] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  {item.isReturningSoon && (
                    <div className="absolute top-3.5 right-3.5 bg-[#D4AF37] text-black text-xs font-semibold px-2.5 py-1 rounded shadow">
                      Previsto para retornar
                    </div>
                  )}
                </div>
              ) : null}

              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <h3 className="text-xl sm:text-[1.375rem] font-semibold text-white font-display tracking-[-0.015em]">
                      {item.name}
                    </h3>
                    {item.isReturningSoon ? (
                      <span className="inline-flex items-center gap-1 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                        <Clock className="w-3 h-3" />
                        <span>Retornando</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-medium text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full">
                        Ativa
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-[1.65] mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {item.isReturningSoon ? (
                  <div className="pt-4 border-t border-[#1E1E28] text-xs sm:text-sm text-[#A1A1AA] flex items-center justify-between">
                    <span>Em planejamento de grade</span>
                    <span className="text-[#D4AF37] font-medium">Aguarde novidades</span>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-[#1E1E28] flex items-center justify-between text-xs sm:text-sm text-[#A1A1AA]">
                    <span>Orientação presencial</span>
                    <a
                      href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                        `Olá! Gostaria de saber mais sobre as aulas de ${item.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8102E] hover:text-[#E6193C] font-semibold inline-flex items-center gap-0.5 transition-colors"
                    >
                      <span>Saber mais</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
