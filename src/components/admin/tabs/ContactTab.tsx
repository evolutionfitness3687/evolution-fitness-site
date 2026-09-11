import React, { useState } from 'react';
import { Save, Phone, MapPin, Instagram, Globe } from 'lucide-react';
import { ContactInfo } from '../../../types';
import { updateContactInfo } from '../../../services/dataService';

interface ContactTabProps {
  contact: ContactInfo;
  onShowToast: (msg: string) => void;
}

export const ContactTab: React.FC<ContactTabProps> = ({ contact, onShowToast }) => {
  const [form, setForm] = useState<ContactInfo>({ ...contact });
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setForm({ ...contact });
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateContactInfo(form);
      onShowToast('Dados de contato atualizados com sucesso!');
    } catch {
      onShowToast('Erro ao atualizar contatos.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-white font-display">
          Canais de Contato e Endereço
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Atualize os dados de telefone, WhatsApp, redes sociais e endereço da academia.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-[#14141B] border border-[#22222E] p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
            Nome da Academia / Razão
          </label>
          <input
            type="text"
            required
            value={form.studioName}
            onChange={(e) => setForm({ ...form, studioName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              Número do WhatsApp (apenas números, com DDI e DDD)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                placeholder="Ex: 5524981433386"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
              />
            </div>
            <span className="text-[11px] text-[#64748B] mt-1 block">Utilizado para links diretos de conversa</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              Telefone Formatado (Exibição Visual)
            </label>
            <input
              type="text"
              required
              value={form.phoneDisplay}
              onChange={(e) => setForm({ ...form, phoneDisplay: e.target.value })}
              placeholder="Ex: (24) 98143-3386"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              Instagram (@handle)
            </label>
            <div className="relative">
              <Instagram className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={form.instagramHandle}
                onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                placeholder="@evolutionfitness_tr"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
              URL Completa do Instagram
            </label>
            <input
              type="url"
              required
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              placeholder="https://www.instagram.com/evolutionfitness_tr/"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-[#22222E]">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
            Endereço da Academia
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                Logradouro e Número
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Rua Doutor Valmir Peçanha, 50"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Cidade e Estado
                </label>
                <input
                  type="text"
                  required
                  value={form.cityState}
                  onChange={(e) => setForm({ ...form, cityState: e.target.value })}
                  placeholder="Três Rios - RJ"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  CEP
                </label>
                <input
                  type="text"
                  required
                  value={form.zipCode}
                  onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                  placeholder="25802-180"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                Link do Google Maps ("COMO CHEGAR")
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  required
                  value={form.googleMapsUrl}
                  onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#22222E] flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Salvando...' : 'Salvar Informações de Contato'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
