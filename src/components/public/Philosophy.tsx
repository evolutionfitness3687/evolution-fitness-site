import React from 'react';
import { Target, Users, Sparkles, CheckCircle, ShieldCheck, Heart } from 'lucide-react';
import { ContactInfo } from '../../types';

interface PhilosophyProps {
  contact: ContactInfo;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ contact }) => {
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar uma visita e conhecer a Academia Evolution Fitness.'
  )}`;

  return (
    <section id="acompanhamento" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-[#0E0E12] border-t border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Core Message */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161F] border border-[#262633] text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase mb-5">
              <Heart className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Acompanhamento Próximo</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-white tracking-[-0.025em] font-display leading-[1.2] mb-6">
              Você nunca treina sozinho: acompanhamento de verdade em cada etapa
            </h2>

            <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.8] mb-10 font-normal">
              Na Academia Evolution Fitness, acreditamos que resultados sustentáveis não vêm de fórmulas mágicas, mas do compromisso diário, da técnica correta e do suporte humano de instrutores que conhecem suas metas e limitações.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-3.5">
                <CheckCircle className="w-5 h-5 text-[#C8102E] shrink-0 mt-1" />
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Orientação técnica contínua</h4>
                  <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-[1.65] font-normal">
                    Correção de postura e execução de movimentos para treinar com máxima segurança e eficiência.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle className="w-5 h-5 text-[#C8102E] shrink-0 mt-1" />
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Ambiente acolhedor e integrador</h4>
                  <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-[1.65] font-normal">
                    Aqui você se sente parte de uma comunidade que incentiva e celebra o progresso de cada um.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CheckCircle className="w-5 h-5 text-[#C8102E] shrink-0 mt-1" />
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Foco em saúde e qualidade de vida</h4>
                  <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-[1.65] font-normal">
                    Mais do que estética, promovemos disposição, energia mental e longevidade para o seu dia a dia.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#C8102E] hover:bg-[#A60D24] text-white px-7 py-4 rounded-xl font-semibold text-sm sm:text-base tracking-[0.01em] transition-all shadow-md active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Conhecer de Perto pelo WhatsApp</span>
            </a>
          </div>

          {/* Right Column: Key Commitments Card */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#14141B] border border-[#20202A] relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-semibold text-white font-display tracking-[-0.015em] mb-7">
                Nosso Compromisso com Você
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="p-5 rounded-xl bg-[#181822] border border-[#262634]">
                  <Target className="w-6 h-6 text-[#C8102E] mb-3" />
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1.5">Evolução Real</h4>
                  <p className="text-xs sm:text-[13.5px] text-[#A1A1AA] leading-relaxed font-normal">
                    Respeito aos seus limites para que o seu progresso seja duradouro e consistente.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#181822] border border-[#262634]">
                  <Users className="w-6 h-6 text-[#C8102E] mb-3" />
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1.5">Pertencimento</h4>
                  <p className="text-xs sm:text-[13.5px] text-[#A1A1AA] leading-relaxed font-normal">
                    Um ambiente amigável onde você é reconhecido pelo nome e acolhido com atenção.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#181822] border border-[#262634]">
                  <ShieldCheck className="w-6 h-6 text-[#C8102E] mb-3" />
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1.5">Profissionalismo</h4>
                  <p className="text-xs sm:text-[13.5px] text-[#A1A1AA] leading-relaxed font-normal">
                    Dedicação e seriedade na orientação dos exercícios para preservar a sua saúde.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#181822] border border-[#262634]">
                  <Sparkles className="w-6 h-6 text-[#C8102E] mb-3" />
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1.5">Autoestima</h4>
                  <p className="text-xs sm:text-[13.5px] text-[#A1A1AA] leading-relaxed font-normal">
                    Conquista de bem-estar corporal, disposição diária e autoconfiança renovada.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#20202A] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-[0.08em]">
                  Academia Evolution Fitness
                </span>
                <span className="text-xs text-[#CBD5E1]">Três Rios - RJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
