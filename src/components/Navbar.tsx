import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Gift, MapPin, Clock, ChevronDown, Search, User, LogOut, LayoutDashboard } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Therapists", path: "/therapists" },
  { label: "Reviews", path: "/reviews" },
  { label: "Gift Vouchers", path: "/vouchers" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const TIME_OPTIONS = ["Any time", "Morning (9-12)", "Afternoon (12-5)", "Evening (5-10)"];

export default function Navbar() {
  const { categories, areas } = useApp();
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"treatment" | "area" | "time" | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState("All treatments");
  const [selectedArea, setSelectedArea] = useState("Abu Dhabi, UAE");
  const [selectedTime, setSelectedTime] = useState("Any time");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedTreatment !== "All treatments") params.set("treatment", selectedTreatment);
    if (selectedArea !== "Abu Dhabi, UAE") params.set("area", selectedArea);
    if (selectedTime !== "Any time") params.set("time", selectedTime);
    const qs = params.toString();
    navigate(qs ? `/services?${qs}` : "/services");
    setOpenDropdown(null);
  };

  const toggleDropdown = (name: "treatment" | "area" | "time") => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 bg-white border-b border-[#eae3d5]/80 backdrop-blur-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-serif-spa text-2xl font-black lowercase tracking-tighter text-spa-navy flex items-center">
            fresha
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a47e] ml-0.5"></span>
          </span>
          <div className="hidden md:flex h-4 w-px bg-stone-300 mx-3"></div>
          <span className="hidden md:inline text-xs text-spa-navy/55 uppercase tracking-widest font-mono-spa font-semibold">
            Partner Hub
          </span>
        </Link>

        <div ref={dropdownRef} className="hidden lg:flex items-center gap-2 bg-stone-50 border border-[#eae3d5] px-4 py-1.5 rounded-full text-xs font-medium max-w-xl flex-1 shadow-2xs relative">
          <div
            className="flex items-center gap-1.5 px-2 hover:text-[#c5a47e] cursor-pointer relative"
            onClick={() => toggleDropdown("treatment")}
          >
            <span className="select-none">{selectedTreatment}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            {openDropdown === "treatment" && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-[#eae3d5] rounded-xl shadow-lg py-1 min-w-[180px] z-50 max-h-48 overflow-y-auto">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedTreatment("All treatments"); setOpenDropdown(null); }}
                  className="w-full text-left px-3 py-2 hover:bg-stone-50 text-spa-navy text-xs"
                >
                  All treatments
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={(e) => { e.stopPropagation(); setSelectedTreatment(cat); setOpenDropdown(null); }}
                    className="w-full text-left px-3 py-2 hover:bg-stone-50 text-spa-navy text-xs"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-stone-200"></div>

          <div
            className="flex items-center gap-1.5 px-2 hover:text-[#c5a47e] cursor-pointer relative"
            onClick={() => toggleDropdown("area")}
          >
            <MapPin className="w-3.5 h-3.5 text-[#c5a47e]" />
            <span className="select-none">{selectedArea}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            {openDropdown === "area" && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-[#eae3d5] rounded-xl shadow-lg py-1 min-w-[180px] z-50 max-h-48 overflow-y-auto">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedArea("Abu Dhabi, UAE"); setOpenDropdown(null); }}
                  className="w-full text-left px-3 py-2 hover:bg-stone-50 text-spa-navy text-xs"
                >
                  Abu Dhabi, UAE
                </button>
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={(e) => { e.stopPropagation(); setSelectedArea(area); setOpenDropdown(null); }}
                    className="w-full text-left px-3 py-2 hover:bg-stone-50 text-spa-navy text-xs"
                  >
                    {area}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-stone-200"></div>

          <div
            className="flex items-center gap-1.5 px-2 hover:text-[#c5a47e] cursor-pointer relative"
            onClick={() => toggleDropdown("time")}
          >
            <Clock className="w-3.5 h-3.5 opacity-60" />
            <span className="select-none">{selectedTime}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            {openDropdown === "time" && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-[#eae3d5] rounded-xl shadow-lg py-1 min-w-[160px] z-50">
                {TIME_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={(e) => { e.stopPropagation(); setSelectedTime(opt); setOpenDropdown(null); }}
                    className="w-full text-left px-3 py-2 hover:bg-stone-50 text-spa-navy text-xs"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="bg-spa-navy hover:bg-[#2c3d42] text-white p-2 rounded-full cursor-pointer ml-auto transition-colors shrink-0"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex text-xs text-right flex-col">
            <span className="font-semibold text-spa-navy">Innovative Home Spa</span>
            <span className="text-stone-400 font-mono-spa">Abu Dhabi Zone</span>
          </div>
          <Link
            to="/vouchers"
            className="bg-[#c5a47e]/15 text-[#7d572b] hover:bg-[#c5a47e]/25 text-xs font-bold py-2 px-3.5 rounded-full border border-[#c5a47e]/30 flex items-center gap-1.5 transition-all"
          >
            <Gift className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Gifts & Vouchers</span>
          </Link>

          {user ? (
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-colors overflow-hidden bg-spa-navy"
              >
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white">{getInitials(profile?.full_name || user.email || "")}</span>
                )}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-[#eae3d5] rounded-xl shadow-lg py-1.5 min-w-[180px] z-50">
                  <div className="px-4 py-2 border-b border-[#eae3d5]/60 mb-1">
                    <p className="text-xs font-semibold text-spa-navy truncate">{profile?.full_name || "User"}</p>
                    <p className="text-[10px] text-stone-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-spa-navy hover:bg-stone-50 transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-stone-400" />
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => { await signOut(); setUserMenuOpen(false); navigate("/"); }}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-red-500 hover:bg-red-50 w-full text-left transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-spa-navy hover:bg-[#2c3d42] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center gap-1.5 transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-white hover:bg-stone-50 border border-[#eae3d5] p-2.5 rounded-full shadow-2xs cursor-pointer flex items-center gap-1"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-4 h-4 text-spa-navy" /> : <Menu className="w-4 h-4 text-spa-navy" />}
            <span className="hidden sm:inline text-xs font-bold font-mono-spa px-0.5">{menuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute left-0 right-0 top-16 bg-white border-b border-[#eae3d5] shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname === link.path
                      ? "text-[#c5a47e] bg-[#c5a47e]/10 border border-[#c5a47e]/20"
                      : "text-spa-navy/70 hover:text-spa-navy hover:bg-stone-50 border border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
