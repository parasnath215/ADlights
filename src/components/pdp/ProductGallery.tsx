'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayImages = images && images.length > 0 ? images : ['https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png'];
  const currentImage = displayImages[activeImageIndex] || displayImages[0];

  return (
    <div className="space-y-4">
      {/* Main Large Image Display with guaranteed height */}
      <div
        onClick={() => setIsZoomed(!isZoomed)}
        className="relative w-full h-[400px] sm:h-[500px] rounded-card overflow-hidden bg-bg-muted border border-border shadow-md group cursor-zoom-in"
      >
        <Image
          src={currentImage}
          alt={`${title} main view`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-500 ${
            isZoomed ? 'scale-150' : 'group-hover:scale-105'
          }`}
        />
        <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-zinc-950 shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={18} />
        </div>
      </div>

      {/* Thumbnail Selector Strip */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveImageIndex(idx);
                setIsZoomed(false);
              }}
              className={`relative w-20 h-20 rounded-card overflow-hidden border-2 shrink-0 transition-all ${
                activeImageIndex === idx
                  ? 'border-zinc-950 ring-2 ring-zinc-950 scale-102 shadow-sm'
                  : 'border-border opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`${title} thumb ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
