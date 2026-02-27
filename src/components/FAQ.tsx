"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

/* --- 3D ARCHITECTURAL DECORATION --- */
const FloatingStructure = () => (
  <div className="relative w-full h-[200px] hidden lg:flex items-center justify-center [perspective:1000px]">
    <motion.div 
      animate={{ 
        rotateY: [0, 360],
        rotateX: [10, -10, 10]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="relative w-32 h-32 border border-cyan-500/30"
    >
      <div className="absolute inset-0 border border-white/10 translate-z-10 scale-110" />
      <div className="absolute inset-0 border border-white/5 -translate-z-10 scale-90" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(0,229,255,0.8)]" />
    </motion.div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const router = useRouter();

  const faqs = [
    {
      question: "Who is your ideal client?",
      answer: "We work with creators, startups, and brands that need high-performance digital systems. Whether it is a conversion-focused website or a scalable Discord community, we build for those who value structure over shortcuts."
    },
    {
      question: "Standalone service or package?",
      answer: "Both. You can hire us for a specific website build or a Discord setup as independent projects. Our systems are modular, meaning they can be integrated together at any time as your brand grows."
    },
    {
      question: "What is the delivery timeline?",
      answer: "Most technical architectures are delivered within 1 to 3 weeks. We prioritize clean execution over rushed delivery to ensure your system is stable and production-ready from day one."
    },
    {
      question: "Who owns the final project?",
      answer: "100% legal ownership is transferred to you upon final payment. This includes all custom code, assets, server permissions, and hosting credentials. We build it, you own it."
    },
    {
      question: "Is there ongoing support?",
      answer: "Every build includes a post-launch stabilization window. For long-term maintenance, custom bot updates, or monthly social media content, we offer dedicated support retainers."
    }
  ];

  return (
    <section
      className="relative w-full bg-black text-white pt-32 pb-40 overflow-hidden border-b border-white/10 selection:bg-cyan-500 selection:text-black"
      aria-labelledby="faq-heading"
    >
      {/* --- THE MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">
        
        {/* --- HEADER BLOCK (Split Layout) --- */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-b border-white/10 pb-12">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-8"
            >
              <span className="h-[2px] w-12 bg-cyan-500 block" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                Logistics & Support
              </span>
            </motion.div>
            
            <motion.h2
              id="faq-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85]"
            >
              Project <br />
              <span className="text-white/30">Inquiries.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-4 pb-4">
            <FloatingStructure />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-sm md:text-base text-white/50 font-medium leading-relaxed italic border-l border-white/10 pl-6"
            >
              Direct answers to common questions about our technical standards and operational workflow.
            </motion.p>
          </div>
        </div>

        {/* --- BRUTALIST ACCORDION --- */}
        <div className="w-full border-t border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div key={index} className="border-b border-white/10 group relative overflow-hidden">
                {/* Active Light Leak Effect */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between py-10 md:py-14 text-left outline-none cursor-crosshair relative z-10"
                >
                  <div className="flex items-start md:items-center gap-8 md:gap-16 w-full pr-8">
                    <span className={`font-mono text-xs md:text-sm tracking-[0.4em] transition-colors duration-500 ${isOpen ? 'text-cyan-500' : 'text-white/20'}`}>
                      Q_0{index + 1}
                    </span>
                    
                    <span className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter transition-colors duration-500 ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <div className={`absolute w-full h-[2px] transition-all duration-500 ${isOpen ? 'bg-cyan-500 rotate-180 scale-x-75' : 'bg-white/20 group-hover:bg-white'}`} />
                    <div className={`absolute w-full h-[2px] transition-all duration-500 ${isOpen ? 'bg-cyan-500 rotate-180 opacity-0' : 'bg-white/20 rotate-90 group-hover:bg-white'}`} />
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ 
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden relative z-10"
                >
                  <div className="pb-16 pl-12 md:pl-[6.5rem] lg:pl-[8.5rem] max-w-3xl">
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/60 font-medium border-l-2 border-cyan-500/20 pl-8">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* --- BOTTOM ROUTING BLOCK --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-white/5 border border-white/10 p-10 md:p-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">
              System Documentation
            </span>
            <span className="text-sm md:text-base font-bold tracking-[0.1em] uppercase text-white">
              Need more technical details? Start a conversation.
            </span>
          </div>

          <button
            onClick={() => router.push("/contact")}
            className="group flex items-center justify-center bg-white px-12 py-5 hover:bg-cyan-400 transition-all duration-300 w-full md:w-auto"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black">
              Contact Us
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQSection;