import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: "2025-04-10" as any }) : null;

app.use(cors());
app.use(express.json());

app.post("/api/create-payment-intent", async (req, res) => {
  const { amount, currency, paymentMethodId } = req.body;

  if (!amount || !paymentMethodId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe not configured. Set STRIPE_SECRET_KEY" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: (currency || "AED").toLowerCase(),
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
      return_url: process.env.APP_URL || "http://localhost:3000",
    });

    return res.json({
      success: paymentIntent.status === "succeeded",
      transactionId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
    });
  } catch (err: any) {
    console.error("Stripe payment error:", err);
    return res.status(500).json({ error: err.message || "Payment processing failed" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!stripe) {
    console.warn("WARNING: STRIPE_SECRET_KEY not set. Payments will fail.");
  }
});
