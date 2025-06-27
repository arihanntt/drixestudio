import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlanCard from "./components/PlanCard";
import Modal from "./components/Modal";
import ContactModal from "./components/ContactModal";
import FAQ from "./components/FAQ";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import StatsSection from "./components/StatsSection"; // adjust path if needed


function App() {
  const [currency, setCurrency] = useState("INR");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const heroRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openCard, setOpenCard] = useState(null);


  useEffect(() => {
    const updateMouse = (e) => setMouseX(e.clientX);
    const updateMobile = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("resize", updateMobile);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("resize", updateMobile);
    };
  }, []);

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
  className="relative z-10 overflow-hidden flex flex-col justify-center items-center text-center min-h-[80vh] px-4 py-24 sm:py-32 bg-gradient-to-b from-[#0e0e1c] to-[#121227]"
>
  {/* 🌐 Floating Discord Logos */}
  {!isMobile ? (
    <>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
        className="floating-logo absolute w-20 md:w-24 left-10 top-1/3 animate-float1"
        style={{ transform: `translateX(${(mouseX - window.innerWidth / 2) * -0.08}px)` }}
        alt="Discord logo left"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
        className="floating-logo absolute w-20 md:w-24 right-10 bottom-1/3 animate-float2"
        style={{ transform: `translateX(${(mouseX - window.innerWidth / 2) * 0.08}px)` }}
        alt="Discord logo right"
      />
    </>
  ) : (
    <>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
        className="floating-logo animate-float1 absolute w-20 left-4 top-1/3"
        alt="Discord logo left"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png"
        className="floating-logo animate-float2 absolute w-20 right-4 bottom-1/3"
        alt="Discord logo right"
      />
    </>
  )}

  {/* 💫 Background Glow Blur */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blurple/30 blur-3xl rounded-full pointer-events-none animate-pulse opacity-20"></div>

  {/* 🧠 Title & Description */}
  <div className="relative z-10">
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
      <span className="relative z-10">Drixe Studio</span>
    </h1>
    <p className="mt-2 text-base md:text-lg text-gray-400 italic">
      designed by Drixe, inspired by Lua
    </p>
    <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
      Building premium Discord servers with <span className="text-blurple font-medium">style</span> and <span className="text-blurple font-medium">speed</span>.
    </p>
  </div>

  {/* 🔽 Scroll Down Button */}
  <motion.button
    className="mt-10 text-blurple font-semibold text-sm z-10 underline hover:opacity-100 opacity-80 hover:scale-105 transition-all"
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

<StatsSection />

{/* 🧠 Why Us Section */}
{/* 🧠 Why Us Section */}
<section className="relative z-10 py-16 px-4 bg-gradient-to-br from-[#101020] to-[#1a1a2e] shadow-inner overflow-hidden">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
      Why Choose <span className="text-blurple">Drixe Studio?</span>
    </h2>
    <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
      We don’t just build Discord servers. We craft immersive digital communities with powerful tools, custom systems, and high-end aesthetics.
    </p>
    <p className="text-gray-400 text-xs sm:text-sm mt-4 italic">
      👉 Tap on a card to reveal more details
    </p>
  </div>

  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      {
        title: "✨ Tailored Designs",
        desc: "Every server is custom-built with your vision in mind — nothing generic, all premium.",
        more: "We study your niche, audience, and brand vibe to create a unique aesthetic that sets you apart.",
        icon: "🎨",
      },
      {
        title: "⚙️ Automated Systems",
        desc: "We integrate bots, roles, and permission logic so your community runs on autopilot.",
        more: "From welcome messages to advanced moderation — we make your job easier with automation.",
        icon: "🤖",
      },
      {
        title: "🚀 Growth Focused",
        desc: "SEO-optimized setup, user onboarding, and monetization tools help you scale fast.",
        more: "We optimize your server name, layout, and engagement tools to rank higher in Discord search.",
        icon: "📈",
      },
      {
        title: "🧩 Modular Setup",
        desc: "Add or upgrade features anytime. Our systems are flexible and future-proof.",
        more: "Need to add a shop or switch to tickets? No problem — your server grows with you.",
        icon: "🛠️",
      },
      {
        title: "💬 Ongoing Support",
        desc: "From setup to scaling — we stay with you. Premium plans get 24/7 assistance.",
        more: "You get dedicated help, even after delivery. Bugs? Edits? Add-ons? We've got you.",
        icon: "📞",
      },
      {
        title: "🌌 Aesthetic Experience",
        desc: "We build not just servers but experiences — smooth, branded, and beautiful.",
        more: "Subtle animations, theme-matched icons, and branding that makes your server unforgettable.",
        icon: "🌠",
      },
    ].map((item, idx) => (
      <div
        key={idx}
        onClick={() => setOpenCard(openCard === idx ? null : idx)}
        className={`relative cursor-pointer bg-[#151527] hover:bg-[#1d1f3a] border border-blurple/20 shadow-md rounded-xl p-6 backdrop-blur-lg transition-all duration-300 hover:scale-[1.03] ${
          openCard === idx ? "bg-[#1d1f3a]" : ""
        }`}
      >
        <div className="absolute top-3 right-4 w-3 h-3 bg-blurple rounded-full animate-ping opacity-60"></div>
        <div className="text-4xl mb-4">{item.icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
        <p className="text-sm text-gray-300">{item.desc}</p>
        {openCard === idx && (
          <motion.div
            className="mt-3 text-sm text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.more}
          </motion.div>
        )}
      </div>
    ))}
  </div>

  {/* ✨ Extra floating glow background */}
  <div className="absolute -top-10 -left-10 w-64 h-64 bg-blurple/30 blur-3xl rounded-full animate-pulse opacity-30 pointer-events-none"></div>
  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blurple/30 blur-3xl rounded-full animate-pulse opacity-30 pointer-events-none"></div>
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
