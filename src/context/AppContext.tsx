import { createContext, useContext, useState, ReactNode } from "react";
import { Therapist, TherapistStatus, Service, Review, Appointment } from "../types";
import { INITIAL_THERAPISTS, SERVICES, INITIAL_REVIEWS } from "../data";

interface AppContextType {
  therapists: Therapist[];
  reviews: Review[];
  bookingOpen: boolean;
  preSelectedService: Service | null;
  preSelectedTherapist: Therapist | null;
  initialOrderNow: boolean;
  totalReviewsCount: number;
  ratingAverage: string;
  setBookingOpen: (v: boolean) => void;
  setPreSelectedService: (v: Service | null) => void;
  setPreSelectedTherapist: (v: Therapist | null) => void;
  setInitialOrderNow: (v: boolean) => void;
  handleToggleTherapistStatus: (id: string) => void;
  handleBookImmediate: (therapist: Therapist) => void;
  handleBookScheduled: (therapist: Therapist) => void;
  handleBookService: (service: Service) => void;
  handleBookingConfirmed: (appointment: Appointment) => void;
  handleAddReview: (review: Review) => void;
  openBooking: (service?: Service, therapist?: Therapist) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [therapists, setTherapists] = useState<Therapist[]>(INITIAL_THERAPISTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [preSelectedTherapist, setPreSelectedTherapist] = useState<Therapist | null>(null);
  const [initialOrderNow, setInitialOrderNow] = useState(false);

  const totalReviewsCount = reviews.length;
  const ratingAverage = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviewsCount || 1)
  ).toFixed(1);

  const handleToggleTherapistStatus = (therapistId: string) => {
    setTherapists((prev) =>
      prev.map((t) => {
        if (t.id === therapistId) {
          const nextStatus =
            t.status === TherapistStatus.AVAILABLE_NOW
              ? TherapistStatus.UNAVAILABLE
              : TherapistStatus.AVAILABLE_NOW;
          return {
            ...t,
            status: nextStatus,
            nextAvailableTime:
              nextStatus === TherapistStatus.UNAVAILABLE ? "Today 7:00 PM" : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleBookImmediate = (therapist: Therapist) => {
    const srv = SERVICES.find((s) => s.category === therapist.specialties[0]) || SERVICES[0];
    setPreSelectedTherapist(therapist);
    setPreSelectedService(srv);
    setInitialOrderNow(true);
    setBookingOpen(true);
  };

  const handleBookScheduled = (therapist: Therapist) => {
    const srv = SERVICES.find((s) => s.category === therapist.specialties[0]) || SERVICES[0];
    setPreSelectedTherapist(therapist);
    setPreSelectedService(srv);
    setInitialOrderNow(false);
    setBookingOpen(true);
  };

  const handleBookService = (service: Service) => {
    setPreSelectedService(service);
    const match = therapists.find((t) => t.specialties.includes(service.category)) || therapists[0];
    setPreSelectedTherapist(match);
    setInitialOrderNow(match.status === TherapistStatus.AVAILABLE_NOW);
    setBookingOpen(true);
  };

  const handleBookingConfirmed = (appointment: Appointment) => {
    setTherapists((prev) =>
      prev.map((t) => (t.id === appointment.therapistId ? { ...t, reviewsCount: t.reviewsCount + 1 } : t))
    );
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    setTherapists((prev) =>
      prev.map((t) => {
        const matches = t.specialties.some((s) => newReview.treatment.includes(s));
        if (matches) {
          return {
            ...t,
            reviewsCount: t.reviewsCount + 1,
            rating: Math.min(5, Number(((t.rating * t.reviewsCount + newReview.rating) / (t.reviewsCount + 1)).toFixed(1))),
          };
        }
        return t;
      })
    );
  };

  const openBooking = (service?: Service, therapist?: Therapist) => {
    const s = service || SERVICES[0];
    const t = therapist || therapists.find((th) => th.specialties.includes(s.category)) || therapists[0];
    setPreSelectedService(s);
    setPreSelectedTherapist(t);
    setInitialOrderNow(t.status === TherapistStatus.AVAILABLE_NOW);
    setBookingOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        therapists,
        reviews,
        bookingOpen,
        preSelectedService,
        preSelectedTherapist,
        initialOrderNow,
        totalReviewsCount,
        ratingAverage,
        setBookingOpen,
        setPreSelectedService,
        setPreSelectedTherapist,
        setInitialOrderNow,
        handleToggleTherapistStatus,
        handleBookImmediate,
        handleBookScheduled,
        handleBookService,
        handleBookingConfirmed,
        handleAddReview,
        openBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
