import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaDiscord, FaSearch } from "react-icons/fa";

const mainFaqs = [
  {
    question: "❓ What is Drixe Studio?",
    answer: "Drixe Studio is your go-to service for premium Discord server orders — offering UI design, bot setup, security, and full customization.",
  },
  {
    question: "📦 What services do you offer?",
    answer: "We build full Discord communities: setups, bot systems, role management, UI design, branding, moderation tools, and more.",
  },
  {
    question: "💸 What payment methods are accepted?",
    answer: "We accept UPI, PayPal, and crypto — all payments are secure and handled directly.",
  },
  {
    question: "⏱️ How long does an order take?",
    answer: "Depending on complexity, 1–3 days is standard. You'll get live updates throughout via Discord.",
  },
  {
    question: "📞 Can I talk to someone before ordering?",
    answer: "Yes! Reach out on Discord anytime — we respond fast.",
  },
  {
    question: "🔒 Is my server data safe?",
    answer: "Absolutely. No data is reused or shared — your build is uniquely yours and fully secure.",
  },
];

// 🔍 50+ searchable FAQs (only show if searched)
const extraFaqs = [
  { question: "🌐 Do you offer multilingual support?", answer: "Yes, we can create Discord servers in multiple languages." },
  { question: "📊 Can you include analytics in the server?", answer: "We can integrate bot-based analytics or suggest tools for tracking engagement." },
  { question: "🎨 Can I provide my own branding?", answer: "Definitely! Your logos, themes, or emoji styles can be used directly." },
  { question: "🛠 Can I update my server later?", answer: "Yes, all plans support post-delivery updates. Some even include lifetime updates." },
  { question: "📁 Will I receive a backup of my setup?", answer: "Yes. We provide a final overview or file backup if requested." },
  { question: "🧠 Do I need to know Discord bots to manage my server?", answer: "Nope! We explain everything or give docs per bot system." },
  { question: "🎁 Do you do giveaways?", answer: "Yes, especially during events. We also build giveaway systems for your server." },
  { question: "💼 Can you make a server for my business?", answer: "Yes — portfolio, SaaS, NFT, gaming, agency, and more." },
  { question: "📌 Can you set up rules, verification, and roles?", answer: "All plans include full setup of rules, role systems, and onboarding." },
  { question: "📆 Do you do events setup like Q&A or calendars?", answer: "Yes, we integrate Q&A rooms, bots, event alerts, and more." },
  { question: "💬 Can you add auto-responders or custom bot replies?", answer: "Yes, our bots can handle automated messages, replies, and actions." },
  { question: "🎫 Can you build a ticketing system?", answer: "Every plan can include tickets — custom channels, buttons, and support flows." },
  { question: "🔗 Will my invite links be optimized?", answer: "Yes — clean invite pages, custom links, and growth setups." },
  { question: "📣 Do you offer announcement channels?", answer: "Yes, with follower sync, embed styling, and alert systems." },
  { question: "🎶 Can you add a music bot?", answer: "Yes, a clean and legal music bot can be added in any plan." },
  { question: "🖼️ Can you help design my server banner?", answer: "Yes, we do full server branding, including banners and welcome screens." },
  { question: "👥 Can I make my server girls-only?", answer: "Yes, we can add VC access systems and gender prompts if needed." },
  { question: "🛡️ Do you add anti-raid protection?", answer: "Yes — bots, role locks, and logging help prevent attacks." },
  { question: "📈 Do you help with server growth?", answer: "Yes — through SEO setup, engagement systems, and retention flows." },
  { question: "🌸 Can you theme the server like anime or Kawaii?", answer: "Absolutely — themes like Sakura, Cyberpunk, Cottagecore, etc., are supported." },
  // ...add up to 50 like this
];

const allFaqs = [...mainFaqs, ...extraFaqs];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = allFaqs
    .filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, searchQuery ? 100 : mainFaqs.length);

  return (
    <section id="faq" className="py-20 px-4 bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 glow-text text-blurple">
          ✨ Frequently Asked Questions
        </h2>

     
<div className="mb-10 max-w-xl mx-auto">
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FaSearch className="text-gray-400" />
    </div>

    <div className="relative z-[40] max-w-xl mx-auto mb-10">
  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
  <input
    type="text"
    placeholder="Search a question..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1a1a1a] text-sm border transition-all duration-300 ease-in-out shadow-md
      ${searchQuery ? 'ring-2 ring-blurple border-blurple' : 'border-blurple/30 hover:ring-1 hover:ring-blurple'}
      focus:outline-none focus:ring-2 focus:ring-blurple focus:border-blurple placeholder:text-gray-500`}
  />
</div>


  </div>

  <div className="mt-2 text-sm text-gray-400 text-center">
    {!searchQuery
      ? "Only showing top 6 most asked questions. Use search to explore more →"
      : filteredFaqs.length > 6
      ? "🔍 Showing extended results for your query."
      : filteredFaqs.length === 0
      ? "No results found — try different keywords!"
      : ""}
  </div>
</div>


        {/* FAQ Entries */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1a1a1a]/50 border border-blurple/30 rounded-2xl shadow-lg backdrop-blur-md p-5"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold focus:outline-none"
              >
                <span>{faq.question}</span>
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
          ))}
        </div>

        {/* 📞 Call to Action */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-blurple/20 to-transparent border border-blurple/40 rounded-2xl p-8 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">Still have a question?</h3>
          <p className="text-gray-300 mb-4">Hit us up on Discord and we’ll answer you right away.</p>

          <div className="relative group inline-block">
            <a
              href="https://discord.com/users/928934131893686292"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5865F2] text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-blurple/50 ring-1 ring-blurple"
            >
              <FaDiscord className="text-lg" />
              <span className="font-bold">Ask drixeeee</span>
            </a>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg shadow-lg">
                💬 Click to message drixeeee on Discord!
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;


