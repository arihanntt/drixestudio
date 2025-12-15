'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import {
  Music,
  Instagram,
  ArrowRight,
  Check,
  Tag,
  Heart,
  Users,
  Smartphone,
  Star,
} from 'lucide-react';
import Header from '../components/Header';

type ProductType = 'spotify' | 'instagram' | null;

export default function BuyPage() {
    const router = useRouter(); // 👈 ADD THIS
  const [selected, setSelected] = useState<ProductType>(null);

  return (
    <div className="min-h-screen bg-[#07080d] text-white overflow-x-hidden">
      <Header />

      {/* ================= CHOOSE KEYCHAIN ================= */}
      {!selected && (
        <section className="relative min-h-screen pt-28 pb-24">
          <div className="absolute inset-0">
            <img
              src="/images/choose-cover.jpg"
              alt="Choose DAZTAO"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/80 lg:bg-gradient-to-b lg:from-black/90 lg:to-black/70" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-20">
              <span className="block text-xs tracking-[0.35em] text-gray-400 mb-4">
                CHOOSE YOUR KEYCHAIN
              </span>
              <h1 className="text-4xl md:text-5xl font-light mb-6">
                What do you want to share?
              </h1>
              <p className="text-gray-400">
                Pick the DAZTAO keychain that matches how you connect.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Spotify */}
              <motion.button
                whileHover={{ y: -6 }}
                onClick={() => setSelected('spotify')}
                className="group relative border border-gray-800 hover:border-gray-600 overflow-hidden text-left"
              >
                <div className="aspect-[4/5]">
                  <img src="/images/spotify-card.jpg" className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <Music className="w-8 h-8 text-green-400 mb-4" />
                  <h2 className="text-2xl font-light mb-2">Spotify Keychain</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Share playlists instantly with one tap.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm">
                    Select <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.button>

              {/* Instagram */}
              <motion.button
                whileHover={{ y: -6 }}
                onClick={() => setSelected('instagram')}
                className="group relative border border-gray-800 hover:border-gray-600 overflow-hidden text-left"
              >
                <div className="aspect-[4/5]">
                  <img src="/images/instagram-card.jpg" className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <Instagram className="w-8 h-8 text-pink-400 mb-4" />
                  <h2 className="text-2xl font-light mb-2">Instagram Keychain</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Share your profile instantly.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm">
                    Select <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* ================= PRODUCT DETAIL ================= */}
      {selected && (
        <section className="px-6 pt-28 pb-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
            {/* MEDIA */}
            <div className="space-y-6">
              <div className="border border-gray-800 aspect-square">
                <img src="/images/spotify-cover.jpg" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* INFO */}
            <div>
              <button onClick={() => setSelected(null)} className="text-sm text-gray-400 mb-6">
                ← Back
              </button>

              <h1 className="text-4xl font-light mb-4">
                {selected === 'spotify' ? 'Spotify NFC Keychain' : 'Instagram NFC Keychain'}
              </h1>

              <p className="text-gray-400 mb-6">
                {selected === 'spotify'
                  ? 'Tap to open your Spotify playlist on any NFC-enabled phone.'
                  : 'Tap to open your Instagram profile instantly.'}
              </p>

              {/* PRICE */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <span className="line-through text-gray-500">₹1000</span>
                  <span className="text-3xl font-light">₹599</span>
                </div>
                <div className="inline-flex items-center gap-2 mt-3 px-3 py-2 border border-gray-700 text-sm">
                  <Tag className="w-4 h-4" /> ₹100 OFF on first order
                </div>
              </div>

              {/* USE CASES */}
              <div className="space-y-4 mb-10">
                {selected === 'spotify' ? (
                  <>
                    <UseCase icon={Heart} text="Create a playlist for your partner and let them open it with a tap." />
                    <UseCase icon={Users} text="Share music instantly at parties or in the car." />
                    <UseCase icon={Smartphone} text="No links, no QR codes — just tap." />
                  </>
                ) : (
                  <>
                    <UseCase icon={Users} text="Share your Instagram when meeting someone new." />
                    <UseCase icon={Heart} text="Perfect for creators, artists, and influencers." />
                    <UseCase icon={Smartphone} text="No typing usernames again." />
                  </>
                )}
              </div>

              {/* NFC DISCLAIMER */}
              <div className="text-xs text-gray-500 mb-10">
                ⚠️ Works on phones with NFC enabled.
                Supported on most Android devices and iPhone XS or newer.
              </div>

              {/* REVIEWS */}
              <div className="space-y-4 mb-10">
                {[
                  'Super smooth, people love it when I tap instead of sending links.',
                  'Gave this to my girlfriend with a playlist, she loved it.',
                  'Way cleaner than sharing usernames.'
                ].map((review, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <Star className="w-4 h-4 text-yellow-400 mt-1" />
                    {review}
                  </div>
                ))}
              </div>

            <button
  onClick={() => router.push('/daztao/cart')}
  className="w-full py-4 bg-white text-black text-sm"
>
  Add to Cart
</button>

            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between text-sm text-gray-500">
          <span>© {new Date().getFullYear()} DAZTAO</span>
          <span>Terms • Privacy</span>
        </div>
      </footer>
    </div>
  );
}

function UseCase({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-300">
      <Icon className="w-4 h-4 text-gray-400" />
      {text}
    </div>
  );
}
