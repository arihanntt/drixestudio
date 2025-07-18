'use client';

import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const Footer = () => {
  const [submitting, setSubmitting] = useState(false);
  const iframeRef = useRef(null);

  const handleSubmit = (e) => {
    setSubmitting(true);
    setTimeout(() => {
      toast.success("🎉 Subscription successful!");
      e.target.reset();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="relative z-10 overflow-hidden text-white px-6 py-20 border-t border-neutral-800 bg-black">
      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-blurple/20 blur-[160px] rounded-full opacity-10 animate-pulse" />

        {/* ✳️ Grid lines */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-5 mask-vignette pointer-events-none"
        >
          {[...Array(12)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={(i + 1) * 8} x2="100" y2={(i + 1) * 8} stroke="white" strokeWidth="0.2" />
          ))}
          {[...Array(12)].map((_, i) => (
            <line key={`v-${i}`} y1="0" x1={(i + 1) * 8} y2="100" x2={(i + 1) * 8} stroke="white" strokeWidth="0.2" />
          ))}
        </svg>
      </div>

      {/* 👁️ Vignette */}
      <style>{`
        .mask-vignette {
          mask-image: radial-gradient(circle at center, white 30%, transparent 85%);
          -webkit-mask-image: radial-gradient(circle at center, white 30%, transparent 85%);
        }
      `}</style>

      <Toaster position="top-center" />

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand */}
        <div>
          <h2 className="text-lg font-bold mb-4">Drixe Studio</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Helping creators grow since 2019. We build tools, bots, and experiences for Discord and beyond.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-bold mb-4">Navigation</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/plans" className="hover:text-white hover:underline transition duration-200">
                💼 PLANS
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white hover:underline transition duration-200">
                📩 CONTACT
              </Link>
            </li>
            <li>
              <Link href="/whyus" className="hover:text-white hover:underline transition duration-200">
                💖 WHY US
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white hover:underline transition duration-200">
                ❓ FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-bold mb-4">Connect</h2>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href="https://discord.com/users/928934131893686292"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#5865F2] text-[#5865F2] px-4 py-2 rounded-full hover:bg-[#5865F2] hover:text-black transition"
            >
              💬 Discord
            </a>
            <a
              href="https://t.me/darkxkid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-teal-400 text-teal-400 px-4 py-2 rounded-full hover:bg-teal-400 hover:text-black transition"
            >
              📱 Telegram
            </a>
            <a
              href="mailto:drixebusiness@gmail.com"
              className="inline-block border border-rose-400 text-rose-400 px-4 py-2 rounded-full hover:bg-rose-400 hover:text-black transition"
            >
              📧 Email
            </a>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h2 className="text-lg font-bold mb-4">Subscribe</h2>
          <form
            action="https://submit-form.com/J8bwGvLum"
            method="POST"
            target="hidden_iframe"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="bg-[#111] border border-gray-700 text-sm px-4 py-2 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blurple"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-blurple text-white font-medium py-2 rounded-xl hover:bg-opacity-90 transition disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Subscribe Now"}
            </button>
          </form>
          <iframe
            name="hidden_iframe"
            style={{ display: "none" }}
            ref={iframeRef}
          />
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-16 border-t border-gray-700 pt-6 text-center text-sm text-gray-500 relative z-10">
        <p>© {new Date().getFullYear()} Drixe Studio · All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
