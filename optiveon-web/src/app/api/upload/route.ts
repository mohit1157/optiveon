import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateUploadUrl } from "@/lib/s3";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
    try {
        // 1. Verify User Authentication (Only logged in users can upload)
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Strict Rate Limiting on Upload Generation
        const ip = getClientIp(request);
        const { success, remaining, resetAt } = await rateLimit(`upload_${ip}`, {
            maxRequests: 10,
            windowMs: 60000,
        }); // 10 uploads per minute max

        if (!success) {
            return NextResponse.json(
                { error: "Too many upload requests. Please try again later." },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": resetAt.toString(),
                        "Retry-After": Math.ceil((resetAt - Date.now()) / 1000).toString(),
                    },
                }
            );
        }

        // 3. Extract requested file details
        const body = await request.json();
        const { fileName, contentType, folder } = body;

        if (!fileName || !contentType) {
            return NextResponse.json(
                { error: "Missing fileName or contentType in request body" },
                { status: 400 }
            );
        }

        // 4. Generate the presigned URL via AWS SDK
        // Let's force upload types heavily based on standard images/pdfs for safety
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
        if (!allowedTypes.includes(contentType)) {
            return NextResponse.json({ error: "File type not permitted for upload" }, { status: 400 });
        }

        // Prefix user id to the folder name to automatically isolate user data
        const userIsolatedFolder = folder ? `user_${session.user.id}/${folder}` : `user_${session.user.id}/general`;

        const { uploadUrl, key, publicUrl } = await generateUploadUrl(
            fileName,
            contentType,
            userIsolatedFolder
        );

        return NextResponse.json({ uploadUrl, key, publicUrl });
    } catch (error) {
        console.error("Upload URL generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate upload URL" },
            { status: 500 }
        );
    }
}
