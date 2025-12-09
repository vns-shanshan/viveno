import type { Request, Response } from "express";
import prisma from "../prisma.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id: userId } = req.user;

    const { eventId, quantity } = req.body;

    // Validate input
    if (!eventId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid event ID or quantity" });
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (new Date(event.startTime) < new Date()) {
      return res
        .status(400)
        .json({ message: "Cannot purchase tickets for past events" });
    }

    // Check duplicate order
    const existingOrder = await prisma.order.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existingOrder) {
      return res
        .status(409)
        .json({ message: "You have already purchased tickets for this event" });
    }

    // Calculate price
    const totalPrice = Number(event.price) * quantity;

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), // amount in cents
      currency: "usd",
      metadata: {
        userId,
        eventId,
        project: "viveno",
      },
    });

    // Create order in the database with status 'pending'
    const order = await prisma.order.create({
      data: {
        userId,
        eventId,
        quantity,
        status: "PENDING",
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.log("Error in createOrder controller:", message);
    res.status(500).json({ message });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id: userId } = req.user;

    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: { event: true },
      orderBy: { paymentCompletedAt: "desc" },
    });

    res.json({ orders });
  } catch (error: any) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.log("Error in getMyOrders controller:", message);
    res.status(500).json({ message });
  }
};

export const getOrder = async (req: Request, res: Response) => {};
