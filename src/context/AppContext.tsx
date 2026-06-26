import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Category, Recipe, Blog, Coupon, User, Address, CartItem, Order, OrderItem } from "../types";
import { CATEGORIES, RECIPES, BLOGS } from "../data";

interface AppContextType {
  user: User | null;
  token: string | null;
  addresses: Address[];
  wishlist: string[];
  cart: CartItem[];
  products: Product[];
  categories: Category[];
  recipes: Recipe[];
  blogs: Blog[];
  coupons: Coupon[];
  orders: Order[];
  appliedCoupon: Coupon | null;
  isLoading: boolean;
  error: string | null;
  
  // API Core
  apiFetch: (endpoint: string, options?: RequestInit) => Promise<any>;
  
  // Auth Functions
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setError: (err: string | null) => void;
  
  // Cart Functions
  addToCart: (product: Product, quantity: number, weight: string) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateCartQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Wishlist
  toggleWishlist: (productId: string) => Promise<void>;
  
  // Addresses
  addAddress: (address: Omit<Address, "id" | "isDefault">) => Promise<boolean>;
  deleteAddress: (id: string) => Promise<void>;
  
  // Reviews
  submitReview: (productId: string, userName: string, rating: number, comment: string) => Promise<boolean>;
  
  // Order functions
  placeOrder: (paymentMethod: "Razorpay" | "Stripe" | "UPI" | "COD", addressId: string) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: string, paymentStatus?: string) => Promise<boolean>;
  
  // Admin Product CRUD
  createProduct: (productData: any) => Promise<boolean>;
  updateProduct: (id: string, productData: any) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  
  // Admin Coupon
  createCoupon: (couponData: any) => Promise<boolean>;
  
  // Admin Analytics
  getAnalytics: () => Promise<any>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("sv_token"));
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setInnerError] = useState<string | null>(null);

  const setError = (err: string | null) => {
    setInnerError(err);
    if (err) {
      setTimeout(() => setInnerError(null), 4000);
    }
  };

  // Synced from data.ts
  const categories = CATEGORIES;
  const recipes = RECIPES;
  const blogs = BLOGS;

  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };

    const response = await fetch(endpoint, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || "An API error occurred");
    }

    return response.json();
  };

  // Load products, coupons, and check profile on start
  useEffect(() => {
    const initAppData = async () => {
      try {
        setIsLoading(true);
        // Load products
        const productsData = await apiFetch("/api/products");
        setProducts(productsData);

        // Load coupons
        const couponsData = await apiFetch("/api/coupons");
        setCoupons(couponsData);

        // Load auth session if token exists
        if (token) {
          try {
            const authData = await apiFetch("/api/auth/me");
            setUser(authData.user);
            // Load orders
            const ordersData = await apiFetch("/api/orders");
            setOrders(ordersData);
          } catch (e) {
            console.log("Session expired or invalid token, clearing...");
            localStorage.removeItem("sv_token");
            setToken(null);
            setUser(null);
          }
        }
      } catch (e: any) {
        console.error("Initialization error:", e);
        setError("Could not connect to the backend server.");
      } finally {
        setIsLoading(false);
      }
    };

    initAppData();
  }, [token]);

  // Load Cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("sv_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.log("Error loading cart", e);
      }
    }
  }, []);

  // Save Cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("sv_cart", JSON.stringify(newCart));
  };

  // Auth helper methods
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem("sv_token", data.token);
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (e: any) {
      setError(e.message || "Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const data = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });
      localStorage.setItem("sv_token", data.token);
      setToken(data.token);
      setUser(data.user);
      return true;
    } catch (e: any) {
      setError(e.message || "Registration failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("sv_token");
    setToken(null);
    setUser(null);
    setOrders([]);
    setAppliedCoupon(null);
    saveCart([]);
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number, weight: string) => {
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex(
      (item) => item.product.id === product.id && item.weight === weight
    );

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, quantity, weight });
    }
    saveCart(updatedCart);
  };

  const removeFromCart = (productId: string, weight: string) => {
    const updatedCart = cart.filter(
      (item) => !(item.product.id === productId && item.weight === weight)
    );
    saveCart(updatedCart);
  };

  const updateCartQuantity = (productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }
    const updatedCart = cart.map((item) => {
      if (item.product.id === productId && item.weight === weight) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.active);
    if (!coupon) return false;
    setAppliedCoupon(coupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = async (productId: string) => {
    if (!user) {
      setError("Please login to manage your wishlist.");
      return;
    }
    try {
      const data = await apiFetch("/api/auth/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId })
      });
      setUser({ ...user, wishlist: data.wishlist });
    } catch (e: any) {
      setError(e.message || "Could not update wishlist");
    }
  };

  // Addresses
  const addAddress = async (addrData: Omit<Address, "id" | "isDefault">) => {
    if (!user) return false;
    try {
      const data = await apiFetch("/api/auth/addresses", {
        method: "POST",
        body: JSON.stringify(addrData)
      });
      setUser({ ...user, addresses: data.addresses });
      return true;
    } catch (e: any) {
      setError(e.message || "Could not add address");
      return false;
    }
  };

  const deleteAddress = async (id: string) => {
    if (!user) return;
    try {
      const data = await apiFetch(`/api/auth/addresses/${id}`, {
        method: "DELETE"
      });
      setUser({ ...user, addresses: data.addresses });
    } catch (e: any) {
      setError(e.message || "Could not delete address");
    }
  };

  // Submit product reviews
  const submitReview = async (productId: string, userName: string, rating: number, comment: string) => {
    try {
      const data = await apiFetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        body: JSON.stringify({ userName, rating, comment })
      });
      // Update local products state with updated product reviews
      setProducts(products.map((p) => (p.id === productId ? data.product : p)));
      return true;
    } catch (e: any) {
      setError(e.message || "Failed to submit review");
      return false;
    }
  };

  // Orders and Checkout
  const placeOrder = async (paymentMethod: "Razorpay" | "Stripe" | "UPI" | "COD", addressId: string) => {
    if (!user) {
      setError("Please login to place an order");
      return null;
    }

    const address = user.addresses.find((a) => a.id === addressId);
    if (!address) {
      setError("Delivery address is required");
      return null;
    }

    // Compute prices
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === "percentage") {
        discount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else {
        discount = appliedCoupon.value;
      }
    }
    const gst = Math.round((subtotal - discount) * 0.05); // 5% spice GST in India
    const shipping = subtotal - discount > 499 ? 0 : 50;
    const finalTotal = subtotal - discount + gst + shipping;

    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      weight: item.weight,
      image: item.product.image
    }));

    try {
      const data = await apiFetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          items: orderItems,
          totalAmount: finalTotal,
          discountAmount: discount,
          gstAmount: gst,
          shippingAmount: shipping,
          paymentMethod,
          address
        })
      });

      // Clear local state
      clearCart();
      // Sync orders state
      const ordersData = await apiFetch("/api/orders");
      setOrders(ordersData);

      // Sync products state (since stocks were updated)
      const productsData = await apiFetch("/api/products");
      setProducts(productsData);

      return data.order;
    } catch (e: any) {
      setError(e.message || "Failed to place order");
      return null;
    }
  };

  const updateOrderStatus = async (orderId: string, status: string, paymentStatus?: string) => {
    try {
      const data = await apiFetch(`/api/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ status, paymentStatus })
      });
      // Sync orders
      const ordersData = await apiFetch("/api/orders");
      setOrders(ordersData);
      return true;
    } catch (e: any) {
      setError(e.message || "Could not update order status");
      return false;
    }
  };

  // Product CRUD
  const createProduct = async (productData: any) => {
    try {
      const data = await apiFetch("/api/products", {
        method: "POST",
        body: JSON.stringify(productData)
      });
      const productsData = await apiFetch("/api/products");
      setProducts(productsData);
      return true;
    } catch (e: any) {
      setError(e.message || "Failed to create product");
      return false;
    }
  };

  const updateProduct = async (id: string, productData: any) => {
    try {
      await apiFetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(productData)
      });
      const productsData = await apiFetch("/api/products");
      setProducts(productsData);
      return true;
    } catch (e: any) {
      setError(e.message || "Failed to update product");
      return false;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await apiFetch(`/api/products/${id}`, {
        method: "DELETE"
      });
      const productsData = await apiFetch("/api/products");
      setProducts(productsData);
      return true;
    } catch (e: any) {
      setError(e.message || "Failed to delete product");
      return false;
    }
  };

  // Coupon create
  const createCoupon = async (couponData: any) => {
    try {
      await apiFetch("/api/coupons", {
        method: "POST",
        body: JSON.stringify(couponData)
      });
      const couponsData = await apiFetch("/api/coupons");
      setCoupons(couponsData);
      return true;
    } catch (e: any) {
      setError(e.message || "Failed to create coupon");
      return false;
    }
  };

  // Admin Analytics
  const getAnalytics = async () => {
    try {
      return await apiFetch("/api/analytics");
    } catch (e: any) {
      setError(e.message || "Failed to retrieve analytics");
      return null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        addresses: user?.addresses || [],
        wishlist: user?.wishlist || [],
        cart,
        products,
        categories,
        recipes,
        blogs,
        coupons,
        orders,
        appliedCoupon,
        isLoading,
        error,
        apiFetch,
        login,
        register,
        logout,
        setError,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        addAddress,
        deleteAddress,
        submitReview,
        placeOrder,
        updateOrderStatus,
        createProduct,
        updateProduct,
        deleteProduct,
        createCoupon,
        getAnalytics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
