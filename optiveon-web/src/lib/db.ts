import { PrismaClient } from "@prisma/client";
import { readReplicas } from "@prisma/extension-read-replicas";

declare global {
  // eslint-disable-next-line no-var
  var prismaInit: ReturnType<typeof createPrismaClient> | undefined;
}

function createPrismaClient() {
  const baseClient = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

  // 1. Data Masking Extension (Privacy/Compliance)
  // Automatically mask PII for developers in local environments before returning data
  const maskedClient = baseClient.$extends({
    name: "data-masking",
    result: {
      user: {
        email: {
          needs: { email: true },
          compute(user) {
            // In production, return the real email.
            // In development, obfuscate it (e.g., test***@gmail.com)
            if (process.env.NODE_ENV === "production" || !user.email) {
              return user.email;
            }
            const parts = user.email.split("@");
            const localPart = parts[0];
            const domain = parts[1];
            if (!localPart || !domain) return user.email; // If badly formatted, just return

            const maskedLocal =
              localPart.length > 3
                ? localPart.substring(0, 3) + "***"
                : localPart + "***";
            return `${maskedLocal}@${domain}`;
          },
        },
      },
    },
  });

  // 2. Read Replicas Extension (Scaling)
  // If a READ_REPLICA_URL is provided, route read-only queries natively to the replica
  if (process.env.READ_REPLICA_URL) {
    const replicaClient = new PrismaClient({
      datasources: { db: { url: process.env.READ_REPLICA_URL } },
    });
    return maskedClient.$extends(
      readReplicas({
        replicas: [replicaClient],
      })
    );
  }

  return maskedClient;
}

export const db = globalThis.prismaInit || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaInit = db;
}
