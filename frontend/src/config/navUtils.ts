import type { NavItem } from "./navItems";

export function getVisibleNavItems(
  items: NavItem[],
  isAuthenticated: boolean,
  logout: () => void
) {
  // Filter nav items based on authentication status
  return items
    .filter((item) => {
      if (item.auth === "public") {
        return true;
      }
      if (item.auth === "guest") {
        return !isAuthenticated;
      }
      if (item.auth === "auth") {
        return isAuthenticated;
      }

      return false;
    })
    .map((item) =>
      item.label === "Logout" ? { ...item, onClick: logout } : item
    );
}
