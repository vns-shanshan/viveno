import { createFileRoute, redirect } from "@tanstack/react-router";

import { useAuthStore } from "@/stores/useAuthStore";
import HomePage from "../pages/HomePage";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;

    if (!user) {
      throw redirect({ to: "/login" });
    }
  },

  component: HomePage,
});
