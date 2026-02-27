"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { faqData } from "./faq-data"; 
import FaqSchema from "./FaqSchema";
import { linkifyPricing } from "./utils/linkify";

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // --- SAFE HIGHLIGHTING (Upgraded to Cyan Branding) ---
  const highlightText = (text: string) => {
    if (!query.trim()) return text;
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${safeQuery})`, "gi");
    // Using the exact branding cyan for the search highlight
    return text.replace(regex, `<mark class="bg-cyan-500/20 text-cyan-400 font-bold px-1 rounded-sm">$1</mark>`);
  };

  // --- DATA FILTERING ---
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

      <main className="relative w-full bg-black text-white pt-32 pb-40 overflow-hidden border-t border-white/10 selection:bg-cyan-500 selection:text-black">
        
        {/* --- THE MASTER GRID LINES --- */}
        <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
          <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
          <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">
          
          {/* --- 1. HEADER BLOCK (Split Layout) --- */}
          <header className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/10 pb-12">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center gap-6 mb-8"
              >
                <span className="h-[2px] w-12 bg-cyan-500 block" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  Client Support
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl lg:text-[7rem] font-black uppercase leading-[0.85] tracking-tighter"
              >
                Common <br />
                <span className="text-white/40">Questions.</span>
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="md:max-w-sm pb-2"
            >
              <p className="text-base md:text-lg text-white/50 font-medium leading-relaxed">
                Clear answers about our project timelines, pricing, ownership policies, and how we deliver your final product.
              </p>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            
            {/* --- 2. SIDEBAR: DIRECTORY --- */}
            <aside className="lg:col-span-3">
              <div className="sticky top-32">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 border-b border-white/10 pb-4">
                  Categories
                </h3>
                <nav className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                        activeCategory === cat 
                          ? "text-black bg-white px-4" 
                          : "text-white/40 hover:text-white px-4 hover:bg-white/5"
                      }`}
                    >
                      {cat === "all" ? "All Questions" : cat}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* --- 3. MAIN CONTENT --- */}
            <main className="lg:col-span-9">
              
              {/* Massive Brutalist Search Input */}
              <div className="relative mb-20 group">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SEARCH QUESTIONS..."
                  className="w-full bg-transparent pb-6 text-3xl md:text-5xl font-black uppercase tracking-tighter text-white placeholder-white/10 outline-none border-b-2 border-white/10 focus:border-cyan-500 transition-colors duration-300"
                />
              </div>

              {/* FAQ SECTIONS */}
              <div className="space-y-24">
                {visibleSections.length > 0 ? (
                  visibleSections.map((section) => (
                    <div key={section.title}>
                      {/* Section Heading */}
                      <div className="mb-8 flex items-center gap-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                          {section.title}
                        </h2>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>

                      {/* Question List (Brutalist Bento Grid) */}
                      <div className="grid gap-px bg-white/10 border border-white/10">
                        {section.faqs.map((faq, i) => (
                          <div
                            key={i}
                            className="bg-black p-8 md:p-12 transition-colors duration-500 hover:bg-[#050505] group relative overflow-hidden"
                          >
                            {/* Cyan Hover Tape */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
                               <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-cyan-500 mt-1">
                                 0{i + 1}
                               </span>
                               
                               <div className="flex-1">
                                  <h3 
                                    className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-6 leading-[1.1]"
                                    dangerouslySetInnerHTML={{ __html: highlightText(faq.q) }}
                                  />
                                  <div
                                    className="text-sm md:text-base leading-relaxed text-white/60 font-medium max-w-3xl"
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
                  <div className="border border-white/10 bg-white/5 p-16 md:p-24 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
                      No matching questions found.
                    </p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </main>
    </>
  );
}