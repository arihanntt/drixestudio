"use client";

import { useState, useMemo } from "react";
import { faqData } from "./faq-data"; 
import FaqSchema from "./FaqSchema";
import { linkifyPricing } from "./utils/linkify";

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // --- SAFE HIGHLIGHTING ---
  const highlightText = (text: string) => {
    if (!query.trim()) return text;
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${safeQuery})`, "gi");
    return text.replace(regex, `<mark class="bg-rose-500/10 text-rose-400 font-medium px-0.5">$1</mark>`);
  };

  // --- DATA FILTERING (Optimized for SEO Crawlers) ---
  const categories = useMemo(() => 
    ["all", ...Array.from(new Set(faqData.map((s) => s.category)))], 
    []
  );

  const visibleSections = useMemo(() => {
    const baseSections = activeCategory === "all" 
      ? faqData 
      : faqData.filter((s) => s.category === activeCategory);

    return baseSections.map(section => ({
      ...section,
      faqs: section.faqs.filter(f => 
        f.q.toLowerCase().includes(query.toLowerCase()) || 
        f.a.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(section => section.faqs.length > 0);
  }, [activeCategory, query]);

  return (
    <>
      {/* SEO: Schema always receives the full, unfiltered dataset */}
      <FaqSchema data={faqData} />

      <section className="min-h-screen bg-[#0a0a0a] px-6 py-32 selection:bg-zinc-800 selection:text-white">
        
        <div className="relative z-10 mx-auto max-w-7xl">
          
          {/* HEADER: Trust & Reassurance */}
          <header className="mb-24 max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-6 block">
              Support & Logistics
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif italic text-white leading-tight mb-8">
              Frequently asked <br className="hidden md:block" /> inquiries.
            </h1>
            <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed italic">
              Clear answers to common questions regarding our operational standards, 
              ownership policies, and engagement frameworks.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            
            {/* SIDEBAR: Plain Language Index */}
            <aside className="lg:col-span-3">
              <div className="sticky top-32">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-700 mb-8 border-b border-zinc-900 pb-2">
                  Directory
                </h3>
                <nav className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeCategory === cat 
                          ? "text-white pl-4 border-l border-white" 
                          : "text-zinc-600 hover:text-zinc-400 pl-0 border-l border-transparent"
                      }`}
                    >
                      {cat === "all" ? "All Inquiries" : cat}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="lg:col-span-9">
              
              {/* SEARCH: Accessible & Intuitive */}
              <div className="relative mb-20 border-b border-zinc-900 pb-4 focus-within:border-zinc-500 transition-colors group">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full bg-transparent pt-8 text-xl sm:text-2xl font-serif italic text-white placeholder-zinc-800 outline-none"
                />
                <span className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-zinc-700 font-bold">
                  Search keyword
                </span>
              </div>

              {/* FAQ SECTIONS */}
              <div className="space-y-32">
                {visibleSections.length > 0 ? (
                  visibleSections.map((section) => (
                    <div key={section.title}>
                      {/* Section Heading */}
                      <div className="mb-12 flex items-baseline gap-4">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white">
                          {section.title}
                        </h2>
                        <div className="h-px flex-1 bg-zinc-900" />
                      </div>

                      {/* Question List */}
                      <div className="grid gap-px bg-zinc-900 border border-zinc-900">
                        {section.faqs.map((faq, i) => (
                          <div
                            key={i}
                            className="bg-[#0a0a0a] p-10 transition-colors duration-500 hover:bg-[#0d0d0d] group"
                          >
                            <div className="flex items-start gap-8">
                               <span className="font-mono text-[9px] text-zinc-800 mt-2">
                                 {String(i + 1).padStart(2, '0')}
                               </span>
                               <div className="flex-1">
                                  <h3 
                                    className="text-lg sm:text-xl font-medium text-white mb-6 tracking-tight leading-snug"
                                    dangerouslySetInnerHTML={{ __html: highlightText(faq.q) }}
                                  />
                                  <div
                                    className="text-sm sm:text-base leading-relaxed text-zinc-500 font-light italic font-serif tracking-wide"
                                    dangerouslySetInnerHTML={{
                                      __html: linkifyPricing(highlightText(faq.a)),
                                    }}
                                  />
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="border border-dashed border-zinc-900 py-20 text-center">
                    <p className="text-xs uppercase tracking-widest text-zinc-700">
                      No matching questions found in the database.
                    </p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}