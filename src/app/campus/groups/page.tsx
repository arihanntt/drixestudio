"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Music, 
  PenTool, 
  Languages, 
  Shield, 
  HeartHandshake, 
  Camera,
  Users,
  Award,
  Briefcase,
  Calendar,
  TrendingUp,
  ArrowRight,
  Star
} from "lucide-react";

const clubs = [
  {
    icon: <Music className="w-6 h-6" />,
    title: "Music Club",
    description: "A place for singers, musicians, rappers, and instrumental artists to perform, jam, and collaborate.",
    buttonText: "Enter Music Club",
    gradient: "from-pink-400/20 to-sky-400/20",
    borderColor: "border-pink-400/30"
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "ACL (Arts, Culture & Literature)",
    description: "The creative hub for poetry, theatre, literature, and cultural activities.",
    buttonText: "Explore ACL",
    gradient: "from-pink-400/20 to-sky-400/20",
    borderColor: "border-sky-400/30"
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: "Dogri Club",
    description: "Celebrating Dogri language, culture, and heritage through events and creative programs.",
    buttonText: "Join Dogri Club",
    gradient: "from-pink-400/20 to-sky-400/20",
    borderColor: "border-pink-400/30"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "NCC (National Cadet Corps)",
    description: "Training for discipline, leadership, and national service — open for dedicated cadets.",
    buttonText: "View NCC Unit",
    gradient: "from-pink-400/20 to-sky-400/20",
    borderColor: "border-sky-400/30"
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "NSS (National Service Scheme)",
    description: "Focused on community service, volunteering, and social development initiatives.",
    buttonText: "Join NSS",
    gradient: "from-pink-400/20 to-sky-400/20",
    borderColor: "border-pink-400/30"
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Media Club",
    description: "For photographers, videographers, editors, and creatives capturing campus life.",
    buttonText: "Explore Media Club",
    gradient: "from-pink-400/20 to-sky-400/20",
    borderColor: "border-sky-400/30"
  }
];

const benefits = [
  { icon: <Users className="w-5 h-5" />, text: "Make new friends" },
  { icon: <Award className="w-5 h-5" />, text: "Gain leadership skills" },
  { icon: <Briefcase className="w-5 h-5" />, text: "Add experience to your resume" },
  { icon: <Calendar className="w-5 h-5" />, text: "Participate in events & fests" },
  { icon: <TrendingUp className="w-5 h-5" />, text: "Build confidence" }
];

export default function CampusClubsPage() {
  return (
    <div className="w-full max-w-7xl px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity },
          }}
          className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-sky-400/20 blur-3xl rounded-full mx-auto w-96 h-96 -z-10"
        />
        <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-pink-600 to-sky-600 bg-clip-text text-transparent">
          Campus Clubs & Societies
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
        >
          Join your community. <span className="text-pink-600">Learn.</span>{" "}
          <span className="text-sky-600">Perform.</span>{" "}
          <span className="text-gradient-to-r from-pink-600 to-sky-600">Lead.</span>
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl flex items-center justify-center space-x-3 transition-all duration-300 w-full sm:w-auto"
          >
            <span>Explore All Clubs</span>
            <ArrowRight size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/60 backdrop-blur-sm hover:bg-white/80 border border-pink-300 text-slate-800 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
          >
            Create New Club
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {clubs.map((club, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              transition: { duration: 0.3 }
            }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6 
            }}
            className="group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${club.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
            
            <div className="relative bg-white/60 backdrop-blur-sm border border-pink-200 rounded-2xl p-6 h-full transition-all duration-500 group-hover:border-pink-300 group-hover:shadow-2xl group-hover:shadow-pink-200/50">
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                className={`inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br ${club.gradient} mb-4 text-white`}
              >
                {club.icon}
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">
                {club.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {club.description}
              </p>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-sm shadow-lg"
              >
                {club.buttonText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-r from-pink-400/20 to-sky-400/20 backdrop-blur-sm border border-pink-300 rounded-3xl p-8 mb-20 text-center shadow-2xl overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 100, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -z-10"
        />
        
        <motion.div whileHover={{ scale: 1.1, rotate: 360 }} className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-sky-400 rounded-3xl flex items-center justify-center shadow-2xl">
            <Star size={28} className="text-white" />
          </div>
        </motion.div>
        
        <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
          Why Join a Club?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 group border border-pink-200"
            >
              <div className="text-pink-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <span className="text-slate-800 text-sm font-medium">
                {benefit.text}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-slate-700 text-lg mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          Unlock your potential and transform your campus experience through meaningful connections and activities.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244, 114, 182, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-300"
        >
          <span className="flex items-center justify-center space-x-3">
            <Users size={20} />
            <span>Join Campus Community</span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
