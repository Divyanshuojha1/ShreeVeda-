import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SEOHead } from "../components/SEOHead";
import { ShoppingBag, MapPin, Heart, User, LogOut, ChevronRight, HelpCircle, Trash2, Send, Plus, ShieldCheck } from "lucide-react";

export const UserDashboard: React.FC = () => {
  const { user, orders, wishlist, products, addresses, addAddress, deleteAddress, logout } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "wishlist" | "profile">("orders");

  // Address form states
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");

  // Guard dashboard route
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  // Filter products that exist in wishlist
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead title="My Dashboard | Shree Veda" description="Track your spice orders, manage shipping addresses, and view your organic favorites list." />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-cinnamon/10 pb-8 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">The Veda Sanctuary</span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight mt-1">
              Namaste, {user.name}
            </h1>
            <p className="text-sm text-charcoal/50 mt-1">Sustaining organic farms and flavor integrity since 2026.</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 border border-kashmiri/20 hover:bg-kashmiri/5 text-kashmiri px-4.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>

        {/* Multi-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Side: Navigation Links */}
          <nav className="lg:col-span-3 flex flex-col gap-2.5 bg-white border border-cinnamon/10 rounded-[24px] p-5 shrink-0 shadow-sm">
            {[
              { id: "orders", label: "Order History", icon: ShoppingBag },
              { id: "addresses", label: "Saved Addresses", icon: MapPin },
              { id: "wishlist", label: "My Wishlist", icon: Heart },
              { id: "profile", label: "Account Profile", icon: User }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setShowAddAddr(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all text-left uppercase tracking-wider ${
                    activeTab === tab.id
                      ? "bg-cinnamon text-white shadow-md"
                      : "hover:bg-cinnamon/5 text-charcoal/70 hover:text-cinnamon"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} />
                    {tab.label}
                  </span>
                  <ChevronRight size={14} className={activeTab === tab.id ? "opacity-100" : "opacity-30"} />
                </button>
              );
            })}
          </nav>

          {/* Right Side: Tab panel viewport */}
          <main className="lg:col-span-9 bg-white border border-cinnamon/10 rounded-[32px] p-6 md:p-8 shadow-sm min-h-[50vh]">
            {/* Orders viewport */}
            {activeTab === "orders" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-cinnamon border-b border-cinnamon/5 pb-4 mb-6">
                  Your Spice Orders
                </h2>

                {orders.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-cinnamon/10 rounded-[24px] p-5 md:p-6 flex flex-col gap-4 bg-white shadow-sm">
                        {/* Order Meta row */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cinnamon/5 pb-4">
                          <div>
                            <span className="text-xs text-charcoal/40 font-semibold">Order placed on {new Date(order.date).toLocaleDateString()}</span>
                            <h3 className="font-serif text-lg font-bold text-cinnamon mt-0.5">ID: {order.id}</h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-extrabold text-charcoal">₹{order.totalAmount}</span>
                            <span
                              className={`text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-md ${
                                order.status === "Delivered"
                                  ? "bg-olive/10 text-olive"
                                  : order.status === "Cancelled"
                                  ? "bg-kashmiri/10 text-kashmiri"
                                  : "bg-saffron/10 text-cinnamon animate-pulse"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Order Items list */}
                        <div className="flex flex-col gap-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center justify-between text-xs md:text-sm">
                              <div className="flex gap-3 items-center truncate">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  referrerPolicy="no-referrer"
                                  className="w-11 h-11 object-cover rounded-lg border border-cinnamon/5 shrink-0"
                                />
                                <div className="truncate flex flex-col">
                                  <strong className="text-charcoal truncate font-bold">{item.name}</strong>
                                  <span className="text-[10px] text-gray-400 mt-0.5">{item.weight} pouch × {item.quantity}</span>
                                </div>
                              </div>
                              <span className="font-serif font-extrabold text-charcoal shrink-0">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tracking code alert box */}
                        {order.trackingCode && (
                          <div className="mt-2 bg-olive/5 border border-olive/10 rounded-[16px] p-3.5 text-xs text-olive flex flex-col sm:flex-row justify-between items-center gap-2">
                            <span>🚀 Sourced through FedEx/BlueDart. Status: <strong>On Transit</strong></span>
                            <span>Tracking Code: <strong className="underline select-all">{order.trackingCode}</strong></span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-sm text-charcoal/40 flex flex-col items-center gap-3">
                    <span>You haven't placed any spice orders yet.</span>
                    <Link to="/products" className="bg-cinnamon text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
                      Browse Bazaar
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Addresses viewport */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex justify-between items-center border-b border-cinnamon/5 pb-4 mb-6">
                  <h2 className="font-serif text-2xl font-bold text-cinnamon">
                    Saved Addresses
                  </h2>
                  {!showAddAddr && (
                    <button
                      onClick={() => setShowAddAddr(true)}
                      className="text-xs font-bold uppercase tracking-wider text-cinnamon hover:text-saffron flex items-center gap-1 border border-cinnamon/20 hover:border-cinnamon rounded-lg px-2.5 py-1.5 transition-colors"
                    >
                      <Plus size={12} /> Add New
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
                        <label className="text-xs font-bold text-charcoal/50">Contact Phone</label>
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

                {addresses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="p-5 rounded-[24px] border border-cinnamon/10 bg-white flex flex-col justify-between h-full relative group hover:shadow-md transition-shadow">
                        <div>
                          <span className="font-serif text-base font-bold text-cinnamon flex items-center gap-2">
                            <MapPin size={15} />
                            {addr.name}
                            {addr.isDefault && (
                              <span className="text-[9px] uppercase tracking-widest font-extrabold bg-olive/10 text-olive px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </span>
                          <p className="text-xs text-charcoal/70 mt-3 leading-relaxed">
                            {addr.street}, {addr.city}, <br /> {addr.state} - {addr.zipCode}
                          </p>
                          <span className="text-xs text-charcoal/40 block mt-2 font-semibold">Contact: {addr.phone}</span>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-cinnamon/5 mt-4">
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-xs text-charcoal/30 hover:text-kashmiri flex items-center gap-1 font-bold transition-colors uppercase tracking-wider"
                            title="Delete address"
                          >
                            <Trash2 size={13} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-sm text-charcoal/40">
                    No shipping addresses registered. Click 'Add New Address' to create one.
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Viewport */}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-cinnamon border-b border-cinnamon/5 pb-4 mb-6">
                  Saved Spices Wishlist
                </h2>

                {wishlistedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {wishlistedProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        to={`/products/${prod.id}`}
                        className="group border border-cinnamon/10 bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all p-4 flex flex-col gap-3"
                      >
                        <div className="aspect-square bg-cinnamon/5 rounded-xl overflow-hidden border border-cinnamon/5 flex items-center justify-center p-2 relative">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-lg group-hover:scale-102 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-olive font-extrabold uppercase tracking-widest">{prod.category.replace("-", " ")}</span>
                          <h3 className="font-serif text-base font-bold text-cinnamon group-hover:text-saffron transition-colors mt-0.5 leading-tight truncate">
                            {prod.name}
                          </h3>
                          <strong className="text-xs text-charcoal block mt-1">₹{prod.price} • {prod.weight}</strong>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-12 text-sm text-charcoal/40">You haven't saved any organic spices to your wishlist yet.</p>
                )}
              </div>
            )}

            {/* Profile Viewport */}
            {activeTab === "profile" && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-cinnamon border-b border-cinnamon/5 pb-4 mb-6">
                  Account Profile Info
                </h2>

                <div className="flex flex-col gap-6 text-sm max-w-md">
                  <div className="flex items-center gap-4 bg-olive/5 border border-olive/10 p-5 rounded-[24px]">
                    <div className="w-12 h-12 rounded-full bg-olive text-white flex items-center justify-center font-extrabold text-lg uppercase shadow-inner">
                      {user.name[0]}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-extrabold text-olive">Sustaining Member</span>
                      <p className="font-bold text-cinnamon text-base mt-0.5">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-cinnamon/5 pt-4">
                    <div className="flex justify-between py-2.5 border-b border-cinnamon/5">
                      <span className="text-charcoal/50 font-semibold">Email Address:</span>
                      <strong className="text-charcoal">{user.email}</strong>
                    </div>
                    <div className="flex justify-between py-2.5 border-b border-cinnamon/5">
                      <span className="text-charcoal/50 font-semibold">User Role Level:</span>
                      <strong className="text-olive uppercase tracking-widest text-xs font-extrabold">{user.role} Member</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
