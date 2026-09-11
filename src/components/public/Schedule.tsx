import React from 'react';
import { Clock, CalendarCheck2, CheckCircle2, XCircle } from 'lucide-react';
import { OperatingHours } from '../../types';

interface ScheduleProps {
  hours: OperatingHours[];
}

export const Schedule: React.FC<ScheduleProps> = ({ hours }) => {
  // Sort by order
  const sortedHours = [...hours].sort((a, b) => a.order - b.order);

  // Helper to get current day index in Portuguese
  const getTodayKey = () => {
    const day = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const map = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    return map[day];
  };

  const todayKey = getTodayKey();

  return (
    <section id="horarios" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-[#0E0E12] border-t border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161F] border border-[#262633] text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase mb-4">
            <Clock className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>Planeje Seus Treinos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-white tracking-[-0.025em] font-display leading-[1.2] mb-4">
            Horários de Funcionamento
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.75] font-normal">
            Ampla flexibilidade de horários para você encaixar o seu treino na sua rotina com comodidade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Hours Table */}
          <div className="lg:col-span-8 rounded-2xl bg-[#14141B] border border-[#20202A] overflow-hidden">
            <div className="p-6 sm:p-7 border-b border-[#20202A] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CalendarCheck2 className="w-5 h-5 text-[#C8102E]" />
                <span className="font-semibold text-white font-display tracking-[-0.01em] text-base sm:text-lg">Grade Semanal</span>
              </div>
              <span className="text-xs sm:text-sm text-[#A1A1AA] font-normal">Atualizado em tempo real</span>
            </div>

            <div className="divide-y divide-[#1E1E28]">
              {sortedHours.map((item) => {
                const isToday = item.dayKey.toLowerCase() === todayKey;

                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between px-6 sm:px-8 py-5 transition-colors ${
                      isToday ? 'bg-[#1A1A26]' : 'hover:bg-[#181822]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-semibold text-white">
                        {item.dayLabel}
                      </span>
                      {isToday && (
                        <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-[0.08em] px-2.5 py-0.5 rounded-full bg-[#C8102E] text-white">
                          Hoje
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm sm:text-base font-medium ${
                          item.isOpen ? 'text-[#CBD5E1]' : 'text-[#EF4444]'
                        }`}
                      >
                        {item.hours}
                      </span>
                      {item.isOpen ? (
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#EF4444]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#14141B] border border-[#20202A] p-7 sm:p-9">
            <h3 className="text-lg sm:text-xl lg:text-[1.3rem] font-semibold text-white font-display tracking-[-0.015em] mb-4">
              Acesso Sem Agendamento Prévio
            </h3>
            <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-[1.65] mb-8 font-normal">
              Nossos alunos matriculados contam com livre acesso nos horários de funcionamento. Venha no momento que melhor se ajustar ao seu dia!
            </p>

            <div className="p-5 sm:p-6 rounded-xl bg-[#181822] border border-[#262634] space-y-4">
              <div className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed">
                <strong className="text-white font-semibold block mb-1">Segunda a Sexta</strong>
                Treine das 06:00 às 22:00 direto, sem interrupção.
              </div>
              <div className="text-xs sm:text-sm text-[#CBD5E1] font-normal leading-relaxed">
                <strong className="text-white font-semibold block mb-1">Sábados</strong>
                Funcionamento especial das 08:00 às 13:00.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
