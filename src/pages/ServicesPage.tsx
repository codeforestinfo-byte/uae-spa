import { useState } from "react";
import { useApp } from "../context/AppContext";
import TherapistHub from "../components/TherapistHub";
import { SERVICES, CATEGORIES } from "../data";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const { therapists, services, handleToggleTherapistStatus, handleBookImmediate, handleBookScheduled, handleBookService } = useApp();
  const [chosenCategory, setChosenCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = chosenCategory === "All"
    ? services
    : services.filter((s) => s.category.toLowerCase().includes(chosenCategory.toLowerCase()));

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="font-serif-spa text-4xl md:text-5xl font-extrabold text-spa-navy mb-3">Our Services</h1>
        <p className="text-stone-500 max-w-xl mx-auto">Premium home-service spa treatments delivered to your location across Abu Dhabi.</p>
      </div>

      <TherapistHub
        therapists={therapists}
        onToggleStatus={handleToggleTherapistStatus}
        onBookImmediate={handleBookImmediate}
        onBookScheduled={handleBookScheduled}
      />

      <div className="mt-10">
        <h3 className="text-xl font-serif-spa font-bold mb-4 text-spa-navy">Treatments Catalog</h3>
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none mb-6">
          <button
            onClick={() => { setChosenCategory("All"); setShowAll(false); }}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors border ${
              chosenCategory === "All" ? "bg-spa-navy text-white border-spa-navy" : "bg-white text-spa-navy border-[#eae3d5] hover:bg-stone-50"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setChosenCategory(cat); setShowAll(false); }}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors border ${
                chosenCategory === cat ? "bg-[#c5a47e] text-white border-[#c5a47e]" : "bg-white text-spa-navy border-[#eae3d5] hover:bg-stone-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((srv) => (
            <div key={srv.id} className="bg-white border border-[#eae3d5] rounded-xl p-5 hover:border-spa-gold transition-all hover:shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-serif-spa font-bold text-base text-spa-navy">{srv.name}</h4>
                  {srv.popular && (
                    <span className="inline-block bg-[#c5a47e]/15 text-[#7d572b] border border-[#c5a47e]/30 px-2 py-0.5 rounded-md text-[9px] font-mono-spa font-bold uppercase tracking-wide mt-1">
                      Signature
                    </span>
                  )}
                </div>
                <span className="font-serif-spa font-extrabold text-lg text-[#1c2c31]">{srv.price} AED</span>
              </div>
              <p className="text-xs text-spa-navy/65 mb-3">{srv.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-spa-navy/40 font-mono-spa">{srv.duration} mins • {srv.category}</span>
                <button
                  onClick={() => handleBookService(srv)}
                  className="bg-spa-navy hover:bg-[#2c3d42] text-white py-1.5 px-4 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1"
                >
                  Book <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length > 6 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#c5a47e] font-semibold text-sm hover:underline cursor-pointer"
            >
              {showAll ? "Show less" : `View all ${filtered.length} treatments`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
