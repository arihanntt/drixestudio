"use client";

import React, { useState } from "react"; // <--- ADD 'React' HERE
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";

// Simple checkmark animation
const successAnim = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Check",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Shape Layer 1",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "shape",
          it: [
            {
              ind: 0,
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  i: [],
                  o: [],
                  v: [
                    [-40, 0],
                    [-10, 30],
                    [40, -30],
                  ],
                  c: false,
                },
              },
            },
            {
              ty: "st",
              c: { a: 0, k: [0, 0.9, 1, 1] }, // Adjusted to Cyan-ish
              w: 8,
              lc: 2,
              lj: 2,
              ml: 4,
            },
            { ty: "tr", p: { a: 0, k: [0, 0] } },
          ],
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
};

const ContactUsModal = ({ onClose }: { onClose: () => void }) => {
  const [submitted, setSubmitted] = useState<string | false>(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [name, setName] = useState("");
  const [method, setMethod] = useState("Telegram");
  const [contact, setContact] = useState("");

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      zIndex: 9999,
      // Brand aligned confetti colors: Cyan, White, Dark Grey
      colors: ["#00E5FF", "#FFFFFF", "#333333"], 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || submitted) return;

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
        const audio = new Audio("/success.mp3");
        audio.play().catch(() => {});
        setSubmitted("success");

        setTimeout(() => {
          setSubmitted(false);
          setShowSuccessBox(true);
          fireConfetti();
          onClose(); // close main modal box

          setTimeout(() => {
            setShowSuccessBox(false);
            setName("");
            setContact("");
          }, 2500);
        }, 800);
      } else throw new Error("Form failed");
    } catch (err) {
      setSubmitted("error");
      setTimeout(() => setSubmitted(false), 2500);
    }

    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {!submitted && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg bg-black border border-white/10 p-8 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />

              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors duration-300 text-2xl z-10 font-light leading-none"
              >
                ✕
              </button>

              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[2px] w-8 bg-cyan-500 block" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                    Direct Inquiry
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">
                  Start Your <br />
                  <span className="text-white/40">Project.</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                
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
                    className="w-full px-5 py-4 bg-[#050505] border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500 transition-colors rounded-none"
                  />
                </div>

                {/* Method Input */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-3 block">
                    Preferred Contact Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) => {
                      setMethod(e.target.value);
                      setContact("");
                    }}
                    className="w-full px-5 py-4 bg-[#050505] border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors rounded-none appearance-none cursor-pointer"
                  >
                    <option className="bg-black text-white">Telegram</option>
                    <option className="bg-black text-white">Discord</option>
                    <option className="bg-black text-white">Email</option>
                  </select>
                </div>

                {/* Contact Detail Input */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-3 block">
                    Your Details
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
                    className="w-full px-5 py-4 bg-[#050505] border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500 transition-colors rounded-none"
                  />
                  {submitted === "invalid" && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2">
                      Please enter a valid email.
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-300 border ${
                      loading
                        ? "bg-white/10 text-white/40 border-white/10 cursor-not-allowed"
                        : "bg-white text-black border-white hover:bg-cyan-400 hover:border-cyan-400"
                    }`}
                  >
                    {loading ? "Processing..." : "Submit Inquiry"}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SUCCESS BOX --- */}
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
              className="bg-black border border-white/10 p-12 md:p-16 flex flex-col items-center max-w-sm w-full relative overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
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
    </>
  );
};

export default ContactUsModal;