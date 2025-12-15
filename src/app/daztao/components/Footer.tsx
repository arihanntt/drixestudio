'use client';

import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="relative border-t border-white/5">
      {/* Glass background */}
      <div className="backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* TOP */}
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">

            {/* BRAND */}
            <div className="space-y-3">
              <div className="text-lg tracking-widest font-medium">
                DAZTAO
              </div>
              <div className="text-xs tracking-wide text-gray-400 max-w-xs">
                Premium NFC keychains for instant sharing.
                Built for real-world connections.
              </div>
              <div className="text-xs tracking-wider text-gray-500">
                A Drixe Group Company
              </div>
            </div>

            {/* NAV */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3 text-xs tracking-widest text-gray-400">
              <button onClick={() => router.push('/daztao')} className="hover:text-white transition text-left">
                HOME
              </button>
              <button onClick={() => router.push('/daztao/buy')} className="hover:text-white transition text-left">
                BUY
              </button>
              <button onClick={() => router.push('/daztao/about')} className="hover:text-white transition text-left">
                ABOUT
              </button>
              <button onClick={() => router.push('/daztao/terms')} className="hover:text-white transition text-left">
                TERMS
              </button>
              <button onClick={() => router.push('/daztao/privacy')} className="hover:text-white transition text-left">
                PRIVACY
              </button>
              <button onClick={() => router.push('/daztao/contact')} className="hover:text-white transition text-left">
                CONTACT
              </button>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <span>
              © {new Date().getFullYear()} DAZTAO Technologies. All rights reserved.
            </span>

            <span className="tracking-wide">
              Designed & engineered by Drixe Group
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
