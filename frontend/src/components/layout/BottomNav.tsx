import { Link, useNavigate } from "@tanstack/react-router";
import { UserStar, CircleUser } from "lucide-react";

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
    user?.userType,
    handleLogout
  );

  // console.log("visibleItems:", visibleItems);

  return (
    <nav className="h-16 border-t flex items-center justify-around bg-white shadow-nav-bottom md:hidden">
      {visibleItems.map((item) => {
        const isUserRoute = item.to === "/$userId";
        const label = isUserRoute && user ? user.name : item.label;
        const Icon =
          isUserRoute && user
            ? user.userType === "ADMIN"
              ? UserStar
              : CircleUser
            : item.icon;

        if (isUserRoute && user) {
          return (
            <Link key={label} to="/$userId" params={{ userId: user.id }}>
              <Icon className="text-primary size-7" />
            </Link>
          );
        }

        return item.to ? (
          <Link key={label} to={item.to}>
            <Icon className="text-primary size-7" />
          </Link>
        ) : (
          <button key={label} onClick={item.onClick}>
            <Icon className="text-primary size-7" />
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
