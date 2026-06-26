import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Product } from "../types";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.weight);
  };

  return (
    <div className="group relative bg-white border border-cinnamon/10 hover:border-cinnamon/20 rounded-[32px] p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-ivory rounded-[24px] mb-4 flex items-center justify-center p-4 border border-cinnamon/5">
        <Link to={`/products/${product.id}`} className="w-full h-full block">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-[18px] group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-cinnamon/95 backdrop-blur-sm text-ivory text-[9px] tracking-widest font-extrabold uppercase px-2 py-1 rounded-md shadow-sm border border-white/10">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-saffron text-charcoal text-[9px] tracking-widest font-extrabold uppercase px-2 py-1 rounded-md shadow-sm">
              New Batch
            </span>
          )}
          {product.stock <= 15 && product.stock > 0 && (
            <span className="bg-kashmiri text-white text-[9px] tracking-widest font-extrabold uppercase px-2 py-1 rounded-md shadow-sm animate-pulse">
              Low Stock
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-500 text-white text-[9px] tracking-widest font-extrabold uppercase px-2 py-1 rounded-md shadow-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Action Overlays */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="w-9 h-9 rounded-full bg-ivory border border-cinnamon/10 text-cinnamon hover:bg-cinnamon hover:text-ivory flex items-center justify-center shadow-md transition-all scale-90 hover:scale-100 cursor-pointer"
            title="Quick View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`w-9 h-9 rounded-full border shadow-md flex items-center justify-center transition-all scale-90 hover:scale-100 cursor-pointer ${
              isWishlisted
                ? "bg-kashmiri text-white border-kashmiri"
                : "bg-ivory border-cinnamon/10 text-charcoal/70 hover:text-kashmiri"
            }`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="pt-2 flex-1 flex flex-col justify-between font-sans">
        <div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <span className="text-[10px] text-olive font-extrabold uppercase tracking-widest">
              {product.category.replace("-", " ")}
            </span>
            <div className="flex items-center gap-1">
              <Star size={11} className="fill-saffron stroke-saffron" />
              <span className="text-xs font-bold text-charcoal">{product.rating}</span>
            </div>
          </div>

          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-serif text-lg md:text-xl font-bold text-cinnamon hover:text-saffron transition-colors tracking-tight leading-tight mb-2">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-xs text-charcoal/60 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        <div>
          {/* Price & Cart footer */}
          <div className="flex justify-between items-center gap-2 pt-2 border-t border-cinnamon/5">
            <div className="flex flex-col">
              <span className="text-[11px] text-charcoal/40 font-semibold">{product.weight} pouch</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-lg font-extrabold text-charcoal">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-xs text-charcoal/40 line-through">₹{product.oldPrice}</span>
                )}
              </div>
            </div>

            {product.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-cinnamon hover:bg-saffron text-ivory hover:text-charcoal p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm group-hover:scale-105"
                title="Add to Basket"
              >
                <ShoppingCart size={15} />
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-200 text-gray-400 p-2.5 rounded-xl cursor-not-allowed"
                title="Out of Stock"
              >
                <ShoppingCart size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
