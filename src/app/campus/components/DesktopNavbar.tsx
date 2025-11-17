"use client";
import React from "react";
import { motion } from "framer-motion";
import { Home, User, Users2, HeartHandshake, MessageCircle, QrCode } from "lucide-react";
import { Logo } from "./Header";
import Link from "next/link";

interface DesktopNavbarProps {
  currentPage: string;
}

const navItems = [
  { id: "home", label: "Home", icon: <Home size={18} />, path: "/campus" },
  { id: "profiles", label: "Profiles", icon: <User size={18} />, path: "/campus/profiles" },
  { id: "groups", label: "Groups", icon: <Users2 size={18} />, path: "/campus/groups" },
  { id: "connect", label: "Connect", icon: <HeartHandshake size={18} />, path: "/campus/connect" },
  { id: "chat", label: "Chat", icon: <MessageCircle size={18} />, path: "/campus/chat" },
  { id: "get-app", label: "Get App", icon: <QrCode size={18} />, path: "/campus/get-app" },
];

export default function DesktopNavbar({ currentPage }: DesktopNavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="hidden md:flex w-full max-w-7xl bg-white/80 backdrop-blur-xl rounded-3xl p-4 mb-8 border border-pink-200 shadow-2xl"
    >
      <div className="flex justify-between items-center w-full">
        <Link href="/campus">
          <Logo />
        </Link>
        <div className="flex space-x-2">
          {navItems.map((item, index) => (
            <Link key={item.id} href={item.path}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-pink-400 to-sky-400 text-white shadow-lg"
                    : "text-slate-600 hover:bg-white/60 hover:text-slate-800"
                }`}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}