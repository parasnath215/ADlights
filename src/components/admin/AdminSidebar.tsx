'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, FileText, ShoppingBag, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { syncWooCommerce, isSyncing } = useAdmin();

  const links = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Product Manager', href: '/admin/products', icon: Package },
    { label: 'Journal & Blogs', href: '/admin/blogs', icon: FileText },
    { label: 'Orders & Fulfillment', href: '/admin/orders', icon: ShoppingBag }
  ];

  return (
    <aside className="w-64 bg-zinc-950 text-white min-h-screen p-6 flex flex-col justify-between border-r border-zinc-800">
      <div>
        {/* Admin Brand Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center">
            <Sparkles size={16} className="text-amber-400" />
          </div>
          <span className="font-display font-extrabold text-xl uppercase tracking-tighter">
            AD<span className="font-light">admin</span>
          </span>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block mb-4">
          Management Portal
        </span>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-pill text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4 pt-6 border-t border-zinc-800">
        {/* WooCommerce Sync Button */}
        <button
          onClick={() => syncWooCommerce()}
          disabled={isSyncing}
          className="w-full py-2.5 px-3 rounded-pill bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-amber-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
          <span>{isSyncing ? 'Syncing...' : 'Sync WooCommerce'}</span>
        </button>

        {/* Back to Live Store Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Live Storefront</span>
        </Link>
      </div>
    </aside>
  );
};
