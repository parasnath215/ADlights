'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  showText?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, count, showText = true }) => {
  return (
    <div className="flex items-center gap-1.5 text-xs text-text-primary">
      <div className="flex items-center gap-0.5 text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={13}
            className={star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : star - rating < 1 ? 'fill-amber-400/50 text-amber-400' : 'text-zinc-300'}
          />
        ))}
      </div>
      {showText && (
        <span className="font-medium text-text-secondary">
          {rating.toFixed(1)} {count !== undefined && <span className="opacity-75">({count})</span>}
        </span>
      )}
    </div>
  );
};
