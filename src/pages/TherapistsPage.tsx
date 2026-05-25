import { useApp } from "../context/AppContext";
import { Sparkles, Award, Star } from "lucide-react";

export default function TherapistsPage() {
  const { therapists, handleBookImmediate, handleBookScheduled } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="font-serif-spa text-4xl md:text-5xl font-extrabold text-spa-navy mb-3">Our Therapists</h1>
        <p className="text-stone-500 max-w-xl mx-auto">Meet our team of certified, professional therapists ready to serve you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {therapists.map((t) => (
          <div key={t.id} className="bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
            <div className="aspect-[3/4] overflow-hidden relative">
              <img src={t.avatar} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  t.status === "AVAILABLE_NOW" ? "bg-emerald-500 text-white" : "bg-stone-500/80 text-white"
                }`}>
                  {t.status === "AVAILABLE_NOW" ? "Available Now" : `Next: ${t.nextAvailableTime}`}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-serif-spa font-bold text-base text-spa-navy">{t.name}</h3>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <Star className="w-3 h-3 fill-current" />
                  <strong>{t.rating}</strong>
                  <span className="text-stone-400">({t.reviewsCount})</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 font-mono-spa mb-2">{t.nationality} • {t.specialties.slice(0, 2).join(", ")}</p>
              <p className="text-xs text-stone-500 leading-relaxed mb-3 line-clamp-2">{t.bio}</p>
              <div className="flex gap-2">
                {t.status === "AVAILABLE_NOW" ? (
                  <button
                    onClick={() => handleBookImmediate(t)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    onClick={() => handleBookScheduled(t)}
                    className="flex-1 bg-[#c5a47e] hover:bg-[#b8946e] text-white py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all"
                  >
                    Schedule
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
