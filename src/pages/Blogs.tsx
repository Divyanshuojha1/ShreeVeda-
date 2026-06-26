import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { SEOHead } from "../components/SEOHead";
import { User, Calendar, BookOpen, ArrowRight } from "lucide-react";

export const Blogs: React.FC = () => {
  const { blogs } = useApp();
  const [activeBlog, setActiveBlog] = useState<any | null>(null);

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead title="Veda Chronicles | Shree Veda" description="Read articles about organic farming, curcumins benefits, Ayurvedic recipes, and spice milling science on Shree Veda Chronicles." />

      <div className="max-w-6xl mx-auto">
        {activeBlog ? (
          /* Active Expanded Article View */
          <div className="bg-white border border-cinnamon/10 rounded-[32px] p-6 md:p-10 shadow-sm animate-fade-in-up">
            <button
              onClick={() => setActiveBlog(null)}
              className="text-xs uppercase tracking-widest font-extrabold text-cinnamon/60 hover:text-cinnamon flex items-center gap-2 mb-8 transition-colors"
            >
              ← Back to Chronicles
            </button>

            <div className="aspect-video w-full rounded-xl overflow-hidden border border-cinnamon/5 mb-8 max-h-[400px]">
              <img
                src={activeBlog.image}
                alt={activeBlog.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-4 items-center text-xs text-charcoal/50 mb-4 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><User size={13} /> {activeBlog.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {activeBlog.date}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight leading-tight mb-6">
              {activeBlog.title}
            </h1>

            <div className="prose prose-stone max-w-none text-sm md:text-base text-charcoal/70 leading-relaxed flex flex-col gap-5">
              <p className="font-semibold text-cinnamon text-base md:text-lg italic bg-cinnamon/5 border-l-4 border-saffron p-4 rounded-r-xl">
                {activeBlog.excerpt}
              </p>
              <p className="whitespace-pre-line">
                {activeBlog.content}
              </p>
              <p>
                Organic seasonings retain their active therapeutic compounds (like safranal, curcumin, and piperine) only if milled and packaged with utmost care. At Shree Veda, we check and certify every single batch in independent labs to verify that no synthetic adulteration, fillers, or chemical dye bleaching ever affects our customers.
              </p>
            </div>
          </div>
        ) : (
          /* Chronicles Directory Listing */
          <div>
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">The Herbal Almanac</span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight">
                The Veda Chronicles
              </h1>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                Explore essays on molecular culinary science, Ayurvedic preventative nutrition, and the heritage history of India’s organic agricultural landscapes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-white border border-cinnamon/10 rounded-[32px] overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                  <div>
                    <div className="aspect-video w-full overflow-hidden relative border-b border-cinnamon/5">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex flex-col gap-3">
                      <div className="flex gap-2.5 items-center text-[10px] text-charcoal/40 font-bold uppercase tracking-wider">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.author.split(",")[0]}</span>
                      </div>
                      <h2 className="font-serif text-xl md:text-2xl font-bold text-cinnamon leading-tight group-hover:text-saffron transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-xs md:text-sm text-charcoal/60 line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-cinnamon/5 flex justify-between items-center">
                    <div className="flex gap-1.5">
                      {blog.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[9px] bg-olive/10 text-olive font-extrabold px-2 py-0.5 rounded uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveBlog(blog)}
                      className="text-xs font-extrabold text-cinnamon uppercase tracking-widest flex items-center gap-1 group/btn"
                    >
                      Read Article
                      <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
