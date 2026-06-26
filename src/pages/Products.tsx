import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { QuickViewModal } from "../components/QuickViewModal";
import { SEOHead } from "../components/SEOHead";
import { Search, SlidersHorizontal, Check, RefreshCw, X, ArrowUpDown } from "lucide-react";

export const Products: React.FC = () => {
  const { products, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("bestselling");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync category from URL query parameters (e.g., coming from home links)
  useEffect(() => {
    const catQuery = searchParams.get("category");
    if (catQuery) {
      setSelectedCategory(catQuery);
    }
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  // Apply filters
  const filteredProducts = products
    .filter((p) => {
      // Search text matches name, description, ingredients, tags
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.ingredients?.toLowerCase().includes(term) ||
        p.tags.some((tag) => tag.toLowerCase().includes(term));

      // Category filter
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;

      // Price ranges
      let matchesPrice = true;
      if (selectedPriceRange === "under-200") {
        matchesPrice = p.price <= 200;
      } else if (selectedPriceRange === "200-500") {
        matchesPrice = p.price > 200 && p.price <= 500;
      } else if (selectedPriceRange === "above-500") {
        matchesPrice = p.price > 500;
      }

      // Stock
      const matchesStock = !showInStockOnly || p.stock > 0;

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === "price-low-high") return a.price - b.price;
      if (sortBy === "price-high-low") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      
      // Default: bestsellers first, then newest
      if (sortBy === "bestselling") {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
      }
      return 0;
    });

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSortBy("bestselling");
    setShowInStockOnly(false);
    setSearchParams({});
  };

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead
        title="Spices Catalogue | Shree Veda"
        description="Browse our luxury selection of whole spices, certified organic powders, and freshly ground gourmet masalas."
      />

      <div className="max-w-7xl mx-auto">
        {/* Banner Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">Organic Harvest</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight">
            The Spice Bazaar
          </h1>
          <p className="text-sm text-charcoal/60 leading-relaxed">
            Freshly-harvested single-origin spices and ancient royal masala blends, meticulously sun-cured and cryo-milled to preserve 100% vital nutrients.
          </p>
        </div>

        {/* Master Controls header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white border border-cinnamon/10 rounded-[24px] p-4 mb-8 shadow-sm">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="lg:hidden bg-white hover:bg-cinnamon/5 border border-cinnamon/20 p-2.5 rounded-xl text-cinnamon flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest shrink-0 transition-all"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search turmeric, pepper, saffron..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-cinnamon/10 outline-none text-sm rounded-xl py-2.5 pl-10 pr-4 placeholder:text-gray-400 focus:border-cinnamon transition-all"
              />
              <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 w-full md:w-auto border-t border-cinnamon/5 md:border-none pt-3 md:pt-0">
            <span className="text-xs font-bold text-charcoal/50">
              Showing {filteredProducts.length} premium products
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-charcoal/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-cinnamon/10 outline-none text-xs font-bold text-charcoal/70 rounded-xl px-3 py-2 cursor-pointer focus:border-cinnamon"
              >
                <option value="bestselling">Sort: Bestsellers</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Customer Ratings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar: Filters (Desktop) */}
          <aside
            className={`w-full lg:w-64 bg-white rounded-[24px] border border-cinnamon/10 p-6 flex-col gap-6 shrink-0 lg:flex ${
              showFiltersMobile ? "flex fixed inset-0 z-50 bg-ivory p-8 overflow-y-auto" : "hidden lg:flex"
            }`}
          >
            {/* Mobile filter header */}
            <div className="flex lg:hidden justify-between items-center pb-4 border-b border-cinnamon/10 mb-2">
              <span className="font-serif text-lg font-bold text-cinnamon">Filters</span>
              <button onClick={() => setShowFiltersMobile(false)} className="p-1 rounded-full border border-cinnamon/10 text-charcoal">
                <X size={16} />
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-charcoal/40 font-extrabold mb-3">Categories</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`text-sm text-left py-1.5 px-2.5 rounded-lg font-semibold flex justify-between items-center transition-colors ${
                    selectedCategory === "all" ? "bg-cinnamon text-white" : "hover:bg-cinnamon/5 text-charcoal/80"
                  }`}
                >
                  All Spices
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-sm text-left py-1.5 px-2.5 rounded-lg font-semibold flex justify-between items-center transition-colors ${
                      selectedCategory === cat.id ? "bg-cinnamon text-white" : "hover:bg-cinnamon/5 text-charcoal/80"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-charcoal/40 font-extrabold mb-3">Pricing Range</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "All Prices", value: "all" },
                  { label: "Under ₹200", value: "under-200" },
                  { label: "₹200 - ₹500", value: "200-500" },
                  { label: "Above ₹500", value: "above-500" }
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedPriceRange(range.value)}
                    className={`text-sm text-left py-1.5 px-2.5 rounded-lg font-semibold flex justify-between items-center transition-colors ${
                      selectedPriceRange === range.value ? "bg-cinnamon text-white" : "hover:bg-cinnamon/5 text-charcoal/80"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-charcoal/40 font-extrabold mb-3">Availability</h3>
              <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-charcoal/80">
                <input
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={(e) => setShowInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-cinnamon/20 accent-cinnamon cursor-pointer"
                />
                In Stock Only
              </label>
            </div>

            {/* Clear All action */}
            <button
              onClick={() => {
                clearAllFilters();
                setShowFiltersMobile(false);
              }}
              className="mt-4 border border-cinnamon/20 hover:border-cinnamon text-cinnamon hover:bg-cinnamon/5 text-xs py-3 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={12} />
              Reset Filters
            </button>
          </aside>

          {/* Right Section: Products Grid */}
          <main className="flex-1 w-full">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onQuickView={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-4 rounded-[24px] bg-white border border-dashed border-cinnamon/20 flex flex-col items-center justify-center gap-4 shadow-sm">
                <span className="font-serif text-2xl font-bold text-cinnamon">No Spices Found</span>
                <p className="text-sm text-charcoal/50 max-w-sm leading-relaxed">
                  We couldn't find any premium spices matching your active filter choices. Try widening your filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-cinnamon text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-saffron hover:text-charcoal transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Dialog overlay */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
