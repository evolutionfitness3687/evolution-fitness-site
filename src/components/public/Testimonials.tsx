import React from 'react';
import { Quote, MessageSquareQuote, User } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const activeTestimonials = [...testimonials]
    .filter((t) => t.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="depoimentos" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-[#0B0B0E] border-t border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161F] border border-[#262633] text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>Resultados e Histórias</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-white tracking-[-0.025em] font-display leading-[1.2] mb-4">
            Depoimentos de Quem Vive a Evolução
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.75] font-normal">
            A verdadeira transformação dos nossos alunos reflete o nosso compromisso com cada história.
          </p>
        </div>

        {/* Empty State: Never invent testimonials! Discreet notice per prompt requirement */}
        {activeTestimonials.length === 0 ? (
          <div className="rounded-2xl bg-[#14141B] border border-[#20202A] p-9 sm:p-12 max-w-xl mx-auto text-center">
            <Quote className="w-8 h-8 text-[#C8102E]/60 mx-auto mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2.5 font-display tracking-[-0.01em]">
              Histórias em Breve
            </h3>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-normal">
              Em breve compartilharemos aqui os depoimentos reais dos alunos que fazem parte da família Academia Evolution Fitness.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activeTestimonials.map((t) => (
              <div
                key={t.id}
                className="p-7 sm:p-8 rounded-2xl bg-[#14141B] border border-[#20202A] flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#C8102E] mb-4 opacity-75" />
                  <p className="text-base sm:text-[1.0625rem] text-[#D4D4D8] leading-[1.75] italic mb-8 font-normal">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-5 border-t border-[#1E1E28]">
                  {t.photoUrl ? (
                    <img
                      src={t.photoUrl}
                      alt={t.studentName}
                      className="w-10 h-10 rounded-full object-cover border border-[#2B2B38]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1F1F2A] border border-[#2B2B38] flex items-center justify-center text-[#94A3B8]">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white">{t.studentName}</h4>
                    {t.date && <span className="text-xs text-[#A1A1AA] font-normal">{t.date}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
