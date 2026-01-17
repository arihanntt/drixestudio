import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.drixestudio.services";
  const pageUrl = `${baseUrl}/plans`;
  const imageUrl = `${baseUrl}/assets/plans.jpg`;

  return {
    // 🚀 SEO CHANGE 1: Title that targets "Intent"
    // Old: "Pricing & Plans | Drixe Studio"
    // New: Targets the exact search queries people use to find you.
    title: "Service Pricing: Custom Discord, Web Architecture & Content | Drixe Studio",
    
    description:
      "Transparent pricing for custom Discord server setups, Next.js websites, and social media content engines. No hidden fees—just professional digital architecture.",

    keywords: [
      // Core Identity
      "Drixe Studio",
      "digital architecture agency",

      // 💰 High-Intent Discord Terms (Money Keywords)
      "cost of custom discord server",
      "discord server setup pricing 2026",
      "hire professional discord developer",
      "discord community architecture plans",
      "discord bot development cost",

      // 💻 High-Intent Web Terms
      "Next.js website pricing",
      "static website design cost",
      "dark mode website agency",
      "conversion landing page rates",

      // 📹 High-Intent Content Terms
      "short form video editing packages",
      "social media growth agency pricing",
      "content engine subscription"
    ],

    openGraph: {
      title: "Drixe Studio Service Plans: Web, Discord & Content",
      description:
        "View our transparent pricing tiers for custom digital ecosystems. From single landing pages to enterprise Discord architecture.",
      url: pageUrl,
      siteName: "Drixe Studio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Drixe Studio Service Pricing Tiers",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Service Pricing | Drixe Studio",
      description:
        "Transparent investment tiers for high-performance digital assets.",
      images: [imageUrl],
    },

    alternates: {
      canonical: pageUrl,
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
}

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ⚠️ DESIGN NOTE: Your page uses `bg-[#0a0a0a]`, but layout used `bg-black`.
    // I synced them here to prevent a visual "flicker" on load.
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-zinc-800">
      {children}
    </main>
  );
}