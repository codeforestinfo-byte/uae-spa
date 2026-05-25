import { useState, useEffect } from "react";
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, Sparkles, Award, ShieldCheck } from "lucide-react";

const HERO_IMAGES = [
  "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-3-768x788.jpg",
  "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-2-768x788.jpg",
  "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-32-o67bczsw7p5kvoxj17fhez66fb6rk8fw3rpft3uqyo.jpg",
  "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-4-1024x963.jpg",
];

const SERVICE_IMAGES = [
  { src: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/SErvices/Salt%20Peels.jpg", name: "Salt Peels" },
  { src: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/SErvices/stone_masagdge.jpg", name: "Hot Stone Massage" },
  { src: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/SErvices/Facial%20Care.jpg", name: "Facial Care" },
  { src: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/SErvices/Manual%20Massage.jpg", name: "Manual Massage" },
  { src: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-19-1-470x470.jpg", name: "Aromatherapy" },
  { src: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-20-1-470x470.jpg", name: "Luxury Treatment" },
];

interface HeroSectionProps {
  ratingAverage: string;
  totalReviewsCount: number;
  onBookNow: () => void;
}

export default function HeroSection({ ratingAverage, totalReviewsCount, onBookNow }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pink-200/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-2 bg-pink-100/80 text-pink-700 px-4 py-1.5 rounded-full text-xs font-semibold border border-pink-200/50 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Premium Home-Service Spa in Abu Dhabi
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-spa font-extrabold tracking-tight text-[#1c2c31] leading-tight">
              Innovative Beauty
              <br />
              <span className="bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">
                & Wellness
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1c2c31]/70 font-medium max-w-lg">
              HOME SERVICE SPA — Premium mobile spa and massage services delivered to your home, villa, or office across Abu Dhabi.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200/60">
                <Star className="w-4 h-4 fill-current text-amber-400" />
                <strong className="font-bold text-base">{ratingAverage}</strong>
                <span className="text-amber-600/70">({totalReviewsCount} reviews)</span>
              </div>
              <span className="text-[#1c2c31]/30">|</span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Closed • Opens at 11:05 am
              </span>
              <span className="text-[#1c2c31]/30">|</span>
              <span className="flex items-center gap-1 text-[#1c2c31]/60">
                <MapPin className="w-3.5 h-3.5" />
                Al Zahiyah, Abu Dhabi
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onBookNow}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-pink-200/50 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Book Your Experience
              </button>
              <button className="bg-white/80 backdrop-blur-sm border border-amber-200/50 text-[#1c2c31] px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-white transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                View Services
              </button>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-[#1c2c31]/50 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Licensed Therapists
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Sterilized Equipment
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Secure Payment
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white">
              <div className="aspect-[4/5] sm:aspect-[3/4] relative">
                {HERO_IMAGES.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Spa service ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-[#1c2c31] p-2 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-[#1c2c31] p-2 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {HERO_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-amber-400 to-pink-500 text-white px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold text-sm">4.8 ★ Premium</span>
            </div>
          </div>
        </div>

        <div className="relative mt-12 pb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
            <span className="text-xs font-semibold text-[#1c2c31]/40 uppercase tracking-widest">Our Signature Services</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {SERVICE_IMAGES.map((service, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden bg-white shadow-sm border border-pink-100/50 hover:shadow-lg hover:border-amber-200/50 transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={service.src}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="text-white text-xs font-semibold block truncate">{service.name}</span>
                </div>
                <div className="p-2 text-center group-hover:opacity-0 transition-opacity">
                  <span className="text-[10px] font-medium text-[#1c2c31]/60 truncate block">{service.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
