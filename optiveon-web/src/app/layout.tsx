import type { Metadata, Viewport } from "next";
import {
  JetBrains_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/seo/json-ld";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const heading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Optiveon LLC | Algorithmic Trading Research & Market Analysis",
    template: "%s | Optiveon",
  },
  description:
    "Advanced algorithmic trading research, market analysis tools, and trading signal solutions for futures, options, and forex markets.",
  keywords: [
    "algorithmic trading",
    "market research",
    "trading signals",
    "futures",
    "options",
    "forex",
    "fintech",
  ],
  authors: [{ name: "Optiveon LLC" }],
  creator: "Optiveon LLC",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://optiveon.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Optiveon",
    title: "Optiveon LLC | Algorithmic Trading Research & Market Analysis",
    description:
      "Advanced algorithmic trading research, market analysis tools, and trading signal solutions for futures, options, and forex markets.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Optiveon LLC | Algorithmic Trading Research & Market Analysis",
    description:
      "Advanced algorithmic trading research, market analysis tools, and trading signal solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1221",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Organization Schema for Answer-Engines
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Optiveon LLC",
    "url": "https://optiveon.com",
    "logo": "https://optiveon.com/images/favicon.svg",
    "description": "Advanced algorithmic trading research, validation infrastructure, and deployment software for trading teams.",
    "sameAs": [
      // Add social links here if needed
      "https://github.com/mohit1157/optiveon"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "admin@optiveon.com",
      "contactType": "customer support"
    }
  };

  return (
    <html
      lang="en"
      className={`${sans.variable} ${heading.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <meta name="format-detection" content="telephone=no" />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
