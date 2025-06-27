import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaDiscord, FaSearch } from "react-icons/fa";

const mainFaqs = [
  { question: "❓ What is Drixe Studio?", answer: "Drixe Studio is your go-to service for premium Discord server orders — offering UI design, bot setup, security, and full customization." },
  { question: "📦 What services do you offer?", answer: "We build full Discord communities: setups, bot systems, role management, UI design, branding, moderation tools, and more." },
  { question: "💸 What payment methods are accepted?", answer: "We accept UPI, PayPal, and crypto — all payments are secure and handled directly." },
  { question: "⏱️ How long does an order take?", answer: "Depending on complexity, 1–3 days is standard. You'll get live updates throughout via Discord." },
  { question: "📞 Can I talk to someone before ordering?", answer: "Yes! Reach out on Discord anytime — we respond fast." },
  { question: "🔒 Is my server data safe?", answer: "Absolutely. No data is reused or shared — your build is uniquely yours and fully secure." },
];

const extraFaqs = [
  { question: "🌐 Do you offer multilingual support?", answer: "Yes, we can create Discord servers in multiple languages." },
  { question: "🎁 Do you do giveaways?", answer: "Yes, especially during events. We also build giveaway systems for your server." },
  { question: "🛠 Can I update my server later?", answer: "Yes, all plans support post-delivery updates. Some even include lifetime updates." },
  { question: "🎶 Can you add a music bot?", answer: "Yes, a clean and legal music bot can be added in any plan." },
  { question: "🛡️ Do you add anti-raid protection?", answer: "Yes — bots, role locks, and logging help prevent attacks." },
  { question: "🌸 Can you theme the server like anime or Kawaii?", answer: "Absolutely — themes like Sakura, Cyberpunk, Cottagecore, etc., are supported." },
  // Add more...
];

const categories = [
  { name: "Top Questions", faqs: mainFaqs },
  { name: "More FAQs", faqs: extraFaqs },
];

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const currentFaqs = categories[activeTab].faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 px-4 bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-10 text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text">
          ✨ Frequently Asked Questions
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-4">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => {
                setActiveTab(i);
                setSearchQuery("");
                setOpenIndex(null);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
                activeTab === i
                  ? "bg-blurple text-white border-blurple shadow"
                  : "border-gray-600 text-gray-300 hover:text-white hover:border-blurple"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-8">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search a question..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1a1a1a] text-sm border border-blurple/30 focus:ring-2 focus:ring-blurple focus:outline-none shadow-md placeholder:text-gray-500"
          />
        </div>

        {/* FAQs */}
        <div className="grid md:grid-cols-2 gap-6">
          {currentFaqs.length > 0 ? (
            currentFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="bg-[#1a1a1a]/60 border border-blurple/30 rounded-2xl shadow-xl p-5 backdrop-blur-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left text-lg font-semibold"
                >
                  {faq.question}
                  <motion.span
                    initial={false}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.p
                      className="mt-3 text-sm text-gray-300"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-2 text-gray-500">No results found.</p>
          )}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-blurple/20 to-transparent border border-blurple/40 rounded-2xl p-8 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">Still have a question?</h3>
          <p className="text-gray-300 mb-4">Hit us up on Discord and we’ll answer you right away.</p>
          <a
            href="https://discord.com/users/928934131893686292"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5865F2] text-white font-semibold shadow-md transition hover:scale-105 hover:shadow-indigo-500/30 ring-1 ring-blurple"
          >
            <FaDiscord className="text-lg" />
            <span>Ask drixeeee</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
