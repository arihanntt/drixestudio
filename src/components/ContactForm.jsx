import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import successAnim from "./successAnim.json";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
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
          setName("");
          setContact("");
        }, 3000);
      } else throw new Error("Form failed");
    } catch (err) {
      alert("❌ Submission failed. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#0a0a0d] via-[#10131b] to-[#0a0a0d] text-white flex items-center justify-center">
      <div className="absolute inset-0 bg-blurple/10 blur-[80px] opacity-10 pointer-events-none animate-pulse z-0" />

      <div className="w-full px-4 sm:px-8 md:px-24 lg:px-48 xl:px-64 py-16 relative z-10">
        <div className="w-full bg-[#11131c] p-8 md:p-12 rounded-3xl shadow-2xl border border-blurple/30">
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-white via-blurple to-white bg-clip-text text-transparent mb-2">
            Contact Drixe Studio
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Get a professionally setup Discord server customized for your community, brand, or project.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-300">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full mt-1 px-4 py-2 rounded-lg bg-black border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blurple"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Preferred Contact Method</label>
              <select
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                  setContact("");
                }}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-black border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blurple"
              >
                <option>Telegram</option>
                <option>Discord</option>
                <option>Email</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-300">Your Contact</label>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={
                  method === "Email"
                    ? "you@example.com"
                    : method === "Discord"
                    ? "user#0001"
                    : "@yourhandle"
                }
                className="w-full mt-1 px-4 py-2 rounded-lg bg-black border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blurple"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-blurple hover:bg-indigo-500 shadow-md hover:shadow-blurple/50"
              }`}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Success Box */}
      <AnimatePresence>
        {showSuccessBox && (
          <motion.div
            key="success"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111] text-white p-6 rounded-2xl shadow-xl border border-blurple/40 flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <Lottie animationData={successAnim} loop={false} style={{ width: 120 }} />
              <p className="mt-2 text-center text-white">✅ Message sent successfully!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;
