'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { WarmUnderline } from '../ui/WarmUnderline';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <section id="before-after" className="py-6 sm:py-12 bg-white border-b border-border select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-text-secondary font-bold">
            Interactive Light Lab
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-5xl uppercase tracking-tight text-text-primary mt-1.5 leading-tight">
            Experience the <WarmUnderline>Atmospheric Difference</WarmUnderline>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1.5">
            Drag the vertical handle left or right to compare natural daylight vs. the warm golden ambient glow of ADlights optics.
          </p>
        </div>

        {/* Before / After Drag Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[340px] sm:h-[500px] lg:h-[600px] rounded-card overflow-hidden border border-border shadow-xl cursor-ew-resize touch-none"
        >
          {/* Right Image: Light ON (2700K Warm Glow) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80"
              alt="Light ON Warm Glow"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover brightness-110 saturate-125"
            />
            <div className="absolute inset-0 bg-amber-500/10 mix-blend-color-dodge" />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-pill bg-amber-500 text-zinc-950 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Sun size={14} />
              <span>2700K Warm Glow ON</span>
            </div>
          </div>

          {/* Left Image: Light OFF (Natural Unlit Interior) */}
          <div
            className="absolute inset-0 z-10 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <Image
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80"
              alt="Light OFF Daylight"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover brightness-70 grayscale-25"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-pill bg-zinc-950/90 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-md border border-white/20 flex items-center gap-1.5">
              <Moon size={14} />
              <span>Daylight Standby OFF</span>
            </div>
          </div>

          {/* Vertical Split Drag Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-950 text-white border-2 border-white flex items-center justify-center shadow-2xl transition-transform duration-150 ${
                isDragging ? 'scale-125 bg-amber-400 text-zinc-950' : 'hover:scale-110'
              }`}
            >
              <SlidersHorizontal size={16} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
