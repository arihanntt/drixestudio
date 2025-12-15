'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Minus,
  Trash,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';
import Header from '../components/Header';

export default function CartPage() {
  const router = useRouter();

  const price = 599;
  const originalPrice = 1000;

  const [quantity, setQuantity] = useState(1);
  const [links, setLinks] = useState<string[]>(['']);

  // Sync link inputs with quantity
  useEffect(() => {
    setLinks((prev) => {
      const updated = [...prev];
      while (updated.length < quantity) updated.push('');
      while (updated.length > quantity) updated.pop();
      return updated;
    });
  }, [quantity]);

  const discount = quantity * 100;
  const subtotal = price * quantity;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-[#07080d] text-white overflow-x-hidden">
      <Header />

      <section className="pt-28 pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light mb-8">
            Your Cart
          </h1>

          {/* MAIN LAYOUT */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10">

            {/* LEFT SECTION */}
            <div className="lg:col-span-2 space-y-8">

              {/* PRODUCT CARD */}
              <div className="flex flex-col sm:flex-row gap-4 border border-gray-800 p-4 sm:p-6">
                
                {/* IMAGE */}
                <div className="w-full sm:w-28 sm:h-28 aspect-square border border-gray-800">
                  <img
                    src="/images/spotify-cover.jpg"
                    alt="Spotify NFC Keychain"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">
                  <h2 className="text-lg font-light mb-1">
                    Spotify NFC Keychain
                  </h2>

                  <p className="text-sm text-gray-400 mb-3">
                    Tap to open your link instantly
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="line-through text-gray-500 text-sm">
                      ₹{originalPrice}
                    </span>
                    <span className="text-lg">₹{price}</span>
                  </div>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border border-gray-700 p-2"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="w-6 text-center">{quantity}</span>

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="border border-gray-700 p-2"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <button className="text-gray-500 hover:text-red-400 flex items-center gap-2 text-sm">
                      <Trash className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* NFC LINKS */}
              <div className="border border-gray-800 p-4 sm:p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <h3 className="text-lg font-light">
                    NFC Links ({quantity})
                  </h3>
                </div>

                {links.map((link, index) => (
                  <input
                    key={index}
                    type="url"
                    value={link}
                    onChange={(e) => {
                      const updated = [...links];
                      updated[index] = e.target.value;
                      setLinks(updated);
                    }}
                    placeholder={`Link for keychain ${index + 1}`}
                    className="w-full bg-black border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                ))}

                <p className="text-xs text-gray-500">
                  Each keychain opens its own link. You can edit these later.
                </p>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="border border-gray-800 p-4 sm:p-6 lg:sticky lg:top-28">
              <h3 className="text-lg font-light mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Special Discount</span>
                  <span className="text-green-400">-₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="border-t border-gray-800 my-5" />

              <div className="flex justify-between text-lg mb-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-green-400 mb-6">
                <Sparkles className="w-4 h-4" />
                Special Limited-Time Offer Applied
              </div>

              <button
                onClick={() => router.push('/daztao/checkout')}
                className="w-full py-4 bg-white text-black text-sm"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between text-sm text-gray-500">
          <span>© {new Date().getFullYear()} DAZTAO</span>
          <span>Terms • Privacy</span>
        </div>
      </footer>
    </div>
  );
}
