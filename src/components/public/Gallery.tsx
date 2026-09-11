import React, { useState } from 'react';
import { Camera, X, Image as ImageIcon, MapPin, MessageCircle } from 'lucide-react';
import { GalleryPhoto, ContactInfo } from '../../types';

interface GalleryProps {
  gallery: GalleryPhoto[];
  contact: ContactInfo;
}

export const Gallery: React.FC<GalleryProps> = ({ gallery, contact }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Filter active photos and order them
  const activePhotos = [...gallery]
    .filter((photo) => photo.isActive)
    .sort((a, b) => a.order - b.order);

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar uma visita para conhecer o espaço da Academia Evolution Fitness.'
  )}`;

  return (
    <section id="fotos" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-[#0B0B0E] border-t border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161F] border border-[#262633] text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase mb-4">
            <Camera className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>Estrutura e Ambiente</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-white tracking-[-0.025em] font-display leading-[1.2] mb-4">
            Galeria da Nossa Academia
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.75] font-normal">
            Conheça o espaço planejado para o seu conforto, segurança e alto rendimento em Três Rios.
          </p>
        </div>

        {/* Empty State: Prompt explicitly mandated to show elegant empty area without inventing fake photos */}
        {activePhotos.length === 0 ? (
          <div className="rounded-2xl bg-[#14141B] border border-[#20202A] p-10 sm:p-14 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A24] border border-[#262634] flex items-center justify-center mx-auto mb-6 text-[#94A3B8]">
              <ImageIcon className="w-8 h-8 text-[#C8102E]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 font-display tracking-[-0.015em]">
              Galeria de Fotos em Atualização
            </h3>

            <p className="text-sm sm:text-base text-[#A1A1AA] leading-[1.7] mb-8 font-normal">
              As fotos oficiais e atualizadas da academia estão sendo adicionadas por nossa equipe. Convidamos você a fazer uma visita presencial para conhecer pessoalmente nossos equipamentos e atmosfera acolhedora!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C8102E] hover:bg-[#A60D24] text-white px-6 py-3.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Agendar Visita no WhatsApp</span>
              </a>

              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#16161F] hover:bg-[#1E1E28] text-[#CBD5E1] hover:text-white border border-[#272736] px-6 py-3.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all"
              >
                <MapPin className="w-4 h-4 text-[#C8102E]" />
                <span>Ver Localização</span>
              </a>
            </div>
          </div>
        ) : (
          /* Real Photos Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activePhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden bg-[#14141B] border border-[#20202A] cursor-pointer aspect-4/3 transition-all hover:border-[#C8102E]/60"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.altText || photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-white font-semibold text-base font-display tracking-[-0.01em]">{photo.title}</h4>
                  {photo.description && (
                    <p className="text-xs sm:text-sm text-[#CBD5E1] line-clamp-2 mt-1 font-normal">{photo.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#14141B] rounded-2xl border border-[#2B2B38] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white z-10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.altText || selectedPhoto.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />

            <div className="p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white font-display tracking-[-0.015em]">{selectedPhoto.title}</h3>
              {selectedPhoto.description && (
                <p className="text-sm text-[#94A3B8] mt-1 font-normal leading-relaxed">{selectedPhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
