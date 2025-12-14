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
  title: "InstructionSum - Free AI Text Summarizer",
  description: "Convert any text into clear, numbered action steps. Free, no signup required.",
  url: "https://instructionsum.app",
  siteName: "InstructionSum",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "InstructionSum - Instant step-by-step instructions"
    }
  ],
  type: "website"
},
twitter: {
  card: "summary_large_image",
  title: "InstructionSum - Free AI Text Summarizer",
  description: "Convert any text into clear, numbered action steps. Free, no signup required.",
  images: ["/og-image.png"]
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
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is InstructionSum?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "InstructionSum is a free AI-powered tool that converts any text into clear, numbered action steps or instructions."
          }
        },
        {
          "@type": "Question",
          "name": "Is InstructionSum free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, InstructionSum is completely free with no signup or subscription required."
          }
        },
        {
          "@type": "Question",
          "name": "When should I use InstructionSum?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use InstructionSum for recipes, tutorials, process documentation, how-to guides, or any content that should be presented as sequential steps."
          }
        },
        {
          "@type": "Question",
          "name": "How does InstructionSum differ from PointSum?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "InstructionSum creates numbered, sequential action steps, while PointSum extracts key facts as non-sequential bullet points."
          }
        },
        {
          "@type": "Question",
          "name": "How many steps does InstructionSum create?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "InstructionSum typically generates 4-8 numbered steps based on content complexity, focusing on clear, actionable instructions."
          }
        },
        {
          "@type": "Question",
          "name": "What AI powers InstructionSum?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "InstructionSum is powered by Claude AI from Anthropic, ensuring accurate step-by-step instructions."
          }
        },
        {
          "@type": "Question",
          "name": "Is my input data private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Text is processed via Claude AI and never stored or shared. Your data remains completely private."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to create an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No account needed. Paste your text and receive numbered instructions instantly."
          }
        }
      ]
    }).replace(/</g, '\\u003c')
  }}
/>      
  {children}
  <Analytics />
</body>
    </html>
  );
}
