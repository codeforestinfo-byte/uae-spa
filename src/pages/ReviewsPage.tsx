import { useApp } from "../context/AppContext";
import ReviewsSection from "../components/ReviewsSection";

export default function ReviewsPage() {
  const { reviews, handleAddReview } = useApp();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="font-serif-spa text-4xl md:text-5xl font-extrabold text-spa-navy mb-3">Client Reviews</h1>
        <p className="text-stone-500 max-w-xl mx-auto">Hear from our valued clients about their premium home-spa experience.</p>
      </div>
      <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />
    </div>
  );
}
