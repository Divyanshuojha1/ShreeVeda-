import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { SEOHead } from "../components/SEOHead";
import { Clock, BookOpen, Utensils, Award, CheckCircle } from "lucide-react";

export const Recipes: React.FC = () => {
  const { recipes } = useApp();
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(recipes[0] || null);

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8 font-sans">
      <SEOHead title="Gourmet Recipes | Shree Veda" description="Master the traditional chemistry of spices with Shree Veda's authentic, farm-to-table culinary recipes." />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-olive">The Spice Sommelier</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-cinnamon tracking-tight">
            Kitchen Chronicles
          </h1>
          <p className="text-sm text-charcoal/60 leading-relaxed">
            Spices are molecular instruments. Learn how to temper, dry-roast, and simmer our single-origin organic spice harvests to unlock maximum nutrition and authentic flavor structures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Recipe Selection Rail */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h2 className="font-serif text-lg font-bold text-cinnamon uppercase tracking-wider mb-2 border-b border-cinnamon/5 pb-2">
              Select Gourmet Recipe
            </h2>
            {recipes.map((rec) => (
              <button
                key={rec.id}
                onClick={() => setSelectedRecipe(rec)}
                className={`p-4 rounded-xl text-left border transition-all flex gap-3.5 items-center bg-white cursor-pointer ${
                  selectedRecipe?.id === rec.id
                    ? "border-cinnamon shadow-md bg-cinnamon/5"
                    : "border-cinnamon/10 hover:border-cinnamon/30"
                }`}
              >
                <img
                  src={rec.image}
                  alt={rec.title}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-cover rounded-lg border border-cinnamon/5 shrink-0"
                />
                <div className="truncate flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-olive">{rec.difficulty} Difficulty</span>
                  <strong className="text-sm font-serif font-bold text-cinnamon truncate leading-tight mt-0.5">{rec.title}</strong>
                  <span className="text-[10px] text-charcoal/50 mt-0.5">{rec.prepTime} prep • {rec.cookTime} cook</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Active Recipe Details */}
          <div className="lg:col-span-8 bg-white border border-cinnamon/10 rounded-[32px] p-6 md:p-10 shadow-sm">
            {selectedRecipe ? (
              <div className="flex flex-col gap-6 animate-fade-in-up">
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-cinnamon/5 relative shadow-sm">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    {selectedRecipe.spiceTags.map((tag: string, i: number) => (
                      <span key={i} className="text-[9px] bg-saffron text-charcoal font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-2xl md:text-3.5xl font-bold text-cinnamon leading-tight">
                    {selectedRecipe.title}
                  </h2>
                  <p className="text-sm text-charcoal/60 leading-relaxed mt-2.5">
                    {selectedRecipe.description}
                  </p>
                </div>

                {/* Info Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-cinnamon/15 bg-olive/5 rounded-xl text-xs text-charcoal/80 text-center font-bold">
                  <div>
                    <span className="text-[10px] text-olive uppercase block mb-1">Preparation</span>
                    <span className="text-cinnamon flex items-center justify-center gap-1"><Clock size={12} /> {selectedRecipe.prepTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-olive uppercase block mb-1">Cooking Time</span>
                    <span className="text-cinnamon flex items-center justify-center gap-1"><Utensils size={12} /> {selectedRecipe.cookTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-olive uppercase block mb-1">Servings</span>
                    <span className="text-cinnamon block">{selectedRecipe.servings} guests</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-olive uppercase block mb-1">Difficulty</span>
                    <span className="text-cinnamon flex items-center justify-center gap-1"><Award size={12} /> {selectedRecipe.difficulty}</span>
                  </div>
                </div>

                {/* Ingredients & steps */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-cinnamon/10">
                  {/* Ingredients */}
                  <div className="md:col-span-5 flex flex-col gap-3">
                    <h3 className="font-serif text-lg font-bold text-cinnamon flex items-center gap-2">
                      <BookOpen size={16} /> Ingredients
                    </h3>
                    <ul className="flex flex-col gap-2.5 text-xs text-charcoal/80">
                      {selectedRecipe.ingredients.map((ing: string, i: number) => (
                        <li key={i} className="flex gap-2 items-start py-1.5 border-b border-cinnamon/5">
                          <CheckCircle size={14} className="text-olive shrink-0 mt-0.5" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    <h3 className="font-serif text-lg font-bold text-cinnamon flex items-center gap-2">
                      <Utensils size={16} /> Culinary Steps
                    </h3>
                    <ol className="flex flex-col gap-6 text-sm text-charcoal/70 leading-relaxed">
                      {selectedRecipe.instructions.map((step: string, i: number) => (
                        <li key={i} className="flex gap-4 items-start">
                          <span className="w-6 h-6 rounded-full bg-cinnamon text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p>{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-12 text-sm text-charcoal/40 italic">Select a recipe to showcase cooking details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
