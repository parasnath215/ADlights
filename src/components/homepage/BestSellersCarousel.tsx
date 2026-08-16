'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { RatingStars } from '../ui/RatingStars';
import { WarmUnderline } from '../ui/WarmUnderline';

export const BestSellersCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const { addToCart, setQuickViewProduct } = useCart();
  const visibleCount = 4;
  const maxStart = Math.max(0, PRODUCTS.length - visibleCount);

  useEffect(() => {
    if (isHovered || isTouched) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, isTouched, maxStart]);

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev <= 0 ? maxStart : prev - 1));
  };

  const visibleProducts = PRODUCTS.slice(startIndex, startIndex + visibleCount);

  return (
    <section
      className="py-16 sm:py-24 bg-bg-muted border-b border-border select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setIsTouched(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-border text-xs font-bold uppercase tracking-widest text-text-secondary shadow-xs mb-3">
            <Sparkles size={13} className="text-amber-500" /> Curated Architectural Selection
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-text-primary mt-1">
            <WarmUnderline>Best Seller</WarmUnderline>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-2 max-w-xl mx-auto">
            Explore our most sought-after luminaires, mouth-blown pendants, and architectural sconces.
          </p>
        </div>

        {/* Product Cards Container (Mobile Horizontal Swipeable / Desktop Responsive Grid) */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible scrollbar-none snap-x snap-mandatory pb-4 sm:pb-0">
          {visibleProducts.map((product) => {
            const imgSrc = product.primaryImage || 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png';
            return (
              <div
                key={product.id}
                className="w-[82vw] max-w-[290px] sm:w-auto shrink-0 snap-start group rounded-card border border-border bg-white hover:border-zinc-950 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl"
              >
                <div>
                  <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-bg-muted border-b border-border">
                    <Image
                      src={imgSrc}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-zinc-950 text-white rounded-pill text-[9px] sm:text-[10px] font-bold uppercase tracking-wider z-10">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-xs rounded-pill border border-border shadow-xs z-10">
                      <RatingStars rating={product.rating} showText={false} />
                    </div>

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2 z-10">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 py-2 rounded-pill bg-zinc-950 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-1 shadow-lg"
                      >
                        <ShoppingBag size={12} /> Add to Cart
                      </button>
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="p-2 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 transition-colors shadow-lg"
                        title="Quick View"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                      {product.category}
                    </span>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-display font-bold text-sm text-text-primary group-hover:text-amber-600 transition-colors line-clamp-1 mt-0.5">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-text-secondary line-clamp-1 mt-0.5">{product.subtitle}</p>

                    <div className="flex items-baseline gap-2 mt-3 font-mono font-bold">
                      <span className="text-base text-text-primary">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-text-secondary line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2.5 bg-bg-muted border-t border-border flex items-center justify-between text-[10px] text-text-secondary font-medium">
                  <span>{product.specs[0]?.value}</span>
                  <span className="text-zinc-400">•</span>
                  <span>{product.specs[1]?.value}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls Brought DOWN Below Products Grid */}
        <div className="flex flex-col items-center gap-4 mt-10 sm:mt-12">
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-border text-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors shadow-md hover:scale-105 active:scale-95"
              aria-label="Previous products"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-border text-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors shadow-md hover:scale-105 active:scale-95"
              aria-label="Next products"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxStart + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === startIndex ? 'w-8 bg-amber-500' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
