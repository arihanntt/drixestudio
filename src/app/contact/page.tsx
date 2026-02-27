import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Drixe Studio | Custom Websites & Discord Setup",
  description:
    "Get in touch with Drixe Studio to discuss your project. We offer direct support via WhatsApp, Discord, or Telegram for website development and Discord setups.",
  alternates: {
    canonical: "https://www.drixestudio.services/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="relative w-full bg-black text-white pt-32 pb-40 overflow-hidden border-t border-white/10 selection:bg-cyan-500 selection:text-black">
      
      {/* --- Corrected Structured Data for SEO Authority --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Drixe Studio",
            "url": "https://www.drixestudio.services",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "contactType": "sales",
                "availableLanguage": "English",
                "url": "https://wa.me/916005956542"
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

      {/* --- THE MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">
        
        {/* --- 1. HEADER BLOCK (Split Layout) --- */}
        <header className="mb-20 md:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/10 pb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <span className="h-[2px] w-12 bg-cyan-500 block" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                Direct Access
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-black uppercase leading-[0.85] tracking-tighter">
              Start Your <br />
              <span className="text-white/40">Project.</span>
            </h1>
          </div>

          <div className="lg:max-w-sm pb-2">
            <p className="text-base md:text-lg text-white/50 font-medium leading-relaxed">
              No long forms. No automated emails. Choose a platform below to message our team directly. We typically reply within a few hours.
            </p>
          </div>
        </header>

        {/* --- 2. CONTACT CHANNELS (Brutalist Bento Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">

          {/* WhatsApp */}
          <a
            href="https://wa.me/917889386542"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-black p-10 md:p-14 transition-colors duration-500 hover:bg-[#050505] overflow-hidden flex flex-col justify-between min-h-[320px]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-6">
                WhatsApp
              </h3>
              <p className="text-sm text-white/50 font-medium leading-relaxed">
                The fastest way to get a price quote and check our availability.
              </p>
            </div>
            
            <span className="inline-block mt-12 text-[11px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-cyan-400 transition-colors duration-300">
              Message Us →
            </span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.com/users/928934131893686292"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-black p-10 md:p-14 transition-colors duration-500 hover:bg-[#050505] overflow-hidden flex flex-col justify-between min-h-[320px]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-6">
                Discord
              </h3>
              <p className="text-sm text-white/50 font-medium leading-relaxed">
                Best for discussing complex server setups and sharing reference files.
              </p>
            </div>
            
            <span className="inline-block mt-12 text-[11px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-cyan-400 transition-colors duration-300">
              DM: Drixeeee →
            </span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/drixe1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-black p-10 md:p-14 transition-colors duration-500 hover:bg-[#050505] overflow-hidden flex flex-col justify-between min-h-[320px]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            <div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-6">
                Telegram
              </h3>
              <p className="text-sm text-white/50 font-medium leading-relaxed">
                Ideal for quick technical questions and following up on active projects.
              </p>
            </div>
            
            <span className="inline-block mt-12 text-[11px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-cyan-400 transition-colors duration-300">
              Message Us →
            </span>
          </a>
        </div>

        {/* --- 3. TRUST FOOTER --- */}
        <footer className="mt-20 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">
            Drixe Studio // Global Operations
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">
             We will schedule an onboarding call for complex builds.
          </div>
        </footer>

      </div>
    </main>
  );
}