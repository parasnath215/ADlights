'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { NewsletterPopup } from './NewsletterPopup';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { QuickViewModal } from './QuickViewModal';
import { useCart } from '../../context/CartContext';
import { Sparkles } from 'lucide-react';

export const MainLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const { toastMessage } = useCart();

  // Timed popup after ~8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = sessionStorage.getItem('adlights_popup_seen');
      if (!hasSeen) {
        setIsPromoOpen(true);
        sessionStorage.setItem('adlights_popup_seen', 'true');
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <div>
        <Header />
        <main>{children}</main>
      </div>

      <Footer />

      {/* Overlays & Modals */}
      <NewsletterPopup isOpen={isPromoOpen} onClose={() => setIsPromoOpen(false)} />
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-zinc-950 text-white px-5 py-3 rounded-pill shadow-2xl border border-zinc-800 flex items-center gap-3 text-xs font-semibold animate-slide-up">
          <Sparkles size={16} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
