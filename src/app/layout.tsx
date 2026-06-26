import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "NexusFlow | AI-powered data automation",
  description: "Premium AI-driven automation for analytics, integrations, and real-time decision making.",
  keywords: ["AI automation", "data platform", "workflow orchestration", "analytics"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NexusFlow | AI-powered data automation",
    description: "Premium AI-driven automation for analytics, integrations, and real-time decision making.",
    url: "https://example.com",
    siteName: "NexusFlow",
    images: [
      {
        url: "/window.svg",
        width: 1200,
        height: 630,
        alt: "NexusFlow platform preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusFlow | AI-powered data automation",
    description: "Premium AI-driven automation for analytics, integrations, and real-time decision making.",
    images: ["/window.svg"],
  },
  icons: {
    icon: "/window.svg",
    shortcut: "/window.svg",
    apple: "/window.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#172B36",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-oceanic text-arctic">
        <div className="relative overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
