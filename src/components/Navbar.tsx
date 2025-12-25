"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";

const NAV_HEIGHT = 72;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { label: "Why Us", path: "/whyus" },
    { label: "Plans", path: "/plans" },
    { label: "FAQ", path: "/faq" },
  ];

  const services = [
    { label: "Discord Server Setup", path: "/discord-server-setup" },
    { label: "Website Design", path: "/website-design" },
    { label: "Social Media Content", path: "/social-media-content" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ height: NAV_HEIGHT }}
        className="
          fixed inset-x-0 top-0 z-50
          bg-black/40 backdrop-blur-2xl
          border-b border-white/5
        "
      >
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          
          {/* LOGO */}
          <button
            onClick={() => router.push("/")}
            className="text-xl font-semibold tracking-tight text-white"
          >
            Drixe
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Studio
            </span>
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">

            {/* SERVICES */}
            {/* SERVICES */}
<div
  className="relative"
  onMouseEnter={() => setServicesOpen(true)}
  onMouseLeave={() => setServicesOpen(false)}
>
  <button
    onClick={() => router.push("/services")}
    className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white"
  >
    Services
    <ChevronDown size={14} />
  </button>

  {/* HOVER SAFE ZONE */}
  <div className="absolute top-full left-0 pt-2">
    <div
      className={`
        w-64 rounded-xl
        bg-black/95 border border-white/10 shadow-xl
        transition-all duration-150 ease-out
        ${servicesOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
      `}
    >
      {services.map((s) => (
        <button
          key={s.path}
          onClick={() => router.push(s.path)}
          className="
            block w-full px-5 py-3 text-left
            text-sm text-white/80
            hover:bg-white/5 hover:text-white
          "
        >
          {s.label}
        </button>
      ))}
    </div>
  </div>
</div>


            {/* OTHER LINKS */}
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => router.push(link.path)}
                className="relative text-sm font-medium text-white/70 hover:text-white"
              >
                {link.label}
              </button>
            ))}

            {/* CTA */}
            <button
              onClick={() => router.push("/contact")}
              className="
                rounded-full
                bg-gradient-to-r from-violet-500 to-indigo-500
                px-6 py-2.5
                text-sm font-medium text-white
                shadow-lg shadow-violet-500/20
                hover:shadow-indigo-500/30
                transition
              "
            >
              Start a Project
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden rounded-lg border border-white/10 p-2 text-white"
          >
            ☰
          </button>
        </nav>
      </motion.header>

      {/* MOBILE MENU */}
      {mobileOpen && <MobileMenu setMobileOpen={setMobileOpen} />}
    </>
  );
}
