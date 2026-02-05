import { db } from "./db";

interface AuditLogData {
  userId?: string | null;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function createAuditLog(data: AuditLogData) {
  try {
    await db.auditLog.create({
      data: {
        userId: data.userId || null,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
    // Don't throw - audit logging should not break the main operation
  }
}

// Common audit actions
export const AuditActions = {
  // Auth
  LOGIN: "login",
  LOGOUT: "logout",
  REGISTER: "register",
  PASSWORD_RESET: "password_reset",
  EMAIL_VERIFIED: "email_verified",

  // User
  USER_CREATED: "user_created",
  USER_UPDATED: "user_updated",
  USER_DELETED: "user_deleted",

  // Subscription
  SUBSCRIPTION_CREATED: "subscription_created",
  SUBSCRIPTION_UPDATED: "subscription_updated",
  SUBSCRIPTION_CANCELED: "subscription_canceled",

  // API Keys
  API_KEY_CREATED: "api_key_created",
  API_KEY_DELETED: "api_key_deleted",
  API_KEY_USED: "api_key_used",

  // Contact
  CONTACT_CREATED: "contact_created",
  CONTACT_UPDATED: "contact_updated",
} as const;

export const AuditEntities = {
  USER: "user",
  SESSION: "session",
  SUBSCRIPTION: "subscription",
  API_KEY: "api_key",
  CONTACT: "contact",
} as const;
