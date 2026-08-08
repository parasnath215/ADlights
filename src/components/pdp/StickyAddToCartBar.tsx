'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../../types/commerce';
import { useCart } from '../../context/CartContext';

export const StickyAddToCartBar: React.FC<{ product: Product }> = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border shadow-2xl py-3.5 px-4 sm:px-8 flex items-center justify-between animate-slide-up">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-card overflow-hidden bg-bg-muted border border-border shrink-0">
          <Image src={product.primaryImage} alt={product.title} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-display font-bold text-sm text-text-primary uppercase tracking-tight">{product.title}</h4>
          <span className="font-mono font-bold text-xs text-amber-700">₹{product.price.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="px-6 py-3 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center gap-2 shadow-lg"
      >
        <ShoppingBag size={16} />
        <span>Add to Cart — ₹{product.price.toLocaleString()}</span>
      </button>
    </div>
  );
};
