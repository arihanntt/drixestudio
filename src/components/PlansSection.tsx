'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const PlansSection = () => {
  const router = useRouter();

  return (
    <section 
      id="plans"
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 overflow-hidden border-t border-neutral-800"
    >
      {/* Static background (no animations) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a12] via-[#0f0c24] to-[#0a0618]" />
        <div className="absolute -left-[200px] -top-[200px] w-[600px] h-[600px] rounded-full bg-violet-600/10" />
        <div className="absolute -right-[200px] -bottom-[200px] w-[600px] h-[600px] rounded-full bg-indigo-600/10" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-xs sm:text-sm font-mono text-violet-400 mb-2 block">
              SIMPLE PRICING
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-300">
                Flexible
              </span>{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Transparent</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full" />
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                Fair
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 text-base sm:text-lg mt-6 max-w-3xl mx-auto"
          >
            Custom solutions for communities of all sizes, with <span className="text-violet-300">no hidden fees</span>.
          </motion.p>
        </div>

        {/* Value Propositions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              title: "Pay As You Grow",
              description: "Scale your plan as your community expands",
              icon: "📈"
            },
            {
              title: "No Lock-in",
              description: "Cancel or change plans anytime",
              icon: "🔓"
            },
            {
              title: "All Features Included",
              description: "No artificial limitations",
              icon: "✨"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-black/40 to-gray-900/30 border border-gray-700/50"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => router.push("/plans")}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-700 hover:to-indigo-700 transition-colors"
          >
            Explore Pricing Options
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Need help deciding? <span className="text-violet-300 cursor-pointer hover:underline">Chat with us</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PlansSection;