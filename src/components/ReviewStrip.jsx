'use client';

import React, { useRef } from "react";
import { motion } from "framer-motion";

const ReviewStrip = () => {
  const reviews = [
    {
      name: "Luna",
      role: "Streamer | Valorant",
      tag: "Gaming",
      avatar: "/avatars/luna.gif",
      text: "Insane setup! Got exactly what I imagined and even more. Love the custom emojis and vibe!",
      stars: 5,
      reaction: "🎮",
      color: "from-purple-600 to-indigo-600"
    },
    {
      name: "Ayaan",
      role: "Ecom Brand Owner",
      tag: "Business",
      avatar: "/avatars/ayaan.gif",
      text: "Super clean layout. My support system is automated now. My team loved the result.",
      stars: 5,
      reaction: "💼",
      color: "from-blue-600 to-teal-600"
    },
    {
      name: "Yuki",
      role: "Anime Server Admin",
      tag: "Kawaii",
      avatar: "/avatars/yuki.gif",
      text: "My server looks like a literal dream 🌸 the animated channels and themed bots are fire!",
      stars: 5,
      reaction: "🌸",
      color: "from-pink-600 to-rose-600"
    },
    {
      name: "Nova",
      role: "Community Lead",
      tag: "Moderation",
      avatar: "/avatars/nova.gif",
      text: "Was up and running within a day. Dashboard + logging setup was chef's kiss. 10/10.",
      stars: 5,
      reaction: "🛡️",
      color: "from-amber-600 to-yellow-600"
    },
    {
      name: "Mira",
      role: "Tech Influencer",
      tag: "Content",
      avatar: "/avatars/mira.gif",
      text: "My creator hub is perfect. Commands, alerts, and auto-content — loved the creativity!",
      stars: 5,
      reaction: "🚀",
      color: "from-emerald-600 to-cyan-600"
    },
  ];

  // Only duplicate once for the marquee
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden py-16 bg-black border-t border-neutral-800">
      {/* Simplified static background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05)_0%,rgba(0,0,0,1)_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Header - Reduced animations */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-violet-400 tracking-wider mb-3">
            ✨ COMMUNITY VERIFIED
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by 100+ Creators
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base">
            Real results from real clients across industries
          </p>
        </div>

        {/* Optimized Marquee - CSS animation instead of Framer */}
        <div className="relative overflow-hidden">
          {/* Gradient fades */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          {/* Static marquee animation - much more performant */}
          <div className="flex gap-6 w-max animate-marquee">
            {duplicatedReviews.map((review, i) => (
              <div
                key={`${review.name}-${i}`}
                className="w-72 flex-shrink-0 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm hover:border-violet-500 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-violet-500"
                      loading="lazy"
                      width={48}
                      height={48}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-violet-600 rounded-full p-1 text-xs">
                      {review.reaction}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{review.name}</h3>
                      <span className="text-emerald-400 text-xs">✔️</span>
                    </div>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-5 italic leading-relaxed">
                  "{review.text}"
                </p>

                <div className="flex justify-between items-center">
                  <div className="text-yellow-400 text-sm">
                    {"⭐".repeat(review.stars)}
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${review.color} text-white`}>
                    #{review.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animations - much more performant than JS animations */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform; /* Optimize for GPU */
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ReviewStrip;