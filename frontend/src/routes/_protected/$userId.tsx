import { createFileRoute } from "@tanstack/react-router";

import UserAccountPage from "../../pages/UserAccountPage";

export const Route = createFileRoute("/_protected/$userId")({
  component: UserAccountPage,
});
