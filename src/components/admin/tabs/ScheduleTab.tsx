import React, { useState } from 'react';
import { Clock, Save, CheckCircle2, XCircle } from 'lucide-react';
import { OperatingHours } from '../../../types';
import { updateOperatingHours } from '../../../services/dataService';

interface ScheduleTabProps {
  hours: OperatingHours[];
  onShowToast: (msg: string) => void;
}

export const ScheduleTab: React.FC<ScheduleTabProps> = ({ hours, onShowToast }) => {
  const [items, setItems] = useState<OperatingHours[]>([...hours]);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setItems([...hours]);
  }, [hours]);

  const handleHoursChange = (id: string, newHours: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, hours: newHours } : item))
    );
  };

  const handleToggleOpen = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextOpen = !item.isOpen;
        return {
          ...item,
          isOpen: nextOpen,
          hours: nextOpen ? (item.hours === 'Fechado' ? '06:00 às 22:00' : item.hours) : 'Fechado',
        };
      })
    );
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateOperatingHours(items);
      onShowToast('Grade de horários atualizada com sucesso!');
    } catch {
      onShowToast('Erro ao salvar horários.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-display">
            Horários de Funcionamento
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Configure os horários de abertura e fechamento para cada dia da semana.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Salvando...' : 'Salvar Grade Completa'}</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="rounded-2xl bg-[#14141B] border border-[#22222E] overflow-hidden">
        <div className="p-4 bg-[#101016] border-b border-[#22222E] flex items-center justify-between text-xs text-[#94A3B8] font-semibold uppercase tracking-wider">
          <span>Dia da Semana</span>
          <div className="flex items-center gap-12 pr-4">
            <span>Horário de Atendimento</span>
            <span>Status</span>
          </div>
        </div>

        <div className="divide-y divide-[#1C1C26]">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#181820] transition-colors"
            >
              <div className="w-40 font-bold text-sm text-white font-display">
                {item.dayLabel}
              </div>

              <div className="flex items-center gap-3 flex-1 justify-end">
                <input
                  type="text"
                  disabled={!item.isOpen}
                  value={item.hours}
                  onChange={(e) => handleHoursChange(item.id, e.target.value)}
                  placeholder="Ex: 06:00 às 22:00"
                  className="px-3 py-1.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none max-w-[200px] disabled:opacity-40 disabled:bg-[#14141B]"
                />

                <button
                  type="button"
                  onClick={() => handleToggleOpen(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                    item.isOpen
                      ? 'border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]'
                      : 'border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444]'
                  }`}
                >
                  {item.isOpen ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aberto</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Fechado</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#101016] border-t border-[#22222E] flex items-center justify-between">
          <span className="text-xs text-[#94A3B8]">
            As alterações são refletidas imediatamente na página inicial do site.
          </span>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar</span>
          </button>
        </div>
      </form>
    </div>
  );
};
