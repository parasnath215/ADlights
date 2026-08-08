'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { WarmUnderline } from '../../components/ui/WarmUnderline';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, freeShippingThreshold } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AD20') {
      setDiscountPercent(0.2);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon. Use "AD20" for 20% off.');
    }
  };

  const finalDiscount = subtotal * discountPercent;
  const finalTotal = Math.max(0, subtotal - finalDiscount);

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-border text-center sm:text-left">
          <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">
            Shopping Cart
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-text-primary mt-1">
            Your Selected <WarmUnderline>Architectural Set</WarmUnderline>
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center text-text-secondary bg-bg-muted rounded-card border border-border">
            <div className="w-16 h-16 rounded-full bg-white border border-border flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <ShoppingBag size={28} />
            </div>
            <h2 className="font-display font-bold text-2xl text-text-primary uppercase">Your cart is empty</h2>
            <p className="text-xs mt-1 max-w-sm mx-auto">Explore our official WooCommerce catalog and light up your space.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-950 transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Meter */}
              <div className="p-4 bg-bg-muted rounded-card border border-border text-xs">
                <div className="flex items-center justify-between mb-2 font-medium text-text-primary">
                  <span className="flex items-center gap-1.5">
                    <Truck size={16} className="text-amber-600" />
                    {remainingForFreeShipping === 0 ? (
                      <strong className="text-emerald-700">You unlocked Free Express Shipping!</strong>
                    ) : (
                      <span>Add <strong>₹{remainingForFreeShipping.toLocaleString()}</strong> for Free Express Shipping</span>
                    )}
                  </span>
                  <span className="font-mono">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-border bg-white rounded-card border border-border p-6 space-y-6">
                {cart.map((item, index) => {
                  const upgradesCost = item.selectedUpgrades.reduce((sum, u) => sum + u.price, 0);
                  const itemUnitPrice = item.product.price + upgradesCost;

                  return (
                    <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 first:pt-0">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-card overflow-hidden bg-bg-muted border border-border shrink-0">
                          <Image src={item.variant.image || item.product.primaryImage} alt={item.product.title} fill className="object-cover" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-base text-text-primary">{item.product.title}</h3>
                          <p className="text-xs text-text-secondary">Finish: <span className="font-semibold text-text-primary">{item.variant.name}</span></p>
                          {item.selectedUpgrades.length > 0 && (
                            <p className="text-[11px] text-amber-700 mt-1">Upgrades: {item.selectedUpgrades.map(u => u.title).join(', ')}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center border border-border rounded-pill bg-bg-muted">
                          <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-2 text-text-secondary hover:text-text-primary">
                            <Minus size={12} />
                          </button>
                          <span className="px-3 font-mono font-bold text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-2 text-text-secondary hover:text-text-primary">
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="font-mono font-bold text-base text-text-primary">₹{(itemUnitPrice * item.quantity).toLocaleString()}</span>

                        <button onClick={() => removeFromCart(index)} className="text-zinc-400 hover:text-rose-600 transition-colors p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Panel (4 cols) */}
            <div className="lg:col-span-4 bg-bg-muted rounded-card p-6 border border-border shadow-lg space-y-6 sticky top-28">
              <h3 className="font-display font-bold text-lg uppercase tracking-tight text-text-primary border-b border-border pb-4">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon code (e.g. AD20)"
                  className="flex-1 px-3 py-2 rounded-pill border border-border bg-white text-xs uppercase font-mono"
                />
                <button type="submit" className="px-4 py-2 rounded-pill bg-zinc-950 text-white text-xs font-bold hover:bg-zinc-800">
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>}
              {discountPercent > 0 && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200 flex justify-between">
                  <span>Code AD20 Applied (20% Off)</span>
                  <span className="font-mono">-₹{finalDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="space-y-2 text-xs text-text-secondary pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-text-primary">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express White-Glove Shipping</span>
                  <span className="font-mono text-text-primary">{remainingForFreeShipping === 0 ? 'FREE' : '₹350'}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-text-primary pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="font-mono text-xl text-zinc-950">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
