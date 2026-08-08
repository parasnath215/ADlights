'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useCart } from '../../context/CartContext';
import { WarmUnderline } from '../../components/ui/WarmUnderline';

export default function WishlistPage() {
  const { wishlist, products, toggleWishlist } = useAdmin();
  const { addToCart } = useCart();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left border-b border-border pb-6">
          <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
            Saved Fixtures
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-text-primary mt-1">
            Your Wishlist <WarmUnderline>Collection</WarmUnderline> ({savedProducts.length})
          </h1>
        </div>

        {savedProducts.length === 0 ? (
          <div className="py-20 text-center bg-bg-muted rounded-card border border-border">
            <div className="w-16 h-16 rounded-full bg-white border border-border flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <Heart size={28} />
            </div>
            <h2 className="font-display font-bold text-2xl text-text-primary uppercase">Your wishlist is empty</h2>
            <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto">Explore our architectural fixtures and save your favorites.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-950 transition-colors"
            >
              <span>Browse Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-card border border-border bg-white hover:border-zinc-950 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-bg-muted">
                    <Image src={product.primaryImage} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2.5 rounded-full bg-white text-rose-600 shadow-md"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">{product.category}</span>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-amber-600 transition-colors mt-0.5">{product.title}</h3>
                    </Link>
                    <p className="font-mono font-bold text-base text-text-primary mt-2">₹{product.price}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
