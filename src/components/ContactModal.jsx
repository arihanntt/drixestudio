import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactUsModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [method, setMethod] = useState("Telegram");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || submitted) return;

    if (method === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        alert("Please enter a valid email address.");
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
        setSubmitted(true);
      } else {
        throw new Error("Form error");
      }

      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setName("");
        setContact("");
      }, 2500);
    } catch (err) {
      console.error("❌ Submit failed:", err);
      setSubmitted("error");
      setTimeout(() => setSubmitted(false), 2500);
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-md bg-gradient-to-br from-[#1c1c1c] to-[#111] text-white p-6 rounded-2xl border border-gray-700 shadow-xl"
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-5 text-center tracking-tight bg-gradient-to-r from-white to-blurple bg-clip-text text-transparent">
          Contact Us
        </h2>

        <AnimatePresence mode="wait">
          {submitted === true ? (
            <motion.p
              className="text-green-400 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              ✅ We’ll be in touch shortly!
            </motion.p>
          ) : submitted === "error" ? (
            <motion.p
              className="text-red-500 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              ❌ Something went wrong.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blurple text-sm placeholder-gray-400 transition"
                />
              </div>

              <div className="relative">
                <select
                  value={method}
                  onChange={(e) => {
                    setMethod(e.target.value);
                    setContact("");
                  }}
                  className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blurple text-white"
                >
                  <option>Telegram</option>
                  <option>Discord</option>
                  <option>Email</option>
                </select>
              </div>

              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={
                    method === "Telegram"
                      ? "Telegram Username (e.g. @yourname)"
                      : method === "Discord"
                      ? "Discord Tag (e.g. user#0001)"
                      : "Email Address"
                  }
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-2 bg-[#111] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blurple text-sm placeholder-gray-400 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 font-semibold rounded-md transition-all duration-300 ${
                  loading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-blurple hover:bg-indigo-500 shadow-md hover:shadow-blurple/40"
                }`}
              >
                {loading ? "Sending..." : "Contact Us"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="block w-full text-center text-xs text-gray-400 hover:underline pt-2"
              >
                Cancel
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ContactUsModal;
