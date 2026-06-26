import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SEOHead } from "../components/SEOHead";
import { Shield, Truck, RefreshCw, Scale } from "lucide-react";

export const LegalPolicies: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"privacy" | "refund" | "shipping" | "terms">("privacy");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["privacy", "refund", "shipping", "terms"].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead title="Legal Guidelines | Shree Veda" description="Read our privacy policy, refund policy, terms of service, and shipping parameters." />

      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight mb-8 text-center">
          Regulatory & Policy Guidelines
        </h1>

        {/* Tab buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white border border-cinnamon/10 p-2 rounded-[24px] mb-10 text-xs font-bold uppercase tracking-widest text-center shadow-sm">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "privacy" ? "bg-cinnamon text-white shadow-sm" : "hover:bg-cinnamon/5 text-charcoal/60"
            }`}
          >
            <Shield size={14} />
            Privacy
          </button>
          <button
            onClick={() => setActiveTab("refund")}
            className={`py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "refund" ? "bg-cinnamon text-white shadow-sm" : "hover:bg-cinnamon/5 text-charcoal/60"
            }`}
          >
            <RefreshCw size={14} />
            Refunds
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "shipping" ? "bg-cinnamon text-white shadow-sm" : "hover:bg-cinnamon/5 text-charcoal/60"
            }`}
          >
            <Truck size={14} />
            Shipping
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "terms" ? "bg-cinnamon text-white shadow-sm" : "hover:bg-cinnamon/5 text-charcoal/60"
            }`}
          >
            <Scale size={14} />
            Terms
          </button>
        </div>

        {/* Policy Content Board */}
        <div className="bg-white border border-cinnamon/10 rounded-[32px] p-6 md:p-10 shadow-sm text-sm text-charcoal/70 leading-relaxed flex flex-col gap-5">
          {activeTab === "privacy" && (
            <div className="flex flex-col gap-4 animate-fade-in-up">
              <h2 className="font-serif text-2xl font-bold text-cinnamon border-b border-cinnamon/5 pb-2">Privacy & Consent Policy</h2>
              <p>
                At Shree Veda, accessible from www.shreeveda.com, we prioritize our guests' privacy. We only collect essential data necessary to fulfill purchases, verify payment transactions, and notify you regarding spice harvest updates.
              </p>
              <h3 className="font-bold text-cinnamon text-base mt-2">Information Sourced & Logged</h3>
              <p>
                When you register or purchase, we securely record your name, delivery address, phone, and billing details. Payment processing (Stripe, Razorpay) is conducted via secure encrypted iFrame protocols; we never read, store, or log actual card CVVs or bank PINs on our servers.
              </p>
              <p>
                Your data is strictly stored on encrypted local configurations and cloud database layers. We do not sell, rent, or share personal profiles with marketing syndicates.
              </p>
            </div>
          )}

          {activeTab === "refund" && (
            <div className="flex flex-col gap-4 animate-fade-in-up">
              <h2 className="font-serif text-2xl font-bold text-cinnamon border-b border-cinnamon/5 pb-2">Refund & Return Guidelines</h2>
              <p>
                Because spices are perishable organic food items, we cannot accept return parcels once the security seal of the jar or pouch is broken, due to FSSAI sanitization laws.
              </p>
              <h3 className="font-bold text-cinnamon text-base mt-2">Damages & Errors Sourced</h3>
              <p>
                If your parcel arrives with a shattered glass container, moisture entry, or the incorrect weight SKU, we will immediately issue a 100% refund or ship out a replacement batch at no charge.
              </p>
              <p>
                To request a replacement, please email photos of the defective parcel to care@shreeveda.com within 48 hours of delivery along with your Shree Veda order ID.
              </p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="flex flex-col gap-4 animate-fade-in-up">
              <h2 className="font-serif text-2xl font-bold text-cinnamon border-b border-cinnamon/5 pb-2">Shipping & Packaging parameters</h2>
              <p>
                We dispatch fresh harvest batches from our sanitised central facility in Mysuru, Karnataka within 24 working hours of order confirmation.
              </p>
              <h3 className="font-bold text-cinnamon text-base mt-2">Delivery Charges & Speed</h3>
              <p>
                - Standard Delivery (₹50 fee): Automatically waived for orders with subtotal values exceeding ₹499.
              </p>
              <p>
                - Delivery Timeframe: 2-4 working days for Tier 1 cities, and 5-7 working days for regional towns.
              </p>
              <p>
                All items are packed using zero-plastic, biodegradable paper pouches or recyclable violet glass containers fitted with moisture absorbers to guarantee the spices arrive fresh and aromatic.
              </p>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="flex flex-col gap-4 animate-fade-in-up">
              <h2 className="font-serif text-2xl font-bold text-cinnamon border-b border-cinnamon/5 pb-2">Terms & Conditions of Service</h2>
              <p>
                Welcome to Shree Veda Spices. By accessing this platform and placing orders, you agree to comply with our commercial terms of service:
              </p>
              <h3 className="font-bold text-cinnamon text-base mt-2">Authenticity & Grading</h3>
              <p>
                Shree Veda strives to guarantee identical color and oil percentages displayed; however, because our spices are purely organic crops without artificial stabilizers, minor sensory variations in color, heat, or seed size are natural outcomes of changing harvest seasons.
              </p>
              <p>
                Prices and availability are subject to change without prior notice based on seasonal crop yields in the Western Ghats and Kashmir.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
