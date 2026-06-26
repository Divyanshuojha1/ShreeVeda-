import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send, MapPin, Phone, Mail, Award, CheckCircle, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-charcoal text-[#E0DEC9] border-t-2 border-saffron/20 font-sans relative overflow-hidden">
      {/* Upper Brand Highlights */}
      <div className="border-b border-white/5 py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
              <Award size={24} />
            </div>
            <h4 className="font-serif text-lg font-bold text-ivory tracking-wider">100% Organic certified</h4>
            <p className="text-xs text-[#BCB99F] max-w-xs">
              Sourced directly from verified farming cooperatives utilizing sustainable biodynamic agricultural principles.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
              <CheckCircle size={24} />
            </div>
            <h4 className="font-serif text-lg font-bold text-ivory tracking-wider">Cryo-milled purity</h4>
            <p className="text-xs text-[#BCB99F] max-w-xs">
              Milled at ultra-cool temperatures to guarantee natural essential oil conservation (piperine, curcumin, safranal).
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-serif text-lg font-bold text-ivory tracking-wider">Rigorous multi-stage checks</h4>
            <p className="text-xs text-[#BCB99F] max-w-xs">
              Each package is batch-tested for aflatoxins, heavy metals, and adulterants. Zero fillers, sugar, or dyes.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Bio */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-ivory tracking-widest">SHREE VEDA</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-saffron font-bold">Organic Heritage Spices</span>
          </div>
          <p className="text-sm text-[#BCB99F] leading-relaxed">
            Inspired by ancient culinary wisdom and India’s rich soil tapestry, Shree Veda bridges the gap between ancestral organic farms and the contemporary global kitchen.
          </p>
          <div className="flex flex-col gap-2.5 text-xs text-[#BCB99F]">
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-saffron shrink-0" />
              108, Veda Nilayam, Mysuru, KA, India
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} className="text-saffron shrink-0" />
              +91 80 4321 0987
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-saffron shrink-0" />
              care@shreeveda.com
            </span>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-5">
          <h3 className="font-serif text-lg font-bold text-ivory tracking-wider border-b border-white/5 pb-2">The Collection</h3>
          <ul className="flex flex-col gap-3 text-sm text-[#BCB99F]">
            <li><Link to="/products" className="hover:text-saffron transition-colors">Ground Spices</Link></li>
            <li><Link to="/products" className="hover:text-saffron transition-colors">Whole Spices</Link></li>
            <li><Link to="/products" className="hover:text-saffron transition-colors">Blend Masalas</Link></li>
            <li><Link to="/products" className="hover:text-saffron transition-colors">Heritage Gift Boxes</Link></li>
            <li><Link to="/recipes" className="hover:text-saffron transition-colors">Gourmet Recipes</Link></li>
          </ul>
        </div>

        {/* Support & legal */}
        <div className="flex flex-col gap-5">
          <h3 className="font-serif text-lg font-bold text-ivory tracking-wider border-b border-white/5 pb-2">Information</h3>
          <ul className="flex flex-col gap-3 text-sm text-[#BCB99F]">
            <li><Link to="/about" className="hover:text-saffron transition-colors">Our Legacy & Mission</Link></li>
            <li><Link to="/faq" className="hover:text-saffron transition-colors">Frequently Asked Questions</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-saffron transition-colors">Shipping Policy</Link></li>
            <li><Link to="/refund-policy" className="hover:text-saffron transition-colors">Refund & Return Policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-saffron transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-saffron transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="flex flex-col gap-5">
          <h3 className="font-serif text-lg font-bold text-ivory tracking-wider border-b border-white/5 pb-2">The Veda Letter</h3>
          <p className="text-sm text-[#BCB99F]">
            Subscribe to receive ancient herbal wisdom, exclusive farm-to-table recipes, and advance access to limited-reserve harvests.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <div className="flex rounded-lg border border-white/10 overflow-hidden bg-white/5">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-sm text-ivory px-4 py-2.5 outline-none w-full placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="bg-cinnamon text-ivory hover:bg-saffron hover:text-charcoal px-4 transition-colors flex items-center justify-center shrink-0"
                aria-label="Subscribe"
              >
                <Send size={16} />
              </button>
            </div>
            {subscribed && (
              <span className="text-xs text-saffron font-bold animate-pulse">
                Welcome to the legacy. Check your inbox soon!
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Decorative and humble bottom copyright */}
      <div className="border-t border-white/5 bg-black/20 text-[#8C8975] text-xs py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Shree Veda Spices Private Limited. Crafted with respect for soil and ancient culinary arts.</p>
          <p className="flex items-center gap-4">
            <span>FSSAI License No. 10826999000108</span>
            <span>•</span>
            <span>Farms Sourced: Western Ghats, Kashmir, Sangli</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
