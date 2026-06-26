import React, { useState } from "react";
import { SEOHead } from "../components/SEOHead";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes Shree Veda spices different from standard supermarket brands?",
      a: "Supermarket brands buy cheap commercial stocks which have been stripped of therapeutic essential oils (curcumin, piperine, gingerol) for pharmaceuticals, leaving a flavorless powder. Shree Veda guarantees single-origin harvests with intact organic essential oils, ground slowly using friction-free cryo-cold stone mills."
    },
    {
      q: "Are your spices certified organic?",
      a: "Yes, 100% of our products are certified organic. We source directly from bio-diverse farming cooperatives under strict participatory guarantee systems (PGS-India) and NOP guidelines. We test every batch for heavy metals and pesticides."
    },
    {
      q: "What is 'Curcumin Content' and why does Sangli Turmeric matter?",
      a: "Curcumin is the active healing compound in turmeric that provides anti-inflammatory benefits. Most standard store turmeric has under 1.5% curcumin. Our Sangli Turmeric guarantees a minimum of 4.5%+ curcumin naturally, providing its intense gold-orange hue and strong therapeutic aroma."
    },
    {
      q: "How should I store my Shree Veda spices to maintain maximum aroma?",
      a: "Keep them in the violet-tinted glass canisters we provide, or in air-tight ceramic containers away from direct sunlight, humidity, and heat sources. Spices should never be kept in wet spaces or sprinkled directly over steaming pots to avoid condensation inside the jar."
    },
    {
      q: "What is your typical delivery timeframe within India?",
      a: "We process and dispatch all orders within 24 working hours from our clean warehouse in Mysuru. Shipments usually reach tier-1 cities (Bangalore, Mumbai, Delhi) within 2-4 days, and other locations within 5-7 days."
    }
  ];

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead title="Frequently Asked Questions | Shree Veda" description="Find answers to common questions about our organic spice sourcing, cryo-milling, certifications, and shipping." />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">Common Queries</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight">
            Queries & Guidance
          </h1>
          <p className="text-sm text-charcoal/60 leading-relaxed">
            Everything you need to know about organic culinary standards, FSSAI certifications, shipping parameters, and storage techniques.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-cinnamon/10 rounded-[24px] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-serif text-base md:text-lg font-bold text-cinnamon flex justify-between items-center gap-4 outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle size={18} className="text-saffron shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-charcoal/70 leading-relaxed border-t border-cinnamon/5 bg-cinnamon/5 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
