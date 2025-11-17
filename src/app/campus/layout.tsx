"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavbar from "./components/MobileNavbar";
import { usePathname } from "next/navigation";

type Page =
  | "home"
  | "profiles"
  | "groups"
  | "connect"
  | "chat"
  | "bus-tracker"
  | "login";

export default function CampusLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const getCurrentPage = (): Page => {
    switch (pathname) {
      case "/campus": return "home";
      case "/campus/profiles": return "profiles";
      case "/campus/groups": return "groups";
      case "/campus/connect": return "connect";
      case "/campus/chat": return "chat";
      case "/campus/bus-tracker": return "bus-tracker";
      case "/campus/login": return "login";
      default: return "home";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity },
            }}
            className="w-20 h-20 bg-gradient-to-r from-pink-400 to-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Users className="text-white" size={32} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-pink-600 bg-clip-text text-transparent">
            Campus Connect
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-gray-600 mt-2">
            Connecting Campus Lives...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-pink-50 to-blue-50 text-slate-800 flex flex-col items-center px-4 py-6 pb-24 md:pb-8 overflow-x-hidden">
      <Header currentPage={getCurrentPage()} />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full flex-1 flex justify-center max-w-7xl"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <MobileNavbar currentPage={getCurrentPage()} />
      <Footer />
    </div>
  );
}
