import { useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema, type SignupSchema } from "@/validator/auth.schema";
import { useAuthStore } from "@/stores/useAuthStore";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Mail, User, Lock, UserPlus } from "lucide-react";

import AuthInput from "@/components/ui/AuthInput";

function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (formData: SignupSchema) => {
    await signup(formData);
    navigate({ to: "/" });
  };
  return (
    <div className="grid grid-cols-1 flex-1 w-full md:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm px-4">
          {/* Title */}
          <h1 className="mb-10 text-center text-2xl font-semibold text-primary">
            Sign Up
          </h1>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              noValidate
              className="flex flex-col gap-6"
            >
              <AuthInput
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="John Doe"
                type="text"
                Icon={User}
              />
              <AuthInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="you@example.com"
                type="email"
                Icon={Mail}
              />
              <AuthInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="••••••••"
                type="password"
                Icon={Lock}
              />
              <AuthInput
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="••••••••"
                type="password"
                Icon={Lock}
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary h-10 text-md"
              >
                <UserPlus className="size-5 mr-1" />
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-10 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="ml-1 font-medium text-primary">
              Login here →
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center h-full bg-neutral">
        <h1 className="text-6xl font-extrabold text-primary text-center">
          Nice To Meet You
        </h1>
      </div>
    </div>
  );
}

export default SignupPage;
