import { faqData } from "../faq-data";
import FaqSchema from "../FaqSchema";
import { notFound } from "next/navigation";

export default function CategoryFaqPage({
  params
}: {
  params: { category: string };
}) {
  const section = faqData.find(
    s => s.category === params.category
  );

  if (!section) return notFound();

  return (
    <>
      <FaqSchema data={[section]} />

      <main className="min-h-screen bg-black text-white px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-10">
            {section.title} FAQ
          </h1>

          <div className="space-y-6">
            {section.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 p-6"
              >
                <h2 className="font-semibold text-lg">
                  {faq.q}
                </h2>
                <p className="mt-2 text-white/70">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
