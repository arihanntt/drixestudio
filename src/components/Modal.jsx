import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const Modal = ({ onClose, plan }) => {
  if (!plan) return null;

  const [method, setMethod] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const formAction = "https://submit-form.com/J8bwGvLum";

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

    if (!name || !method || !contactValue) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (selected && !selected.validate(contactValue)) {
      toast.error(`Please enter a valid ${method}`);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(formAction, {
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
        toast.success("🎉 Submitted successfully!");
        setHideForm(true);
        setTimeout(() => {
          setSubmitting(false);
          setHideForm(false);
          setMethod("");
          setContactValue("");
          setName("");
          setMessage("");
          onClose();
        }, 3000);
      } else {
        toast.error("Something went wrong.");
        setSubmitting(false);
      }
    } catch (err) {
      toast.error("Network error.");
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 backdrop-blur-md">
      <Toaster position="top-center" />
      <AnimatePresence>
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-br from-[#1e1e1e] to-[#111] border border-gray-700 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md shadow-2xl text-white"
        >
          <h3 className="text-xl font-bold mb-4 text-blurple text-center">
            Order <span className="text-white">{plan}</span> Plan
          </h3>

          {!hideForm && (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm">
              <input type="hidden" name="plan" value={plan} />

              {/* Name */}
              <div className="relative group">
                <label className="absolute text-xs left-3 top-1 text-gray-400 group-focus-within:text-blurple transition-all">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-5 bg-black bg-opacity-30 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blurple"
                  placeholder="e.g. John"
                />
              </div>

              {/* Method */}
              <div className="relative group">
                <label className="absolute text-xs left-3 top-1 text-gray-400 group-focus-within:text-blurple transition-all">
                  Preferred Contact Method
                </label>
                <select
                  required
                  value={method}
                  onChange={(e) => {
                    setMethod(e.target.value);
                    setContactValue("");
                  }}
                  className="w-full mt-5 bg-black bg-opacity-30 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blurple"
                >
                  <option value="">Choose one</option>
                  <option>Telegram</option>
                  <option>Discord</option>
                  <option>Email</option>
                </select>
              </div>

              {/* Contact Input */}
              {selected && (
                <div className="relative group">
                  <label className="absolute text-xs left-3 top-1 text-gray-400 group-focus-within:text-blurple transition-all">
                    {selected.label}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder={selected.placeholder}
                    className="w-full mt-5 bg-black bg-opacity-30 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blurple"
                  />
                </div>
              )}

              {/* Message */}
              <div className="relative group">
                <label className="absolute text-xs left-3 top-1 text-gray-400 group-focus-within:text-blurple transition-all">
                  Extra Details (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Let us know anything specific..."
                  className="w-full mt-5 bg-black bg-opacity-30 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blurple resize-none"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 font-semibold rounded-md transition-all duration-300 bg-blurple hover:bg-indigo-500 shadow-md hover:shadow-blurple/30 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "🚀 Submit Order"}
              </button>
            </form>
          )}

          {/* Close Button */}
          <button
            onClick={() => {
              setMethod("");
              setContactValue("");
              setName("");
              setMessage("");
              onClose();
            }}
            className="absolute top-3 right-4 text-gray-400 hover:text-white text-lg hover:rotate-90 transition"
          >
            ×
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Modal;
