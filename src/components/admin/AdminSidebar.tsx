'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, FileText, ShoppingBag, ArrowLeft, RefreshCw, Sparkles, Users } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { syncWooCommerce, isSyncing } = useAdmin();

  const links = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Product Manager', href: '/admin/products', icon: Package },
    { label: 'Journal & Blogs', href: '/admin/blogs', icon: FileText },
    { label: 'Orders & Fulfillment', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Brand Partners', href: '/admin/partners', icon: Users }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-950 text-white flex items-center justify-between px-6 z-40 border-b border-zinc-800">
      <div className="flex items-center gap-8">
        {/* Admin Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center">
            <Sparkles size={16} className="text-amber-400" />
          </div>
          <span className="font-display font-extrabold text-xl uppercase tracking-tighter hidden sm:block">
            AD<span className="font-light">admin</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-pill text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon size={14} />
                <span className="hidden md:block">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* WooCommerce Sync Button */}
        <button
          onClick={() => syncWooCommerce()}
          disabled={isSyncing}
          className="px-3 py-1.5 rounded-pill bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-amber-400 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
          <span className="hidden md:block">{isSyncing ? 'Syncing...' : 'Sync'}</span>
        </button>

        {/* Back to Live Store Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span className="hidden md:block">Live Store</span>
        </Link>
      </div>
    </header>
  );
};
