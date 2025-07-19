// src/app/blog/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

const BLOG_THUMBNAIL = "/assets/blogs.png";
const SITE_URL = "https://www.drixestudio.services";
const BLOG_URL = `${SITE_URL}/blog`;
const TITLE = "Blogs | Drixe Studio";
const DESCRIPTION =
  "Explore our latest design and development insights, tips, tutorials, and updates.";

const KEYWORDS = [
  "Drixe Studio",
  "design blog",
  "development blog",
  "UI UX insights",
  "web development tips",
  "frontend trends",
  "branding strategies",
  "Next.js blog",
  "React tutorials",
  "creative tech studio"
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BLOG_URL,
    type: "website",
    siteName: "Drixe Studio",
    images: [
      {
        url: BLOG_THUMBNAIL,
        width: 1200,
        height: 630,
        alt: "Drixe Studio Blog Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [BLOG_THUMBNAIL],
  },
  alternates: {
    canonical: BLOG_URL,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  category: "Technology",
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-white text-black">{children}</main>;
}
