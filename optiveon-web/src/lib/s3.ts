import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Client = new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

export const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "";

/**
 * Generates a pre-signed URL to upload a file directly to S3 from the client browser.
 * This keeps large file payloads off of our Next.js API servers.
 */
export async function generateUploadUrl(
    fileName: string,
    contentType: string,
    folder: string = "uploads"
) {
    if (!S3_BUCKET_NAME) {
        throw new Error("AWS_S3_BUCKET_NAME is not defined");
    }

    // Sanitize the file name to prevent directory traversal or weird paths
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `${folder}/${Date.now()}-${sanitizedFileName}`;

    const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    });

    // URL expires in 5 minutes (300 seconds)
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

    return {
        uploadUrl,
        key,
        publicUrl: `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    };
}
