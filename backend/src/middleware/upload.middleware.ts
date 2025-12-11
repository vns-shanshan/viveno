import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary.js";

const maxSize = Number(process.env.MAX_IMAGE_SIZE_MB || 5) * 1024 * 1024; // Default to 5MB

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: process.env.CLOUDINARY_EVENT_FOLDER || "viveno-events",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

export const upload = multer({ storage, limits: { fileSize: maxSize } });
