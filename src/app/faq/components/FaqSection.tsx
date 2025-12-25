"use client";

import FaqItem from "./FaqItem";

interface Faq {
  q: string;
  a: string;
}

interface FaqSectionProps {
  title: string;
  faqs: Faq[];
  query: string;
}

export default function FaqSection({
  title,
  faqs,
  query,
}: FaqSectionProps) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <FaqItem
            key={i}
            question={faq.q}
            answer={faq.a}
            query={query}
          />
        ))}
      </div>
    </section>
  );
}
