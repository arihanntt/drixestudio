// app/faq/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

const baseUrl = "https://www.drixestudio.services";
const pageUrl = `${baseUrl}/faq`;
const imageUrl = `${baseUrl}/assets/faq.png`;

export const metadata: Metadata = {
  title: {
    default: "FAQ | Drixe Studio",
    template: "%s | Drixe Studio",
  },
  description:
    "Get answers to all your questions about Discord server setup, customization, and management from Drixe Studio experts.",
  keywords: [
    "Discord FAQ",
    "Server setup questions",
    "Discord bot configuration",
    "Discord help center",
    "Server management help",
    "Discord customization",
    "Discord pricing",
    "Server security FAQ",
    "Discord support Drixe",
    "Drixe Studio FAQs"
  ],
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "FAQ | Drixe Studio",
    description:
      "Expert answers to common questions about professional Discord server setup and management.",
    url: pageUrl,
    siteName: "Drixe Studio",
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Drixe Studio FAQ - Discord Server Setup Questions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Drixe Studio",
    description:
      "Everything you need to know about professional Discord server setups and Drixe Studio services.",
    images: [imageUrl],
    creator: "@DrixeStudio",
  },
  alternates: {
    canonical: pageUrl,
    languages: {
      "en-US": pageUrl,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "Drixe Studio",
  category: "technology",
  authors: [{ name: "Drixe Studio", url: baseUrl }],
};

export default function FaqLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-white">
        {children}
      </body>
    </html>
  );
}
