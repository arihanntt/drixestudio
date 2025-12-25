import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.drixestudio.services";
  const pageUrl = `${baseUrl}/plans`;
  const imageUrl = `${baseUrl}/assets/plans.jpg`;

  return {
    title: "Pricing & Plans | Drixe Studio",
    description:
      "Transparent pricing for websites, Discord community systems, and social media content. Built for creators, brands, and teams that value clean design and scalable systems.",

    keywords: [
      // Core brand
      "Drixe Studio",
      "digital studio",

      // Website services
      "website pricing",
      "frontend development pricing",
      "landing page pricing",
      "website design plans",
      "static website services",

      // Discord services (keep strong)
      "Discord server setup plans",
      "Discord server pricing",
      "Discord community systems",
      "Discord automation setup",
      "Discord moderation services",

      // Creator & content
      "creator tools",
      "community building services",
      "social media content plans",
    ],

    openGraph: {
      title: "Pricing & Plans | Drixe Studio",
      description:
        "Explore pricing for websites, Discord systems, and content services. Clear plans, no hidden fees, and scalable digital solutions.",
      url: pageUrl,
      siteName: "Drixe Studio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Drixe Studio pricing and services overview",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Pricing & Plans | Drixe Studio",
      description:
        "Clear pricing for websites, Discord systems, and content services. Built with focus and intent.",
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
    <main className="min-h-screen bg-black text-white">
      {children}
    </main>
  );
}
