'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Shield,
  ShoppingBag,
  AlertTriangle,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
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
              TERMS
            </span>

            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Clear terms.
              <br />
              No fine-print traps.
            </h1>

            <p className="text-gray-400 max-w-sm leading-relaxed">
              These terms define how DAZTAO works,
              what you can expect from us,
              and the responsibilities that come with using the product.
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
            {/* OVERVIEW */}
            <section>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                Agreement overview
              </h2>

              <p className="text-gray-400 leading-relaxed mb-6">
                By accessing the DAZTAO website or purchasing a DAZTAO product,
                you agree to these Terms of Service.
              </p>

              <p className="text-gray-400 leading-relaxed">
                If you do not agree with any part of these terms,
                please discontinue use of our services.
              </p>
            </section>

            {/* SUMMARY CARDS */}
            <section className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: FileText,
                  text: 'Applies to all DAZTAO products and services',
                },
                {
                  icon: ShoppingBag,
                  text: 'Governs purchases, usage, and access',
                },
                {
                  icon: Shield,
                  text: 'Designed to protect both you and DAZTAO',
                },
                {
                  icon: AlertTriangle,
                  text: 'Usage must comply with applicable laws',
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

            {/* PRODUCT USAGE */}
            <section>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                Product usage
              </h2>

              <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
                <p>
                  DAZTAO NFC keychains are intended for lawful
                  and ethical use only.
                  You are solely responsible for the links
                  and content programmed into your product.
                </p>

                <p>
                  You may not use DAZTAO products to distribute
                  malicious links, misleading content,
                  or anything that violates local or international laws.
                </p>

                <p>
                  We reserve the right to refuse service
                  or cancel orders if misuse is suspected.
                </p>
              </div>
            </section>

            {/* ORDERS & PAYMENTS */}
            <section>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                Orders & payments
              </h2>

              <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
                <p>
                  All prices are listed in INR and may change without notice.
                  Discounts and promotional offers are time-limited
                  unless stated otherwise.
                </p>

                <p>
                  Once an order is placed and processed,
                  it cannot be modified.
                  Please review your details carefully before checkout.
                </p>

                <p>
                  DAZTAO reserves the right to cancel or refund orders
                  in cases of payment failure, stock limitations,
                  or fraud prevention.
                </p>
              </div>
            </section>

            {/* LIABILITY */}
            <section>
              <h2 className="text-2xl md:text-3xl font-light mb-6">
                Limitation of liability
              </h2>

              <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
                <p>
                  DAZTAO products are provided “as is”.
                  While we strive for reliability,
                  uninterrupted or error-free operation
                  cannot be guaranteed.
                </p>

                <p>
                  We are not responsible for issues arising from
                  incompatible devices, disabled NFC functionality,
                  or third-party platforms such as Spotify or Instagram.
                </p>

                <p>
                  Our total liability is limited
                  to the amount paid for the product.
                </p>
              </div>
            </section>

            {/* NFC WARNING */}
            <section className="bg-white/[0.03] border border-white/10 p-10 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-gray-400 mt-1" />
              <p className="text-sm text-gray-400 leading-relaxed">
                NFC functionality depends on the receiving device.
                DAZTAO does not guarantee compatibility
                with all phones, especially those without NFC support.
              </p>
            </section>

            {/* COMPANY */}
            <section className="text-sm text-gray-500 leading-relaxed">
              DAZTAO is a product by{' '}
              <span className="text-gray-300">Drixe Group</span>.
              These terms apply across all DAZTAO offerings.
            </section>

            {/* CONTACT */}
            <section>
              <h3 className="text-xl font-light mb-4">
                Questions about these terms?
              </h3>

              <p className="text-gray-400 mb-4">
                We believe clarity builds trust.
              </p>

              <p className="text-sm text-gray-300 tracking-wide">
                legal@daztao.com
              </p>
            </section>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
