import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, MapPin, Globe, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
    area: "",
    city: "Abu Dhabi",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await signUp(form.email, form.password, {
      full_name: form.full_name,
      phone: form.phone,
      date_of_birth: form.date_of_birth,
      gender: form.gender,
      address: form.address,
      area: form.area,
      city: form.city,
    });
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="font-serif-spa text-3xl font-bold text-spa-navy">Create Account</h1>
          <p className="text-stone-500 text-sm mt-2">Join us for a premium spa experience</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#eae3d5] p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={(e) => updateField("full_name", e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Min. 6 characters"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-spa-navy cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  Confirm <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    placeholder="Repeat password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+971 XX XXX XXXX"
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="date"
                    value={form.date_of_birth}
                    onChange={(e) => updateField("date_of_birth", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  Gender
                </label>
                <select
                  value={form.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                >
                  <option value="">Prefer not to say</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  City
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Your address for home service"
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-spa-navy/70 mb-1.5 uppercase tracking-wider">
                  Area / District
                </label>
                <input
                  type="text"
                  value={form.area}
                  onChange={(e) => updateField("area", e.target.value)}
                  placeholder="e.g. Al Khalidiyah, Al Reem Island"
                  className="w-full px-4 py-3 bg-stone-50 border border-[#eae3d5] rounded-xl text-sm text-spa-navy placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-spa-navy hover:bg-[#2c3d42] text-white font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#c5a47e] hover:text-[#b8946e] font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
