import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ShoppingBag, Heart, User, Search, Menu, X, Flame, Sparkles, LogOut, ShieldAlert } from "lucide-react";

interface HeaderProps {
  onSearchToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchToggle }) => {
  const { user, cart, wishlist, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cinnamon/10 glass-nav transition-all duration-300">
      {/* Promo Bar */}
      <div className="bg-cinnamon text-ivory text-[11px] md:text-xs py-1.5 px-4 flex justify-between items-center tracking-widest uppercase font-semibold">
        <span className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-saffron animate-pulse" />
          Organic single-origin spices
        </span>
        <span className="hidden md:inline">Use code <strong className="text-saffron">VEDA10</strong> for 10% Off</span>
        <span className="flex items-center gap-1.5">
          Free Shipping above ₹499
          <Flame size={12} className="text-saffron" />
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-col select-none group">
          <span className="font-serif text-2xl md:text-3xl font-bold text-cinnamon tracking-wider flex items-center gap-1">
            SHREE VEDA
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-olive font-extrabold -mt-1 group-hover:text-saffron transition-colors">
            Authentic Indian Spices
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest font-semibold text-charcoal">
          <Link to="/" className="hover:text-cinnamon transition-colors">Home</Link>
          <Link to="/products" className="hover:text-cinnamon transition-colors">Spices</Link>
          <Link to="/recipes" className="hover:text-cinnamon transition-colors">Recipes</Link>
          <Link to="/blogs" className="hover:text-cinnamon transition-colors">Veda Chronicles</Link>
          <Link to="/about" className="hover:text-cinnamon transition-colors">Our Legacy</Link>
          <Link to="/contact" className="hover:text-cinnamon transition-colors">Contact</Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search trigger */}
          <button
            onClick={onSearchToggle}
            className="p-1.5 hover:text-cinnamon text-charcoal/80 transition-colors relative group"
            aria-label="Search Spices"
          >
            <Search size={21} className="group-hover:scale-105 transition-transform" />
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="p-1.5 hover:text-cinnamon text-charcoal/80 transition-colors relative group"
            aria-label="Wishlist"
          >
            <Heart size={21} className="group-hover:scale-105 transition-transform" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-kashmiri text-ivory text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Shopping Bag */}
          <Link
            to="/cart"
            className="p-1.5 hover:text-cinnamon text-charcoal/80 transition-colors relative group"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={21} className="group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-saffron text-ivory text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Account Portal */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-1.5 border border-cinnamon/20 hover:border-cinnamon/50 rounded-full text-cinnamon font-bold transition-all flex items-center justify-center w-9 h-9 bg-ivory text-sm"
                >
                  {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-xl bg-ivory border border-cinnamon/10 shadow-xl py-2 z-50 animate-fade-in-up font-sans">
                    <div className="px-4 py-2 border-b border-cinnamon/5">
                      <p className="text-xs text-charcoal/50 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-cinnamon truncate">{user.name}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-cinnamon/5 text-charcoal/80 hover:text-cinnamon font-semibold"
                    >
                      <User size={16} />
                      Dashboard
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-cinnamon/5 text-kashmiri hover:text-kashmiri font-bold border-t border-b border-cinnamon/5 bg-kashmiri/5"
                      >
                        <ShieldAlert size={16} />
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-kashmiri/5 text-charcoal/60 hover:text-kashmiri font-semibold transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-1.5 hover:text-cinnamon text-charcoal/80 transition-colors flex items-center justify-center"
                aria-label="User Login"
              >
                <User size={21} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 hover:text-cinnamon text-charcoal/80 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-t border-cinnamon/10 bg-ivory/95 backdrop-blur-md absolute top-full left-0 z-40 p-6 flex flex-col gap-4 shadow-2xl animate-fade-in-up uppercase tracking-widest font-bold text-sm">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-cinnamon/5 hover:text-cinnamon">Home</Link>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-cinnamon/5 hover:text-cinnamon">Spices</Link>
          <Link to="/recipes" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-cinnamon/5 hover:text-cinnamon">Recipes</Link>
          <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-cinnamon/5 hover:text-cinnamon">Chronicles</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-cinnamon/5 hover:text-cinnamon">Our Legacy</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-cinnamon/5 hover:text-cinnamon">Contact</Link>
          {user && user.role === "admin" && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-cinnamon/5 text-kashmiri">Admin Panel</Link>
          )}
        </div>
      )}
    </header>
  );
};
