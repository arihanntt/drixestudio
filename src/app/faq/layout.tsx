import type { Metadata } from "next";

const baseUrl = "https://www.drixestudio.services";

export const metadata: Metadata = {
  title: "FAQ – Websites, Discord & Social Media | Drixe Studio",
  description:
    "Find clear answers about Drixe Studio services including website development, Discord server setup, automation, security, pricing, and social media content.",

  keywords: [
    // Brand
    "Drixe Studio FAQ",
    "Drixe Studio help",

    // Discord
    "Discord server setup FAQ",
    "Discord automation questions",
    "Discord moderation help",
    "Discord pricing questions",

    // Websites
    "website development FAQ",
    "static website agency",
    "landing page development questions",

    // Social
    "social media services FAQ",
    "content creation questions",

    // Intent
    "digital studio support",
    "agency frequently asked questions"
  ],

  alternates: {
    canonical: `${baseUrl}/faq`,
  },

  openGraph: {
    title: "FAQ | Drixe Studio",
    description:
      "Answers to common questions about our websites, Discord systems, automation, pricing, and social media services.",
    url: `${baseUrl}/faq`,
    siteName: "Drixe Studio",
    type: "website",
    images: [
      {
        url: `${baseUrl}/assets/faq.png`,
        width: 1200,
        height: 630,
        alt: "Drixe Studio FAQ – Websites, Discord & Social Media",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FAQ | Drixe Studio",
    description:
      "Learn everything about Drixe Studio services — websites, Discord systems, pricing, and content.",
    images: [`${baseUrl}/assets/faq.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
  applicationName: "Drixe Studio",
  authors: [{ name: "Drixe Studio", url: baseUrl }],
  creator: "Drixe Studio",
  publisher: "Drixe Studio",
  metadataBase: new URL(baseUrl),
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-black text-white">{children}</main>;
}
