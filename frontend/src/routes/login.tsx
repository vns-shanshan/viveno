import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: () => <div className="p-6 text-xl font-semibold">Login</div>,
});
