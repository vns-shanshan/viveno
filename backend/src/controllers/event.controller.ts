import type { Request, Response } from "express";
import prisma from "../prisma.js";
import type { CreateEventSchema } from "../validators/event.schema.js";

type EventParams = {
  id: string;
};

export const getAllEvents = async (req: Request, res: Response) => {
  const now = new Date();

  const events = await prisma.event.findMany({
    where: {
      startTime: {
        gt: now,
      }, // Only future events
    },
  });

  res.json({ events });
};

export const getEvent = async (req: Request<EventParams>, res: Response) => {
  const { id } = req.params;

  const event = await prisma.event.findUnique({
    where: { id },
  });
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json({ event });
};

export const createEvent = async (
  req: Request<{}, unknown, CreateEventSchema>,
  res: Response
) => {
  const { title, description, startTime, price, locationName } = req.body;

  const imageUrl = req.file?.path; // Cloudinary URL
  if (!imageUrl) {
    return res.status(400).json({ message: "Image is required" });
  }

  const event = await prisma.event.create({
    data: {
      title,
      description,
      imageUrl,
      startTime,
      price,
      locationName,
      admin: {
        connect: { id: req.user!.id },
      },
    },
  });

  res.status(201).json({ event });
};

export const updateEvent = async (req: Request<EventParams>, res: Response) => {
  const { id } = req.params;

  const foundEvent = await prisma.event.findUnique({
    where: { id },
  });

  if (!foundEvent) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (req.file?.path) {
    req.body.imageUrl = req.file.path;
  }

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: req.body,
  });

  res.json({ event: updatedEvent });
};

export const deleteEvent = async (req: Request<EventParams>, res: Response) => {
  const { id } = req.params;

  const foundEvent = await prisma.event.findUnique({
    where: { id },
  });

  if (!foundEvent) {
    return res.status(404).json({ message: "Event not found" });
  }

  await prisma.event.delete({
    where: { id },
  });

  res.json({ message: "Event deleted successfully" });
};
