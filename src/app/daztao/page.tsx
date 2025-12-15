'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Smartphone,
  Music,
  Instagram,
  Link,
  Sparkles,
  Heart,
  Users,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useRouter } from 'next/navigation';

export default function DaztaoPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#07080d] text-white overflow-x-hidden">
      <Header />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="DAZTAO NFC Keychain"
            className="w-full h-full object-cover scale-[1.25] sm:scale-110 lg:scale-100 object-[70%_center]"
          />
          <div className="absolute inset-0 bg-black/80 lg:bg-gradient-to-r lg:from-[#07080d] lg:via-[#07080d]/90 lg:to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-screen flex items-center">
          <div className="max-w-xl">
            <span className="block text-xs tracking-[0.35em] text-gray-400 mb-3">
              STOP TYPING.
            </span>
            <h1 className="text-[72px] md:text-[96px] xl:text-[110px] font-light leading-none">
              TAP.
            </h1>
            <p className="mt-6 text-base text-gray-300 max-w-md">
              A premium NFC keychain to share Spotify, Instagram,
              and important links instantly.
            </p>
            <button
              onClick={() => router.push('/daztao/buy')}
              className="mt-10 inline-flex items-center gap-3 px-8 py-3 border border-gray-600 text-sm hover:bg-white hover:text-black transition"
            >
              Buy DAZTAO <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      

      {/* ================= HOW IT WORKS (SIGNAL PATH) ================= */}
