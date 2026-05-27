import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Calendar, Clock, MapPin, Phone, Mail, Edit3, LogOut, Loader2,
  Package, Heart, Camera, CheckCircle, X, Upload, AlertCircle
} from "lucide-react";
import { useAuth, UserProfile } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

interface UserAppointment {
  id: string;
  service_name: string;
  therapist_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  payment_status: string;
  address: string;
  area: string;
}

const PROFILE_FIELDS: { key: keyof UserProfile; label: string; type: string; placeholder: string }[] = [
  { key: "full_name", label: "Full Name", type: "text", placeholder: "Your full name" },
  { key: "phone", label: "Phone", type: "tel", placeholder: "+971 XX XXX XXXX" },
  { key: "date_of_birth", label: "Date of Birth", type: "date", placeholder: "" },
  { key: "gender", label: "Gender", type: "select", placeholder: "" },
  { key: "address", label: "Address", type: "text", placeholder: "Your address for home service" },
  { key: "area", label: "Area / District", type: "text", placeholder: "e.g. Al Khalidiyah" },
  { key: "city", label: "City", type: "text", placeholder: "Abu Dhabi" },
];

export default function DashboardPage() {
  const { user, profile, signOut, updateProfile, uploadAvatarFile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [appointments, setAppointments] = useState<UserAppointment[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const missingFields = PROFILE_FIELDS.filter(
    (f) => !profile?.[f.key] || (typeof profile[f.key] === "string" && !(profile[f.key] as string)?.trim())
  );

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name,
        phone: profile.phone,
        date_of_birth: profile.date_of_birth,
        gender: profile.gender,
        address: profile.address,
        area: profile.area,
        city: profile.city || "Abu Dhabi",
      });
    }
  }, [profile]);

  useEffect(() => {
    async function loadAppointments() {
      if (!user) return;
      const { data } = await supabase
        .from("user_appointments_view")
        .select("*")
        .eq("client_id", user.uid)
        .order("appointment_date", { ascending: false });
      if (data) setAppointments(data as UserAppointment[]);
      setLoadingApps(false);
    }
    if (user) loadAppointments();
  }, [user]);

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setSaveMsg({ type: "error", text: "Image must be under 2MB" });
      return;
    }

    setAvatarPreview(URL.createObjectURL(file));
    setUploadingAvatar(true);
    const url = await uploadAvatarFile(file);
    setUploadingAvatar(false);
    setAvatarPreview(null);

    if (url) {
      setSaveMsg({ type: "success", text: "Profile picture updated" });
    } else {
      setSaveMsg({ type: "error", text: "Failed to upload image" });
    }
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveMsg(null);
    const result = await updateProfile(editForm);
    setSaving(false);
    if (result.error) {
      setSaveMsg({ type: "error", text: result.error });
    } else {
      setSaveMsg({ type: "success", text: "Profile saved successfully" });
      setEditing(false);
    }
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const updateField = (key: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#c5a47e]" />
      </div>
    );
  }

  if (!user) return null;

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const avatarSrc = avatarPreview || profile?.avatar_url || "";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-stone-50/50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif-spa text-2xl font-bold text-spa-navy">My Dashboard</h1>
            <p className="text-stone-500 text-sm mt-1">Manage your profile and bookings</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-red-500 border border-[#eae3d5] hover:border-red-200 bg-white px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>

        {saveMsg && (
          <div
            className={`mb-6 flex items-center gap-2 text-xs font-semibold px-4 py-3 rounded-xl border ${
              saveMsg.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {saveMsg.type === "success" ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            {saveMsg.text}
          </div>
        )}

        {/* Profile completion banner for Google/incomplete users */}
        {!editing && missingFields.length > 0 && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">Complete your profile</p>
              <p className="text-xs text-amber-700 mt-1">
                Please fill in: {missingFields.map((f) => f.label).join(", ")}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="mt-2 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Complete Now
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#eae3d5] p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                {/* Avatar with upload */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-[#c5a47e]/20 flex items-center justify-center overflow-hidden">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-[#c5a47e]">
                        {getInitials(profile?.full_name || user.email || "U")}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-spa-navy hover:bg-[#2c3d42] text-white rounded-full flex items-center justify-center border-2 border-white transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {uploadingAvatar ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Camera className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                <h2 className="font-serif-spa text-lg font-bold text-spa-navy">
                  {profile?.full_name || "User"}
                </h2>
                <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  {user.email}
                </p>
                {profile?.phone && (
                  <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                    <Phone className="w-3 h-3" />
                    {profile.phone}
                  </p>
                )}
                {profile?.address && (
                  <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    {profile.address}{profile.area ? `, ${profile.area}` : ""}
                  </p>
                )}
              </div>

              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full mt-5 border border-[#eae3d5] hover:bg-stone-50 text-spa-navy font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-[#eae3d5] p-4 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#c5a47e]/15 flex items-center justify-center mb-2">
                  <Package className="w-4 h-4 text-[#c5a47e]" />
                </div>
                <p className="text-2xl font-bold text-spa-navy">{appointments.length}</p>
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">Bookings</p>
              </div>
              <div className="bg-white rounded-xl border border-[#eae3d5] p-4 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-spa-navy">
                  {appointments.filter((a) => a.status === "confirmed").length}
                </p>
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">Upcoming</p>
              </div>
              <div className="bg-white rounded-xl border border-[#eae3d5] p-4 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mb-2">
                  <Heart className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-spa-navy">{profile?.full_name ? "Member" : "Guest"}</p>
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">Status</p>
              </div>
            </div>

            {/* Profile Edit Form */}
            {editing && (
              <div className="bg-white rounded-2xl border border-[#eae3d5] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif-spa text-base font-bold text-spa-navy flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#c5a47e]" />
                    Edit Profile
                  </h3>
                  <button
                    onClick={() => { setEditing(false); setEditForm({
                      full_name: profile?.full_name,
                      phone: profile?.phone,
                      date_of_birth: profile?.date_of_birth,
                      gender: profile?.gender,
                      address: profile?.address,
                      area: profile?.area,
                      city: profile?.city || "Abu Dhabi",
                    }); }}
                    className="text-stone-400 hover:text-spa-navy cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROFILE_FIELDS.map((field) => (
                    <div key={field.key} className={field.key === "address" ? "sm:col-span-2" : ""}>
                      <label className="block text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <select
                          value={(editForm[field.key] as string) || ""}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#eae3d5] rounded-xl text-xs text-spa-navy focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                        >
                          <option value="">Prefer not to say</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={(editForm[field.key] as string) || ""}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-[#eae3d5] rounded-xl text-xs text-spa-navy placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6 pt-5 border-t border-[#eae3d5]">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex-1 bg-spa-navy hover:bg-[#2c3d42] text-white text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {saving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => { setEditing(false); }}
                    className="flex-1 border border-[#eae3d5] text-stone-500 text-xs font-semibold py-3 rounded-xl hover:bg-stone-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Recent Appointments */}
            <div className="bg-white rounded-2xl border border-[#eae3d5] p-6 shadow-sm">
              <h3 className="font-serif-spa text-base font-bold text-spa-navy mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#c5a47e]" />
                Recent Bookings
              </h3>

              {loadingApps ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                  <p className="text-sm text-stone-400">No bookings yet</p>
                  <p className="text-xs text-stone-300 mt-1">Book a service to see it here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.slice(0, 5).map((appt) => (
                    <div
                      key={appt.id}
                      className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-[#eae3d5]/60"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#c5a47e]/15 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-[#c5a47e]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-spa-navy">{appt.service_name}</p>
                          <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {appt.therapist_name}
                          </p>
                          <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {appt.appointment_date} at {appt.appointment_time}
                          </p>
                          {appt.address && (
                            <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {appt.address}{appt.area ? `, ${appt.area}` : ""}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span
                          className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            appt.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : appt.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-stone-100 text-stone-500"
                          }`}
                        >
                          {appt.status}
                        </span>
                        <span
                          className={`block text-[10px] font-semibold mt-1 ${
                            appt.payment_status === "completed"
                              ? "text-green-600"
                              : appt.payment_status === "pending"
                              ? "text-amber-600"
                              : "text-stone-400"
                          }`}
                        >
                          {appt.payment_status === "completed"
                            ? "Paid"
                            : appt.payment_status === "pending"
                            ? "Pending"
                            : appt.payment_status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
