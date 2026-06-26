import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexus-ai-eight-tau.vercel.app"),
  title: "NexusAI — Intelligent Data Automation Platform",
  description: "NexusAI automates your entire data pipeline with advanced AI. Extract, transform, and deploy insights 10x faster with zero manual intervention.",
  keywords: "AI automation, data pipeline, machine learning, data intelligence, automation platform",
  authors: [{ name: "NexusAI" }],
  robots: "index, follow",
  openGraph: {
    title: "NexusAI — Intelligent Data Automation Platform",
    description: "Automate your entire data pipeline with advanced AI. 10x faster insights, zero manual intervention.",
    type: "website",
    url: "https://nexus-ai.vercel.app",
    siteName: "NexusAI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NexusAI Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusAI — Intelligent Data Automation Platform",
    description: "Automate your data pipeline with AI. Extract, transform, deploy — 10x faster.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#172B36" />
        <link rel="canonical" href="https://nexus-ai.vercel.app" />
      </head>
      <body>{children}</body>
    </html>
  );
}
