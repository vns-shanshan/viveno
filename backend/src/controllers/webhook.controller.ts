import type { Request, Response } from "express";
import Stripe from "stripe";
import prisma from "../prisma.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const stripeWebhook = async (req: Request, res: Response) => {
  // Verify req is from Stripe
  let event;

  try {
    const signature = req.headers["stripe-signature"] as string;

    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      await prisma.order.update({
        where: { paymentIntentId: paymentIntent.id },
        data: { status: "PAID", paymentCompletedAt: new Date() },
      });

      break;
    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;

      await prisma.order.update({
        where: { paymentIntentId: failedPaymentIntent.id },
        data: { status: "FAILED" },
      });

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
