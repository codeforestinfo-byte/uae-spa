import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Star, MapPin, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/attractive-african-woman-enjoying-face-massage-spa-salon.jpg",
    title: "Signature Spa Treatments",
    subtitle: "Rejuvenate with lava clamshell rituals & organic aromatherapy",
    tag: "Premium Wellness",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/beautiful-african-woman-smiling-enjoying-massage-with-closed-eyes-spa-salon.jpg",
    title: "Luxury Beauty & Skincare",
    subtitle: "Premium organic facials and radiant beauty therapies",
    tag: "Beauty Care",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/2150911815.jpg",
    title: "Therapeutic Massage",
    subtitle: "Deep tissue, hot stone & lymphatic drainage by experts",
    tag: "Massage Therapy",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/spa-still-life-with-beauty-products.jpg",
    title: "Wellness & Relaxation",
    subtitle: "Holistic wellness tailored to your mind and body",
    tag: "Holistic Wellness",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/spa-treatment-dark-wall.jpg",
    title: "Premium Home Spa",
    subtitle: "Experience luxury wellness at your doorstep in Abu Dhabi",
    tag: "Home Service",
  },
];

const SERVICES = [
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
  const currentRef = useRef(0);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval>>();

  const updateContent = (index: number) => {
    const slide = SLIDES[index];
    if (bgImgRef.current) bgImgRef.current.src = slide.image;
    if (tagRef.current) {
      tagRef.current.innerHTML = "";
      tagRef.current.appendChild(document.createTextNode(slide.tag));
    }
    if (titleRef.current) titleRef.current.textContent = slide.title;
    if (subtitleRef.current) subtitleRef.current.textContent = slide.subtitle;
  };

  const animateIn = () => {
    gsap.killTweensOf([bgImgRef.current, tagRef.current, titleRef.current, subtitleRef.current, infoRef.current, buttonsRef.current?.children]);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(bgImgRef.current, { scale: 1.1, opacity: 0.7 }, { scale: 1, opacity: 1, duration: 1.4, ease: "power4.out" });
    tl.fromTo(tagRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.6");
    tl.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");
    tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4");
    tl.fromTo(infoRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");
    tl.fromTo(buttonsRef.current?.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, "-=0.2");
  };

  const goToSlide = (index: number) => {
    const target = ((index % SLIDES.length) + SLIDES.length) % SLIDES.length;
    currentRef.current = target;
    setCurrentSlide(target);
    updateContent(target);
    animateIn();
  };

  const nextSlide = () => goToSlide(currentRef.current + 1);
  const prevSlide = () => goToSlide(currentRef.current - 1);

  useEffect(() => {
    updateContent(0);
    animateIn();
    autoTimerRef.current = setInterval(() => nextSlide(), 6000);

    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.5, ease: "power3.out" }
      );
    }

    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#1a1a1a]">
      <div className="relative h-screen min-h-[600px] max-h-[900px]">
        <div className="absolute inset-0">
          <img
            ref={bgImgRef}
            src={SLIDES[0].image}
            alt="Spa background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-pink-500/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/25 text-white p-3 rounded-full transition-all hover:scale-110 cursor-pointer border border-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/25 text-white p-3 rounded-full transition-all hover:scale-110 cursor-pointer border border-white/10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute top-8 right-8 z-20 text-white/60 text-xs tracking-widest font-mono">
          {String(currentSlide + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
            <div className="max-w-2xl">
              <div
                ref={tagRef}
                className="inline-flex items-center bg-white/10 backdrop-blur-md text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold border border-amber-400/20 mb-6"
              >
                {SLIDES[0].tag}
              </div>

              <h1
                ref={titleRef}
                className="font-serif-spa text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4"
              >
                {SLIDES[0].title}
              </h1>

              <p
                ref={subtitleRef}
                className="text-white/70 text-base sm:text-lg md:text-xl max-w-lg leading-relaxed mb-6"
              >
                {SLIDES[0].subtitle}
              </p>

              <div ref={infoRef} className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-amber-300 px-3.5 py-1.5 rounded-full border border-white/10 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <strong>{ratingAverage}</strong>
                  <span className="text-white/50">({totalReviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/60 text-sm">
                  <MapPin className="w-4 h-4" />
                  Al Zahiyah, Abu Dhabi
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Opens at 11:05 am
                </div>
              </div>

              <div ref={buttonsRef} className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onBookNow}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-pink-500/30 transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Book Appointment
                </button>
                <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/10 transition-all hover:scale-[1.02] flex items-center gap-2">
                  View Services
                </button>
              </div>

              <div className="flex items-center gap-5 mt-6 text-xs text-white/40 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Licensed Therapists
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Sterilized Equipment
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Secure Payment
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10" />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-500 cursor-pointer rounded-full ${
                idx === currentSlide
                  ? "w-10 h-1.5 bg-gradient-to-r from-pink-400 to-amber-400"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 bg-[#1a1a1a] pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
            <span className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em]">Our Signature Services</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          </div>
          <div ref={servicesRef} className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all duration-500 cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={service.src}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  <span className="text-white text-[10px] font-semibold block truncate text-center">{service.name}</span>
                </div>
                <div className="p-2 text-center group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-[9px] font-medium text-white/40 truncate block">{service.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
