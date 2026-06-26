export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  isBestSeller: boolean;
  isNew: boolean;
  stock: number;
  tags: string[];
  ingredients?: string;
  origin?: string;
  weight: string; // e.g., "100g", "250g", "500g"
  benefits?: string[];
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string; // Lucide icon name
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  image: string;
  spiceTags: string[];
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  weight: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  gstAmount: number;
  shippingAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "Razorpay" | "Stripe" | "UPI" | "COD";
  paymentStatus: "Pending" | "Paid" | "Failed";
  address: Address;
  date: string;
  trackingCode?: string;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  value: number;
  minOrder: number;
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  addresses: Address[];
  wishlist: string[]; // Product IDs
}
