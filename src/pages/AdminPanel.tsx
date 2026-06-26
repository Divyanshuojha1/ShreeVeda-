import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SEOHead } from "../components/SEOHead";
import { ShieldCheck, BarChart3, Package, ShoppingCart, Percent, AlertTriangle, Edit, Trash2, Plus, ArrowLeft, Send, Check } from "lucide-react";

export const AdminPanel: React.FC = () => {
  const { user, products, orders, coupons, createProduct, updateProduct, deleteProduct, createCoupon, updateOrderStatus, setError } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "coupons">("dashboard");
  const [analytics, setAnalytics] = useState<any | null>(null);

  // Form States: Products CRUD
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("ground-spices");
  const [prodPrice, setProdPrice] = useState("");
  const [prodOldPrice, setProdOldPrice] = useState("");
  const [prodStock, setProdStock] = useState("");
  const [prodWeight, setProdWeight] = useState("250g");
  const [prodDesc, setProdDesc] = useState("");
  const [prodIngredients, setProdIngredients] = useState("");
  const [prodOrigin, setProdOrigin] = useState("");
  const [prodBenefits, setProdBenefits] = useState("");
  const [prodImage, setProdImage] = useState("");

  // Form States: Coupon creator
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [cpCode, setCpCode] = useState("");
  const [cpType, setCpType] = useState<"percentage" | "fixed">("percentage");
  const [cpValue, setCpValue] = useState("");
  const [cpMin, setCpMin] = useState("");

  // Guard routing - Admins only
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // Load analytics
  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("sv_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (e) {
      console.log("Could not fetch analytics", e);
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchAnalytics();
    }
  }, [user, products, orders, coupons]);

  if (!user || user.role !== "admin") {
    return (
      <div className="bg-ivory min-h-[70vh] flex flex-col items-center justify-center p-4">
        <h1 className="font-serif text-2xl text-kashmiri font-bold">Unauthorized Portal</h1>
        <p className="text-sm text-charcoal/50 mt-2">Only accredited Shree Veda administrators can view this module.</p>
        <Link to="/login" className="bg-cinnamon text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest mt-4">
          Login as Administrator
        </Link>
      </div>
    );
  }

  // Handle Product CRUD submit
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice || !prodStock || !prodDesc.trim()) {
      setError("Please complete all required product fields.");
      return;
    }

    const payload = {
      name: prodName,
      category: prodCategory,
      price: Number(prodPrice),
      oldPrice: prodOldPrice ? Number(prodOldPrice) : undefined,
      stock: Number(prodStock),
      weight: prodWeight,
      description: prodDesc,
      ingredients: prodIngredients,
      origin: prodOrigin,
      benefits: prodBenefits.split(",").map((b) => b.trim()).filter(Boolean),
      image: prodImage || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600"
    };

    let ok = false;
    if (editingProductId) {
      ok = await updateProduct(editingProductId, payload);
    } else {
      ok = await createProduct(payload);
    }

    if (ok) {
      resetProductForm();
      fetchAnalytics();
    }
  };

  const resetProductForm = () => {
    setShowProductForm(false);
    setEditingProductId(null);
    setProdName("");
    setProdCategory("ground-spices");
    setProdPrice("");
    setProdOldPrice("");
    setProdStock("");
    setProdWeight("250g");
    setProdDesc("");
    setProdIngredients("");
    setProdOrigin("");
    setProdBenefits("");
    setProdImage("");
  };

  const handleEditProduct = (prod: any) => {
    setEditingProductId(prod.id);
    setProdName(prod.name);
    setProdCategory(prod.category);
    setProdPrice(prod.price.toString());
    setProdOldPrice(prod.oldPrice ? prod.oldPrice.toString() : "");
    setProdStock(prod.stock.toString());
    setProdWeight(prod.weight);
    setProdDesc(prod.description);
    setProdIngredients(prod.ingredients || "");
    setProdOrigin(prod.origin || "");
    setProdBenefits(prod.benefits ? prod.benefits.join(", ") : "");
    setProdImage(prod.image);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to retire this organic harvest from catalog?")) {
      await deleteProduct(id);
      fetchAnalytics();
    }
  };

  // Handle Coupon Submit
  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpCode.trim() || !cpValue) return;

    const ok = await createCoupon({
      code: cpCode.trim().toUpperCase(),
      discountType: cpType,
      value: Number(cpValue),
      minOrder: Number(cpMin) || 0,
      active: true
    });

    if (ok) {
      setShowCouponForm(false);
      setCpCode("");
      setCpType("percentage");
      setCpValue("");
      setCpMin("");
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string, paymentStatus?: string) => {
    await updateOrderStatus(orderId, status, paymentStatus);
    fetchAnalytics();
  };

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead title="Admin Operations Console | Shree Veda" description="Acme back-office management console for inventory controls, analytics, coupons, and orders." />

      <div className="max-w-7xl mx-auto">
        {/* Title board */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-cinnamon/10 pb-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-kashmiri flex items-center gap-1">
              <ShieldCheck size={14} /> Backoffice Console
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight mt-1">
              Veda Admin Portal
            </h1>
          </div>
          <Link
            to="/dashboard"
            className="text-xs font-bold uppercase tracking-wider text-cinnamon hover:text-saffron flex items-center gap-1 border border-cinnamon/20 hover:border-cinnamon rounded-lg px-3.5 py-2.5 transition-colors"
          >
            <ArrowLeft size={14} /> My Personal Account
          </Link>
        </div>

        {/* Console grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Rail: Modules selection */}
          <nav className="lg:col-span-3 flex flex-col gap-2.5 bg-white border border-cinnamon/10 rounded-[24px] p-5 shrink-0 font-bold uppercase text-xs tracking-widest shadow-sm">
            {[
              { id: "dashboard", label: "Sales Analytics", icon: BarChart3 },
              { id: "products", label: "Spices Catalog CRUD", icon: Package },
              { id: "orders", label: "Orders Dispatch", icon: ShoppingCart },
              { id: "coupons", label: "Discount Coupons", icon: Percent }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    resetProductForm();
                    setShowCouponForm(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-left ${
                    activeTab === tab.id
                      ? "bg-kashmiri text-white shadow-md"
                      : "hover:bg-cinnamon/5 text-charcoal/70 hover:text-kashmiri"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Area: Workspace viewport */}
          <main className="lg:col-span-9 bg-white border border-cinnamon/10 rounded-[32px] p-6 md:p-8 shadow-sm min-h-[60vh]">
            {/* Viewport 1: Analytics and Overview */}
            {activeTab === "dashboard" && (
              <div className="flex flex-col gap-8 animate-fade-in-up">
                <h2 className="font-serif text-2xl font-bold text-cinnamon border-b border-cinnamon/5 pb-3">
                  Acreage Performance & Overview
                </h2>

                {analytics ? (
                  <div className="flex flex-col gap-8">
                    {/* Stat boxes */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="p-5 rounded-[24px] border border-cinnamon/10 bg-cinnamon/5 shadow-sm text-center">
                        <span className="text-[10px] text-charcoal/40 font-bold uppercase block tracking-wider mb-1">Total Sourced Sales</span>
                        <strong className="text-xl md:text-2xl font-serif text-cinnamon">₹{analytics.summary.totalSales}</strong>
                      </div>
                      <div className="p-5 rounded-[24px] border border-cinnamon/10 bg-cinnamon/5 shadow-sm text-center">
                        <span className="text-[10px] text-charcoal/40 font-bold uppercase block tracking-wider mb-1">Incoming Orders</span>
                        <strong className="text-xl md:text-2xl font-serif text-cinnamon">{analytics.summary.totalOrders} total</strong>
                      </div>
                      <div className="p-5 rounded-[24px] border border-cinnamon/10 bg-cinnamon/5 shadow-sm text-center">
                        <span className="text-[10px] text-charcoal/40 font-bold uppercase block tracking-wider mb-1">Co-op Customers</span>
                        <strong className="text-xl md:text-2xl font-serif text-cinnamon">{analytics.summary.totalCustomers} guests</strong>
                      </div>
                      <div className="p-5 rounded-[24px] border border-kashmiri/20 bg-kashmiri/5 shadow-sm text-center">
                        <span className="text-[10px] text-kashmiri/60 font-bold uppercase block tracking-wider mb-1">Low-Stock Alerts</span>
                        <strong className="text-xl md:text-2xl font-serif text-kashmiri flex items-center justify-center gap-1.5">
                          <AlertTriangle size={16} />
                          {analytics.summary.lowStockAlerts} items
                        </strong>
                      </div>
                    </div>

                    {/* Low Stock Grid */}
                    {analytics.lowStockProducts.length > 0 && (
                      <div className="border border-kashmiri/20 bg-kashmiri/5 rounded-[24px] p-5 flex flex-col gap-3">
                        <h3 className="font-serif text-lg font-bold text-kashmiri flex items-center gap-1.5">
                          <AlertTriangle size={18} /> Low Stock Warnings (Threshold &lt;= 15 pouches)
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {analytics.lowStockProducts.map((p: any) => (
                            <div key={p.id} className="bg-white border border-kashmiri/10 p-3.5 rounded-xl flex items-center gap-3 shadow-sm">
                              <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded-lg" />
                              <div className="truncate">
                                <strong className="text-xs text-charcoal block truncate leading-tight">{p.name}</strong>
                                <span className="text-[10px] text-kashmiri font-bold">Only {p.stock} pouches left</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Simple Product sales chart simulation */}
                    <div>
                      <h3 className="font-serif text-lg font-bold text-cinnamon mb-4">Gourmet Volume Sells</h3>
                      <div className="flex flex-col gap-3 border border-cinnamon/10 rounded-[24px] p-5 bg-white shadow-sm">
                        {Object.entries(analytics.productSales).map(([prodName, qty]: any) => (
                          <div key={prodName} className="flex items-center gap-4 text-xs font-semibold">
                            <span className="w-40 truncate font-bold text-charcoal/70">{prodName}</span>
                            <div className="flex-1 bg-gray-100 h-3.5 rounded-full overflow-hidden">
                              <div className="bg-saffron h-full rounded-full" style={{ width: `${Math.min(100, (qty / 10) * 100)}%` }}></div>
                            </div>
                            <span className="w-12 text-right text-cinnamon font-extrabold">{qty} bags</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-charcoal/40 italic">Loading dynamic co-op statistics...</p>
                )}
              </div>
            )}

            {/* Viewport 2: Products CRUD catalog */}
            {activeTab === "products" && (
              <div className="flex flex-col gap-6 animate-fade-in-up">
                <div className="flex justify-between items-center border-b border-cinnamon/5 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-cinnamon">
                    Spice Stock Control Panel
                  </h2>
                  {!showProductForm && (
                    <button
                      onClick={() => setShowProductForm(true)}
                      className="bg-kashmiri hover:bg-cinnamon text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm transition-all"
                    >
                      <Plus size={14} /> Add Spice Crop
                    </button>
                  )}
                </div>

                {/* CRUD Form */}
                {showProductForm && (
                  <form onSubmit={handleProductSubmit} className="p-6 border border-cinnamon/10 bg-ivory rounded-[24px] flex flex-col gap-4 text-sm shadow-inner">
                    <h3 className="font-serif text-lg font-bold text-cinnamon mb-2">
                      {editingProductId ? "Modify Harvest Record" : "Add New Harvest To Catalog"}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Spice Display Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Malabar Green Cardamom"
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Category Sourcing *</label>
                        <select
                          value={prodCategory}
                          onChange={(e) => setProdCategory(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none cursor-pointer font-semibold text-charcoal/70"
                        >
                          <option value="ground-spices">Ground Spices</option>
                          <option value="whole-spices">Whole Spices</option>
                          <option value="blend-masalas">Blend Masalas</option>
                          <option value="gift-boxes">Premium Gift Boxes</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Price (INR) *</label>
                        <input
                          type="number"
                          required
                          placeholder="250"
                          value={prodPrice}
                          onChange={(e) => setProdPrice(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Old Compare Price</label>
                        <input
                          type="number"
                          placeholder="300"
                          value={prodOldPrice}
                          onChange={(e) => setProdOldPrice(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Stock Quantity *</label>
                        <input
                          type="number"
                          required
                          placeholder="100"
                          value={prodStock}
                          onChange={(e) => setProdStock(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Standard Pack Weight *</label>
                        <input
                          type="text"
                          required
                          placeholder="250g"
                          value={prodWeight}
                          onChange={(e) => setProdWeight(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">Detailed Sourced description *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Write detailed crop story, Curcumin guarantee percentage, scent aroma..."
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Botanical Ingredients Sourced</label>
                        <input
                          type="text"
                          placeholder="100% Sun-dried cardamom pods"
                          value={prodIngredients}
                          onChange={(e) => setProdIngredients(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Specific Farm Origin Sourced</label>
                        <input
                          type="text"
                          placeholder="Idukki Valley, Kerala, India"
                          value={prodOrigin}
                          onChange={(e) => setProdOrigin(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Therapeutic Benefits (Comma-separated)</label>
                        <input
                          type="text"
                          placeholder="Improves gut speed, Rich in antioxidants"
                          value={prodBenefits}
                          onChange={(e) => setProdBenefits(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Display Image Link URL</label>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={prodImage}
                          onChange={(e) => setProdImage(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                      <button
                        type="button"
                        onClick={resetProductForm}
                        className="px-4 py-2 border border-cinnamon/10 rounded-lg text-xs font-bold text-charcoal/50 uppercase tracking-widest hover:bg-cinnamon/5"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-kashmiri hover:bg-cinnamon text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
                      >
                        <Send size={12} /> {editingProductId ? "Save Changes" : "Lock Sourced Harvest"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Products Table */}
                <div className="overflow-x-auto border border-cinnamon/10 rounded-[24px] shadow-sm">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-cinnamon/5 border-b border-cinnamon/10 text-cinnamon font-bold font-serif text-sm">
                        <th className="p-4">Spice Sourced</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">SKU Price</th>
                        <th className="p-4">Acre Stock</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cinnamon/5 text-charcoal/80 font-sans">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-ivory/50 transition-colors">
                          <td className="p-4 flex items-center gap-3 font-semibold text-cinnamon">
                            <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-9 h-9 object-cover rounded-lg" />
                            {p.name}
                          </td>
                          <td className="p-4 uppercase tracking-wider text-[10px] font-extrabold text-olive">{p.category.replace("-", " ")}</td>
                          <td className="p-4 font-bold">₹{p.price}</td>
                          <td className="p-4">
                            <span className={`font-bold ${p.stock <= 15 ? "text-kashmiri animate-pulse" : "text-charcoal"}`}>
                              {p.stock} bags
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center gap-2 justify-center">
                              <button
                                onClick={() => handleEditProduct(p)}
                                className="p-1.5 text-gray-400 hover:text-cinnamon transition-colors"
                                title="Edit Harvest Spec"
                              >
                                <Edit size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 text-gray-400 hover:text-kashmiri transition-colors"
                                title="Delete harvest record"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Viewport 3: Orders dispatch management */}
            {activeTab === "orders" && (
              <div className="flex flex-col gap-6 animate-fade-in-up">
                <h2 className="font-serif text-2xl font-bold text-cinnamon border-b border-cinnamon/5 pb-3">
                  Acre Dispatch & Delivery Control
                </h2>

                <div className="flex flex-col gap-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-cinnamon/10 p-5 rounded-[24px] flex flex-col gap-4 bg-white hover:shadow-md transition-shadow">
                      {/* Meta header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cinnamon/5 pb-4">
                        <div>
                          <span className="text-xs text-charcoal/40 font-semibold">Ordered: {new Date(order.date).toLocaleString()}</span>
                          <h3 className="font-serif text-base font-bold text-cinnamon mt-0.5">ID: {order.id}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          {/* Order Status Select dropdown */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-charcoal/40 font-semibold">Status:</span>
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              className="bg-white border border-cinnamon/10 rounded-lg p-1.5 font-bold text-cinnamon outline-none cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                          {/* Payment status select dropdown */}
                          <div className="flex items-center gap-1.5 border-l border-cinnamon/10 pl-3">
                            <span className="text-charcoal/40 font-semibold">Payment:</span>
                            <select
                              value={order.paymentStatus}
                              onChange={(e) => handleUpdateStatus(order.id, "", e.target.value)}
                              className="bg-white border border-cinnamon/10 rounded-lg p-1.5 font-bold text-cinnamon outline-none cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Paid">Paid</option>
                              <option value="Failed">Failed</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Recipient spec details */}
                      <div className="text-xs text-charcoal/70 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-cinnamon/5 border border-cinnamon/5 rounded-xl p-4">
                        <div>
                          <strong className="text-cinnamon font-bold">Delivery Address:</strong>
                          <p className="mt-1">{order.address.name}, {order.address.phone}</p>
                          <p className="text-charcoal/50">{order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipCode}</p>
                        </div>
                        <div>
                          <strong className="text-cinnamon font-bold">Cart Items list:</strong>
                          <div className="flex flex-col gap-1 mt-1 font-semibold text-charcoal/80">
                            {order.items.map((it: any, i: number) => (
                              <span key={i}>- {it.name} ({it.weight}) × {it.quantity}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Viewport 4: Coupon creations */}
            {activeTab === "coupons" && (
              <div className="flex flex-col gap-6 animate-fade-in-up">
                <div className="flex justify-between items-center border-b border-cinnamon/5 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-cinnamon">
                    Active Promotion Coupons
                  </h2>
                  {!showCouponForm && (
                    <button
                      onClick={() => setShowCouponForm(true)}
                      className="bg-kashmiri hover:bg-cinnamon text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm transition-all"
                    >
                      <Plus size={14} /> Create Coupon
                    </button>
                  )}
                </div>

                {/* Coupon creation form */}
                {showCouponForm && (
                  <form onSubmit={handleCouponSubmit} className="p-5 border border-cinnamon/10 bg-ivory rounded-[24px] flex flex-col gap-4 text-sm shadow-inner max-w-md">
                    <h3 className="font-serif text-base font-bold text-cinnamon">Add Promotion Voucher</h3>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">Voucher Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MONSOON30"
                        value={cpCode}
                        onChange={(e) => setCpCode(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Type *</label>
                        <select
                          value={cpType}
                          onChange={(e) => setCpType(e.target.value as any)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        >
                          <option value="percentage">Percentage (%)</option>
                          <option value="fixed">Fixed Flat INR</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-charcoal/50">Value *</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 10 or 150"
                          value={cpValue}
                          onChange={(e) => setCpValue(e.target.value)}
                          className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">Minimum Order Threshold (INR)</label>
                      <input
                        type="number"
                        placeholder="e.g. 499"
                        value={cpMin}
                        onChange={(e) => setCpMin(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none"
                      />
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCouponForm(false)}
                        className="px-3.5 py-2 border border-cinnamon/10 rounded-lg text-xs font-bold text-charcoal/50 uppercase tracking-widest hover:bg-cinnamon/5"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-kashmiri hover:bg-cinnamon text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        Create Voucher
                      </button>
                    </div>
                  </form>
                )}

                {/* Coupons list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coupons.map((c) => (
                    <div key={c.code} className="p-4 border border-dashed border-cinnamon/20 bg-cinnamon/5 rounded-xl flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
                          <Percent size={18} />
                        </div>
                        <div>
                          <strong className="text-sm text-cinnamon font-mono block">{c.code}</strong>
                          <span className="text-[10px] text-charcoal/50 font-bold uppercase block mt-0.5">
                            {c.discountType === "percentage" ? `${c.value}% Off` : `Flat ₹${c.value} Off`} • Min order: ₹{c.minOrder}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-extrabold bg-olive/10 text-olive px-2.5 py-1 rounded-md">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
