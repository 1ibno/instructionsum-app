import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "InstructionSum – Extract Actionable Steps from Any Text",
  description: "Condense any text into clear, actionable step-by-step instructions. Free AI-powered summarization tool.",
  keywords: ["instructions", "step-by-step", "action steps", "AI", "text summary", "extract steps", "convert text"],
  authors: [{ name: "SumKit" }],
  openGraph: {
    title: "InstructionSum – Extract Actionable Steps from Any Text",
    description: "Condense any text into clear, actionable step-by-step instructions. Free AI-powered summarization tool.",
    url: "https://instructionsum.app",
    siteName: "InstructionSum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstructionSum – Extract Actionable Steps from Any Text",
    description: "Condense any text into clear, actionable step-by-step instructions. Free AI-powered summarization tool.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
		<Analytics />
      </body>
    </html>
  );
}