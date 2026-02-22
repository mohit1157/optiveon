import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
export const TAG_LENGTH = 16;

/**
 * Derives a consistent 32-byte encryption key from the provided master key and salt.
 * Uses PBKDF2 for key stretching.
 */
function getKey(masterKey: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(masterKey, salt, 100000, 32, "sha512");
}

/**
 * Encrypts a string using AES-256-GCM.
 * Generates a unique IV and Salt for every encryption, returning them joined with the ciphertext.
 *
 * @param text The plaintext string to encrypt
 * @returns Base64 encoded string containing: salt:iv:authTag:ciphertext
 */
export function encryptData(text: string): string {
    const masterKey = process.env.ENCRYPTION_MASTER_KEY;
    if (!masterKey) {
        throw new Error("ENCRYPTION_MASTER_KEY environment variable is not set");
    }
    const keyString = masterKey as string;

    const iv = crypto.randomBytes(IV_LENGTH);
    const salt = crypto.randomBytes(SALT_LENGTH);
    const key = getKey(keyString, salt);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");

    const tag = cipher.getAuthTag();

    // Format: salt:iv:tag:ciphertext
    return `${salt.toString("hex")}:${iv.toString("hex")}:${tag.toString(
        "hex"
    )}:${encrypted}`;
}

/**
 * Decrypts a string previously encrypted with `encryptData`.
 *
 * @param encryptedData The specific Base64 format returned from encryptData
 * @returns The original plaintext string
 */
export function decryptData(encryptedData: string): string {
    const masterKey = process.env.ENCRYPTION_MASTER_KEY;
    if (!masterKey) {
        throw new Error("ENCRYPTION_MASTER_KEY environment variable is not set");
    }
    const keyString = masterKey as string;

    const parts = encryptedData.split(":");
    if (parts.length !== 4) {
        throw new Error("Invalid encrypted data format");
    }

    const saltString = parts[0];
    const ivString = parts[1];
    const tagString = parts[2];
    const cipherString = parts[3];

    if (!saltString || !ivString || !tagString || !cipherString) {
        throw new Error("Invalid encrypted data format components");
    }

    const salt = Buffer.from(saltString, "hex");
    const iv = Buffer.from(ivString, "hex");
    const tag = Buffer.from(tagString, "hex");
    const key = getKey(keyString, salt);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    const decrypted = decipher.update(cipherString, "hex", "utf8") + decipher.final("utf8");

    return decrypted;
}
