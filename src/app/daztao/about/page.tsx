'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Smartphone,
  Link as LinkIcon,
  ShieldCheck,
  Zap,
  Users,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#07080d] text-white overflow-x-hidden">
      <Header />

      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="block text-xs tracking-[0.35em] text-gray-400 mb-4">
              ABOUT DAZTAO
            </span>

            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Built for how people
              <br />
              actually connect.
            </h1>

            <p className="text-gray-400 max-w-2xl leading-relaxed">
              DAZTAO exists to remove friction from everyday sharing.
              We believe connections should be instant, physical,
              and intentional — not hidden behind usernames,
              apps, or awkward typing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======== CONTINUOUS SIGNAL LINE ======== */}
      <div className="pointer-events-none absolute left-1/2 top-[420px] -translate-x-1/2 w-px h-[1800px] bg-gradient-to-b from-gray-700/40 via-gray-700/20 to-transparent" />

      {/* ================= PHILOSOPHY ================= */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

          {/* LEFT */}
          <div>
            <span className="text-xs tracking-[0.3em] text-gray-500">
              PHILOSOPHY
            </span>

            <h2 className="text-3xl md:text-4xl font-light mt-6 mb-8">
              Presence over platforms.
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Sharing links shouldn’t feel transactional.
              Whether it’s music you love, a profile you’re proud of,
              or something personal — it should feel natural.
            </p>

            <p className="text-gray-400 leading-relaxed max-w-md">
              DAZTAO turns a simple tap into a moment.
              No batteries. No screens.
              Just presence.
            </p>
          </div>

          {/* RIGHT – SIGNAL BLOCK */}
          <div className="bg-white/[0.03] border border-white/10 p-10 space-y-8">
            <Feature
              icon={Zap}
              title="Physical by design"
              desc="Built to exist in the real world, not behind a UI."
            />
            <Feature
              icon={Smartphone}
              title="Instant interaction"
              desc="Works with NFC-enabled phones in one motion."
            />
            <Feature
              icon={LinkIcon}
              title="One object, many identities"
              desc="Change links anytime without replacing hardware."
            />
            <Feature
              icon={ShieldCheck}
              title="Privacy-first"
              desc="No tracking. No data selling. Ever."
            />
          </div>
        </div>
      </section>

      {/* ================= WHY IT MATTERS ================= */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          <div className="bg-white/[0.03] border border-white/10 p-10">
            <h3 className="text-xl font-light mb-6">
              Designed for humans
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Technology should disappear when it works.
              DAZTAO doesn’t ask for attention —
              it earns it through simplicity.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Less friction.
              <br />
              More meaning.
            </h2>

            <ul className="space-y-6 text-sm text-gray-300">
              <ListItem text="No apps to download" />
              <ListItem text="No usernames to spell out" />
              <ListItem text="No explanations needed" />
            </ul>
          </div>
        </div>
      </section>

      {/* ================= COMPANY ================= */}
      <section className="relative py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-[0.3em] text-gray-500">
            COMPANY
          </span>

          <h2 className="text-3xl md:text-4xl font-light mt-6 mb-8">
            A Drixe Group Company
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
            DAZTAO is built by Drixe Group —
            a technology-driven company focused on
            modern, human-first digital experiences.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050507]" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-light">
              One tap can say a lot.
            </h2>
            <p className="mt-4 text-gray-400 max-w-md">
              Carry what matters.
              Share it instantly.
            </p>
          </div>

          <a
            href="/daztao/buy"
            className="px-14 py-4 bg-white text-black text-sm tracking-wide hover:bg-gray-100 transition"
          >
            Explore DAZTAO
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- helpers ---------- */

function Feature({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex gap-4">
      <Icon className="w-5 h-5 text-gray-400 mt-1" />
      <div>
        <div className="text-sm font-medium text-gray-200">{title}</div>
        <div className="text-sm text-gray-400">{desc}</div>
      </div>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-4">
      <Users className="w-4 h-4 text-gray-500" />
      {text}
    </li>
  );
}
