"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowRight, X, Check, Star, MessageCircle, Users, Github, Linkedin, Instagram, Shield, Filter, Zap, Clock, Target, Sparkles } from "lucide-react";

const profiles = [
  {
    name: "Priya Sharma",
    branch: "Computer Science, 2nd Year",
    skills: ["React", "Python", "UI/UX"],
    interests: ["Tech", "Startups", "Photography"],
    purpose: "Find project partners",
    bio: "Building ed-tech startup. Looking for passionate developers!",
    availability: "Free after 4 PM",
    vibe: "Ambivert",
    goal: "Build a startup",
    matchScore: 92,
    image: "/images/profiles/priya-sharma.jpg",
    socials: {
      instagram: "priya_sharma",
      linkedin: "priya-sharma-cs",
      github: "priyacodes"
    }
  },
  {
    name: "Rahul Kumar",
    branch: "Mechanical Engineering, 3rd Year",
    skills: ["CAD", "Robotics", "Python"],
    interests: ["Robotics", "Fitness", "Gaming"],
    purpose: "Join tech club",
    bio: "Robotics club lead. Love building automation projects!",
    availability: "Weekends",
    vibe: "Extrovert",
    goal: "Learn AI/ML",
    matchScore: 87,
    image: "/images/profiles/rahul-kumar.jpg",
    socials: {
      instagram: "rahul_kumar_mech",
      linkedin: "rahul-kumar-robotics",
      github: "rahulbuilds"
    }
  },
  {
    name: "Ananya Patel",
    branch: "Design, 1st Year",
    skills: ["Figma", "Illustration", "Animation"],
    interests: ["Art", "Dance", "Content Creation"],
    purpose: "Make friends & collaborate",
    bio: "UI/UX designer passionate about creating beautiful experiences!",
    availability: "Evenings",
    vibe: "Introvert",
    goal: "Learn UI/UX",
    matchScore: 95,
    image: "/images/profiles/ananya-patel.jpg",
    socials: {
      instagram: "ananya.designs",
      linkedin: "ananya-patel-design",
      github: "ananyaui"
    }
  }
];

