import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

export function ProtectedLayout() {
  const navigate = useNavigate();
  const { user, checkingAuth } = useAuthStore();

  useEffect(() => {
    if (!checkingAuth && !user) {
      // Redirect to login or handle unauthorized access
      navigate({ to: "/login" });
    }
  }, [user, checkingAuth, navigate]);

  if (checkingAuth || !user) return null;

  return <Outlet />;
}
