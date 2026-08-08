'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = query.trim() === '' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-start">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-fade-in"
      />

      <div className="relative w-full max-w-4xl mx-auto mt-12 px-4 z-10">
        <div className="bg-white rounded-card shadow-2xl border border-border overflow-hidden animate-slide-up">
          {/* Search Header Bar */}
          <div className="p-4 sm:p-6 border-b border-border flex items-center gap-3 bg-zinc-950 text-white">
            <Search size={22} className="text-amber-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by fixture name, category (Pendant, Sconce, Architectural)..."
              autoFocus
              className="flex-1 bg-transparent text-white text-base sm:text-lg focus:outline-none placeholder-zinc-500 font-sans"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-zinc-400 hover:text-white">
                <X size={16} />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Popular Search Tags */}
          <div className="p-4 bg-bg-muted border-b border-border flex flex-wrap items-center gap-2 text-xs">
            <span className="text-text-secondary font-medium">Popular:</span>
            {['Aura Arc', 'Pendant', 'Wall Sconce', 'Smart Chandelier', 'Table Lamp', 'IP65 Outdoor'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 rounded-pill bg-white border border-border hover:border-zinc-950 hover:bg-zinc-950 hover:text-white transition-all text-text-primary"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 text-xs uppercase tracking-wider text-text-secondary font-bold">
              <span>{results.length} Products Found</span>
              {query && <span>Filter: &quot;{query}&quot;</span>}
            </div>

            {results.length === 0 ? (
              <div className="py-12 text-center text-text-secondary">
                <p className="font-display font-bold text-lg text-text-primary">No matching fixtures found</p>
                <p className="text-xs mt-1">Try searching for &quot;Pendant&quot;, &quot;Sconce&quot;, or &quot;Aura&quot;.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="group border border-border rounded-card p-3 hover:border-zinc-950 transition-all bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-4/3 rounded-md overflow-hidden bg-bg-muted mb-3">
                        <Image
                          src={product.primaryImage}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                        {product.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-text-primary group-hover:text-amber-600 transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-xs text-text-secondary font-mono mt-1 font-bold">
                        ${product.price}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <button
                        onClick={() => {
                          setIsSearchOpen(false);
                          setQuickViewProduct(product);
                        }}
                        className="text-xs font-semibold text-text-secondary hover:text-zinc-950 flex items-center gap-1"
                      >
                        Quick View
                      </button>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="w-7 h-7 rounded-full bg-zinc-950 text-white flex items-center justify-center group-hover:bg-amber-500 transition-colors"
                      >
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
