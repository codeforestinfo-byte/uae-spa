import { useState } from "react";
import { useApp } from "../context/AppContext";
import HeroSection from "../components/HeroSection";
import TherapistHub from "../components/TherapistHub";
import VoucherSystem from "../components/VoucherSystem";
import ReviewsSection from "../components/ReviewsSection";
import BookingWizard from "../components/BookingWizard";
import { SERVICES, CATEGORIES } from "../data";
import { Star, MapPin, Clock, Sparkles, Award, X } from "lucide-react";

export default function HomePage() {
  const {
    therapists,
    reviews,
    ratingAverage,
    totalReviewsCount,
    bookingOpen,
    preSelectedService,
    preSelectedTherapist,
    initialOrderNow,
    setBookingOpen,
    handleToggleTherapistStatus,
    handleBookImmediate,
    handleBookScheduled,
    handleBookService,
    handleBookingConfirmed,
    handleAddReview,
  } = useApp();

  const [activeTab, setActiveTab] = useState("services");
  const [chosenCategory, setChosenCategory] = useState("All");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);

  const filteredServices = chosenCategory === "All"
    ? SERVICES
    : SERVICES.filter((s) =>
        s.category.toLowerCase().includes(chosenCategory.toLowerCase()) ||
        chosenCategory.toLowerCase().includes(s.category.toLowerCase())
      );

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

  return (
    <>
      <HeroSection
        ratingAverage={ratingAverage}
        totalReviewsCount={totalReviewsCount}
        onBookNow={() => {
          const activeT = therapists.find((t) => t.status === "AVAILABLE_NOW") || therapists[0];
          setBookingOpen(true);
        }}
      />

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
          <span className="text-spa-navy/80 font-serif-spa">Innovative Beauty and Wellness | HOME SERVICE SPA</span>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="border-b border-[#eae3d5] flex gap-6 text-sm font-semibold">
              {["services", "vouchers", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 relative cursor-pointer font-serif-spa text-base transition-colors ${
                    activeTab === tab ? "text-[#1c2c31] font-bold" : "text-spa-navy/50 hover:text-spa-navy"
                  }`}
                >
                  {tab === "services" && "Treatments Menu & Booking"}
                  {tab === "vouchers" && "Gifts & Vouchers"}
                  {tab === "reviews" && `Reviews (${totalReviewsCount})`}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a47e]" />}
                </button>
              ))}
            </div>

            {activeTab === "services" && (
              <div className="space-y-8">
                <TherapistHub
                  therapists={therapists}
                  onToggleStatus={handleToggleTherapistStatus}
                  onBookImmediate={handleBookImmediate}
                  onBookScheduled={handleBookScheduled}
                />
                <div>
                  <h3 className="text-xl font-serif-spa font-bold mb-4 text-spa-navy">Treatments Catalog Menu</h3>
                  <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
                    <button
                      onClick={() => setChosenCategory("All")}
                      className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors border ${
                        chosenCategory === "All"
                          ? "bg-spa-navy text-white border-spa-navy shadow-sm"
                          : "bg-white text-spa-navy border-[#eae3d5] hover:bg-stone-50"
                      }`}
                    >
                      All categories
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
                <div className="space-y-4">
                  {filteredServices.map((srv) => (
                    <div
                      key={srv.id}
                      className="bg-white border border-[#eae3d5] rounded-xl p-5 hover:border-spa-gold transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-2xs"
                    >
                      <div className="space-y-1.5 flex-1 select-text">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif-spa font-bold text-base text-spa-navy">{srv.name}</h4>
                          {srv.popular && (
                            <span className="bg-[#c5a47e]/15 text-[#7d572b] border border-[#c5a47e]/30 px-2 py-0.5 rounded-md text-[9px] font-mono-spa font-bold uppercase tracking-wide">
                              Signature High-Demand
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-spa-navy/65 max-w-xl">{srv.description}</p>
                        <div className="flex gap-2 text-[10px] text-spa-navy/40 font-mono-spa pt-1">
                          <span>{srv.category}</span>
                          <span>•</span>
                          <span>Abu Dhabi Home-Service Approved</span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto border-t sm:border-t-0 border-[#eae3d5] pt-3 sm:pt-0 gap-3 shrink-0">
                        <div className="text-left sm:text-right">
                          <span className="text-xs text-spa-navy/40 block font-semibold">Service Fee</span>
                          <span className="font-serif-spa font-extrabold text-lg text-[#1c2c31] font-mono-spa">{srv.price} AED</span>
                          <span className="text-[10px] text-spa-navy/55 block font-mono-spa">{srv.duration} mins session</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 border border-[#eae3d5] p-5 rounded-2xl">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="w-8 h-8 rounded-full bg-[#10b981]/10 text-[#059669] flex items-center justify-center font-mono-spa font-bold mx-auto sm:mx-0">✓</div>
                    <span className="font-serif-spa font-bold text-xs block text-spa-navy pt-1">Prompt Mobilization</span>
                    <p className="text-[11px] text-spa-navy/60">Therapists depart within 15 mins of "Order Now" confirmation.</p>
                  </div>
                  <div className="space-y-1 text-center sm:text-left border-t sm:border-t-0 sm:border-x border-[#eae3d5] pt-3 sm:pt-0 sm:px-4">
                    <div className="w-8 h-8 rounded-full bg-[#c5a47e]/15 text-[#7d572b] flex items-center justify-center font-mono-spa font-bold mx-auto sm:mx-0">✓</div>
                    <span className="font-serif-spa font-bold text-xs block text-spa-navy pt-1">Sterilized Equipments</span>
                    <p className="text-[11px] text-spa-navy/60">We bring full leather massage table, fresh towels, music & oils.</p>
                  </div>
                  <div className="space-y-1 text-center sm:text-left border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-mono-spa font-bold mx-auto sm:mx-0">✓</div>
                    <span className="font-serif-spa font-bold text-xs block text-spa-navy pt-1">Pay Securely via App</span>
                    <p className="text-[11px] text-spa-navy/60">Secure card processing inside your client portal, or pay cash on spot.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vouchers" && <VoucherSystem />}
            {activeTab === "reviews" && <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />}
          </div>

          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white border-2 border-spa-navy rounded-2xl p-6 shadow-md relative overflow-hidden">
              <span className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-spa-gold/10 to-transparent pointer-events-none rounded-tr-xl" />
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] bg-[#10b981] text-white py-0.5 px-2 rounded-md font-bold uppercase tracking-widest font-mono-spa animate-pulse">System Live</span>
                <span className="text-xs text-spa-navy/55 font-semibold">Immediate Dispatch Active</span>
              </div>
              <h3 className="font-serif-spa text-xl font-extrabold text-spa-navy leading-snug">Innovative Beauty & Wellness</h3>
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
              <button
                onClick={() => {
                  const activeT = therapists.find((t) => t.status === "AVAILABLE_NOW") || therapists[0];
                  setBookingOpen(true);
                }}
                className="w-full bg-[#1c2c31] hover:bg-[#25393f] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-spa-gold animate-spin" />
                Book or Dispatch now
              </button>
            </div>

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

            <div className="bg-white border border-[#eae3d5] rounded-xl p-6 space-y-4">
              <h4 className="font-serif-spa font-bold text-sm text-spa-navy flex items-center gap-1.5 pb-2 border-b border-stone-100">
                <Award className="w-4 h-4 text-spa-gold" />
                Business Specifications
              </h4>
              <ul className="text-xs space-y-2.5 text-spa-navy/85 font-medium">
                {["Adults Only Treatments", "Corporate Wellness packages bookable", "Certified and Licensed Therapists", "Mobile Portable Tables supplied", "Instant Confirmation with App Payments support"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-spa-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

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

      {galleryOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          <button onClick={() => setGalleryOpen(false)} className="absolute top-6 right-6 text-white hover:text-spa-gold p-2 cursor-pointer">
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full text-center space-y-4">
            <img src={carouselImages[activeGalleryIndex].url} alt="" className="max-h-[75vh] mx-auto rounded-xl object-contain shadow-2xl border border-white/10" />
            <div className="text-stone-300 font-serif-spa text-base font-semibold italic">"{carouselImages[activeGalleryIndex].title}"</div>
            <div className="flex justify-center gap-3 mt-4">
              {carouselImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    idx === activeGalleryIndex ? "border-[#c5a47e] scale-110" : "border-stone-700 opacity-60"
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {directionsOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 border border-[#eae3d5]">
            <div className="flex justify-between items-start">
              <h4 className="font-serif-spa text-lg font-bold text-spa-navy">Our Abu Dhabi Home HQ</h4>
              <button onClick={() => setDirectionsOpen(false)} className="p-1 hover:bg-stone-100 rounded-full cursor-pointer text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-spa-navy/70 leading-relaxed">
              <strong>Innovative Beauty and Wellness</strong> operates primarily as a <strong>Home-Service mobile provider</strong>.
            </p>
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
              <p className="text-[11px] font-mono-spa text-[#7d572b] uppercase font-bold">Logistics Address:</p>
              <p className="text-xs text-spa-navy mt-1 leading-snug">E16-01, Al Zahiyah (Tourist Club Area), Abu Dhabi City, UAE</p>
            </div>
            <button onClick={() => setDirectionsOpen(false)} className="w-full bg-[#1c2c31] hover:bg-black text-white py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer">
              Continue booking home spa
            </button>
          </div>
        </div>
      )}
    </>
  );
}
