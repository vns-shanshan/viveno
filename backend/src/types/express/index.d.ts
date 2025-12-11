import type { UserType } from "@prisma/client";

type AuthUser = {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      file?: Express.Multer.File;
    }
  }
}

export {};
