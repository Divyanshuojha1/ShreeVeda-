import React from "react";
import { SEOHead } from "../components/SEOHead";
import { Award, Compass, Heart, Shield, Sparkles, Sprout } from "lucide-react";

export const About: React.FC = () => {
  return (
    <div className="bg-ivory min-h-screen py-16 px-4 md:px-8 font-sans">
      <SEOHead title="Our Legacy | Shree Veda" description="Learn about Shree Veda's commitment to sustainable organic Indian spice agriculture, stone grinding, and fair trade harvests." />

      <div className="max-w-5xl mx-auto">
        {/* Header Title section */}
        <div className="text-center mb-16 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">Our Origin Legacy</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-cinnamon tracking-tight">
            The Shree Veda Heritage
          </h1>
          <p className="text-sm md:text-base text-charcoal/60 leading-relaxed max-w-2xl mx-auto">
            Bridging ancestral soil traditions with contemporary gastronomy. Our journey began in the biodiversity hubs of the Western Ghats with a single goal: to preserve the living integrity of India's finest spices.
          </p>
        </div>

        {/* Narrative story blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-ivory">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=700"
              alt="Harvesting Organic Spices in India"
              referrerPolicy="no-referrer"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 text-sm md:text-base text-charcoal/70 leading-relaxed">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-cinnamon leading-tight">
              An Organic Re-Evolution
            </h2>
            <p>
              In the race for high yields and low costs, industrial agriculture has stripped spices of their life. Today, most commercial spices are dry-roasted at heavy temperatures, bleached with sulphur dioxide, and stripped of medicinal essential oils to sell as pharma extracts.
            </p>
            <p>
              Shree Veda was founded to change this. We partner with multi-generational organic cooperatives in Sangli, Wayanad, Unjha, and Kashmir. By respecting the natural lunar cycles of planting and curing, our spices retain their native therapeutic powers, color, and aroma.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-white border border-cinnamon/10 rounded-[32px] p-8 md:p-12 mb-20 shadow-sm">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-cinnamon text-center mb-10">Our Sourcing Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-olive/10 rounded-full flex items-center justify-center text-olive"><Sprout size={22} /></div>
              <h3 className="font-serif text-lg font-bold text-cinnamon">Ethical Sourcing</h3>
              <p className="text-xs text-charcoal/60">We purchase directly from verified farmer guilds at prices 35%+ higher than market rates to support rural family cooperatives.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-olive/10 rounded-full flex items-center justify-center text-olive"><Sparkles size={22} /></div>
              <h3 className="font-serif text-lg font-bold text-cinnamon">Cryo-Cold Milling</h3>
              <p className="text-xs text-charcoal/60">Our mills operate at temperature controlled settings below 10°C, ensuring essential oils (safranal, piperine, curcumin) are completely preserved.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-olive/10 rounded-full flex items-center justify-center text-olive"><Shield size={22} /></div>
              <h3 className="font-serif text-lg font-bold text-cinnamon">Strict Laboratory Checks</h3>
              <p className="text-xs text-charcoal/60">Every batch is tested in NABL-accredited third-party laboratories to certify zero heavy metals, chemical pesticide residues, or artificial dyes.</p>
            </div>
          </div>
        </div>

        {/* Sourcing Map highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5 text-sm text-charcoal/70 leading-relaxed">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-cinnamon">The Terroir of Aroma</h2>
            <p>
              Just as wine carries the taste of its grape soil (Terroir), spices derive their volatile character from their climate:
            </p>
            <ul className="flex flex-col gap-2.5 text-xs font-semibold text-charcoal/80">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-saffron" /> <strong>Sangli, MH:</strong> Hot dry climates produce high-curcumin golden turmeric roots.</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-saffron" /> <strong>Wayanad, Kerala:</strong> High elevation rainforests produce Tellicherry Bold pepper.</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-saffron" /> <strong>Pampore, Kashmir:</strong> Rich saffron fields yielding thick, deep crimson mongra stigmas.</li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-ivory">
            <img
              src="https://images.unsplash.com/photo-1610970881699-44a5587caaec?auto=format&fit=crop&q=80&w=700"
              alt="Premium Kashmiri Saffron Harvest"
              referrerPolicy="no-referrer"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
