import { Logo } from "@/components/layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="py-lg">
        <div className="container">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-xl">
        <div className="w-full max-w-md mx-auto px-lg">{children}</div>
      </main>

      {/* Footer */}
      <footer className="py-lg">
        <div className="container text-center">
          <p className="text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()} Optiveon LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
