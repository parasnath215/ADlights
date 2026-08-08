'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2, CreditCard, Lock, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAdmin, CustomerOrder } from '../../context/AdminContext';
import { WarmUnderline } from '../../components/ui/WarmUnderline';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { createOrder } = useAdmin();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lucknow');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !address) return;

    setIsSubmitting(true);

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      image: item.variant.image || item.product.primaryImage
    }));

    setTimeout(() => {
      const order = createOrder({
        customerName,
        email,
        phone: phone || '+91 91198 65555',
        address,
        city,
        totalAmount: subtotal,
        status: 'Processing',
        items: orderItems
      });

      setCompletedOrder(order);
      setIsSubmitting(false);
      clearCart();
    }, 1500);
  };

  return (
    <div className="pt-28 pb-24 bg-bg-muted min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white border border-border text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            <Lock size={13} /> 256-Bit Encrypted Checkout
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-text-primary">
            Secure <WarmUnderline>Checkout</WarmUnderline>
          </h1>
        </div>

        {cart.length === 0 && !completedOrder ? (
          <div className="py-20 text-center bg-white rounded-card border border-border max-w-xl mx-auto">
            <h2 className="font-display font-bold text-xl text-text-primary uppercase">No items in checkout</h2>
            <p className="text-xs text-text-secondary mt-1">Please add items to your cart before proceeding.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-zinc-950 text-white font-bold text-xs uppercase"
            >
              Back to Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column: Shipping & Payment Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-card p-8 border border-border shadow-xl space-y-6">
              <h2 className="font-display font-bold text-xl uppercase tracking-tight text-text-primary pb-4 border-b border-border">
                1. Shipping & Contact Information
              </h2>

              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 91198 65555"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-primary uppercase block mb-1">City / State</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-text-primary uppercase block mb-1">Delivery Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="House / Flat No., Area, Pincode..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-muted text-sm text-text-primary focus:outline-none focus:border-zinc-950"
                  />
                </div>

                <div className="pt-6 border-t border-border">
                  <h2 className="font-display font-bold text-xl uppercase tracking-tight text-text-primary pb-4">
                    2. Payment Method
                  </h2>

                  <div className="space-y-3">
                    <label className={`flex items-center justify-between p-4 rounded-card border cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-zinc-950 bg-bg-muted font-bold' : 'border-border'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                        />
                        <Sparkles size={18} className="text-amber-600" />
                        <span>UPI / QR Code (GPay, PhonePe, Paytm, BHIM)</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">Fastest</span>
                    </label>

                    <label className={`flex items-center justify-between p-4 rounded-card border cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-zinc-950 bg-bg-muted font-bold' : 'border-border'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <CreditCard size={18} className="text-zinc-800" />
                        <span>Credit / Debit Card (Visa, Mastercard, RuPay)</span>
                      </div>
                    </label>

                    <label className={`flex items-center justify-between p-4 rounded-card border cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-zinc-950 bg-bg-muted font-bold' : 'border-border'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                        />
                        <ShieldCheck size={18} className="text-blue-600" />
                        <span>Pay on Delivery (Cash / UPI at doorstep)</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-pill bg-zinc-950 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-zinc-950 transition-colors flex items-center justify-center gap-2 mt-6"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Complete Purchase — ₹{subtotal.toLocaleString()}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-card p-6 border border-border shadow-xl space-y-6">
              <h3 className="font-display font-bold text-lg uppercase tracking-tight text-text-primary pb-4 border-b border-border">
                Order Summary ({cart.length} items)
              </h3>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 pb-3 border-b border-border/60">
                    <div className="relative w-14 h-14 rounded-card overflow-hidden bg-bg-muted shrink-0">
                      <Image src={item.variant.image || item.product.primaryImage} alt={item.product.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs text-text-primary truncate">{item.product.title}</h4>
                      <p className="text-[10px] text-text-secondary">Finish: {item.variant.name}</p>
                      <p className="text-[10px] text-text-secondary font-mono">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono font-bold text-xs text-text-primary">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-text-secondary pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-text-primary">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-emerald-700 font-bold">FREE EXPRESS</span>
                </div>
                <div className="flex justify-between text-base font-bold text-text-primary pt-2 border-t border-border">
                  <span>Total Amount</span>
                  <span className="font-mono text-lg text-zinc-950">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Confirmation Modal */}
        {completedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md animate-fade-in" />

            <div className="relative w-full max-w-lg bg-white rounded-card shadow-2xl z-10 border border-border p-8 text-center space-y-6 animate-slide-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">Order Confirmed</span>
                <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary mt-1">
                  Thank You For Your Order!
                </h2>
                <p className="text-xs text-text-secondary mt-2">
                  Order ID: <strong className="font-mono text-zinc-950">{completedOrder.id}</strong>
                </p>
              </div>

              <div className="p-4 rounded-card bg-bg-muted border border-border text-left text-xs space-y-2 font-medium">
                <p><strong>Customer:</strong> {completedOrder.customerName}</p>
                <p><strong>Delivery Address:</strong> {completedOrder.address}, {completedOrder.city}</p>
                <p><strong>Tracking Number:</strong> <span className="font-mono text-amber-700">{completedOrder.trackingNumber}</span></p>
                <p><strong>Total Paid:</strong> <span className="font-mono text-zinc-950 font-bold">₹{completedOrder.totalAmount.toLocaleString()}</span></p>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/admin/orders"
                  className="w-full py-3 rounded-pill bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800"
                >
                  View Order in Admin Dashboard
                </Link>
                <Link
                  href="/"
                  onClick={() => setCompletedOrder(null)}
                  className="w-full py-3 rounded-pill border border-border font-bold text-xs uppercase text-text-primary hover:bg-bg-muted"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
