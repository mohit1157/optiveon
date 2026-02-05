"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/lib/validations";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-xl">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-success" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-sm">Registration successful!</h1>
          <p className="text-foreground-secondary">
            Please check your email to verify your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-xl">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-sm">Create an account</h1>
        <p className="text-foreground-secondary">
          Get started with Optiveon today
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-error/10 border border-error/30 text-error">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
        <div className="space-y-sm">
          <Label htmlFor="name" error={!!errors.name}>
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            error={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-error">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-sm">
          <Label htmlFor="email" error={!!errors.email}>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            error={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-error">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-sm">
          <Label htmlFor="company">Company (Optional)</Label>
          <Input
            id="company"
            placeholder="Your Company"
            {...register("company")}
          />
        </div>

        <div className="space-y-sm">
          <Label htmlFor="password" error={!!errors.password}>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            error={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-error">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-sm">
          <Label htmlFor="confirmPassword" error={!!errors.confirmPassword}>
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            error={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" loading={isLoading}>
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-foreground-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:text-accent-light">
          Sign in
        </Link>
      </p>

      <p className="text-center text-xs text-foreground-muted">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-accent hover:text-accent-light">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-accent hover:text-accent-light">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
