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
      validate: (v) => /^[a-zA-Z0-9_]{3,32}$/.test(v),
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
        toast.success("Submitted successfully 🔥");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <Toaster position="top-center" />
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1e1e1e] rounded-lg p-6 max-w-md w-full shadow-xl border border-gray-700 relative"
        >
          <h3 className="text-lg font-semibold text-blurple mb-3">
            Order <span className="text-white">{plan}</span> Plan
          </h3>

          {!hideForm && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="plan" value={plan} />

              <div>
                <label className="block text-sm mb-1">Your Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. John"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#2b2b2b] text-white p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Preferred Contact Method
                </label>
                <select
                  value={method}
                  onChange={(e) => {
                    setMethod(e.target.value);
                    setContactValue("");
                  }}
                  required
                  className="w-full bg-[#2b2b2b] text-white p-2 rounded"
                >
                  <option value="">Choose one</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Discord">Discord</option>
                  <option value="Email">Email</option>
                </select>
              </div>

              {selected && (
                <div>
                  <label className="block text-sm mb-1">{selected.label}</label>
                  <input
                    type="text"
                    name={selected.name}
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder={selected.placeholder}
                    required
                    className="w-full bg-[#2b2b2b] text-white p-2 rounded"
                  />
                </div>
              )}

              <textarea
                name="message"
                placeholder="Extra details (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#2b2b2b] text-white p-2 rounded"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blurple to-[#5865F2] hover:from-[#4752c4] hover:to-[#5865F2] text-white font-semibold py-2 rounded shadow transition duration-200"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}

          <button
            onClick={() => {
              setMethod("");
              setContactValue("");
              setName("");
              setMessage("");
              onClose();
            }}
            className="absolute top-2 right-3 text-gray-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Modal;
