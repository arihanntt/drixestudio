"use client";

import { useState } from "react";
// Assuming these imports exist in your project
import { faqData } from "./faq-data"; 
import FaqSchema from "./FaqSchema";
import { linkifyPricing } from "./utils/linkify";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  // --- UTILS ---
  const escapeRegExp = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const highlight = (text: string) => {
    if (!query) return text;
    const safe = escapeRegExp(query);
    return text.replace(
      new RegExp(`(${safe})`, "gi"),
      // Retro Highlight: Green background, black text
      `<mark class="bg-green-500 text-black font-bold px-0.5">$1</mark>`
    );
  };

  // Get unique categories for the sidebar
  const categories = ["all", ...Array.from(new Set(faqData.map((s) => s.category)))];

  const sections = faqData.filter((s) =>
    category === "all" ? true : s.category === category
  );

  return (
    <>
      <FaqSchema data={faqData} />

      <section className="min-h-screen bg-black px-4 py-32 font-mono text-zinc-300 sm:px-6">
        
        {/* --- BACKGROUND GRID --- */}
        <div 
            className="pointer-events-none absolute inset-0 z-0 opacity-20"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* --- SIDEBAR (INLINED FOR RETRO STYLE) --- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
                <div className="mb-6 border-b border-white/20 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                        // Index_Directory
                    </h3>
                </div>
                <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`group flex items-center justify-between border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                                category === cat 
                                ? "border-white bg-white text-black" 
                                : "border-white/20 bg-black text-zinc-500 hover:border-white hover:text-white"
                            }`}
                        >
                            <span>{cat}</span>
                            {category === cat && <span className="text-[10px] animate-pulse">●</span>}
                        </button>
                    ))}
                </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="lg:col-span-3">
            
            {/* Header */}
            <div className="mb-12 border-l-4 border-white pl-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    <span className="h-2 w-2 bg-green-500" />
                    System_Help
                </div>
                <h1 className="mt-4 text-4xl font-bold uppercase tracking-tighter text-white">
                  Faq
                </h1>
            </div>

            {/* Retro Search Input */}
            <div className="group relative mb-16">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-green-500">
                    {`>`}
                </div>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="QUERY_DATABASE..."
                    className="w-full border border-white/20 bg-black py-4 pl-10 pr-4 font-mono text-sm text-white placeholder-zinc-700 outline-none transition-colors focus:border-green-500 focus:bg-green-900/5"
                />
                <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-[10px] uppercase text-zinc-600 sm:block">
                    [Enter] to Search
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-20">
              {sections.map((section) => (
                <div key={section.title}>
                  {/* Section Title */}
                  <div className="mb-8 flex items-center gap-4">
                     <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                        [{section.title}]
                     </h2>
                     <div className="h-px flex-1 bg-white/20" />
                  </div>

                  <div className="grid gap-px border border-white/20 bg-white/20">
                    {section.faqs
                      .filter(
                        (f) =>
                          f.q.toLowerCase().includes(query.toLowerCase()) ||
                          f.a.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((faq, i) => (
                        <div
                          key={i}
                          className="group relative bg-black p-8 transition-all hover:bg-white hover:text-black"
                        >
                          {/* Corner Accent */}
                          <div className="absolute right-0 top-0 h-0 w-0 border-l-[10px] border-t-[10px] border-l-transparent border-t-white opacity-0 transition-opacity group-hover:opacity-100" />  

                          <div className="mb-4 flex items-start gap-3">
                             <span className="mt-1 text-xs font-bold text-green-500 group-hover:text-black">Q:</span>
                             <h3
                                className="text-lg font-bold uppercase leading-tight"
                                dangerouslySetInnerHTML={{
                                    __html: highlight(faq.q),
                                }}
                             />
                          </div>

                          <div className="flex items-start gap-3">
                            <span className="mt-1 text-xs font-bold text-zinc-600 group-hover:text-black/50">A:</span>
                            <div
                                className="text-sm leading-relaxed text-zinc-400 group-hover:text-black/80"
                                dangerouslySetInnerHTML={{
                                    __html: linkifyPricing(highlight(faq.a)),
                                }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  {/* Empty State Check */}
                  {section.faqs.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                      <div className="border border-dashed border-white/20 p-8 text-center text-sm text-zinc-500">
                          [!] No_Data_Found
                      </div>
                  )}

                </div>
              ))}
            </div>
          </main>
        </div>
      </section>
    </>
  );
}