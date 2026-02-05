"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  updateProfileSchema,
  changePasswordSchema,
  type UpdateProfileInput,
  type ChangePasswordInput,
} from "@/lib/validations";

export default function AccountPage() {
  return (
    <div className="space-y-xl max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-foreground-secondary mt-sm">
          Manage your account information and security
        </p>
      </div>

      <ProfileSection />
      <PasswordSection />
      <DangerZone />
    </div>
  );
}

function ProfileSection() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name || "",
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    setIsLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      await update({ name: data.name });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your account profile details</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" && (
          <div className="flex items-center gap-2 p-3 mb-lg rounded-lg bg-success/10 border border-success/30 text-success text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Profile updated successfully
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 p-3 mb-lg rounded-lg bg-error/10 border border-error/30 text-error text-sm">
            <AlertCircle className="w-4 h-4" />
            Failed to update profile
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
          <div className="space-y-sm">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} error={!!errors.name} />
            {errors.name && (
              <p className="text-sm text-error">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-sm">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={session?.user?.email || ""}
              disabled
              className="opacity-60"
            />
            <p className="text-xs text-foreground-muted">
              Email cannot be changed
            </p>
          </div>

          <div className="space-y-sm">
            <Label htmlFor="company">Company</Label>
            <Input id="company" {...register("company")} />
          </div>

          <Button type="submit" loading={isLoading}>
            Save changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function PasswordSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordInput) => {
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/users/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to change password");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to change password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" && (
          <div className="flex items-center gap-2 p-3 mb-lg rounded-lg bg-success/10 border border-success/30 text-success text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Password changed successfully
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 p-3 mb-lg rounded-lg bg-error/10 border border-error/30 text-error text-sm">
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
          <div className="space-y-sm">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              {...register("currentPassword")}
              error={!!errors.currentPassword}
            />
            {errors.currentPassword && (
              <p className="text-sm text-error">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-sm">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword")}
              error={!!errors.newPassword}
            />
            {errors.newPassword && (
              <p className="text-sm text-error">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="space-y-sm">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-error">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" loading={isLoading}>
            Change password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function DangerZone() {
  return (
    <Card className="border-error/30">
      <CardHeader>
        <CardTitle className="text-error">Danger Zone</CardTitle>
        <CardDescription>Irreversible and destructive actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Delete Account</p>
            <p className="text-sm text-foreground-secondary">
              Permanently delete your account and all data
            </p>
          </div>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </CardContent>
    </Card>
  );
}
