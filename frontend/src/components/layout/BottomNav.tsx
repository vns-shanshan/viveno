import { Link } from "@tanstack/react-router";

import { navItems } from "@/components/layout/navItems";

export const BottomNav = () => {
  return (
    <nav className="h-16 border-t flex items-center justify-around bg-white shadow-nav-bottom md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link key={item.label} to={item.to}>
            <Icon className="text-primary size-7" />
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
