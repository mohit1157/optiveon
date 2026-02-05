"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send reset email");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
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
          <h1 className="text-2xl font-bold mb-sm">Check your email</h1>
          <p className="text-foreground-secondary">
            If an account exists with that email, we&apos;ve sent password reset
            instructions.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/login">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-xl">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-sm">Forgot your password?</h1>
        <p className="text-foreground-secondary">
          Enter your email and we&apos;ll send you a reset link
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

        <Button type="submit" className="w-full" loading={isLoading}>
          Send reset link
        </Button>
      </form>

      <p className="text-center text-sm text-foreground-secondary">
        Remember your password?{" "}
        <Link href="/login" className="text-accent hover:text-accent-light">
          Sign in
        </Link>
      </p>
    </div>
  );
}
