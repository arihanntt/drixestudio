import type { Metadata } from "next";

const baseUrl = "https://drixestudio.services";

export const metadata: Metadata = {
  title: "Blog | Discord, Websites & Growth Insights – Drixe Studio",
  description:
    "Actionable insights on Discord server building, website design, automation, SEO, and creator growth by Drixe Studio.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  keywords: [
    "discord server tips",
    "discord automation",
    "website design blog",
    "seo for creators",
    "community building",
    "drixe studio blog",
  ],
  openGraph: {
    title: "Drixe Studio Blog",
    description:
      "Guides, tutorials, and insights on Discord servers, websites, automation, and digital growth.",
    url: `${baseUrl}/blog`,
    siteName: "Drixe Studio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
