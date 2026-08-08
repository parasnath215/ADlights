'use client';

import React, { useState } from 'react';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import { Product, ProductVariant, UpgradeOption } from '../../types/commerce';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';
import { RatingStars } from '../ui/RatingStars';

export const ProductBuyBox: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedUpgrades, setSelectedUpgrades] = useState<UpgradeOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useAdmin();

  const isSaved = isInWishlist(product.id);

  const toggleUpgrade = (upgrade: UpgradeOption) => {
    setSelectedUpgrades(prev =>
      prev.some(u => u.id === upgrade.id)
        ? prev.filter(u => u.id !== upgrade.id)
        : [...prev, upgrade]
    );
  };

  const upgradesCost = selectedUpgrades.reduce((sum, u) => sum + u.price, 0);
  const totalUnitPrice = product.price + upgradesCost;

  return (
    <div className="space-y-6 select-none">
      <div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-700">
          {product.category}
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary mt-1 uppercase tracking-tight">
          {product.title}
        </h1>
        <p className="text-xs text-text-secondary mt-1">{product.subtitle}</p>

        <div className="flex items-center gap-3 mt-3">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-text-secondary font-medium">({product.reviewsCount} verified architect reviews)</span>
        </div>

        <div className="flex items-baseline gap-3 mt-4">
          <span className="font-mono text-3xl font-extrabold text-text-primary">₹{totalUnitPrice.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="font-mono text-sm text-text-secondary line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase">
              Save ₹{(product.originalPrice - product.price).toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Stock Urgency Bar */}
      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 text-xs font-semibold flex items-center justify-between">
        <span>⚡ Only <strong>{product.stockCount} units left</strong> in stock — Dispatches Tomorrow</span>
        <span className="font-mono text-[10px] uppercase bg-amber-200 px-2 py-0.5 rounded font-bold">High Demand</span>
      </div>

      {/* Variant Selector */}
      {product.variants.length > 1 && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-text-primary block">
            Finish: <span className="text-amber-700">{selectedVariant.name}</span>
          </label>
          <div className="flex items-center gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`flex items-center gap-2 px-3 py-2 rounded-pill border text-xs font-medium transition-all ${
                  selectedVariant.id === variant.id
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-sm'
                    : 'border-border bg-bg-muted hover:border-zinc-400 text-text-primary'
                }`}
              >
                <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: variant.colorHex }} />
                <span>{variant.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Upgrade Options Checklist */}
      {product.upgrades.length > 0 && (
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-text-primary block">
            Architectural Add-ons & Hardware
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
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      isChecked ? 'bg-zinc-950 border-zinc-950 text-white' : 'border-zinc-400'
                    }`}>
                      {isChecked && <Check size={12} />}
                    </div>
                    <span>{upgrade.title}</span>
                  </div>
                  <span className="font-mono font-bold text-text-primary">+₹{upgrade.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart Action */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center border border-border rounded-pill bg-bg-muted">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-text-secondary hover:text-text-primary font-bold">
            -
          </button>
          <span className="px-3 font-mono font-bold text-sm">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-text-secondary hover:text-text-primary font-bold">
            +
          </button>
        </div>

        <button
          onClick={() => addToCart(product, selectedVariant, selectedUpgrades, quantity)}
          className="flex-1 py-4 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
        >
          <ShoppingBag size={18} />
          <span>Add to Cart — ₹{(totalUnitPrice * quantity).toLocaleString()}</span>
        </button>

        <button
          onClick={() => toggleWishlist(product.id)}
          className={`p-4 rounded-full border transition-colors shadow-xs ${
            isSaved ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-border hover:bg-zinc-100 text-text-primary'
          }`}
          title="Save to Wishlist"
        >
          <Heart size={18} className={isSaved ? 'fill-current' : ''} />
        </button>
      </div>
    </div>
  );
};
