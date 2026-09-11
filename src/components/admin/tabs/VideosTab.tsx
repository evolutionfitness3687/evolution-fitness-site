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
  Film,
  Link2,
} from 'lucide-react';
import { VideoItem } from '../../../types';
import { updateVideos, uploadMediaFile } from '../../../services/dataService';
import { ConfirmModal } from '../ConfirmModal';

interface VideosTabProps {
  videos: VideoItem[];
  onShowToast: (msg: string) => void;
}

export const VideosTab: React.FC<VideosTabProps> = ({ videos, onShowToast }) => {
  const [items, setItems] = useState<VideoItem[]>([...videos]);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formType, setFormType] = useState<'upload' | 'youtube' | 'instagram'>('youtube');
  const [formUrl, setFormUrl] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  React.useEffect(() => {
    setItems([...videos]);
  }, [videos]);

  const openNewForm = () => {
    setIsNew(true);
    setEditingVideo({
      id: `video-${Date.now()}`,
      title: '',
      description: '',
      type: 'youtube',
      url: '',
      coverImage: '',
      isActive: true,
      order: items.length + 1,
      createdAt: new Date().toISOString(),
    });
    setFormTitle('');
    setFormDescription('');
    setFormType('youtube');
    setFormUrl('');
    setFormCoverImage('');
    setFormIsActive(true);
  };

  const openEditForm = (video: VideoItem) => {
    setIsNew(false);
    setEditingVideo(video);
    setFormTitle(video.title);
    setFormDescription(video.description || '');
    setFormType(video.type);
    setFormUrl(video.url);
    setFormCoverImage(video.coverImage || '');
    setFormIsActive(video.isActive);
  };

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadMediaFile(file, 'videos');
      setFormUrl(url);
      setFormType('upload');
      if (!formTitle) {
        setFormTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
      onShowToast('Vídeo carregado com sucesso!');
    } catch {
      onShowToast('Erro ao carregar arquivo de vídeo.');
    } finally {
      setUploading(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadMediaFile(file, 'covers');
      setFormCoverImage(url);
      onShowToast('Capa do vídeo carregada!');
    } catch {
      onShowToast('Erro ao enviar capa.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !formUrl) {
      onShowToast('Por favor, informe o link ou envie o arquivo do vídeo.');
      return;
    }

    const updatedVideo: VideoItem = {
      ...editingVideo,
      title: formTitle.trim(),
      description: formDescription.trim() || undefined,
      type: formType,
      url: formUrl.trim(),
      coverImage: formCoverImage.trim() || undefined,
      isActive: formIsActive,
    };

    let newItems: VideoItem[];
    if (isNew) {
      newItems = [...items, updatedVideo];
    } else {
      newItems = items.map((v) => (v.id === updatedVideo.id ? updatedVideo : v));
    }

    setItems(newItems);
    setEditingVideo(null);

    try {
      await updateVideos(newItems);
      onShowToast(isNew ? 'Vídeo cadastrado com sucesso!' : 'Vídeo atualizado!');
    } catch {
      onShowToast('Erro ao salvar vídeo.');
    }
  };

  const handleToggleActive = async (id: string) => {
    const newItems = items.map((v) =>
      v.id === id ? { ...v, isActive: !v.isActive } : v
    );
    setItems(newItems);
    try {
      await updateVideos(newItems);
      onShowToast('Status alterado!');
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

    const ordered = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    setItems(ordered);

    try {
      await updateVideos(ordered);
      onShowToast('Ordem dos vídeos atualizada!');
    } catch {
      onShowToast('Erro ao reordenar vídeos.');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    const newItems = items
      .filter((v) => v.id !== deleteTargetId)
      .map((item, idx) => ({ ...item, order: idx + 1 }));

    setItems(newItems);
    setDeleteTargetId(null);

    try {
      await updateVideos(newItems);
      onShowToast('Vídeo excluído com sucesso.');
    } catch {
      onShowToast('Erro ao excluir vídeo.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-display">
            Vídeos da Academia
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Cadastre links do YouTube, Instagram ou envie arquivos de vídeo com reprodução otimizada.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Vídeo</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-[#14141B] border border-[#22222E] p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1D1D27] border border-[#2B2B38] flex items-center justify-center mx-auto mb-4 text-[#C8102E]">
            <Film className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white mb-1 font-display">
            Nenhum vídeo cadastrado ainda
          </h3>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto mb-5">
            O site público exibe a mensagem discreta de vídeos em breve. Você pode cadastrar vídeos do YouTube, Instagram ou carregar arquivos MP4.
          </p>
          <button
            onClick={openNewForm}
            className="inline-flex items-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Primeiro Vídeo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden bg-[#14141B] border border-[#22222E] flex flex-col justify-between"
            >
              <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1A1A22] text-[#CBD5E1] uppercase tracking-wider border border-[#2B2B38]">
                    {item.type}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.isActive ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'
                    }`}
                  >
                    {item.isActive ? 'Ativo' : 'Oculto'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white font-display mb-1">{item.title}</h4>
                {item.description && (
                  <p className="text-xs text-[#94A3B8] line-clamp-2 mb-2">{item.description}</p>
                )}
                <p className="text-[11px] text-[#64748B] truncate">URL: {item.url}</p>
              </div>

              <div className="flex items-center justify-between p-4 pt-3 border-t border-[#1F1F2A] bg-[#101016]">
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
          ))}
        </div>
      )}

      {/* Video Modal Form */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14141B] border border-[#2B2B38] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white font-display mb-4">
              {isNew ? 'Adicionar Vídeo' : 'Editar Vídeo'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Tipo de Origem
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['youtube', 'instagram', 'upload'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormType(type)}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold uppercase tracking-wider cursor-pointer ${
                        formType === type
                          ? 'border-[#C8102E] bg-[#C8102E]/10 text-white'
                          : 'border-[#282836] bg-[#0F0F14] text-[#94A3B8]'
                      }`}
                    >
                      {type === 'youtube' ? 'YouTube' : type === 'instagram' ? 'Instagram' : 'Arquivo MP4'}
                    </button>
                  ))}
                </div>
              </div>

              {formType === 'upload' ? (
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    Arquivo de Vídeo (MP4, WEBM)
                  </label>
                  <label className="border-2 border-dashed border-[#282836] hover:border-[#C8102E] rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-[#0F0F14]">
                    <Upload className="w-6 h-6 text-[#C8102E] mb-1" />
                    <span className="text-xs text-white font-semibold">
                      {uploading ? 'Enviando vídeo...' : 'Selecionar arquivo de vídeo'}
                    </span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      disabled={uploading}
                      onChange={handleVideoFileUpload}
                      className="hidden"
                    />
                  </label>
                  {formUrl && (
                    <p className="text-[11px] text-[#10B981] mt-1 truncate">Arquivo carregado: {formUrl}</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                    {formType === 'youtube' ? 'Link do YouTube' : 'Link do Instagram'}
                  </label>
                  <div className="relative">
                    <Link2 className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      required
                      value={formUrl}
                      onChange={(e) => setFormUrl(e.target.value)}
                      placeholder={
                        formType === 'youtube'
                          ? 'https://www.youtube.com/watch?v=...'
                          : 'https://www.instagram.com/reel/...'
                      }
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Título do Vídeo
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Treino de Alta Intensidade GAP"
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
                  placeholder="Informações adicionais..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5">
                  Imagem de Capa Opcional (Thumbnail)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="URL da capa ou selecione um arquivo..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#0F0F14] border border-[#282836] text-white text-xs focus:border-[#C8102E] focus:outline-none"
                  />
                  <label className="px-3 py-1.5 rounded-lg bg-[#1A1A22] border border-[#282836] text-xs font-semibold text-[#CBD5E1] hover:text-white cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5 inline mr-1 text-[#C8102E]" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                  </label>
                </div>
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
                    <span className="text-xs font-bold text-white block">Vídeo Ativo</span>
                    <span className="text-[11px] text-[#94A3B8]">Exibir este vídeo publicamente</span>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22222E]">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="px-4 py-2 rounded-lg border border-[#2B2B38] text-xs font-semibold text-[#CBD5E1] hover:bg-[#1A1A24] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={uploading || !formUrl}
                  className="px-5 py-2 rounded-lg bg-[#C8102E] hover:bg-[#A60D24] text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                >
                  Salvar Vídeo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Excluir Vídeo"
        message="Tem certeza que deseja remover este vídeo? Ele não será mais exibido na página pública."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
