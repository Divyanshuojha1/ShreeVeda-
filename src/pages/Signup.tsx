import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SEOHead } from "../components/SEOHead";
import { ShieldAlert, ArrowRight, Mail, Lock, User } from "lucide-react";

export const Signup: React.FC = () => {
  const { register, error } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signing, setSigning] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;

    try {
      setSigning(true);
      const success = await register(name, email, password);
      if (success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Signup failure", err);
    } finally {
      setSigning(false);
    }
  };

  return (
    <div className="bg-ivory min-h-[80vh] py-12 px-4 md:px-8 font-sans flex items-center justify-center">
      <SEOHead title="Register Account | Shree Veda" description="Join Shree Veda Spices community and buy premium authentic organic seasonings." />

      <div className="max-w-md w-full bg-white border border-cinnamon/10 rounded-[32px] p-8 shadow-md flex flex-col gap-6">
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-olive">Organic Legacy Sourced</span>
          <h1 className="font-serif text-3xl font-bold text-cinnamon mt-1">Create Account</h1>
          <p className="text-xs text-charcoal/50 mt-1">Register to start tracking orders and curate your favorite organic spices lists.</p>
        </div>

        {error && (
          <div className="p-3 bg-kashmiri/10 border border-kashmiri/20 text-kashmiri text-xs rounded-xl flex items-center gap-2">
            <ShieldAlert size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-charcoal/50">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Meera Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-cinnamon/10 outline-none rounded-xl py-3 pl-10 pr-4 placeholder:text-gray-400 focus:border-cinnamon transition-all shadow-sm"
              />
              <User className="absolute left-3.5 top-3.5 text-gray-400" size={15} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-charcoal/50">Email Address</label>
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
            <label className="text-xs font-bold text-charcoal/50">Password</label>
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
            disabled={signing}
            className="w-full bg-cinnamon hover:bg-saffron hover:text-charcoal text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 shadow-md hover:shadow-lg"
          >
            {signing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Register Account
                <ArrowRight size={15} />
              </span>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-charcoal/50">
          Already a part of Shree Veda?{" "}
          <Link to="/login" className="text-cinnamon font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
