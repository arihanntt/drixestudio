"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import successAnim from "@/components/successAnim.json";
import {
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  User,
  Send,
  Sparkles,
  ShieldCheck,
  Bot,
} from "lucide-react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);

  const [name, setName] = useState("");
  const [method, setMethod] = useState("Telegram");
  const [contact, setContact] = useState("");
  const [reason, setReason] = useState("");

  const fireConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.6 },
      zIndex: 9999,
      colors: ["#7289da", "#ffffff", "#a0c4ff"],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || submitted) return;

    if (method === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        alert("❌ Invalid email address");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("https://submit-form.com/J8bwGvLum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, method, contact, reason }),
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
          setReason("");
        }, 3500);
      } else throw new Error("Failed");
    } catch (err) {
      alert("❌ Submission failed. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0c0c10] via-[#10131c] to-[#0c0c10] text-white px-6 py-24 md:py-32 relative scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-blurple/20 blur-[120px] rounded-full opacity-40" />
        <div className="absolute bottom-0 right-[5%] w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blurple to-white bg-clip-text text-transparent">
            Let's Get in Touch
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-6">
            Fill out the quick form and we’ll get back to you soon — whether it’s for partnerships, server setup, bot development, or anything else.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Your Name"
              icon={<User size={18} />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              required
            />

            <div>
              <label className="text-sm text-gray-300">Preferred Contact Method</label>
              <select
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                  setContact("");
                }}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-black border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blurple"
              >
                <option>Telegram</option>
                <option>Discord</option>
                <option>Email</option>
              </select>
            </div>

            <InputField
              label="Your Contact"
              icon={<Mail size={18} />}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              placeholder={
                method === "Email"
                  ? "you@example.com"
                  : method === "Discord"
                  ? "user#0001"
                  : "@yourhandle"
              }
            />

            <InputField
              label="Reason for Contact"
              icon={<MessageSquare size={18} />}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="e.g. Partnership, Support, Setup..."
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full py-4 font-semibold flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-blurple hover:bg-indigo-500 shadow-md hover:shadow-blurple/50"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Request
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Info Side */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InfoBlock
            icon={<Sparkles className="text-blurple" />}
            title="Tailored Services"
            desc="We design & optimize Discord servers for streamers, brands, and Web3 projects."
          />
          <InfoBlock
            icon={<ShieldCheck className="text-green-400" />}
            title="Secure & Verified"
            desc="Anti-raid, mod tools, and verification systems built-in for your safety."
          />
          <InfoBlock
            icon={<Bot className="text-yellow-300" />}
            title="Custom Bots"
            desc="We create bots that automate, engage and elevate your server experience."
          />
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessBox && (
          <motion.div
            key="success-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111] text-white p-6 rounded-2xl shadow-xl border border-blurple/40 flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Lottie animationData={successAnim} loop={false} style={{ width: 120 }} />
              <p className="mt-3 text-center text-white text-lg font-semibold">
                <CheckCircle className="inline mr-2 text-green-400" size={20} />
                Message sent successfully!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputField = ({ label, icon, ...props }) => (
  <div>
    <label className="text-sm text-gray-300">{label}</label>
    <div className="flex items-center mt-1 px-4 py-3 rounded-xl bg-black border border-gray-700 text-white text-sm focus-within:ring-2 focus-within:ring-blurple">
      <span className="mr-3 text-gray-400">{icon}</span>
      <input
        {...props}
        className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
      />
    </div>
  </div>
);

const InfoBlock = ({ icon, title, desc }) => (
  <div className="flex gap-4 items-start">
    <div className="p-3 rounded-xl bg-white/5 border border-white/10">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  </div>
);

export default ContactPage;
