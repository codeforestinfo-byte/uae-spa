import React, { useState, useEffect } from "react";
import { Therapist, Service, TherapistStatus, Appointment } from "../types";
import { SERVICES, ABU_DHABI_AREAS } from "../data";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Map,
  CheckCircle,
  CreditCard,
  User,
  Phone,
  Zap,
  DollarSign,
  AlertCircle,
  Truck,
  FileText
} from "lucide-react";

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  therapists: Therapist[];
  services: Service[];
  preSelectedService?: Service | null;
  preSelectedTherapist?: Therapist | null;
  initialOrderNow?: boolean;
  onBookingConfirmed: (appointment: Appointment) => void;
}

export default function BookingWizard({
  isOpen,
  onClose,
  therapists,
  services,
  preSelectedService = null,
  preSelectedTherapist = null,
  initialOrderNow = false,
  onBookingConfirmed,
}: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(preSelectedService);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(preSelectedTherapist);
  const [isOrderNow, setIsOrderNow] = useState(initialOrderNow);
  
  // Date & Time selection
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  // Personal Info
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerArea, setCustomerArea] = useState(ABU_DHABI_AREAS[0]);
  const [customerAddress, setCustomerAddress] = useState("");
  
  // Payment Mode
  const [paymentMethod, setPaymentMethod] = useState<"app" | "cash_or_card">("app");
  
  // Confirmed State
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);
  const [countdown, setCountdown] = useState(45); // countdown in minutes for immediate arrival

  // Dynamic initialization when pre-selections change
  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
    }
    if (preSelectedTherapist) {
      setSelectedTherapist(preSelectedTherapist);
      const isAva = preSelectedTherapist.status === TherapistStatus.AVAILABLE_NOW;
      setIsOrderNow(isAva ? initialOrderNow : false);
    }
  }, [preSelectedService, preSelectedTherapist, initialOrderNow]);

  // Handle immediate dispatch changes when therapist is swapped
  useEffect(() => {
    if (selectedTherapist) {
      const isAva = selectedTherapist.status === TherapistStatus.AVAILABLE_NOW;
      if (!isAva) {
        setIsOrderNow(false);
      }
    }
  }, [selectedTherapist]);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];
    setSelectedDate(formatted);
    setSelectedTime("13:00");
  }, []);

  // Countdown timer simulation for immediate dispatch order
  useEffect(() => {
    let timer: any;
    if (confirmedBooking && confirmedBooking.orderNow && countdown > 1) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 60000); // subtract a minute
    }
    return () => clearInterval(timer);
  }, [confirmedBooking, countdown]);

  if (!isOpen) return null;

  const nextStep = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && !selectedTherapist) return;
    if (step === 3 && !isOrderNow && (!selectedDate || !selectedTime)) return;
    if (step === 4 && (!customerName || !customerPhone || !customerAddress)) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleCompleteBooking = () => {
    if (!selectedService || !selectedTherapist) return;

    const newAppointment: Appointment = {
      id: "bk-" + Math.floor(100000 + Math.random() * 90000),
      serviceId: selectedService.id,
      therapistId: selectedTherapist.id,
      dateTime: isOrderNow ? "AVAILABLE NOW (Immediate Home Dispatch)" : `${selectedDate} at ${selectedTime}`,
      orderNow: isOrderNow,
      customerName,
      customerPhone,
      customerArea,
      customerAddress,
      paymentMethod,
      status: "confirmed",
      createdAt: new Date().toLocaleTimeString(),
    };

    setConfirmedBooking(newAppointment);
    onBookingConfirmed(newAppointment);
  };

  const currentMonthDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      iso: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  });

  const availableHours = [
    "11:30 AM", "12:00 PM", "1:30 PM", "2:00 PM", "3:30 PM", "4:00 PM",
    "5:30 PM", "6:00 PM", "7:30 PM", "8:00 PM", "9:30 PM"
  ];

  return (
    <div className="fixed inset-0 bg-[#1c2c31]/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#eae3d5]" 
        id="booking-wizard-modal"
      >
        {/* Header */}
        <div className="border-b border-stone-100 px-6 py-4 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-serif-spa text-lg font-bold text-spa-navy flex items-center gap-2">
              <span>Innovative Beauty & Wellness</span>
              <span className="text-xs bg-[#c5a47e]/20 text-[#7d572b] px-2.5 py-0.5 rounded-full uppercase font-mono-spa border border-[#c5a47e]/30">
                Home Service Booking
              </span>
            </h3>
            <p className="text-xs text-spa-navy/60 font-medium">Abu Dhabi instant dispatch & spa scheduler</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer text-[#1c2c31]/70"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (not on confirmation page) */}
        {!confirmedBooking && (
          <div className="w-full bg-stone-100 h-1.5 flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-full transition-all duration-300 ${
                  i + 1 <= step ? "bg-[#c5a47e]" : "bg-stone-200"
                }`}
              />
            ))}
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {confirmedBooking ? (
            /* ================= CONFIRMATION SCREEN ================= */
            <div className="text-center py-6 px-4" id="booking-confirmation-screen">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <CheckCircle className="w-10 h-10 text-green-500 animate-bounce" />
              </div>

              <h3 className="text-2xl font-serif-spa font-bold text-spa-navy">
                Appointment Confirmed!
              </h3>
              <p className="text-sm text-green-700 font-medium mt-1 font-mono-spa">
                Booking Reference ID: {confirmedBooking.id}
              </p>
              <p className="text-xs text-spa-navy/60 mt-0.5">
                Instant confirmation email & SMS receipt sent to {customerPhone}
              </p>

              <div className="mt-6 border border-[#eae3d5] bg-stone-50/50 rounded-xl p-5 text-left space-y-4 max-w-md mx-auto">
                <div className="flex justify-between items-start border-b border-stone-200/60 pb-3">
                  <div>
                    <h4 className="text-xs text-spa-navy/55 uppercase font-semibold">Treatment</h4>
                    <p className="text-sm font-semibold text-spa-navy mt-0.5">
                      {selectedService?.name}
                    </p>
                    <p className="text-xs text-spa-navy/60 mt-0.5">
                      {selectedService?.duration} mins • {selectedService?.price} AED
                    </p>
                  </div>
                  <span className="text-sm font-mono-spa font-bold text-spa-gold bg-white px-2.5 py-1 rounded-md border border-[#eae3d5]">
                    AED {selectedService?.price}
                  </span>
                </div>

                <div className="flex items-center gap-3 border-b border-stone-200/60 pb-3">
                  <img
                    src={selectedTherapist?.avatar}
                    alt={selectedTherapist?.name}
                    className="w-10 h-10 rounded-full object-cover border border-spa-gold"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-[10px] text-spa-navy/55 uppercase font-semibold">Therapist</h4>
                    <p className="text-sm font-semibold text-[#1c2c31]">
                      {selectedTherapist?.name} ({selectedTherapist?.nationality})
                    </p>
                    <p className="text-xs text-[#7d572b] flex items-center gap-1 font-semibold mt-0.5">
                      ★ {selectedTherapist?.rating} Verified Expert
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-spa-navy/85 border-b border-stone-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-spa-gold shrink-0" />
                    <span>Customer: <strong className="font-semibold">{confirmedBooking.customerName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-spa-gold shrink-0" />
                    <span className="line-clamp-2">
                      Address: <strong className="font-semibold">{confirmedBooking.customerAddress}, {confirmedBooking.customerArea}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-spa-gold shrink-0" />
                    <span>
                      Payment: <strong className="font-semibold uppercase">{confirmedBooking.paymentMethod === "app" ? "Paid Online (App Payment)" : "Pay on Arrival"}</strong>
                    </span>
                  </div>
                </div>

                {confirmedBooking.orderNow ? (
                  /* Immediate Dispatch Visual */
                  <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-green-500 rounded-lg text-white">
                      <Truck className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-green-800">DISPATCH EN ROUTE</h4>
                      <p className="text-[11px] text-green-700 font-mono-spa mt-0.5">
                        ETA: Arriving in <span className="text-sm font-bold underline">{countdown} mins</span>
                      </p>
                      <p className="text-[10px] text-green-600">
                        {selectedTherapist?.name} is packaging the session kit and deploying.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Scheduled Appointment Visual */
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-lg text-white">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-blue-800">SCHEDULED APPOINTMENT</h4>
                      <p className="text-[11px] text-blue-700 font-mono-spa mt-0.5">
                        Date: {selectedDate}
                      </p>
                      <p className="text-[11px] text-blue-700 font-mono-spa">
                        Time Slot: {selectedTime}
                      </p>
                      <p className="text-[10px] text-blue-600">
                        {selectedTherapist?.name} will arrive on schedule.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Simulator */}
              <div className="mt-6 border border-[#eae3d5] rounded-xl overflow-hidden shadow-xs max-w-md mx-auto">
                <div className="bg-stone-100 p-2 border-b border-[#eae3d5] flex items-center gap-1.5 text-[10px] font-mono-spa text-spa-navy/70 uppercase">
                  <Map className="w-3 h-3 text-spa-gold" />
                  <span>Abu Dhabi Real-Time Dispatch Compass</span>
                </div>
                <div className="bg-sky-50 h-32 relative flex items-center justify-center overflow-hidden">
                  {/* Procedural Grid drawing Abu Dhabi shores and roads */}
                  <div className="absolute inset-0 pattern-grid opacity-20 bg-emerald-100"></div>
                  <div className="absolute top-4 left-6 bg-emerald-200 h-10 w-24 rounded-full blur-md"></div> {/* Al Reem */}
                  <div className="absolute top-10 right-4 bg-amber-100 h-14 w-20 rounded-full blur-lg"></div> {/* Island */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                    <div className="flex items-center gap-1.5 text-xs text-spa-navy font-semibold px-2 py-1 bg-white rounded-md shadow-xs relative border border-[#eae3d5]">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                      <span>{selectedTherapist?.name}</span>
                      <ChevronRight className="w-3 h-3 text-spa-gold" />
                      <span>{confirmedBooking.customerArea.split(" (")[0]}</span>
                    </div>
                    <p className="text-[9px] text-spa-navy/50 font-mono-spa absolute bottom-2">
                      [GPS Active - Trackers Online Abu Dhabi]
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={onClose}
                  className="bg-spa-navy hover:bg-[#2c3d42] text-white py-2.5 px-8 rounded-xl font-medium text-sm transition-colors cursor-pointer"
                >
                  Done & Back to Spa Home
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* ================= STEP 1: SELECT SERVICE ================= */}
              {step === 1 && (
                <div id="booking-step-1">
                  <h4 className="text-base font-serif-spa font-bold text-spa-navy mb-4">
                    Step 1: Select Your Treatment Service
                  </h4>
                  <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                    {services.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-4 cursor-pointer hover:bg-stone-50/50 ${
                          selectedService?.id === srv.id
                            ? "border-spa-gold bg-[#fcfbfa] ring-1 ring-spa-gold/30"
                            : "border-[#eae3d5] bg-white"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-[#1c2c31]">
                              {srv.name}
                            </span>
                            {srv.popular && (
                              <span className="bg-rose-50 text-rose-700 text-[10px] px-2 py-0.5 rounded-full font-mono-spa font-bold border border-rose-100">
                                HOT
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-spa-navy/60 line-clamp-2">
                            {srv.description}
                          </p>
                          <span className="text-[11px] font-medium font-mono-spa text-spa-navy/50 inline-block bg-stone-100 px-2 py-0.5 rounded">
                            {srv.category}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-bold text-spa-navy font-mono-spa">
                            AED {srv.price}
                          </div>
                          <div className="text-[11px] text-spa-navy/50 font-medium">
                            {srv.duration} mins
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= STEP 2: SELECT THERAPIST ================= */}
              {step === 2 && (
                <div id="booking-step-2">
                  <h4 className="text-base font-serif-spa font-bold text-spa-navy mb-4 animate-fade-in">
                    Step 2: Choose Your Massage Therapist Specialist
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {therapists.map((girl) => {
                      const isAvailable = girl.status === TherapistStatus.AVAILABLE_NOW;
                      return (
                        <button
                          key={girl.id}
                          onClick={() => {
                            setSelectedTherapist(girl);
                            setIsOrderNow(isAvailable);
                          }}
                          className={`w-full text-left p-4 rounded-xl border flex gap-4 items-center transition-all cursor-pointer hover:bg-[#fbfbf9] ${
                            selectedTherapist?.id === girl.id
                              ? "border-spa-gold bg-[#fbfcfa] ring-1 ring-spa-gold/30"
                              : "border-[#eae3d5] bg-white"
                          }`}
                        >
                          <div className="relative">
                            <img
                              src={girl.avatar}
                              alt={girl.name}
                              className="w-14 h-14 rounded-full object-cover border border-[#eae3d5]"
                              referrerPolicy="no-referrer"
                            />
                            {isAvailable && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-sm text-spa-navy">
                                {girl.name}
                              </span>
                              <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-spa-navy/60 font-mono-spa">
                                {girl.nationality}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-spa-navy/60 mt-0.5">
                              <span className="text-amber-400">★</span>
                              <span className="font-semibold text-spa-navy">{girl.rating}</span>
                              <span>({girl.reviewsCount} reviews)</span>
                            </div>

                            {/* Live Availability status representation */}
                            <div className="mt-2.5">
                              {isAvailable ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono-spa font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                                  <Zap className="w-2.5 h-2.5 fill-current" />
                                  Available Now for Direct dispatch
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono-spa font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                  <Calendar className="w-2.5 h-2.5" />
                                  Busy — Next: {girl.nextAvailableTime || "Tomorrow"}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ================= STEP 3: DISPATCH SPEED (USER PERSPECTIVE) ================= */}
              {step === 3 && (
                <div id="booking-step-3" className="space-y-5">
                  <h4 className="text-base font-serif-spa font-bold text-spa-navy mb-2">
                    Step 3: Choose Dispatch Booking Speed
                  </h4>

                  {/* Immediate option block */}
                  {selectedTherapist?.status === TherapistStatus.AVAILABLE_NOW ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl relative">
                        <input
                          type="radio"
                          id="order-now-opt"
                          name="speed-select"
                          checked={isOrderNow === true}
                          onChange={() => setIsOrderNow(true)}
                          className="mt-1 cursor-pointer accent-green-600"
                        />
                        <label htmlFor="order-now-opt" className="cursor-pointer space-y-1 block flex-1">
                          <span className="font-bold text-[#10b981] text-sm flex items-center gap-1 font-mono-spa">
                            <Zap className="w-4 h-4 fill-current text-green-600" />
                            ORDER {selectedTherapist.name} IMMEDIATELY (Available Now)
                          </span>
                          <p className="text-xs text-green-800">
                            Instant Home Dispatch! {selectedTherapist.name} will prepare treatments package immediately and arrive at your Abu Dhabi location in 45-60 minutes.
                          </p>
                        </label>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-white border border-[#eae3d5] rounded-xl hover:bg-[#fbfbf9]">
                        <input
                          type="radio"
                          id="schedule-later-opt"
                          name="speed-select"
                          checked={isOrderNow === false}
                          onChange={() => setIsOrderNow(false)}
                          className="mt-1 cursor-pointer accent-spa-navy"
                        />
                        <label htmlFor="schedule-later-opt" className="cursor-pointer space-y-1 block flex-1">
                          <span className="font-semibold text-spa-navy text-sm flex items-center gap-1 font-serif-spa">
                            <Calendar className="w-4 h-4 text-spa-gold" />
                            Schedule This Therapist For Later
                          </span>
                          <p className="text-xs text-spa-navy/60">
                            Select a custom date and time slot below for your session. Perfect for premium reservations.
                          </p>
                        </label>
                      </div>
                    </div>
                  ) : (
                    /* Therapist is Busy Option Block */
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-800 text-xs font-mono-spa">
                            {selectedTherapist?.name} IS DESIGNATED OFF-LINE / BUSY NOW
                          </span>
                          <p className="text-xs text-amber-700/80 mt-1">
                            Since {selectedTherapist?.name} is on an active home assignment in Abu Dhabi, she expects to be free around <strong className="underline text-amber-900">{selectedTherapist?.nextAvailableTime || "Tomorrow"}</strong>. You must use the Scheduler below to schedule her!
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-[#f8f6f2] border border-spa-gold/40 rounded-xl">
                        <input
                          type="radio"
                          id="mandatory-schedule"
                          name="speed-select-mandatory"
                          checked={true}
                          readOnly
                          className="mt-1 accent-spa-navy"
                        />
                        <label htmlFor="mandatory-schedule" className="space-y-1 block flex-1">
                          <span className="font-semibold text-spa-navy text-sm flex items-center gap-1.5 font-serif-spa">
                            <Calendar className="w-4 h-4 text-spa-gold" />
                            Scheduled Therapist booking (Locked)
                          </span>
                          <p className="text-xs text-spa-navy/60">
                            Add future appointment date and hours selection.
                          </p>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Calendar Widget when scheduled is selected */}
                  {!isOrderNow && (
                    <div className="border border-[#eae3d5] rounded-xl p-5 bg-stone-50/50 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-spa-navy/80 uppercase tracking-wide">
                          Choose Booking Date
                        </label>
                        <div className="grid grid-cols-7 gap-2 mt-2">
                          {currentMonthDates.map((d, index) => {
                            const isChosen = selectedDate === d.iso;
                            return (
                              <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedDate(d.iso)}
                                className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center cursor-pointer transition-colors ${
                                  isChosen
                                    ? "bg-spa-navy text-white border-spa-navy"
                                    : "bg-white border-[#eae3d5] text-[#1c2c31] hover:bg-stone-100"
                                }`}
                              >
                                <span className="text-[10px] uppercase text-slate-400 font-mono-spa font-medium">
                                  {d.dayName}
                                </span>
                                <span className="text-sm font-bold mt-0.5">{d.dayNum}</span>
                                <span className="text-[9px] uppercase font-semibold font-mono-spa">
                                  {d.month}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-spa-navy/80 uppercase tracking-wide">
                          Choose Treatment Time
                        </label>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {availableHours.map((time, idx) => {
                            const isChosen = selectedTime === time;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold font-mono-spa cursor-pointer transition-colors ${
                                  isChosen
                                    ? "bg-[#c5a47e] text-white border-[#c5a47e]"
                                    : "bg-white border-[#eae3d5] text-[#1c2c31] hover:bg-stone-100"
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ================= STEP 4: CUSTOMER HOME DETAILS ================= */}
              {step === 4 && (
                <div id="booking-step-4" className="space-y-4">
                  <h4 className="text-base font-serif-spa font-bold text-spa-navy mb-2">
                    Step 4: Home Delivery Location Details
                  </h4>
                  <p className="text-xs text-spa-navy/60">
                    Innovative Beauty is Abu Dhabi's premier <strong>Home Service Spa</strong>. Fill in the exact physical location where our therapist must travel:
                  </p>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-mono-spa font-bold text-spa-navy/60 uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-[#c5a47e]" />
                        </div>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Fatima Al Nahyan"
                          className="block w-full pl-9 pr-3 py-2.5 border border-[#eae3d5] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-sm text-spa-navy bg-[#fcfbfa]/65"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-spa font-bold text-spa-navy/60 uppercase tracking-wider">
                          Abu Dhabi Area Zone
                        </label>
                        <select
                          value={customerArea}
                          onChange={(e) => setCustomerArea(e.target.value)}
                          className="block w-full mt-1 px-3 py-2.5 border border-[#eae3d5] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-sm text-spa-navy bg-[#fcfbfa]/65 cursor-pointer"
                        >
                          {ABU_DHABI_AREAS.map((area, idx) => (
                            <option key={idx} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono-spa font-bold text-spa-navy/60 uppercase tracking-wider">
                          Mobile Call Number (+971)
                        </label>
                        <div className="relative mt-1">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-[#c5a47e]" />
                          </div>
                          <input
                            type="tel"
                            required
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="050 123 4567"
                            className="block w-full pl-9 pr-3 py-2.5 border border-[#eae3d5] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-sm text-spa-navy bg-[#fcfbfa]/65"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-spa font-bold text-spa-navy/60 uppercase tracking-wider">
                        Detailed Home / Hotel / Office Address
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="e.g. Al Khalidiyah, Sea View Tower, Tower B, Apt 1402"
                        className="block w-full mt-1 p-3 border border-[#eae3d5] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-sm text-spa-navy bg-[#fcfbfa]/65"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ================= STEP 5: PAYMENT SELECTION ================= */}
              {step === 5 && (
                <div id="booking-step-5" className="space-y-5 animate-fade-in">
                  <h4 className="text-base font-serif-spa font-bold text-spa-navy">
                    Step 5: Secure Payment Options
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("app")}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-40 cursor-pointer transition-all ${
                        paymentMethod === "app"
                          ? "border-spa-gold bg-[#fbfcfa] ring-1 ring-spa-gold/30"
                          : "border-[#eae3d5] bg-white hover:bg-stone-50"
                      }`}
                    >
                      <div className="p-2.5 bg-[#c5a47e]/20 rounded-xl text-[#7d572b] self-start">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-serif-spa font-bold text-sm block text-spa-navy">
                          Pay by Mobile App / Online Card
                        </span>
                        <p className="text-[11px] text-spa-navy/55 mt-1">
                          Secure digital transaction. 15% automatic cashback voucher code included.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash_or_card")}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between h-40 cursor-pointer transition-all ${
                        paymentMethod === "cash_or_card"
                          ? "border-spa-gold bg-[#fbfcfa] ring-1 ring-spa-gold/30"
                          : "border-[#eae3d5] bg-white hover:bg-stone-50"
                      }`}
                    >
                      <div className="p-2.5 bg-[#1c2c31]/10 rounded-xl text-spa-navy self-start">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-serif-spa font-bold text-sm block text-spa-navy">
                          Pay on Arrival (Cash or Card)
                        </span>
                        <p className="text-[11px] text-spa-navy/55 mt-1">
                          No pre-payment. Secure your session and pay our therapist directly with cash or credit card machine.
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="mt-8 bg-stone-50 border border-[#eae3d5] rounded-xl p-4 space-y-3 max-w-md mx-auto">
                    <h5 className="text-xs font-mono-spa font-bold uppercase text-spa-navy/70 border-b border-stone-200/60 pb-2">
                      Booking Session Summary
                    </h5>
                    <div className="space-y-1.5 text-xs text-spa-navy/80">
                      <div className="flex justify-between">
                        <span>{selectedService?.name} ({selectedService?.duration} min)</span>
                        <span className="font-mono-spa">AED {selectedService?.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Therapist: <strong className="font-semibold">{selectedTherapist?.name}</strong></span>
                        <span className="text-[#10b981] font-semibold text-[11px] uppercase">
                          {isOrderNow ? "Instant Dispatch" : "Reservations"}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-dashed border-stone-200 pt-2 font-bold text-sm text-spa-navy">
                        <span>Total Due</span>
                        <span className="font-mono-spa text-spa-gold">AED {selectedService?.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation (hidden on success page) */}
        {!confirmedBooking && (
          <div className="border-t border-[#eae3d5] bg-stone-50 px-6 py-4 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                step === 1
                  ? "border-stone-200 text-stone-300 cursor-not-allowed"
                  : "border-[#eae3d5] text-[#1c2c31] hover:bg-white cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-xs text-spa-navy/50 font-medium font-mono-spa">
              Step {step} of 5
            </div>

            {step < 5 ? (
              <button
                onClick={nextStep}
                disabled={
                  (step === 1 && !selectedService) ||
                  (step === 2 && !selectedTherapist) ||
                  (step === 3 && !isOrderNow && (!selectedDate || !selectedTime)) ||
                  (step === 4 && (!customerName || !customerPhone || !customerAddress))
                }
                className={`flex items-center gap-1.5 py-2 px-4 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer ${
                  ((step === 1 && !selectedService) ||
                    (step === 2 && !selectedTherapist) ||
                    (step === 3 && !isOrderNow && (!selectedDate || !selectedTime)) ||
                    (step === 4 && (!customerName || !customerPhone || !customerAddress)))
                    ? "bg-stone-300 cursor-not-allowed"
                    : "bg-spa-navy hover:bg-[#2c3d42]"
                }`}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCompleteBooking}
                className="flex items-center gap-1.5 py-2.5 px-6 text-xs font-bold uppercase tracking-wider rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors cursor-pointer shadow-md shadow-green-100"
              >
                <Zap className="w-4 h-4 fill-current text-green-100" />
                Book & Dispatch Now
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
