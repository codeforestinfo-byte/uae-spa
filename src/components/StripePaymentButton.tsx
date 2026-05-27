import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { API_BASE_URL, STRIPE_PUBLISHABLE_KEY } from "../lib/stripe";
import { Loader, CreditCard } from "lucide-react";

interface StripePaymentButtonProps {
  price: number;
  label: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export default function StripePaymentButton({
  price,
  label,
  onSuccess,
  onError,
  disabled = false,
}: StripePaymentButtonProps) {
  let stripe: any, elements: any;
  try {
    stripe = useStripe();
    elements = useElements();
  } catch {
    stripe = null;
    elements = null;
  }
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(!STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    if (!stripe || !elements || !price) {
      setIsLoading(false);
      return;
    }

    const pr = stripe.paymentRequest({
      country: "AE",
      currency: "aed",
      total: {
        label,
        amount: Math.round(price * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setCanMakePayment(true);
      }
      setIsLoading(false);
    });

    pr.on("paymentmethod", async (event: any) => {
      setIsProcessing(true);
      try {
        const res = await fetch(`${API_BASE_URL || ""}/api/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(price * 100),
            currency: "aed",
            paymentMethodId: event.paymentMethod.id,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          event.complete("fail");
          onError(data.error || "Payment failed");
          return;
        }

        const confirmResult = await stripe.confirmCardPayment(
          data.clientSecret,
          { payment_method: event.paymentMethod.id }
        );

        if (confirmResult.error) {
          event.complete("fail");
          onError(confirmResult.error.message || "Card payment failed");
        } else {
          event.complete("success");
          onSuccess(data.transactionId || confirmResult.paymentIntent?.id || "");
        }
      } catch (err: any) {
        event.complete("fail");
        onError(err.message || "Payment processing error");
      } finally {
        setIsProcessing(false);
      }
    });

    setPaymentRequest(pr);
  }, [stripe, elements, price, label]);

  if (isLoading) {
    return (
      <div className="w-full h-12 flex items-center justify-center rounded-xl border border-[#eae3d5] bg-white">
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-4 h-4 bg-stone-200 rounded-full" />
          <span className="text-xs text-stone-400">Loading payment options...</span>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border border-[#eae3d5] bg-white text-xs text-stone-500">
        <Loader className="w-4 h-4 animate-spin" />
        Processing payment...
      </div>
    );
  }

  if (!canMakePayment || !paymentRequest) {
    return null;
  }

  if (disabled) {
    return (
      <div className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-400 opacity-60">
        <CreditCard className="w-4 h-4" />
        Complete your details first
      </div>
    );
  }

  return (
    <div className="w-full stripe-payment-wrapper">
      <PaymentRequestButtonElement
        options={{ paymentRequest }}
        className="w-full"
        onReady={() => {}}
      />
    </div>
  );
}
