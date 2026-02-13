import { User, Subscription } from "@prisma/client";

// Manually define Enums as String Unions for SQLite compatibility
export type UserRole = "USER" | "ADMIN";
export type SubscriptionPlan = "FREE" | "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
export type SubscriptionStatus = "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING" | "PAUSED";

// Extended user type with subscription
export interface UserWithSubscription extends User {
  subscription: Subscription | null;
}

// Session user type for NextAuth
export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// Navigation
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  external?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// Features
export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// Pricing
export interface PricingTier {
  plan: "STARTER" | "PROFESSIONAL" | "ENTERPRISE";
  slug: "starter" | "professional" | "enterprise";
  name: string;
  description: string;
  price: number | null;
  priceLabel?: string;
  period?: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
}

// Solutions
export interface Solution {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  interest: string;
  message: string;
}

// Technology feature
export interface TechFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// Stats
export interface Stat {
  value: string;
  label: string;
}

// Legal page
export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

// Re-export Prisma types for convenience
export { type Subscription, type User };
