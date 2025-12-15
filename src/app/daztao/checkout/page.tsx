'use client';

import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import Header from '../components/Header';

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#07080d] text-white overflow-x-hidden">
      <Header />

      <section className="pt-28 pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* PAGE TITLE */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-light mb-2">
              Checkout
            </h1>
            <p className="text-sm text-gray-400">
              Complete your order securely
            </p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">

            {/* LEFT: CUSTOMER DETAILS */}
            <div className="lg:col-span-2 space-y-10">

              {/* SHIPPING ADDRESS */}
              <div className="border border-gray-800 p-6 space-y-6">
                <h2 className="text-lg font-light">
                  Shipping Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="checkout-input"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="checkout-input"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="checkout-input"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="checkout-input"
                />

                <input
                  type="text"
                  placeholder="Street Address"
                  className="checkout-input"
                />

                <div className="grid sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="checkout-input"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="checkout-input"
                  />
                  <input
                    type="text"
                    placeholder="PIN Code"
                    className="checkout-input"
                  />
                </div>
              </div>

              {/* ORDER NOTES */}
              <div className="border border-gray-800 p-6">
                <h2 className="text-lg font-light mb-4">
                  Order Notes (Optional)
                </h2>

                <textarea
                  placeholder="Any delivery instructions?"
                  rows={4}
                  className="w-full bg-black border border-gray-700 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="border border-gray-800 p-6 h-fit lg:sticky lg:top-28">

              <h2 className="text-lg font-light mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Spotify NFC Keychain</span>
                  <span>₹599</span>
                </div>

                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span>1</span>
                </div>

                <div className="flex justify-between text-green-400">
                  <span>Special Discount</span>
                  <span>-₹100</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="border-t border-gray-800 my-6" />

              <div className="flex justify-between text-lg mb-6">
                <span>Total</span>
                <span>₹499</span>
              </div>

              {/* PAY BUTTON */}
              <button
                onClick={() => router.push('/daztao/success')}
                className="w-full py-4 bg-white text-black text-sm hover:bg-gray-100 transition"
              >
                Pay Securely
              </button>

              {/* TRUST */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                <Lock className="w-4 h-4" />
                Secure checkout • Encrypted
              </div>
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

      {/* INPUT STYLES */}
      <style jsx global>{`
        .checkout-input {
          width: 100%;
          background: black;
          border: 1px solid #374151;
          padding: 12px 16px;
          font-size: 14px;
          color: white;
          outline: none;
        }
        .checkout-input::placeholder {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
