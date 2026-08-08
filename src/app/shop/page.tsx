'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Eye,
  SlidersHorizontal,
  Search,
  Grid3X3,
  LayoutGrid,
  List,
  X,
  Sparkles,
  Heart,
  RotateCcw,
  Check
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';
import { RatingStars } from '../../components/ui/RatingStars';
import { WarmUnderline } from '../../components/ui/WarmUnderline';

const CATEGORIES = [
  { label: 'All Fixtures', value: 'All' },
  { label: 'Architectural', value: 'Architectural' },
  { label: 'Pendant & Clusters', value: 'Pendant' },
  { label: 'Wall Sconces', value: 'Wall Sconces' },
  { label: 'Table & Desk', value: 'Table & Desk' },
  { label: 'Outdoor IP65', value: 'Outdoor IP65' }
];

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹15,000', min: 5000, max: 15000 },
  { label: 'Over ₹15,000', min: 15000, max: Infinity }
];

const FINISHES = [
  { name: 'All Finishes', colorHex: 'transparent' },
  { name: 'Warm Gold', colorHex: '#D4AF37' },
  { name: 'Matte Black', colorHex: '#18181B' },
  { name: 'Smoked Amber', colorHex: '#B45309' },
  { name: 'Anodized Silver', colorHex: '#94A3B8' }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState('All Finishes');
  const [selectedBadge, setSelectedBadge] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { addToCart, setQuickViewProduct } = useCart();
  const { products: adminProducts, wishlist, toggleWishlist } = useAdmin();

  // Active products source memoization
  const activeProducts = useMemo(() => {
    return adminProducts && adminProducts.length > 0 ? adminProducts : PRODUCTS;
  }, [adminProducts]);

  // Memoized Filtered & Sorted List
  const filteredProducts = useMemo(() => {
    let list = activeProducts.filter((p) => {
      // Category Match
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;

      // Search Match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query);

      // Price Match
      const priceRange = PRICE_RANGES[selectedPriceRange];
      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;

      // Finish Match
      const matchesFinish =
        selectedFinish === 'All Finishes' ||
        p.variants.some((v) => v.name.toLowerCase().includes(selectedFinish.toLowerCase())) ||
        p.title.toLowerCase().includes(selectedFinish.toLowerCase());

      // Badge Match
      const matchesBadge = selectedBadge === 'All' || p.badge === selectedBadge;

      return matchesCat && matchesSearch && matchesPrice && matchesFinish && matchesBadge;
    });

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeProducts, selectedCategory, searchQuery, selectedPriceRange, selectedFinish, selectedBadge, sortBy]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (selectedPriceRange !== 0) count++;
    if (selectedFinish !== 'All Finishes') count++;
    if (selectedBadge !== 'All') count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [selectedCategory, selectedPriceRange, selectedFinish, selectedBadge, searchQuery]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange(0);
    setSelectedFinish('All Finishes');
    setSelectedBadge('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-white min-h-screen">
      {/* Architectural Ambient Hero Header */}
      <div className="bg-zinc-950 text-white py-12 sm:py-16 border-b border-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur-md mb-3">
            <Sparkles size={14} className="text-amber-400" /> Architectural Lighting Catalog
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-6xl uppercase tracking-tighter leading-tight">
            Museum-Grade <WarmUnderline>Luminaires & Arcs</WarmUnderline>
          </h1>
          <p className="text-xs sm:text-base text-zinc-400 mt-2 max-w-2xl mx-auto font-normal">
            Precision-engineered step lights, mouth-blown crystal chandeliers, and IP65 architectural sconces.
          </p>

          {/* Quick Metrics Strip */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-center gap-8 text-xs text-zinc-400">
            <div>
              <span className="font-mono font-bold text-lg text-white block">{activeProducts.length}</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">Catalog Fixtures</span>
            </div>
            <div className="h-6 w-[1px] bg-zinc-800" />
            <div>
              <span className="font-mono font-bold text-lg text-white block">CRI 98+</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">True Spectrum Optics</span>
            </div>
            <div className="h-6 w-[1px] bg-zinc-800" />
            <div>
              <span className="font-mono font-bold text-lg text-white block">IP65</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">Weather Sealed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-amber-600" />
                <h3 className="font-display font-bold text-xs uppercase tracking-widest text-text-primary">
                  Filter Collection
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw size={12} /> Reset ({activeFiltersCount})
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Categories</h4>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const count =
                    cat.value === 'All'
                      ? activeProducts.length
                      : activeProducts.filter((p) => p.category === cat.value).length;
                  const isSelected = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-zinc-950 text-white shadow-sm'
                          : 'text-text-secondary hover:bg-bg-muted hover:text-text-primary'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-amber-300' : 'text-zinc-400'}`}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Price Threshold</h4>
              <div className="space-y-1">
                {PRICE_RANGES.map((price, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPriceRange(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      selectedPriceRange === idx
                        ? 'bg-zinc-950 text-white font-bold'
                        : 'text-text-secondary hover:bg-bg-muted hover:text-text-primary'
                    }`}
                  >
                    <span>{price.label}</span>
                    {selectedPriceRange === idx && <Check size={14} className="text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish & Material Filter */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Finish & Material</h4>
              <div className="space-y-1.5">
                {FINISHES.map((finish) => {
                  const isSelected = selectedFinish === finish.name;
                  return (
                    <button
                      key={finish.name}
                      onClick={() => setSelectedFinish(finish.name)}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-zinc-950 text-white font-bold'
                          : 'text-text-secondary hover:bg-bg-muted hover:text-text-primary'
                      }`}
                    >
                      {finish.colorHex !== 'transparent' && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: finish.colorHex }}
                        />
                      )}
                      <span className="truncate">{finish.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Badges Filter */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Special Tags</h4>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Best Seller', 'Architectural', 'IP65 Waterproof', 'Recessed Step'].map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setSelectedBadge(badge)}
                    className={`px-2.5 py-1 rounded-pill text-[10px] font-bold uppercase tracking-wider transition-all ${
                      selectedBadge === badge
                        ? 'bg-amber-400 text-zinc-950 shadow-xs'
                        : 'bg-bg-muted text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Catalog Content */}
          <main className="flex-1 w-full space-y-6">
            {/* Control Bar: Search, Mobile Filter Trigger, Sort, View Modes */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-card bg-bg-muted border border-border">
              {/* Search Field */}
              <div className="relative w-full sm:w-72">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fixtures, SKU, finishes..."
                  className="w-full pl-9 pr-8 py-2 rounded-pill border border-border bg-white text-xs text-text-primary focus:outline-none focus:border-zinc-950 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-950"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Action Cluster: Mobile Filter Button, Sort Dropdown, View Toggles */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-pill bg-white border border-border text-xs font-bold text-text-primary"
                >
                  <SlidersHorizontal size={14} />
                  <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>

                {/* Sort Selector */}
                <div className="flex items-center gap-1.5 text-xs">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-border text-text-primary rounded-pill px-3 py-2 focus:outline-none cursor-pointer font-bold text-xs shadow-xs"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Grid View Mode Toggles */}
                <div className="hidden sm:flex items-center gap-1 p-1 bg-white border border-border rounded-pill">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-full transition-colors ${
                      viewMode === 'grid' ? 'bg-zinc-950 text-white' : 'text-zinc-400 hover:text-zinc-950'
                    }`}
                    title="Grid View (3 Columns)"
                  >
                    <Grid3X3 size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-1.5 rounded-full transition-colors ${
                      viewMode === 'compact' ? 'bg-zinc-950 text-white' : 'text-zinc-400 hover:text-zinc-950'
                    }`}
                    title="Compact Grid (4 Columns)"
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-full transition-colors ${
                      viewMode === 'list' ? 'bg-zinc-950 text-white' : 'text-zinc-400 hover:text-zinc-950'
                    }`}
                    title="List View"
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Badges */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-zinc-950 text-white text-[10px] font-bold">
                    Cat: {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')}><X size={12} /></button>
                  </span>
                )}
                {selectedPriceRange !== 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-zinc-950 text-white text-[10px] font-bold">
                    Price: {PRICE_RANGES[selectedPriceRange].label}
                    <button onClick={() => setSelectedPriceRange(0)}><X size={12} /></button>
                  </span>
                )}
                {selectedFinish !== 'All Finishes' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-zinc-950 text-white text-[10px] font-bold">
                    Finish: {selectedFinish}
                    <button onClick={() => setSelectedFinish('All Finishes')}><X size={12} /></button>
                  </span>
                )}
                {selectedBadge !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-zinc-950 text-white text-[10px] font-bold">
                    Tag: {selectedBadge}
                    <button onClick={() => setSelectedBadge('All')}><X size={12} /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-zinc-950 text-white text-[10px] font-bold">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-[10px] font-bold text-amber-700 underline hover:text-amber-800 ml-1"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results Count Header */}
            <div className="flex items-center justify-between text-xs text-text-secondary font-medium">
              <span>Showing <strong className="text-text-primary">{filteredProducts.length}</strong> architectural luminaires</span>
              <span className="text-[11px] text-zinc-400">Guaranteed 5-Year Electronics Warranty</span>
            </div>

            {/* Empty Results State */}
            {filteredProducts.length === 0 && (
              <div className="py-16 text-center rounded-card border border-dashed border-border p-8 bg-bg-muted">
                <Sparkles size={32} className="mx-auto text-amber-500 mb-3" />
                <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-tight">
                  No Luminaires Match Your Criteria
                </h3>
                <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">
                  Try clearing your search query or selecting a different finish threshold.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-4 px-5 py-2.5 rounded-pill bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-400 hover:text-zinc-950 transition-colors"
                >
                  Reset Catalog Filters
                </button>
              </div>
            )}

            {/* Catalog Grid Output */}
            {viewMode === 'list' ? (
              /* Minimalist List View */
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const imgSrc = product.primaryImage || product.gallery[0] || 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png';
                  const inWishlist = wishlist.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group rounded-card border border-border bg-white p-4 flex flex-col sm:flex-row items-center gap-6 hover:border-zinc-950 transition-all shadow-xs"
                    >
                      <div className="relative w-full sm:w-44 h-40 rounded-md overflow-hidden bg-bg-muted shrink-0">
                        <Image
                          src={imgSrc}
                          alt={product.title}
                          fill
                          sizes="180px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-zinc-950 text-white rounded-pill text-[9px] font-bold uppercase">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 space-y-2 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                            {product.category}
                          </span>
                          <span className="text-zinc-300">•</span>
                          <RatingStars rating={product.rating} showText={true} />
                        </div>

                        <Link href={`/product/${product.slug}`}>
                          <h3 className="font-display font-bold text-base sm:text-lg text-text-primary group-hover:text-amber-600 transition-colors">
                            {product.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-text-secondary line-clamp-2">{product.subtitle}</p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-text-primary pt-1">
                          <span className="text-base text-zinc-950">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-zinc-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                          <div className="flex items-center gap-1.5 text-[10px] font-sans font-medium text-text-secondary">
                            <span>{product.specs[0]?.value}</span>
                            <span>•</span>
                            <span>{product.specs[1]?.value}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 sm:w-36 py-2.5 rounded-pill bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <ShoppingBag size={14} /> Add to Cart
                        </button>
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="px-3 py-2.5 rounded-pill border border-border text-xs font-bold text-text-primary hover:bg-bg-muted transition-colors flex items-center justify-center gap-1"
                        >
                          <Eye size={14} /> Quick View
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Grid / Compact View */
              <div
                className={`grid gap-4 sm:gap-6 ${
                  viewMode === 'compact' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => {
                  const imgSrc = product.primaryImage || product.gallery[0] || 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png';
                  const inWishlist = wishlist.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group rounded-card border border-border bg-white hover:border-zinc-950 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl"
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="relative w-full h-48 sm:h-64 overflow-hidden bg-bg-muted border-b border-border">
                          <Image
                            src={imgSrc}
                            alt={product.title}
                            fill
                            sizes={viewMode === 'compact' ? '(max-width: 640px) 50vw, 25vw' : '(max-width: 640px) 50vw, 33vw'}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Badge Tag */}
                          {product.badge && (
                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-zinc-950 text-white rounded-pill text-[9px] sm:text-[10px] font-bold uppercase tracking-wider z-10 shadow-xs">
                              {product.badge}
                            </span>
                          )}

                          {/* Wishlist Button */}
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-all z-10 ${
                              inWishlist
                                ? 'bg-red-500 text-white'
                                : 'bg-white/80 text-zinc-950 hover:bg-white'
                            }`}
                            title="Add to Wishlist"
                          >
                            <Heart size={14} fill={inWishlist ? 'currentColor' : 'none'} />
                          </button>

                          {/* Quick Add / Quick View Hover Bar */}
                          <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 flex gap-1.5 z-10">
                            <button
                              onClick={() => addToCart(product)}
                              className="flex-1 py-2 sm:py-2.5 rounded-pill bg-zinc-950 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-1 shadow-lg"
                            >
                              <ShoppingBag size={13} /> <span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span>
                            </button>
                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className="p-2 sm:p-2.5 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 transition-colors shadow-lg"
                              title="Quick View"
                            >
                              <Eye size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-3 sm:p-5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-700">
                              {product.category}
                            </span>
                            <RatingStars rating={product.rating} showText={false} />
                          </div>

                          <Link href={`/product/${product.slug}`}>
                            <h3 className="font-display font-bold text-xs sm:text-base text-text-primary group-hover:text-amber-600 transition-colors line-clamp-1 sm:line-clamp-2">
                              {product.title}
                            </h3>
                          </Link>
                          <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1 hidden sm:block">{product.subtitle}</p>

                          <div className="flex items-center justify-between mt-3 sm:mt-4">
                            <div className="flex items-baseline gap-1.5 sm:gap-2 font-mono font-bold">
                              <span className="text-xs sm:text-base text-text-primary">₹{product.price.toLocaleString()}</span>
                              {product.originalPrice && (
                                <span className="text-[10px] sm:text-xs text-text-secondary line-through hidden sm:inline">₹{product.originalPrice.toLocaleString()}</span>
                              )}
                            </div>

                            {/* Color Swatch Dots */}
                            <div className="hidden sm:flex items-center gap-1">
                              {product.variants.map((v) => (
                                <span
                                  key={v.id}
                                  className="w-3 h-3 rounded-full border border-black/20"
                                  style={{ backgroundColor: v.colorHex }}
                                  title={v.name}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Specs Bottom Bar */}
                      <div className="px-3 py-2 sm:px-5 sm:py-2.5 bg-bg-muted border-t border-border flex items-center justify-between text-[9px] sm:text-[11px] text-text-secondary font-medium">
                        <span>{product.specs[0]?.value}</span>
                        <span className="text-zinc-400">•</span>
                        <span>{product.specs[1]?.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-zinc-950/70 backdrop-blur-xs animate-fade-in lg:hidden">
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h3 className="font-display font-bold text-base uppercase tracking-wider text-text-primary">
                  Filter Catalog
                </h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-zinc-500 hover:text-zinc-950">
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Categories</h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs font-bold ${
                        selectedCategory === cat.value ? 'bg-zinc-950 text-white' : 'text-text-secondary'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Threshold */}
              <div className="space-y-2 pt-4 border-t border-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Price Threshold</h4>
                <div className="space-y-1">
                  {PRICE_RANGES.map((price, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedPriceRange(idx);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium ${
                        selectedPriceRange === idx ? 'bg-zinc-950 text-white font-bold' : 'text-text-secondary'
                      }`}
                    >
                      {price.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border space-y-2">
              <button
                onClick={() => {
                  resetAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2.5 rounded-pill border border-border text-xs font-bold text-text-primary"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-pill bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
