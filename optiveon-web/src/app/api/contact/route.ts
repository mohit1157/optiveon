import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { createAuditLog, AuditActions, AuditEntities } from "@/lib/audit";
import { sendEmail, generateContactNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(`contact:${clientIp}`, {
      maxRequests: 5,
      windowMs: 60000, // 1 minute
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)
            ),
          },
        }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, interest, message } = validationResult.data;

    // Save to database
    const contact = await db.contact.create({
      data: {
        name,
        email,
        company,
        interest,
        message,
      },
    });

    // Create audit log
    await createAuditLog({
      action: AuditActions.CONTACT_CREATED,
      entity: AuditEntities.CONTACT,
      entityId: contact.id,
      metadata: { interest },
      ipAddress: clientIp,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    // Send email notification (optional - don't fail if email fails)
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@optiveon.com";
      await sendEmail({
        to: adminEmail,
        replyTo: email,
        subject: `New Contact Form Submission: ${interest}`,
        html: generateContactNotificationEmail(
          name,
          email,
          company || null,
          interest,
          message
        ),
      });
    } catch (emailError) {
      console.error("Failed to send contact notification email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Check if it's a Prisma error
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // For debugging purposes, return the actual error message
    // In production, we should keep the generic message
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      {
        error: "An error occurred while processing your request.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
