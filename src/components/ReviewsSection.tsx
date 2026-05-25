import React, { useState } from "react";
import { Review } from "../types";
import { Star, CheckCircle, Quote, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import { SERVICES } from "../data";

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function ReviewsSection({ reviews, onAddReview }: ReviewsSectionProps) {
  const [filterRating, setFilterRating] = useState<number | "all">("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Form State
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [treatment, setTreatment] = useState(SERVICES[0].name);
  const [comment, setComment] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Stats calculation
  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / (totalReviews || 1)).toFixed(1);

  // Percentage breakdown
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const val = r.rating as 5 | 4 | 3 | 2 | 1;
    if (ratingCounts[val] !== undefined) {
      ratingCounts[val]++;
    }
  });

  const getPercentage = (count: number) => {
    return Math.round((count / (totalReviews || 1)) * 100);
  };

  // Filters application
  const filteredReviews = reviews.filter((r) => {
    const matchesRating = filterRating === "all" || r.rating === filterRating;
    const matchesVerified = !verifiedOnly || r.verified;
    return matchesRating && matchesVerified;
  });

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newReview: Review = {
      id: "rev-" + Math.floor(1000 + Math.random() * 9000),
      author,
      rating,
      date: new Date().toISOString().split("T")[0],
      comment,
      treatment,
      verified: true, // Auto-verified for active simulator sessions
    };

    onAddReview(newReview);
    setAuthor("");
    setComment("");
    setRating(5);
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 4000);
  };

  return (
    <div className="bg-white border border-[#eae3d5] rounded-2xl p-6 md:p-8 shadow-xs" id="reviews-section-container">
      {/* Header */}
      <div className="border-b border-stone-100 pb-5 mb-6">
        <span className="text-xs uppercase tracking-wider text-spa-gold font-mono-spa font-bold">
          Trusted Feedback
        </span>
        <h2 className="text-2xl font-serif-spa font-medium text-spa-navy mt-1">
          Client Reviews & Ratings
        </h2>
        <p className="text-sm text-spa-navy/60 mt-1">
          Read verified experiences from our luxury home spa massage clients across the Abu Dhabi Emirate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Composite Stats Block */}
        <div className="lg:col-span-4 bg-[#fbf9f6] border border-[#eae3d5] rounded-2xl p-6 text-center">
          <span className="text-xs font-mono-spa uppercase font-semibold text-spa-navy/55 tracking-widest block">
            AVERAGE RATING
          </span>
          <p className="text-5xl font-serif-spa font-extrabold text-[#1c2c31] mt-2 font-mono-spa leading-none tracking-tight">
            {avgRating} <span className="text-lg text-spa-navy/35">/ 5</span>
          </p>

          {/* Golden Stars row */}
          <div className="flex justify-center text-amber-400 gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-5 h-5 ${
                  idx < Math.round(Number(avgRating)) ? "fill-current" : ""
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-spa-navy/60 mt-2 font-medium">
            Based on {totalReviews} verified spa experiences
          </p>

          {/* Progress Bars Grid */}
          <div className="space-y-2.5 mt-6 border-t border-stone-200/60 pt-5">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars as 5 | 4 | 3 | 2 | 1] || 0;
              const percent = getPercentage(count);
              return (
                <div key={stars} className="flex items-center gap-3 text-xs text-spa-navy/80">
                  <span className="w-3 font-semibold font-mono-spa shrink-0">{stars}★</span>
                  <div className="flex-1 bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-spa-gold h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-10 font-mono-spa text-right text-spa-navy/50">{percent}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Create Review Form */}
        <div className="lg:col-span-8 bg-[#fdfdfc] border border-spa-gold/30 rounded-2xl p-6 relative">
          <div className="absolute top-4 right-4 text-[#c5a47e] shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>

          <h3 className="font-serif-spa text-base font-bold text-spa-navy mb-1.5">
            Share Your Experience
          </h3>
          <p className="text-xs text-spa-navy/65 mb-4">
            Did you enjoy your home massage session? Leave your feedback to help future Abu Dhabi clients.
          </p>

          {formSuccess && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Thank you! Your verified review has been posted and added to the ledger in real-time.</span>
            </div>
          )}

          <form onSubmit={handlePostReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono-spa uppercase font-semibold text-spa-navy/70">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Amna Salem"
                  className="block w-full mt-1 px-3 py-2 border border-[#eae3d5] rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-spa-navy bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-spa uppercase font-semibold text-spa-navy/70">
                  Select Star Rating
                </label>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {[1, 2, 3, 4, 5].map((starIdx) => (
                    <button
                      key={starIdx}
                      type="button"
                      onClick={() => setRating(starIdx)}
                      className="cursor-pointer transition-transform duration-200 hover:scale-115 text-amber-400 group"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          starIdx <= rating ? "fill-current" : "text-stone-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-spa-navy/75 ml-2 font-mono-spa">
                    {rating} Star{rating > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono-spa uppercase font-semibold text-spa-navy/70">
                Purchased Treatment Service
              </label>
              <select
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="block w-full mt-1 px-3 py-2 border border-[#eae3d5] rounded-xl text-sm cursor-pointer text-spa-navy bg-white focus:outline-hidden"
              >
                {SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.name}>
                    {srv.name} (AED {srv.price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono-spa uppercase font-semibold text-spa-navy/70">
                Your Review Comment
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe the massage therapist skill, comfort level, promptness, or treatment environment at your home."
                className="block w-full mt-1 p-3 border border-[#eae3d5] rounded-xl text-sm focus:outline-hidden focus:ring-1 focus:ring-spa-gold text-spa-navy bg-white"
              />
            </div>

            <button
              type="submit"
              className="bg-spa-navy hover:bg-[#2c3d42] text-white py-2 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Post Live Review
            </button>
          </form>
        </div>
      </div>

      {/* Review Filters Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 border border-[#eae3d5] p-4 rounded-xl mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono-spa uppercase font-bold text-spa-navy/60 mr-2">
            Filter Reviews:
          </span>
          <button
            onClick={() => setFilterRating("all")}
            className={`px-3 py-1 text-xs rounded-full font-medium border cursor-pointer transition-all ${
              filterRating === "all"
                ? "bg-spa-navy text-white border-spa-navy"
                : "bg-white border-[#eae3d5] text-spa-navy hover:bg-stone-100"
            }`}
          >
            All Ratings
          </button>
          {[5, 4, 3].map((num) => (
            <button
              key={num}
              onClick={() => setFilterRating(num)}
              className={`px-3 py-1 text-xs rounded-full font-medium border cursor-pointer transition-all ${
                filterRating === num
                  ? "bg-spa-navy text-white border-spa-navy"
                  : "bg-white border-[#eae3d5] text-spa-navy hover:bg-stone-100"
              }`}
            >
              {num}★ Only
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-spa-navy/85">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="rounded-sm border-stone-300 accent-[#c5a47e]"
          />
          <CheckCircle className="w-3.5 h-3.5 text-green-600 inline shrink-0" />
          <span>Show Verified Home Bookings Only</span>
        </label>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-10 bg-stone-50/50 rounded-xl border border-dashed border-[#eae3d5] text-spa-navy/55 text-sm">
          <AlertCircle className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <span>No matching reviews found for selected filters.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#eae3d5]/80 hover:border-spa-gold/60 p-5 rounded-xl flex flex-col justify-between transition-all hover:shadow-2xs"
            >
              <div className="space-y-2.5">
                {/* Header author & stars */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="font-semibold text-sm text-[#1c2c31] leading-snug">
                      {rev.author}
                    </h4>
                    <span className="text-[10px] text-spa-navy/40 font-mono-spa">
                      Posted: {rev.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-spa-navy/80 font-mono-spa">{rev.rating}</span>
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-3.5 h-3.5 ${
                            starIdx < rev.rating ? "fill-current" : "text-stone-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment quote text */}
                <div className="flex gap-1.5 items-start">
                  <Quote className="w-4 h-4 text-spa-gold/60 shrink-0 mt-0.5" />
                  <p className="text-xs text-spa-navy/80 italic font-serif-spa leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              {/* Verified treatment tag */}
              <div className="border-t border-stone-100 mt-4 pt-3 flex items-center justify-between text-[10px] text-spa-navy/50 font-medium">
                <span className="truncate max-w-[70%]" title={`Treatment: ${rev.treatment}`}>
                  Treatment: <strong className="text-[#c5a47e] font-serif-spa">{rev.treatment}</strong>
                </span>

                {rev.verified && (
                  <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-0.5 font-bold uppercase shrink-0">
                    <CheckCircle className="w-2.5 h-2.5 fill-current" />
                    Verified Client
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
