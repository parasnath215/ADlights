'use client';

import React from 'react';
import Link from 'next/link';
import { Package, FileText, ShoppingBag, DollarSign, Plus, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { useAdmin } from '../../context/AdminContext';

export default function AdminOverviewPage() {
  const { products, articles, orders, syncWooCommerce, isSyncing } = useAdmin();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="flex min-h-screen bg-bg-muted">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-border gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl uppercase tracking-tight text-text-primary">
              Management Dashboard
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Real-time store metrics, inventory management, and editorial publishing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => syncWooCommerce()}
              disabled={isSyncing}
              className="px-4 py-2 rounded-pill bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center gap-2"
            >
              <span>{isSyncing ? 'Syncing API...' : 'Sync WooCommerce'}</span>
            </button>
          </div>
        </div>

        {/* 4 Analytics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-card bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Total Revenue</span>
              <div className="p-2 rounded-full bg-emerald-100 text-emerald-800">
                <DollarSign size={18} />
              </div>
            </div>
            <p className="font-mono font-bold text-3xl text-text-primary mt-3">
              ₹{totalRevenue.toLocaleString()}
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
              +18% from last month
            </span>
          </div>

          <div className="p-6 rounded-card bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Customer Orders</span>
              <div className="p-2 rounded-full bg-blue-100 text-blue-800">
                <ShoppingBag size={18} />
              </div>
            </div>
            <p className="font-mono font-bold text-3xl text-text-primary mt-3">
              {orders.length}
            </p>
            <span className="text-[11px] text-blue-700 font-semibold mt-1 inline-block">
              Active fulfillment pipeline
            </span>
          </div>

          <div className="p-6 rounded-card bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Active Products</span>
              <div className="p-2 rounded-full bg-amber-100 text-amber-900">
                <Package size={18} />
              </div>
            </div>
            <p className="font-mono font-bold text-3xl text-text-primary mt-3">
              {products.length}
            </p>
            <span className="text-[11px] text-amber-800 font-semibold mt-1 inline-block">
              Synced with WooCommerce
            </span>
          </div>

          <div className="p-6 rounded-card bg-white border border-border shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Journal Articles</span>
              <div className="p-2 rounded-full bg-purple-100 text-purple-800">
                <FileText size={18} />
              </div>
            </div>
            <p className="font-mono font-bold text-3xl text-text-primary mt-3">
              {articles.length}
            </p>
            <span className="text-[11px] text-purple-700 font-semibold mt-1 inline-block">
              Published editorial guides
            </span>
          </div>
        </div>

        {/* Quick Actions & Recent Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders List (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-card p-6 border border-border shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h3 className="font-display font-bold text-lg uppercase text-text-primary">
                Recent Orders
              </h3>
              <Link href="/admin/orders" className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1">
                <span>View All Orders</span> <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 rounded-lg bg-bg-muted border border-border flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-text-primary">{order.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'Shipped' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      Customer: <strong className="text-text-primary">{order.customerName}</strong> ({order.city})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-base text-text-primary">₹{order.totalAmount}</span>
                    <span className="block text-[10px] text-text-secondary mt-0.5">{order.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Admin Actions (1 col) */}
          <div className="bg-white rounded-card p-6 border border-border shadow-xs space-y-6">
            <h3 className="font-display font-bold text-lg uppercase text-text-primary pb-4 border-b border-border">
              Quick Admin Actions
            </h3>

            <div className="space-y-3">
              <Link
                href="/admin/products"
                className="w-full py-3 px-4 rounded-pill bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center justify-between"
              >
                <span>Add New Lighting Fixture</span>
                <Plus size={16} />
              </Link>

              <Link
                href="/admin/blogs"
                className="w-full py-3 px-4 rounded-pill bg-bg-muted text-text-primary border border-border font-bold text-xs uppercase tracking-wider hover:bg-zinc-100 transition-colors flex items-center justify-between"
              >
                <span>Create Journal Article</span>
                <Plus size={16} />
              </Link>

              <button
                onClick={() => syncWooCommerce()}
                className="w-full py-3 px-4 rounded-pill bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider hover:bg-amber-200 transition-colors flex items-center justify-between"
              >
                <span>Re-Sync WooCommerce Data</span>
                <CheckCircle2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
