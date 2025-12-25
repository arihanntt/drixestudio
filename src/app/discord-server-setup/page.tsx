import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discord Server Setup & Design | Drixe Studio",
  description:
    "Professional Discord server setup, automation, moderation systems, bots, security, and branding for creators, businesses, and online communities.",
  keywords: [
    "discord server setup",
    "discord server designer",
    "discord automation",
    "discord moderation",
    "discord bots setup",
    "professional discord server",
    "custom discord server design"
  ],
};

export default function DiscordServerSetupPage() {
  return (
    <main className="bg-black text-white py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* HERO */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Professional Discord Server Setup & Design
        </h1>

        <p className="text-white/70 mb-10 max-w-3xl">
          Drixe Studio designs clean, scalable, and secure Discord servers
          built for creators, brands, gaming communities, and startups.
          We focus on long-term structure, automation, moderation, and growth —
          not just visuals.
        </p>

        {/* WHAT WE DO */}
        <h2 className="text-2xl font-semibold mb-4">
          What we do
        </h2>

        <ul className="space-y-3 text-white/70 list-disc list-inside mb-10">
          <li>Complete Discord server structure & channel organization</li>
          <li>Roles, permissions, and staff hierarchy</li>
          <li>Bot setup, automation & custom workflows</li>
          <li>Anti-raid, verification & moderation systems</li>
          <li>Ticket systems, leveling & engagement tools</li>
          <li>Branding, emojis, server visuals & UI polish</li>
        </ul>

        {/* WHY IT MATTERS */}
        <h2 className="text-2xl font-semibold mb-4">
          Why professional setup matters
        </h2>

        <p className="text-white/70 mb-8 max-w-3xl">
          Poorly structured Discord servers become chaotic, insecure, and hard
          to scale. A professionally designed server improves moderation,
          onboarding, engagement, and staff efficiency — especially as your
          community grows.
        </p>

        {/* WHO IT'S FOR */}
        <h2 className="text-2xl font-semibold mb-4">
          Who this is for
        </h2>

        <ul className="space-y-3 text-white/70 list-disc list-inside mb-10">
          <li>Content creators & streamers</li>
          <li>Gaming communities & esports teams</li>
          <li>Startups & SaaS communities</li>
          <li>NFT, Web3 & crypto projects</li>
          <li>Brands running customer or fan communities</li>
        </ul>

        {/* PROCESS */}
        <h2 className="text-2xl font-semibold mb-4">
          Our setup process
        </h2>

        <ol className="space-y-3 text-white/70 list-decimal list-inside mb-10">
          <li>Understand your goals, audience, and use-case</li>
          <li>Design server structure and role hierarchy</li>
          <li>Configure bots, automation, and moderation</li>
          <li>Apply branding and UI polish</li>
          <li>Test security, permissions, and flows</li>
          <li>Deliver a launch-ready server</li>
        </ol>

        {/* CTA */}
        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/plans"
            className="rounded-xl bg-violet-600 px-8 py-4 font-medium hover:opacity-90 transition"
          >
            View Discord Plans →
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
