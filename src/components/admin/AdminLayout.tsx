import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Dumbbell,
  Camera,
  Film,
  MessageSquareQuote,
  Clock,
  Phone,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import { SiteData, AdminUser } from '../../types';
import { logoutAdmin } from '../../services/authService';
import { DashboardTab } from './tabs/DashboardTab';
import { ContentTab } from './tabs/ContentTab';
import { ModalitiesTab } from './tabs/ModalitiesTab';
import { PhotosTab } from './tabs/PhotosTab';
import { VideosTab } from './tabs/VideosTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { ScheduleTab } from './tabs/ScheduleTab';
import { ContactTab } from './tabs/ContactTab';
import { SettingsTab } from './tabs/SettingsTab';

interface AdminLayoutProps {
  user: AdminUser;
  data: SiteData;
  onLogout: () => void;
  onViewPublicSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  user,
  data,
  onLogout,
  onViewPublicSite,
}) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'conteudo', label: 'Conteúdo do site', icon: <FileText className="w-4 h-4" /> },
    { id: 'modalidades', label: 'Modalidades', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'fotos', label: 'Fotos', icon: <Camera className="w-4 h-4" /> },
    { id: 'videos', label: 'Vídeos', icon: <Film className="w-4 h-4" /> },
    { id: 'depoimentos', label: 'Depoimentos', icon: <MessageSquareQuote className="w-4 h-4" /> },
    { id: 'horarios', label: 'Horários', icon: <Clock className="w-4 h-4" /> },
    { id: 'contatos', label: 'Contatos', icon: <Phone className="w-4 h-4" /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] flex flex-col md:flex-row text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-[#14141B] border border-[#10B981]/50 text-white px-4 py-3 rounded-xl shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#14141B] border-b border-[#22222E] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm tracking-tight text-white font-display">EVOLUTION</span>
          <span className="text-[10px] text-[#C8102E] font-bold uppercase tracking-wider bg-[#C8102E]/10 px-2 py-0.5 rounded">
            ADMIN
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#94A3B8] hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#101016] border-r border-[#1C1C26] flex flex-col justify-between shrink-0 p-5`}
      >
        <div>
          {/* Brand header */}
          <div className="hidden md:flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-[#C8102E] flex items-center justify-center font-bold text-white text-xs">
              EF
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white font-display block">
                EVOLUTION FITNESS
              </span>
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block">
                Painel Administrativo
              </span>
            </div>
          </div>

          {/* User badge */}
          <div className="p-3 rounded-xl bg-[#14141B] border border-[#22222E] mb-6 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#1F1F2A] border border-[#2B2B38] flex items-center justify-center text-[#C8102E]">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-white truncate block">Administrador</span>
              <span className="text-[10px] text-[#64748B] truncate block">{user.email}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C8102E] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#161620]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[#1C1C26] space-y-2 mt-6">
          <button
            onClick={onViewPublicSite}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#CBD5E1] hover:text-white hover:bg-[#161620] transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-[#C8102E]" />
            <span>Ver Site Público</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
        {activeTab === 'dashboard' && (
          <DashboardTab
            data={data}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onViewPublicSite={onViewPublicSite}
          />
        )}
        {activeTab === 'conteudo' && (
          <ContentTab
            hero={data.hero}
            about={data.about}
            onShowToast={showToast}
          />
        )}
        {activeTab === 'modalidades' && (
          <ModalitiesTab
            modalities={data.modalities}
            onShowToast={showToast}
          />
        )}
        {activeTab === 'fotos' && (
          <PhotosTab
            gallery={data.gallery}
            onShowToast={showToast}
          />
        )}
        {activeTab === 'videos' && (
          <VideosTab
            videos={data.videos}
            onShowToast={showToast}
          />
        )}
        {activeTab === 'depoimentos' && (
          <TestimonialsTab
            testimonials={data.testimonials}
            onShowToast={showToast}
          />
        )}
        {activeTab === 'horarios' && (
          <ScheduleTab
            hours={data.hours}
            onShowToast={showToast}
          />
        )}
        {activeTab === 'contatos' && (
          <ContactTab
            contact={data.contact}
            onShowToast={showToast}
          />
        )}
        {activeTab === 'configuracoes' && (
          <SettingsTab
            onShowToast={showToast}
          />
        )}
      </main>
    </div>
  );
};
