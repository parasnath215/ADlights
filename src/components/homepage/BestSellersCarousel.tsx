'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { RatingStars } from '../ui/RatingStars';
import { WarmUnderline } from '../ui/WarmUnderline';

export const BestSellersCarousel: React.FC = () => {
  const { addToCart, setQuickViewProduct } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Duplicate product array for seamless infinite marquee loop
  const infiniteProducts = [...PRODUCTS, ...PRODUCTS];

  return (
    <section
      className="relative py-8 sm:py-12 bg-fixed bg-center bg-cover text-white border-b border-zinc-800 select-none overflow-hidden"
      style={{ backgroundImage: "url('/images/hero-pendant-banner.png')" }}
    >
      {/* Translucent still background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/35 to-zinc-950/55 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-zinc-950/80 border border-white/20 text-xs font-bold uppercase tracking-widest text-amber-400 shadow-lg mb-2.5 backdrop-blur-md">
            <Sparkles size={13} className="text-amber-400" /> Curated Architectural Selection
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mt-1 drop-shadow-lg">
            <WarmUnderline>Best Seller</WarmUnderline>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-100 mt-2 max-w-xl mx-auto font-medium drop-shadow-md">
            Explore our most sought-after luminaires, mouth-blown pendants, and architectural sconces.
          </p>
        </div>

        {/* Smooth Continuous Auto-Scrolling Marquee Track */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none pb-4"
        >
          <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused] active:[animation-play-state:paused] gap-6 items-stretch">
            {infiniteProducts.map((product, idx) => {
              const imgSrc = product.primaryImage || 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png';
              return (
                <div
                  key={`${product.id}-${idx}`}
                  className="w-[280px] sm:w-[310px] shrink-0 group rounded-card border border-border bg-white hover:border-zinc-950 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl"
                >
                  <div>
                    <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-bg-muted border-b border-border">
                      <Image
                        src={imgSrc}
                        alt={product.title}
                        fill
                        sizes="310px"
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
        </div>

        {/* Navigation Controls Below Products */}
        <div className="flex items-center justify-center gap-3 mt-5 sm:mt-6">
          <button
            onClick={scrollLeft}
            className="p-3 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-400 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollRight}
            className="p-3 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-400 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
