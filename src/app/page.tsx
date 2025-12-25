"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import StatsSection from "@/components/StatsSection";
import ChatBotModal from "@/components/ChatBotModal";
import HeroSection from "@/components/HeroSection";
import WhyUs from "@/components/WhyUs";
import ReviewStrip from "@/components/ReviewStrip";
import PlansSection from "@/components/PlansSection";
import Modal from "@/components/Modal";
import ContactModal from "@/components/ContactModal";

// 🔥 SSR OFF ONLY HERE
const SmoothScrollWrapper = dynamic(
  () => import("@/components/SmoothScrollWrapper"),
  { ssr: false }
);

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const [scrollReady, setScrollReady] = useState(false);

  useEffect(() => {
    if (heroRef.current) setScrollReady(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollReady ? heroRef : undefined,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.4, 0.3]);

  return (
    <SmoothScrollWrapper>
      <Navbar />

      <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
        <HeroSection />
        <WhyUs />
        <StatsSection />
        <PlansSection />
        <FAQ />
        <ReviewStrip />
        <Footer />

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