<section className="relative py-24">
  <div className="relative max-w-6xl mx-auto px-6">

    <div className="mb-16">
      <span className="text-xs tracking-[0.3em] text-gray-500">
        HOW IT WORKS
      </span>
      <h2 className="mt-4 text-3xl md:text-4xl font-light">
        One action.
        <br />
        Zero friction.
      </h2>
    </div>

    <div className="relative grid md:grid-cols-4 gap-12">

      {/* connector (desktop only) */}
      <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent" />

      {[
        { icon: Smartphone, title: 'Tap', desc: 'Bring DAZTAO close to a phone.' },
        { icon: Music, title: 'Transmit', desc: 'NFC sends your link instantly.' },
        { icon: Link, title: 'Open', desc: 'Spotify or Instagram opens.' },
        { icon: Sparkles, title: 'Remembered', desc: 'People remember the moment.' },
      ].map((item, i) => (
        <div key={i} className="relative">
          <item.icon className="w-8 h-8 text-gray-300 mb-4" />
          <h3 className="text-lg font-light mb-2">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
{/* ================= SIGNAL TRANSITION ================= */}
<section className="relative py-16">
  <div className="max-w-6xl mx-auto px-6 flex justify-center">
    <div className="w-px h-24 bg-gradient-to-b from-gray-700/40 to-transparent" />
  </div>
</section>


      {/* ================= WHY IT FEELS DIFFERENT ================= */}
      <section className="relative py-20 md:py-24">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Built like hardware.
              <br />
              Not an app.
            </h2>
            <p className="text-gray-400 max-w-md leading-relaxed">
              DAZTAO doesn’t ask people to download anything,
              scan anything, or remember anything.
              It exists in the physical world — like keys, wallets,
              and watches.
            </p>
          </div>

          <div className="space-y-8">
            <Feature icon={Zap} title="Instant by nature">
              NFC works the moment devices meet.
            </Feature>
            <Feature icon={ShieldCheck} title="Private by default">
              No tracking. No accounts required.
            </Feature>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="relative py-20 md:py-24">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Built for moments,
              <br />
              not menus.
            </h2>

            <ul className="space-y-8 text-sm text-gray-300">
              <UseItem icon={Heart} text="Gift a Spotify playlist to someone special" />
              <UseItem icon={Users} text="Share Instagram when meeting new people" />
              <UseItem icon={Instagram} text="Perfect for creators and students" />
            </ul>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-10">
            <h3 className="text-xl font-light mb-6">
              NFC-ready devices
            </h3>
            <p className="text-sm text-gray-400">
              Works on most Android phones and iPhone XS or newer.
              No battery. No charging.
            </p>
          </div>
        </div>
      </section>
      {/* ================= WHY PHYSICAL WINS ================= */}
<section className="relative py-20 md:py-24">
  <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20">
    <div>
      <h2 className="text-3xl md:text-4xl font-light mb-6">
        Digital links
        <br />
        weren’t meant to be typed.
      </h2>

      <p className="text-gray-400 leading-relaxed max-w-md">
        Screens already demand too much attention.
        DAZTAO removes friction by making sharing
        physical, immediate, and human.
      </p>
    </div>

    <div className="space-y-8">
      <Feature icon={Zap} title="Faster than memory">
        No usernames to remember or spell.
      </Feature>
      <Feature icon={ShieldCheck} title="Safer by design">
        You control what opens — nothing more.
      </Feature>
      <Feature icon={Sparkles} title="Feels intentional">
        A gesture, not a transaction.
      </Feature>
    </div>
  </div>
</section>
{/* ================= COMPARISON ================= */}
<section className="relative py-20 md:py-24">
  <div className="relative max-w-6xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-light mb-16">
      Why DAZTAO
      <br />
      feels different
    </h2>

    <div className="grid md:grid-cols-2 gap-12">
      <CompareCard
        title="DAZTAO"
        items={[
          'One tap interaction',
          'No apps or setup for others',
          'Private by default',
          'Feels premium & intentional',
        ]}
        highlight
      />

      <CompareCard
        title="QR Codes / Apps"
        items={[
          'Needs camera or app',
          'Feels impersonal',
          'Breaks conversation flow',
          'Often ignored',
        ]}
      />
    </div>
  </div>
</section>



{/* ================= BUILD QUALITY ================= */}
<section className="relative py-20 md:py-24">
  <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20">
    <div>
      <h2 className="text-3xl md:text-4xl font-light mb-6">
        Built to be carried.
        <br />
        Not replaced.
      </h2>

      <p className="text-gray-400 leading-relaxed max-w-md">
        DAZTAO is designed as an object you live with —
        durable, water-resistant, and timeless.
      </p>
    </div>

    <div className="space-y-6 text-sm text-gray-300">
      <div>• Industrial-grade NFC chip</div>
      <div>• Water-resistant housing</div>
      <div>• No battery. No charging.</div>
      <div>• Works for years, not months</div>
    </div>
  </div>
</section>

{/* ================= FUTURE ================= */}
<section className="relative py-20 md:py-24">
  <div className="relative max-w-5xl mx-auto px-6 text-center">
    <span className="text-xs tracking-[0.35em] text-gray-500">
      WHAT’S NEXT
    </span>

    <h2 className="text-3xl md:text-4xl font-light mt-6 mb-8">
      DAZTAO is just the beginning.
    </h2>

    <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
      Today it’s playlists and profiles.
      Tomorrow it’s identity, access, presence.
      We’re building a physical layer
      for the digital world.
    </p>
  </div>
</section>


      {/* ================= FINAL CTA ================= */}
      {/* ================= FINAL CTA ================= */}
<section className="relative py-28">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050507]" />

  <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
    <div>
      <h2 className="text-3xl md:text-4xl font-light">
        The fastest way
        <br />
        to share who you are.
      </h2>

      <p className="mt-6 text-gray-400 max-w-md">
        DAZTAO removes the pause between meeting
        someone and connecting with them.
      </p>
    </div>

    <div className="flex md:justify-end">
      <button
        onClick={() => router.push('/daztao/buy')}
        className="px-16 py-4 bg-white text-black text-sm tracking-wide hover:bg-gray-100 transition"
      >
        Get DAZTAO
      </button>
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
}

function UseItem({ icon: Icon, text }: any) {
  return (
    <li className="flex items-center gap-4">
      <Icon className="w-5 h-5 text-gray-400" />
      {text}
    </li>
  );
}

function Feature({ icon: Icon, title, children }: any) {
  return (
    <div className="flex gap-4">
      <Icon className="w-5 h-5 text-gray-400 mt-1" />
      <div>
        <div className="text-sm font-medium text-gray-200">{title}</div>
        <div className="text-sm text-gray-400">{children}</div>
      </div>
    </div>
  );
}

function CompareCard({ title, items, highlight }: any) {
  return (
    <div
      className={`p-10 border ${
        highlight
          ? 'border-white/20 bg-white/[0.04]'
          : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      <h3 className="text-xl font-light mb-6">{title}</h3>
      <ul className="space-y-4 text-sm text-gray-300">
        {items.map((item: string, i: number) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
