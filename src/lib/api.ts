import { supabase, supabaseAdmin } from "./supabase";
import type { Therapist, Service, Review, Appointment, Voucher } from "../types";

// Services
export async function fetchServices(): Promise<Service[]> {
  const { data } = await supabase
    .from("services")
    .select("id, name, description, duration, price, popular, categories!inner(name)")
    .order("price");
  return (data || []).map((s: any) => ({
    id: s.id,
    name: s.name,
    description: s.description || "",
    duration: s.duration,
    price: s.price,
    category: s.categories?.name || "General",
    popular: s.popular || false,
  }));
}

export async function fetchCategories(): Promise<string[]> {
  const { data } = await supabase.from("categories").select("name").order("name");
  return (data || []).map((c: any) => c.name);
}

export async function fetchAreas(): Promise<string[]> {
  const { data } = await supabase.from("areas").select("name").order("name");
  return (data || []).map((a: any) => a.name);
}

// Therapists
export async function fetchTherapists(): Promise<Therapist[]> {
  const { data } = await supabase
    .from("therapists")
    .select("*")
    .order("name");
  return (data || []).map((t: any) => ({
    id: t.id,
    name: t.name,
    nationality: t.nationality || "",
    specialties: t.specialties || [],
    rating: t.rating || 5.0,
    reviewsCount: t.reviews_count || 0,
    avatar: t.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=c5a47e&color=fff`,
    status: t.status === "available" ? "AVAILABLE_NOW" as const : "UNAVAILABLE" as const,
    nextAvailableTime: t.next_available_time || undefined,
    bio: t.bio || "",
  }));
}

export async function updateTherapistStatus(id: string, status: string, nextAvailableTime?: string) {
  return supabaseAdmin
    .from("therapists")
    .update({ status, next_available_time: nextAvailableTime || null })
    .eq("id", id);
}

// Reviews
export async function fetchReviews(): Promise<Review[]> {
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  return (data || []).map((r: any) => ({
    id: r.id,
    author: r.client_name,
    rating: r.rating,
    date: r.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
    comment: r.comment || "",
    treatment: r.treatment || "",
    verified: r.verified || false,
  }));
}

export async function insertReview(review: Review) {
  return supabaseAdmin.from("reviews").insert({
    client_name: review.author,
    rating: review.rating,
    comment: review.comment,
    treatment: review.treatment,
    verified: review.verified,
  });
}

// Appointments
export async function insertAppointment(appointment: Appointment) {
  return supabaseAdmin.from("appointments").insert({
    client_id: appointment.customerName,
    service_id: appointment.serviceId,
    therapist_id: appointment.therapistId,
    appointment_date: appointment.dateTime?.split("T")[0] || new Date().toISOString().split("T")[0],
    appointment_time: appointment.dateTime?.split("T")[1]?.split("+")[0] || "12:00",
    address: appointment.customerAddress,
    area: appointment.customerArea,
    payment_method: appointment.paymentMethod === "app" ? "app" : "cash_or_card",
    status: appointment.status,
    notes: `Order now: ${appointment.orderNow}, Customer: ${appointment.customerName}, Phone: ${appointment.customerPhone}`,
  });
}

// Vouchers
export async function insertVoucher(voucher: Voucher) {
  return supabaseAdmin.from("vouchers").insert({
    code: voucher.code,
    amount: voucher.amount,
    recipient_name: voucher.recipientName,
    recipient_email: voucher.recipientEmail,
    sender_name: voucher.senderName,
    sender_message: voucher.senderMessage,
    is_gift: voucher.isGift,
  });
}
