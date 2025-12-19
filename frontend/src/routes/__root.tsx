import { Outlet, createRootRoute } from "@tanstack/react-router";

import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";

export const Route = createRootRoute({
  component: () => (
    <div className="h-dvh flex flex-col bg-main">
      <AppHeader />

      <main className="flex-1 overflow-y-auto p-4 ">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  ),
});
