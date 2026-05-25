import { useEffect, useRef } from "react";
import { Star, MapPin, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-3-768x788.jpg",
    title: "Spa Treatments",
    subtitle: "Rejuvenate your senses with our signature spa rituals",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-2-768x788.jpg",
    title: "Beauty & Skincare",
    subtitle: "Premium organic facials and beauty therapies",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-32-o67bczsw7p5kvoxj17fhez66fb6rk8fw3rpft3uqyo.jpg",
    title: "Massage Therapy",
    subtitle: "Deep tissue, hot stone & lymphatic drainage",
  },
  {
    image: "https://ik.imagekit.io/cwchgveae/SPA%20UAE/image-4-1024x963.jpg",
    title: "Wellness & Relaxation",
    subtitle: "Holistic wellness tailored to your needs",
  },
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 1.4, ease: "power4.out" }
      );

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current.querySelectorAll("span"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.8"
        );
      }

      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".gsap-char");
        tl.fromTo(
          chars,
          { y: 60, opacity: 0, rotateX: -40 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.04, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (descRef.current) {
        tl.fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3");
      }

      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
          "-=0.2"
        );
      }

      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }, "-=0.3");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!particlesRef.current) return;
    const particles = particlesRef.current;
    for (let i = 0; i < 15; i++) {
      const dot = document.createElement("div");
      const size = Math.random() * 6 + 2;
      dot.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: ${["#c5a47e", "#e8b4b8", "#f5e6d3", "#d4a574"][Math.floor(Math.random() * 4)]};
        opacity: ${Math.random() * 0.3 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
      `;
      particles.appendChild(dot);

      gsap.to(dot, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: Math.random() * 0.2 + 0.05,
        duration: Math.random() * 8 + 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      });
    }
  }, []);

  useEffect(() => {
    if (!imageRef.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = imageRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(imageRef.current!.querySelector(".parallax-layer"), {
        x: x * 20,
        y: y * 20,
        duration: 1,
        ease: "power2.out",
      });
    };
    const el = imageRef.current;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="gsap-char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#faf6f1] via-white to-[#f5ede4] min-h-[90vh] md:min-h-screen"
    >
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#e8b4b8]/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#c5a47e]/15 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#d4a574]/10 blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh] md:min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full py-10">
          {/* Left - Image Slider */}
          <div ref={imageRef} className="relative w-full max-w-lg mx-auto lg:mx-0">
            <div className="parallax-layer">
              <div className="relative overflow-hidden shadow-2xl bg-white" style={{ clipPath: "polygon(20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px), 0% 20px)" }}>
                <Swiper
                  modules={[Autoplay, Navigation, Pagination, EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop
                  navigation={{
                    prevEl: ".hero-swiper-prev",
                    nextEl: ".hero-swiper-next",
                  }}
                  pagination={{
                    clickable: true,
                    renderBullet: (_, className) => `<span class="${className} !bg-white !opacity-60 !w-2 !h-2 !rounded-full"></span>`,
                  }}
                  className="w-full aspect-[3/4]"
                >
                  {SLIDES.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative w-full h-full">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6">
                          <span className="text-white/80 text-xs tracking-[0.2em] uppercase font-light mb-1">
                            {slide.title}
                          </span>
                          <p className="text-white text-sm md:text-base font-light max-w-xs leading-relaxed">
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button className="hero-swiper-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/30 backdrop-blur-sm hover:bg-white/60 text-white p-2 rounded-full transition-all hover:scale-110 cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="hero-swiper-next absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/30 backdrop-blur-sm hover:bg-white/60 text-white p-2 rounded-full transition-all hover:scale-110 cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Floating badge */}
            <div
              ref={badgeRef}
              className="absolute -bottom-3 -right-3 bg-gradient-to-br from-[#c5a47e] to-[#d4a574] text-white px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-bold text-sm">4.8 ★ Premium Spa</span>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="space-y-7 text-center lg:text-left">
            {/* Tagline */}
            <div ref={taglineRef} className="inline-flex items-center gap-3 bg-[#f5ede4]/80 backdrop-blur-sm px-5 py-2 rounded-full border border-[#e8b4b8]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a47e] animate-pulse" />
              <span className="text-[#8b6f4c] text-xs tracking-[0.25em] uppercase font-semibold">
                YOUR TRUSTED BEAUTY PARTNER
              </span>
              <span className="flex items-center gap-1 text-[#8b6f4c]/60 text-xs">
                <Star className="w-3 h-3 fill-current text-[#c5a47e]" />
                {ratingAverage}
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="font-serif-spa text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1c2c31] leading-[1.1]"
            >
              {splitText("Discover Luxurious Beauty & Wellness Experience")}
            </h1>

            {/* Description */}
            <p ref={descRef} className="text-[#8b6f4c]/70 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              Indulge in premium spa treatments, organic skincare, therapeutic massage, and holistic wellness — all delivered to your home in Abu Dhabi.
            </p>

            {/* Rating & Location Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
              <div className="flex items-center gap-2 bg-[#f5ede4] text-[#8b6f4c] px-4 py-2 rounded-xl border border-[#e8b4b8]/20">
                <Star className="w-4 h-4 fill-current text-[#c5a47e]" />
                <strong className="font-bold">{ratingAverage}</strong>
                <span className="text-[#8b6f4c]/60">({totalReviewsCount} reviews)</span>
              </div>
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Closed • Opens at 11:05 am
              </span>
              <span className="flex items-center gap-1.5 text-[#8b6f4c]/60">
                <MapPin className="w-4 h-4" />
                Al Zahiyah, Abu Dhabi
              </span>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onBookNow}
                className="group relative bg-gradient-to-r from-[#c5a47e] to-[#d4a574] text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-xl shadow-[#c5a47e]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c5a47e]/40 hover:scale-[1.03] active:scale-[0.97] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Book Appointment
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#d4a574] to-[#c5a47e] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
              <button className="group relative bg-white/80 backdrop-blur-sm border border-[#e8b4b8]/30 text-[#1c2c31] px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Watch Services
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-xs text-[#8b6f4c]/50 font-medium">
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
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-10 -mt-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#e8b4b8] to-transparent" />
          <span className="text-[10px] font-semibold text-[#8b6f4c]/50 uppercase tracking-[0.3em]">
            Our Signature Services
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#e8b4b8] to-transparent" />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {SERVICE_IMAGES.map((service, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md border border-[#f5ede4] hover:shadow-xl hover:border-[#c5a47e]/30 transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={service.src}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-white text-[10px] font-semibold block truncate text-center">{service.name}</span>
              </div>
              <div className="p-2 text-center group-hover:opacity-0 transition-opacity duration-300">
                <span className="text-[9px] font-medium text-[#8b6f4c]/60 truncate block">{service.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
