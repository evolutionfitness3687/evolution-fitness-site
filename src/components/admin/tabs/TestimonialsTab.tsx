import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Quote,
  Upload,
  User,
} from 'lucide-react';
import { Testimonial } from '../../../types';
import { updateTestimonials, uploadMediaFile } from '../../../services/dataService';
import { ConfirmModal } from '../ConfirmModal';

interface TestimonialsTabProps {
  testimonials: Testimonial[];
  onShowToast: (msg: string) => void;
}

export const TestimonialsTab: React.FC<TestimonialsTabProps> = ({
  testimonials,
  onShowToast,
}) => {
  const [items, setItems] = useState<Testimonial[]>([...testimonials]);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formText, setFormText] = useState('');
  const [formPhotoUrl, setFormPhotoUrl] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  React.useEffect(() => {
    setItems([...testimonials]);
  }, [testimonials]);

  const openNewForm = () => {
    setIsNew(true);
    setEditingItem({
      id: `testimonial-${Date.now()}`,
      studentName: '',
      text: '',
      photoUrl: '',
      date: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      isActive: true,
      order: items.length + 1,
    });
    setFormName('');
    setFormText('');
    setFormPhotoUrl('');
    setFormDate(new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }));
    setFormIsActive(true);
  };

  const openEditForm = (item: Testimonial) => {
    setIsNew(false);
    setEditingItem(item);
    setFormName(item.studentName);
    setFormText(item.text);
    setFormPhotoUrl(item.photoUrl || '');
    setFormDate(item.date || '');
    setFormIsActive(item.isActive);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const url = await uploadMediaFile(file, 'testimonials');
      setFormPhotoUrl(url);
      onShowToast('Foto carregada!');
    } catch {
      onShowToast('Erro ao carregar foto.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated: Testimonial = {
      ...editingItem,
      studentName: formName.trim(),
      text: formText.trim(),
      photoUrl: formPhotoUrl.trim() || undefined,
      date: formDate.trim() || undefined,
      isActive: formIsActive,
    };

    let newItems: Testimonial[];
    if (isNew) {
      newItems = [...items, updated];
    } else {
      newItems = items.map((t) => (t.id === updated.id ? updated : t));
    }

    setItems(newItems);
    setEditingItem(null);

    try {
      await updateTestimonials(newItems);
      onShowToast(isNew ? 'Depoimento cadastrado!' : 'Depoimento atualizado!');
    } catch {
      onShowToast('Erro ao salvar depoimento.');
    }
  };

  const handleToggleActive = async (id: string) => {
    const newItems = items.map((t) =>
      t.id === id ? { ...t, isActive: !t.isActive } : t
    );
    setItems(newItems);
    try {
      await updateTestimonials(newItems);
      onShowToast('Status alterado com sucesso!');
    } catch {
      onShowToast('Erro ao atualizar status.');
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const ordered = newItems.map((t, idx) => ({ ...t, order: idx + 1 }));
    setItems(ordered);

    try {
      await updateTestimonials(ordered);
      onShowToast('Ordem atualizada!');
    } catch {
      onShowToast('Erro ao alterar ordem.');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    const newItems = items
      .filter((t) => t.id !== deleteTargetId)
      .map((t, idx) => ({ ...t, order: idx + 1 }));

    setItems(newItems);
    setDeleteTargetId(null);

    try {
      await updateTestimonials(newItems);
      onShowToast('Depoimento removido.');
    } catch {
      onShowToast('Erro ao remover depoimento.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-display">
            Depoimentos dos Alunos
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Cadastre depoimentos reais com nome, relato, foto e data.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Depoimento</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-[#14141B] border border-[#22222E] p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1D1D27] border border-[#2B2B38] flex items-center justify-center mx-auto mb-4 text-[#C8102E]">
            <Quote className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 font-display">
            Nenhum depoimento cadastrado
          </h3>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto mb-5">
            Conforme a orientação institucional, o site não exibe avaliações fictícias. Cadastre aqui os relatos e histórias reais dos alunos da Evolution Fitness.
          </p>
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Depoimento</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-[#14141B] border border-[#22222E] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.isActive ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'
                    }`}
                  >
                    {item.isActive ? 'Visível no site' : 'Oculto'}
                  </span>
                  {item.date && <span className="text-[11px] text-[#64748B]">{item.date}</span>}
                </div>

                <p className="text-xs text-[#CBD5E1] italic leading-relaxed mb-4">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#1F1F2A] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.studentName}
                      className="w-8 h-8 rounded-full object-cover border border-[#2B2B38]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#1A1A22] border border-[#2B2B38] flex items-center justify-center text-[#94A3B8]">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <span className="text-xs font-bold text-white">{item.studentName}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center bg-[#1A1A22] rounded-lg border border-[#282836] p-0.5">
                    <button
                      disabled={index === 0}
                      onClick={() => handleMoveOrder(index, 'up')}
                      className="p-1 text-[#94A3B8] hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Mover para cima"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={index === items.length - 1}
                      onClick={() => handleMoveOrder(index, 'down')}
                      className="p-1 text-[#94A3B8] hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Mover para baixo"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleToggleActive(item.id)}
                    className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                      item.isActive
                        ? 'border-[#10B981]/30 text-[#10B981]'
                        : 'border-[#EF4444]/30 text-[#EF4444]'
                    }`}
                    title={item.isActive ? 'Ocultar do site' : 'Publicar no site'}
                  >
                    {item.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => openEditForm(item)}
                    className="p-1.5 rounded-lg border border-[#2B2B38] text-[#CBD5E1] hover:text-white bg-[#1A1A22] cursor-pointer"
                    title="Editar"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setDeleteTargetId(item.id)}
                    className="p-1.5 rounded-lg border border-[#2B2B38] text-[#EF4444] hover:bg-[#EF4444]/10 bg-[#1A1A22] cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14141B] border border-[#2B2B38] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-4">
              {isNew ? 'Adicionar Depoimento' : 'Editar Depoimento'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Nome do Aluno
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ex: Mariana Silva"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Relato / Depoimento
                </label>
                <textarea
                  rows={4}
                  required
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="Texto do depoimento do aluno..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    Data ou Período
                  </label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="Ex: Março de 2024"
                    className="w-full px-3 py-2 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    Foto Opcional do Aluno
                  </label>
                  <label className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1A1A22] border border-[#282836] text-xs font-semibold text-[#CBD5E1] hover:text-white cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#C8102E]" />
                    <span>{uploadingPhoto ? 'Carregando...' : 'Upload Foto'}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {formPhotoUrl && (
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <img src={formPhotoUrl} alt="Prévia" className="w-8 h-8 rounded-full object-cover" />
                  <span>Foto carregada com sucesso</span>
                  <button
                    type="button"
                    onClick={() => setFormPhotoUrl('')}
                    className="text-[#EF4444] hover:underline ml-auto"
                  >
                    Remover
                  </button>
                </div>
              )}

              <div className="pt-2 border-t border-[#22222E]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C8102E] bg-[#0F0F14] border-[#282836] focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Depoimento Ativo</span>
                    <span className="text-[11px] text-[#94A3B8]">Exibir no site público</span>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22222E]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-lg border border-[#2B2B38] text-xs font-semibold text-[#CBD5E1] hover:bg-[#1A1A24] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C8102E] hover:bg-[#A60D24] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Salvar Depoimento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Excluir Depoimento"
        message="Tem certeza que deseja excluir este depoimento? Esta ação é definitiva."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
