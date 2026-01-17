import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Drixe Studio | Direct Support & Inquiries",
  description:
    "Contact Drixe Studio to discuss your project directly via WhatsApp, Discord, or Telegram. No forms, no delays—engineered for speed and clarity.",
  alternates: {
    canonical: "https://drixestudio.services/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-[#0a0a0a] text-white py-32 selection:bg-zinc-800">
      <div className="mx-auto max-w-6xl px-6">

        {/* --- Corrected Structured Data for SEO Authority --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Drixe Studio",
              "url": "https://drixestudio.services",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "sales",
                  "availableLanguage": "English",
                  "url": "https://wa.me/917889386542"
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "technical support",
                  "availableLanguage": "English",
                  "url": "https://discord.com/users/928934131893686292"
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "customer support",
                  "availableLanguage": "English",
                  "url": "https://t.me/drixe1"
                }
              ]
            }),
          }}
        />

        {/* --- Header: Clean & Personal --- */}
        <header className="text-center mb-24">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-6 block">
            Direct Access
          </span>

          <h1 className="text-4xl md:text-6xl font-serif italic mb-8">
            Talk directly with us.
          </h1>

          <div className="max-w-2xl mx-auto border-t border-zinc-900 pt-8">
            <p className="text-zinc-400 font-light leading-relaxed italic text-base sm:text-lg">
              No forms. No waiting. We respond personally and schedule structured follow-ups for qualified projects. 
              <span className="text-zinc-600 block mt-2 not-italic text-sm">Typical response time: under 24 hours.</span>
            </p>
          </div>
        </header>

        {/* --- Contact Channels: Hairline Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">

          {/* WhatsApp */}
          <a
            href="https://wa.me/917889386542"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#0a0a0a] p-12 transition-colors duration-500 hover:bg-[#0f0f0f]"
          >
            <h3 className="text-xl font-serif italic mb-4 group-hover:text-white transition-colors">
              WhatsApp
            </h3>
            <p className="text-zinc-500 text-sm mb-12 font-light leading-relaxed">
              Fastest way to discuss project scope, architecture, and next steps.
            </p>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 border-b border-zinc-800 pb-1 group-hover:border-white group-hover:text-white transition-all">
              Launch WhatsApp →
            </span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.com/users/928934131893686292"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#0a0a0a] p-12 transition-colors duration-500 hover:bg-[#0f0f0f]"
          >
            <h3 className="text-xl font-serif italic mb-4 group-hover:text-white transition-colors">
              Discord
            </h3>
            <p className="text-zinc-500 text-sm mb-12 font-light leading-relaxed">
              Best for long-term collaboration, server architecture, and community planning.
            </p>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 border-b border-zinc-800 pb-1 group-hover:border-white group-hover:text-white transition-all">
              DM: Drixeeee →
            </span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/drixe1"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#0a0a0a] p-12 transition-colors duration-500 hover:bg-[#0f0f0f]"
          >
            <h3 className="text-xl font-serif italic mb-4 group-hover:text-white transition-colors">
              Telegram
            </h3>
            <p className="text-zinc-500 text-sm mb-12 font-light leading-relaxed">
              Ideal for quick technical queries and lightweight system discussions.
            </p>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 border-b border-zinc-800 pb-1 group-hover:border-white group-hover:text-white transition-all">
              Launch Telegram →
            </span>
          </a>
        </div>

        {/* --- Trust Footer --- */}
        <footer className="mt-24 text-center border-t border-zinc-900 pt-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-700 font-medium">
            Drixe Studio // Remote Digital Systems Studio // Global Operations
          </p>
          <p className="mt-4 text-[9px] uppercase tracking-widest text-zinc-800">
             For complex projects, we may suggest moving to a short onboarding call.
          </p>
        </footer>
      </div>
    </main>
  );
}