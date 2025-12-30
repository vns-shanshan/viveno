import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

import { navItems } from "@/components/layout/navItems";

export const AppHeader = () => {
  return (
    <header className="h-16 md:h-20 flex items-center justify-between border-b bg-primary px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Sprout className="text-white size-6 md:size-8" />
        <span className="text-white text-xl md:text-2xl font-semibold">
          Viveno
        </span>
      </div>

      <nav className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="text-white text-lg font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default AppHeader;
