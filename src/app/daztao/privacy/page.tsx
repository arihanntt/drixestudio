'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Database,
  EyeOff,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#07080d] text-white overflow-x-hidden">
      <Header />

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 px-6">
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:90px_90px]" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-20">
          {/* LEFT */}
          <div className="sticky top-32 self-start">
            <span className="block text-xs tracking-[0.35em] text-gray-500 mb-6">
              PRIVACY
            </span>

            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Your data.
              <br />
              Your control.
            </h1>

            <p className="text-gray-400 max-w-sm leading-relaxed">
              Privacy isn’t a setting at DAZTAO.
              It’s the default.
            </p>

            {/* vertical signal */}
            <div className="mt-12 h-40 w-px bg-gradient-to-b from-gray-700/60 to-transparent" />
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-20"
          >
            {/* CORE PHILOSOPHY */}
            <section>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                Privacy by design
              </h2>

              <p className="text-gray-400 leading-relaxed mb-6">
                DAZTAO is built around a simple principle:
                you should control what you share, when you share it,
                and with whom you share it.
              </p>

              <p className="text-gray-400 leading-relaxed">
                We collect the absolute minimum data required
                to deliver and personalize your product —
                nothing more.
              </p>
            </section>

            {/* PRINCIPLES GRID */}
            <section className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: EyeOff,
                  text: 'No ads. No trackers. No profiling.',
                },
                {
                  icon: Database,
                  text: 'Only essential data is stored.',
                },
                {
                  icon: Lock,
                  text: 'Sensitive information is encrypted.',
                },
                {
                  icon: ShieldCheck,
                  text: 'We never sell or share personal data.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/10 p-6"
                >
                  <item.icon className="w-5 h-5 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-300">{item.text}</p>
                </div>
              ))}
            </section>

            {/* DATA COLLECTION */}
            <section>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                What we collect
              </h2>

              <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
                <p>
                  When you place an order, we collect basic details
                  such as your name, contact information,
                  and shipping address to fulfill your purchase.
                </p>

                <p>
                  Links you assign to your NFC keychain are stored
                  only for the purpose of programming your product
                  and enabling its functionality.
                </p>

                <p>
                  We do not track, log, or analyze how others
                  interact with your DAZTAO keychain after delivery.
                </p>
              </div>
            </section>

            {/* NFC EXPLANATION */}
            <section className="bg-white/[0.03] border border-white/10 p-10">
              <h3 className="text-xl font-light mb-6">
                About NFC interactions
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                NFC interactions occur directly between the keychain
                and the receiving phone.
                DAZTAO does not intercept, log,
                or analyze these interactions in any form.
              </p>
            </section>

            {/* COMPANY */}
            <section className="text-sm text-gray-500 leading-relaxed">
              DAZTAO is a product by{' '}
              <span className="text-gray-300">Drixe Group</span>.
              Privacy standards are enforced consistently
              across all Drixe Group products.
            </section>

            {/* CONTACT */}
            <section>
              <h3 className="text-xl font-light mb-4">
                Questions about privacy?
              </h3>

              <p className="text-gray-400 mb-4">
                Transparency matters to us.
                Reach out anytime.
              </p>

              <p className="text-sm text-gray-300 tracking-wide">
                privacy@daztao.com
              </p>
            </section>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
