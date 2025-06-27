import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlanCard from "./components/PlanCard";
import Modal from "./components/Modal";
import ContactModal from "./components/ContactModal";
import FAQ from "./components/FAQ";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";

function App() {
  const [currency, setCurrency] = useState("INR");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const heroRef = useRef(null);

  const exchangeRates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    AED: 0.044,
    CAD: 0.017,
  };

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const cc = data.currency;
        if (exchangeRates[cc]) setCurrency(cc);
      });
  }, []);

  const getCurrencySymbol = (cur) => {
    const symbols = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      AED: "د.إ",
      CAD: "CA$",
    };
    return symbols[cur] || cur;
  };

  const handleOpenModal = (planName) => {
    setSelectedPlan(planName);
    setShowModal(true);
  };

  const { scrollYProgress } = useScroll({ target: heroRef });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.4, 0.3]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onContactClick={() => setShowContactModal(true)}
      />

      {/* Hero Section */}
      <section
  ref={heroRef}
  className="relative z-10 text-center py-20 px-4 overflow-hidden min-h-[60vh] flex flex-col justify-center items-center"
>
  {/* Main Heading */}
  <h1 className="text-4xl md:text-5xl font-bold z-10">Drixe Studio</h1>

  {/* Sub-title: designed by Drixe, inspired by Lua */}
  <p className="mt-2 text-base md:text-lg text-gray-400 italic z-10">
    designed by Drixe, inspired by Lua
  </p>

  {/* Tagline */}
  <p className="mt-4 text-lg text-gray-300 z-10">
    Building premium Discord servers with style and speed.
  </p>

  {/* Animated Scroll Button */}
  <motion.button
    className="mt-10 text-blurple font-semibold text-sm z-10 underline focus:outline-none"
    animate={{ y: [0, 5, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    onClick={() => {
      const plans = document.getElementById("plans");
      if (plans) plans.scrollIntoView({ behavior: "smooth" });
    }}
  >
    ↓ Scroll down to explore more ↓
  </motion.button>
</section>


      {/* 📊 Stats Section */}

<section className="relative z-10 px-4 py-8 bg-gradient-to-br from-[#1f1f3f] to-[#101020] shadow-inner">
  <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 text-center">
    {[
      { label: "Orders Completed", value: 100, suffix: "+" },
      { label: "Happy Clients", value: 98, suffix: "%" },
      { label: "Rating", value: 5, suffix: "⭐" },
    ].map((stat, i) => (
      <motion.div
        key={i}
        whileInView={{ opacity: [0, 1], y: [20, 0] }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        viewport={{ once: true }}
        className="min-w-[100px] sm:min-w-[120px] bg-[#151527] border border-[#5865F2]/40 rounded-lg p-4 sm:p-5 shadow-md text-white"
      >
        <div className="text-2xl sm:text-3xl font-bold text-blurple drop-shadow-sm">
          <CountUp start={0} end={stat.value} delay={0.1} duration={3.9} />
          {stat.suffix}
        </div>
        <p className="mt-1 text-xs sm:text-sm text-gray-300 font-medium">{stat.label}</p>
      </motion.div>
    ))}
  </div>
</section>



      {/* Plans Section */}
      <section id="plans" className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Plans</h2>
        <p className="text-sm text-gray-400 text-center mb-10">
          👉 Tap or hover on a plan to flip for full details
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <PlanCard
              key={i}
              name={plan.name}
              price={Math.round(plan.price * exchangeRates[currency])}
              summary={plan.summary}
              details={plan.details}
              currencySymbol={getCurrencySymbol(currency)}
              onOrder={() => handleOpenModal(plan.name)}
            />
          ))}
        </div>
      </section>

      <FAQ />
      <Footer />

      {/* 💬 Discord Button */}
      <a
        href="https://discord.com/users/928934131893686292"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 px-4 py-2 rounded-full shadow-lg animate-pulse text-white font-semibold hover:scale-105 transition-all duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(88,101,242,0.6) 0%, rgba(17,17,17,0.8) 60%)",
          backdropFilter: "blur(10px)",
          border: "1px solid #5865F2",
        }}
      >
        💬 Chat on Discord
      </a>

      {/* Modals */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          plan={selectedPlan}
        />
      )}
      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
}

export default App;

// 📦 Plan Data
const plans = [
  {
    name: "Basic",
    price: 3000,
    summary: "Perfect for everyone starting out!",
    details: [
      "Up to 10 channels (Text & Voice)",
      "Leveling system",
      "Automated welcome & role system",
      "Essential bots (Moderation, Music, & Auto-messages)",
      "Boosting & announcement system",
      "Basic branding & security setup",
      "Delivery: 1 day",
    ],
  },
  {
    name: "Standard",
    price: 6000,
    summary: "For active & engaging communities!",
    details: [
      "Everything in Basic plan",
      "Up to 20 channels (Structured layout)",
      "Advanced roles & permission system",
      "Basic logging system",
      "Moderate security",
      "3-5 bots (Moderation, Games, Reaction Roles, Auto-moderation)",
      "Emojis & branding setup",
      "Basic paywall & monetization setup",
      "Event & giveaway system",
      "Delivery: 1–2 days",
    ],
  },
  {
    name: "Pro",
    price: 9000,
    summary: "For serious growth & monetization!",
    details: [
      "Everything in Standard plan",
      "Up to 40 channels (Optimized for growth)",
      "Full branding package (emojis, icons, banners)",
      "Automated verification & anti-raid protection",
      "Advanced security system",
      "Advanced logging system",
      "Custom AI-powered chat engagement system",
      "SEO-optimized server setup (Higher Discord search ranking)",
      "Delivery: 1–2 days",
    ],
  },
  {
    name: "Ultimate",
    price: 10000,
    popular: true,
    summary: "The ultimate Discord experience!",
    details: [
      "Everything in Pro Plan + LIFETIME UPDATES",
      "Custom-built monetization system",
      "Premium engagement tools (Polls, Live Q&A, Exclusive rooms)",
      "Dedicated 60-day support",
      "Delivery: 2–3 days",
    ],
  },
  {
    name: "Empire",
    price: 15000,
    summary: "Empire Plan – Dominate Discord with elite tools!",
    details: [
      "Everything in Ultimate Plan",
      "Custom bot development (Fully branded bot)",
      "Complete automation suite (Ticketing, Onboarding, Moderation)",
      "Exclusive VIP zones with unique access logic",
      "24/7 maintenance & lifetime support",
      "SEO + Discord Discovery Optimization",
      "Launch consulting & community growth roadmap",
      "Delivery: 3–5 days",
    ],
  },
];
