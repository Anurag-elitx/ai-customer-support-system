import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { WidgetLoader } from "@/components/WidgetLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SupportAI — Neural Customer Support Infrastructure",
  description:
    "Deploy the world's most sophisticated autonomous customer support. Support AI delivers 0-latency, human-grade resolutions at scale.",
  openGraph: {
    title: "SupportAI — Neural Customer Support AI",
    description:
      "Advanced RAG-driven AI support infrastructure for premium digital platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-indigo-500/30`}>
        {/* Persistent Celestial Canvas */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="celestial-mesh opacity-50" />
        </div>
        
        <AuthProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
          <WidgetLoader />
        </AuthProvider>
      </body>
    </html>
  );
}
