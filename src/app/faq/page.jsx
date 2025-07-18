// app/faq/page.jsx
'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const faqData = [
  {
    title: "🛠 Services & Features",
    faqs: [
      { q: "What services do you offer?", a: "We offer Discord server setup, revamps, bot integration, role design, security, and more." },
      { q: "Can I request a fully custom setup?", a: "Yes, we specialize in tailor-made setups to suit your community or brand." },
      { q: "Do you support game servers or clans?", a: "Absolutely. We've worked with esports teams, clans, and streamers." },
      { q: "Is bot configuration included?", a: "Yes, our plans cover bot setups like MEE6, Carl-bot, Dyno, and custom bots too." }
    ],
  },
   {
    title: "💸 Pricing & Payments",
    faqs: [
      { q: "What payment methods do you accept?", a: "We accept UPI, PayPal, international cards, and select crypto options." },
      { q: "Are your prices fixed?", a: "Our prices are structured per plan but we also offer add-ons and custom quotes." },
      { q: "Is there a refund policy?", a: "Due to the nature of digital services, refunds are only provided if work hasn't started." },
      { q: "Do you offer bulk or agency discounts?", a: "Yes! DM us for custom bulk deals or agency collaborations." },
    ],
  },
  {
    title: "🕐 Turnaround & Delivery",
    faqs: [
      { q: "How long does a setup take?", a: "Basic setups take 24-48 hrs, while Pro/Ultimate can take 3–5 days based on complexity." },
      { q: "Can I request urgent delivery?", a: "Yes. Priority delivery is available for an extra fee." },
      { q: "Will I get updates during the build?", a: "Yes, we provide regular progress updates through Discord." },
      { q: "Do I need to be available live?", a: "Not necessary. Just provide all required inputs and we’ll handle the rest." },
    ],
  },
  {
    title: "🎨 Customization",
    faqs: [
      { q: "Can I suggest a specific theme or aesthetic?", a: "Of course. We love creating tailored designs based on your vibe or brand." },
      { q: "Can I revise the setup later?", a: "You get up to 3 free revisions depending on your plan." },
      { q: "Can I include custom emojis and stickers?", a: "Yes! You can submit them or we can design them too." },
      { q: "Do you design banners & logos too?", a: "Yes, visual branding is part of our advanced packages or add-ons." },
    ],
  },
  {
    title: "🔒 Security & Permissions",
    faqs: [
      { q: "Is my server data safe?", a: "Yes, we only use temporary access with strict protocols. You can revoke anytime." },
      { q: "Do I need to make you an admin?", a: "Yes, temporarily, to configure bots, roles, and permissions securely." },
      { q: "What if someone messes with the setup?", a: "We set proper role hierarchies and anti-raid protection to prevent this." },
      { q: "Will my mod logs remain private?", a: "Absolutely. We do not touch existing logs unless requested." },
    ],
  },
  {
    title: "📦 Plans & Upgrades",
    faqs: [
      { q: "Can I switch plans after purchase?", a: "Yes, we allow upgrades by paying the difference. Downgrades are not supported." },
      { q: "What’s the difference between Standard and Pro?", a: "Pro includes advanced bot configs, branding, and custom commands." },
      { q: "Is Ultimate overkill for small servers?", a: "Not at all. It's perfect for scalable communities or brands." },
      { q: "What’s included in custom add-ons?", a: "Add-ons include reaction roles, embed packs, level roles, etc." },
    ],
  },
  {
    title: "🌎 International Clients",
    faqs: [
      { q: "Do you serve non-Indian clients?", a: "Yes, we work globally across all time zones." },
      { q: "Is pricing different for international clients?", a: "Pricing is auto-converted to your currency via exchange rates." },
      { q: "Do you accept USD/EUR/AED payments?", a: "Yes. Our system supports all major global currencies." },
      { q: "Will there be a timezone delay?", a: "Possibly, but we maintain async communication via Discord." },
    ],
  },
  {
    title: "🧰 Technical Stuff",
    faqs: [
      { q: "Can you automate roles or tickets?", a: "Yes, we use bots like TicketTool, ModMail, and others." },
      { q: "Do you offer custom commands?", a: "Yes, especially in Pro and Ultimate plans with full embed packs." },
      { q: "What about reaction menus?", a: "We include advanced embed menus for roles, info, and access." },
      { q: "Do you configure welcome messages?", a: "Yes! Fully branded welcome screens are included." },
    ],
  },
  {
    title: "📞 Support & Revisions",
    faqs: [
      { q: "Can I contact you after delivery?", a: "Yes, we offer post-delivery support for up to 7 days." },
      { q: "How do I submit revisions?", a: "DM us directly with screenshots or feedback. We reply fast." },
      { q: "Do you offer a Discord help server?", a: "Yes, we have a support server for all paid clients." },
      { q: "Is there a revision limit?", a: "Yes — up to 3 included depending on plan. Extra revisions may cost more." },
    ],
  },
  {
    title: "🤝 Partnerships & Referrals",
    faqs: [
      { q: "Do you offer referral rewards?", a: "Yes! Invite others and get discounts or upgrades." },
      { q: "Can I collab as a seller?", a: "We partner with designers, devs, and promoters. DM us." },
      { q: "Do you do affiliate marketing?", a: "Yes, we have custom affiliate links with earnings per sale." },
      { q: "Is white-labeling possible?", a: "Yes — DM us for private-label options and pricing." },
    ],
  },
  {
    title: "🧑‍🎓 Onboarding & First-Time Buyers",
    faqs: [
      { q: "I’m new to Discord servers. Can you guide me?", a: "Yes, we provide a simple onboarding checklist for first-timers." },
      { q: "Do I need to create the server first?", a: "No, we can create and build everything from scratch." },
      { q: "Can you help me choose a plan?", a: "Of course. Just tell us your goals and we’ll recommend the best fit." },
      { q: "Will I get documentation post-delivery?", a: "Yes, we provide a summary and bot command list." },
    ],
  },
  {
    title: "📊 Analytics & Reporting",
    faqs: [
      { q: "Do you include analytics bots?", a: "Yes — we can integrate stat bots like Statbot, ServerStats, or custom charts." },
      { q: "Can I see user engagement data?", a: "We can set up dashboards that track joins, activity, and levels." },
      { q: "Can I export server data?", a: "We provide CSV logs for key roles, bots, and channel setup if needed." },
      { q: "Can you configure audit logs?", a: "Yes. We ensure mod logs, joins, and edits are tracked properly." },
    ],
  },
  {
    title: "⚙️ Post-Sale Support",
    faqs: [
      { q: "Can I get help a week after delivery?", a: "Yes, extended support is available for a small fee or in some plans." },
      { q: "Can I pause and resume my order?", a: "Yes — just inform us in advance and we’ll work around your schedule." },
      { q: "Do you offer maintenance plans?", a: "Yes — weekly, monthly, or one-time updates are available." },
      { q: "Will you notify about bot changes?", a: "Yes, if a bot changes majorly, we’ll inform and reconfigure if needed." },
    ],
  },
  {
    title: "🖥 Server Management",
    faqs: [
      { q: "Can I restrict staff permissions?", a: "Yes — we design permission trees with least privilege setups." },
      { q: "Can you help with server audits?", a: "Yes — we do audits on request and recommend fixes." },
      { q: "Can we manage roles easier post-delivery?", a: "We build role menus that are self-service friendly." },
      { q: "Will you remove unused channels?", a: "Yes — we optimize cluttered servers during revamps." },
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const FAQPage = () => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [query, setQuery] = useState("");

  const toggle = (i) => {
    setOpenIndexes((prev) =>
      prev.includes(i) ? prev.filter((index) => index !== i) : [...prev, i]
    );
  };

  const filterFaqs = (section) => {
    if (!query.trim()) return section.faqs;
    return section.faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(query.toLowerCase()) ||
        faq.a.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    if (!query.trim()) {
      setOpenIndexes([]);
      return;
    }
    const matchingIndexes = faqData.reduce((acc, section, i) => {
      if (filterFaqs(section).length > 0) acc.push(i);
      return acc;
    }, []);
    setOpenIndexes(matchingIndexes);
  }, [query]);

  return (
    <section className="relative min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-10 pt-40 pb-32 overflow-hidden">
      <Helmet>
        <title>FAQ | Drixe Studio</title>
        <meta name="description" content="Find instant answers to common questions about Drixe Studio's Discord server setup, pricing, delivery, and more." />
        <meta property="og:title" content="Frequently Asked Questions | Drixe Studio" />
        <meta property="og:description" content="Everything you need to know about Drixe Studio services, support, and more." />
        <meta property="og:url" content="https://drixestudio.services/faq" />
        <meta property="og:image" content="https://drixestudio.services/faq-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ | Drixe Studio" />
        <meta name="twitter:description" content="Quickly find answers about services, pricing, and support." />
        <meta name="twitter:image" content="https://drixestudio.services/preview.png" />
      </Helmet>

      {/* Background Gradient Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1c] via-[#1a1a30] to-[#12101f]" />
        <div className="absolute -top-32 left-1/3 w-[900px] h-[900px] bg-violet-700/25 blur-[200px] rounded-full opacity-25 animate-pulse" />
        <div className="absolute top-[-15vw] -right-[15vw] w-[800px] h-[800px] bg-indigo-400/20 blur-[160px] rounded-full" />
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-20 relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📚 Frequently Asked Questions
        </motion.h1>
        <motion.p
          className="text-gray-400 mt-4 max-w-xl mx-auto text-sm sm:text-base italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Find instant answers to common queries about our services, delivery, pricing, and more.
        </motion.p>
      </div>

      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-12 relative z-10">
        <input
          type="text"
          placeholder="🔍 Search topics..."
          className="w-full p-3 rounded-xl bg-[#1a1a1a] text-white placeholder-gray-400 border border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* FAQ Sections */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {faqData.map((section, i) => {
          const filtered = filterFaqs(section);
          if (filtered.length === 0) return null;
          const isOpen = openIndexes.includes(i);

          return (
            <motion.div
              key={i}
              variants={itemAnim}
              className="bg-[#1a1a1a] rounded-xl shadow-xl p-6 border border-purple-800/30"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center text-left text-xl font-semibold text-purple-200 hover:text-purple-400"
              >
                <span>{section.title}</span>
                <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 space-y-4 text-sm text-gray-300"
                  >
                    {filtered.map((faq, j) => (
                      <div key={j} className="border-b border-gray-700 pb-2">
                        <p className="font-medium text-purple-100">{faq.q}</p>
                        <p className="text-gray-400 mt-1">{faq.a}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default FAQPage;
