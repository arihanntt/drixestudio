import { useState, useEffect } from "react";
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
              c: { a: 0, k: [0.5, 0.7, 1, 1] },
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

const ContactUsModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
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
      colors: ["#7289da", "#ffffff", "#a0c4ff"],
    });
  };

  const handleSubmit = async (e) => {
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
          setShowSuccessBox(true); // Show success popup
          fireConfetti();
          onClose(); // close modal box

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
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-gradient-to-br from-[#1b1e2b] to-[#0e0f1a] text-white p-6 rounded-2xl border border-blurple/30 shadow-xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -inset-2 bg-blurple/30 blur-2xl opacity-20 rounded-3xl animate-pulse pointer-events-none" />

              <button
                onClick={onClose}
                className="absolute top-4 right-5 text-gray-400 hover:text-white text-2xl z-10"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-white via-blurple to-white bg-clip-text text-transparent z-10 relative">
                Contact Us
              </h2>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4 z-10 relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div>
                  <label className="text-sm mb-1 block text-gray-300">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Arihant"
                    className="w-full px-4 py-2 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blurple"
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block text-gray-300">Preferred Method</label>
                  <select
                    value={method}
                    onChange={(e) => {
                      setMethod(e.target.value);
                      setContact("");
                    }}
                    className="w-full px-4 py-2 rounded-md bg-[#0b0b0c] border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blurple"
                  >
                    <option>Telegram</option>
                    <option>Discord</option>
                    <option>Email</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm mb-1 block text-gray-300">Your Contact</label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={
                      method === "Email"
                        ? "example@gmail.com"
                        : method === "Discord"
                        ? "e.g. user#0001"
                        : "e.g. @yourhandle"
                    }
                    className="w-full px-4 py-2 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blurple"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 font-semibold rounded-md transition-all duration-300 ${
                    loading
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-blurple hover:bg-indigo-500 shadow-lg hover:shadow-blurple/50"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="block w-full text-center text-xs text-gray-400 hover:underline pt-2"
                >
                  Cancel
                </button>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Final Success Box with Confetti */}
      <AnimatePresence>
        {showSuccessBox && (
          <motion.div
            key="success"
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
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
    </>
  );
};

export default ContactUsModal;
