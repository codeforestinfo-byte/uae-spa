export const GOOGLE_PAY_ENVIRONMENT = (import.meta.env.VITE_GOOGLE_PAY_ENV as string) || "TEST";
export const GOOGLE_PAY_MERCHANT_ID = (import.meta.env.VITE_GOOGLE_PAY_MERCHANT_ID as string) || "";
export const GOOGLE_PAY_MERCHANT_NAME = (import.meta.env.VITE_GOOGLE_PAY_MERCHANT_NAME as string) || "Innovative Beauty & Wellness";

export const PAYMENT_GATEWAY = (import.meta.env.VITE_PAYMENT_GATEWAY as string) || "example";
export const PAYMENT_GATEWAY_MERCHANT_ID = (import.meta.env.VITE_PAYMENT_GATEWAY_MERCHANT_ID as string) || "";
export const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "";

export const allowedCardNetworks: google.payments.api.CardNetwork[] = [
  "VISA", "MASTERCARD", "AMEX"
];

export const allowedCardAuthMethods: google.payments.api.CardAuthMethod[] = [
  "PAN_ONLY", "CRYPTOGRAM_3DS"
];

export const baseRequest: google.payments.api.PaymentDataRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: "CARD",
      parameters: {
        allowedAuthMethods: allowedCardAuthMethods,
        allowedCardNetworks: allowedCardNetworks,
        billingAddressRequired: false,
      },
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: PAYMENT_GATEWAY,
          gatewayMerchantId: PAYMENT_GATEWAY_MERCHANT_ID,
        },
      },
    },
  ],
  merchantInfo: {
    merchantId: GOOGLE_PAY_MERCHANT_ID,
    merchantName: GOOGLE_PAY_MERCHANT_NAME,
  },
  transactionInfo: {
    totalPriceStatus: "FINAL",
    totalPrice: "0",
    currencyCode: "AED",
    countryCode: "AE",
  },
};

export function createPaymentDataRequest(price: number): google.payments.api.PaymentDataRequest {
  return {
    ...baseRequest,
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPrice: price.toFixed(2),
      currencyCode: "AED",
      countryCode: "AE",
    },
  };
}
