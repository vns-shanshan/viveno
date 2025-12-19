import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: () => <div className="p-6 text-xl font-semibold">Sign Up</div>,
});
