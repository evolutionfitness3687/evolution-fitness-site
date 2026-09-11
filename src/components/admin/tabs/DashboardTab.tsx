import React from 'react';
import {
  Dumbbell,
  Camera,
  Film,
  MessageSquareQuote,
  Clock,
  ExternalLink,
  PlusCircle,
  MapPin,
  Phone,
  Instagram,
  CheckCircle2,
} from 'lucide-react';
import { SiteData } from '../../../types';

interface DashboardTabProps {
  data: SiteData;
  onNavigateTab: (tabId: string) => void;
  onViewPublicSite: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  data,
  onNavigateTab,
  onViewPublicSite,
}) => {
  const activeModalitiesCount = data.modalities.filter((m) => m.isActive).length;
  const activePhotosCount = data.gallery.filter((p) => p.isActive).length;
  const activeVideosCount = data.videos.filter((v) => v.isActive).length;
  const activeTestimonialsCount = data.testimonials.filter((t) => t.isActive).length;

  return (
    <div className="space-y-8">
      {/* Welcome & Quick actions bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#14141B] border border-[#22222E]">
        <div>
          <h2 className="text-xl font-bold text-white font-display">
            Painel da Academia Evolution Fitness
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1">
            Gerencie o conteúdo institucional, fotos, modalidades e horários sem precisar de código.
          </p>
        </div>

        <button
          onClick={onViewPublicSite}
          className="inline-flex items-center gap-2 bg-[#1A1A22] hover:bg-[#22222E] text-white border border-[#2B2B38] px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer self-start md:self-auto"
        >
          <span>Visualizar Site Público</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#C8102E]" />
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigateTab('modalidades')}
          className="p-5 rounded-xl bg-[#14141B] border border-[#22222E] hover:border-[#C8102E]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8]">Modalidades</span>
            <div className="w-8 h-8 rounded-lg bg-[#1F1F2A] flex items-center justify-center text-[#C8102E]">
              <Dumbbell className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-display">
              {activeModalitiesCount}
            </span>
            <span className="text-xs text-[#94A3B8]">ativas no site</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('fotos')}
          className="p-5 rounded-xl bg-[#14141B] border border-[#22222E] hover:border-[#C8102E]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8]">Galeria de Fotos</span>
            <div className="w-8 h-8 rounded-lg bg-[#1F1F2A] flex items-center justify-center text-[#C8102E]">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-display">
              {activePhotosCount}
            </span>
            <span className="text-xs text-[#94A3B8]">fotos publicadas</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('videos')}
          className="p-5 rounded-xl bg-[#14141B] border border-[#22222E] hover:border-[#C8102E]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8]">Vídeos</span>
            <div className="w-8 h-8 rounded-lg bg-[#1F1F2A] flex items-center justify-center text-[#C8102E]">
              <Film className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-display">
              {activeVideosCount}
            </span>
            <span className="text-xs text-[#94A3B8]">vídeos ativos</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('depoimentos')}
          className="p-5 rounded-xl bg-[#14141B] border border-[#22222E] hover:border-[#C8102E]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#94A3B8]">Depoimentos</span>
            <div className="w-8 h-8 rounded-lg bg-[#1F1F2A] flex items-center justify-center text-[#C8102E]">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white font-display">
              {activeTestimonialsCount}
            </span>
            <span className="text-xs text-[#94A3B8]">depoimentos</span>
          </div>
        </div>
      </div>

      {/* Quick Access Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl bg-[#14141B] border border-[#22222E] p-6">
          <h3 className="text-base font-bold text-white font-display mb-4">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onNavigateTab('fotos')}
              className="p-3.5 rounded-xl bg-[#1A1A22] border border-[#282836] hover:bg-[#20202B] text-left flex items-center gap-3 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 text-[#C8102E]" />
              <div>
                <strong className="block text-xs font-bold text-white">Adicionar Foto</strong>
                <span className="text-[11px] text-[#94A3B8]">Enviar foto real da academia</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('modalidades')}
              className="p-3.5 rounded-xl bg-[#1A1A22] border border-[#282836] hover:bg-[#20202B] text-left flex items-center gap-3 transition-colors cursor-pointer"
            >
              <Dumbbell className="w-5 h-5 text-[#C8102E]" />
              <div>
                <strong className="block text-xs font-bold text-white">Gerenciar Modalidades</strong>
                <span className="text-[11px] text-[#94A3B8]">Editar descrições e ordem</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('horarios')}
              className="p-3.5 rounded-xl bg-[#1A1A22] border border-[#282836] hover:bg-[#20202B] text-left flex items-center gap-3 transition-colors cursor-pointer"
            >
              <Clock className="w-5 h-5 text-[#C8102E]" />
              <div>
                <strong className="block text-xs font-bold text-white">Ajustar Horários</strong>
                <span className="text-[11px] text-[#94A3B8]">Atualizar funcionamento</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('conteudo')}
              className="p-3.5 rounded-xl bg-[#1A1A22] border border-[#282836] hover:bg-[#20202B] text-left flex items-center gap-3 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5 text-[#C8102E]" />
              <div>
                <strong className="block text-xs font-bold text-white">Textos do Hero</strong>
                <span className="text-[11px] text-[#94A3B8]">Editar frases de destaque</span>
              </div>
            </button>
          </div>
        </div>

        {/* Current Academy Summary Card */}
        <div className="lg:col-span-5 rounded-2xl bg-[#14141B] border border-[#22222E] p-6">
          <h3 className="text-base font-bold text-white font-display mb-4">
            Dados Atuais da Academia
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold block">{data.contact.address}</span>
                <span className="text-[#94A3B8]">{data.contact.cityState} • CEP {data.contact.zipCode}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#C8102E] shrink-0" />
              <span className="text-white font-semibold">{data.contact.phoneDisplay}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Instagram className="w-4 h-4 text-[#C8102E] shrink-0" />
              <span className="text-white font-semibold">{data.contact.instagramHandle}</span>
            </div>

            <div className="pt-3 mt-3 border-t border-[#22222E] flex justify-end">
              <button
                onClick={() => onNavigateTab('contatos')}
                className="text-xs text-[#C8102E] hover:underline font-semibold cursor-pointer"
              >
                Editar dados de contato →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
