import type { Request, Response } from "express";
import prisma from "../prisma.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type OrderParams = {
  id: string;
};

export const createOrder = async (req: Request, res: Response) => {
  const { id: userId } = req.user!;

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
    },
  });

  res.status(201).json({
    message: "Order created successfully",
    order,
    clientSecret: paymentIntent.client_secret,
  });
};

export const getMyOrders = async (req: Request, res: Response) => {
  const { id: userId } = req.user!;

  const orders = await prisma.order.findMany({
    where: { userId: userId },
    include: { event: true },
    orderBy: [{ paymentCompletedAt: "desc" }, { createdAt: "desc" }],
  });

  res.json({ orders });
};

export const getOrder = async (req: Request<OrderParams>, res: Response) => {
  const { id: userId } = req.user!;
  const { id: orderId } = req.params;

  // Validate orderId before hitting the DB
  if (!orderId || typeof orderId !== "string") {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { event: true },
  });

  if (!order || order.userId !== userId) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json({ order });
};
