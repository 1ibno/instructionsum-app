import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const crimsonPro = Crimson_Pro({ 
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-crimson",
});
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
      <body className={`${inter.variable} ${crimsonPro.variable} antialiased min-h-screen`}>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "InstructionSum",
        "url": "https://instructionsum.app",
        "description": "Free AI tool to convert any text into clear, numbered action steps. No signup required.",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }).replace(/</g, '\\u003c')
    }}
  />
  {children}
  <Analytics />
</body>
    </html>
  );
}
