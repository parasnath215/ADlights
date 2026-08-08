'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Edit3, Search, RefreshCw, X, Check } from 'lucide-react';
import { AdminSidebar } from '../../../components/admin/AdminSidebar';
import { useAdmin } from '../../../context/AdminContext';
import { Product } from '../../../types/commerce';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, syncWooCommerce, isSyncing } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Product['category']>('Architectural');
  const [price, setPrice] = useState(550);
  const [originalPrice, setOriginalPrice] = useState(630);
  const [stockCount, setStockCount] = useState(10);
  const [primaryImage, setPrimaryImage] = useState('https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png');
  const [description, setDescription] = useState('');

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    addProduct({
      slug,
      title,
      subtitle: `${category} Luminaire`,
      price: Number(price),
      originalPrice: Number(originalPrice),
      rating: 5.0,
      reviewsCount: 1,
      category,
      badge: 'New',
      inStock: true,
      stockCount: Number(stockCount),
      primaryImage,
      secondaryImage: primaryImage,
      gallery: [primaryImage],
      description: description || 'High-efficiency architectural lighting fixture engineered for warm atmospheric warmth.',
      variants: [
        { id: 'v1', name: 'Standard Finish', colorHex: '#18181b', image: primaryImage }
      ],
      specs: [
        { icon: 'Zap', label: 'Voltage & Power', value: '220V AC LED' },
        { icon: 'ShieldCheck', label: 'IP Rating', value: 'IP54 / IP65 Waterproof' }
      ],
      upgrades: [],
      highlights: ['Premium aluminum construction.', '5-Year Manufacturer Warranty.'],
      features: ['Dimmable driver ready.'],
      faqs: [{ q: 'Is installation hardware included?', a: 'Yes.' }]
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      title,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      stockCount: Number(stockCount),
      primaryImage,
      description
    });

    setEditingProduct(null);
    resetForm();
  };

  const startEdit = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice || p.price);
    setStockCount(p.stockCount);
    setPrimaryImage(p.primaryImage);
    setDescription(p.description);
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Architectural');
    setPrice(550);
    setOriginalPrice(630);
    setStockCount(10);
    setPrimaryImage('https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png');
    setDescription('');
  };

  return (
    <div className="flex min-h-screen bg-bg-muted">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-border gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl uppercase tracking-tight text-text-primary">
              Product Manager ({products.length})
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Add, edit, or sync WooCommerce lighting catalog fixtures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => syncWooCommerce()}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-pill bg-white text-text-primary border border-border text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
              <span>{isSyncing ? 'Syncing API...' : 'Sync WooCommerce'}</span>
            </button>

            <button
              onClick={() => {
                resetForm();
                setIsAddModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-pill bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Add New Fixture</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fixtures by title or category..."
            className="w-full pl-9 pr-4 py-2.5 rounded-pill bg-white border border-border text-xs text-text-primary focus:outline-none focus:border-zinc-950"
          />
        </div>

        {/* Products Table Grid */}
        <div className="bg-white rounded-card border border-border shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-text-primary">
            <thead className="bg-zinc-950 text-white uppercase font-display font-bold text-[11px] tracking-wider">
              <tr>
                <th className="p-4">Fixture</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-bg-muted/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-card overflow-hidden bg-bg-muted border border-border shrink-0">
                      <Image src={p.primaryImage} alt={p.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-text-primary">{p.title}</h4>
                      <span className="text-[10px] font-mono text-text-secondary">{p.id}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-amber-700">{p.category}</td>
                  <td className="p-4 font-mono font-bold">₹{p.price}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                      {p.stockCount} in stock
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="p-2 rounded-full hover:bg-zinc-200 text-zinc-700 transition-colors"
                        title="Edit Fixture"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Delete Fixture"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Product Modal */}
        {(isAddModalOpen || editingProduct) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingProduct(null);
              }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            />

            <div className="relative w-full max-w-xl bg-white rounded-card shadow-2xl z-10 border border-border p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text-primary">
                  {editingProduct ? 'Edit Lighting Fixture' : 'Add New Lighting Fixture'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-500"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={editingProduct ? handleSaveEdit : handleSaveNew} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Fixture Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. Aurora J019-6W LED Foot Light"
                    className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Product['category'])}
                      className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                    >
                      <option value="Architectural">Architectural</option>
                      <option value="Pendant">Pendant & Chandelier</option>
                      <option value="Wall Sconces">Wall Sconces</option>
                      <option value="Table & Desk">Table & Desk</option>
                      <option value="Outdoor IP65">Outdoor IP65</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Stock Count</label>
                    <input
                      type="number"
                      value={stockCount}
                      onChange={(e) => setStockCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Primary Image URL</label>
                  <input
                    type="url"
                    value={primaryImage}
                    onChange={(e) => setPrimaryImage(e.target.value)}
                    required
                    placeholder="https://..."
                    className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Provide fixture details..."
                    className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingProduct(null);
                    }}
                    className="px-5 py-2.5 rounded-pill border border-border font-bold hover:bg-bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-pill bg-zinc-950 text-white font-bold hover:bg-amber-500 hover:text-zinc-950 transition-colors"
                  >
                    {editingProduct ? 'Save Changes' : 'Create Fixture'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
