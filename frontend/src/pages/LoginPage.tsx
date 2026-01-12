import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../validator/auth.schema";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Mail, Lock, LogIn } from "lucide-react";

import { useAuthStore } from "@/stores/useAuthStore";
import RHFInput from "@/components/ui/RHFInput";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (formData: LoginSchema) => {
    await login(formData);
    navigate({ to: "/" });
  };

  return (
    <div className="grid grid-cols-1 flex-1 w-full md:grid-cols-2">
      <div className="hidden md:flex flex-col items-center justify-center h-full bg-neutral">
        <h1 className="text-6xl font-extrabold text-primary text-center">
          Welcome Back
        </h1>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm px-4">
          {/* Title */}
          <h1 className="mb-10 text-center text-2xl font-semibold text-primary">
            Login
          </h1>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              noValidate
              className="flex flex-col gap-6"
            >
              <RHFInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="you@example.com"
                type="email"
                Icon={Mail}
              />

              <RHFInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="••••••••"
                type="password"
                Icon={Lock}
              />

              <Button
                type="submit"
                disabled={loading}
                className="bg-primary h-10 text-md"
              >
                <LogIn className="size-5 mr-1" />
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-10 text-center text-sm text-gray-300">
            Not a member?{" "}
            <Link to="/signup" className="ml-1 font-medium text-primary">
              Sign up now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
