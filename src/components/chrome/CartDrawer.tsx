'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, Truck, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AD20') {
      setDiscountPercent(0.2);
    }
  };

  const finalDiscount = subtotal * discountPercent;
  const finalTotal = Math.max(0, subtotal - finalDiscount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-border animate-slide-left">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-zinc-950" />
              <h2 className="font-display font-extrabold text-lg uppercase tracking-tight text-text-primary">
                Your Shopping Cart ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-bg-muted text-text-secondary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="p-4 bg-bg-muted border-b border-border text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium text-text-primary">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-amber-600" />
                {remainingForFreeShipping === 0 ? (
                  <strong className="text-emerald-700">Free Express Shipping Unlocked!</strong>
                ) : (
                  <span>Add <strong>₹{remainingForFreeShipping.toLocaleString()}</strong> for Free Express Shipping</span>
                )}
              </span>
              <span className="font-mono text-[10px]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-border">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-text-secondary">
                <p className="text-xs uppercase font-bold tracking-wider">Your cart is empty</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-pill bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const upgradesCost = item.selectedUpgrades.reduce((sum, u) => sum + u.price, 0);
                const itemUnitPrice = item.product.price + upgradesCost;

                return (
                  <div key={index} className="pt-6 first:pt-0 flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-card overflow-hidden bg-bg-muted border border-border shrink-0">
                      <Image
                        src={item.variant.image || item.product.primaryImage}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display font-bold text-sm text-text-primary truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <span className="text-[11px] text-text-secondary block">
                        Finish: {item.variant.name}
                      </span>

                      {item.selectedUpgrades.length > 0 && (
                        <div className="text-[10px] text-amber-700 mt-0.5">
                          Upgrades: {item.selectedUpgrades.map(u => u.title).join(', ')}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-pill bg-bg-muted">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="px-2 py-0.5 text-text-secondary hover:text-text-primary font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono font-bold text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="px-2 py-0.5 text-text-secondary hover:text-text-primary font-bold text-xs"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono font-bold text-sm text-text-primary">
                          ₹{(itemUnitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Panel */}
          {cart.length > 0 && (
            <div className="p-6 bg-bg-muted border-t border-border space-y-4">
              <form onSubmit={applyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (AD20)"
                  className="flex-1 px-3 py-2 rounded-pill border border-border text-xs bg-white uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-pill bg-zinc-950 text-white text-xs font-bold"
                >
                  Apply
                </button>
              </form>

              {discountPercent > 0 && (
                <div className="p-2 rounded bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200 flex justify-between">
                  <span>20% Discount Applied</span>
                  <span className="font-mono">-₹{finalDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-text-primary">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-text-primary pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="font-mono text-xl text-zinc-950">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-400 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 rounded-pill border border-border text-center text-xs font-bold uppercase text-text-primary hover:bg-white transition-colors block"
                >
                  View Shopping Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
