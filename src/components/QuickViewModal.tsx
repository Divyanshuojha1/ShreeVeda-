import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Product } from "../types";
import { X, Star, Heart, ShoppingBag, Plus, Minus, CheckCircle, Truck } from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("");

  if (!product) return null;

  // Set default weight if not selected
  if (!selectedWeight) {
    setSelectedWeight(product.weight);
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Dialog Frame */}
      <div className="relative bg-ivory w-full max-w-4xl rounded-[32px] overflow-hidden border border-cinnamon/20 shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] overflow-y-auto animate-fade-in-up font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/80 hover:bg-cinnamon hover:text-white transition-all border border-cinnamon/10 text-charcoal"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center bg-white/40 border-r border-cinnamon/5">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full max-w-[320px] aspect-square object-cover rounded-xl shadow-inner border border-cinnamon/5"
          />
          <div className="flex gap-2.5 mt-4 justify-center">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} thumbnail`}
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-cover rounded-lg border border-cinnamon/10 opacity-70 hover:opacity-100 cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            {/* Category and ratings */}
            <div className="flex justify-between items-center gap-2 mb-2">
              <span className="text-xs text-olive font-extrabold uppercase tracking-widest">
                {product.category.replace("-", " ")}
              </span>
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-saffron stroke-saffron" />
                <span className="text-sm font-bold text-charcoal">{product.rating}</span>
                <span className="text-xs text-charcoal/40">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-cinnamon tracking-tight mb-2 leading-tight">
              {product.name}
            </h2>

            {/* Price stage */}
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="font-serif text-2xl font-extrabold text-charcoal">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-sm text-charcoal/40 line-through">₹{product.oldPrice}</span>
              )}
            </div>

            {/* Summary */}
            <p className="text-sm text-charcoal/70 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Sourced labels */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-olive/5 border border-olive/10 rounded-xl mb-5 text-xs text-olive/80">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle size={14} /> Origin: {product.origin || "Kerala"}
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Truck size={14} /> Shipping: Fast dispatch
              </span>
            </div>

            {/* Weight Options */}
            <div className="mb-5">
              <label className="text-xs uppercase tracking-wider text-charcoal/50 font-bold block mb-2">
                Pack Size Variant
              </label>
              <div className="flex gap-3">
                {["100g", "250g", "500g"].map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      selectedWeight === w
                        ? "bg-cinnamon border-cinnamon text-ivory"
                        : "border-cinnamon/20 hover:border-cinnamon/50 text-charcoal"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons footer */}
          <div>
            <div className="flex items-center gap-4 py-4 border-t border-cinnamon/10">
              {/* Quantity Counter */}
              <div className="flex items-center border border-cinnamon/20 rounded-xl bg-white p-1">
                <button
                  onClick={handleDecrement}
                  className="p-1.5 hover:text-cinnamon text-charcoal/60 hover:bg-cinnamon/5 rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3.5 text-sm font-bold text-charcoal select-none">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="p-1.5 hover:text-cinnamon text-charcoal/60 hover:bg-cinnamon/5 rounded-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Basket Add button */}
              {product.stock > 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-cinnamon hover:bg-saffron hover:text-charcoal text-ivory font-bold text-sm py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <ShoppingBag size={16} />
                  Add to Basket
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-200 text-gray-400 font-bold text-sm py-3 px-6 rounded-xl cursor-not-allowed"
                >
                  Sold Out
                </button>
              )}

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                  isWishlisted
                    ? "bg-kashmiri border-kashmiri text-white"
                    : "border-cinnamon/20 hover:border-cinnamon/50 text-charcoal/70"
                }`}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
