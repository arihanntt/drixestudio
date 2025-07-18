"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PlansRedirectSection = () => {
  const router = useRouter();

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto my-12 px-6 py-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl text-white text-center cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300"
      onClick={() => router.push("/plans")}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        Explore Our Plans
      </h2>
      <p className="text-lg md:text-xl font-medium mb-6">
        Choose the perfect plan for your server and level up your community.
      </p>
      <button
        className="mt-4 bg-white text-black font-semibold px-6 py-3 rounded-full hover:scale-105 transition-all"
        onClick={(e) => {
          e.stopPropagation(); // prevent parent redirect if needed
          router.push("/plans");
        }}
      >
        View All Plans →
      </button>
    </motion.div>
  );
};

export default PlansRedirectSection;
