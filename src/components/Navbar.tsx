import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-stone-100 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-serif-spa text-2xl font-black lowercase tracking-tighter text-spa-navy flex items-center">
            <Sparkles className="w-5 h-5 text-amber-400 mr-1" />
            spa
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a47e] ml-0.5" />
          </span>
          <div className="hidden md:flex h-4 w-px bg-stone-300 mx-2" />
          <span className="hidden md:inline text-[10px] text-spa-navy/50 uppercase tracking-widest font-semibold max-w-[120px] leading-tight">
            Innovative Beauty & Wellness
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                location.pathname === link.path
                  ? "text-[#c5a47e] bg-[#c5a47e]/10"
                  : "text-spa-navy/70 hover:text-spa-navy hover:bg-stone-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button className="hidden sm:flex bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-pink-200/50 hover:shadow-xl transition-all items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Book Now
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden bg-white hover:bg-stone-50 border border-stone-200 p-2.5 rounded-full transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-4 h-4 text-spa-navy" /> : <Menu className="w-4 h-4 text-spa-navy" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-stone-100 bg-white/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  location.pathname === link.path
                    ? "text-[#c5a47e] bg-[#c5a47e]/10"
                    : "text-spa-navy/70 hover:text-spa-navy hover:bg-stone-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
