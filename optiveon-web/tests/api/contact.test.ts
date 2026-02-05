/**
 * API tests for contact form endpoint
 * Note: These tests require mocking the database and rate limiter
 */

import { NextRequest } from "next/server";

// Mock the database
jest.mock("@/lib/db", () => ({
  db: {
    contact: {
      create: jest.fn().mockResolvedValue({
        id: "test-id",
        name: "Test User",
        email: "test@example.com",
        company: "Test Company",
        interest: "general",
        message: "Test message",
        status: "NEW",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    },
  },
}));

// Mock rate limiter
jest.mock("@/lib/rate-limit", () => ({
  rateLimit: jest.fn().mockReturnValue({ success: true, remaining: 4, resetAt: Date.now() + 60000 }),
  getClientIp: jest.fn().mockReturnValue("127.0.0.1"),
}));

// Mock audit log
jest.mock("@/lib/audit", () => ({
  createAuditLog: jest.fn().mockResolvedValue(undefined),
  AuditActions: { CONTACT_CREATED: "contact_created" },
  AuditEntities: { CONTACT: "contact" },
}));

// Mock email
jest.mock("@/lib/email", () => ({
  sendEmail: jest.fn().mockResolvedValue({ success: true }),
  generateContactNotificationEmail: jest.fn().mockReturnValue("<html></html>"),
}));

describe("POST /api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("successfully creates a contact submission", async () => {
    // Dynamic import to apply mocks
    const { POST } = await import("@/app/api/contact/route");

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        company: "Test Company",
        interest: "general",
        message: "This is a test message that is long enough.",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.message).toContain("Thank you");
  });

  it("returns validation error for invalid input", async () => {
    const { POST } = await import("@/app/api/contact/route");

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "",
        email: "invalid-email",
        interest: "invalid",
        message: "short",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Validation failed");
  });

  it("rate limits excessive requests", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    (rateLimit as jest.Mock).mockReturnValue({
      success: false,
      remaining: 0,
      resetAt: Date.now() + 60000,
    });

    const { POST } = await import("@/app/api/contact/route");

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        interest: "general",
        message: "This is a test message that is long enough.",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toContain("Too many requests");
  });
});
