import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SEOHead } from "../components/SEOHead";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Ticket, HelpCircle } from "lucide-react";

export const Cart: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, appliedCoupon, applyCoupon, removeCoupon, error, setError } = useApp();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; isOk: boolean } | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Calculate discounts
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discount = appliedCoupon.value;
    }
  }

  // Spices GST in India is 5%
  const gst = Math.round((subtotal - discount) * 0.05);

  // Free shipping above ₹499
  const shipping = subtotal - discount > 499 ? 0 : 50;

  const grandTotal = subtotal - discount + gst + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const ok = applyCoupon(couponCode.trim());
    if (ok) {
      setCouponMsg({ text: `Coupon '${couponCode.toUpperCase()}' applied successfully!`, isOk: true });
      setCouponCode("");
    } else {
      setCouponMsg({ text: "Invalid or expired coupon code.", isOk: false });
    }
    setTimeout(() => setCouponMsg(null), 4000);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead
        title="Your Spice Basket | Shree Veda"
        description="Review your curated spice items, apply promotion codes, and calculate shipping fees."
      />

      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight mb-8">
          Your Spice Basket
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Items List */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.weight}-${idx}`}
                  className="bg-white border border-cinnamon/10 rounded-[24px] p-4 md:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm"
                >
                  <div className="flex gap-4 items-center w-full sm:w-auto">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-xl border border-cinnamon/5 shrink-0"
                    />
                    <div className="flex flex-col">
                      <Link
                        to={`/products/${item.product.id}`}
                        className="font-serif text-lg font-bold text-cinnamon hover:text-saffron transition-colors leading-tight"
                      >
                        {item.product.name}
                      </Link>
                      <span className="text-xs text-charcoal/50 mt-1">Pack variant: {item.weight}</span>
                      <span className="text-sm font-extrabold text-charcoal/80 mt-1">₹{item.product.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between w-full sm:w-auto border-t border-cinnamon/5 sm:border-none pt-3 sm:pt-0">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-cinnamon/20 rounded-xl bg-white p-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.weight, item.quantity - 1)}
                        className="p-1 hover:text-cinnamon text-charcoal/60 rounded transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 text-sm font-extrabold text-charcoal select-none">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.weight, item.quantity + 1)}
                        className="p-1 hover:text-cinnamon text-charcoal/60 rounded transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Total & Trash */}
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-base font-extrabold text-charcoal">
                        ₹{item.product.price * item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.weight)}
                        className="p-2 text-charcoal/40 hover:text-kashmiri rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 bg-white border border-cinnamon/10 rounded-[32px] p-6 flex flex-col gap-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-cinnamon border-b border-cinnamon/5 pb-3">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-charcoal/60">
                  <span>Basket Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-olive">
                    <span>Voucher Discount ({appliedCoupon?.code})</span>
                    <span className="font-bold">-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-charcoal/60 items-center gap-1">
                  <span className="flex items-center gap-1.5">
                    GST Spice Tax (5%)
                    <span className="text-[10px] text-gray-400 cursor-help" title="5% Goods & Services Tax applies to spices in India.">
                      <HelpCircle size={12} />
                    </span>
                  </span>
                  <span className="font-bold">₹{gst}</span>
                </div>

                <div className="flex justify-between text-charcoal/60">
                  <span>Eco-friendly Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-olive font-bold uppercase tracking-wider text-xs">FREE</span>
                  ) : (
                    <span className="font-bold">₹{shipping}</span>
                  )}
                </div>

                {shipping > 0 && (
                  <p className="text-[11px] text-saffron font-bold text-center bg-saffron/5 p-2 rounded-lg mt-1">
                    Add ₹{500 - subtotal} more of pure spices to unlock FREE shipping!
                  </p>
                )}
              </div>

              {/* Coupon form */}
              <div className="border-t border-b border-cinnamon/5 py-4 flex flex-col gap-2.5">
                {appliedCoupon ? (
                  <div className="flex justify-between items-center bg-olive/10 border border-olive/20 p-2.5 rounded-xl text-xs text-olive">
                    <span className="font-bold">Voucher Active: {appliedCoupon.code}</span>
                    <button onClick={removeCoupon} className="font-bold hover:underline uppercase tracking-wider text-[10px]">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon (e.g. VEDA10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full bg-white border border-cinnamon/10 outline-none text-xs font-bold rounded-lg py-2.5 pl-8 pr-2 placeholder:text-gray-400 focus:border-cinnamon"
                      />
                      <Ticket className="absolute left-2.5 top-3 text-gray-400" size={13} />
                    </div>
                    <button
                      type="submit"
                      className="bg-cinnamon hover:bg-saffron hover:text-charcoal text-white px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMsg && (
                  <span className={`text-[11px] font-semibold ${couponMsg.isOk ? "text-olive" : "text-kashmiri"}`}>
                    {couponMsg.text}
                  </span>
                )}
              </div>

              {/* Total display */}
              <div className="flex justify-between items-baseline">
                <span className="font-serif text-lg font-bold text-cinnamon">Total Amount</span>
                <span className="font-serif text-2xl font-extrabold text-charcoal">₹{grandTotal}</span>
              </div>

              {/* Checkout actions */}
              <button
                onClick={handleCheckout}
                className="w-full bg-cinnamon hover:bg-saffron hover:text-charcoal text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-[32px] bg-white border border-dashed border-cinnamon/20 flex flex-col items-center justify-center gap-4 shadow-sm">
            <span className="font-serif text-2xl font-bold text-cinnamon">Your Basket is Empty</span>
            <p className="text-sm text-charcoal/50 max-w-sm leading-relaxed">
              Begin compiling your organic culinary repertoire. Fill your kitchen with authentic Indian fragrances!
            </p>
            <Link
              to="/products"
              className="bg-cinnamon text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-saffron hover:text-charcoal transition-colors flex items-center gap-2"
            >
              <ShoppingBag size={14} />
              Browse Spices Catalogue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
