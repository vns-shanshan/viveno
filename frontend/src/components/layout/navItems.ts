// TODO: Replace with actual navigation items, and add conditional rendering based on user authentication status

import type { LucideIcon } from "lucide-react";
import { House, LogIn, UserRoundPlus } from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: House },
  { label: "Login", to: "/login", icon: LogIn },
  { label: "Sign Up", to: "/signup", icon: UserRoundPlus },
];
