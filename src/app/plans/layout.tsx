import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.drixestudio.services";
  const pageUrl = `${baseUrl}/plans`;
  const imageUrl = `${baseUrl}/assets/plans.jpg`;

  return {
    title: {
      default: "Plans | Drixe Studio",
      template: "%s | Drixe Studio"
    },
    description:
      "Choose from our premium Discord server setup packages. Professional designs, bot integrations, and complete customization for communities of all sizes.",
    keywords: [
      "Discord server plans",
      "Discord setup pricing",
      "Premium Discord services",
      "Discord server packages",
      "Discord customization plans",
      "Discord bot setup services",
      "Discord server design pricing",
      "Discord community setup",
      "Discord server management plans",
      "Discord server upgrade packages",
      "Discord server boost services",
      "Discord server verification help",
      "Discord server theme packages",
      "Discord server moderation setup",
      "Discord server automation plans"
    ],
    openGraph: {
      title: "Plans | Drixe Studio",
      description:
        "Professional Discord server setup packages for communities, businesses, and creators. Start with our Basic plan or go Premium for complete customization.",
      url: pageUrl,
      siteName: "Drixe Studio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Drixe Studio Discord Setup Plans",
          type: "image/jpeg", // Optional but recommended
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Discord Server Setup Plans | Drixe Studio",
      description:
        "Get your perfect Discord server with our professional setup packages. Choose from Basic, Standard, or Premium plans.",
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
      google: "your-google-verification-code" // Replace with actual if needed
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

export default function PlansLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-white text-black">{children}</main>;
}
