"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import DesktopNavbar from "./DesktopNavbar";

interface HeaderProps {
  currentPage: string;
}

const Logo = () => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-3 cursor-pointer"
  >
    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-sky-400 rounded-2xl flex items-center justify-center">
      <Users className="text-white" size={24} />
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-pink-600 bg-clip-text text-transparent">
      Campus Connect
    </span>
  </motion.div>
);

export default function Header({ currentPage }: HeaderProps) {
  return (
    <div className="w-full flex justify-center mb-6 md:mb-8">
      <DesktopNavbar currentPage={currentPage} />
    </div>
  );
}

export { Logo };