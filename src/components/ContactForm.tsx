"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import successAnim from "./successAnim.json";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);

  const [name, setName] = useState("");
  const [method, setMethod] = useState("Telegram");
  const [contact, setContact] = useState("");

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999,
      // Adjusted to brand colors: Cyan, White, Grey
      colors: ["#00E5FF", "#ffffff", "#333333"],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || submitted === true) return;

    if (method === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        setSubmitted("invalid");
        setTimeout(() => setSubmitted(false), 2000);
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch("https://submit-form.com/J8bwGvLum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, method, contact }),
        redirect: "manual",
      });

      if (res.status < 400) {
        new Audio("/success.mp3").play().catch(() => {});
        fireConfetti();
        setSubmitted(true);
        setShowSuccessBox(true);

        setTimeout(() => {
          setShowSuccessBox(false);
          setSubmitted(false);
          setName("");
          setContact("");
        }, 3000);
      } else throw new Error("Form failed");
    } catch (err) {
      setSubmitted("error");
      setTimeout(() => setSubmitted(false), 2500);
    }

    setLoading(false);
  };

  return (
    <main className="relative w-full min-h-screen bg-black text-white pt-32 pb-40 overflow-hidden border-t border-white/10 selection:bg-cyan-500 selection:text-black">
      
      {/* --- THE MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 md:px-12 mt-10 md:mt-20">
        
        {/* --- FORM HEADER --- */}
        <header className="mb-16 border-b border-white/10 pb-12">
          <div className="flex items-center gap-6 mb-6">
            <span className="h-[2px] w-8 bg-cyan-500 block" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              Project Inquiry
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            Initialize <br />
            <span className="text-white/40">Contact.</span>
          </h1>
          <p className="text-sm md:text-base text-white/50 font-medium leading-relaxed max-w-lg">
            Submit your details below to discuss custom website development, Discord architecture, or social media content.
          </p>
        </header>

        {/* --- THE BRUTALIST FORM --- */}
        <div className="bg-[#050505] border border-white/10 p-8 md:p-12 relative overflow-hidden group">
          
          {/* Subtle Top Border Glow on Hover */}
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Name Input */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-3 block">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-5 py-4 bg-black border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500 transition-colors rounded-none"
              />
            </div>

            {/* Method Input */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-3 block">
                Preferred Platform
              </label>
              <select
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                  setContact("");
                }}
                className="w-full px-5 py-4 bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors rounded-none appearance-none cursor-pointer"
              >
                <option className="bg-[#050505] text-white">Telegram</option>
                <option className="bg-[#050505] text-white">Discord</option>
                <option className="bg-[#050505] text-white">Email</option>
              </select>
            </div>

            {/* Contact Detail Input */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-3 block">
                Contact Details
              </label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={
                  method === "Email"
                    ? "name@company.com"
                    : method === "Discord"
                    ? "e.g. username"
                    : "e.g. @yourhandle"
                }
                className="w-full px-5 py-4 bg-black border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500 transition-colors rounded-none"
              />
              
              {/* Error State */}
              {submitted === "invalid" && (
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-3">
                  Please enter a valid email address.
                </p>
              )}
              {submitted === "error" && (
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-3">
                  Submission failed. Please try again.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || submitted === true}
              className={`w-full py-5 mt-4 text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-300 border ${
                loading || submitted === true
                  ? "bg-white/10 text-white/40 border-white/10 cursor-not-allowed"
                  : "bg-white text-black border-white hover:bg-cyan-400 hover:border-cyan-400"
              }`}
            >
              {loading ? "Processing..." : submitted === true ? "Submitted" : "Send Inquiry"}
            </button>
          </form>
        </div>
      </div>

      {/* --- SUCCESS BOX (Brutalist Redesign) --- */}
      <AnimatePresence>
        {showSuccessBox && (
          <motion.div
            key="success"
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black border border-white/10 p-12 md:p-16 flex flex-col items-center max-w-sm w-full relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Cyan Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
              
              <Lottie animationData={successAnim} loop={false} style={{ width: 120, marginBottom: 20 }} />
              
              <p className="text-xl font-black uppercase tracking-tighter text-white mb-2">
                Inquiry Received.
              </p>
              <p className="text-xs font-medium text-white/50 text-center leading-relaxed">
                We will contact you shortly to discuss your project requirements.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ContactPage;