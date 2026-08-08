'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/products';

export const TestimonialSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <section className="relative py-28 bg-zinc-950 text-white overflow-hidden select-none">
      {/* Dark Lifestyle Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=2000&q=90"
          alt="Architectural Ambient Interior"
          fill
          className="object-cover brightness-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/95 to-zinc-950/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Quote size={48} className="text-amber-400/40 mx-auto mb-6 rotate-180" />

        <div key={current.id} className="animate-fade-in space-y-6">
          <p className="font-display font-medium text-xl sm:text-3xl md:text-4xl text-zinc-100 leading-snug tracking-tight italic">
            &ldquo;{current.quote}&rdquo;
          </p>

          <div className="pt-4 flex flex-col items-center justify-center">
            <span className="font-display font-extrabold text-sm uppercase tracking-widest text-white">
              {current.author}
            </span>
            <span className="text-xs text-amber-300/90 font-medium mt-0.5">
              {current.role} — <strong className="uppercase font-bold tracking-wider">{current.publication}</strong>
            </span>
          </div>
        </div>

        {/* Dot Pagination */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === index ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
