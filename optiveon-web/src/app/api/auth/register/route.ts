import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations";
import { createAuditLog, AuditActions, AuditEntities } from "@/lib/audit";
import { getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password, company } = validationResult.data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hash(password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        company,
        subscription: {
          create: {
            plan: "FREE",
            status: "ACTIVE",
          },
        },
      },
    });

    // Create audit log
    const clientIp = getClientIp(request);
    await createAuditLog({
      userId: user.id,
      action: AuditActions.REGISTER,
      entity: AuditEntities.USER,
      entityId: user.id,
      ipAddress: clientIp,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    // TODO: Send verification email

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully. Please verify your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
