import type { LucideIcon } from "lucide-react";
import { House, LogIn, LogOut, UserRoundPlus } from "lucide-react";

export type NavItem = {
  label: string;
  to?: string;
  icon: LucideIcon;
  auth: "public" | "guest" | "auth";
  onClick?: () => void;
};

export const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: House, auth: "auth" },
  { label: "Login", to: "/login", icon: LogIn, auth: "guest" },
  { label: "Sign Up", to: "/signup", icon: UserRoundPlus, auth: "guest" },
  { label: "Logout", icon: LogOut, auth: "auth", onClick: () => {} },
];
