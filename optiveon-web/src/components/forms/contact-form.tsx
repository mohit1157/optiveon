"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { interestOptions } from "@/constants/content";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-xl">
      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-success/10 border border-success/30 text-success">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            Thank you for your message! We&apos;ll get back to you shortly.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-error/10 border border-error/30 text-error">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed">
            {errorMessage ||
              "There was an error sending your message. Please try again."}
          </p>
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-sm">
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

      {/* Email */}
      <div className="flex flex-col gap-sm">
        <Label htmlFor="email" error={!!errors.email}>
          Email Address
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

      {/* Company */}
      <div className="flex flex-col gap-sm">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          placeholder="Your Company"
          {...register("company")}
        />
      </div>

      {/* Interest */}
      <div className="flex flex-col gap-sm">
        <Label htmlFor="interest" error={!!errors.interest}>
          Area of Interest
        </Label>
        <Select
          onValueChange={(value) =>
            setValue("interest", value as ContactInput["interest"])
          }
        >
          <SelectTrigger error={!!errors.interest}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {interestOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.interest && (
          <p className="text-sm text-error">{errors.interest.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-sm">
        <Label htmlFor="message" error={!!errors.message}>
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us about your needs..."
          rows={4}
          error={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-error">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" loading={status === "loading"} className="w-full">
        {status === "loading" ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <Send className="w-5 h-5" />
          </>
        )}
      </Button>
    </form>
  );
}
