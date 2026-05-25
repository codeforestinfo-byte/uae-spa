import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-3-768x788.jpg",
    title: "Signature Spa Treatments",
    subtitle: "Rejuvenate with lava clamshell rituals & organic aromatherapy",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-2-768x788.jpg",
    title: "Luxury Beauty & Skincare",
    subtitle: "Premium organic facials and radiant beauty therapies",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-32-o67bczsw7p5kvoxj17fhez66fb6rk8fw3rpft3uqyo.jpg",
    title: "Therapeutic Massage",
    subtitle: "Deep tissue, hot stone & lymphatic drainage by experts",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-4-1024x963.jpg",
    title: "Wellness & Relaxation",
    subtitle: "Holistic wellness tailored to your mind and body",
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
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const tlRef = useRef<gsap.core.Timeline>();
  const autoTimerRef = useRef<ReturnType<typeof setInterval>>();

  const animateSlide = (index: number, direction: 1 | -1) => {
    const slide = SLIDES[index];

    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlRef.current = tl;

    if (sliderRef.current) {
      const img = sliderRef.current.querySelector("img") as HTMLImageElement;
      if (img) {
        tl.fromTo(
          img,
          { scale: 1.1, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" },
          0
        );
      }
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.2
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.35
      );
    }
  };

  const goToSlide = (index: number) => {
    currentIndexRef.current = index;
    setSlideContent(index);
    animateSlide(index, 1);
    resetAutoPlay();
  };

  const setSlideContent = (index: number) => {
    const slide = SLIDES[index];
    if (sliderRef.current) {
      const img = sliderRef.current.querySelector("img") as HTMLImageElement;
      if (img) img.src = slide.image;
    }
    if (titleRef.current) titleRef.current.textContent = slide.title;
    if (subtitleRef.current) subtitleRef.current.textContent = slide.subtitle;
  };

  const nextSlide = () => {
    const next = (currentIndexRef.current + 1) % SLIDES.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentIndexRef.current - 1 + SLIDES.length) % SLIDES.length;
    goToSlide(prev);
  };

  const resetAutoPlay = () => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(nextSlide, 5000);
  };

  useEffect(() => {
    animateSlide(0, 1);
    autoTimerRef.current = setInterval(nextSlide, 5000);

    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.8, ease: "power3.out" }
      );
    }

    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      if (tlRef.current) tlRef.current.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-[#faf6f1] via-white to-[#f5ede4] py-8 md:py-12">
      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-pink-100/40 to-transparent blur-2xl" />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-pink-100/30 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Slider */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-[55%]">
            <div className="relative">
              <div
                className="relative overflow-hidden shadow-2xl bg-white"
                style={{
                  clipPath: "polygon(24px 0%, calc(100% - 24px) 0%, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0% calc(100% - 24px), 0% 24px)",
                }}
              >
                <div ref={sliderRef} className="aspect-[4/5] relative">
                  <img
                    src={SLIDES[0].image}
                    alt="Spa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 backdrop-blur-sm hover:bg-white text-stone-700 p-2.5 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 backdrop-blur-sm hover:bg-white text-stone-700 p-2.5 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-300 cursor-pointer rounded-full ${
                      idx === currentIndexRef.current
                        ? "w-8 h-2 bg-gradient-to-r from-pink-400 to-amber-400"
                        : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[45%] text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-amber-100 text-pink-800 px-4 py-1.5 rounded-full text-xs font-semibold border border-pink-200/50 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Innovative Beauty and Wellness
            </div>

            <h1
              ref={titleRef}
              className="font-serif-spa text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1c2c31] leading-tight mb-4"
            >
              {SLIDES[0].title}
            </h1>

            <p
              ref={subtitleRef}
              className="text-stone-500 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-6"
            >
              {SLIDES[0].subtitle}
            </p>

            <button
              onClick={onBookNow}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-pink-200/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Services */}
        <div ref={servicesRef} className="mt-10 md:mt-14">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-300/50 to-transparent" />
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.2em]">Our Services</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 max-w-4xl mx-auto">
            {SERVICES.map((service, idx) => (
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
