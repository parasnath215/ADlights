export interface ProductSpec {
  icon: string; // lucide icon name
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  image: string;
}

export interface UpgradeOption {
  id: string;
  title: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: 'Architectural' | 'Pendant' | 'Wall Sconces' | 'Table & Desk' | 'Outdoor IP65';
  badge?: 'New' | 'Sale' | 'Best Seller' | 'Limited Edition';
  inStock: boolean;
  stockCount: number;
  primaryImage: string;
  secondaryImage: string;
  gallery: string[];
  description: string;
  variants: ProductVariant[];
  specs: ProductSpec[];
  upgrades: UpgradeOption[];
  highlights: string[];
  features: string[];
  faqs: { q: string; a: string }[];
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  selectedUpgrades: UpgradeOption[];
  quantity: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  publication: string;
  logo: string;
}
