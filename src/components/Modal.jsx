import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";

// Simplified success animation
const successAnim = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
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
        p: { a: 0, k: [50, 50, 0] },
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
                    [-20, 0],
                    [-5, 15],
                    [20, -15],
                  ],
                  c: false,
                },
              },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.5, 0.7, 1, 1] },
              w: 4,
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

const Modal = ({ isOpen, onClose, plan }) => {
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
      console.log("Validation failed:", { name, method, contactValue, selected });
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
        setHideForm(true);
        setTimeout(() => {
          setHideForm(false);
          setShowSuccessBox(true);
          confetti({
            particleCount: 50,
            spread: 70,
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
          }, 2000);
        }, 500);
      } else {
        console.log("Submission failed:", await res.text());
        setSubmitting(false);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setHideForm(false);
      setShowSuccessBox(false);
      setSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!hideForm && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="relative w-full max-w-md bg-gradient-to-br from-[#1b1e2b] to-[#0e0f1a] text-white p-5 rounded-xl border border-blurple/20 shadow-lg"
            initial={{ scale: 0.97, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute -inset-2 bg-blurple/20 blur-md opacity-10 rounded-xl pointer-events-none" />
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
              onClick={onClose}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-white via-blurple to-white bg-clip-text text-transparent">
              Order <span className="text-white">{plan}</span> Plan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="hidden" name="plan" value={plan} />

              <div>
                <label className="text-sm mb-1 block text-gray-300">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blurple"
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
                  className="w-full px-3 py-1.5 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blurple"
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
                    className="w-full px-3 py-1.5 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blurple"
                  />
                </div>
              )}

              <div>
                <label className="text-sm mb-1 block text-gray-300">Extra Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Anything else you’d like to add?"
                  className="w-full px-3 py-1.5 rounded-md bg-[#0b0b0c] border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blurple resize-none"
                  rows={2}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-2 font-semibold rounded-md transition-all duration-200 ${
                  submitting
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-blurple hover:bg-indigo-500 shadow-md hover:shadow-blurple/30"
                }`}
              >
                {submitting ? "Submitting..." : "🚀 Submit Order"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
      {showSuccessBox && (
        <motion.div
          key="success"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="bg-[#111] text-white p-4 rounded-xl shadow-lg border border-blurple/30 flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Lottie animationData={successAnim} loop={false} style={{ width: 80 }} />
            <p className="mt-1 text-center text-white">✅ Order submitted successfully!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;