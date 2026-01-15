"use client";

import React from "react";

const ReviewStrip = () => {
  const reviews = [
    {
      id: "REF_01",
      name: "Luna",
      role: "Streamer",
      text: "The setup felt intentional and clean. Everything just worked out of the box.",
    },
    {
      id: "REF_02",
      name: "Ayaan",
      role: "E-commerce Founder",
      text: "Clear structure, proper automation, and no unnecessary clutter. Exactly what we needed.",
    },
    {
      id: "REF_03",
      name: "Yuki",
      role: "Community Admin",
      text: "The server finally feels organized. Onboarding and moderation are seamless now.",
    },
    {
      id: "REF_04",
      name: "Nova",
      role: "Operations Lead",
      text: "Delivered fast and built with scalability in mind. Solid systems work.",
    },
    {
      id: "REF_05",
      name: "Mira",
      role: "Content Creator",
      text: "Everything feels thoughtfully designed. Clean, modern, and practical.",
    },
  ];

  const duplicated = [...reviews, ...reviews, ...reviews];

  return (
    <section className="w-full border-t border-white/20 bg-black py-20 font-mono text-zinc-200">
      
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mb-12 border-l-4 border-white pl-6">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Client feedback
          </p>
          <h2 className="mt-2 text-3xl font-bold uppercase tracking-tighter text-white sm:text-4xl">
            Trusted by creators & teams
          </h2>
        </div>

        {/* Marquee Wrapper - NOW FIXED with overflow-hidden */}
        <div className="relative w-full overflow-hidden border-y border-white/20 bg-black">
          
          {/* Fade edges (High Z-index to sit on top) */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-black via-black/80 to-transparent" />

          {/* The Track */}
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {duplicated.map((review, i) => (
              <div
                key={i}
                className="group relative flex w-[350px] flex-shrink-0 flex-col justify-between border-r border-white/20 bg-black p-8 transition-colors duration-0 hover:bg-white hover:text-black"
              >
                {/* ID Tag */}
                <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-black/40">
                   <span>{review.id}</span>
                   <span className="h-1.5 w-1.5 bg-zinc-600 group-hover:bg-black" />
                </div>

                {/* Text */}
                <p className="mb-8 text-sm leading-relaxed">
                  "{review.text}"
                </p>

                {/* Footer */}
                <div className="mt-auto border-t border-white/10 pt-4 group-hover:border-black/10">
                  <p className="text-sm font-bold uppercase tracking-wide">
                    {review.name}
                  </p>
                  <p className="text-xs text-zinc-500 group-hover:text-black/60">
                    {review.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Decorative Line */}
        <div className="mt-2 flex justify-end">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600">
                End_Stream
            </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.33%);
          }
        }

        .animate-marquee {
          animation: marquee 50s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default ReviewStrip;