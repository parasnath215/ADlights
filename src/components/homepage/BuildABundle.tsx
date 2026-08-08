'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Check, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { WarmUnderline } from '../ui/WarmUnderline';

export const BuildABundle: React.FC = () => {
  const bundleProducts = PRODUCTS.slice(0, 4); // First 4 products
  const [selectedIds, setSelectedIds] = useState<string[]>([bundleProducts[0].id, bundleProducts[1].id]);
  const { addToCart } = useCart();

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectedProducts = bundleProducts.filter(p => selectedIds.includes(p.id));
  const rawTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  // Discount rule: 2 items = 10% off, 3+ items = 15% off
  const discountRate = selectedProducts.length >= 3 ? 0.15 : selectedProducts.length >= 2 ? 0.10 : 0;
  const bundleDiscount = rawTotal * discountRate;
  const finalBundleTotal = rawTotal - bundleDiscount;

  const handleAddBundleToCart = () => {
    selectedProducts.forEach(p => addToCart(p));
  };

  return (
    <section className="py-24 bg-white border-b border-border select-none" id="build-bundle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
            Bundle & Save Up to 15%
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-text-primary mt-2">
            Build Your Custom <WarmUnderline>Lighting Suite</WarmUnderline>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-3 max-w-xl mx-auto">
            Select 2 or more fixtures to unlock tiered bundle discounts. Applied automatically at checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Products Selectable Cards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bundleProducts.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              const imgSrc = product.primaryImage || 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png';
              return (
                <div
                  key={product.id}
                  onClick={() => toggleSelect(product.id)}
                  className={`relative rounded-card p-5 border cursor-pointer transition-all duration-300 bg-white ${
                    isSelected ? 'border-zinc-950 shadow-xl bg-bg-muted/40' : 'border-border hover:border-zinc-400'
                  }`}
                >
                  <div className="relative w-full h-48 rounded-card overflow-hidden bg-bg-muted mb-4 border border-border">
                    <Image src={imgSrc} alt={product.title} fill unoptimized className="object-cover" />
                    <div className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all z-10 ${
                      isSelected ? 'bg-zinc-950 text-white' : 'bg-white/80 border border-border text-zinc-400'
                    }`}>
                      {isSelected ? <Check size={14} /> : <Plus size={14} />}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">{product.category}</span>
                    <h3 className="font-display font-bold text-base text-text-primary mt-0.5">{product.title}</h3>
                    <span className="font-mono font-bold text-sm text-text-primary mt-2 block">₹{product.price.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bundle Savings Calculator Panel (4 cols) */}
          <div className="lg:col-span-4 bg-bg-muted rounded-card p-6 border border-border shadow-xl space-y-6 sticky top-28">
            <h3 className="font-display font-bold text-lg uppercase tracking-tight text-text-primary border-b border-border pb-4">
              Bundle Savings Calculator
            </h3>

            {/* Discount Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span>Discount Unlocked:</span>
                <span className="text-amber-700">{discountRate * 100}% OFF</span>
              </div>
              <div className="w-full h-3 rounded-full bg-zinc-200 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (selectedProducts.length / 2) * 100)}%` }}
                />
              </div>
            </div>

            {/* Selected Items */}
            <div className="space-y-3 border-t border-border pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary block">
                Selected Fixtures ({selectedProducts.length})
              </span>
              {selectedProducts.map(p => (
                <div key={p.id} className="flex justify-between text-xs font-medium text-text-secondary">
                  <span className="truncate pr-2">• {p.title}</span>
                  <span className="font-mono font-bold">₹{p.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Calculation */}
            <div className="space-y-2 text-xs border-t border-border pt-4 text-text-secondary">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span className="font-mono text-text-primary">₹{rawTotal.toLocaleString()}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Bundle Savings ({discountRate * 100}%)</span>
                  <span className="font-mono">-₹{bundleDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-text-primary border-t border-border pt-2">
                <span>Bundle Total</span>
                <span className="font-mono text-lg text-zinc-950">₹{finalBundleTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleAddBundleToCart}
              disabled={selectedProducts.length === 0}
              className="w-full py-4 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <ShoppingBag size={16} />
              <span>Add Complete Suite to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
