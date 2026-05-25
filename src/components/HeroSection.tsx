import { useState, useEffect, useRef } from "react";
import { Star, MapPin, Sparkles, Award, ShieldCheck, ChevronLeft, ChevronRight, Clock } from "lucide-react";

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
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-pink-50/60 to-white pb-6">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-rose-100/40 via-amber-50/20 to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-amber-200/20" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-pink-200/20" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-pink-200/30 to-amber-200/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-200/30 to-pink-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10">
        {/* Top bar with rating & location */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mb-6 md:mb-8 text-xs md:text-sm">
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-amber-800 px-3 py-1.5 rounded-full border border-amber-200/50 shadow-sm">
            <Star className="w-4 h-4 fill-current text-amber-400" />
            <strong className="font-bold">{ratingAverage}</strong>
            <span className="text-amber-600/60">({totalReviewsCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 font-medium bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-200/50 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Closed • Opens at 11:05 am
          </div>
          <div className="flex items-center gap-1.5 text-stone-500 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-stone-200/50 shadow-sm">
            <MapPin className="w-3.5 h-3.5" />
            Al Zahiyah, Abu Dhabi
          </div>
        </div>

        {/* Main hero content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left column - Text content */}
          <div className="lg:col-span-5 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-amber-100 text-pink-800 px-4 py-1.5 rounded-full text-xs font-semibold border border-pink-200/50 mb-4 md:mb-5">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Innovative Beauty and Wellness
            </div>

            <h1 className="font-serif-spa text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[#1c2c31] leading-[1.15] mb-3">
              Premium Home-Service
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                Spa & Massage
              </span>
            </h1>

            <p className="text-stone-500 text-sm md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed mb-5 md:mb-6">
              Experience world-class spa therapies, organic skincare, and therapeutic massage at your doorstep. Abu Dhabi's most trusted mobile wellness service.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6 md:mb-8">
              <button
                onClick={onBookNow}
                className="group relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-7 py-3 rounded-xl font-bold text-sm shadow-lg shadow-pink-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-300/50 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 overflow-hidden"
              >
                <Sparkles className="w-4 h-4" />
                Book Appointment
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              <button className="group bg-white/80 backdrop-blur-sm border border-pink-200/50 text-[#1c2c31] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                View Services
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-stone-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Licensed
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Sterilized
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Secure Payment
              </span>
            </div>
          </div>

          {/* Right column - Image slider with covered edges */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Main slider container with covered edges */}
              <div
                className="relative overflow-hidden shadow-2xl bg-amber-50"
                style={{
                  clipPath: "polygon(24px 0%, calc(100% - 24px) 0%, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0% calc(100% - 24px), 0% 24px)",
                }}
              >
                <div className="aspect-[4/5] relative">
                  {HERO_IMAGES.map((img, idx) => {
                    const isActive = idx === currentSlide;
                    const isPrev = idx === (currentSlide - 1 + HERO_IMAGES.length) % HERO_IMAGES.length;
                    return (
                      <img
                        key={idx}
                        src={img}
                        alt={`Spa service ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                          isActive
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105"
                        }`}
                        style={{
                          transform: isActive ? "scale(1)" : isPrev && direction < 0 ? "scale(0.95) translateX(-20px)" : "scale(1.05) translateX(20px)",
                          transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                      />
                    );
                  })}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                  {/* Slide overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                    <span className="text-xs tracking-[0.2em] uppercase font-light opacity-80 block mb-1">
                      {["Signature Spa", "Luxury Beauty", "Therapy Massage", "Wellness Journey"][currentSlide]}
                    </span>
                    <p className="text-sm md:text-base font-medium leading-relaxed max-w-xs">
                      {[
                        "Rejuvenate with our signature lava clamshell and aromatherapy rituals.",
                        "Premium organic facials and skincare therapies for radiant beauty.",
                        "Deep tissue, hot stone & lymphatic drainage by certified therapists.",
                        "Holistic wellness experiences tailored to your mind and body.",
                      ][currentSlide]}
                    </p>
                  </div>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-sm hover:bg-white text-stone-700 p-2 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-sm hover:bg-white text-stone-700 p-2 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {HERO_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-300 cursor-pointer rounded-full ${
                      idx === currentSlide
                        ? "w-8 h-2 bg-gradient-to-r from-pink-400 to-amber-400"
                        : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
                    }`}
                  />
                ))}
              </div>

              {/* Floating premium badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-300 to-pink-400 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-bold text-[11px]">HOME SERVICE SPA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Divider & Grid */}
        <div className="mt-8 md:mt-12">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-300/50 to-transparent" />
            <div className="flex items-center gap-2 text-[10px] font-semibold text-stone-400 uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3 text-pink-400" />
              Our Signature Services
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 max-w-4xl mx-auto">
            {SERVICE_IMAGES.map((service, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden bg-white shadow-md border border-pink-100/40 hover:shadow-xl hover:border-amber-200/50 transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={service.src}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-1.5 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <span className="text-white text-[9px] md:text-[10px] font-semibold block truncate text-center">
                    {service.name}
                  </span>
                </div>
                <div className="p-1.5 text-center group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-[8px] md:text-[9px] font-medium text-stone-500 truncate block">
                    {service.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
