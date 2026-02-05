const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

async function seedUsers() {
  const userCount = await prisma.user.count();
  if (userCount > 0) return;

  const user = await prisma.user.create({
    data: {
      name: "Optiveon Demo",
      email: "demo@optiveon.com",
      role: "ADMIN",
      emailVerified: new Date(),
      subscription: {
        create: {
          plan: "PROFESSIONAL",
          status: "ACTIVE",
          currentPeriodStart: daysAgo(10),
          currentPeriodEnd: daysAgo(-20),
        },
      },
    },
    include: { subscription: true },
  });

  const rawKey = crypto.randomBytes(24).toString("hex");
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

  await prisma.apiKey.create({
    data: {
      userId: user.id,
      name: "Primary API Key",
      keyHash,
      keyPrefix: rawKey.slice(0, 8),
      permissions: JSON.stringify(["read", "write"]),
      lastUsedAt: daysAgo(1),
    },
  });

  await prisma.auditLog.createMany({
    data: [
      {
        userId: user.id,
        action: "register",
        entity: "user",
        entityId: user.id,
        createdAt: daysAgo(25),
      },
      {
        userId: user.id,
        action: "subscription_updated",
        entity: "subscription",
        entityId: user.subscription?.id,
        metadata: JSON.stringify({ plan: "PROFESSIONAL" }),
        createdAt: daysAgo(20),
      },
      {
        userId: user.id,
        action: "api_key_created",
        entity: "api_key",
        metadata: JSON.stringify({ name: "Primary API Key" }),
        createdAt: daysAgo(5),
      },
    ],
  });
}

async function seedContacts() {
  const contactCount = await prisma.contact.count();
  if (contactCount > 0) return;

  await prisma.contact.createMany({
    data: [
      {
        name: "Alex Harper",
        email: "alex@example.com",
        company: "Ridgeway Capital",
        interest: "market-research",
        message: "Looking for a research terminal for futures and FX.",
        createdAt: daysAgo(12),
      },
      {
        name: "Priya Singh",
        email: "priya@example.com",
        company: "Northwind Trading",
        interest: "signal-generation",
        message: "Interested in signal quality metrics and backtests.",
        createdAt: daysAgo(8),
      },
      {
        name: "Jordan Lee",
        email: "jordan@example.com",
        company: "Axiom Advisors",
        interest: "enterprise-api",
        message: "We need API access for custom risk dashboards.",
        createdAt: daysAgo(6),
      },
      {
        name: "Sophia Nguyen",
        email: "sophia@example.com",
        company: "Vertex Partners",
        interest: "custom-solution",
        message: "Can we get a custom integration for our OMS?",
        createdAt: daysAgo(4),
      },
      {
        name: "Taylor Brooks",
        email: "taylor@example.com",
        company: "Atlas Strategies",
        interest: "general",
        message: "Looking for a demo and pricing breakdown.",
        createdAt: daysAgo(2),
      },
    ],
  });

  await prisma.auditLog.createMany({
    data: [
      {
        action: "contact_created",
        entity: "contact",
        metadata: JSON.stringify({ interest: "market-research" }),
        createdAt: daysAgo(12),
      },
      {
        action: "contact_created",
        entity: "contact",
        metadata: JSON.stringify({ interest: "signal-generation" }),
        createdAt: daysAgo(8),
      },
      {
        action: "contact_created",
        entity: "contact",
        metadata: JSON.stringify({ interest: "enterprise-api" }),
        createdAt: daysAgo(6),
      },
    ],
  });
}

async function main() {
  await seedUsers();
  await seedContacts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
