'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RatingStars } from '../ui/RatingStars';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
      />

      <div className="relative w-full max-w-4xl bg-white rounded-card shadow-2xl z-10 overflow-hidden border border-border flex flex-col md:flex-row max-h-[90vh] animate-slide-up">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-950 shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Gallery Left (6 cols) */}
        <div className="w-full md:w-1/2 p-6 bg-bg-muted flex flex-col justify-between">
          <div className="relative aspect-4/3 rounded-card overflow-hidden bg-white border border-border shadow-xs">
            <Image
              src={quickViewProduct.gallery[activeImage] || quickViewProduct.primaryImage}
              alt={quickViewProduct.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-center gap-2 mt-4 overflow-x-auto">
            {quickViewProduct.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-16 h-16 rounded-card overflow-hidden border-2 shrink-0 ${
                  activeImage === idx ? 'border-zinc-950' : 'border-border opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Right (6 cols) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
              {quickViewProduct.category}
            </span>
            <h3 className="font-display font-extrabold text-2xl text-text-primary uppercase tracking-tight mt-1">
              {quickViewProduct.title}
            </h3>
            <p className="text-xs text-text-secondary mt-1">{quickViewProduct.subtitle}</p>

            <div className="flex items-center gap-3 mt-3">
              <RatingStars rating={quickViewProduct.rating} />
              <span className="text-xs text-text-secondary font-medium">({quickViewProduct.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-mono text-2xl font-bold text-text-primary">₹{quickViewProduct.price.toLocaleString()}</span>
              {quickViewProduct.originalPrice && (
                <span className="font-mono text-sm text-text-secondary line-through">₹{quickViewProduct.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-xs text-text-secondary mt-4 leading-relaxed line-clamp-4">
              {quickViewProduct.description}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <button
              onClick={() => {
                addToCart(quickViewProduct);
                setQuickViewProduct(null);
              }}
              className="w-full py-3.5 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag size={16} />
              <span>Add to Cart — ₹{quickViewProduct.price.toLocaleString()}</span>
            </button>

            <Link
              href={`/product/${quickViewProduct.slug}`}
              onClick={() => setQuickViewProduct(null)}
              className="w-full py-3 rounded-pill border border-border font-bold text-xs uppercase tracking-wider text-text-primary hover:bg-bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <span>View Full Details & Specs</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
