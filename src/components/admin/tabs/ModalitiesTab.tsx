import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Clock,
  Dumbbell,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';
import { Modality } from '../../../types';
import { updateModalities, uploadMediaFile } from '../../../services/dataService';
import { ConfirmModal } from '../ConfirmModal';

interface ModalitiesTabProps {
  modalities: Modality[];
  onShowToast: (msg: string) => void;
}

export const ModalitiesTab: React.FC<ModalitiesTabProps> = ({ modalities, onShowToast }) => {
  const [items, setItems] = useState<Modality[]>([...modalities]);
  const [editingItem, setEditingItem] = useState<Modality | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsReturningSoon, setFormIsReturningSoon] = useState(false);

  // Synchronize when prop changes
  React.useEffect(() => {
    setItems([...modalities]);
  }, [modalities]);

  const openNewForm = () => {
    setIsNew(true);
    setEditingItem({
      id: `modality-${Date.now()}`,
      name: '',
      description: '',
      imageUrl: '',
      isActive: true,
      order: items.length + 1,
      isReturningSoon: false,
    });
    setFormName('');
    setFormDescription('');
    setFormImageUrl('');
    setFormIsActive(true);
    setFormIsReturningSoon(false);
  };

  const openEditForm = (item: Modality) => {
    setIsNew(false);
    setEditingItem(item);
    setFormName(item.name);
    setFormDescription(item.description);
    setFormImageUrl(item.imageUrl || '');
    setFormIsActive(item.isActive);
    setFormIsReturningSoon(!!item.isReturningSoon);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadMediaFile(file, 'covers');
      setFormImageUrl(url);
      onShowToast('Imagem carregada com sucesso!');
    } catch {
      onShowToast('Erro ao carregar a imagem.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updatedItem: Modality = {
      ...editingItem,
      name: formName.trim(),
      description: formDescription.trim(),
      imageUrl: formImageUrl.trim() || undefined,
      isActive: formIsActive,
      isReturningSoon: formIsReturningSoon,
    };

    let newItems: Modality[];
    if (isNew) {
      newItems = [...items, updatedItem];
    } else {
      newItems = items.map((m) => (m.id === updatedItem.id ? updatedItem : m));
    }

    setItems(newItems);
    setEditingItem(null);

    try {
      await updateModalities(newItems);
      onShowToast(isNew ? 'Modalidade adicionada!' : 'Modalidade atualizada!');
    } catch {
      onShowToast('Erro ao salvar modalidade.');
    }
  };

  const handleToggleActive = async (id: string) => {
    const newItems = items.map((m) =>
      m.id === id ? { ...m, isActive: !m.isActive } : m
    );
    setItems(newItems);
    try {
      await updateModalities(newItems);
      onShowToast('Status alterado com sucesso!');
    } catch {
      onShowToast('Erro ao alterar status.');
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

    // Recalculate order values
    const ordered = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    setItems(ordered);

    try {
      await updateModalities(ordered);
      onShowToast('Ordem atualizada!');
    } catch {
      onShowToast('Erro ao reordenar modalidades.');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    const newItems = items
      .filter((m) => m.id !== deleteTargetId)
      .map((item, idx) => ({ ...item, order: idx + 1 }));

    setItems(newItems);
    setDeleteTargetId(null);

    try {
      await updateModalities(newItems);
      onShowToast('Modalidade excluída com sucesso.');
    } catch {
      onShowToast('Erro ao excluir modalidade.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-display">
            Gerenciamento de Modalidades
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Adicione, reordene, edite fotos e ative ou desative aulas exibidas no site.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Modalidade</span>
        </button>
      </div>

      {/* List */}
      <div className="rounded-2xl bg-[#14141B] border border-[#22222E] overflow-hidden">
        <div className="divide-y divide-[#1C1C26]">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#181820] transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Optional thumbnail preview */}
                <div className="w-14 h-14 rounded-lg bg-[#1A1A24] border border-[#2A2A38] shrink-0 overflow-hidden flex items-center justify-center">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <Dumbbell className="w-6 h-6 text-[#64748B]" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap mb-1">
                    <h4 className="text-base font-bold text-white font-display">{item.name}</h4>
                    {item.isReturningSoon && (
                      <span className="inline-flex items-center gap-1 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span>Previsto para retornar</span>
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.isActive
                          ? 'bg-[#10B981]/10 text-[#10B981]'
                          : 'bg-[#EF4444]/10 text-[#EF4444]'
                      }`}
                    >
                      {item.isActive ? 'Ativa no site' : 'Inativa (Oculta)'}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] max-w-2xl line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                {/* Order buttons */}
                <div className="flex items-center bg-[#1A1A22] rounded-lg border border-[#282836] p-1">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMoveOrder(index, 'up')}
                    className="p-1 text-[#94A3B8] hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Mover para cima"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={index === items.length - 1}
                    onClick={() => handleMoveOrder(index, 'down')}
                    className="p-1 text-[#94A3B8] hover:text-white disabled:opacity-30 cursor-pointer"
                    title="Mover para baixo"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Toggle */}
                <button
                  onClick={() => handleToggleActive(item.id)}
                  className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                    item.isActive
                      ? 'border-[#10B981]/30 text-[#10B981] bg-[#10B981]/5 hover:bg-[#10B981]/15'
                      : 'border-[#EF4444]/30 text-[#EF4444] bg-[#EF4444]/5 hover:bg-[#EF4444]/15'
                  }`}
                  title={item.isActive ? 'Desativar modalidade' : 'Ativar modalidade'}
                >
                  {item.isActive ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => openEditForm(item)}
                  className="p-2 rounded-lg border border-[#2B2B38] text-[#CBD5E1] hover:text-white bg-[#1A1A22] hover:bg-[#22222E] cursor-pointer"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => setDeleteTargetId(item.id)}
                  className="p-2 rounded-lg border border-[#2B2B38] text-[#EF4444] hover:bg-[#EF4444]/10 bg-[#1A1A22] cursor-pointer"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14141B] border border-[#2B2B38] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-4">
              {isNew ? 'Adicionar Nova Modalidade' : `Editar Modalidade: ${editingItem.name}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Nome da Modalidade
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ex: Musculação, GAP, Spinning..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Descrição
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Descreva os benefícios e o formato da aula..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none resize-none"
                />
              </div>

              {/* Image upload or URL */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Imagem Opcional (Upload ou Link)
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none"
                  />
                  <label className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1A1A22] hover:bg-[#242430] border border-[#2B2B38] text-xs font-semibold text-[#CBD5E1] cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5 text-[#C8102E]" />
                    <span>{uploadingImage ? 'Enviando...' : 'Selecionar Arquivo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {formImageUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={formImageUrl} alt="Prévia" className="w-12 h-12 object-cover rounded border border-[#282836]" />
                    <button
                      type="button"
                      onClick={() => setFormImageUrl('')}
                      className="text-xs text-[#EF4444] hover:underline"
                    >
                      Remover imagem
                    </button>
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-[#22222E] space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C8102E] bg-[#0F0F14] border-[#282836] focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Modalidade Ativa</span>
                    <span className="text-[11px] text-[#94A3B8]">Exibir esta modalidade publicamente no site</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsReturningSoon}
                    onChange={(e) => setFormIsReturningSoon(e.target.checked)}
                    className="w-4 h-4 rounded text-[#D4AF37] bg-[#0F0F14] border-[#282836] focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#D4AF37] block">Previsto para retornar</span>
                    <span className="text-[11px] text-[#94A3B8]">
                      Exibe o aviso claro de que a modalidade está prevista para retornar (como o Jump)
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22222E]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2.5 rounded-lg border border-[#2B2B38] text-xs font-semibold text-[#CBD5E1] hover:bg-[#1A1A24] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#C8102E] hover:bg-[#A60D24] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Salvar Modalidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Excluir Modalidade"
        message="Tem certeza que deseja excluir esta modalidade? Esta ação removerá a modalidade da página pública da academia."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
