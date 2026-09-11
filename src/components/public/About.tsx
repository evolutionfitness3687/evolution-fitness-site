import React from 'react';
import { Sparkles, HeartHandshake, UserCheck, Activity, Compass } from 'lucide-react';
import { AboutContent } from '../../types';

interface AboutProps {
  about: AboutContent;
}

export const About: React.FC<AboutProps> = ({ about }) => {
  const iconMap: Record<number, React.ReactNode> = {
    0: <UserCheck className="w-6 h-6 text-[#C8102E]" />,
    1: <HeartHandshake className="w-6 h-6 text-[#C8102E]" />,
    2: <Activity className="w-6 h-6 text-[#C8102E]" />,
    3: <Compass className="w-6 h-6 text-[#C8102E]" />,
  };

  return (
    <section id="sobre" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-[#0E0E12] border-t border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161F] border border-[#262633] text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>Nossa Filosofia</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-white tracking-[-0.025em] font-display leading-[1.2] mb-6">
            {about.title}
          </h2>

          {/* Core Philosophy Callout - Editorial Quote Layout */}
          <div className="p-7 sm:p-9 rounded-2xl bg-[#14141B] border border-[#22222E] shadow-sm mb-8">
            <p className="text-lg sm:text-xl lg:text-[1.35rem] font-normal text-white italic leading-[1.7]">
              "{about.philosophy}"
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.8] font-normal">
            {about.story}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {about.pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-7 sm:p-8 rounded-2xl bg-[#14141B] border border-[#20202A] hover:border-[#353545] transition-all flex flex-col justify-start"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1A1A24] border border-[#262634] flex items-center justify-center mb-5">
                {iconMap[index] || <Sparkles className="w-6 h-6 text-[#C8102E]" />}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-[1.3rem] font-semibold text-white mb-2.5 font-display tracking-[-0.015em]">
                {pillar.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-[1.65] font-normal">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
