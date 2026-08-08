'use client';

import React from 'react';
import { CartProvider } from '../../context/CartContext';
import { AdminProvider } from '../../context/AdminContext';
import { MainLayoutContent } from './MainLayoutContent';

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AdminProvider>
      <CartProvider>
        <MainLayoutContent>{children}</MainLayoutContent>
      </CartProvider>
    </AdminProvider>
  );
};
