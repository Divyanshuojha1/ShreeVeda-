import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";
import { QuickViewModal } from "../components/QuickViewModal";
import { SEOHead } from "../components/SEOHead";
import { ArrowRight, Flame, Sparkles, Sprout, ShieldCheck, Heart, Star, Compass, Play, BookOpen } from "lucide-react";

export const Home: React.FC = () => {
  const { products, categories, recipes, blogs } = useApp();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Get Bestsellers
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  const testimonials = [
    {
      name: "Prisha Deshmukh",
      role: "Michelin-Starred Chef",
      quote: "The aroma of Shree Veda's Royal Garam Masala reminds me of my grandmother's spice courtyard in Gwalior. Its purity is unmatched in commercial markets.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
    },
    {
      name: "Dr. Sandeep Chawla",
      role: "Functional Medicine Practitioner",
      quote: "I recommend Shree Veda's Sangli Turmeric to all my patients. Its verified 4.5%+ curcumin concentration makes it a genuine therapeutic grade compound.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120"
    }
  ];

  return (
    <div className="overflow-hidden bg-ivory font-sans">
      <SEOHead
        title="Shree Veda Spices | Premium Organic Authentic Indian Spices"
        description="Sourced directly from certified heritage farms of Sangli, Kerala, and Kashmir. Experience cryo-milled organic spices with maximum curcumin, piperine, and therapeutic oils."
      />

      {/* Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 md:px-8 border-b border-cinnamon/5 overflow-hidden">
        {/* Background decorative blurry circles for ambient spice-dust atmosphere */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-saffron/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-kashmiri/5 rounded-full filter blur-[100px] animate-pulse delay-1000"></div>

        {/* Floating Spice Particles (CSS animated floating shapes to simulate cardamom/chili dust) */}
        <div className="absolute top-1/3 left-1/4 w-3.5 h-3.5 bg-saffron/30 rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-cinnamon/20 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-olive/40 rounded-full animate-float" style={{ animationDelay: "4s" }}></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero text */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 text-cinnamon text-xs uppercase tracking-widest font-extrabold animate-pulse">
              <Sparkles size={12} />
              Heritage Reserve Collection
            </div>

            <h1 className="font-serif text-4xl md:text-6xl xl:text-7xl font-bold text-cinnamon tracking-tight leading-[1.05]">
              Pure, Hand-Ground <br />
              <span className="font-serif-ital text-saffron">Soul of India</span> <br />
              in Every Grain.
            </h1>

            <p className="text-base md:text-lg text-charcoal/75 max-w-xl leading-relaxed">
              Experience organic single-origin spices harvested from bio-diverse heirloom farms. Cryo-milled at cold temperatures to guarantee 100% natural healing essential oils remain untouched.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <Link
                to="/products"
                className="bg-cinnamon hover:bg-saffron text-ivory hover:text-charcoal px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-extrabold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Explore Spices
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="border border-cinnamon/20 hover:border-cinnamon hover:bg-cinnamon/5 text-cinnamon px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-extrabold transition-all flex items-center justify-center gap-2"
              >
                <Compass size={16} />
                Our Heritage Story
              </Link>
            </div>

            {/* Quick stats badges */}
            <div className="grid grid-cols-3 gap-6 md:gap-10 border-t border-cinnamon/10 pt-8 mt-4 w-full">
              <div>
                <span className="font-serif text-2xl md:text-3xl font-bold text-cinnamon block">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/50 font-bold">Organic Certified</span>
              </div>
              <div>
                <span className="font-serif text-2xl md:text-3xl font-bold text-cinnamon block">4.5%+</span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/50 font-bold">Curcumin Guarantee</span>
              </div>
              <div>
                <span className="font-serif text-2xl md:text-3xl font-bold text-cinnamon block">Direct</span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/50 font-bold">Fair-Trade Sourced</span>
              </div>
            </div>
          </div>

          {/* Hero Image / Graphic Container */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Round decorative tray framing */}
            <div className="absolute w-[80%] aspect-square rounded-full border border-saffron/20 animate-spin" style={{ animationDuration: "120s" }}></div>
            <div className="absolute w-[95%] aspect-square rounded-full border-2 border-dashed border-cinnamon/5"></div>
            
            <div className="relative w-full max-w-[360px] md:max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-ivory transform rotate-3 hover:rotate-0 transition-transform duration-500 group">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=700"
                alt="Beautiful Indian Spices Platter"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
              />
              {/* Overlay Label Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-ivory/95 backdrop-blur-md p-4 rounded-xl border border-saffron/15 shadow-lg flex justify-between items-center">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-olive font-extrabold block">Handcrafted Reserve</span>
                  <span className="font-serif text-sm font-bold text-cinnamon">Signature Royal Spice Set</span>
                </div>
                <Link to="/products/royal-wooden-box" className="text-saffron hover:text-cinnamon transition-colors">
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Categories Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-cinnamon/5">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">The Spice Palette</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight">
            Curated Spice Collections
          </h2>
          <p className="text-sm text-charcoal/60 leading-relaxed">
            Delve into single-origin ground powders, select hand-plucked whole berries, and traditional roasted masala formulations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative h-96 rounded-[32px] overflow-hidden border border-cinnamon/10 shadow-sm hover:shadow-xl transition-all duration-300 block bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80 z-10"></div>
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-ivory flex flex-col gap-2">
                <span className="text-[10px] text-saffron uppercase tracking-[0.2em] font-extrabold">Collection</span>
                <h3 className="font-serif text-2xl font-bold tracking-tight leading-tight group-hover:text-saffron transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-cinnamon/5 border-b border-cinnamon/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
            <div className="flex flex-col gap-2.5 max-w-xl text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">Highly Coquetted</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight">
                Our Best Sellers
              </h2>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                The most popular selections in high demand by master chefs and Ayurvedic households across the subcontinent.
              </p>
            </div>
            <Link
              to="/products"
              className="bg-transparent hover:bg-cinnamon border-2 border-cinnamon text-cinnamon hover:text-ivory px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest font-extrabold transition-all"
            >
              See Full Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Pure Craftsmanship, Non-technical */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-cinnamon/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Block */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">The Veda Seal</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight leading-tight">
              Honest Agriculture, Ancient Methods.
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              We do not cut corners. Shree Veda was born out of a commitment to save pure culinary art forms. By partnering directly with traditional farming guilds, we protect both the environment and India's spice soul.
            </p>
            
            <ul className="flex flex-col gap-4 text-sm text-charcoal/80 pt-2">
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-olive/10 text-olive mt-0.5"><Sprout size={16} /></div>
                <div>
                  <strong className="font-bold text-cinnamon">Direct Farmers Cooperatives</strong>
                  <p className="text-xs text-charcoal/60">We bypass corporate middle-agents, ensuring farmers receive 35%+ higher fair-trade wages directly.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-olive/10 text-olive mt-0.5"><Flame size={16} /></div>
                <div>
                  <strong className="font-bold text-cinnamon">No Thermo-Extraction</strong>
                  <p className="text-xs text-charcoal/60">Spices are never oil-extracted or adulterated with synthetic colorants, starch fillers, or MSG.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Block */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-cinnamon/5 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-4xl font-extrabold text-saffron block mb-3">01</span>
              <h3 className="font-serif text-xl font-bold text-cinnamon mb-2">Heritage Seed Preservation</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed">
                We work strictly with native landrace heirloom seeds (non-hybrid, non-GMO) that have naturally adapted over centuries to produce highly potent medicinal oils.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-cinnamon/5 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-4xl font-extrabold text-saffron block mb-3">02</span>
              <h3 className="font-serif text-xl font-bold text-cinnamon mb-2">Sun-Cured Maturity</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed">
                Our chilies, turmeric roots, and peppercorns are slow-cured in ambient solar warmth under clean meshes instead of heavy industrial drying ovens.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-cinnamon/5 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-4xl font-extrabold text-saffron block mb-3">03</span>
              <h3 className="font-serif text-xl font-bold text-cinnamon mb-2">Traditional Stone Grinding</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed">
                Our premium single-batches are milled utilizing stone mills (Chakkis) rotating at slow, friction-free speeds, preventing thermal degradation of volatile flavors.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-cinnamon/5 shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-4xl font-extrabold text-saffron block mb-3">04</span>
              <h3 className="font-serif text-xl font-bold text-cinnamon mb-2">Triple-Seal Glass Storage</h3>
              <p className="text-xs text-charcoal/60 leading-relaxed">
                Packed within bespoke violet-tinted glass jars or reusable triple-foil pouches to completely block ultraviolet light decay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Recipe Showcase section */}
      <section className="py-20 bg-[#FAF9F5]/40 border-b border-cinnamon/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">The Culinary Arts</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight">
              Shree Veda Kitchen Chronicles
            </h2>
            <p className="text-sm text-charcoal/60 leading-relaxed">
              Unlock the secrets of traditional Indian spice chemistry. Learn how to temper, roast, and infuse spices correctly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.slice(0, 2).map((rec) => (
              <div key={rec.id} className="bg-white rounded-2xl overflow-hidden border border-cinnamon/10 shadow-sm flex flex-col lg:flex-row group hover:shadow-md transition-all">
                <div className="lg:w-2/5 relative h-52 lg:h-auto">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <div className="lg:w-3/5 p-6 flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      {rec.spiceTags.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[9px] bg-saffron/10 text-cinnamon font-extrabold px-2 py-0.5 rounded uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-cinnamon leading-tight group-hover:text-saffron transition-colors">
                      {rec.title}
                    </h3>
                    <p className="text-xs text-charcoal/60 line-clamp-3 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-cinnamon/5 mt-4">
                    <span className="text-xs text-charcoal/50 font-semibold">{rec.prepTime} • {rec.cookTime}</span>
                    <Link to="/recipes" className="text-xs font-extrabold text-cinnamon uppercase tracking-wider flex items-center gap-1 group/btn">
                      View Recipe
                      <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews & Testimonials */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-cinnamon/5">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">Real Affirmations</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight">
            Loved by Connoisseurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-cinnamon/10 shadow-sm relative flex flex-col justify-between h-full">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-saffron stroke-saffron" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-charcoal/80 italic leading-relaxed mb-6">
                  "{test.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={test.avatar}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-saffron/20"
                />
                <div>
                  <h4 className="font-serif text-base font-bold text-cinnamon leading-tight">{test.name}</h4>
                  <span className="text-xs text-charcoal/50">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Instagram / Culinary Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">Virtual Spice Bazaar</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-cinnamon tracking-tight">
            Follow Our Spice Journey @ShreeVeda.Spices
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1610970881699-44a5587caaec?auto=format&fit=crop&q=80&w=400"
          ].map((url, idx) => (
            <div key={idx} className="aspect-square rounded-xl overflow-hidden relative group border border-cinnamon/5">
              <img
                src={url}
                alt="Instagram Spice Culinary Art"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white font-semibold text-xs">
                View Post
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Quick View Modal Container */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
