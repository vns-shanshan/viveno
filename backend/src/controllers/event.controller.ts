import type { Request, Response } from "express";
import prisma from "../prisma.js";

type EventParams = {
  id: string;
};

type CreateEventBody = {
  title?: string;
  description?: string;
  imageUrl?: string;
  startTime?: string;
  price?: number;
  locationName?: string;
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.json({ events });
  } catch (error: any) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.log("Error in getAllEvents controller:", message);
    res.status(500).json({ message });
  }
};

export const getEvent = async (req: Request<EventParams>, res: Response) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ event });
  } catch (error: any) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.log("Error in getEvent controller:", message);
    res.status(500).json({ message });
  }
};

export const createEvent = async (
  req: Request<{}, unknown, CreateEventBody>,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, startTime, price, locationName } = req.body;
    if (!title || !description || !startTime || !price || !locationName) {
      return res.status(400).json({ message: "All fields are required" });
    }

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
          connect: { id: req.user.id },
        },
      },
    });

    res.status(201).json({ event });
  } catch (error: any) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.log("Error in createEvent controller:", message);
    res.status(500).json({ message });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
