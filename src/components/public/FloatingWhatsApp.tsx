import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Olá! Estava navegando no site da Academia Evolution Fitness e gostaria de mais informações.'
  )}`;

  return (
    <a
      id="floating-whatsapp-btn"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3.5 rounded-full shadow-lg shadow-black/40 hover:scale-105 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#0B0B0E]"
      aria-label="Conversar no WhatsApp"
      title="Conversar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white" />
    </a>
  );
};
