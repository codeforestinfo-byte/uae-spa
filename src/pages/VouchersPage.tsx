import VoucherSystem from "../components/VoucherSystem";

export default function VouchersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="font-serif-spa text-4xl md:text-5xl font-extrabold text-spa-navy mb-3">Gift Vouchers</h1>
        <p className="text-stone-500 max-w-xl mx-auto">Give the gift of relaxation with our premium spa vouchers.</p>
      </div>
      <VoucherSystem />
    </div>
  );
}
