import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SEOHead } from "../components/SEOHead";
import { CreditCard, Truck, Check, ChevronLeft, MapPin, Plus, Send, Landmark, BadgePercent } from "lucide-react";

export const Checkout: React.FC = () => {
  const { user, cart, addresses, addAddress, placeOrder, appliedCoupon, error, setError } = useApp();
  const navigate = useNavigate();

  // Selected state
  const [selectedAddressId, setSelectedAddressId] = useState<string>(addresses[0]?.id || "");
  const [paymentMethod, setPaymentMethod] = useState<"Razorpay" | "Stripe" | "UPI" | "COD">("Razorpay");
  const [placing, setPlacing] = useState(false);
  const [successOrder, setSuccessOrder] = useState<any | null>(null);

  // New Address Form state
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Compute values
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discount = appliedCoupon.value;
    }
  }
  const gst = Math.round((subtotal - discount) * 0.05);
  const shipping = subtotal - discount > 499 ? 0 : 50;
  const grandTotal = subtotal - discount + gst + shipping;

  const handleAddNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim() || !newStreet.trim() || !newCity.trim() || !newState.trim() || !newZip.trim()) {
      setError("Please complete all address fields.");
      return;
    }

    const ok = await addAddress({
      name: newName,
      phone: newPhone,
      street: newStreet,
      city: newCity,
      state: newState,
      zipCode: newZip
    });

    if (ok) {
      setShowAddAddr(false);
      setNewName("");
      setNewPhone("");
      setNewStreet("");
      setNewCity("");
      setNewState("");
      setNewZip("");
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setError("Please login to proceed with your purchase.");
      navigate("/login");
      return;
    }

    const addrId = selectedAddressId || addresses[0]?.id;
    if (!addrId) {
      setError("Please add a shipping address first.");
      return;
    }

    try {
      setPlacing(true);
      const placed = await placeOrder(paymentMethod, addrId);
      if (placed) {
        setSuccessOrder(placed);
      }
    } catch (e) {
      console.log("Purchase placement failure", e);
    } finally {
      setPlacing(false);
    }
  };

  // If order was successfully placed, show Confirmation Splash Card!
  if (successOrder) {
    return (
      <div className="bg-ivory min-h-screen py-20 px-4 md:px-8 font-sans flex items-center justify-center">
        <SEOHead title="Order Confirmed!" description="Your spice order has been successfully locked in." />
        <div className="bg-white border border-cinnamon/20 rounded-[32px] p-8 md:p-12 max-w-lg w-full text-center shadow-xl flex flex-col items-center gap-6 animate-fade-in-up">
          <div className="w-16 h-16 rounded-full bg-olive/10 border-2 border-olive flex items-center justify-center text-olive">
            <Check size={32} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs text-olive uppercase font-extrabold tracking-widest">Victory Sourced</span>
            <h1 className="font-serif text-3xl font-bold text-cinnamon">Order Locked Successfully!</h1>
            <p className="text-sm text-charcoal/60 leading-relaxed">
              Veda Heritage Order <strong className="text-cinnamon">{successOrder.id}</strong> has been created. Our farming cooperative is now packaging your fresh harvests.
            </p>
          </div>

          <div className="w-full bg-cinnamon/5 border border-cinnamon/10 rounded-[24px] p-4 text-xs text-left text-charcoal/70 flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Delivery Recipient:</span>
              <strong className="text-charcoal">{successOrder.address.name}</strong>
            </div>
            <div className="flex justify-between">
              <span>Shipping Address:</span>
              <strong className="text-charcoal truncate max-w-[200px]">{successOrder.address.street}, {successOrder.address.city}</strong>
            </div>
            {successOrder.trackingCode && (
              <div className="flex justify-between border-t border-cinnamon/5 pt-2 mt-1">
                <span>FedEx tracking Code:</span>
                <strong className="text-olive">{successOrder.trackingCode}</strong>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
            <Link
              to="/dashboard"
              className="flex-1 bg-cinnamon hover:bg-saffron hover:text-charcoal text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all text-center"
            >
              Order Tracker Dashboard
            </Link>
            <Link
              to="/products"
              className="flex-1 border border-cinnamon/20 hover:border-cinnamon hover:bg-cinnamon/5 text-cinnamon font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all text-center"
            >
              Back to Spices Catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead title="Checkout | Shree Veda" description="Complete your secure purchase of authentic Indian Spices." />

      <div className="max-w-7xl mx-auto">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cinnamon/60 hover:text-cinnamon mb-8 transition-colors"
        >
          <ChevronLeft size={14} />
          Back to Basket
        </Link>

        <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight mb-8">
          Heritage Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Step 1: Shipping Address */}
            <div className="bg-white border border-cinnamon/10 rounded-[32px] p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl font-bold text-cinnamon flex items-center gap-2.5">
                  <Truck size={20} className="text-saffron" />
                  1. Shipping Destination
                </h2>
                {!showAddAddr && (
                  <button
                    onClick={() => setShowAddAddr(true)}
                    className="text-xs font-bold uppercase tracking-wider text-cinnamon hover:text-saffron flex items-center gap-1 border border-cinnamon/20 hover:border-cinnamon rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={12} /> Add New Address
                  </button>
                )}
              </div>

              {/* Add address sub-form */}
              {showAddAddr && (
                <form onSubmit={handleAddNewAddress} className="mb-6 p-5 border border-dashed border-cinnamon/20 rounded-[24px] bg-ivory flex flex-col gap-4 text-sm shadow-inner">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">Recipient Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Meera Patel"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">Contact Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98274 81729"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-charcoal/50">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 108, Veda Nilayam, MG Road"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">City</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mysuru"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">State</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Karnataka"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-charcoal/50">Postal ZIP Code</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 570001"
                        value={newZip}
                        onChange={(e) => setNewZip(e.target.value)}
                        className="p-2.5 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAddr(false)}
                      className="px-4 py-2 border border-cinnamon/10 rounded-lg text-xs font-bold text-charcoal/50 uppercase tracking-widest hover:bg-cinnamon/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-cinnamon hover:bg-saffron text-white hover:text-charcoal rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                      <Send size={12} /> Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Address Picker list */}
              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                       key={addr.id}
                       onClick={() => setSelectedAddressId(addr.id)}
                       className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                         (selectedAddressId === addr.id || (!selectedAddressId && addr.isDefault))
                           ? "border-cinnamon bg-cinnamon/5"
                           : "border-cinnamon/10 hover:border-cinnamon/30 bg-white"
                       }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-serif text-base font-bold text-cinnamon flex items-center gap-1.5">
                          <MapPin size={14} />
                          {addr.name}
                        </span>
                        <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
                          {addr.street}, {addr.city}, <br /> {addr.state} - {addr.zipCode}
                        </p>
                        <span className="text-xs text-charcoal/50 mt-1 font-semibold">{addr.phone}</span>
                      </div>
                      
                      {(selectedAddressId === addr.id || (!selectedAddressId && addr.isDefault)) && (
                        <span className="absolute bottom-3 right-3 w-5 h-5 bg-cinnamon rounded-full text-white flex items-center justify-center">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed border-cinnamon/20 rounded-xl bg-cinnamon/5 text-sm text-charcoal/50">
                  No delivery address registered yet. Please click 'Add New Address' to create one.
                </div>
              )}
            </div>

            {/* Step 2: Payment system selection */}
            <div className="bg-white border border-cinnamon/10 rounded-[32px] p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-cinnamon flex items-center gap-2.5 mb-6">
                <CreditCard size={20} className="text-saffron" />
                2. Secure Payment Gateway
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { id: "Razorpay", title: "UPI / Netbanking", subtitle: "Instant checkout" },
                  { id: "Stripe", title: "Stripe Cards", subtitle: "International safe" },
                  { id: "UPI", title: "Direct UPI Scan", subtitle: "GooglePay, PhonePe" },
                  { id: "COD", title: "Cash On Delivery", subtitle: "Pay on arrival" }
                ].map((gateway) => (
                  <div
                    key={gateway.id}
                    onClick={() => setPaymentMethod(gateway.id as any)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center flex flex-col justify-center items-center relative ${
                      paymentMethod === gateway.id
                        ? "border-cinnamon bg-cinnamon/5"
                        : "border-cinnamon/10 hover:border-cinnamon/30 bg-white"
                    }`}
                  >
                    <span className="font-serif text-base font-bold text-cinnamon block">
                      {gateway.title}
                    </span>
                    <span className="text-[10px] text-charcoal/50 block mt-1">{gateway.subtitle}</span>

                    {paymentMethod === gateway.id && (
                      <span className="absolute bottom-2 right-2 w-4 h-4 bg-cinnamon rounded-full text-white flex items-center justify-center">
                        <Check size={10} />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order summary overlay */}
          <div className="lg:col-span-4 bg-white border border-cinnamon/10 rounded-[32px] p-6 shadow-sm flex flex-col gap-6">
            <h2 className="font-serif text-xl font-bold text-cinnamon border-b border-cinnamon/5 pb-3">
              Order Review
            </h2>

            {/* Items scroll */}
            <div className="flex flex-col gap-3.5 max-h-52 overflow-y-auto pr-2 border-b border-cinnamon/5 pb-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 justify-between text-xs items-center">
                  <div className="flex gap-2.5 items-center truncate">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-lg border border-cinnamon/5 shrink-0"
                    />
                    <div className="truncate flex flex-col">
                      <strong className="text-charcoal font-bold truncate leading-tight">{item.product.name}</strong>
                      <span className="text-[10px] text-gray-400 mt-0.5">{item.weight} pouch × {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-charcoal shrink-0">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between text-charcoal/60">
                <span>Items Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-olive">
                  <span>Promo Discount</span>
                  <span className="font-bold">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal/60">
                <span>Spice GST (5%)</span>
                <span className="font-bold">₹{gst}</span>
              </div>
              <div className="flex justify-between text-charcoal/60">
                <span>Eco Shipping</span>
                {shipping === 0 ? (
                  <span className="text-olive font-extrabold uppercase text-[10px]">FREE</span>
                ) : (
                  <span className="font-bold">₹{shipping}</span>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-cinnamon/10 pt-4 flex justify-between items-baseline">
              <span className="font-serif text-base font-bold text-cinnamon">Payable Total</span>
              <span className="font-serif text-xl font-extrabold text-charcoal">₹{grandTotal}</span>
            </div>

            {/* Place trigger */}
            <button
              onClick={handlePlaceOrder}
              disabled={placing || cart.length === 0}
              className="w-full bg-cinnamon hover:bg-saffron hover:text-charcoal text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {placing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  Authorizing Payment...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check size={16} /> Place Secure Order
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
