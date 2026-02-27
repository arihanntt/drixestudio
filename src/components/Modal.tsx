"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";

// Refined Brutalist success animation (Matches Cyan branding)
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
              c: { a: 0, k: [0, 0.9, 1, 1] }, // Cyan Stroke
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: string;
}

const Modal = ({ isOpen, onClose, plan }: ModalProps) => {
  const [method, setMethod] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessBox, setShowSuccessBox] = useState(false);

  const contactFields: Record<string, any> = {
    Telegram: {
      name: "telegram",
      label: "Telegram Handle",
      placeholder: "@username",
      validate: (v: string) => v.length > 2,
    },
    Discord: {
      name: "discord",
      label: "Discord Username",
      placeholder: "username",
      validate: (v: string) => v.length > 2,
    },
    Email: {
      name: "email",
      label: "Email Address",
      placeholder: "name@company.com",
      validate: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    },
  };

  const selected = contactFields[method];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !method || !contactValue || (selected && !selected.validate(contactValue))) return;

    setSubmitting(true);

    try {
      const res = await fetch("https://submit-form.com/J8bwGvLum", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, plan, message, [selected.name]: contactValue }),
      });

      if (res.ok) {
        setHideForm(true);
        setTimeout(() => {
          setHideForm(false);
          setShowSuccessBox(true);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 99999,
            colors: ["#00E5FF", "#FFFFFF", "#333333"],
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
        }, 400);
      }
    } catch (err) {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!hideForm && (
        <motion.div
          key="modal-overlay"
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-lg bg-black border border-white/10 p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,1)] overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            {/* Top Cyan Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />

            <button
              className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors text-2xl font-light"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[2px] w-8 bg-cyan-500 block" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  Project Initialization
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">
                Order <br />
                <span className="text-white/40">{plan} Plan.</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-3 block">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#050505] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-3 block">Platform</label>
                  <select
                    required
                    value={method}
                    onChange={(e) => {
                      setMethod(e.target.value);
                      setContactValue("");
                    }}
                    className="w-full px-4 py-3 bg-[#050505] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors rounded-none appearance-none cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option>Telegram</option>
                    <option>Discord</option>
                    <option>Email</option>
                  </select>
                </div>
              </div>

              {selected && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-3 block">{selected.label}</label>
                  <input
                    type="text"
                    required
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder={selected.placeholder}
                    className="w-full px-4 py-3 bg-[#050505] border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500 transition-colors rounded-none"
                  />
                </motion.div>
              )}

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-3 block">Project Notes</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-[#050505] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors rounded-none resize-none"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-300 border ${
                  submitting
                    ? "bg-white/10 text-white/40 border-white/10 cursor-not-allowed"
                    : "bg-white text-black border-white hover:bg-cyan-400 hover:border-cyan-400"
                }`}
              >
                {submitting ? "Processing..." : "Submit Project Order"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {showSuccessBox && (
        <motion.div
          key="success-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black border border-white/10 p-12 flex flex-col items-center max-w-sm w-full relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
            <Lottie animationData={successAnim} loop={false} style={{ width: 100, marginBottom: 20 }} />
            <p className="text-xl font-black uppercase tracking-tighter text-white mb-2">Order Initialized.</p>
            <p className="text-xs font-medium text-white/40 text-center leading-relaxed">
              We have received your request. An architect will contact you within 24 hours.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;