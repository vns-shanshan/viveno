import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

import { navItems } from "@/components/layout/navItems";

export const AppHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between border-b bg-primary px-6">
      <div className="flex items-center gap-4">
        <Sprout />
        <span>Viveno</span>
      </div>

      <nav className="hidden md:flex gap-6">
        {navItems.map((item) => (
          <Link key={item.label} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default AppHeader;
