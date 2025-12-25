import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Social Media & Reels Editing | Drixe Studio",
  description:
    "Short-form video editing and content systems for Instagram Reels, YouTube Shorts, and TikTok. Built for creators, brands, and businesses that want consistent growth.",
  keywords: [
    "reels editor",
    "short form video editor",
    "social media content",
    "instagram reels editing",
    "youtube shorts editor",
    "tiktok video editor",
    "content creation services",
    "video editing for creators",
  ],
};

export default function SocialMediaContentPage() {
  return (
    <main className="bg-black text-white py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* HERO */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Social Media & Short-Form Content Creation
        </h1>

        <p className="text-white/70 mb-12 max-w-3xl">
          Drixe Studio creates high-impact short-form video content designed
          for reach, retention, and consistency. Our edits are optimized for
          platform algorithms while maintaining strong brand identity.
        </p>

        {/* WHAT WE DO */}
        <h2 className="text-2xl font-semibold mb-4">
          What we do
        </h2>

        <ul className="space-y-3 text-white/70 list-disc list-inside mb-10">
          <li>Short-form video editing for social platforms</li>
          <li>Reels, Shorts, and TikTok-style content</li>
          <li>Hook-focused, high-retention edits</li>
          <li>Brand-consistent visuals and pacing</li>
          <li>Posting-ready videos optimized for algorithms</li>
        </ul>

        {/* PLATFORMS */}
        <h2 className="text-2xl font-semibold mb-4">
          Platforms we support
        </h2>

        <ul className="space-y-3 text-white/70 list-disc list-inside mb-10">
          <li>Instagram Reels</li>
          <li>YouTube Shorts</li>
          <li>TikTok</li>
        </ul>

        {/* WHY SHORT FORM */}
        <h2 className="text-2xl font-semibold mb-4">
          Why short-form content matters
        </h2>

        <p className="text-white/70 mb-8 max-w-3xl">
          Short-form video is currently the fastest-growing content format.
          Platforms actively push Reels, Shorts, and TikTok videos to new
          audiences, making it one of the most effective ways to grow reach,
          engagement, and brand awareness.
        </p>

        {/* WHAT YOU GET */}
        <h2 className="text-2xl font-semibold mb-4">
          What you get with Drixe Studio
        </h2>

        <ul className="space-y-3 text-white/70 list-disc list-inside mb-10">
          <li>Clean, modern video edits</li>
          <li>Strong hooks in the first 1–3 seconds</li>
          <li>Platform-optimized pacing and cuts</li>
          <li>Brand-aligned colors, fonts, and style</li>
          <li>Captions and posting guidance</li>
        </ul>

        {/* WHO IT’S FOR */}
        <h2 className="text-2xl font-semibold mb-4">
          Who this service is for
        </h2>

        <ul className="space-y-3 text-white/70 list-disc list-inside mb-10">
          <li>Creators building a personal brand</li>
          <li>Businesses growing on social media</li>
          <li>Startups and founders</li>
          <li>Agencies needing consistent content</li>
          <li>Anyone focused on organic growth</li>
        </ul>

        {/* PROCESS */}
        <h2 className="text-2xl font-semibold mb-4">
          Our content workflow
        </h2>

        <ol className="space-y-3 text-white/70 list-decimal list-inside mb-12">
          <li>Understand your niche, audience, and goals</li>
          <li>Define content style and brand direction</li>
          <li>Edit videos with high-retention structure</li>
          <li>Optimize pacing for platform algorithms</li>
          <li>Deliver posting-ready content consistently</li>
        </ol>

        {/* CTA */}
        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/plans"
            className="rounded-xl bg-violet-600 px-8 py-4 font-medium hover:opacity-90 transition"
          >
            View Content Plans →
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
