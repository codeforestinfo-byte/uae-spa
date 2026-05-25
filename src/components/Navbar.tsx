import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Gift, MapPin, Clock, ChevronDown, Search, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Therapists", path: "/therapists" },
  { label: "Reviews", path: "/reviews" },
  { label: "Gift Vouchers", path: "/vouchers" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-white border-b border-[#eae3d5]/80 backdrop-blur-md z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
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

        {/* Search bar */}
        <div className="hidden lg:flex items-center gap-2 bg-stone-50 border border-[#eae3d5] px-4 py-1.5 rounded-full text-xs font-medium max-w-xl flex-1 shadow-2xs">
          <div className="flex items-center gap-1.5 px-2 hover:text-[#c5a47e] cursor-pointer">
            <span>All treatments</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </div>
          <div className="h-4 w-px bg-stone-200"></div>
          <div className="flex items-center gap-1.5 px-2 hover:text-[#c5a47e] cursor-pointer">
            <MapPin className="w-3.5 h-3.5 text-[#c5a47e]" />
            <span>Abu Dhabi, UAE</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </div>
          <div className="h-4 w-px bg-stone-200"></div>
          <div className="flex items-center gap-1.5 px-2 hover:text-[#c5a47e] cursor-pointer">
            <Clock className="w-3.5 h-3.5 opacity-60" />
            <span>Any time</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </div>
          <Link to="/services" className="bg-spa-navy hover:bg-[#2c3d42] text-white p-2 rounded-full cursor-pointer ml-auto transition-colors" aria-label="Search button">
            <Search className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* User actions */}
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

      {/* Dropdown Menu */}
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
