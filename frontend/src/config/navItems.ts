import type { LucideIcon } from "lucide-react";
import {
  House,
  LogIn,
  LogOut,
  UserRoundPlus,
  Book,
  UserStar,
  CircleUser,
} from "lucide-react";

import type { UserRole } from "@/types/user";

export type NavItem = {
  label: string;
  to?: string;
  icon: LucideIcon;
  auth: "public" | "guest" | "auth";
  onClick?: () => void;
  role?: UserRole[];
};

export const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: House, auth: "auth" },
  { label: "Login", to: "/login", icon: LogIn, auth: "guest" },
  { label: "Sign Up", to: "/signup", icon: UserRoundPlus, auth: "guest" },
  { label: "Logout", icon: LogOut, auth: "auth", onClick: () => {} },
  { label: "About", to: "/about", icon: Book, auth: "public" },
  {
    label: "Admin",
    to: "/admin",
    icon: UserStar,
    auth: "auth",
    role: ["ADMIN"],
  },
  {
    label: "My Account",
    to: "/$userId",
    icon: CircleUser,
    auth: "auth",
    role: ["USER"],
  },
];
