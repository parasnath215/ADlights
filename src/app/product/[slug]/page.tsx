'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import { useAdmin } from '../../../context/AdminContext';
import { ProductGallery } from '../../../components/pdp/ProductGallery';
import { ProductBuyBox } from '../../../components/pdp/ProductBuyBox';
import { StickyAddToCartBar } from '../../../components/pdp/StickyAddToCartBar';
import { BestSellersCarousel } from '../../../components/homepage/BestSellersCarousel';
import { TrustBadges } from '../../../components/homepage/TrustBadges';
import { Sparkles } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { products: adminProducts } = useAdmin();

  const activeProducts = adminProducts && adminProducts.length > 0 ? adminProducts : PRODUCTS;
  const product = activeProducts.find(p => p.slug === resolvedParams.slug) || activeProducts[0];

  if (!product) return notFound();

  const recommendedProducts = activeProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-text-secondary mb-8 uppercase font-bold tracking-wider">
          <Link href="/" className="hover:text-text-primary">Home</Link>
          <span className="mx-2">•</span>
          <Link href="/shop" className="hover:text-text-primary">Shop</Link>
          <span className="mx-2">•</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-text-primary">{product.category}</Link>
          <span className="mx-2">•</span>
          <span className="text-text-primary">{product.title}</span>
        </nav>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.gallery.length > 0 ? product.gallery : [product.primaryImage]}
              title={product.title}
            />
          </div>

          {/* Right Column: Sticky Buy Box (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <ProductBuyBox product={product} />
          </div>
        </div>
      </div>

      {/* Below the Fold: "Pairs Well With" Recommendations */}
      <section className="mt-28 py-16 bg-bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-border text-xs font-bold uppercase tracking-wider text-amber-700">
              <Sparkles size={13} /> Architectural Harmony
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-text-primary mt-2">
              Pairs Well With
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Curated complementary fixtures for unified atmospheric ambiance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendedProducts.map((rec) => (
              <Link
                key={rec.id}
                href={`/product/${rec.slug}`}
                className="group rounded-card p-4 border border-border bg-white hover:border-zinc-950 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 rounded-md overflow-hidden bg-bg-muted mb-3">
                    <img
                      src={rec.primaryImage}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">
                    {rec.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-text-primary group-hover:text-amber-600 transition-colors">
                    {rec.title}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-border flex justify-between items-center text-xs">
                  <span className="font-mono font-bold">₹{rec.price.toLocaleString()}</span>
                  <span className="font-semibold text-zinc-950 group-hover:underline">View Fixture →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <BestSellersCarousel />

      {/* Trust Badges Strip */}
      <TrustBadges />

      {/* Sticky Add to Cart Bar */}
      <StickyAddToCartBar product={product} />
    </div>
  );
}
