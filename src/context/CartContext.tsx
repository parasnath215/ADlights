'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, UpgradeOption, CartItem } from '../types/commerce';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  currency: string;
  setCurrency: (c: string) => void;
  language: string;
  setLanguage: (l: string) => void;
  addToCart: (product: Product, variant?: ProductVariant, selectedUpgrades?: UpgradeOption[], quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currency, setCurrency] = useState<string>('INR (₹)');
  const [language, setLanguage] = useState<string>('EN');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const freeShippingThreshold = 5999;

  // Load saved cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('adlights_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('adlights_cart', JSON.stringify(cart));
    } catch {
      // Fallback
    }
  }, [cart]);

  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    selectedUpgrades: UpgradeOption[] = [],
    quantity: number = 1
  ) => {
    const targetVariant = variant || product.variants[0];
    
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.variant.id === targetVariant.id &&
        JSON.stringify(item.selectedUpgrades.map(u => u.id).sort()) === JSON.stringify(selectedUpgrades.map(u => u.id).sort())
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, variant: targetVariant, selectedUpgrades, quantity }];
      }
    });

    setToastMessage(`Added "${product.title}" to cart.`);
    setTimeout(() => setToastMessage(null), 3500);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const copy = [...prev];
      copy[index].quantity = quantity;
      return copy;
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    const upgradesTotal = item.selectedUpgrades.reduce((sum, u) => sum + u.price, 0);
    return total + (item.product.price + upgradesTotal) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        currency,
        setCurrency,
        language,
        setLanguage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        freeShippingThreshold,
        toastMessage,
        setToastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
