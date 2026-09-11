import React, { useState } from 'react';
import { Video, Play, ExternalLink, Film } from 'lucide-react';
import { VideoItem, ContactInfo } from '../../types';

interface VideosProps {
  videos: VideoItem[];
  contact: ContactInfo;
}

export const Videos: React.FC<VideosProps> = ({ videos, contact }) => {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const activeVideos = [...videos]
    .filter((v) => v.isActive)
    .sort((a, b) => a.order - b.order);

  // Helper to extract YouTube embed URL
  const getYouTubeEmbedUrl = (url: string): string => {
    try {
      if (url.includes('embed/')) return url;
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      }
      if (url.includes('watch?v=')) {
        const id = new URL(url).searchParams.get('v');
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      }
      return url;
    } catch {
      return url;
    }
  };

  return (
    <section id="videos" className="py-24 sm:py-28 md:py-32 lg:py-36 bg-[#0E0E12] border-t border-[#1C1C24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161F] border border-[#262633] text-xs sm:text-[13px] font-semibold text-[#D4D4D8] tracking-[0.06em] uppercase mb-4">
            <Video className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>Vídeos e Treinos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-white tracking-[-0.025em] font-display leading-[1.2] mb-4">
            A Energia dos Nossos Treinos
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-[1.75] font-normal">
            Confira como é a dinâmica das nossas aulas e o acompanhamento dos nossos alunos em movimento.
          </p>
        </div>

        {activeVideos.length === 0 ? (
          <div className="rounded-2xl bg-[#14141B] border border-[#20202A] p-10 sm:p-14 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A24] border border-[#262634] flex items-center justify-center mx-auto mb-6 text-[#94A3B8]">
              <Film className="w-8 h-8 text-[#C8102E]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 font-display tracking-[-0.015em]">
              Vídeos em Breve
            </h3>

            <p className="text-sm sm:text-base text-[#A1A1AA] leading-[1.7] mb-8 font-normal">
              Em breve nossa equipe disponibilizará vídeos com demonstrações de aulas, rotinas de musculação e dicas de evolução. Acompanhe também as atualizações no nosso Instagram!
            </p>

            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#16161F] hover:bg-[#1E1E28] text-[#CBD5E1] hover:text-white border border-[#272736] px-6 py-3.5 rounded-xl text-sm font-semibold tracking-[0.01em] transition-all"
            >
              <ExternalLink className="w-4 h-4 text-[#C8102E]" />
              <span>Ver Reels no Instagram @evolutionfitness_tr</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeVideos.map((item) => {
              const isPlaying = playingVideoId === item.id;

              return (
                <div
                  key={item.id}
                  className="flex flex-col rounded-2xl overflow-hidden bg-[#14141B] border border-[#20202A]"
                >
                  <div className="relative aspect-video w-full bg-black">
                    {isPlaying ? (
                      item.type === 'youtube' ? (
                        <iframe
                          src={getYouTubeEmbedUrl(item.url)}
                          title={item.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : item.type === 'instagram' ? (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                          <p className="text-sm text-[#CBD5E1] mb-4 font-normal">
                            Este vídeo está disponível diretamente no Instagram da academia:
                          </p>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#C8102E] text-white px-5 py-2.5 rounded-lg text-sm font-medium tracking-[0.01em]"
                          >
                            <span>Assistir no Instagram</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ) : (
                        <video
                          src={item.url}
                          controls
                          autoPlay
                          preload="metadata"
                          className="w-full h-full object-contain"
                        />
                      )
                    ) : (
                      <div
                        onClick={() => setPlayingVideoId(item.id)}
                        className="relative w-full h-full cursor-pointer group flex items-center justify-center"
                      >
                        {item.coverImage ? (
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#1A1A24] flex items-center justify-center">
                            <Film className="w-12 h-12 text-[#444455]" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-[#C8102E] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 text-white ml-1 fill-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-7 sm:p-8">
                    <h3 className="text-lg sm:text-xl lg:text-[1.3rem] font-semibold text-white font-display tracking-[-0.015em] mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-[1.65] font-normal">{item.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
