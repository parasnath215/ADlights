'use client';

import React from 'react';
import { HeroSlider } from '../components/homepage/HeroSlider';
import { BrandStory } from '../components/homepage/BrandStory';
import { CinematicBanner } from '../components/homepage/CinematicBanner';
import { ProductSpotlight } from '../components/homepage/ProductSpotlight';
import { BeforeAfterSlider } from '../components/homepage/BeforeAfterSlider';
import { BuildABundle } from '../components/homepage/BuildABundle';
import { CountdownBanner } from '../components/homepage/CountdownBanner';
import { ContextGrid } from '../components/homepage/ContextGrid';
import { TestimonialSlider } from '../components/homepage/TestimonialSlider';
import { BestSellersCarousel } from '../components/homepage/BestSellersCarousel';
import { BrandPartners } from '../components/homepage/BrandPartners';
import { TrustBadges } from '../components/homepage/TrustBadges';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Brand Story & Category Grid */}
      <BrandStory />

      {/* 3. Featured Product Cinematic Banner */}
      <CinematicBanner />

      {/* 4. Product Spotlight (Sticky Gallery) */}
      <ProductSpotlight />

      {/* 5. Before/After Comparison Slider */}
      <BeforeAfterSlider />

      {/* 6. Build-a-Bundle */}
      <BuildABundle />

      {/* 7. Countdown Promo Banner */}
      <CountdownBanner />

      {/* 8. Product-in-Context Grid */}
      <ContextGrid />

      {/* 9. Testimonial Slider */}
      <TestimonialSlider />

      {/* 10. Best Sellers Carousel */}
      <BestSellersCarousel />

      {/* 11. Official Brand Partners Marquee Slider Ticker */}
      <BrandPartners />

      {/* 12. Trust Badges Strip */}
      <TrustBadges />
    </div>
  );
}
