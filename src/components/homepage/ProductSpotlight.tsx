'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Check, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { ProductVariant, UpgradeOption } from '../../types/commerce';
import { RatingStars } from '../ui/RatingStars';
import { WarmUnderline } from '../ui/WarmUnderline';

export const ProductSpotlight: React.FC = () => {
  const product = PRODUCTS[0]; // Flagship Aurora J019-6W
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedUpgrades, setSelectedUpgrades] = useState<UpgradeOption[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  const toggleUpgrade = (upgrade: UpgradeOption) => {
    setSelectedUpgrades(prev =>
      prev.some(u => u.id === upgrade.id)
        ? prev.filter(u => u.id !== upgrade.id)
        : [...prev, upgrade]
    );
  };

  const upgradesCost = selectedUpgrades.reduce((sum, u) => sum + u.price, 0);
  const totalUnitPrice = product.price + upgradesCost;

  const currentImgSrc = product.gallery[activeImage] || product.primaryImage || 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png';

  return (
    <section className="py-12 sm:py-24 bg-white border-b border-border select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-text-secondary font-bold">
            Flagship Architectural Spotlight
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-5xl uppercase tracking-tight text-text-primary mt-1.5 leading-tight">
            The <WarmUnderline>Aurora J019-6W</WarmUnderline> Recessed Foot Light
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Gallery Column (7 cols) - sticky only on desktop */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 lg:sticky lg:top-28">
            <div className="relative w-full h-64 sm:h-[400px] lg:h-[480px] rounded-card overflow-hidden bg-bg-muted border border-border shadow-lg sm:shadow-xl">
              <Image
                src={currentImgSrc}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-all duration-500"
                priority
              />
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-card overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === i ? 'border-zinc-950 shadow-md scale-102' : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.title} view ${i + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy Box & Specs Right (5 cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-amber-700">
                {product.category}
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-3xl text-text-primary uppercase tracking-tight mt-1 leading-tight">
                {product.title}
              </h3>
              <p className="text-xs text-text-secondary mt-1">{product.subtitle}</p>

              <div className="flex items-center gap-2.5 mt-2.5">
                <RatingStars rating={product.rating} />
                <span className="text-[11px] sm:text-xs text-text-secondary font-medium">({product.reviewsCount} verified architect reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mt-3.5">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-text-primary">₹{totalUnitPrice.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="font-mono text-xs sm:text-sm text-text-secondary line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed">
              {product.description}
            </p>

            {/* Spec Badges Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <div className="p-3 rounded-card bg-bg-muted border border-border flex items-center gap-2.5 sm:gap-3">
                <Zap size={18} className="text-amber-600 shrink-0" />
                <div>
                  <span className="text-[9px] sm:text-[10px] text-text-secondary uppercase font-bold block">Power & Voltage</span>
                  <span className="text-xs font-bold text-text-primary font-mono">6W LED 220V</span>
                </div>
              </div>

              <div className="p-3 rounded-card bg-bg-muted border border-border flex items-center gap-2.5 sm:gap-3">
                <ShieldCheck size={18} className="text-amber-600 shrink-0" />
                <div>
                  <span className="text-[9px] sm:text-[10px] text-text-secondary uppercase font-bold block">Protection Rating</span>
                  <span className="text-xs font-bold text-text-primary font-mono">IP54 Waterproof</span>
                </div>
              </div>
            </div>

            {/* Upgrade Options Checklist */}
            {product.upgrades.length > 0 && (
              <div className="space-y-2 pt-1">
                <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-text-primary block">
                  Add Architectural Mounting Hardware
                </label>
                <div className="space-y-2">
                  {product.upgrades.map((upgrade) => {
                    const isChecked = selectedUpgrades.some(u => u.id === upgrade.id);
                    return (
                      <div
                        key={upgrade.id}
                        onClick={() => toggleUpgrade(upgrade)}
                        className={`flex items-center justify-between p-3 rounded-card border text-xs cursor-pointer transition-all ${
                          isChecked ? 'border-zinc-950 bg-bg-muted font-bold' : 'border-border bg-white hover:border-zinc-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-zinc-950 border-zinc-950 text-white' : 'border-zinc-400'
                          }`}>
                            {isChecked && <Check size={12} />}
                          </div>
                          <span className="text-xs">{upgrade.title}</span>
                        </div>
                        <span className="font-mono font-bold text-text-primary">+₹{upgrade.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action CTAs */}
            <div className="pt-3 border-t border-border">
              <button
                onClick={() => addToCart(product, selectedVariant, selectedUpgrades, 1)}
                className="w-full py-3.5 sm:py-4 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl active:scale-98"
              >
                <ShoppingBag size={18} />
                <span>Add to Cart — ₹{totalUnitPrice.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
