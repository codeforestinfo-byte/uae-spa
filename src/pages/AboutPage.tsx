import { useApp } from "../context/AppContext";
import { Sparkles, Award, ShieldCheck, MapPin, Clock, Star, Phone, Mail } from "lucide-react";

export default function AboutPage() {
  const { ratingAverage, totalReviewsCount } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#c5a47e]/15 text-[#7d572b] px-4 py-1.5 rounded-full text-xs font-semibold border border-[#c5a47e]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            About Us
          </div>
          <h1 className="font-serif-spa text-4xl md:text-5xl font-extrabold text-spa-navy leading-tight mb-4">
            Abu Dhabi's Premier <span className="text-[#c5a47e]">Home-Service Spa</span>
          </h1>
          <p className="text-stone-500 leading-relaxed mb-6">
            Innovative Beauty and Wellness brings luxury spa experiences directly to your home, villa, or office across Abu Dhabi. 
            Our certified therapists arrive with full professional setups — massage tables, organic oils, soft towels, and calming music — 
            transforming your space into a private wellness sanctuary.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-lg border border-stone-200">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <strong>{ratingAverage}</strong>
              <span className="text-stone-400">({totalReviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-500">
              <MapPin className="w-4 h-4" />
              Al Zahiyah, Abu Dhabi
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Opens at 11:05 am
            </div>
          </div>
        </div>
        <div className="relative">
          <div
            className="overflow-hidden shadow-2xl bg-white"
            style={{ clipPath: "polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)" }}
          >
            <img
              src="https://ik.imagekit.io/cwchgveae/SPA%20UAE/spa-treatment-dark-wall.jpg"
              alt="About our spa"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-amber-400 to-pink-500 text-white px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span className="font-bold text-sm">Licensed & Certified</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: ShieldCheck, title: "Certified Therapists", desc: "All therapists are licensed, insured, and medically certified under UAE ministry guidelines." },
          { icon: Award, title: "Premium Equipment", desc: "We bring full leather massage beds, organic oils, fresh towels, and professional-grade equipment." },
          { icon: Sparkles, title: "Luxury Experience", desc: "Every session includes aromatherapy, ambient music, and premium care for a true 5-star spa feel." },
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-stone-100 rounded-xl p-6 text-center hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-[#c5a47e]/10 text-[#7d572b] flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="font-serif-spa font-bold text-sm text-spa-navy mb-2">{item.title}</h3>
            <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-spa-navy rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="font-serif-spa text-3xl md:text-4xl font-bold mb-4">Ready to Experience Luxury?</h2>
        <p className="text-white/60 max-w-lg mx-auto mb-6">Book your premium home-spa session today and let us bring the spa to you.</p>
        <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">
          Book Your Appointment
        </button>
      </div>
    </div>
  );
}
