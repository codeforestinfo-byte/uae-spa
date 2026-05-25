import React, { useState } from "react";
import {
  CATEGORIES,
  INITIAL_THERAPISTS,
  SERVICES,
  INITIAL_REVIEWS,
  ABU_DHABI_AREAS,
} from "./data";
import { Therapist, TherapistStatus, Service, Review, Appointment } from "./types";
import TherapistHub from "./components/TherapistHub";
import BookingWizard from "./components/BookingWizard";
import VoucherSystem from "./components/VoucherSystem";
import ReviewsSection from "./components/ReviewsSection";
import HeroSection from "./components/HeroSection";

import {
  Star,
  Share2,
  Heart,
  MapPin,
  Clock,
  ShieldAlert,
  Search,
  Menu,
  ChevronDown,
  Info,
  Smartphone,
  Sparkles,
  Award,
  Maximize2,
  X,
  CreditCard,
  Gift,
  HelpCircle,
  Percent,
  Check
} from "lucide-react";

export default function App() {
  // Application lists stored in state for real-time reactivity (e.g. adding reviews/scheduling appointments)
  const [therapists, setTherapists] = useState<Therapist[]>(INITIAL_THERAPISTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeTab, setActiveTab] = useState<string>("services");
  const [chosenCategory, setChosenCategory] = useState<string>("All");
  
  // Modal controllers
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [preSelectedTherapist, setPreSelectedTherapist] = useState<Therapist | null>(null);
  const [initialOrderNow, setInitialOrderNow] = useState(false);
  
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);

  // Quick stats calculations
  const totalReviewsCount = reviews.length;
  const ratingAverage = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviewsCount || 1)
  ).toFixed(1);

  // Live simulator status toggler
  const handleToggleTherapistStatus = (therapistId: string) => {
    setTherapists((prev) =>
      prev.map((girl) => {
        if (girl.id === therapistId) {
          const nextStatus =
            girl.status === TherapistStatus.AVAILABLE_NOW
              ? TherapistStatus.UNAVAILABLE
              : TherapistStatus.AVAILABLE_NOW;
          return {
            ...girl,
            status: nextStatus,
            nextAvailableTime:
              nextStatus === TherapistStatus.UNAVAILABLE ? "Today 7:00 PM" : undefined,
          };
        }
        return girl;
      })
    );
  };

  // Launching immediate order ("Available girl now")
  const handleBookImmediate = (therapist: Therapist) => {
    setPreSelectedTherapist(therapist);
    // Find first service from her specialties list if matching
    const relativeSrv = SERVICES.find((s) => s.category === therapist.specialties[0]) || SERVICES[0];
    setPreSelectedService(relativeSrv);
    setInitialOrderNow(true);
    setBookingOpen(true);
  };

  // Launching scheduled booking ("Unavailable girl" or general slot booking)
  const handleBookScheduled = (therapist: Therapist) => {
    setPreSelectedTherapist(therapist);
    const relativeSrv = SERVICES.find((s) => s.category === therapist.specialties[0]) || SERVICES[0];
    setPreSelectedService(relativeSrv);
    setInitialOrderNow(false);
    setBookingOpen(true);
  };

  // Launch booking from clicking a Treatment card directly
  const handleBookService = (service: Service) => {
    setPreSelectedService(service);
    // Try to matches therapist that qualifies for this service or select first available
    const matchingTherapist = therapists.find((t) => t.specialties.includes(service.category)) || therapists[0];
    setPreSelectedTherapist(matchingTherapist);
    setInitialOrderNow(matchingTherapist.status === TherapistStatus.AVAILABLE_NOW);
    setBookingOpen(true);
  };

  // Handle addition of a new appointment
  const handleBookingConfirmed = (appointment: Appointment) => {
    console.log("Appointment confirmed locally in state", appointment);
    // To show persistence, we increase the therapists review count slightly just to reflect transaction
    setTherapists((prev) =>
      prev.map((t) => {
        if (t.id === appointment.therapistId) {
          return { ...t, reviewsCount: t.reviewsCount + 1 };
        }
        return t;
      })
    );
  };

  // Handle adding a review from child form
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    // Also increment specific therapist reviews tally
    setTherapists((prev) =>
      prev.map((t) => {
        const matchesSpec = t.specialties.some((spec) => newReview.treatment.includes(spec));
        if (matchesSpec || t.name === "Mary") {
          return {
            ...t,
            reviewsCount: t.reviewsCount + 1,
            // Slight positive push to active therapist
            rating: Math.min(5, Number(( (t.rating * t.reviewsCount + newReview.rating) / (t.reviewsCount + 1) ).toFixed(1)))
          };
        }
        return t;
      })
    );
  };

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      title: "Signature Hot Lava Stones & Aromatherapy Petals Setup",
    },
    {
      url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      title: "100% Organic Cold-Pressed Elixirs & Towel Service",
    },
    {
      url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
      title: "Premium Portable Massage Beds Delivered to Your Safe Abode",
    },
  ];

  const filteredServices = chosenCategory === "All" 
    ? SERVICES 
    : SERVICES.filter(s => s.category.toLowerCase().includes(chosenCategory.toLowerCase()) || chosenCategory.toLowerCase().includes(s.category.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#fcfbfa] flex flex-col font-sans text-spa-navy selection:bg-rose-100 antialiased">
      {/* ================= TOP NAV BAR ================= */}
      <header className="sticky top-0 bg-white border-b border-[#eae3d5]/80 backdrop-blur-md z-40" id="main-navigation-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-serif-spa text-2xl font-black lowercase tracking-tighter text-spa-navy flex items-center">
              fresha
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a47e] ml-0.5"></span>
            </span>
            <div className="hidden md:flex h-4 w-px bg-stone-300 mx-3"></div>
            <span className="hidden md:inline text-xs text-spa-navy/55 uppercase tracking-widest font-mono-spa font-semibold">
              Partner Hub
            </span>
          </div>

          {/* Search bar decoration representing the live screenshot */}
          <div className="hidden lg:flex items-center gap-2 bg-stone-50 border border-[#eae3d5] px-4 py-1.5 rounded-full text-xs font-medium max-w-xl flex-1 shadow-2xs">
            <div className="flex items-center gap-1.5 px-2 hover:text-[#c5a47e] cursor-pointer">
              <span>All treatments</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </div>
            <div className="h-4 w-px bg-stone-200"></div>
            <div className="flex items-center gap-1.5 px-2 hover:text-[#c5a47e] cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-[#c5a47e]" />
              <span>Abu Dhabi, UAE</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </div>
            <div className="h-4 w-px bg-stone-200"></div>
            <div className="flex items-center gap-1.5 px-2 hover:text-[#c5a47e] cursor-pointer">
              <Clock className="w-3.5 h-3.5 opacity-60" />
              <span>Any time</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </div>
            <button className="bg-spa-navy hover:bg-[#2c3d42] text-white p-2 rounded-full cursor-pointer ml-auto transition-colors" aria-label="Search button">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex text-xs text-right flex-col">
              <span className="font-semibold text-spa-navy">Innovative Home Spa</span>
              <span className="text-stone-400 font-mono-spa">Abu Dhabi Zone</span>
            </div>
            <button 
              onClick={() => setActiveTab("vouchers")}
              className="bg-[#c5a47e]/15 text-[#7d572b] hover:bg-[#c5a47e]/25 text-xs font-bold py-2 px-3.5 rounded-full border border-[#c5a47e]/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 shrink-0" />
              <span>Gifts & Vouchers</span>
            </button>
            <button className="bg-white hover:bg-stone-50 border border-[#eae3d5] p-2.5 rounded-full shadow-2xs cursor-pointer flex items-center gap-1" aria-label="Toggle Menu">
              <Menu className="w-4 h-4 text-spa-navy" />
              <span className="hidden sm:inline text-xs font-bold font-mono-spa px-0.5">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= BREADCRUMBS ROW ================= */}
      <section className="bg-stone-50 border-b border-stone-100 py-3 px-4">
        <div className="max-w-7xl mx-auto text-[11px] text-spa-navy/55 font-semibold font-mono-spa flex flex-wrap gap-2 items-center">
          <span>Home</span>
          <span>•</span>
          <span>Spas & Saunas</span>
          <span>•</span>
          <span>United Arab Emirates</span>
          <span>•</span>
          <span>Abu Dhabi</span>
          <span>•</span>
          <span>E16-01</span>
          <span>•</span>
          <span className="text-spa-navy/80 hover:text-spa-gold cursor-pointer font-serif-spa">
            Innovative Beauty and Wellness | HOME SERVICE SPA
          </span>
        </div>
      </section>

      {/* ================= HERO SECTION ================= */}
      <HeroSection
        ratingAverage={ratingAverage}
        totalReviewsCount={totalReviewsCount}
        onBookNow={() => {
          setPreSelectedService(SERVICES[0]);
          const activeT = therapists.find(t => t.status === TherapistStatus.AVAILABLE_NOW) || therapists[0];
          setPreSelectedTherapist(activeT);
          setInitialOrderNow(activeT.status === TherapistStatus.AVAILABLE_NOW);
          setBookingOpen(true);
        }}
      />

      {/* ================= MAIN LAYOUT GRID ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLUMNS: Dynamic Tab sections and spa operations */}
          <div className="lg:col-span-8 space-y-8" id="left-column-content">
            
            {/* Section tabs picker representing user's requests */}
            <div className="border-b border-[#eae3d5] flex gap-6 text-sm font-semibold">
              <button
                onClick={() => setActiveTab("services")}
                className={`pb-4 relative cursor-pointer font-serif-spa text-base transition-colors ${
                  activeTab === "services"
                    ? "text-[#1c2c31] font-bold"
                    : "text-spa-navy/50 hover:text-spa-navy"
                }`}
              >
                Treatments Menu & Booking
                {activeTab === "services" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a47e]"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("vouchers")}
                className={`pb-4 relative cursor-pointer font-serif-spa text-base transition-colors ${
                  activeTab === "vouchers"
                    ? "text-[#1c2c31] font-bold"
                    : "text-spa-navy/50 hover:text-spa-navy"
                }`}
              >
                Gifts & Vouchers
                {activeTab === "vouchers" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a47e]"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 relative cursor-pointer font-serif-spa text-base transition-colors ${
                  activeTab === "reviews"
                    ? "text-[#1c2c31] font-bold font-mono-spa"
                    : "text-spa-navy/50 hover:text-[#1c2c31]"
                }`}
              >
                Reviews ({totalReviewsCount})
                {activeTab === "reviews" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a47e]"></span>
                )}
              </button>
            </div>

            {/* Renderer switcher based on select tab */}
            {activeTab === "services" && (
              <div className="space-y-8" id="services-tab-flow">
                
                {/* 1. Therapist availabilities hub (THE HIGHEST RESOLVING PART OF REQ) */}
                <TherapistHub
                  therapists={therapists}
                  onToggleStatus={handleToggleTherapistStatus}
                  onBookImmediate={handleBookImmediate}
                  onBookScheduled={handleBookScheduled}
                />

                {/* Categories Scrollable Filters for Treatments Menu */}
                <div>
                  <h3 className="text-xl font-serif-spa font-bold mb-4 text-spa-navy">
                    Treatments Catalog Menu
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
                    <button
                      onClick={() => setChosenCategory("All")}
                      className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors border ${
                        chosenCategory === "All"
                          ? "bg-spa-navy text-white border-spa-navy shadow-sm"
                          : "bg-white text-spa-navy border-[#eae3d5] hover:bg-stone-50"
                      }`}
                    >
                      🌟 All categories
                    </button>
                    {CATEGORIES.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setChosenCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors border ${
                          chosenCategory === cat
                            ? "bg-[#c5a47e] text-white border-[#c5a47e] shadow-sm"
                            : "bg-white text-spa-navy border-[#eae3d5] hover:bg-stone-50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actual Service List Cards Grid */}
                <div className="space-y-4" id="services-cards-grid">
                  {filteredServices.map((srv) => (
                    <div
                      key={srv.id}
                      className="bg-white border border-[#eae3d5] rounded-xl p-5 hover:border-spa-gold transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-2xs"
                    >
                      <div className="space-y-1.5 flex-1 select-text">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif-spa font-bold text-base text-spa-navy">
                            {srv.name}
                          </h4>
                          {srv.popular && (
                            <span className="bg-[#c5a47e]/15 text-[#7d572b] border border-[#c5a47e]/30 px-2 py-0.5 rounded-md text-[9px] font-mono-spa font-bold uppercase tracking-wide">
                              Signature High-Demand
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-spa-navy/65 max-w-xl">
                          {srv.description}
                        </p>
                        <div className="flex gap-2 text-[10px] text-spa-navy/40 font-mono-spa pt-1">
                          <span>{srv.category}</span>
                          <span>•</span>
                          <span>Abu Dhabi Home-Service Approved</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto border-t sm:border-t-0 border-[#eae3d5] pt-3 sm:pt-0 gap-3 shrink-0">
                        <div className="text-left sm:text-right">
                          <span className="text-xs text-spa-navy/40 block font-semibold">Service Fee</span>
                          <span className="font-serif-spa font-extrabold text-lg text-[#1c2c31] font-mono-spa">
                            {srv.price} AED
                          </span>
                          <span className="text-[10px] text-spa-navy/55 block font-mono-spa">
                            {srv.duration} mins session
                          </span>
                        </div>
                        <button
                          onClick={() => handleBookService(srv)}
                          className="bg-spa-navy hover:bg-[#2c3d42] text-white py-2 px-5 rounded-lg text-xs font-bold cursor-pointer transition-all shadow-2xs hover:shadow-sm"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlighted Service Perks / Promises */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 border border-[#eae3d5] p-5 rounded-2xl">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="w-8 h-8 rounded-full bg-[#10b981]/10 text-[#059669] flex items-center justify-center font-mono-spa font-bold mx-auto sm:mx-0 select-none">✓</div>
                    <span className="font-serif-spa font-bold text-xs block text-spa-navy pt-1">Prompt Mobilization</span>
                    <p className="text-[11px] text-spa-navy/60">Therapists depart within 15 mins of "Order Now" confirmation.</p>
                  </div>
                  <div className="space-y-1 text-center sm:text-left border-t sm:border-t-0 sm:border-x border-[#eae3d5] pt-3 sm:pt-0 sm:px-4">
                    <div className="w-8 h-8 rounded-full bg-[#c5a47e]/15 text-[#7d572b] flex items-center justify-center font-mono-spa font-bold mx-auto sm:mx-0 select-none">✓</div>
                    <span className="font-serif-spa font-bold text-xs block text-spa-navy pt-1">Sterilized Equipments</span>
                    <p className="text-[11px] text-spa-navy/60">We bring full leather massage table, fresh towels, music & oils.</p>
                  </div>
                  <div className="space-y-1 text-center sm:text-left border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-mono-spa font-bold mx-auto sm:mx-0 select-none">✓</div>
                    <span className="font-serif-spa font-bold text-xs block text-spa-navy pt-1">Pay Securely via App</span>
                    <p className="text-[11px] text-spa-navy/60">Secure card processing inside your client portal, or pay cash on spot.</p>
                  </div>
                </div>

              </div>
            )}

            {activeTab === "vouchers" && (
              <VoucherSystem />
            )}

            {activeTab === "reviews" && (
              <ReviewsSection
                reviews={reviews}
                onAddReview={handleAddReview}
              />
            )}

          </div>

          {/* RIGHT 4 COLUMNS: Sticky Booking Information and Timings */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24" id="right-column-sidebar">
            
            {/* Quick Action Side Panel representing Fresha layout */}
            <div className="bg-white border-2 border-spa-navy rounded-2xl p-6 shadow-md relative overflow-hidden">
              <span className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-spa-gold/10 to-transparent pointer-events-none rounded-tr-xl"></span>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] bg-[#10b981] text-white py-0.5 px-2 rounded-md font-bold uppercase tracking-widest font-mono-spa animate-pulse">
                  System Live
                </span>
                <span className="text-xs text-spa-navy/55 font-semibold">Immediate Dispatch Active</span>
              </div>

              <h3 className="font-serif-spa text-xl font-extrabold text-spa-navy leading-snug">
                Innovative Beauty & Wellness
              </h3>
              <p className="text-xs text-spa-navy/60 font-mono-spa font-medium mt-0.5">Abu Dhabi Premier Mobile Service Spa</p>

              <p className="text-xs text-spa-navy/70 mt-3 leading-relaxed">
                Experience world-class, deep-muscle wellness at the convenience of your apartment, villa, or office across Abu Dhabi.
              </p>

              <div className="border-t border-[#eae3d5] my-4 pt-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-spa-navy/60">Composite rating:</span>
                  <span className="font-bold flex items-center gap-1">
                    ★ {ratingAverage} <span className="text-[10px] text-stone-400">({totalReviewsCount} bookings)</span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-spa-navy/60">Home Area:</span>
                  <span className="font-semibold text-[#7d572b] bg-[#c5a47e]/10 px-2 py-0.5 rounded-md">Abu Dhabi Wide</span>
                </div>
              </div>

              {/* Lead Booking Trigger Button */}
              <button
                onClick={() => {
                  setPreSelectedService(SERVICES[0]);
                  const activeT = therapists.find(t => t.status === TherapistStatus.AVAILABLE_NOW) || therapists[0];
                  setPreSelectedTherapist(activeT);
                  setInitialOrderNow(activeT.status === TherapistStatus.AVAILABLE_NOW);
                  setBookingOpen(true);
                }}
                className="w-full bg-[#1c2c31] hover:bg-[#25393f] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-spa-gold animate-spin" />
                Book or Dispatch now
              </button>
            </div>

            {/* Standard timing information block */}
            <div className="bg-white border border-[#eae3d5] rounded-xl p-6 space-y-4">
              <h4 className="font-serif-spa font-bold text-sm text-spa-navy flex items-center gap-1.5 pb-2 border-b border-stone-100">
                <Clock className="w-4 h-4 text-spa-gold" />
                Operating Timings
              </h4>
              <div className="space-y-2 text-xs font-medium">
                <div className="flex justify-between">
                  <span className="text-spa-navy/60">Monday - Friday</span>
                  <span className="font-mono-spa">11:05 AM - 11:30 PM</span>
                </div>
                <div className="flex justify-between text-spa-gold">
                  <span>Saturday - Sunday</span>
                  <span className="font-mono-spa">10:30 AM - Midnight</span>
                </div>
                <div className="bg-green-50 border border-green-100 p-2 text-[10px] rounded text-green-700 font-bold uppercase font-mono-spa tracking-wider text-center">
                  Immediate On-Call service Active Now
                </div>
              </div>
            </div>

            {/* Feature lists / attributes */}
            <div className="bg-white border border-[#eae3d5] rounded-xl p-6 space-y-4">
              <h4 className="font-serif-spa font-bold text-sm text-spa-navy flex items-center gap-1.5 pb-2 border-b border-stone-100">
                <Award className="w-4 h-4 text-spa-gold" />
                Business Specifications
              </h4>
              <ul className="text-xs space-y-2.5 text-spa-navy/85 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-spa-gold"></span>
                  <span>Adults Only Treatments</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-spa-gold"></span>
                  <span>Corporate Wellness packages bookable</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-spa-gold"></span>
                  <span>Certified and Licensed Therapists</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-spa-gold"></span>
                  <span>Mobile Portable Tables supplied</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-spa-gold"></span>
                  <span>Instant Confirmation with App Payments support</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </main>

      {/* ================= SPA FOOTER ================= */}
      <footer className="bg-spa-navy text-white/80 border-t border-white/5 py-12 mt-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="font-serif-spa text-3xl font-black text-[#c5a47e] lowercase tracking-tight">
              fresha<strong className="text-white font-serif-spa font-semibold font-mono-spa">.wellness</strong>
            </span>
            <p className="text-xs text-white/50 max-w-sm">
              We provide the most luxurious, trusted, and private home-service spa experience inside Abu Dhabi. Registered therapists deploy directly with full setups.
            </p>
          </div>
          <div>
            <h5 className="font-serif-spa text-sm font-bold text-[#c5a47e] uppercase tracking-wider mb-4">
              Our Specialties
            </h5>
            <ul className="text-xs space-y-2 text-white/55 font-mono-spa">
              <li>Lava Clamshell Therapies</li>
              <li>Lymphatic Drainage Detoxing</li>
              <li>Couple Royal Home Massage</li>
              <li>Anti-Cellulite Wood Maderotherapies</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-serif-spa text-sm font-bold text-[#c5a47e] uppercase tracking-wider mb-4">
              Licensing & Legal Details
            </h5>
            <p className="text-xs text-white/45">
              Innovative Beauty and Wellness LLC • Licensed by Abu Dhabi Department of Economic Development. All workers are verified under medical certificates and UAE ministry guidelines.
            </p>
            <div className="text-[10px] text-[#c5a47e]/50 font-mono-spa">
              © {new Date().getFullYear()} Innovative Beauty & Wellness Home Spa. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* ================= BOOKING WIZARD INTERACTIVE MODAL ================= */}
      <BookingWizard
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        therapists={therapists}
        services={SERVICES}
        preSelectedService={preSelectedService}
        preSelectedTherapist={preSelectedTherapist}
        initialOrderNow={initialOrderNow}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* ================= GALLERY PREVIEW LIGHTBOX MODAL ================= */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setGalleryOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-spa-gold p-2 cursor-pointer"
            aria-label="Close Gallery"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="relative">
              <img
                src={carouselImages[activeGalleryIndex].url}
                alt="Active spa item"
                className="max-h-[75vh] mx-auto rounded-xl object-contain shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-stone-300 font-serif-spa text-base font-semibold italic">
              "{carouselImages[activeGalleryIndex].title}"
            </div>

            {/* Gallery Picker Indicators */}
            <div className="flex justify-center gap-3 mt-4">
              {carouselImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    idx === activeGalleryIndex ? "border-[#c5a47e] scale-110" : "border-stone-700 opacity-60"
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= GET DIRECTIONS MODAL ================= */}
      {directionsOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 border border-[#eae3d5]">
            <div className="flex justify-between items-start">
              <h4 className="font-serif-spa text-lg font-bold text-spa-navy">
                Our Abu Dhabi Home HQ
              </h4>
              <button 
                onClick={() => setDirectionsOpen(false)}
                className="p-1 hover:bg-stone-100 rounded-full cursor-pointer text-stone-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-spa-navy/70 leading-relaxed">
              <strong>Innovative Beauty and Wellness</strong> operates primarily as a <strong>Home-Service mobile provider</strong>. We do not receive general customers inside our logistics offices in Al Zahiyah. 
            </p>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
              <p className="text-[11px] font-mono-spa text-[#7d572b] uppercase font-bold">Logistics Address:</p>
              <p className="text-xs text-spa-navy mt-1 leading-snug">
                E16-01, Al Zahiyah (Tourist Club Area), Abu Dhabi City, UAE
              </p>
            </div>
            <p className="text-[10px] text-stone-400 font-medium">
              Simply order your therapist of choice using the buttons on the dashboard for safe delivery directly to your apartment or villa!
            </p>
            <button
              onClick={() => setDirectionsOpen(false)}
              className="w-full bg-[#1c2c31] hover:bg-black text-white py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
            >
              Continue booking home spa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
