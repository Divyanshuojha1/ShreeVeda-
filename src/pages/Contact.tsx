import React, { useState } from "react";
import { SEOHead } from "../components/SEOHead";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead title="Contact Customer Care | Shree Veda" description="Reach out to Shree Veda organic Indian spices customer care, wholesale divisions, or farming co-ops." />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">Reach Our Sanctuary</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight">
            Contact Shree Veda
          </h1>
          <p className="text-sm text-charcoal/60 leading-relaxed">
            Have queries regarding wholesale orders, spice freshness certificates, or FSSAI testing results? Our Mysuru care team is available to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h2 className="font-serif text-2xl font-bold text-cinnamon mb-2">Heritage Offices</h2>
            
            <div className="flex flex-col gap-5 text-sm text-charcoal/70">
              <div className="flex gap-4 items-start bg-white p-4 rounded-xl border border-cinnamon/5 shadow-sm">
                <MapPin className="text-saffron shrink-0 mt-0.5" size={18} />
                <div>
                  <h3 className="font-bold text-cinnamon">Administrative Headquarters</h3>
                  <p className="text-xs text-charcoal/60 mt-1">108, Veda Nilayam, MG Road, Mysuru, Karnataka - 570001, India</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white p-4 rounded-xl border border-cinnamon/5 shadow-sm">
                <Phone className="text-saffron shrink-0 mt-0.5" size={18} />
                <div>
                  <h3 className="font-bold text-cinnamon">Direct Assistance Phone</h3>
                  <p className="text-xs text-charcoal/60 mt-1">Monday - Saturday (9:00 AM - 6:00 PM IST)</p>
                  <strong className="text-xs text-charcoal mt-1 block">+91 80 4321 0987</strong>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white p-4 rounded-xl border border-cinnamon/5 shadow-sm">
                <Mail className="text-saffron shrink-0 mt-0.5" size={18} />
                <div>
                  <h3 className="font-bold text-cinnamon">Support Mailbox</h3>
                  <p className="text-xs text-charcoal/60 mt-1">Responses within 12 working hours guaranteed.</p>
                  <strong className="text-xs text-charcoal mt-1 block">care@shreeveda.com</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Support form */}
          <div className="md:col-span-7 bg-white border border-cinnamon/10 rounded-[32px] p-6 md:p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-cinnamon mb-6">Write Message</h2>

            {submitted ? (
              <div className="p-6 rounded-xl bg-olive/10 border border-olive/20 text-center flex flex-col gap-3">
                <div className="w-12 h-12 bg-olive text-white rounded-full flex items-center justify-center mx-auto"><CheckCircle2 size={24} /></div>
                <h3 className="font-bold text-olive">Message Dispatched!</h3>
                <p className="text-xs text-charcoal/60 leading-relaxed max-w-sm mx-auto">
                  Thank you for writing. Our heritage care specialists in Mysuru have logged your inquiry and will revert shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-charcoal/50">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-3 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-charcoal/50">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="care@shreeveda.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-3 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-charcoal/50">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your inquiry (retail, partnership, bulk orders, shelf life)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-3 rounded-lg border border-cinnamon/10 bg-white outline-none focus:border-cinnamon resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cinnamon hover:bg-saffron hover:text-charcoal text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Send size={15} />
                  Dispatch Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
