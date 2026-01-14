import { ProtectedLayout } from "@/layouts/ProtectedLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: ProtectedLayout,
});
