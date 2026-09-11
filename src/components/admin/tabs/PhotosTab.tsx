import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Upload,
  Image as ImageIcon,
  Eye,
} from 'lucide-react';
import { GalleryPhoto } from '../../../types';
import { updateGallery, uploadMediaFile } from '../../../services/dataService';
import { ConfirmModal } from '../ConfirmModal';

interface PhotosTabProps {
  gallery: GalleryPhoto[];
  onShowToast: (msg: string) => void;
}

export const PhotosTab: React.FC<PhotosTabProps> = ({ gallery, onShowToast }) => {
  const [items, setItems] = useState<GalleryPhoto[]>([...gallery]);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formAltText, setFormAltText] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  React.useEffect(() => {
    setItems([...gallery]);
  }, [gallery]);

  const openNewForm = () => {
    setIsNew(true);
    setEditingPhoto({
      id: `photo-${Date.now()}`,
      title: '',
      description: '',
      altText: '',
      imageUrl: '',
      isActive: true,
      order: items.length + 1,
      createdAt: new Date().toISOString(),
    });
    setFormTitle('');
    setFormDescription('');
    setFormAltText('');
    setFormImageUrl('');
    setFormIsActive(true);
  };

  const openEditForm = (photo: GalleryPhoto) => {
    setIsNew(false);
    setEditingPhoto(photo);
    setFormTitle(photo.title);
    setFormDescription(photo.description || '');
    setFormAltText(photo.altText || '');
    setFormImageUrl(photo.imageUrl);
    setFormIsActive(photo.isActive);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadMediaFile(file, 'gallery');
      setFormImageUrl(url);
      if (!formTitle) {
        setFormTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
      if (!formAltText) {
        setFormAltText('Foto da Academia Evolution Fitness em Três Rios');
      }
      onShowToast('Arquivo carregado com sucesso!');
    } catch {
      onShowToast('Erro ao carregar a foto.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto || !formImageUrl) {
      onShowToast('Por favor, envie ou informe o link da imagem.');
      return;
    }

    const updatedPhoto: GalleryPhoto = {
      ...editingPhoto,
      title: formTitle.trim(),
      description: formDescription.trim() || undefined,
      altText: formAltText.trim() || formTitle.trim(),
      imageUrl: formImageUrl.trim(),
      isActive: formIsActive,
    };

    let newItems: GalleryPhoto[];
    if (isNew) {
      newItems = [...items, updatedPhoto];
    } else {
      newItems = items.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p));
    }

    setItems(newItems);
    setEditingPhoto(null);

    try {
      await updateGallery(newItems);
      onShowToast(isNew ? 'Foto adicionada à galeria!' : 'Foto atualizada!');
    } catch {
      onShowToast('Erro ao salvar foto.');
    }
  };

  const handleToggleActive = async (id: string) => {
    const newItems = items.map((p) =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    );
    setItems(newItems);
    try {
      await updateGallery(newItems);
      onShowToast('Status alterado!');
    } catch {
      onShowToast('Erro ao alterar status da foto.');
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

    const ordered = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    setItems(ordered);

    try {
      await updateGallery(ordered);
      onShowToast('Ordem da galeria atualizada!');
    } catch {
      onShowToast('Erro ao reordenar fotos.');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    const newItems = items
      .filter((p) => p.id !== deleteTargetId)
      .map((item, idx) => ({ ...item, order: idx + 1 }));

    setItems(newItems);
    setDeleteTargetId(null);

    try {
      await updateGallery(newItems);
      onShowToast('Foto removida da galeria.');
    } catch {
      onShowToast('Erro ao remover foto.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-display">
            Galeria de Fotos
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Adicione fotos reais da academia, defina títulos e textos alternativos para SEO.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Foto</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-[#14141B] border border-[#22222E] p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1D1D27] border border-[#2B2B38] flex items-center justify-center mx-auto mb-4 text-[#C8102E]">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 font-display">
            Nenhuma foto cadastrada ainda
          </h3>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto mb-5">
            No momento o site público exibe o aviso elegante de que as fotos reais serão adicionadas em breve. Clique no botão abaixo para adicionar a primeira foto real da academia.
          </p>
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Adicionar Primeira Foto</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden bg-[#14141B] border border-[#22222E] flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full bg-black overflow-hidden group">
                <img
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.isActive
                        ? 'bg-[#10B981] text-black font-semibold'
                        : 'bg-[#EF4444] text-white'
                    }`}
                  >
                    {item.isActive ? 'Ativa' : 'Oculta'}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display line-clamp-1 mb-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-[#94A3B8] line-clamp-2 mb-2">
                      {item.description}
                    </p>
                  )}
                  <p className="text-[11px] text-[#64748B] italic line-clamp-1">
                    ALT: {item.altText || 'Não informado'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#1F1F2A]">
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

                  <div className="flex items-center gap-1.5">
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
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14141B] border border-[#2B2B38] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-display mb-4">
              {isNew ? 'Adicionar Foto à Galeria' : 'Editar Foto'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Image Preview & Upload */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Foto (Arquivo do dispositivo ou URL)
                </label>

                {formImageUrl ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-[#282836] mb-2 bg-black">
                    <img src={formImageUrl} alt="Prévia" className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => setFormImageUrl('')}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded text-xs"
                    >
                      Trocar foto
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-[#282836] hover:border-[#C8102E] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#0F0F14]">
                    <Upload className="w-8 h-8 text-[#C8102E] mb-2" />
                    <span className="text-xs font-semibold text-white">
                      {uploading ? 'Enviando arquivo...' : 'Clique para selecionar a foto'}
                    </span>
                    <span className="text-[11px] text-[#64748B] mt-1">PNG, JPG, WEBP</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                )}

                <div className="mt-2">
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="Ou cole a URL da imagem..."
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Título da Foto
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Área de Musculação, Sala de Spinning..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-sm focus:border-[#C8102E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Descrição (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detalhes adicionais sobre o ambiente..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Texto Alternativo (ALT) para SEO e Acessibilidade
                </label>
                <input
                  type="text"
                  required
                  value={formAltText}
                  onChange={(e) => setFormAltText(e.target.value)}
                  placeholder="Ex: Aparelhos modernos de musculação na Evolution Fitness Três Rios"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none"
                />
              </div>

              <div className="pt-2 border-t border-[#22222E]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C8102E] bg-[#0F0F14] border-[#282836] focus:ring-0"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Foto Ativa</span>
                    <span className="text-[11px] text-[#94A3B8]">Exibir esta foto na galeria pública</span>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22222E]">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 rounded-lg border border-[#2B2B38] text-xs font-semibold text-[#CBD5E1] hover:bg-[#1A1A24] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={uploading || !formImageUrl}
                  className="px-5 py-2 rounded-lg bg-[#C8102E] hover:bg-[#A60D24] text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                >
                  Salvar Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Excluir Foto"
        message="Tem certeza que deseja remover esta foto da galeria? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
