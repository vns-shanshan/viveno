import type { Request, Response } from "express";
import prisma from "../prisma.js";
import { handleControllerError } from "../utils/errorHandler.js";

type EventParams = {
  id: string;
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.json({ events });
  } catch (error: any) {
    handleControllerError(error, res, "getAllEvents");
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
    handleControllerError(error, res, "getEvent");
  }
};
