import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.drixestudio.services";
  const pageUrl = `${baseUrl}/plans`;
  const imageUrl = `${baseUrl}/assets/plans.jpg`;

  return {
    // 🚀 SEO STRATEGY: Target exactly what the user types into Google.
    // No jargon, just clear, high-intent product keywords.
    title: "Service Pricing: Website, Discord & Content Packages | Drixe Studio",
    
    description:
      "Transparent pricing for custom website development, Discord server setups, and social media content. No hidden fees, just clear packages and professional service.",

    keywords: [
      // Core Identity
      "Drixe Studio",
      "digital services agency",

      // 💰 High-Intent Discord Terms
      "cost of custom discord server",
      "discord server setup pricing",
      "hire professional discord developer",
      "discord server creation plans",

      // 💻 High-Intent Web Terms
      "Next.js website pricing",
      "custom website design cost",
      "dark mode website agency",
      "landing page pricing",

      // 📹 High-Intent Content Terms
      "short form video editing packages",
      "social media content pricing",
      "monthly video content subscription"
    ],

    openGraph: {
      title: "Drixe Studio Pricing: Website, Discord & Content",
      description:
        "View our transparent pricing for custom digital projects. From single landing pages to large Discord server setups.",
      url: pageUrl,
      siteName: "Drixe Studio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Drixe Studio Service Pricing",
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Service Pricing | Drixe Studio",
      description:
        "Clear, upfront pricing for professional website development and Discord setups.",
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
    // ⚠️ DESIGN NOTE: Synced to pure `bg-black` to match the brutalist page design perfectly.
    // Added the custom cyan selection highlight to match your brand identity globally.
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      {children}
    </main>
  );
}