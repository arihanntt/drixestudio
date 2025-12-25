import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website & Landing Page Design | Drixe Studio",
  description:
    "Modern website and landing page design focused on speed, SEO, and conversions. Built for creators, startups, and brands.",
  keywords: [
    "website designer",
    "landing page designer",
    "frontend developer",
    "static website design",
    "business website",
    "seo website",
    "conversion focused website"
  ],
};

export default function WebsiteDesignPage() {
  return (
    <main className="bg-black text-white py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* HERO */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Website & Landing Page Design
        </h1>

        <p className="text-white/70 mb-10 max-w-3xl">
          Drixe Studio designs fast, clean, and conversion-focused websites
          for creators, startups, and brands. We build modern frontend-driven
          websites that load instantly, rank well on Google, and turn visitors
          into leads.
        </p>

        {/* WHAT WE BUILD */}
        <h2 className="text-2xl font-semibold mb-4">
          What we build
        </h2>

        <ul className="space-y-3 text-white/70 list-disc list-inside mb-10">
          <li>Business and brand websites</li>
          <li>High-conversion landing pages</li>
          <li>Portfolio and personal brand sites</li>
          <li>SaaS and startup marketing pages</li>
          <li>SEO-optimized static websites</li>
        </ul>

        {/* WHY OUR APPROACH */}
        <h2 className="text-2xl font-semibold mb-4">
          Our approach to website design
        </h2>

        <p className="text-white/70 mb-8 max-w-3xl">
          We don’t use bloated page builders or slow CMS platforms. Every
          website is built with modern frontend technology, clean code,
          and performance-first architecture. This ensures faster load times,
          better SEO scores, and long-term scalability.
        </p>

        {/* WHY STATIC */}
        <h2 className="text-2xl font-semibold mb-4">
          Why static & frontend-first websites
        </h2>

        <ul className="space-y-3 text-white/70 list-disc list-inside mb-10">
          <li>Faster load times and better user experience</li>
          <li>Higher Google Lighthouse and Core Web Vitals scores</li>
          <li>Better SEO performance</li>
          <li>Lower security risks</li>
          <li>Lower long-term maintenance costs</li>
        </ul>

        {/* WHO IT'S FOR */}
        <h2 className="text-2xl font-semibold mb-4">
          Who this is for
        </h2>

        <ul className="space-y-3 text-white/70 list-disc list-inside mb-10">
          <li>Creators and personal brands</li>
          <li>Startups and SaaS products</li>
          <li>Small businesses and agencies</li>
          <li>Founders launching new products</li>
          <li>Brands running paid ad campaigns</li>
        </ul>

        {/* PROCESS */}
        <h2 className="text-2xl font-semibold mb-4">
          Our design & build process
        </h2>

        <ol className="space-y-3 text-white/70 list-decimal list-inside mb-10">
          <li>Understand your brand, audience, and goals</li>
          <li>Design layout, structure, and page flow</li>
          <li>Build responsive frontend components</li>
          <li>Optimize for SEO, speed, and accessibility</li>
          <li>Deploy and launch your website</li>
        </ol>

        {/* CTA */}
        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/plans"
            className="rounded-xl bg-violet-600 px-8 py-4 font-medium hover:opacity-90 transition"
          >
            View Website Plans →
          </Link>

          <a
            href="https://wa.me/917889386542"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/20 px-8 py-4 font-medium text-white/80 hover:border-white/40 transition"
          >
            Talk on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
