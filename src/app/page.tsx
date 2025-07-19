"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanCard from "@/components/PlanCard";
import Modal from "@/components/Modal";
import ContactModal from "@/components/ContactModal";
import FAQ from "@/components/FAQ";
import StatsSection from "@/components/StatsSection";
import ChatBotModal from "@/components/ChatBotModal";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import HeroSection from "@/components/HeroSection";
import WhyUs from "@/components/WhyUs";
import ReviewStrip from "@/components/ReviewStrip";
import PlansSection from "@/components/PlansSection";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [scrollReady, setScrollReady] = useState(false);

  const heroRef = useRef(null);

  // Removed currency-related state and functions since they're no longer needed in Navbar
  // const [currency, setCurrency] = useState("INR");
  // const exchangeRates: Record<string, number> = { ... };
  // const getCurrencySymbol = (cur: Currency): string => { ... };

  const handleOpenModal = (planName: string) => {
    setSelectedPlan(planName);
    setShowModal(true);
  };

  useEffect(() => {
    if (heroRef.current) setScrollReady(true);
  }, []);

  const { scrollYProgress } = useScroll({ target: scrollReady ? heroRef : undefined });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.4, 0.3]);

  return (
    <SmoothScrollWrapper>
      <Navbar /> {/* Removed currency and setCurrency props */}

      <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
        <HeroSection />
        <WhyUs />
        <StatsSection />
        <PlansSection />
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
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} plan={selectedPlan} />
        )}
        {showContactModal && (
          <ContactModal onClose={() => setShowContactModal(false)} />
        )}
      </div>
    </SmoothScrollWrapper>
  );
}