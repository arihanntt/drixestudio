import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const Footer = () => {
  const [submitting, setSubmitting] = useState(false);
  const iframeRef = useRef(null);

  const handleSubmit = (e) => {
    setSubmitting(true);
    // Toast after a slight delay to simulate submission
    setTimeout(() => {
      toast.success("🎉 Subscription successful!");
      e.target.reset();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="bg-black text-white px-6 py-12 border-t border-neutral-800 mt-20">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
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
            <li><a href="#plans" className="hover:text-white transition">Plans</a></li>
            <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
           
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

        {/* Subscription */}
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
              className="bg-[#111] border border-gray-700 text-sm px-4 py-2 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 text-white font-medium py-2 rounded-xl hover:bg-indigo-500 transition disabled:opacity-60"
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

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Drixe Studio · All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
