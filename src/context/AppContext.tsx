import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Therapist, TherapistStatus, Service, Review, Appointment } from "../types";
import {
  fetchServices,
  fetchTherapists,
  fetchReviews,
  fetchCategories,
  fetchAreas,
  insertReview,
  insertAppointment,
} from "../lib/api";
import { auth } from "../lib/firebase";

interface AppContextType {
  therapists: Therapist[];
  reviews: Review[];
  services: Service[];
  bookingOpen: boolean;
  preSelectedService: Service | null;
  preSelectedTherapist: Therapist | null;
  initialOrderNow: boolean;
  totalReviewsCount: number;
  ratingAverage: string;
  loading: boolean;
  categories: string[];
  areas: string[];
  setBookingOpen: (v: boolean) => void;
  setPreSelectedService: (v: Service | null) => void;
  setPreSelectedTherapist: (v: Therapist | null) => void;
  setInitialOrderNow: (v: boolean) => void;
  handleBookImmediate: (therapist: Therapist) => void;
  handleBookScheduled: (therapist: Therapist) => void;
  handleBookService: (service: Service) => void;
  handleBookingConfirmed: (appointment: Appointment) => void;
  handleAddReview: (review: Review) => void;
  openBooking: (service?: Service, therapist?: Therapist) => void;
}

const AppContext = createContext<AppContextType | null>(null);

function AppProviderInner({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [preSelectedTherapist, setPreSelectedTherapist] = useState<Therapist | null>(null);
  const [initialOrderNow, setInitialOrderNow] = useState(false);

  const requireAuth = () => {
    if (!auth.currentUser) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const guardedSetBookingOpen = (v: boolean) => {
    if (v === true && !auth.currentUser) {
      navigate("/login");
      return;
    }
    setBookingOpen(v);
  };

  useEffect(() => {
    async function load() {
      try {
        const [dbTherapists, dbReviews, dbServices, dbCategories, dbAreas] = await Promise.all([
          fetchTherapists(),
          fetchReviews(),
          fetchServices(),
          fetchCategories(),
          fetchAreas(),
        ]);
        if (dbTherapists.length) setTherapists(dbTherapists);
        if (dbReviews.length) setReviews(dbReviews);
        if (dbServices.length) setServices(dbServices);
        if (dbCategories.length) setCategories(dbCategories);
        if (dbAreas.length) setAreas(dbAreas);
      } catch (e) {
        console.warn("Supabase unavailable, using empty state", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalReviewsCount = reviews.length;
  const ratingAverage = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviewsCount || 1)
  ).toFixed(1);

  const handleBookImmediate = (therapist: Therapist) => {
    if (!requireAuth()) return;
    const srv = services.find((s) => s.category === therapist.specialties[0]) || services[0];
    setPreSelectedTherapist(therapist);
    setPreSelectedService(srv);
    setInitialOrderNow(true);
    setBookingOpen(true);
  };

  const handleBookScheduled = (therapist: Therapist) => {
    if (!requireAuth()) return;
    const srv = services.find((s) => s.category === therapist.specialties[0]) || services[0];
    setPreSelectedTherapist(therapist);
    setPreSelectedService(srv);
    setInitialOrderNow(false);
    setBookingOpen(true);
  };

  const handleBookService = (service: Service) => {
    if (!requireAuth()) return;
    setPreSelectedService(service);
    const match = therapists.find((t) => t.specialties.includes(service.category)) || therapists[0];
    setPreSelectedTherapist(match);
    setInitialOrderNow(match?.status === TherapistStatus.AVAILABLE_NOW);
    setBookingOpen(true);
  };

  const handleBookingConfirmed = async (appointment: Appointment) => {
    try {
      await insertAppointment(appointment);
    } catch (e) {
      console.warn("Failed to save appointment to Supabase", e);
    }
    setTherapists((prev) =>
      prev.map((t) =>
        t.id === appointment.therapistId ? { ...t, reviewsCount: t.reviewsCount + 1 } : t
      )
    );
  };

  const handleAddReview = async (newReview: Review) => {
    try {
      await insertReview(newReview);
    } catch (e) {
      console.warn("Failed to save review to Supabase", e);
    }
    setReviews((prev) => [newReview, ...prev]);
    setTherapists((prev) =>
      prev.map((t) => {
        const matches = t.specialties.some((s) => newReview.treatment.includes(s));
        if (matches) {
          return {
            ...t,
            reviewsCount: t.reviewsCount + 1,
            rating: Math.min(
              5,
              Number(
                ((t.rating * t.reviewsCount + newReview.rating) / (t.reviewsCount + 1)).toFixed(1)
              )
            ),
          };
        }
        return t;
      })
    );
  };

  const openBooking = (service?: Service, therapist?: Therapist) => {
    if (!requireAuth()) return;
    const s = service || services[0];
    const t = therapist || therapists.find((th) => th.specialties.includes(s.category)) || therapists[0];
    setPreSelectedService(s);
    setPreSelectedTherapist(t);
    setInitialOrderNow(t?.status === TherapistStatus.AVAILABLE_NOW);
    setBookingOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        therapists,
        reviews,
        services,
        bookingOpen,
        preSelectedService,
        preSelectedTherapist,
        initialOrderNow,
        totalReviewsCount,
        ratingAverage,
        loading,
        categories,
        areas,
        setBookingOpen: guardedSetBookingOpen,
        setPreSelectedService,
        setPreSelectedTherapist,
        setInitialOrderNow,
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

export function AppProvider({ children }: { children: ReactNode }) {
  return <AppProviderInner>{children}</AppProviderInner>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
