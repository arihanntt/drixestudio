import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";

// Simple checkmark success animation
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

const Modal = ({ onClose, plan }) => {
  const [method, setMethod] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessBox, setShowSuccessBox] = useState(false);

  const contactFields = {
    Telegram: {
      name: "telegram",
      label: "Your Telegram Username",
      placeholder: "e.g. darkxkid",
      validate: (v) => /^[a-zA-Z0-9_]{4,32}$/.test(v),
    },
    Discord: {
      name: "discord",
      label: "Your Discord Username",
      placeholder: "e.g. drixeeee",
      validate: (v) => /^[a-zA-Z0-9_#]{3,32}$/.test(v),
    },
    Email: {
      name: "email",
      label: "Your Email Address",
      placeholder: "e.g. drixe@example.com",
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    },
  };

  const selected = contactFields[method];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !method || !contactValue || (selected && !selected.validate(contactValue))) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("https://submit-form.com/J8bwGvLum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          plan,
          message,
          [selected.name]: contactValue,
        }),
      });

      if (res.ok || res.status === 202) {
        const audio = new Audio("/success.mp3");
        audio.play().catch(() => {});
        setHideForm(true);
        setTimeout(() => {
          setHideForm(false);
          setShowSuccessBox(true);
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            zIndex: 9999,
            colors: ["#7289da", "#ffffff", "#a0c4ff"],
          });

          setTimeout(() => {
            setShowSuccessBox(false);
            onClose();
            setName("");
            setMethod("");
            setContactValue("");
            setMessage("");
            setSubmitting(false);
          }, 2500);
        }, 800);
      } else {
        setSubmitting(false);
      }
    } catch (err) {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!hideForm && (
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
                className="absolute top-4 right-5 text-gray-400 hover:text-white text-2xl z-10"
                onClick={onClose}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-white via-blurple to-white bg-clip-text text-transparent z-10 relative">
                Order <span className="text-white">{plan}</span> Plan
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
                <input type="hidden" name="plan" value={plan} />

                <div>
                  <label className="text-sm mb-1 block text-gray-300">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blurple"
                    placeholder="e.g. John"
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block text-gray-300">Preferred Contact</label>
                  <select
                    required
                    value={method}
                    onChange={(e) => {
                      setMethod(e.target.value);
                      setContactValue("");
                    }}
                    className="w-full px-4 py-2 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blurple"
                  >
                    <option value="">Choose one</option>
                    <option>Telegram</option>
                    <option>Discord</option>
                    <option>Email</option>
                  </select>
                </div>

                {selected && (
                  <div>
                    <label className="text-sm mb-1 block text-gray-300">{selected.label}</label>
                    <input
                      type="text"
                      required
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={selected.placeholder}
                      className="w-full px-4 py-2 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blurple"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm mb-1 block text-gray-300">Extra Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Anything else you’d like to add?"
                    className="w-full px-4 py-2 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blurple resize-none"
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-2.5 font-semibold rounded-md transition-all duration-300 ${
                    submitting
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-blurple hover:bg-indigo-500 shadow-lg hover:shadow-blurple/50"
                  }`}
                >
                  {submitting ? "Submitting..." : "🚀 Submit Order"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Final Success Popup with Confetti */}
      <AnimatePresence>
        {showSuccessBox && (
          <motion.div
            key="success"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
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
              <p className="mt-2 text-center text-white">✅ Order submitted successfully!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
