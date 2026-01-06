import LoginPage from "@/pages/LoginPage";
import { useAuthStore } from "@/stores/useAuthStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;

    if (user) {
      throw redirect({ to: "/" });
    }
  },

  component: LoginPage,
});
