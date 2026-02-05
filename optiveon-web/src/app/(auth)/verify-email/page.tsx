import { Suspense } from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailContent() {
  return (
    <div className="text-center space-y-xl">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
          <Mail className="w-10 h-10 text-accent" />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-sm">Check your email</h1>
        <p className="text-foreground-secondary">
          We&apos;ve sent a verification link to your email address. Please
          click the link to verify your account.
        </p>
      </div>

      <div className="space-y-md">
        <Button asChild>
          <Link href="/login">
            Continue to login
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>

        <p className="text-sm text-foreground-muted">
          Didn&apos;t receive an email?{" "}
          <button className="text-accent hover:text-accent-light">
            Click to resend
          </button>
        </p>
      </div>
    </div>
  );
}
