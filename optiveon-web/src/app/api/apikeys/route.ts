import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { encryptData } from "@/lib/encryption";
import { createAuditLog, AuditActions, AuditEntities } from "@/lib/audit";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            include: { subscription: true, apiKeys: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Only allow Pro/Enterprise users to generate API keys
        const plan = user.subscription?.plan;
        if (plan !== "PROFESSIONAL" && plan !== "ENTERPRISE") {
            return NextResponse.json(
                { error: "API access requires a Professional or Enterprise plan." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { name } = body;

        if (!name || typeof name !== "string") {
            return NextResponse.json(
                { error: "A valid name is required for the API Key." },
                { status: 400 }
            );
        }

        // 1. Generate a secure random API Key
        const rawKey = `opt_${crypto.randomBytes(24).toString("hex")}`;
        const keyPrefix = rawKey.substring(0, 8); // e.g. opt_1a2b

        // 2. Encrypt the raw key before storing it in the database
        // This uses our AES-256-GCM implementation so that even with DB access, keys are safe
        const encryptedKey = encryptData(rawKey);

        const apiKey = await db.apiKey.create({
            data: {
                userId: user.id,
                name,
                keyPrefix,
                keyHash: encryptedKey, // Store the encrypted string instead of a hash
                permissions: JSON.stringify(["read", "write"]),
            },
        });

        await createAuditLog({
            userId: user.id,
            action: AuditActions.API_KEY_CREATED || "API_KEY_CREATED",
            entity: AuditEntities.API_KEY || "API_KEY",
            entityId: apiKey.id,
        });

        // 3. Return the raw key to the user ONLY THIS ONCE
        return NextResponse.json({
            success: true,
            apiKey: rawKey,
            keyPrefix,
            name: apiKey.name,
            createdAt: apiKey.createdAt,
        });
    } catch (error) {
        console.error("Failed to create API key:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred while creating the API key" },
            { status: 500 }
        );
    }
}
