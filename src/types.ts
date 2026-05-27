export enum TherapistStatus {
  AVAILABLE_NOW = "AVAILABLE_NOW",
  UNAVAILABLE = "UNAVAILABLE"
}

export interface Therapist {
  id: string;
  name: string;
  nationality: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
  avatar: string;
  status: TherapistStatus;
  nextAvailableTime?: string; // e.g. "Today 3:30 PM" or "Tomorrow 10:00 AM"
  bio: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number; // in AED
  category: string;
  description: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  treatment: string;
  verified: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  therapistId: string;
  dateTime: string;
  orderNow: boolean;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerArea: string;
  paymentMethod: "app" | "cash_or_card" | "google_pay";
  status: "confirmed" | "completed";
  createdAt: string;
  transactionId?: string;
  paymentStatus?: "pending" | "completed" | "failed";
}

export interface Voucher {
  id: string;
  code: string;
  amount: number;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderMessage: string;
  purchaseDate: string;
  isGift: boolean;
}
