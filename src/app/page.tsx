'use client';

import React from 'react';
import { HeroSlider } from '../components/homepage/HeroSlider';
import { BestSellersCarousel } from '../components/homepage/BestSellersCarousel';
import { CategoriesSection } from '../components/homepage/CategoriesSection';
import { CinematicBanner } from '../components/homepage/CinematicBanner';
import { BeforeAfterSlider } from '../components/homepage/BeforeAfterSlider';
import { CountdownBanner } from '../components/homepage/CountdownBanner';
import { BrandPartners } from '../components/homepage/BrandPartners';
import { TestimonialSlider } from '../components/homepage/TestimonialSlider';
import { TrustBadges } from '../components/homepage/TrustBadges';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Slider (3-second auto transition & left side rail) */}
      <HeroSlider />

      {/* 2. Best Sellers Section (Renamed to Best Seller) */}
      <BestSellersCarousel />

      {/* 3. Categories Section (Exploration grid directly below Best Seller) */}
      <CategoriesSection />

      {/* 4. Featured Product Cinematic Banner */}
      <CinematicBanner />

      {/* 5. Before/After Comparison Slider */}
      <BeforeAfterSlider />

      {/* 6. Architect & Trade Consultation Program (High value replacement for generic countdown) */}
      <CountdownBanner />

      {/* 7. Official Brand Partners Marquee Slider (Moved above Reviews) */}
      <BrandPartners />

      {/* 8. Verified Customer Reviews (3 reviews in one screen, scrollable slider) */}
      <TestimonialSlider />

      {/* 9. Trust Badges Strip */}
      <TrustBadges />
    </div>
  );
}
