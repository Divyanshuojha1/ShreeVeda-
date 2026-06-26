import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { QuickViewModal } from "../components/QuickViewModal";
import { SEOHead } from "../components/SEOHead";
import { Star, Heart, ShoppingBag, Plus, Minus, ArrowLeft, Shield, Sparkles, Check, Send, Award, Compass } from "lucide-react";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, wishlist, toggleWishlist, addToCart, submitReview, setError } = useApp();

  const [product, setProduct] = useState<any | null>(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [activeTab, setActiveTab] = useState<"benefits" | "details" | "reviews">("benefits");
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  // Review Form state
  const [revName, setRevName] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState("");
  const [revSubmitted, setRevSubmitted] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (products.length > 0 && id) {
      const found = products.find((p) => p.id === id);
      if (found) {
        setProduct(found);
        setSelectedImg(found.image);
        setSelectedWeight(found.weight);
        
        // Load related items
        const related = products.filter((p) => p.category === found.category && p.id !== found.id).slice(0, 3);
        setRelatedProducts(related);
      } else {
        navigate("/products");
      }
    }
  }, [id, products, navigate]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-cinnamon/20 border-t-cinnamon animate-spin"></div>
        <p className="text-sm text-charcoal/50">Fetching secret spice details...</p>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedWeight);
    // Trigger dynamic flying basket feedback or simply a nice notification (handled in UI)
  };

  const handlePostReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) {
      setError("Please complete all review fields.");
      return;
    }
    try {
      setSubmittingReview(true);
      const ok = await submitReview(product.id, revName, revRating, revComment);
      if (ok) {
        setRevSubmitted(true);
        setRevName("");
        setRevComment("");
        setRevRating(5);
        setTimeout(() => setRevSubmitted(false), 5000);
      }
    } catch (e) {
      console.log("Error writing review", e);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead
        title={`${product.name}`}
        description={product.description}
        ogImage={product.image}
      />

      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cinnamon/60 hover:text-cinnamon mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Bazaar
        </Link>

        {/* Product core layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Image gallery */}
          <div className="lg:col-span-6 flex flex-col md:flex-row gap-4 items-start">
            {/* Thumbnails */}
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 w-full md:w-20 overflow-x-auto md:overflow-x-visible shrink-0 py-2">
              {product.images?.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 w-16 h-16 shrink-0 transition-all ${
                    selectedImg === img ? "border-cinnamon" : "border-cinnamon/10 opacity-75 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail view" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Large Stage */}
            <div className="order-1 md:order-2 flex-1 w-full aspect-square bg-white border border-cinnamon/10 rounded-[32px] overflow-hidden flex items-center justify-center p-6 relative shadow-sm">
              <img
                src={selectedImg}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full max-w-[400px] aspect-square object-cover rounded-xl shadow-inner transition-transform duration-500 hover:scale-105 cursor-zoom-in"
              />
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-full border shadow-md flex items-center justify-center transition-all cursor-pointer ${
                    isWishlisted
                      ? "bg-kashmiri border-kashmiri text-white"
                      : "bg-ivory border-cinnamon/10 text-charcoal/70"
                  }`}
                >
                  <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Spec card controls */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-center gap-2 mb-2">
                <span className="text-xs text-olive font-extrabold uppercase tracking-widest bg-olive/10 px-2.5 py-1 rounded-md">
                  {product.category.replace("-", " ")}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-saffron stroke-saffron" />
                  <span className="text-sm font-bold text-charcoal">{product.rating}</span>
                  <span className="text-xs text-charcoal/40">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight leading-tight mb-2">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-3xl font-extrabold text-charcoal">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-sm text-charcoal/40 line-through">₹{product.oldPrice}</span>
                )}
                {product.oldPrice && (
                  <span className="text-xs text-kashmiri font-extrabold bg-kashmiri/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quick Sourced stats */}
            <div className="grid grid-cols-2 gap-4 p-4 border border-cinnamon/10 bg-olive/5 rounded-2xl text-xs text-charcoal/80">
              <span className="flex items-center gap-2">
                <Compass size={16} className="text-olive" />
                <span className="font-semibold">Harvest Origin:</span> {product.origin || "Sangli, MH"}
              </span>
              <span className="flex items-center gap-2">
                <Award size={16} className="text-olive" />
                <span className="font-semibold">Therapeutic Oil:</span> Cold-milled
              </span>
            </div>

            {/* Weight Choosing */}
            <div>
              <label className="text-xs uppercase tracking-widest text-charcoal/50 font-bold block mb-2">
                Choose Pack Variant Weight
              </label>
              <div className="flex gap-3">
                {["100g", "250g", "500g"].map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-4.5 py-2 text-xs font-extrabold rounded-xl border-2 transition-all ${
                      selectedWeight === w
                        ? "bg-cinnamon border-cinnamon text-ivory shadow-md"
                        : "border-cinnamon/10 hover:border-cinnamon/30 text-charcoal/70"
                    }`}
                  >
                    {w} pouch
                  </button>
                ))}
              </div>
            </div>

            {/* Add Action tools */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch pt-4 border-t border-cinnamon/10">
              {/* Counter */}
              <div className="flex items-center justify-between border-2 border-cinnamon/10 rounded-xl bg-white p-1.5 shrink-0">
                <button
                  onClick={handleDecrement}
                  className="p-2 hover:text-cinnamon text-charcoal/60 hover:bg-cinnamon/5 rounded-lg transition-all"
                >
                  <Minus size={14} />
                </button>
                <span className="px-5 text-sm font-extrabold text-charcoal select-none">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="p-2 hover:text-cinnamon text-charcoal/60 hover:bg-cinnamon/5 rounded-lg transition-all"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add Button */}
              {product.stock > 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-cinnamon hover:bg-saffron hover:text-charcoal text-ivory font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <ShoppingBag size={18} />
                  Add to Spice Basket
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-200 text-gray-400 font-bold py-4 px-8 rounded-xl cursor-not-allowed"
                >
                  Out of Stock (Harvest Sourced soon)
                </button>
              )}
            </div>

            {/* Quick trust assurances */}
            <div className="flex gap-4 items-center text-[10px] text-olive font-extrabold uppercase tracking-widest mt-2 justify-center sm:justify-start">
              <span className="flex items-center gap-1.5"><Shield size={14} /> Certified Organic</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Sparkles size={14} /> Cryo-Milled Purity</span>
            </div>
          </div>
        </div>

        {/* Tabbed details segment (Benefits, ingredients, reviews list) */}
        <div className="border-b border-cinnamon/10 flex gap-6 text-sm font-bold uppercase tracking-widest mb-8">
          <button
            onClick={() => setActiveTab("benefits")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "benefits" ? "border-cinnamon text-cinnamon" : "border-transparent text-charcoal/40 hover:text-charcoal"
            }`}
          >
            Therapeutic Benefits
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "details" ? "border-cinnamon text-cinnamon" : "border-transparent text-charcoal/40 hover:text-charcoal"
            }`}
          >
            Detailed Specifications
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === "reviews" ? "border-cinnamon text-cinnamon" : "border-transparent text-charcoal/40 hover:text-charcoal"
            }`}
          >
            Reviews ({product.reviews?.length || 0})
          </button>
        </div>

        {/* Tab contents */}
        <div className="mb-20 bg-white border border-cinnamon/10 rounded-[32px] p-6 md:p-8 shadow-sm">
          {activeTab === "benefits" && (
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-xl font-bold text-cinnamon mb-2">Ayurvedic & Nutritional Potency</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits?.map((benefit: string, i: number) => (
                  <li key={i} className="flex gap-3 items-start bg-olive/5 border border-olive/10 p-4 rounded-xl text-sm leading-relaxed text-charcoal/80">
                    <span className="p-0.5 rounded-full bg-olive text-white shrink-0 mt-0.5"><Check size={12} /></span>
                    {benefit}
                  </li>
                )) || <p className="text-xs text-charcoal/50">Pure organic health benefits.</p>}
              </ul>
            </div>
          )}

          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between py-2 border-b border-cinnamon/5">
                  <span className="text-charcoal/50 font-semibold">Ingredients:</span>
                  <span className="font-bold text-charcoal">{product.ingredients || "100% Organic Spices"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-cinnamon/5">
                  <span className="text-charcoal/50 font-semibold">Origin Sourced:</span>
                  <span className="font-bold text-charcoal">{product.origin || "India"}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between py-2 border-b border-cinnamon/5">
                  <span className="text-charcoal/50 font-semibold">Moisture Content:</span>
                  <span className="font-bold text-charcoal">Below 6% (Guarantees infinite shelf-life)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-cinnamon/5">
                  <span className="text-charcoal/50 font-semibold">Pesticides & Adulterants:</span>
                  <span className="font-bold text-olive">0% (Lab Certified)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Reviews List */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev: any) => (
                    <div key={rev.id} className="p-5 rounded-xl border border-cinnamon/10 bg-cinnamon/5 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="font-serif text-base font-bold text-cinnamon">{rev.userName}</span>
                        <span className="text-xs text-charcoal/40">{rev.date}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            size={12}
                            className={idx < rev.rating ? "fill-saffron stroke-saffron" : "text-gray-200"}
                          />
                        ))}
                      </div>
                      <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed mt-1">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-charcoal/50 italic py-6">Be the first to share your experience with this harvest batch.</p>
                )}
              </div>

              {/* Add review form */}
              <div className="lg:col-span-5 bg-ivory border border-cinnamon/10 rounded-[24px] p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-cinnamon mb-4">Write a Verified Review</h3>
                
                {revSubmitted ? (
                  <div className="p-4 rounded-xl bg-olive/10 border border-olive/20 text-center flex flex-col gap-2">
                    <span className="font-bold text-olive">Review Submitted!</span>
                    <p className="text-xs text-charcoal/60 leading-relaxed">
                      Thank you for reviewing! Your feedback has been approved and published to the harvest record.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePostReview} className="flex flex-col gap-4 text-sm">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acharya Das"
                        value={revName}
                        onChange={(e) => setRevName(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">Batch Rating</label>
                      <div className="flex gap-2 items-center">
                        {[1, 2, 3, 4, 5].map((stars) => (
                          <button
                            type="button"
                            key={stars}
                            onClick={() => setRevRating(stars)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              size={18}
                              className={stars <= revRating ? "fill-saffron stroke-saffron" : "text-gray-300"}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-charcoal/60 ml-2">{revRating}/5 Stars</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">Your Feedback</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write details about the aroma, taste texture, curry coloring..."
                        value={revComment}
                        onChange={(e) => setRevComment(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="w-full bg-cinnamon hover:bg-saffron hover:text-charcoal text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      {submittingReview ? "Posting review..." : "Publish Batch Review"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Spices recommedations */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-cinnamon mb-8 tracking-tight">
              Complementary Harvests
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={(p) => navigate(`/products/${p.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
