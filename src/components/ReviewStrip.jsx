"use client";

import React from "react";

const ReviewStrip = () => {
  const reviews = [
    {
      name: "Luna",
      role: "Streamer",
      text: "The setup felt intentional and clean. Everything just worked out of the box.",
    },
    {
      name: "Ayaan",
      role: "E-commerce Founder",
      text: "Clear structure, proper automation, and no unnecessary clutter. Exactly what we needed.",
    },
    {
      name: "Yuki",
      role: "Community Admin",
      text: "The server finally feels organized. Onboarding and moderation are seamless now.",
    },
    {
      name: "Nova",
      role: "Operations Lead",
      text: "Delivered fast and built with scalability in mind. Solid systems work.",
    },
    {
      name: "Mira",
      role: "Content Creator",
      text: "Everything feels thoughtfully designed. Clean, modern, and practical.",
    },
  ];

  const duplicated = [...reviews, ...reviews];

  return (
    <section className="border-t border-white/10 bg-black py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-wide text-white/40">
            Client feedback
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-medium text-white">
            Trusted by creators & teams
          </h2>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="flex w-max gap-6 animate-marquee">
            {duplicated.map((review, i) => (
              <div
                key={i}
                className="w-[320px] flex-shrink-0 rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm text-white/80 leading-relaxed">
                  “{review.text}”
                </p>

                <div className="mt-4">
                  <p className="text-sm font-medium text-white">
                    {review.name}
                  </p>
                  <p className="text-xs text-white/50">
                    {review.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 45s linear infinite;
          will-change: transform;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ReviewStrip;
