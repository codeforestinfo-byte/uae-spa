import { useEffect, useRef, useState } from "react";
import { createPaymentDataRequest, GOOGLE_PAY_ENVIRONMENT, GOOGLE_PAY_MERCHANT_ID } from "../lib/googlePay";

interface GooglePayButtonProps {
  price: number;
  onPaymentSuccess: (paymentData: google.payments.api.PaymentData) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
}

export default function GooglePayButton({
  price,
  onPaymentSuccess,
  onPaymentError,
  disabled = false,
}: GooglePayButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const paymentsClientRef = useRef<google.payments.api.PaymentsClient | null>(null);

  useEffect(() => {
    if (!GOOGLE_PAY_MERCHANT_ID) {
      setIsLoading(false);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://pay.google.com/gp/p/js/pay.js";
    script.async = true;
    script.onload = () => {
      const client = new google.payments.api.PaymentsClient({
        environment: GOOGLE_PAY_ENVIRONMENT as "TEST" | "PRODUCTION",
      });
      paymentsClientRef.current = client;

      client
        .isReadyToPay({
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["VISA", "MASTERCARD", "AMEX"],
              },
            },
          ],
        })
        .then((response) => {
          if (response.result) {
            setIsReady(true);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    };
    script.onerror = () => {
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[src="https://pay.google.com/gp/p/js/pay.js"]');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

  const handleGooglePayClick = async () => {
    if (!paymentsClientRef.current || isPaying) return;
    setIsPaying(true);

    try {
      const paymentData = await paymentsClientRef.current.loadPaymentData(
        createPaymentDataRequest(price)
      );
      onPaymentSuccess(paymentData);
    } catch (err: any) {
      if (err.statusCode !== "CANCELED") {
        onPaymentError(err.statusMessage || "Google Pay payment failed");
      }
    } finally {
      setIsPaying(false);
    }
  };

  useEffect(() => {
    if (!buttonRef.current || !paymentsClientRef.current || !isReady) return;
    try {
      paymentsClientRef.current.isReadyToPay({
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{ type: "CARD", parameters: { allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"], allowedCardNetworks: ["VISA", "MASTERCARD", "AMEX"] } }],
      });
    } catch {
      // silently ignore
    }
  }, [isReady, price]);

  if (isLoading) {
    return (
      <div className="p-5 rounded-2xl border border-[#eae3d5] bg-white text-center">
        <div className="animate-pulse flex items-center justify-center gap-2">
          <div className="w-5 h-5 bg-stone-200 rounded-full"></div>
          <span className="text-xs text-stone-400 font-medium">Loading Google Pay...</span>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        ref={buttonRef}
        onClick={disabled ? undefined : handleGooglePayClick}
        className={`w-full ${disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
      >
        <div className="google-pay-button-wrapper">
          <button
            type="button"
            onClick={handleGooglePayClick}
            disabled={disabled || isPaying}
            className="w-full h-12 flex items-center justify-center rounded-xl border border-[#eae3d5] bg-white hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPaying ? (
              <span className="text-xs font-medium text-stone-500">Processing...</span>
            ) : (
              <svg viewBox="0 0 109 24" className="h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.3 10.3h-5.6v3.1h4.8c-.4 1.7-1.9 3-3.9 3-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c1.1 0 2 .4 2.8 1l2.3-2.3c-1.3-1.2-3.1-2-5.1-2C22 4.5 18 8.5 18 13.4s4 8.9 8.9 8.9c4.8 0 8.3-3.4 8.3-8.3 0-.6-.1-1.2-.2-1.8l.1.1z" fill="#5F6368"/>
                <path d="M42.5 19.5c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3zm0-11.5c-4 0-7.1 3.1-7.1 7.1s3.1 7.1 7.1 7.1 7.1-3.1 7.1-7.1-3.1-7.1-7.1-7.1z" fill="#5F6368"/>
                <path d="M61.7 9.7v7.9h-2.8v-1.1c-.9 1-2.2 1.5-3.6 1.5-3.1 0-5.7-2.5-5.7-5.6s2.5-5.6 5.7-5.6c1.4 0 2.7.5 3.6 1.5V9.7h2.8zm-5.3 5.6c1.6 0 2.9-1.2 2.9-2.8s-1.3-2.8-2.9-2.8-2.9 1.2-2.9 2.8 1.3 2.8 2.9 2.8z" fill="#5F6368"/>
                <path d="M71.2 19.5c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3zm0-11.5c-4 0-7.1 3.1-7.1 7.1s3.1 7.1 7.1 7.1 7.1-3.1 7.1-7.1-3.1-7.1-7.1-7.1z" fill="#5F6368"/>
                <path d="M82.6 10.3v7.3h-2.8V10.3h-1.4V8h1.4V6.2c0-1.5.8-2.5 2.6-2.5h1.6v2.2h-1c-.7 0-1 .3-1 1V8h2.1l-.3 2.3h-1.2z" fill="#5F6368"/>
                <path d="M93.5 19.5c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3zm0-11.5c-4 0-7.1 3.1-7.1 7.1s3.1 7.1 7.1 7.1 7.1-3.1 7.1-7.1-3.1-7.1-7.1-7.1z" fill="#5F6368"/>
                <path d="M104.5 9.7v7.9h-2.8v-1.1c-.9 1-2.2 1.5-3.6 1.5-3.1 0-5.7-2.5-5.7-5.6s2.5-5.6 5.7-5.6c1.4 0 2.7.5 3.6 1.5V9.7h2.8zm-5.3 5.6c1.6 0 2.9-1.2 2.9-2.8s-1.3-2.8-2.9-2.8-2.9 1.2-2.9 2.8 1.3 2.8 2.9 2.8z" fill="#5F6368"/>
                <path d="M9.3 11.5v-3h5.5c.3 0 .6 0 .9.1l.1-.1V7.1h-6.5V4.1h6.9l.1-.1V2.2c0-.1 0-.2-.1-.2H5.3c-.1 0-.2 0-.2.2v14.1h.1l.1.1h7.8l.1-.1V9.8l-3.9-.1v1.8h2.4v3.8H6.9v-3.8l2.4-.1z" fill="#4285F4"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
