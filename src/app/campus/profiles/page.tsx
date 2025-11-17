"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Student } from "../types";

const students: Student[] = [
  {
    name: "Aditi Sharma",
    branch: "Computer Science, 2nd Year",
    interests: ["AI/ML Research", "Classical Music", "Startup Culture"],
    image: "👩‍💻",
    bio: "Passionate about building AI solutions. Looking for coding partners and startup enthusiasts.",
    skills: ["Python", "React", "Machine Learning"],
  },
  {
    name: "Rahul Verma",
    branch: "Mechanical Engineering, 3rd Year",
    interests: ["Robotics", "Football", "Photography"],
    image: "👨‍🔧",
    bio: "Robotics club lead. Love capturing campus life through my lens.",
    skills: ["CAD", "Python", "Photography"],
  },
  {
    name: "Priya Patel",
    branch: "Design, 1st Year",
    interests: ["UI/UX Design", "Contemporary Dance", "Art"],
    image: "👩‍🎨",
    bio: "Creating beautiful digital experiences. Dance keeps me creative!",
    skills: ["Figma", "Illustration", "Animation"],
  },
];

export default function ProfilesPage() {
  const [selectedProfile, setSelectedProfile] = useState(0);

  return (
    <div className="w-full max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-pink-600 bg-clip-text text-transparent">
          Meet Campus Stars
        </h1>
        <p className="text-lg md:text-xl text-slate-700">Connect with talented students across your college</p>
      </motion.div>
      
      <div className="flex items-center space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedProfile((prev) => (prev - 1 + students.length) % students.length)}
          className="w-12 h-12 bg-white/60 rounded-2xl flex items-center justify-center hover:bg-white/80 transition-all"
        >
          <ChevronLeft size={24} />
        </motion.button>
        
        <div className="flex-1 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProfile}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-gradient-to-br from-pink-50 to-sky-50 backdrop-blur-sm border border-pink-200 rounded-3xl p-6 shadow-2xl h-full"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-6xl bg-white/60 rounded-3xl p-6 w-32 h-32 flex items-center justify-center"
                >
                  {students[selectedProfile].image}
                </motion.div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                    {students[selectedProfile].name}
                  </h3>
                  <p className="text-pink-600 text-base md:text-lg mb-4">
                    {students[selectedProfile].branch}
                  </p>
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
                    {students[selectedProfile].bio}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-slate-800 font-semibold mb-3">Skills & Interests</h4>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {students[selectedProfile].skills.map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/60 px-3 py-1 rounded-full text-sm text-slate-700"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white py-3 px-6 rounded-2xl font-semibold shadow-2xl transition-all duration-300"
                  >
                    Connect with {students[selectedProfile].name.split(" ")[0]}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedProfile((prev) => (prev + 1) % students.length)}
          className="w-12 h-12 bg-white/60 rounded-2xl flex items-center justify-center hover:bg-white/80 transition-all"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </div>
  );
}