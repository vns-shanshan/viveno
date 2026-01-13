import { Link, useNavigate } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

import { navItems } from "@/config/navItems";
import { useAuthStore } from "@/stores/useAuthStore";
import { getVisibleNavItems } from "@/config/navUtils";

export const AppHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

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
    <header className="h-16 md:h-20 flex items-center justify-between border-b bg-primary px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Sprout className="text-white size-6 md:size-8" />
        <span className="text-white text-xl md:text-2xl font-semibold">
          Viveno
        </span>
      </div>

      {/* Top Navigation (Desktop Only) */}
      <nav className="hidden md:flex gap-6">
        {visibleItems.map((item) =>
          item.to ? (
            <Link
              key={item.label}
              to={item.to}
              className="text-white text-lg font-medium hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={item.onClick}
              className="text-white text-lg font-medium hover:underline"
            >
              {item.label}
            </button>
          )
        )}
      </nav>
    </header>
  );
};

export default AppHeader;
