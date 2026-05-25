import { MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="font-serif-spa text-4xl md:text-5xl font-extrabold text-spa-navy mb-3">Contact Us</h1>
        <p className="text-stone-500 max-w-xl mx-auto">Get in touch to book an appointment or ask any questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          {[
            { icon: MapPin, title: "Location", detail: "E16-01, Al Zahiyah (Tourist Club Area), Abu Dhabi, UAE", sub: "Home-service across all Abu Dhabi" },
            { icon: Phone, title: "Phone", detail: "+971 50 123 4567", sub: "Available during working hours" },
            { icon: Mail, title: "Email", detail: "hello@innovativespa.ae", sub: "We respond within 24 hours" },
            { icon: Clock, title: "Working Hours", detail: "Mon-Fri: 11:05 AM - 11:30 PM", sub: "Sat-Sun: 10:30 AM - Midnight" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white border border-stone-100 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-[#c5a47e]/10 text-[#7d572b] flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-spa font-bold text-sm text-spa-navy mb-1">{item.title}</h3>
                <p className="text-sm text-stone-700">{item.detail}</p>
                <p className="text-xs text-stone-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-stone-100 rounded-2xl p-8 shadow-sm">
          <h3 className="font-serif-spa text-xl font-bold text-spa-navy mb-6">Send us a message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-500 mb-1 block">Full Name</label>
                <input type="text" className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e]" placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-500 mb-1 block">Email</label>
                <input type="email" className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e]" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 mb-1 block">Phone</label>
              <input type="tel" className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e]" placeholder="+971 50 XXX XXXX" />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 mb-1 block">Message</label>
              <textarea rows={4} className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a47e]/30 focus:border-[#c5a47e]" placeholder="How can we help you?" />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
