'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Article } from '../types/commerce';
import { PRODUCTS as INITIAL_PRODUCTS, ARTICLES as INITIAL_ARTICLES } from '../data/products';

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
  trackingNumber?: string;
  items: OrderItem[];
}

interface AdminContextType {
  products: Product[];
  articles: Article[];
  orders: CustomerOrder[];
  wishlist: string[]; // array of product IDs
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, updated: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  updateOrderStatus: (orderId: string, status: CustomerOrder['status'], trackingNumber?: string) => void;
  createOrder: (order: Omit<CustomerOrder, 'id' | 'date'>) => CustomerOrder;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  syncWooCommerce: () => Promise<void>;
  isSyncing: boolean;
}

const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ORD-2026-901',
    customerName: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 98765 43210',
    address: '42 Marine Drive, Suite 8A',
    city: 'Mumbai',
    totalAmount: 1100,
    status: 'Shipped',
    date: '2026-08-07',
    trackingNumber: 'AWB-9874102',
    items: [
      {
        productId: 'aurora-j019-6w',
        title: 'Aurora J019-6W IP54 Recessed LED Foot Light',
        price: 550,
        quantity: 2,
        image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/08/J-019-2.png'
      }
    ]
  },
  {
    id: 'ORD-2026-902',
    customerName: 'Priya Sundaram',
    email: 'priya.s@example.com',
    phone: '+91 98112 33445',
    address: '15 Lavelle Road',
    city: 'Bengaluru',
    totalAmount: 4950,
    status: 'Processing',
    date: '2026-08-08',
    trackingNumber: 'AWB-4512980',
    items: [
      {
        productId: 'aurora-luxe-3-light-gold',
        title: 'Aurora Luxe 3-Light Gold Crystal Globe Cluster Chandelier',
        price: 4950,
        quantity: 1,
        image: 'https://adlights.stellarweb.in/wp-content/uploads/2026/07/HL-109-3.png'
      }
    ]
  }
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [orders, setOrders] = useState<CustomerOrder[]>(INITIAL_ORDERS);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Load local storage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('adlights_admin_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedArticles = localStorage.getItem('adlights_admin_articles');
      if (savedArticles) setArticles(JSON.parse(savedArticles));

      const savedOrders = localStorage.getItem('adlights_admin_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedWishlist = localStorage.getItem('adlights_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // Fallback
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('adlights_admin_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('adlights_admin_articles', JSON.stringify(articles));
    } catch {}
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('adlights_admin_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('adlights_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const addProduct = (newP: Omit<Product, 'id'>) => {
    const p: Product = {
      ...newP,
      id: `custom-${Date.now()}`
    };
    setProducts(prev => [p, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addArticle = (newA: Omit<Article, 'id'>) => {
    const a: Article = {
      ...newA,
      id: `art-${Date.now()}`
    };
    setArticles(prev => [a, ...prev]);
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: CustomerOrder['status'], trackingNumber?: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status, trackingNumber: trackingNumber || o.trackingNumber } : o))
    );
  };

  const createOrder = (orderData: Omit<CustomerOrder, 'id' | 'date'>): CustomerOrder => {
    const newOrder: CustomerOrder = {
      ...orderData,
      id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      trackingNumber: `AWB-${Math.floor(1000000 + Math.random() * 9000000)}`
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const syncWooCommerce = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('https://adlights.stellarweb.in/wp-json/wp/v2/product?per_page=100');
      if (res.ok) {
        const wpData = await res.json();
        // Soft refresh products state
        console.log('Synced WooCommerce items:', wpData.length);
      }
    } catch {
      // Fallback
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        articles,
        orders,
        wishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        addArticle,
        updateArticle,
        deleteArticle,
        updateOrderStatus,
        createOrder,
        toggleWishlist,
        isInWishlist,
        syncWooCommerce,
        isSyncing
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
