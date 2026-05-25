import React from "react";
import { Therapist, TherapistStatus } from "../types";
import { Zap, Calendar, Star, Shield, ToggleLeft, ToggleRight, Sparkles, MapPin } from "lucide-react";

interface TherapistHubProps {
  therapists: Therapist[];
  onToggleStatus: (therapistId: string) => void;
  onBookImmediate: (therapist: Therapist) => void;
  onBookScheduled: (therapist: Therapist) => void;
}

export default function TherapistHub({
  therapists,
  onToggleStatus,
  onBookImmediate,
  onBookScheduled,
}: TherapistHubProps) {
  return (
    <div className="bg-[#fbfcfa] border border-[#eae3d5] rounded-2xl p-6 shadow-xs" id="therapist-hub-container">
      {/* Simulator Banner */}
      <div className="mb-8 bg-[#f5eeda] border-l-4 border-spa-gold p-4 rounded-r-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif-spa font-semibold text-[#1c2c31] text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-spa-gold animate-pulse" />
              Live Spa Simulator Console (Testing Suite)
            </h4>
            <p className="text-xs text-spa-navy/80 mt-1 max-w-2xl">
              The user asked to see <strong>Available Now</strong> girls vs <strong>Unavailable</strong>. Toggle status switches below to simulate real-time shifts. Immediate dispatch buttons (Order Now) react dynamically.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-white py-1.5 px-3 rounded-lg shadow-2xs self-start sm:self-auto border border-[#eae3d5]">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
            <span className="font-medium text-[#1c2c31] font-mono-spa">Auto dispatch ACTIVE</span>
          </div>
        </div>

        {/* Status Toggles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {therapists.map((girl) => {
            const isAvailable = girl.status === TherapistStatus.AVAILABLE_NOW;
            return (
              <button
                key={girl.id}
                onClick={() => onToggleStatus(girl.id)}
                className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-200 ${
                  isAvailable
                    ? "bg-green-50/60 border-green-200 text-green-800 hover:bg-green-100/50 shadow-2xs"
                    : "bg-amber-50/60 border-amber-200 text-amber-800 hover:bg-amber-100/50 shadow-2xs"
                }`}
                title={`Click to toggle ${girl.name}'s status`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={girl.avatar}
                    alt={girl.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#c5a47e]"
                    referrerPolicy="no-referrer"
                  />
                  <span>{girl.name}</span>
                </div>
                <div className="flex items-center gap-1 font-mono-spa">
                  <span className="text-[10px] uppercase">
                    {isAvailable ? "Online" : "Busy"}
                  </span>
                  {isAvailable ? (
                    <ToggleRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-amber-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
        <div>
          <span className="text-xs uppercase tracking-wider text-spa-gold font-mono-spa font-semibold">
            Our Specialists — Abu Dhabi Home Service
          </span>
          <h2 className="text-2xl md:text-3xl font-serif-spa font-medium text-spa-navy mt-1">
            Choose Your Therapist
          </h2>
          <p className="text-sm text-spa-navy/70 mt-1 max-w-xl">
            Our wellness therapists bring world-class equipment, luxury linens, organic oils, and pure tranquility directly to your premium residence or hotel room.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs mt-3 md:mt-0 font-medium">
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Available Now: Direct Home Order</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-100">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Unavailable: Scheduled Booking</span>
          </div>
        </div>
      </div>

      {/* Grid of Specialists */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {therapists.map((therapist) => {
          const isAvailable = therapist.status === TherapistStatus.AVAILABLE_NOW;
          return (
            <div
              key={therapist.id}
              className={`group hover:shadow-md transition-all duration-300 rounded-xl bg-white border flex flex-col justify-between overflow-hidden relative ${
                isAvailable
                  ? "border-green-100 hover:border-green-300 ring-1 ring-green-100/30"
                  : "border-[#eae3d5] hover:border-[#c5a47e]"
              }`}
              id={`therapist-card-${therapist.id}`}
            >
              {/* Top Banner Tag */}
              <div
                className={`absolute top-3 right-3 z-10 font-mono-spa text-[10px] px-2.5 py-1 rounded-full font-semibold border-xs shadow-xs uppercase tracking-wide flex items-center gap-1 ${
                  isAvailable
                    ? "bg-green-500 text-white border-green-600 shadow-green-100"
                    : "bg-[#fcfbf9] text-amber-700 border-amber-200 shadow-neutral-100"
                }`}
              >
                {isAvailable ? (
                  <>
                    <Zap className="w-3 h-3 fill-current animate-bounce" />
                    <span>Available Now</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3 h-3" />
                    <span>Unavailable Now</span>
                  </>
                )}
              </div>

              {/* Therapist Image & Info */}
              <div className="p-5 flex flex-col items-center text-center">
                <div className="relative mb-4 mt-2">
                  <img
                    src={therapist.avatar}
                    alt={therapist.name}
                    className="w-24 h-24 rounded-full object-cover border-2 p-1 border-[#c5a47e]/40 group-hover:border-spa-gold transition-colors duration-300 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  {/* Small Live indicator ring */}
                  {isAvailable && (
                    <span className="absolute bottom-1 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse shadow-sm"></span>
                  )}
                </div>

                <h3 className="text-lg font-serif-spa font-semibold text-spa-navy">
                  {therapist.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-spa-navy/60 font-medium mt-0.5">
                  <MapPin className="w-3 h-3 text-[#c5a47e]" />
                  <span>{therapist.nationality} Specialist</span>
                </div>

                {/* Rating display */}
                <div className="flex items-center justify-center gap-1 mt-2.5 text-xs text-spa-navy/80">
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-semibold">{therapist.rating}</span>
                  <span className="text-spa-navy/40">({therapist.reviewsCount} reviews)</span>
                </div>

                {/* Specialty Pills */}
                <div className="flex flex-wrap gap-1 justify-center mt-3.5 h-[56px] overflow-hidden">
                  {therapist.specialties.slice(0, 2).map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 bg-[#fcfbf9] text-[#7d572b] rounded-md border border-[#eae3d5] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                  {therapist.specialties.length > 2 && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-stone-100 text-[#1c2c31]/60 rounded-md font-mono-spa">
                      +{therapist.specialties.length - 2} more
                    </span>
                  )}
                </div>

                <p className="text-xs text-spa-navy/70 mt-3 line-clamp-2 italic px-1">
                  "{therapist.bio}"
                </p>
              </div>

              {/* Status and Action Buttons */}
              <div className="border-t border-[#eae3d5] bg-stone-50/50 p-4 flex flex-col gap-2 mt-auto">
                {isAvailable ? (
                  <>
                    <div className="text-center">
                      <p className="text-[11px] text-green-700 font-mono-spa font-bold flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 fill-current" />
                        PREPARED FOR DISPATCH
                      </p>
                      <p className="text-[10px] text-spa-navy/55 mt-0.5">
                        Departing within 15 mins to your home
                      </p>
                    </div>
                    <button
                      onClick={() => onBookImmediate(therapist)}
                      className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2 px-3 rounded-lg font-medium text-xs transition-colors shadow-xs hover:shadow-sm cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <Zap className="w-4 h-4 fill-current text-green-100" />
                      Order {therapist.name} Now
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <p className="text-[11px] text-amber-700 font-mono-spa font-semibold flex items-center justify-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {therapist.nextAvailableTime || "Schedule Future"}
                      </p>
                      <p className="text-[10px] text-spa-navy/55 mt-0.5">
                        Occupied on another local session
                      </p>
                    </div>
                    <button
                      onClick={() => onBookScheduled(therapist)}
                      className="w-full bg-spa-navy hover:bg-[#25393f] text-white py-2 px-3 rounded-lg font-medium text-xs transition-colors shadow-xs hover:shadow-sm cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <Calendar className="w-4 h-4 text-spa-gold" />
                      Schedule {therapist.name}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
