import { Link, useNavigate } from "@tanstack/react-router";

import { navItems } from "@/config/navItems";
import { useAuthStore } from "@/stores/useAuthStore";
import { getVisibleNavItems } from "@/config/navUtils";

export const BottomNav = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // console.log("auth:", Boolean(user));

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/login", replace: true });
  };

  const visibleItems = getVisibleNavItems(
    navItems,
    Boolean(user),
    handleLogout
  );

  return (
    <nav className="h-16 border-t flex items-center justify-around bg-white shadow-nav-bottom md:hidden">
      {visibleItems.map((item) => {
        const Icon = item.icon;

        return item.to ? (
          <Link key={item.label} to={item.to}>
            <Icon className="text-primary size-7" />
          </Link>
        ) : (
          <button key={item.label} onClick={item.onClick}>
            <Icon className="text-primary size-7" />
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
