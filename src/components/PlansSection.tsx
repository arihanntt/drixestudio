"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

/* --- DYNAMIC CSS 3D MODELS --- */
const PlanModel = ({ type }: { type: string }) => {
  if (type === "Foundation") {
    return (
      <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
        <motion.div 
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-2 border-white/20 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 border border-cyan-500/30 scale-75 rotate-45" />
          <div className="w-2 h-2 bg-cyan-500 shadow-[0_0_15px_rgba(0,229,255,0.8)]" />
        </motion.div>
      </div>
    );
  }

  if (type === "Growth") {
    return (
      <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
        <motion.div 
          animate={{ rotateY: [0, 360], rotateX: [0, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <div className="absolute w-full h-full border border-white/10" />
          <div className="absolute w-full h-full border border-cyan-500/20 rotate-45 scale-110" />
          <div className="absolute w-1/2 h-1/2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/50 flex items-center justify-center">
             <div className="w-4 h-4 bg-cyan-500 shadow-[0_0_20px_rgba(0,229,255,1)]" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
       <motion.div 
          animate={{ rotateY: [0, 360], rotateZ: [0, 5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="relative w-40 h-40 grid grid-cols-2 gap-2 opacity-60"
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-white/20 bg-white/5 flex items-center justify-center">
               <div className="w-1 h-1 bg-cyan-500" />
            </div>
          ))}
          <div className="absolute inset-0 border-2 border-cyan-500/40 scale-125 -z-10 blur-[2px]" />
        </motion.div>
    </div>
  );
};

const PlansSection = () => {
  const router = useRouter();

  const plans = [
    {
      name: "Foundation",
      description: "Essential infrastructure for individuals or small teams.",
      features: [
        "High-performance website",
        "OR custom Discord setup",
        "Clean, strategic design",
        "Mobile-first architecture",
        "Rapid sub-7 day delivery",
      ],
      buttonText: "Start Project",
      isPopular: false,
    },
    {
      name: "Growth",
      description: "Advanced systems built for scaling brands.",
      subText: "Most Popular Choice",
      features: [
        "Multi-page web systems",
        "OR advanced Discord architecture",
        "Bot automation & custom logic",
        "Short-form content packages",
        "Priority development cycle",
      ],
      buttonText: "Initialize Growth",
      isPopular: true,
    },
    {
      name: "Scale",
      description: "The complete ecosystem for established entities.",
      features: [
        "Full Web + Discord integration",
        "Complex backend workflows",
        "Monthly content engineering",
        "Dedicated system architect",
        "24/7 priority support tier",
      ],
      buttonText: "Request Private Quote",
      isPopular: false,
    },
  ];

  return (
    <section
      id="plans"
      className="relative w-full bg-black text-white pt-32 pb-40 overflow-hidden border-t border-white/10 selection:bg-cyan-500 selection:text-black"
    >
      {/* --- THE MASTER GRID LINES --- */}
      <div className="absolute inset-0 z-0 mx-auto w-full max-w-[120rem] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-6 md:left-12 xl:left-32 w-px bg-white/10 hidden md:block" />
        <div className="absolute top-0 bottom-0 right-6 md:right-12 xl:right-32 w-px bg-white/10 hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[120rem] px-6 md:px-12 xl:px-32">
        
        {/* --- MASSIVE HEADER BLOCK --- */}
        <div className="mb-20 md:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-6 mb-8"
            >
              <span className="h-[2px] w-12 bg-cyan-500 block" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                Investment Tiers
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-[7rem] font-black uppercase leading-[0.85] tracking-tighter"
            >
              Clear Pricing. <br />
              <span className="text-white/30">Real Results.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:max-w-sm pb-2"
          >
            <p className="text-base md:text-lg text-white/50 font-medium leading-relaxed italic">
              Simple, flat rates for professional digital architecture. Choose the tier that aligns with your brand's current phase.
            </p>
          </motion.div>
        </div>

        {/* --- BRUTALIST 3D PRICING GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative bg-[#050505] flex flex-col group border transition-all duration-500 ${
                plan.isPopular 
                  ? "border-white/30 shadow-[0_0_80px_rgba(0,0,0,0.9)] lg:scale-[1.08] z-20" 
                  : "border-white/10 hover:border-white/20 z-10 lg:my-8"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 z-30" />
              )}

              <div className="h-12 border-b border-white/10 flex items-center px-8">
                 <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${plan.isPopular ? "text-cyan-400" : "text-white/20"}`}>
                    {plan.isPopular ? plan.subText : "Standard Service"}
                 </span>
              </div>

              {/* DYNAMIC 3D MODEL BOX */}
              <div className="w-full aspect-video bg-[#0a0a0a] border-b border-white/10 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
                <PlanModel type={plan.name} />
              </div>

              {/* Text Content */}
              <div className="p-8 xl:p-10 flex flex-col flex-1">
                <div className="mb-10 min-h-[100px]">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-medium">
                    {plan.description}
                  </p>
                </div>

                {/* Feature List */}
                <ul className="flex-1 space-y-5 mb-12">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-[11px] uppercase tracking-[0.2em] font-bold text-white/70">
                      <span className={`mt-[2px] ${plan.isPopular ? 'text-cyan-500' : 'text-white/30'}`}>■</span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  onClick={() => router.push("/contact")}
                  className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 border ${
                    plan.isPopular 
                      ? "bg-white text-black border-white hover:bg-black hover:text-white" 
                      : "bg-transparent text-white/60 border-white/20 hover:border-white hover:text-white hover:bg-white/5"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM ROUTING BLOCK --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 bg-white/5 border border-white/10 p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">
              System Engineering
            </span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase text-white">
              Need a custom architecture or enterprise setup?
            </span>
          </div>

          <button
            onClick={() => router.push("/contact")}
            className="group flex items-center justify-center border border-white px-10 py-5 hover:bg-white transition-colors duration-500 w-full md:w-auto"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
              Get Custom Quote
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlansSection;