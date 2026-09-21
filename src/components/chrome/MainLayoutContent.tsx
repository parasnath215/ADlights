'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchModal } from './SearchModal';
import { QuickViewModal } from './QuickViewModal';
import { useCart } from '../../context/CartContext';
import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const MainLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toastMessage } = useCart();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between relative w-full max-w-full overflow-x-hidden">
      <div>
        {!isAdmin && <Header />}
        <main className="w-full max-w-full overflow-x-hidden">{children}</main>
      </div>

      {!isAdmin && <Footer />}

      {/* Overlays & Modals */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto max-w-sm z-50 bg-zinc-950 text-white px-5 py-3 rounded-pill shadow-2xl border border-zinc-800 flex items-center gap-3 text-xs font-semibold animate-slide-up">
          <Sparkles size={16} className="text-amber-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
