import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.drixestudio.services";
  const pageUrl = `${baseUrl}/why-us`;
  const imageUrl = `${baseUrl}/assets/whyus.png`;

  return {
    title: {
      default: "Why Us | Drixe Studio",
      template: "%s | Drixe Studio"
    },
    description:
      "Learn why Drixe Studio is the top choice for professional Discord server design and automation. We deliver unique setups tailored to every community.",
    keywords: [
      "Why choose Drixe Studio",
      "Discord server design",
      "Professional Discord setups",
      "Discord automation services",
      "Custom Discord servers",
      "Discord server branding",
      "Best Discord setup agency",
      "Premium Discord customization",
      "Discord community engagement",
      "Tailored Discord solutions"
    ],
    openGraph: {
      title: "Why Drixe Studio is Your Best Discord Setup Partner",
      description:
        "Discover what makes Drixe Studio the leader in custom Discord servers — premium design, automation, moderation systems and more.",
      url: pageUrl,
      siteName: "Drixe Studio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Why Choose Drixe Studio - Discord Server Benefits",
          type: "image/png",
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Why Choose Drixe Studio",
      description:
        "We build stunning, automated Discord servers tailored for your community, brand, or business.",
      creator: "@DrixeStudio",
      images: [imageUrl]
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": pageUrl
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    verification: {
      google: "your-google-verification-code" // Replace with your real one if needed
    },
    category: "technology",
    metadataBase: new URL(baseUrl),
    applicationName: "Drixe Studio",
    authors: [{ name: "Drixe Studio", url: baseUrl }],
    creator: "Drixe Studio",
    publisher: "Drixe Studio",
    other: {
      "discord:invite": "https://discord.gg/E22K7T4p"
    }
  };
}

export default function WhyUsLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-white text-black">{children}</main>;
}
