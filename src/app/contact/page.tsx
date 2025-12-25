import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Drixe Studio | WhatsApp, Discord & Telegram",
  description:
    "Official contact page for Drixe Studio. Reach out via WhatsApp, Discord, or Telegram for Discord servers, websites, and social media projects.",
  alternates: {
    canonical: "https://drixestudio.services/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-black text-white py-32">
      <div className="mx-auto max-w-6xl px-6">

        {/* Structured Data for AI & Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Drixe Studio",
              url: "https://drixestudio.services",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  availableLanguage: "English",
                  url: "https://wa.me/917889386542"
                },
                {
                  "@type": "ContactPoint",
                  contactType: "Discord",
                  availableLanguage: "English",
                  url: "https://discord.com/users/928934131893686292"
                },
                {
                  "@type": "ContactPoint",
                  contactType: "Telegram",
                  availableLanguage: "English",
                  url: "https://t.me/drixe1"
                }
              ]
            }),
          }}
        />

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-violet-400 mb-4">
            Contact Drixe Studio
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Talk directly with us
          </h1>

          <p className="text-white/70 max-w-2xl mx-auto">
            No forms. No waiting.
            <br />
            Reach us instantly to start your Discord server, website,
            or social media project.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* WhatsApp */}
          <a
            href="https://wa.me/917889386542"
            target="_blank"
            className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-10 hover:border-violet-500 transition"
          >
            <h3 className="text-2xl font-semibold mb-3">
              WhatsApp
            </h3>
            <p className="text-white/60 text-sm mb-8">
              Fastest way to discuss projects and pricing.
            </p>
            <span className="inline-block rounded-full bg-violet-600 px-7 py-3 text-sm font-medium group-hover:opacity-90">
              Message on WhatsApp →
            </span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.com/users/928934131893686292"
            target="_blank"
            className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-10 hover:border-indigo-500 transition"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Discord
            </h3>
            <p className="text-white/60 text-sm mb-8">
              Best for long-term collaboration & server planning.
            </p>
            <span className="inline-block rounded-full bg-indigo-600 px-7 py-3 text-sm font-medium group-hover:opacity-90">
              DM: drixeeee →
            </span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/drixe1"
            target="_blank"
            className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-10 hover:border-sky-500 transition"
          >
            <h3 className="text-2xl font-semibold mb-3">
              Telegram
            </h3>
            <p className="text-white/60 text-sm mb-8">
              Quick chats and lightweight discussions.
            </p>
            <span className="inline-block rounded-full bg-sky-600 px-7 py-3 text-sm font-medium group-hover:opacity-90">
              Message on Telegram →
            </span>
          </a>
        </div>

        {/* Trust Footer */}
        <p className="mt-20 text-center text-sm text-white/40">
          Typical response time: under 24 hours
        </p>
      </div>
    </main>
  );
}
