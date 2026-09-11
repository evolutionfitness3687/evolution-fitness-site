import React, { useState } from 'react';
import { Save, Check, Sparkles } from 'lucide-react';
import { HeroContent, AboutContent } from '../../../types';
import { updateHero, updateAbout } from '../../../services/dataService';

interface ContentTabProps {
  hero: HeroContent;
  about: AboutContent;
  onShowToast: (msg: string) => void;
}

export const ContentTab: React.FC<ContentTabProps> = ({ hero, about, onShowToast }) => {
  const [heroForm, setHeroForm] = useState<HeroContent>({ ...hero });
  const [aboutForm, setAboutForm] = useState<AboutContent>({ ...about });
  const [savingHero, setSavingHero] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    try {
      await updateHero(heroForm);
      onShowToast('Conteúdo do Hero atualizado com sucesso!');
    } catch {
      onShowToast('Erro ao atualizar o Hero.');
    } finally {
      setSavingHero(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAbout(false);
    try {
      await updateAbout(aboutForm);
      onShowToast('Apresentação institucional atualizada com sucesso!');
    } catch {
      onShowToast('Erro ao atualizar a apresentação.');
    } finally {
      setSavingAbout(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Hero Content Form */}
      <div className="rounded-2xl bg-[#14141B] border border-[#22222E] p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#C8102E]" />
          <h3 className="text-lg font-bold text-white font-display">
            Seção Principal (Hero)
          </h3>
        </div>
        <p className="text-xs text-[#94A3B8] mb-6">
          Altere a manchete principal, subtítulo e textos dos botões de ação exibidos no topo do site.
        </p>

        <form onSubmit={handleSaveHero} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              Título Principal (Headline)
            </label>
            <input
              type="text"
              required
              value={heroForm.headline}
              onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              Texto de Apoio (Subtítulo)
            </label>
            <textarea
              rows={3}
              required
              value={heroForm.subtitle}
              onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                Texto do Botão Primário
              </label>
              <input
                type="text"
                value={heroForm.primaryButtonText}
                onChange={(e) => setHeroForm({ ...heroForm, primaryButtonText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                Texto do Botão Secundário
              </label>
              <input
                type="text"
                value={heroForm.secondaryButtonText}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryButtonText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              disabled={savingHero}
              className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingHero ? 'Salvando...' : 'Salvar Alterações do Hero'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Philosophy & About Content Form */}
      <div className="rounded-2xl bg-[#14141B] border border-[#22222E] p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white font-display mb-1">
          Apresentação e Filosofia da Marca
        </h3>
        <p className="text-xs text-[#94A3B8] mb-6">
          Edite a frase de filosofia e a história de apresentação da Academia Evolution Fitness.
        </p>

        <form onSubmit={handleSaveAbout} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              Título da Seção Sobre
            </label>
            <input
              type="text"
              required
              value={aboutForm.title}
              onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              Frase da Filosofia (Destaque Principal)
            </label>
            <textarea
              rows={2}
              required
              value={aboutForm.philosophy}
              onChange={(e) => setAboutForm({ ...aboutForm, philosophy: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              Texto Institucional / História
            </label>
            <textarea
              rows={4}
              required
              value={aboutForm.story}
              onChange={(e) => setAboutForm({ ...aboutForm, story: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none leading-relaxed"
            />
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              disabled={savingAbout}
              className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{savingAbout ? 'Salvando...' : 'Salvar Apresentação'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
