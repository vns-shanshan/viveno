import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="h-dvh flex flex-col">
      <header className="h-16 flex items-center  border-b">
        <span>Viveno</span>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>

      <nav className="h-16 border-t flex items-center justify-around">
        <span>Home</span>
        <span>Login</span>
        <span>Sign Up</span>
      </nav>
    </div>
  ),
});
