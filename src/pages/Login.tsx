import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SEOHead } from "../components/SEOHead";
import { ShieldAlert, ArrowRight, Mail, Lock, Check } from "lucide-react";

export const Login: React.FC = () => {
  const { login, error } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    try {
      setLogging(true);
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Login fail", err);
    } finally {
      setLogging(false);
    }
  };

  const handlePreFill = (role: "user" | "admin") => {
    if (role === "user") {
      setEmail("user@shreeveda.com");
      setPassword("user123");
    } else {
      setEmail("admin@shreeveda.com");
      setPassword("admin123");
    }
  };

  return (
    <div className="bg-ivory min-h-[80vh] py-12 px-4 md:px-8 font-sans flex items-center justify-center">
      <SEOHead title="Portal Login | Shree Veda" description="Sign in to your organic Shree Veda Spices account." />

      <div className="max-w-md w-full bg-white border border-cinnamon/10 rounded-[32px] p-8 shadow-md flex flex-col gap-6">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-olive">The Spice Sanctuary</span>
          <h1 className="font-serif text-3xl font-bold text-cinnamon mt-1">Welcome Back</h1>
          <p className="text-xs text-charcoal/50 mt-1">Login to access saved wishlists, histories, and checkout speeds.</p>
        </div>

        {error && (
          <div className="p-3 bg-kashmiri/10 border border-kashmiri/20 text-kashmiri text-xs rounded-xl flex items-center gap-2">
            <ShieldAlert size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-charcoal/50">Your Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="care@shreeveda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-cinnamon/10 outline-none rounded-xl py-3 pl-10 pr-4 placeholder:text-gray-400 focus:border-cinnamon transition-all shadow-sm"
              />
              <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={15} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-charcoal/50">Password</label>
              <Link to="/forgot-password" className="text-xs text-cinnamon hover:underline font-semibold">Forgot?</Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-cinnamon/10 outline-none rounded-xl py-3 pl-10 pr-4 placeholder:text-gray-400 focus:border-cinnamon transition-all shadow-sm"
              />
              <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={15} />
            </div>
          </div>

          <button
            type="submit"
            disabled={logging}
            className="w-full bg-cinnamon hover:bg-saffron hover:text-charcoal text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-md hover:shadow-lg"
          >
            {logging ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                Entering sanctuary...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Enter Sanctuary
                <ArrowRight size={15} />
              </span>
            )}
          </button>
        </form>

        {/* Quick Testing Credentials Box */}
        <div className="bg-cinnamon/5 border border-cinnamon/10 rounded-[24px] p-5 text-xs text-charcoal/60 flex flex-col gap-3">
          <strong className="text-cinnamon font-bold block border-b border-cinnamon/5 pb-1 uppercase tracking-widest text-[10px]">
            Demo Vault Credentials
          </strong>
          <div className="flex justify-between items-center gap-2">
            <div>
              <p className="font-bold text-charcoal text-[11px]">Regular User Portal</p>
              <p>Email: user@shreeveda.com | PW: user123</p>
            </div>
            <button
              onClick={() => handlePreFill("user")}
              className="bg-cinnamon/10 hover:bg-cinnamon text-cinnamon hover:text-white px-2.5 py-1.5 rounded-lg font-bold text-[10px] transition-colors uppercase shrink-0"
            >
              Fill
            </button>
          </div>
          <div className="flex justify-between items-center gap-2 border-t border-cinnamon/5 pt-2">
            <div>
              <p className="font-bold text-kashmiri text-[11px]">Admin Control Panel</p>
              <p>Email: admin@shreeveda.com | PW: admin123</p>
            </div>
            <button
              onClick={() => handlePreFill("admin")}
              className="bg-kashmiri/10 hover:bg-kashmiri text-kashmiri hover:text-white px-2.5 py-1.5 rounded-lg font-bold text-[10px] transition-colors uppercase shrink-0"
            >
              Fill
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-charcoal/50">
          New to the Veda heritage?{" "}
          <Link to="/signup" className="text-cinnamon font-bold hover:underline">
            Register Account
          </Link>
        </p>
      </div>
    </div>
  );
};
