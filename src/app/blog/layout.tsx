// src/app/blog/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | Drixe Studio",
  description: "Explore our latest design and development insights, tips, and updates.",
  openGraph: {
    title: "Blog | Drixe Studio",
    description: "Explore our latest design and development insights, tips, and updates.",
    url: "https://www.drixestudio.services/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Drixe Studio",
    description: "Explore our latest design and development insights, tips, and updates.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
