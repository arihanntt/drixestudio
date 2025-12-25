"use client";

import { useState } from "react";
import { faqData } from "./faq-data";
import CategorySidebar from "./CategorySidebar";
import FaqSchema from "./FaqSchema";
import { linkifyPricing } from "./utils/linkify";

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const escapeRegExp = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const highlight = (text: string) => {
    if (!query) return text;
    const safe = escapeRegExp(query);
    return text.replace(
      new RegExp(`(${safe})`, "gi"),
      `<mark class="bg-violet-500/30 rounded px-1">$1</mark>`
    );
  };

  const sections = faqData.filter(s =>
    category === "all" ? true : s.category === category
  );

  return (
    <>
      <FaqSchema data={faqData} />

      <section className="min-h-screen bg-black text-white px-4 sm:px-6 py-28">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-10">

          <CategorySidebar active={category} setActive={setCategory} />

          <main className="lg:col-span-3">
            <h1 className="text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h1>

            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="mb-10 w-full rounded-xl bg-white/5 px-5 py-4 text-sm outline-none border border-white/10 focus:border-violet-500"
            />

            {sections.map(section => (
              <div key={section.title} className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">
                  {section.title}
                </h2>

                <div className="space-y-5">
                  {section.faqs
                    .filter(
                      f =>
                        f.q.toLowerCase().includes(query.toLowerCase()) ||
                        f.a.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((faq, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/10 p-6"
                      >
                        <p
                          className="font-medium"
                          dangerouslySetInnerHTML={{
                            __html: highlight(faq.q),
                          }}
                        />
                       <p
  className="mt-3 text-white/70"
  dangerouslySetInnerHTML={{
    __html: linkifyPricing(highlight(faq.a)),
  }}
/>

                        
                      </div>
                      
                    ))}
                </div>
              </div>
            ))}
          </main>
        </div>
      </section>
    </>
  );
}
