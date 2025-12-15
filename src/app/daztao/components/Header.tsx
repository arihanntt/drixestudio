'use client';

import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { label: 'HOME', path: '/daztao' },
    { label: 'ABOUT', path: '/daztao/about' },
    { label: 'PRODUCTS', path: '/daztao/buy' },
    { label: 'PRIVACY', path: '/daztao/privacy' },
    { label: 'CONTACT', path: '/daztao/contact' },
  ];

  return (
    <>
      {/* ================= HEADER BAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

          {/* LOGO */}
          <button
            onClick={() => router.push('/daztao')}
            className="text-sm tracking-[0.35em] font-medium text-gray-300 hover:text-white transition"
          >
            DAZTAO
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.3em] text-gray-400">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className="hover:text-white transition"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-6">
            {/* LOGIN (DESKTOP) */}
            <button
              onClick={() => router.push('/login')}
              className="hidden md:flex items-center gap-2 text-[11px] tracking-widest text-gray-400 hover:text-white transition"
            >
              <User className="w-4 h-4" />
              LOGIN
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-gray-300"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE FULLSCREEN MENU ================= */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-[#07080d] flex flex-col">

          {/* TOP BAR */}
          <div className="flex items-center justify-between px-6 py-6">
            <div className="text-sm tracking-[0.35em] text-gray-300">
              DAZTAO
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close Menu"
              className="text-gray-300 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* NAV LINKS */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-10 text-sm tracking-[0.4em] text-gray-300 text-center">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setOpen(false);
                    router.push(item.path);
                  }}
                  className="hover:text-white transition"
                >
                  {item.label}
                </button>
              ))}

              {/* LOGIN / SIGNUP */}
              <button
                onClick={() => {
                  setOpen(false);
                  router.push('/login');
                }}
                className="mt-6 tracking-[0.4em] text-gray-400 hover:text-white transition"
              >
                LOGIN / SIGN UP
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
