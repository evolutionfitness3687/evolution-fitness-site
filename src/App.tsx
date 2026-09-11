import React, { useState, useEffect } from 'react';
import { SiteData, AdminUser } from './types';
import { subscribeToSiteData, getInitialOrStoredData } from './services/dataService';
import { onAuthChange, getCurrentUser } from './services/authService';

// Public Components
import { Header } from './components/public/Header';
import { Hero } from './components/public/Hero';
import { About } from './components/public/About';
import { Modalities } from './components/public/Modalities';
import { Philosophy } from './components/public/Philosophy';
import { Gallery } from './components/public/Gallery';
import { Videos } from './components/public/Videos';
import { Testimonials } from './components/public/Testimonials';
import { Schedule } from './components/public/Schedule';
import { Location } from './components/public/Location';
import { Contact } from './components/public/Contact';
import { Footer } from './components/public/Footer';
import { FloatingWhatsApp } from './components/public/FloatingWhatsApp';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';

export default function App() {
  const [data, setData] = useState<SiteData>(getInitialOrStoredData());
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(getCurrentUser());
  const [currentView, setCurrentView] = useState<'public' | 'admin-login' | 'admin-panel'>('public');

  // Listen to live database changes
  useEffect(() => {
    const unsubscribeData = subscribeToSiteData((updatedData) => {
      setData(updatedData);
    });

    const unsubscribeAuth = onAuthChange((user) => {
      setCurrentUser(user);
    });

    // Check if initial hash is #admin
    if (window.location.hash === '#admin') {
      if (getCurrentUser()) {
        setCurrentView('admin-panel');
      } else {
        setCurrentView('admin-login');
      }
    }

    return () => {
      unsubscribeData();
      unsubscribeAuth();
    };
  }, []);

  // When user clicks Admin access
  const handleOpenAdmin = () => {
    if (currentUser) {
      setCurrentView('admin-panel');
      window.location.hash = 'admin';
    } else {
      setCurrentView('admin-login');
      window.location.hash = 'admin';
    }
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
    setCurrentView('admin-panel');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('public');
    window.location.hash = '';
  };

  const handleBackToPublic = () => {
    setCurrentView('public');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View: Admin Panel (Protected)
  if (currentView === 'admin-panel') {
    if (!currentUser) {
      return (
        <AdminLogin
          onSuccess={handleLoginSuccess}
          onBackToSite={handleBackToPublic}
        />
      );
    }

    return (
      <AdminLayout
        user={currentUser}
        data={data}
        onLogout={handleLogout}
        onViewPublicSite={handleBackToPublic}
      />
    );
  }

  // View: Admin Login
  if (currentView === 'admin-login') {
    return (
      <AdminLogin
        onSuccess={handleLoginSuccess}
        onBackToSite={handleBackToPublic}
      />
    );
  }

  // View: Public Institutional Website
  return (
    <div className="min-h-screen bg-[#0B0B0E] text-white flex flex-col selection:bg-[#C8102E] selection:text-white">
      {/* Navigation Header */}
      <Header
        contact={data.contact}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={Boolean(currentUser)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero hero={data.hero} contact={data.contact} />
        <About about={data.about} />
        <Modalities modalities={data.modalities} contact={data.contact} />
        <Philosophy contact={data.contact} />
        <Gallery gallery={data.gallery} contact={data.contact} />
        <Videos videos={data.videos} contact={data.contact} />
        <Testimonials testimonials={data.testimonials} />
        <Schedule hours={data.hours} />
        <Location contact={data.contact} />
        <Contact contact={data.contact} />
      </main>

      {/* Footer */}
      <Footer contact={data.contact} onOpenAdmin={handleOpenAdmin} />

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsApp whatsappNumber={data.contact.whatsappNumber} />
    </div>
  );
}
