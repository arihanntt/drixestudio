"use client";

import React from "react";

const ReviewStrip = () => {
  const reviews = [
    {
      id: "CL-001",
      name: "Luna",
      role: "Digital Creator",
      text: "The setup felt intentional and clean. Everything just worked out of the box.",
    },
    {
      id: "INT-07",
      name: "Ayaan",
      role: "E-commerce Founder",
      text: "Clear structure, proper automation, and no unnecessary clutter. Exactly what we needed.",
    },
    {
      id: "PROJ-12",
      name: "Yuki",
      role: "Community Lead",
      text: "The server finally feels organized. Onboarding and moderation are seamless now.",
    },
    {
      id: "CL-004",
      name: "Nova",
      role: "Operations Lead",
      text: "Delivered fast and built with scalability in mind. Solid systems work.",
    },
    {
      id: "INT-15",
      name: "Mira",
      role: "Artist",
      text: "Everything feels thoughtfully designed. Clean, modern, and practical.",
    },
  ];

  // Duplicate only 2x for a cleaner 50% loop logic
  const duplicated = [...reviews, ...reviews];

  return (
    <section 
      itemScope 
      itemType="https://schema.org/Review"
      className="relative w-full border-t border-zinc-900 bg-[#0a0a0a] py-24 sm:py-32 overflow-hidden selection:bg-zinc-800"
    >
      {/* --- RETRO FILM GRAIN --- */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.02] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="mx-auto max-w-7xl px-6 mb-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 mb-6 block">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif italic text-white leading-tight">
          Trusted by <br className="hidden md:block" /> creators & teams.
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden border-y border-zinc-900 py-12">
        
        {/* Cinematic Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        {/* The Track */}
        <div 
          className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused] active:[animation-play-state:paused]"
          onTouchStart={(e) => e.currentTarget.style.animationPlayState = "paused"}
          onTouchEnd={(e) => e.currentTarget.style.animationPlayState = "running"}
        >
          {duplicated.map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="group relative flex w-[400px] flex-shrink-0 flex-col justify-between px-12 transition-all duration-500"
            >
              {/* Review Content */}
              <div>
                <span className="font-mono text-[9px] text-zinc-800 block mb-8 group-hover:text-rose-500 transition-colors">
                  {review.id}
                </span>
                <p 
                  itemProp="reviewBody"
                  className="text-lg md:text-xl font-serif italic text-zinc-400 group-hover:text-white leading-relaxed transition-colors duration-500"
                >
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-12 pt-6 border-t border-zinc-900 flex items-center gap-4">
                <div className="h-px w-6 bg-zinc-800" />
                <div>
                  <p itemProp="author" className="text-xs font-bold uppercase tracking-widest text-white">
                    {review.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-1 font-medium">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default ReviewStrip;