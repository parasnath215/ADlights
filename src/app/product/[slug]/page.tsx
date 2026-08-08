import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import { ProductGallery } from '../../../components/pdp/ProductGallery';
import { ProductBuyBox } from '../../../components/pdp/ProductBuyBox';
import { ProductAccordions } from '../../../components/pdp/ProductAccordions';
import { StickyAddToCartBar } from '../../../components/pdp/StickyAddToCartBar';
import { BestSellersCarousel } from '../../../components/homepage/BestSellersCarousel';
import { TrustBadges } from '../../../components/homepage/TrustBadges';
import { Sparkles } from 'lucide-react';

// Generate static params for all known products at build time
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Find product strictly by slug — no silent fallback
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return notFound();

  const recommendedProducts = PRODUCTS
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-[10px] sm:text-xs text-text-secondary mb-6 sm:mb-8 uppercase font-bold tracking-wider truncate">
          <Link href="/" className="hover:text-text-primary">Home</Link>
          <span className="mx-1.5 sm:mx-2">•</span>
          <Link href="/shop" className="hover:text-text-primary">Shop</Link>
          <span className="mx-1.5 sm:mx-2">•</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-text-primary">{product.category}</Link>
          <span className="mx-1.5 sm:mx-2">•</span>
          <span className="text-text-primary">{product.title}</span>
        </nav>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Gallery (7 cols) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.gallery.length > 0 ? product.gallery : [product.primaryImage]}
              title={product.title}
            />
          </div>

          {/* Right Column: Buy Box (5 cols) — sticky only on desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <ProductBuyBox product={product} />

            {/* Accordions: Highlights, Features, FAQs */}
            <ProductAccordions
              highlights={product.highlights}
              features={product.features}
              faqs={product.faqs}
            />
          </div>
        </div>
      </div>

      {/* Below the Fold: "Pairs Well With" Recommendations */}
      {recommendedProducts.length > 0 && (
        <section className="mt-16 sm:mt-28 py-12 sm:py-16 bg-bg-muted border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-700">
                <Sparkles size={13} /> Architectural Harmony
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-4xl uppercase tracking-tight text-text-primary mt-2">
                Pairs Well With
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Curated complementary fixtures for unified atmospheric ambiance.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
              {recommendedProducts.map((rec) => (
                <Link
                  key={rec.id}
                  href={`/product/${rec.slug}`}
                  className="group rounded-card p-3 sm:p-4 border border-border bg-white hover:border-zinc-950 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-36 sm:h-48 rounded-md overflow-hidden bg-bg-muted mb-2.5">
                      <Image
                        src={rec.primaryImage}
                        alt={rec.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-700 font-bold block">
                      {rec.category}
                    </span>
                    <h3 className="font-display font-bold text-xs sm:text-base text-text-primary group-hover:text-amber-600 transition-colors line-clamp-1">
                      {rec.title}
                    </h3>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-border flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-xs sm:text-sm">₹{rec.price.toLocaleString()}</span>
                    <span className="font-semibold text-zinc-950 group-hover:underline text-[10px] sm:text-xs">View →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers Section — lazy loaded */}
      <Suspense fallback={<div className="py-16 bg-bg-muted animate-pulse" />}>
        <BestSellersCarousel />
      </Suspense>

      {/* Trust Badges Strip — lazy loaded */}
      <Suspense fallback={null}>
        <TrustBadges />
      </Suspense>

      {/* Sticky Add to Cart Bar */}
      <StickyAddToCartBar product={product} />
    </div>
  );
}
