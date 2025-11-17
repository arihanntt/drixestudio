"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, User, Users2, HeartHandshake, MessageCircle, QrCode, Bus, LockIcon } from "lucide-react";
import Link from "next/link";

interface MobileNavbarProps {
  currentPage: string;
}

const mobileNavItems = [
  { id: "home", icon: <Home size={24} />, path: "/campus" },
  { id: "profiles", icon: <User size={24} />, path: "/campus/profiles" },
  { id: "groups", icon: <Users2 size={24} />, path: "/campus/groups" },
  { id: "connect", icon: <HeartHandshake size={24} />, path: "/campus/connect" },
  { id: "chat", icon: <MessageCircle size={24} />, path: "/campus/chat" },
  { id: "bus-tracker", icon: <Bus size={24} />, path: "/campus/bus-tracker" },
  { id: "login", icon: <LockIcon size={24} />, path: "/campus/login" },
];

export default function MobileNavbar({ currentPage }: MobileNavbarProps) {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-pink-200 p-4 z-50"
    >
      <div className="flex justify-around items-center">
        {mobileNavItems.map((item) => (
          <Link key={item.id} href={item.path}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-2xl transition-all cursor-pointer ${
                currentPage === item.id
                  ? "bg-gradient-to-r from-pink-400 to-sky-400 text-white"
                  : "text-slate-600"
              }`}
            >
              {item.icon}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
