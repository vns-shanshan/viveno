import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import { useAuthStore } from "@/stores/useAuthStore";

export function RootLayout() {
  const { checkAuth, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="h-dvh flex flex-col bg-main">
      <AppHeader />

      <main className="flex flex-1 overflow-y-hidden">
        {checkingAuth ? <div>Loading...</div> : <Outlet />}
      </main>

      <BottomNav />
    </div>
  );
}
