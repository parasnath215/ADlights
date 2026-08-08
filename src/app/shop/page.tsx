'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, SlidersHorizontal, Search } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';
import { RatingStars } from '../../components/ui/RatingStars';
import { WarmUnderline } from '../../components/ui/WarmUnderline';

const CATEGORIES = ['All', 'Architectural', 'Pendant', 'Wall Sconces', 'Table & Desk', 'Outdoor IP65'];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, setQuickViewProduct } = useCart();
  const { products: adminProducts } = useAdmin();

  const activeProducts = adminProducts && adminProducts.length > 0 ? adminProducts : PRODUCTS;

  let filtered = activeProducts.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-white min-h-screen">
      {/* Header */}
      <div className="bg-bg-muted py-8 sm:py-12 border-b border-border mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-text-secondary font-bold">
            Full Catalog
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-6xl uppercase tracking-tighter text-text-primary mt-1 leading-tight">
            Architectural <WarmUnderline>Lighting Collection</WarmUnderline>
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-2 max-w-xl mx-auto">
            Discover precision-engineered LED arcs, hand-blown amber pendants, and IP65 linear wall sconces.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 pb-6 sm:pb-8 border-b border-border mb-6 sm:mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-pill text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'bg-bg-muted text-text-secondary hover:text-text-primary hover:bg-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative flex-1 md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter collection..."
                className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 rounded-pill border border-border bg-bg-muted text-xs text-text-primary focus:outline-none focus:border-zinc-950"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <SlidersHorizontal size={14} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-bg-muted border border-border text-text-primary rounded-pill px-2.5 py-1.5 sm:px-3 sm:py-2 focus:outline-none cursor-pointer font-medium text-xs"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {filtered.map((product) => {
            const imgSrc = product.primaryImage || product.gallery[0] || 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png';
            return (
              <div
                key={product.id}
                className="group rounded-card border border-border bg-white hover:border-zinc-950 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl"
              >
                <div>
                  <div className="relative w-full h-44 sm:h-64 overflow-hidden bg-bg-muted border-b border-border">
                    <Image
                      src={imgSrc}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 bg-zinc-950 text-white rounded-pill text-[9px] sm:text-[10px] font-bold uppercase tracking-wider z-10">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 bg-white/90 backdrop-blur-xs rounded-pill border border-border shadow-xs z-10 hidden sm:block">
                      <RatingStars rating={product.rating} showText={false} />
                    </div>

                    <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 flex gap-1.5 z-10">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 py-2 sm:py-2.5 rounded-pill bg-zinc-950 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-1 shadow-lg"
                      >
                        <ShoppingBag size={12} /> <span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span>
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

                  <div className="p-3 sm:p-5">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                      {product.category}
                    </span>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-display font-bold text-xs sm:text-lg text-text-primary group-hover:text-amber-600 transition-colors mt-0.5 line-clamp-1 sm:line-clamp-2">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1 hidden sm:block">{product.subtitle}</p>

                    <div className="flex items-center justify-between mt-2.5 sm:mt-4">
                      <div className="flex items-baseline gap-1.5 sm:gap-2 font-mono font-bold">
                        <span className="text-xs sm:text-base text-text-primary">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] sm:text-xs text-text-secondary line-through hidden sm:inline">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>

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

                <div className="px-3 py-2 sm:px-5 sm:py-3 bg-bg-muted border-t border-border flex items-center justify-between text-[9px] sm:text-[11px] text-text-secondary font-medium">
                  <span>{product.specs[0]?.value}</span>
                  <span className="text-zinc-400">•</span>
                  <span>{product.specs[1]?.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
