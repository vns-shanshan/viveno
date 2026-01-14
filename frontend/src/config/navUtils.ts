import type { UserRole } from "@/types/user";
import type { NavItem } from "./navItems";

export function getVisibleNavItems(
  items: NavItem[],
  isAuthenticated: boolean,
  userRole?: UserRole,
  logout?: () => void
) {
  // Filter nav items based on authentication status and user role
  return items
    .filter((item) => {
      if (item.auth === "public") {
        return true;
      }
      if (item.auth === "guest") {
        return !isAuthenticated;
      }
      if (item.auth === "auth" && !isAuthenticated) {
        return false;
      }

      if (item.role && userRole) {
        return item.role.includes(userRole);
      }
      if (item.role && !userRole) {
        return false;
      }

      return true;
    })
    .map((item) =>
      item.label === "Logout" ? { ...item, onClick: logout } : item
    );
}
