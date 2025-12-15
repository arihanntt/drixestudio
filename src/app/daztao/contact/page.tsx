'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
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
              CONTACT
            </span>

            <h1 className="text-4xl md:text-5xl font-light mb-8">
              Let’s talk.
            </h1>

            <p className="text-gray-400 max-w-2xl leading-relaxed">
              Whether you need support, have a question,
              or want to work with us —
              reach out directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======== CONTINUOUS SIGNAL LINE ======== */}
      <div className="pointer-events-none absolute left-1/2 top-[420px] -translate-x-1/2 w-px h-[1500px] bg-gradient-to-b from-gray-700/40 via-gray-700/20 to-transparent" />

      {/* ================= CONTACT CHANNELS ================= */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

          {/* LEFT */}
          <div>
            <span className="text-xs tracking-[0.3em] text-gray-500">
              DIRECT CHANNELS
            </span>

            <h2 className="text-3xl md:text-4xl font-light mt-6 mb-8">
              Human responses.
              <br />
              No noise.
            </h2>

            <p className="text-gray-400 leading-relaxed max-w-md mb-12">
              We don’t hide behind ticket numbers.
              Every message is read by a real person.
            </p>

            <div className="space-y-8 text-sm text-gray-300">
              <ContactItem
                icon={Mail}
                title="Support"
                value="support@daztao.com"
              />
              <ContactItem
                icon={MessageSquare}
                title="Business"
                value="business@daztao.com"
              />
              <ContactItem
                icon={ShieldCheck}
                title="Privacy"
                value="privacy@daztao.com"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white/[0.03] border border-white/10 p-10 space-y-8">
            <InfoItem
              icon={Zap}
              title="Response time"
              desc="Usually within 24–48 hours."
            />
            <InfoItem
              icon={MapPin}
              title="Operations"
              desc="Remote-first, with fulfillment partners across India."
            />
          </div>
        </div>
      </section>

      {/* ================= SUPPORT NOTE ================= */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400 leading-relaxed">
            For order-related queries,
            please include your order ID in the email.
            This helps us resolve things faster.
          </p>
        </div>
      </section>

      {/* ================= COMPANY ================= */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            DAZTAO is a product by{' '}
            <span className="text-gray-300">Drixe Group</span>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------- helpers ---------- */

function ContactItem({ icon: Icon, title, value }: any) {
  return (
    <div className="flex gap-4">
      <Icon className="w-5 h-5 text-gray-400 mt-1" />
      <div>
        <div className="text-xs tracking-widest text-gray-500 mb-1">
          {title}
        </div>
        <div className="text-sm text-gray-300">
          {value}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex gap-4">
      <Icon className="w-5 h-5 text-gray-400 mt-1" />
      <div>
        <div className="text-sm font-medium text-gray-200">
          {title}
        </div>
        <div className="text-sm text-gray-400">
          {desc}
        </div>
      </div>
    </div>
  );
}
