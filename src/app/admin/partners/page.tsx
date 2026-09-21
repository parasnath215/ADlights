'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AdminSidebar } from '../../../components/admin/AdminSidebar';
import { useAdmin } from '../../../context/AdminContext';

export default function PartnersAdminPage() {
  const { partners, addPartner, deletePartner } = useAdmin();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl) return;
    addPartner({ name, imageUrl });
    setName('');
    setImageUrl('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-muted pt-16">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-3xl uppercase tracking-tight text-text-primary">
            Brand Partners
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Manage official brand partner logos displayed on the homepage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Partner Form */}
          <div className="bg-white rounded-card p-6 border border-border shadow-xs h-fit">
            <h3 className="font-display font-bold text-lg uppercase text-text-primary mb-4 pb-4 border-b border-border">
              Add New Partner
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-bg-muted border border-border rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Philips"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5">
                  Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-bg-muted border border-border rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  placeholder="e.g. /images/brand-partners/partners-row1.png"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Partner
              </button>
            </form>
          </div>

          {/* Partners List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {partners.map(partner => (
                <div key={partner.id} className="bg-white border border-border rounded-card p-4 flex flex-col items-center shadow-xs group">
                  <div className="w-full h-24 relative mb-4 bg-zinc-50 rounded-lg flex items-center justify-center p-2 border border-border">
                    <img
                      src={partner.imageUrl}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <h4 className="font-display font-bold text-sm uppercase tracking-wider truncate" title={partner.name}>
                      {partner.name}
                    </h4>
                    <button
                      onClick={() => deletePartner(partner.id)}
                      className="p-1.5 rounded-full text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 ml-2"
                      title="Delete Partner"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {partners.length === 0 && (
                <div className="col-span-full py-12 text-center text-zinc-500 text-xs border border-dashed border-border rounded-card">
                  No brand partners added yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
