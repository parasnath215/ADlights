'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Plus, Trash2, Edit3, Search, RefreshCw, X, Check, Copy, Eye,
  Sparkles, ShieldCheck, Zap, Palette, Ruler, Sun, Info, Image as ImageIcon,
  Sliders, FileText
} from 'lucide-react';
import { AdminSidebar } from '../../../components/admin/AdminSidebar';
import { useAdmin } from '../../../context/AdminContext';
import { Product, ProductSpec, ProductVariant, UpgradeOption } from '../../../types/commerce';

type TabType = 'basic' | 'images' | 'variants' | 'specs' | 'features';

const DEFAULT_PRIMARY_IMAGE = 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, syncWooCommerce, isSyncing } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [stockFilter, setStockFilter] = useState<'All' | 'InStock' | 'OutOfStock'>('All');

  // Modal / Drawer state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<Product['category']>('Architectural');
  const [badge, setBadge] = useState<Product['badge']>('New');
  const [price, setPrice] = useState(550);
  const [originalPrice, setOriginalPrice] = useState(720);
  const [stockCount, setStockCount] = useState(10);
  const [inStock, setInStock] = useState(true);
  const [rating, setRating] = useState(5.0);
  const [reviewsCount, setReviewsCount] = useState(25);

  // Media
  const [primaryImage, setPrimaryImage] = useState(DEFAULT_PRIMARY_IMAGE);
  const [secondaryImage, setSecondaryImage] = useState(DEFAULT_PRIMARY_IMAGE);
  const [gallery, setGallery] = useState<string[]>([DEFAULT_PRIMARY_IMAGE]);
  const [newGalleryInput, setNewGalleryInput] = useState('');

  // Variants (Colours / Finishes)
  const [variants, setVariants] = useState<ProductVariant[]>([
    { id: 'v1', name: 'Standard Architectural Finish', colorHex: '#18181b', image: DEFAULT_PRIMARY_IMAGE }
  ]);
  const [vName, setVName] = useState('');
  const [vColor, setVColor] = useState('#d97706');
  const [vImage, setVImage] = useState('');

  // Specs & Upgrades
  const [specs, setSpecs] = useState<ProductSpec[]>([
    { icon: 'Zap', label: 'Voltage & Power', value: '220-240V AC' },
    { icon: 'ShieldCheck', label: 'Ingress Protection', value: 'IP54 / IP65 Rated' },
    { icon: 'Palette', label: 'Color Rendering', value: 'CRI 90+ Warm White' }
  ]);
  const [specIcon, setSpecIcon] = useState('Zap');
  const [specLabel, setSpecLabel] = useState('');
  const [specValue, setSpecValue] = useState('');

  const [upgrades, setUpgrades] = useState<UpgradeOption[]>([
    { id: 'up-1', title: 'Architectural Mounting Hardware Kit', price: 95 }
  ]);
  const [upTitle, setUpTitle] = useState('');
  const [upPrice, setUpPrice] = useState(95);

  // Features, Highlights & FAQs
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState<string[]>([
    'Direct import from official ADLIGHTS store collection.',
    'High energy efficiency LED driver pre-installed.',
    '5-Year Warranty included as standard.'
  ]);
  const [newHighlight, setNewHighlight] = useState('');

  const [features, setFeatures] = useState<string[]>([
    'Museum-grade optical diffusion prevents direct glare.',
    'Corrosion-resistant anodized aluminum casing.'
  ]);
  const [newFeature, setNewFeature] = useState('');

  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([
    { q: 'Is mounting hardware included?', a: 'Yes, standard mounting brackets and screws are included in the package.' }
  ]);
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  // Filter logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStock = stockFilter === 'All' || (stockFilter === 'InStock' ? p.inStock : !p.inStock);
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Open Form for New
  const openNewForm = () => {
    setEditingProduct(null);
    setTitle('');
    setSubtitle('Architectural Luminaire');
    setSlug('');
    setCategory('Architectural');
    setBadge('New');
    setPrice(550);
    setOriginalPrice(720);
    setStockCount(10);
    setInStock(true);
    setRating(5.0);
    setReviewsCount(15);
    setPrimaryImage(DEFAULT_PRIMARY_IMAGE);
    setSecondaryImage(DEFAULT_PRIMARY_IMAGE);
    setGallery([DEFAULT_PRIMARY_IMAGE]);

    setVariants([
      { id: `v-${Date.now()}-1`, name: 'Standard Finish', colorHex: '#18181b', image: DEFAULT_PRIMARY_IMAGE }
    ]);
    setSpecs([
      { icon: 'Zap', label: 'Voltage & Power', value: '220-240V AC' },
      { icon: 'ShieldCheck', label: 'Ingress Protection', value: 'IP54 / IP65 Rated' },
      { icon: 'Palette', label: 'Color Rendering', value: 'CRI 90+ Warm White' }
    ]);
    setUpgrades([
      { id: `up-${Date.now()}-1`, title: 'Architectural Mounting Hardware Kit', price: 95 }
    ]);
    setDescription('Engineered from anodized aluminum, solid brass, and mouth-blown glass, this fixture delivers low-glare safety and museum-grade illumination.');
    setHighlights(['Official ADLIGHTS Luminaire', 'High efficiency driver pre-installed', '5-Year Manufacturer Warranty']);
    setFeatures(['Museum-grade optical diffusion', 'Corrosion-resistant aluminum casing']);
    setFaqs([{ q: 'Is hardware included?', a: 'Yes, full installation mounting hardware is included.' }]);

    setActiveTab('basic');
    setIsFormOpen(true);
  };

  // Edit Existing
  const openEditForm = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setSubtitle(p.subtitle || `${p.category} Luminaire`);
    setSlug(p.slug || '');
    setCategory(p.category);
    setBadge(p.badge || 'New');
    setPrice(p.price);
    setOriginalPrice(p.originalPrice || p.price);
    setStockCount(p.stockCount);
    setInStock(p.inStock);
    setRating(p.rating || 5.0);
    setReviewsCount(p.reviewsCount || 20);

    setPrimaryImage(p.primaryImage || DEFAULT_PRIMARY_IMAGE);
    setSecondaryImage(p.secondaryImage || p.primaryImage || DEFAULT_PRIMARY_IMAGE);
    setGallery(p.gallery && p.gallery.length > 0 ? p.gallery : [p.primaryImage]);

    setVariants(p.variants && p.variants.length > 0 ? p.variants : [
      { id: `v-${Date.now()}`, name: 'Standard Finish', colorHex: '#18181b', image: p.primaryImage }
    ]);
    setSpecs(p.specs || []);
    setUpgrades(p.upgrades || []);
    setDescription(p.description || '');
    setHighlights(p.highlights || []);
    setFeatures(p.features || []);
    setFaqs(p.faqs || []);

    setActiveTab('basic');
    setIsFormOpen(true);
  };

  // Duplicate Product
  const handleDuplicate = (p: Product) => {
    const duplicatedProduct: Omit<Product, 'id'> = {
      ...p,
      title: `${p.title} (Copy)`,
      slug: `${p.slug}-copy-${Date.now()}`
    };
    addProduct(duplicatedProduct);
  };

  // Save Product Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productPayload: Omit<Product, 'id'> = {
      title,
      subtitle: subtitle || `${category} Luminaire`,
      slug: finalSlug,
      category,
      badge,
      price: Number(price),
      originalPrice: Number(originalPrice),
      stockCount: Number(stockCount),
      inStock: stockCount > 0 && inStock,
      rating: Number(rating),
      reviewsCount: Number(reviewsCount),
      primaryImage,
      secondaryImage: secondaryImage || primaryImage,
      gallery: gallery.length > 0 ? gallery : [primaryImage],
      variants: variants.length > 0 ? variants : [{ id: 'v1', name: 'Standard Finish', colorHex: '#18181b', image: primaryImage }],
      specs,
      upgrades,
      description,
      highlights,
      features,
      faqs
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsFormOpen(false);
    setEditingProduct(null);
  };

  // Gallery Add/Remove
  const addGalleryImage = () => {
    if (!newGalleryInput) return;
    setGallery(prev => [...prev, newGalleryInput]);
    setNewGalleryInput('');
  };

  const removeGalleryImage = (index: number) => {
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  // Variant Add/Remove
  const addVariant = () => {
    if (!vName) return;
    setVariants(prev => [
      ...prev,
      {
        id: `var-${Date.now()}`,
        name: vName,
        colorHex: vColor,
        image: vImage || primaryImage
      }
    ]);
    setVName('');
    setVColor('#d97706');
    setVImage('');
  };

  const removeVariant = (id: string) => {
    setVariants(prev => prev.filter(v => v.id !== id));
  };

  // Specs Add/Remove
  const addSpec = () => {
    if (!specLabel || !specValue) return;
    setSpecs(prev => [...prev, { icon: specIcon, label: specLabel, value: specValue }]);
    setSpecLabel('');
    setSpecValue('');
  };

  const removeSpec = (index: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  // Upgrades Add/Remove
  const addUpgrade = () => {
    if (!upTitle) return;
    setUpgrades(prev => [...prev, { id: `up-${Date.now()}`, title: upTitle, price: Number(upPrice) }]);
    setUpTitle('');
    setUpPrice(95);
  };

  const removeUpgrade = (id: string) => {
    setUpgrades(prev => prev.filter(u => u.id !== id));
  };

  // Highlights / Features / FAQs Add/Remove
  const addHighlight = () => {
    if (!newHighlight) return;
    setHighlights(prev => [...prev, newHighlight]);
    setNewHighlight('');
  };

  const addFeature = () => {
    if (!newFeature) return;
    setFeatures(prev => [...prev, newFeature]);
    setNewFeature('');
  };

  const addFaq = () => {
    if (!faqQ || !faqA) return;
    setFaqs(prev => [...prev, { q: faqQ, a: faqA }]);
    setFaqQ('');
    setFaqA('');
  };

  return (
    <div className="flex min-h-screen bg-bg-muted select-none">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl uppercase tracking-tight text-text-primary">
              Product & Catalog Manager ({products.length})
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Complete UI product creator & manager. Edit titles, colors, variants, gallery images, specifications & upgrades.
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
              onClick={openNewForm}
              className="px-5 py-2.5 rounded-pill bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus size={16} />
              <span>Upload New Product</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-card border border-border shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fixtures by title or category..."
              className="w-full pl-9 pr-4 py-2 rounded-pill bg-bg-muted border border-border text-xs text-text-primary focus:outline-none focus:border-zinc-950"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none text-xs font-bold">
            {['All', 'Architectural', 'Pendant', 'Wall Sconces', 'Table & Desk', 'Outdoor IP65'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-pill uppercase tracking-wider text-[10px] whitespace-nowrap transition-colors ${
                  selectedCategory === cat ? 'bg-zinc-950 text-white' : 'bg-bg-muted border border-border text-text-secondary hover:text-zinc-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid Table */}
        <div className="bg-white rounded-card border border-border shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-text-primary">
            <thead className="bg-zinc-950 text-white uppercase font-display font-bold text-[11px] tracking-wider">
              <tr>
                <th className="p-4">Fixture & Images</th>
                <th className="p-4">Category</th>
                <th className="p-4">Variants</th>
                <th className="p-4">Price / MRP</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-text-secondary">
                    No matching lighting fixtures found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-bg-muted/50 transition-colors">
                    {/* Fixture & Images */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-card overflow-hidden bg-bg-muted border border-border shrink-0">
                        <Image src={p.primaryImage} alt={p.title} fill className="object-cover" />
                        {p.badge && (
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-zinc-950 text-white text-[8px] font-bold uppercase rounded">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-text-primary leading-tight line-clamp-1">{p.title}</h4>
                        <span className="text-[10px] text-text-secondary block mt-0.5">{p.subtitle || `${p.category} Luminaire`}</span>
                        <span className="text-[9px] font-mono text-zinc-400">ID: {p.id}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-pill bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">
                        {p.category}
                      </span>
                    </td>

                    {/* Color Variants Swatches */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        {p.variants && p.variants.length > 0 ? (
                          p.variants.map((v, i) => (
                            <span
                              key={i}
                              className="w-4 h-4 rounded-full border border-border shadow-xs inline-block"
                              style={{ backgroundColor: v.colorHex }}
                              title={v.name}
                            />
                          ))
                        ) : (
                          <span className="text-zinc-400 text-[10px]">1 Finish</span>
                        )}
                        <span className="text-[10px] text-text-secondary ml-1 font-mono">({p.variants?.length || 1})</span>
                      </div>
                    </td>

                    {/* Price / MRP */}
                    <td className="p-4 font-mono">
                      <span className="font-bold text-sm text-text-primary">₹{p.price.toLocaleString()}</span>
                      {p.originalPrice && (
                        <span className="text-[11px] text-text-secondary line-through block text-zinc-400">₹{p.originalPrice.toLocaleString()}</span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-pill text-[10px] font-bold uppercase ${
                        p.inStock && p.stockCount > 0 ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                      }`}>
                        {p.inStock && p.stockCount > 0 ? `${p.stockCount} In Stock` : 'Out of Stock'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setPreviewProduct(p);
                            setIsPreviewOpen(true);
                          }}
                          className="p-2 rounded-full hover:bg-zinc-200 text-zinc-700 transition-colors"
                          title="Preview Product"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          onClick={() => openEditForm(p)}
                          className="p-2 rounded-full hover:bg-zinc-200 text-zinc-900 transition-colors"
                          title="Edit All Details"
                        >
                          <Edit3 size={15} />
                        </button>

                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-2 rounded-full hover:bg-amber-100 text-amber-800 transition-colors"
                          title="Duplicate Fixture"
                        >
                          <Copy size={15} />
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FULL PRODUCT UPLOAD & EDIT DRAWER / MODAL */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => {
                setIsFormOpen(false);
                setEditingProduct(null);
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            />

            <div className="relative w-full max-w-4xl bg-white rounded-card shadow-2xl z-10 border border-border flex flex-col max-h-[92vh] overflow-hidden">
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between p-5 bg-zinc-950 text-white border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-amber-400 text-zinc-950 font-bold">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg uppercase tracking-tight">
                      {editingProduct ? `Edit Fixture: ${editingProduct.title}` : 'Upload New Lighting Fixture'}
                    </h3>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                      Full Product Specifications Editor
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingProduct(null);
                  }}
                  className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Tabs Bar */}
              <div className="flex items-center gap-2 p-3 bg-zinc-100 border-b border-border overflow-x-auto text-xs font-bold">
                {[
                  { id: 'basic', label: '1. Basic Info & Pricing', icon: Info },
                  { id: 'images', label: '2. Images & Gallery', icon: ImageIcon },
                  { id: 'variants', label: '3. Colors & Finishes', icon: Palette },
                  { id: 'specs', label: '4. Specs & Upgrades', icon: Sliders },
                  { id: 'features', label: '5. Highlights & FAQs', icon: FileText }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-pill uppercase tracking-wider text-[11px] transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-zinc-950 text-white shadow-md'
                          : 'bg-white text-text-secondary hover:text-zinc-950 border border-border'
                      }`}
                    >
                      <Icon size={14} className={isActive ? 'text-amber-400' : ''} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Form Content Area */}
              <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                {/* TAB 1: BASIC INFO & PRICING */}
                {activeTab === 'basic' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-text-primary uppercase block mb-1">
                          Product Name / Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g. Aurora Teardrop Glass Pendant"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-text-primary uppercase block mb-1">
                          Subtitle / Model Number
                        </label>
                        <input
                          type="text"
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          placeholder="e.g. Hand-blown Amber Glass — Model #24323"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="font-bold text-text-primary uppercase block mb-1">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as Product['category'])}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none bg-white"
                        >
                          <option value="Architectural">Architectural</option>
                          <option value="Pendant">Pendant & Chandelier</option>
                          <option value="Wall Sconces">Wall Sconces</option>
                          <option value="Table & Desk">Table & Desk</option>
                          <option value="Outdoor IP65">Outdoor IP65</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-text-primary uppercase block mb-1">Product Badge</label>
                        <select
                          value={badge}
                          onChange={(e) => setBadge(e.target.value as Product['badge'])}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm text-text-primary focus:outline-none bg-white"
                        >
                          <option value="New">New Arrival</option>
                          <option value="Best Seller">Best Seller</option>
                          <option value="Sale">On Sale</option>
                          <option value="Limited Edition">Limited Edition</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-text-primary uppercase block mb-1">URL Slug</label>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          placeholder="auto-generated-slug"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-border text-xs font-mono text-text-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-card bg-bg-muted border border-border">
                      <div>
                        <label className="font-bold text-text-primary uppercase block mb-1">Sale Price (₹) *</label>
                        <input
                          type="number"
                          required
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm font-mono font-bold"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-text-primary uppercase block mb-1">Original Price (₹)</label>
                        <input
                          type="number"
                          value={originalPrice}
                          onChange={(e) => setOriginalPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm font-mono"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-text-primary uppercase block mb-1">Stock Quantity</label>
                        <input
                          type="number"
                          value={stockCount}
                          onChange={(e) => setStockCount(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm font-mono font-bold"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <label className="font-bold text-text-primary uppercase block mb-1">Stock Status</label>
                        <label className="flex items-center gap-2 cursor-pointer mt-1">
                          <input
                            type="checkbox"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                            className="w-4 h-4 rounded text-zinc-950 focus:ring-amber-400 cursor-pointer"
                          />
                          <span className="text-xs font-bold uppercase">{inStock ? 'In Stock' : 'Out of Stock'}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: IMAGES & GALLERY */}
                {activeTab === 'images' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Primary Image */}
                      <div className="p-4 rounded-card bg-bg-muted border border-border space-y-3">
                        <label className="font-bold text-text-primary uppercase block">Primary Main Display Image</label>
                        <input
                          type="url"
                          required
                          value={primaryImage}
                          onChange={(e) => setPrimaryImage(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none bg-white"
                        />
                        <div className="relative w-full h-44 rounded-lg overflow-hidden bg-white border border-border">
                          <Image src={primaryImage || DEFAULT_PRIMARY_IMAGE} alt="Primary Preview" fill className="object-cover" />
                        </div>
                      </div>

                      {/* Secondary Image */}
                      <div className="p-4 rounded-card bg-bg-muted border border-border space-y-3">
                        <label className="font-bold text-text-primary uppercase block">Secondary Hover Image</label>
                        <input
                          type="url"
                          value={secondaryImage}
                          onChange={(e) => setSecondaryImage(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none bg-white"
                        />
                        <div className="relative w-full h-44 rounded-lg overflow-hidden bg-white border border-border">
                          <Image src={secondaryImage || primaryImage || DEFAULT_PRIMARY_IMAGE} alt="Secondary Preview" fill className="object-cover" />
                        </div>
                      </div>
                    </div>

                    {/* Multi-Image Gallery */}
                    <div className="p-4 rounded-card border border-border space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold uppercase text-sm text-text-primary">
                          Product Image Gallery ({gallery.length})
                        </h4>
                        <span className="text-[10px] text-text-secondary">Shown on PDP image carousel</span>
                      </div>

                      {/* Add Gallery URL Input */}
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={newGalleryInput}
                          onChange={(e) => setNewGalleryInput(e.target.value)}
                          placeholder="Paste additional product image URL (https://...)"
                          className="flex-1 px-3 py-2 rounded-pill border border-border text-xs focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addGalleryImage}
                          className="px-4 py-2 rounded-pill bg-zinc-950 text-white font-bold text-xs hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center gap-1"
                        >
                          <Plus size={14} /> Add Image
                        </button>
                      </div>

                      {/* Gallery Thumbnails List */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                        {gallery.map((url, idx) => (
                          <div key={idx} className="relative group rounded-card overflow-hidden bg-bg-muted border border-border h-28">
                            <Image src={url} alt={`Gallery ${idx}`} fill className="object-cover" />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(idx)}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete Image"
                            >
                              <Trash2 size={13} />
                            </button>
                            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[8px] font-mono">
                              #{idx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: COLORS & FINISH VARIANTS */}
                {activeTab === 'variants' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="p-4 rounded-card bg-bg-muted border border-border space-y-4">
                      <h4 className="font-display font-bold uppercase text-sm text-text-primary">
                        Add New Color / Finish Variant
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="font-bold text-text-primary block mb-1">Finish Name</label>
                          <input
                            type="text"
                            value={vName}
                            onChange={(e) => setVName(e.target.value)}
                            placeholder="e.g. Warm Amber Glass / Graphite Grey"
                            className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-text-primary block mb-1">Hex Color Code</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={vColor}
                              onChange={(e) => setVColor(e.target.value)}
                              className="w-9 h-9 rounded cursor-pointer border border-border p-0"
                            />
                            <input
                              type="text"
                              value={vColor}
                              onChange={(e) => setVColor(e.target.value)}
                              placeholder="#d97706"
                              className="flex-1 px-3 py-2 rounded-lg border border-border text-xs font-mono uppercase bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-text-primary block mb-1">Variant Image URL (Optional)</label>
                          <input
                            type="url"
                            value={vImage}
                            onChange={(e) => setVImage(e.target.value)}
                            placeholder="https://..."
                            className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={addVariant}
                        className="px-4 py-2 rounded-pill bg-zinc-950 text-white font-bold text-xs hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center gap-1"
                      >
                        <Plus size={14} /> Save Finish Variant
                      </button>
                    </div>

                    {/* Active Variants List */}
                    <div className="space-y-3">
                      <h4 className="font-display font-bold uppercase text-sm text-text-primary">
                        Configured Color Finishes ({variants.length})
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {variants.map((v) => (
                          <div key={v.id} className="p-3 rounded-card bg-white border border-border flex items-center justify-between gap-3 shadow-xs">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full border border-border shrink-0 shadow-xs" style={{ backgroundColor: v.colorHex }} />
                              <div>
                                <h5 className="font-bold text-xs text-text-primary">{v.name}</h5>
                                <span className="text-[10px] font-mono text-text-secondary uppercase">{v.colorHex}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeVariant(v.id)}
                              className="p-1.5 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: SPECS & UPGRADES */}
                {activeTab === 'specs' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Technical Specs */}
                    <div className="p-4 rounded-card bg-bg-muted border border-border space-y-4">
                      <h4 className="font-display font-bold uppercase text-sm text-text-primary">
                        Add Technical Specification
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="font-bold block mb-1">Spec Icon</label>
                          <select
                            value={specIcon}
                            onChange={(e) => setSpecIcon(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                          >
                            <option value="Zap">Zap (Power / Voltage)</option>
                            <option value="ShieldCheck">ShieldCheck (IP Rating)</option>
                            <option value="Palette">Palette (Color Rendering CRI)</option>
                            <option value="Ruler">Ruler (Dimensions)</option>
                            <option value="Sun">Sun (CCT Color Temp)</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold block mb-1">Spec Label</label>
                          <input
                            type="text"
                            value={specLabel}
                            onChange={(e) => setSpecLabel(e.target.value)}
                            placeholder="e.g. Voltage & Power"
                            className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                          />
                        </div>

                        <div>
                          <label className="font-bold block mb-1">Spec Value</label>
                          <input
                            type="text"
                            value={specValue}
                            onChange={(e) => setSpecValue(e.target.value)}
                            placeholder="e.g. 220-240V AC / IP54 Waterproof"
                            className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={addSpec}
                        className="px-4 py-2 rounded-pill bg-zinc-950 text-white font-bold text-xs hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Technical Spec
                      </button>

                      {/* Specs List */}
                      <div className="space-y-2 pt-2">
                        {specs.map((s, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-white border border-border flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-amber-700">{s.label}:</span>
                              <span>{s.value}</span>
                            </div>
                            <button type="button" onClick={() => removeSpec(idx)} className="text-rose-600 hover:underline text-[10px]">
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upgrades Add-ons */}
                    <div className="p-4 rounded-card bg-bg-muted border border-border space-y-4">
                      <h4 className="font-display font-bold uppercase text-sm text-text-primary">
                        Add-on Accessories & Hardware Upgrades
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-bold block mb-1">Upgrade Title</label>
                          <input
                            type="text"
                            value={upTitle}
                            onChange={(e) => setUpTitle(e.target.value)}
                            placeholder="e.g. Architectural Mounting Hardware Kit"
                            className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white"
                          />
                        </div>

                        <div>
                          <label className="font-bold block mb-1">Upgrade Price (₹)</label>
                          <input
                            type="number"
                            value={upPrice}
                            onChange={(e) => setUpPrice(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-border text-xs bg-white font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={addUpgrade}
                        className="px-4 py-2 rounded-pill bg-zinc-950 text-white font-bold text-xs hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Upgrade Option
                      </button>

                      {/* Upgrades List */}
                      <div className="space-y-2 pt-2">
                        {upgrades.map((u) => (
                          <div key={u.id} className="p-3 rounded-lg bg-white border border-border flex items-center justify-between text-xs">
                            <span>{u.title}</span>
                            <div className="flex items-center gap-3 font-mono font-bold">
                              <span>+₹{u.price}</span>
                              <button type="button" onClick={() => removeUpgrade(u.id)} className="text-rose-600 hover:underline text-[10px] font-sans">
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: HIGHLIGHTS, FEATURES & FAQS */}
                {activeTab === 'features' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Full Description Textarea */}
                    <div>
                      <label className="font-bold text-text-primary uppercase block mb-1">Full Detailed Product Description</label>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detailed technical & aesthetic copy displayed on PDP..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border text-xs text-text-primary focus:outline-none"
                      />
                    </div>

                    {/* Highlights */}
                    <div className="p-4 rounded-card bg-bg-muted border border-border space-y-3">
                      <label className="font-bold text-text-primary uppercase block">Key Product Highlights (Bullet points)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newHighlight}
                          onChange={(e) => setNewHighlight(e.target.value)}
                          placeholder="e.g. 5-Year Warranty included as standard."
                          className="flex-1 px-3 py-2 rounded-lg border border-border text-xs bg-white"
                        />
                        <button type="button" onClick={addHighlight} className="px-4 py-2 rounded-pill bg-zinc-950 text-white font-bold text-xs">
                          Add Highlight
                        </button>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-text-secondary text-xs">
                        {highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>

                    {/* FAQs Accordion Pairs */}
                    <div className="p-4 rounded-card bg-bg-muted border border-border space-y-3">
                      <label className="font-bold text-text-primary uppercase block">Product FAQs</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={faqQ}
                          onChange={(e) => setFaqQ(e.target.value)}
                          placeholder="Question e.g. Is hardware included?"
                          className="px-3 py-2 rounded-lg border border-border text-xs bg-white"
                        />
                        <input
                          type="text"
                          value={faqA}
                          onChange={(e) => setFaqA(e.target.value)}
                          placeholder="Answer e.g. Yes, full mounting screws included."
                          className="px-3 py-2 rounded-lg border border-border text-xs bg-white"
                        />
                      </div>
                      <button type="button" onClick={addFaq} className="px-4 py-2 rounded-pill bg-zinc-950 text-white font-bold text-xs">
                        Add FAQ Pair
                      </button>

                      <div className="space-y-2 pt-2">
                        {faqs.map((f, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white border border-border text-xs space-y-1">
                            <span className="font-bold block text-text-primary">Q: {f.q}</span>
                            <span className="text-text-secondary block">A: {f.a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Bottom Actions Bar */}
                <div className="pt-4 border-t border-border flex items-center justify-between sticky bottom-0 bg-white p-2">
                  <div className="text-xs text-text-secondary font-mono">
                    {editingProduct ? `Editing ID: ${editingProduct.id}` : 'Drafting New Product'}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsFormOpen(false);
                        setEditingProduct(null);
                      }}
                      className="px-5 py-2.5 rounded-pill border border-border font-bold hover:bg-bg-muted transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-7 py-2.5 rounded-pill bg-zinc-950 text-white font-extrabold uppercase tracking-wider hover:bg-amber-500 hover:text-zinc-950 transition-colors shadow-lg"
                    >
                      {editingProduct ? 'Save Product Changes' : 'Publish Product to Store'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* LIVE PRODUCT PREVIEW MODAL */}
        {isPreviewOpen && previewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setIsPreviewOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-xs" />
            <div className="relative w-full max-w-3xl bg-white rounded-card shadow-2xl z-10 border border-border p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-4 border-b border-border mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold">PDP Live Preview</span>
                  <h3 className="font-display font-bold text-xl text-text-primary">{previewProduct.title}</h3>
                </div>
                <button onClick={() => setIsPreviewOpen(false)} className="p-1.5 rounded-full hover:bg-zinc-100">
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative w-full h-64 rounded-card overflow-hidden bg-bg-muted border border-border">
                  <Image src={previewProduct.primaryImage} alt={previewProduct.title} fill className="object-cover" />
                </div>
                <div className="space-y-3">
                  <span className="px-2.5 py-1 rounded-pill bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">
                    {previewProduct.category}
                  </span>
                  <h4 className="font-display font-extrabold text-xl text-text-primary">{previewProduct.title}</h4>
                  <p className="text-xs text-text-secondary">{previewProduct.subtitle}</p>
                  <div className="font-mono font-bold text-lg text-zinc-950">₹{previewProduct.price.toLocaleString()}</div>
                  <p className="text-xs text-text-secondary leading-relaxed">{previewProduct.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
