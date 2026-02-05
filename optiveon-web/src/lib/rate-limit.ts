// Simple in-memory rate limiter for development
// In production, use Redis or a distributed rate limiter

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = {
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX || "5", 10),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10),
  }
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 10000) {
    Array.from(rateLimitMap.entries()).forEach(([key, value]) => {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    });
  }

  if (!entry || now > entry.resetAt) {
    // New window
    const resetAt = now + config.windowMs;
    rateLimitMap.set(identifier, { count: 1, resetAt });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetAt,
    };
  }

  if (entry.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Increment count
  entry.count++;
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}