export default function ConnectPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [exitX, setExitX] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  type SwipeDirection = 1 | -1;

  const handleSwipe = (direction: SwipeDirection) => {
    setExitX(direction * 300);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % profiles.length);
      setExitX(0);
    }, 200);
  };

  const availableSkills = ["React", "Python", "UI/UX", "CAD", "Robotics", "Figma", "Marketing", "Research"];
  const availablePurposes = ["Project partners", "Study partners", "Make friends", "Join clubs", "Startup team"];
  const availableVibes = ["Introvert", "Extrovert", "Ambivert"];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-pink-50/30 to-blue-50/30 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/25"
            >
              <Sparkles className="text-white" size={24} />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Match Connect
              </h1>
              <p className="text-slate-600 text-sm mt-1">AI-powered intelligent matching</p>
            </div>
          </div>
          
          {/* Match Score Info */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-lg border border-pink-200/50 rounded-2xl px-4 py-2 shadow-sm"
          >
            <Target size={16} className="text-pink-500" />
            <span className="text-sm text-slate-700 font-medium">
              Smart Algorithm • 92% Accuracy
            </span>
          </motion.div>
        </motion.div>

        {/* Filters Toggle */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 bg-white/80 backdrop-blur-lg border border-pink-200/50 rounded-2xl px-4 py-3 mb-6 w-full shadow-sm hover:shadow-md transition-all"
        >
          <Filter size={18} className="text-pink-500" />
          <span className="text-slate-700 font-medium flex-1 text-left">Smart Filters</span>
          <motion.div
            animate={{ rotate: showFilters ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight size={16} className="text-slate-500" />
          </motion.div>
        </motion.button>

        {/* Filters Panel - Premium Design */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/80 backdrop-blur-lg border border-pink-200/50 rounded-3xl p-6 mb-6 overflow-hidden shadow-sm"
            >
              <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                <Filter size={18} className="text-pink-500" />
                Match Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Purpose</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all">
                    <option value="">Any Purpose</option>
                    {availablePurposes.map(purpose => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Vibe</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all">
                    <option value="">Any Vibe</option>
                    {availableVibes.map(vibe => (
                      <option key={vibe} value={vibe}>{vibe}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Skills to Match</label>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map(skill => (
                      <motion.button
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-pink-50 hover:border-pink-200 transition-all duration-200"
                      >
                        {skill}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Safety Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-3 bg-white/60 backdrop-blur-lg border border-emerald-200/50 rounded-2xl px-4 py-3 mb-6"
        >
          <Shield size={18} className="text-emerald-500" />
          <span className="text-sm text-slate-700 font-medium">Verified College IDs • Safe & Secure</span>
        </motion.div>
        
        {/* Profile Card - Premium Design */}
        <div className="relative min-h-[850px] mb-8 pb-10">

          <AnimatePresence>
            <motion.div
              key={currentCard}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ x: exitX, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_e, info: PanInfo) => {
                const offset = info.offset.x;
                if (offset > 80) handleSwipe(1);
                if (offset < -80) handleSwipe(-1);
              }}
              className="absolute inset-0 bg-gradient-to-br from-white to-pink-50/30 rounded-3xl p-6 border border-pink-200/30 shadow-2xl shadow-pink-500/10 cursor-grab active:cursor-grabbing flex flex-col "
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500 rounded-full translate-y-12 -translate-x-12"></div>
              </div>

              {/* Match Score */}
              <div className="flex justify-between items-center mb-6 relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl px-4 py-2 shadow-lg"
                >
                  <span className="text-sm font-semibold">
                    {profiles[currentCard].matchScore}% Match
                  </span>
                </motion.div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((dot, index) => (
                    <motion.div 
                      key={dot}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`w-2 h-2 rounded-full ${
                        index < 2 ? 'bg-emerald-400' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Profile Content */}
              <div className="text-center flex-1 relative z-10 flex flex-col">
                {/* Profile Image */}
                <motion.div 
  whileHover={{ scale: 1.05 }}
  className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-pink-400 to-purple-500 p-1 shadow-lg overflow-hidden"
>
  <Image
    src={profiles[currentCard].image}
    alt={profiles[currentCard].name}
    width={96}
    height={96}
    className="w-full h-full object-cover rounded-2xl"
  />
</motion.div>

                
                {/* Name and Branch */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">
                    {profiles[currentCard].name}
                  </h3>
                  <p className="text-pink-600 font-medium">{profiles[currentCard].branch}</p>
                </div>
                
                {/* Vibe & Goal Tags */}
                <div className="flex justify-center gap-2 mb-4">
                  <span className="bg-pink-100 text-pink-700 px-3 py-1.5 rounded-2xl text-sm font-medium">
                    {profiles[currentCard].vibe}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-2xl text-sm font-medium">
                    {profiles[currentCard].goal}
                  </span>
                </div>

                {/* Bio */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-slate-200/50"
                >
                  <p className="text-slate-700 text-sm leading-relaxed italic">"{profiles[currentCard].bio}"</p>
                </motion.div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Skills */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={16} className="text-pink-500" />
                      <span className="font-semibold text-slate-700 text-sm">Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {profiles[currentCard].skills.map((skill) => (
                        <span key={skill} className="bg-pink-50 text-pink-700 px-2 py-1 rounded-xl text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Interests */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={16} className="text-purple-500" />
                      <span className="font-semibold text-slate-700 text-sm">Interests</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {profiles[currentCard].interests.map((interest) => (
                        <span key={interest} className="bg-purple-50 text-purple-700 px-2 py-1 rounded-xl text-xs font-medium">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Availability & Purpose */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center border border-slate-200/50"
                  >
                    <Clock size={18} className="text-emerald-500 mx-auto mb-2" />
                    <span className="text-xs text-slate-600 block font-medium">Available</span>
                    <span className="text-sm font-semibold text-slate-800">{profiles[currentCard].availability}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 text-center border border-slate-200/50"
                  >
                    <Target size={18} className="text-blue-500 mx-auto mb-2" />
                    <span className="text-xs text-slate-600 block font-medium">Looking For</span>
                    <span className="text-sm font-semibold text-slate-800">{profiles[currentCard].purpose}</span>
                  </motion.div>
                </div>

                {/* Social Connect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center gap-3 mt-auto"
                >
                  {[
                    { Icon: Instagram, color: "bg-pink-500 hover:bg-pink-600" },
                    { Icon: Linkedin, color: "bg-blue-600 hover:bg-blue-700" },
                    { Icon: Github, color: "bg-slate-800 hover:bg-slate-900" }
                  ].map(({ Icon, color }, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 ${color} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200`}
                    >
                      <Icon size={18} className="text-white" />
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Action Buttons - Premium Design */}
        <div className="flex justify-center space-x-8 mb-8">
          {/* Super Connect */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 transition-all"
          >
            <Star size={24} className="text-white" />
          </motion.button>

          {/* Skip */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe(-1)}
            className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-500/25 transition-all"
          >
            <X size={28} className="text-white" />
          </motion.button>

          {/* Connect */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe(1)}
            className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/25 transition-all"
          >
            <Check size={28} className="text-white" />
          </motion.button>
        </div>

        {/* Instructions - Premium Design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-600 space-y-4"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
              <span className="font-medium">Swipe Left to Skip</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="font-medium">Swipe Right to Connect</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-3 py-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="font-medium">Super Connect</span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-6">
            <h4 className="font-bold text-slate-800 text-lg mb-4">After Match Features</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
                <MessageCircle size={18} className="text-sky-500" />
                <span className="font-medium">Start Chat</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
                <Users size={18} className="text-emerald-500" />
                <span className="font-medium">Add to Team</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
                <Instagram size={18} className="text-pink-500" />
                <span className="font-medium">Share Socials</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
                <Shield size={18} className="text-purple-500" />
                <span className="font-medium">Safe & Verified</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}