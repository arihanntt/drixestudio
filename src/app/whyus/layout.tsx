import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.drixestudio.services";
  const pageUrl = `${baseUrl}/why-us`;
  const imageUrl = `${baseUrl}/assets/whyus.png`;

  return {
    title: "Why Drixe Studio | Our Approach & Philosophy",
    description:
      "Learn how Drixe Studio approaches websites, Discord communities, and digital systems with clarity, structure, and long-term thinking.",

    keywords: [
      // Brand
      "Drixe Studio",
      "digital studio",

      // Systems positioning
      "digital systems design",
      "community systems",
      "automation workflows",
      "scalable digital solutions",

      // Website services
      "website design studio",
      "frontend development",
      "static website development",

      // Discord (retain authority)
      "Discord server setup",
      "Discord community systems",
      "Discord automation",
      "Discord moderation services",

      // Creator & business
      "creator tools",
      "community building",
      "online communities",
    ],

    openGraph: {
      title: "Why Drixe Studio | Systems, Not Just Setups",
      description:
        "We design websites, Discord communities, and workflows with structure, clarity, and long-term usability in mind.",
      url: pageUrl,
      siteName: "Drixe Studio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Drixe Studio – our approach to building digital systems",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Why Drixe Studio",
      description:
        "Our philosophy on building websites, communities, and digital systems that last.",
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

export default function WhyUsLayout({
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
