import React, { useState } from "react";
import { Voucher } from "../types";
import { Copy, Check, Gift, Mail, Tag, Send, AlertCircle } from "lucide-react";

export default function VoucherSystem() {
  const [amount, setAmount] = useState<number>(300);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [isGift, setIsGift] = useState(true);

  const [activeVoucher, setActiveVoucher] = useState<Voucher | null>(null);
  const [copied, setCopied] = useState(false);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = amount === 0 ? parseFloat(customAmount) || 150 : amount;

    const newVoucher: Voucher = {
      id: "vch-" + Math.floor(100000 + Math.random() * 900000),
      code: "INNOV-" + Math.floor(1000 + Math.random() * 9000) + "-SPA",
      amount: finalAmount,
      recipientName: isGift ? recipientName : senderName,
      recipientEmail: isGift ? recipientEmail : "",
      senderName,
      senderMessage: isGift ? senderMessage : "Purchased for personal wellness use.",
      purchaseDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      isGift,
    };

    setActiveVoucher(newVoucher);
  };

  const handleCopyCode = () => {
    if (!activeVoucher) return;
    navigator.clipboard.writeText(activeVoucher.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-[#eae3d5] rounded-2xl p-6 md:p-8 shadow-xs" id="voucher-system-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-stone-100 pb-5">
        <div>
          <span className="text-xs uppercase tracking-wider text-spa-gold font-mono-spa font-bold">
            Gifts & Promotions
          </span>
          <h2 className="text-2xl font-serif-spa font-medium text-spa-navy mt-1">
            Buy Digital Spa Vouchers
          </h2>
          <p className="text-sm text-spa-navy/60 mt-1 max-w-xl">
            Give the gift of pure luxury home service. Instantly delivered to your friends, family, or self, downloadable as a premium PDF card.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-stone-50 py-1.5 px-3 rounded-lg border border-[#eae3d5] self-start md:self-auto font-medium">
          <Tag className="w-4 h-4 text-spa-gold" />
          <span>Vouchers expire 12 months from purchase</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form panel */}
        <div className="lg:col-span-7">
          {activeVoucher ? (
            /* ================= THE CREATED VOUCHER CERTIFICATE ================= */
            <div className="bg-[#fbfcfa] border-2 border-dashed border-[#c5a47e] rounded-2xl p-6 text-center space-y-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c5a47e]/10 to-transparent rounded-bl-full"></div>
              
              <div className="w-12 h-12 bg-[#c5a47e]/10 rounded-full flex items-center justify-center mx-auto text-[#7d572b]">
                <Gift className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <span className="text-[10px] tracking-widest text-[#7d572b] uppercase font-mono-spa font-bold block">
                  Wellness Spa Voucher Certificate
                </span>
                <p className="font-serif-spa text-3xl font-bold text-spa-navy mt-2 estimation-code">
                  AED {activeVoucher.amount}
                </p>
                <span className="text-xs text-spa-navy/55 block mt-1">
                  Value fully redeemable for any Home Massage treatment
                </span>
              </div>

              <div className="bg-white border border-[#eae3d5] rounded-xl p-4 max-w-md mx-auto relative shadow-2xs">
                <div className="text-xs font-mono-spa tracking-wider text-spa-navy/55 uppercase text-left">
                  SPA REDEMPTION CODE:
                </div>
                <div className="flex items-center justify-between gap-3 mt-1.5 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  <span className="font-mono-spa text-sm font-extrabold tracking-widest text-spa-navy">
                    {activeVoucher.code}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 hover:bg-stone-200/60 rounded-md transition-colors text-spa-navy cursor-pointer flex items-center gap-1.5 text-xs font-mono-spa hover:text-spa-gold"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-green-600 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-spa-navy/80 max-w-md mx-auto text-left border-t border-stone-100 pt-4">
                <div>
                  <strong className="text-spa-navy/60 uppercase text-[10px] font-mono-spa block">To:</strong>
                  <span className="font-semibold text-sm">{activeVoucher.recipientName}</span>
                  {activeVoucher.recipientEmail && (
                    <span className="text-spa-navy/50 text-xs block">{activeVoucher.recipientEmail}</span>
                  )}
                </div>
                <div>
                  <strong className="text-spa-navy/60 uppercase text-[10px] font-mono-spa block">From:</strong>
                  <span className="font-medium text-sm">{activeVoucher.senderName}</span>
                </div>
                {activeVoucher.senderMessage && (
                  <div className="bg-white/80 p-3 rounded-lg border border-stone-100 italic font-serif-spa text-[#7d572b] mt-1.5 quote-comment">
                    "{activeVoucher.senderMessage}"
                  </div>
                )}
                <div className="text-[10px] text-spa-navy/40 font-mono-spa text-right pt-2 border-t border-dashed border-stone-200">
                  Issued: {activeVoucher.purchaseDate} • Non-refundable
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
                <button
                  onClick={() => {
                    setActiveVoucher(null);
                    setRecipientName("");
                    setRecipientEmail("");
                    setSenderMessage("");
                  }}
                  className="bg-spa-navy hover:bg-[#25393f] text-white py-2 px-5 rounded-lg text-xs font-medium cursor-pointer transition-all"
                >
                  Buy Another Voucher
                </button>
                <button
                  onClick={() => alert("PDF Download Simulated successfully! Save code: " + activeVoucher.code)}
                  className="bg-[#c5a47e] hover:bg-[#b08e67] text-white py-2 px-5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                >
                  Download Gift PDF
                </button>
              </div>
            </div>
          ) : (
            /* ================= VOUCHER CONFIGURE FORM ================= */
            <form onSubmit={handlePurchase} className="space-y-6">
              {/* Deliver type toggle */}
              <div className="flex gap-4 p-1 bg-stone-100 rounded-lg max-w-sm">
                <button
                  type="button"
                  onClick={() => setIsGift(true)}
                  className={`flex-1 py-1.5 text-center text-xs font-medium rounded-md transition-all cursor-pointer ${
                    isGift ? "bg-white text-spa-navy shadow-xs font-bold" : "text-spa-navy/60"
                  }`}
                >
                  Send as a Gift
                </button>
                <button
                  type="button"
                  onClick={() => setIsGift(false)}
                  className={`flex-1 py-1.5 text-center text-xs font-medium rounded-md transition-all cursor-pointer ${
                    !isGift ? "bg-white text-spa-navy shadow-xs font-bold" : "text-spa-navy/60"
                  }`}
                >
                  Buy for Myself
                </button>
              </div>

              {/* Denomination Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-spa-navy/70 mb-3 font-mono-spa">
                  Select Voucher Value (AED)
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[150, 300, 500].map((val) => {
                    const isSelected = amount === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          setAmount(val);
                          setCustomAmount("");
                        }}
                        className={`py-3 px-1 text-center rounded-xl border text-sm font-bold font-mono-spa cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#c5a47e] text-white border-[#c5a47e] shadow-xs"
                            : "bg-white border-[#eae3d5] text-spa-navy hover:bg-stone-50"
                        }`}
                      >
                        {val} AED
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setAmount(0)}
                    className={`py-3 px-1 text-center rounded-xl border text-[11px] font-bold uppercase transition-all cursor-pointer ${
                      amount === 0
                        ? "bg-[#c5a47e] text-white border-[#c5a47e] shadow-xs"
                        : "bg-white border-[#eae3d5] text-spa-navy hover:bg-stone-50"
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {amount === 0 && (
                  <div className="mt-3">
                    <input
                      type="number"
                      required
                      min={100}
                      max={5000}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount between 100 and 5000 AED"
                      className="block w-full px-3 py-2 border border-[#eae3d5] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-sm text-spa-navy"
                    />
                  </div>
                )}
              </div>

              {/* Recipient details */}
              <div className="space-y-4">
                {isGift && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-spa uppercase font-bold text-spa-navy/60">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Recipient's Name"
                        className="block w-full mt-1 px-3 py-2 border border-[#eae3d5] rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-spa-navy bg-[#fcfbfa]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-spa uppercase font-bold text-spa-navy/60">
                        Recipient Email
                      </label>
                      <input
                        type="email"
                        required
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="recipient@example.com"
                        className="block w-full mt-1 px-3 py-2 border border-[#eae3d5] rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-spa-navy bg-[#fcfbfa]/50"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono-spa uppercase font-bold text-spa-navy/60">
                    Sender Name / Purchaser Name
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name"
                    className="block w-full mt-1 px-3 py-2 border border-[#eae3d5] rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-spa-navy bg-[#fcfbfa]/50"
                  />
                </div>

                {isGift && (
                  <div>
                    <label className="block text-[11px] font-mono-spa uppercase font-bold text-spa-navy/60">
                      Personalized Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="Relax and enjoy your well-deserved luxury spa massage session. Happy Birthday!"
                      className="block w-full mt-1 p-3 border border-[#eae3d5] rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-spa-navy bg-[#fcfbfa]/50"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#1c2c31] hover:bg-[#2c3d42] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-spa-gold" />
                Purchase Gift Voucher Now
              </button>
            </form>
          )}
        </div>

        {/* Visual Preview panel */}
        <div className="lg:col-span-5 bg-stone-50 border border-[#eae3d5] rounded-2xl p-6 space-y-4">
          <h4 className="text-xs uppercase font-mono-spa tracking-wider font-bold text-spa-navy/70 border-b border-stone-200/60 pb-2">
            Spa Gift Certificate Preview
          </h4>

          <div className="w-full h-44 bg-[#1c2c31] text-white rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#c5a47e]/15 to-transparent rounded-full pointer-events-none"></div>
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono-spa text-spa-gold uppercase tracking-widest block">
                  Innovative
                </span>
                <span className="text-md font-serif-spa font-semibold leading-tight">
                  BEAUTY & WELLNESS
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/50 block uppercase font-mono-spa">Value</span>
                <span className="font-mono-spa font-bold text-[#c5a47e] text-lg">
                  AED {amount === 0 ? customAmount || "---" : amount}
                </span>
              </div>
            </div>

            <div>
              <div className="text-[9px] uppercase tracking-wider text-white/55 font-mono-spa">
                For: {isGift ? recipientName || "Dear Recipient" : senderName || "Self-Care Journey"}
              </div>
              {isGift && senderMessage && (
                <p className="text-[10px] italic text-white/70 line-clamp-1 mt-1 font-serif-spa">
                  "{senderMessage}"
                </p>
              )}
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-2 text-[8px] text-white/40 font-mono-spa">
              <span>REDEMPTIBLE AT: HOME SERVICE SPA</span>
              <span className="tracking-widest">INNOV-XXXX-SPA</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-spa-navy/70 pt-2">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>Redeemable across all premium treatments (Lava clamshell, Lymphatic, etc.)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>Easy online scheduling or mobile order with code input on payment page</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Vouchers are digital assets sent strictly to the mailbox immediately</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
