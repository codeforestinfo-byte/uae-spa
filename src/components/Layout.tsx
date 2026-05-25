import { ReactNode } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fcfbfa] flex flex-col font-sans text-spa-navy selection:bg-rose-100 antialiased">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-spa-navy text-white/80 border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="font-serif-spa text-3xl font-black text-[#c5a47e] lowercase tracking-tight">
              spa<strong className="text-white font-serif-spa">.wellness</strong>
            </span>
            <p className="text-xs text-white/50 max-w-sm">
              We provide the most luxurious, trusted, and private home-service spa experience inside Abu Dhabi. Registered therapists deploy directly with full setups.
            </p>
          </div>
          <div>
            <h5 className="font-serif-spa text-sm font-bold text-[#c5a47e] uppercase tracking-wider mb-4">Our Specialties</h5>
            <ul className="text-xs space-y-2 text-white/55 font-mono-spa">
              <li>Lava Clamshell Therapies</li>
              <li>Lymphatic Drainage Detoxing</li>
              <li>Couple Royal Home Massage</li>
              <li>Anti-Cellulite Wood Maderotherapies</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-serif-spa text-sm font-bold text-[#c5a47e] uppercase tracking-wider mb-4">Licensing & Legal</h5>
            <p className="text-xs text-white/45">
              Innovative Beauty and Wellness LLC • Licensed by Abu Dhabi Department of Economic Development. All workers are verified under medical certificates and UAE ministry guidelines.
            </p>
            <div className="text-[10px] text-[#c5a47e]/50 font-mono-spa">
              &copy; {new Date().getFullYear()} Innovative Beauty & Wellness Home Spa. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
