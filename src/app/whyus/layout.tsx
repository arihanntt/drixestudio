import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.drixestudio.services";
  const pageUrl = `${baseUrl}/why-us`;
  const imageUrl = `${baseUrl}/assets/whyus.png`;

  return {
    // 🚀 SEO STRATEGY: Target search intent. 
    // People search for "Why work with X agency" or "Professional digital studio approach"
    title: "Why Drixe Studio | Our Professional Approach & Philosophy",
    description:
      "Learn why top brands choose Drixe Studio for custom website development, Discord server architecture, and consistent content systems built for long-term growth.",

    keywords: [
      // Brand
      "Drixe Studio",
      "digital services studio",

      // Systems positioning
      "professional digital systems",
      "community architecture",
      "automated workflows",
      "scalable digital solutions",

      // Website services
      "custom website development",
      "Next.js design agency",
      "professional web studio",

      // Discord (retain authority)
      "Discord server setup",
      "Discord community management",
      "Discord automation services",

      // Creator & business
      "creator systems",
      "brand infrastructure",
      "online community building",
    ],

    openGraph: {
      title: "Why Drixe Studio | Systems Built to Last",
      description:
        "We design websites, Discord communities, and social media systems with structure, clarity, and performance in mind.",
      url: pageUrl,
      siteName: "Drixe Studio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Drixe Studio — Our approach to digital systems",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Why Drixe Studio | Our Philosophy",
      description:
        "Building websites, communities, and digital systems that operate at peak performance.",
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
    /* ⚠️ BRAND CONSISTENCY: Synced to pure bg-black and cyan selection color */
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      {children}
    </main>
  );
}