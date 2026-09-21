'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const dropdownCloseTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const { wishlist } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);
    setIsProductsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownCloseTimer.current = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 150);
  };

  const subCategories = [
    { label: 'Hanging Lights', href: '/shop?category=Pendant' },
    { label: 'Wall Lights', href: '/shop?category=Wall Sconces' },
    { label: 'Chandeliers', href: '/shop?category=Pendant' },
    { label: 'Table & Floor Lamps', href: '/shop?category=Table & Desk' },
    { label: 'Facade & Architectural', href: '/shop?category=Architectural' },
    { label: 'Outdoor IP65', href: '/shop?category=Outdoor IP65' }
  ];

  return (
    <header
      className={`w-full z-40 transition-all duration-300 fixed left-0 top-0 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-xs py-3 text-text-primary'
          : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative h-20 w-72 sm:w-80 transition-transform group-hover:scale-105">
            <Image
              src={isScrolled ? '/images/aurora-decor-logo.png' : '/images/logo-1.png'}
              alt="AURORA DECOR LIGHTS"
              fill
              className="object-contain transition-all duration-300"
              priority
            />
          </div>
        </Link>

        {/* Flex spacer to push menu right (space between logo and home) */}
        <div className="flex-1 hidden lg:block"></div>

        {/* Right-Aligned Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0">
          <Link href="/" className="relative py-1 group">
            Home
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
          </Link>

          {/* Our Products with Sub-Categories Dropdown */}
          <div
            className="relative py-1 group cursor-pointer"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="flex items-center gap-1 group">
              <span>Our Products</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </div>

            {/* Dropdown Menu */}
            {isProductsDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-zinc-950 text-white rounded-card shadow-2xl p-4 border border-zinc-800 space-y-2 animate-fade-in text-xs uppercase tracking-wider">
                {subCategories.map((sub, idx) => (
                  <Link
                    key={idx}
                    href={sub.href}
                    className="block p-2.5 rounded-lg hover:bg-zinc-900 hover:text-amber-400 font-bold transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-zinc-800">
                  <Link
                    href="/shop"
                    className="block p-2 text-center rounded-pill bg-amber-400 text-zinc-950 font-extrabold"
                  >
                    View All Products →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="relative py-1 group">
            Our Story
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
          </Link>

          <Link
            href="/shop?badge=Best Seller"
            className={`px-4 py-1.5 rounded-pill text-[10px] font-extrabold uppercase tracking-widest transition-all duration-200 ${
              isScrolled
                ? 'border border-zinc-950 hover:bg-zinc-950 hover:text-white'
                : 'border border-white/80 bg-white/10 hover:bg-white hover:text-zinc-950 backdrop-blur-xs'
            }`}
          >
            Best Sellers ✦
          </Link>
        </nav>

        {/* Right Action Cluster: Search Bar & Icons */}
        <div className="flex items-center gap-5 shrink-0">
          
          {/* Search Bar (Desktop - Mini Bar) */}
          <div 
            className={`hidden lg:flex items-center relative backdrop-blur-sm rounded-sm border transition-colors cursor-pointer ${
              isScrolled
                ? 'bg-zinc-100/80 border-zinc-200 text-zinc-800 focus-within:bg-white'
                : 'bg-white/10 border-white/20 text-white focus-within:bg-white focus-within:text-black'
            }`}
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={16} className="absolute left-2.5 text-current opacity-70 pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-[120px] bg-transparent outline-none py-1.5 pl-8 pr-3 text-xs placeholder:text-current placeholder:opacity-70 cursor-pointer"
              readOnly
            />
          </div>

          {/* Search Icon (Mobile) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="lg:hidden p-2 hover:opacity-75 transition-opacity"
            aria-label="Search lighting catalog"
          >
            <Search size={22} />
          </button>

          {/* Wishlist Icon (Flipkart Style) */}
          <Link
            href="/wishlist"
            className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart size={22} />
            <span className="text-sm font-semibold hidden xl:block">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-black text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon (Flipkart Style) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={22} />
            <span className="text-sm font-semibold hidden xl:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-black text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden hover:opacity-75"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-zinc-950 text-white p-6 shadow-xl border-t border-zinc-800 animate-slide-up">
          <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-zinc-800">
              Home
            </Link>
            <div className="py-2 border-b border-zinc-800">
              <span className="text-amber-400 block mb-2 font-extrabold">Our Products</span>
              <div className="pl-4 space-y-2 text-xs font-medium">
                {subCategories.map((sub, idx) => (
                  <Link key={idx} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="block py-1 text-zinc-300 hover:text-white">
                    • {sub.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-zinc-800">
              Our Story
            </Link>
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-zinc-800 flex justify-between items-center">
              <span>Saved Wishlist</span>
              <span className="font-mono text-amber-400">({wishlist.length})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
