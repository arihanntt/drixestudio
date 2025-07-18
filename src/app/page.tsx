'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlanCard from '@/components/PlanCard';
import Modal from '@/components/Modal';
import ContactModal from '@/components/ContactModal';
import FAQ from '@/components/FAQ';
import StatsSection from '@/components/StatsSection';
import ChatBotModal from '@/components/ChatBotModal';
import SmoothScrollWrapper from '@/components/SmoothScrollWrapper';
import HeroSection from '@/components/HeroSection';
import WhyUs from '@/components/WhyUs';
import ReviewStrip from '@/components/ReviewStrip';

export default function HomePage() {
  const [currency, setCurrency] = useState("INR");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [scrollReady, setScrollReady] = useState(false);

  const heroRef = useRef(null);

  const exchangeRates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    AED: 0.044,
    CAD: 0.017,
  };

type Currency = "INR" | "USD" | "EUR" | "GBP";

const getCurrencySymbol = (cur: Currency): string => {
  const symbols: Record<Currency, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  return symbols[cur];
};


  const handleOpenModal = (planName) => {
    setSelectedPlan(planName);
    setShowModal(true);
  };

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const cc = data.currency;
        if (exchangeRates[cc]) setCurrency(cc);
      });
  }, []);

  useEffect(() => {
    if (heroRef.current) setScrollReady(true);
  }, []);

  const { scrollYProgress } = useScroll({ target: scrollReady ? heroRef : undefined });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.4, 0.3]);

  const plans = [
    {
      name: "Basic",
      price: 3000,
      summary: "Starter Discord server setup with essential bots, custom roles, and auto systems — great for beginners.",
      details: [
        "Custom channels (Text & Voice)",
        "Invite Tracking System",
        "Automated welcome & role system",
        "Essential bots (Moderation, Music, & Auto-messages)",
        "Boosting & announcement system",
        "Giveaway & Polling System",
        "Basic security setup",
        "Delivery: 1 day",
      ],
    },
    {
      name: "Standard",
      price: 6000,
      summary: "Designed for growing Discord communities — custom server layout, verification, emojis, and user engagement tools.",
      details: [
        "Everything in Basic plan",
        "Epic Server Design",
        "Verification System",
        "Basic logging system",
        "Moderate security",
        "3-5 bots (Moderation, Games, Reaction Roles, Auto-moderation)",
        "Static & Animated Emojis",
        "Level System",
        "Delivery: 1–2 days",
      ],
    },
    {
      name: "Pro",
      price: 9000,
      summary: "Advanced Discord server setup with branding, AI features, and monetization tools for creators and teams.",
      details: [
        "Everything in Standard plan",
        "Support System i.e. Ticket",
        "Full branding package (icons, banners)",
        "Anti-Raid & Spam protection",
        "Advanced security system",
        "Advanced logging system",
        "AI-powered chat engagement system",
        "After Delivery Technical Support",
        "Delivery: 2–3 days",
      ],
    },
    {
      name: "Ultimate",
      price: 9700,
      popular: true,
      summary: "Fully automated Discord server setup with advanced AI, temporary channels, and unlimited customization.",
      details: [
        "Everything in Pro Plan",
        "Unlimited channels & full automation",
        "Advanced AI (Auto-response)",
        "Temporary voice and Text Channel's",
        "Delivery: 2–3 days",
      ],
    },
    {
      name: "Empire",
      price: 10000,
      summary: "Enterprise-level Discord setup with onboarding flow, advanced ranks, DM automation, and pro-level moderation.",
      details: [
        "Everything in Ultimate Plan",
        "Server backup without Bots and messages",
        "Onboarding Flow Design (Intro channel, start-here)",
        "Auto-DM with server guide",
        "Rank-naming theme (e.g. “Novice” → “OG” → “Legend”)",
        "Auto-perks for high-level users (access to secret VC, etc.)",
        "Dedicated 20-day support",
        "Delivery: 3-4 days",
      ],
    },
  ];

  return (
    <SmoothScrollWrapper>
      <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
        <Navbar
          currency={currency}
          setCurrency={setCurrency}
          onContactClick={() => setShowContactModal(true)}
        />

        <HeroSection />
        <StatsSection />
        <WhyUs />

        {/* PLANS SECTION AS REDIRECT CTA */}
<section
  id="plans"
  className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 bg-[#0f0f0f] text-white border-t border-neutral-800 overflow-hidden"
>
  {/* BACKGROUND EFFECTS */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1c] via-[#1a1a30] to-[#12101f]" />
    <div className="absolute -top-32 left-1/3 w-[900px] h-[900px] bg-violet-700/25 blur-[200px] rounded-full opacity-25 animate-pulse" />
    <div className="absolute top-[-15vw] -right-[15vw] w-[800px] h-[800px] bg-indigo-400/20 blur-[160px] rounded-full" />
  </div>

  {/* HEADLINE */}
  <div className="text-center mb-12">
    <p className="text-sm font-medium text-white/60 tracking-wider uppercase mb-2">
      Pricing Plans
    </p>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center max-w-2xl mx-auto leading-tight">
      <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
        Choose a Plan That Fits You
      </span>
    </h2>
    <p className="text-sm sm:text-base text-white/50 mt-4 italic">
      👉 Click below to view all plans in detail
    </p>
  </div>

  {/* REDIRECT BOX */}
  <div className="flex justify-center">
    <div
      onClick={() => window.location.href = "/plans"}
      className="cursor-pointer w-full max-w-3xl mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-white rounded-2xl p-10 shadow-xl hover:shadow-2xl text-center"
    >
      <h3 className="text-2xl sm:text-3xl font-bold mb-2">View All Plans</h3>
      <p className="text-base sm:text-lg opacity-80">
        Explore features, pricing, and everything you need to pick the best package.
      </p>
      <div className="mt-6">
        <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 transition">
          Go to Plans →
        </button>
      </div>
    </div>
  </div>
</section>


        <FAQ />
        <ReviewStrip />
        <Footer />

        {/* FLOATING CHAT BOT BUTTON */}
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-5 right-5 z-50 px-4 py-2 rounded-full shadow-lg animate-pulse text-white font-semibold hover:scale-105 transition-all duration-300"
          style={{
            background: "radial-gradient(circle, rgba(88,101,242,0.6) 0%, rgba(17,17,17,0.8) 60%)",
            backdropFilter: "blur(10px)",
            border: "1px solid #5865F2",
          }}
        >
          🤖 Ask Bot
        </button>

        {/* MODALS */}
        {chatOpen && <ChatBotModal onClose={() => setChatOpen(false)} />}
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
    </SmoothScrollWrapper>
  );
}
