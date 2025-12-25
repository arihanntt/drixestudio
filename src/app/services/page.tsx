import type { Metadata } from "next";
import Link from "next/link";
import ServicesFaqSchema from "./ServicesFaqSchema";

export const metadata: Metadata = {
  title: "Services | Websites, Discord & Social Media | Drixe Studio",
  description:
    "Explore Drixe Studio services — professional Discord server setup, modern website & landing page design, and short-form social media content creation.",
  keywords: [
    "Drixe Studio services",
    "discord server setup services",
    "discord server designer",
    "website design services",
    "landing page designer",
    "social media content creation",
    "reels editing services",
    "short form video editor",
  ],
};

export default function ServicesPage() {
  return (
    <>
  <ServicesFaqSchema />
    <main className="bg-black text-white py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* ================= HERO ================= */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h1>

          <p className="text-white/70 max-w-3xl text-lg">
            Drixe Studio builds clean, scalable digital systems for creators,
            brands, and communities. From Discord servers to websites and
            short-form content — we focus on structure, performance, and growth.
          </p>
        </section>

        {/* ================= DISCORD ================= */}
        <section className="mb-24 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Discord Server Setup & Automation
            </h2>

            <p className="text-white/70 mb-6">
              We design professional Discord servers built for long-term growth,
              moderation, and engagement. Every system is structured, secure,
              and easy to manage.
            </p>

            <ul className="space-y-3 text-white/70 list-disc list-inside mb-8">
              <li>Complete server structure & channel layout</li>
              <li>Roles, permissions & staff hierarchy</li>
              <li>Bot setup, automation & moderation</li>
              <li>Anti-raid, verification & security systems</li>
              <li>Tickets, leveling & engagement tools</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/discord-server-setup"
                className="rounded-xl bg-violet-600 px-6 py-3 font-medium hover:opacity-90 transition"
              >
                View Discord Service →
              </Link>

              <Link
                href="/plans"
                className="rounded-xl border border-white/20 px-6 py-3 font-medium text-white/80 hover:border-white/40 transition"
              >
                View Pricing
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 p-8 bg-white/5">
            <p className="text-sm uppercase text-white/50 mb-3">
              Ideal for
            </p>
            <p className="text-white/80">
              Creators, gaming communities, startups, NFT projects, online
              businesses, and brands that want a professional Discord presence.
            </p>
          </div>
        </section>

        {/* ================= WEBSITE ================= */}
        <section className="mb-24 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Website & Landing Page Design
            </h2>

            <p className="text-white/70 mb-6">
              We build fast, SEO-ready websites using modern frontend
              architecture. No bloated builders. No unnecessary backend.
            </p>

            <ul className="space-y-3 text-white/70 list-disc list-inside mb-8">
              <li>Business websites & portfolios</li>
              <li>Landing pages for ads & launches</li>
              <li>SaaS marketing websites</li>
              <li>Mobile-first, responsive design</li>
              <li>SEO, performance & clean structure</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/website-design"
                className="rounded-xl bg-violet-600 px-6 py-3 font-medium hover:opacity-90 transition"
              >
                View Website Service →
              </Link>

              <Link
                href="/plans"
                className="rounded-xl border border-white/20 px-6 py-3 font-medium text-white/80 hover:border-white/40 transition"
              >
                View Pricing
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 p-8 bg-white/5">
            <p className="text-sm uppercase text-white/50 mb-3">
              Built for
            </p>
            <p className="text-white/80">
              Founders, startups, creators, agencies, and brands that want fast,
              clean websites that convert and rank on Google.
            </p>
          </div>
        </section>

        {/* ================= SOCIAL ================= */}
        <section className="mb-24 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Social Media & Short-Form Content
            </h2>

            <p className="text-white/70 mb-6">
              We create high-retention short-form content optimized for reach,
              algorithms, and brand consistency across platforms.
            </p>

            <ul className="space-y-3 text-white/70 list-disc list-inside mb-8">
              <li>Instagram Reels, YouTube Shorts & TikTok</li>
              <li>Hook-focused video edits</li>
              <li>Brand-aligned visuals & pacing</li>
              <li>Posting-ready, optimized formats</li>
              <li>Content structure & guidance</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/social-media-content"
                className="rounded-xl bg-violet-600 px-6 py-3 font-medium hover:opacity-90 transition"
              >
                View Content Service →
              </Link>

              <Link
                href="/plans"
                className="rounded-xl border border-white/20 px-6 py-3 font-medium text-white/80 hover:border-white/40 transition"
              >
                View Pricing
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 p-8 bg-white/5">
            <p className="text-sm uppercase text-white/50 mb-3">
              Perfect for
            </p>
            <p className="text-white/80">
              Creators, businesses, and teams that want consistent growth through
              short-form content without managing everything themselves.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="text-center mt-32">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Not sure which service fits you?
          </h2>

          <p className="text-white/70 mb-10 max-w-2xl mx-auto">
            Tell us your goal and we’ll recommend the best setup — Discord,
            website, content, or a combination.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/plans"
              className="rounded-xl bg-violet-600 px-8 py-4 font-medium hover:opacity-90 transition"
            >
              View Plans
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
        </section>

      </div>
    </main>
    </>
  );
}
