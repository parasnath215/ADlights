'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, Plus } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/commerce';
import { WarmUnderline } from '../ui/WarmUnderline';

const CONTEXT_ITEMS = [
  {
    id: 1,
    title: 'Staircase Recessed Step Light',
    location: 'Private Villa, Mumbai',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png',
    product: PRODUCTS[0], // Aurora J019-6W
    hotspot: { x: '45%', y: '60%' }
  },
  {
    id: 2,
    title: 'Mouth-Blown Crystal Chandelier',
    location: 'Boutique Residence, New Delhi',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/07/HL-109-3.png',
    product: PRODUCTS[2], // Aurora Luxe 3-Light
    hotspot: { x: '50%', y: '40%' }
  },
  {
    id: 3,
    title: 'Linear Wall Sconce Ambient Glow',
    location: 'Modern Apartment, Bengaluru',
    image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/07/WL-107-6-1.png',
    product: PRODUCTS[4], // ADL Wall Sconce
    hotspot: { x: '65%', y: '35%' }
  }
];

export const ContextGrid: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const { setQuickViewProduct } = useCart();

  return (
    <section className="py-24 bg-white border-b border-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
            In-Context Inspiration
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-text-primary mt-2">
            Architectural <WarmUnderline>Spaces Illuminated</WarmUnderline>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTEXT_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-card overflow-hidden bg-bg-muted border border-border h-96 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              {/* Hotspot Pin */}
              <div
                className="absolute z-20"
                style={{ left: item.hotspot.x, top: item.hotspot.y }}
                onMouseEnter={() => setActiveHotspot(item.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <button
                  onClick={() => setQuickViewProduct(item.product)}
                  className="relative w-8 h-8 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center shadow-2xl backdrop-blur-xs hover:scale-110 transition-transform"
                >
                  <Plus size={16} />
                  <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-30" />
                </button>

                {/* Popover Preview Card */}
                {activeHotspot === item.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 rounded-card bg-zinc-950 text-white border border-zinc-800 shadow-2xl text-xs z-30 animate-fade-in">
                    <span className="font-bold uppercase tracking-wider text-amber-400 block truncate">{item.product.title}</span>
                    <span className="font-mono font-bold text-white block mt-1">₹{item.product.price.toLocaleString()}</span>
                    <button
                      onClick={() => setQuickViewProduct(item.product)}
                      className="mt-2 w-full py-1.5 rounded-pill bg-white text-zinc-950 font-bold text-[10px] uppercase flex items-center justify-center gap-1 hover:bg-amber-300"
                    >
                      <Eye size={12} /> Quick View
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block">{item.location}</span>
                <h3 className="font-display font-bold text-lg uppercase tracking-tight mt-0.5">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
