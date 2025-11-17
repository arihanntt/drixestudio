"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Users, Zap, Heart, MessageCircle, Plus, Trophy, Flame, Crown, Award, Music, Camera, Dumbbell, Code, Palette, Theater, BookOpen, Mic, GamepadIcon, Smartphone } from "lucide-react";

// Indian college student data
const campusStars = [
  {
    id: 1,
    name: "Aditi Sharma",
    branch: "Computer Science, 2nd Year",
    interests: ["AI/ML Research", "Classical Music", "Startup Culture"],
    image: "👩‍💻",
    bio: "Passionate about building AI solutions. Looking for coding partners and startup enthusiasts.",
    skills: ["Python", "React", "Machine Learning"],
    badges: ["💻 Coder", "🔥 Popular", "🧠 Top Scorer"],
    shortBio: "Loves producing beats. Member of Music Club.",
    stats: { followers: 234, projects: 12 },
    joined: "2 days ago"
  },
  {
    id: 2,
    name: "Rahul Verma",
    branch: "Mechanical Engineering, 3rd Year",
    interests: ["Robotics", "Football", "Photography"],
    image: "👨‍🔧",
    bio: "Robotics club lead. Love capturing campus life through my lens.",
    skills: ["CAD", "Python", "Photography"],
    badges: ["📸 Photographer", "🎮 Gaming", "🔥 Popular"],
    shortBio: "Robotics enthusiast. Football team captain.",
    stats: { followers: 189, projects: 8 },
    joined: "1 week ago"
  },
  {
    id: 3,
    name: "Priya Patel",
    branch: "Design, 1st Year",
    interests: ["UI/UX Design", "Contemporary Dance", "Art"],
    image: "👩‍🎨",
    bio: "Creating beautiful digital experiences. Dance keeps me creative!",
    skills: ["Figma", "Illustration", "Animation"],
    badges: ["🎨 Artist", "💃 Dancer", "⭐ Rising Star"],
    shortBio: "UI/UX designer. Contemporary dance club member.",
    stats: { followers: 156, projects: 6 },
    joined: "3 days ago"
  },
  {
    id: 4,
    name: "Arjun Singh",
    branch: "Electronics, 2nd Year",
    interests: ["IoT", "Gaming", "Content Creation"],
    image: "👨‍🎤",
    bio: "Building smart devices and creating tech content on YouTube.",
    skills: ["Arduino", "C++", "Video Editing"],
    badges: ["📱 Content Creator", "🎮 Gaming", "⚡ IoT Expert"],
    shortBio: "Tech YouTuber with 10K+ subscribers.",
    stats: { followers: 567, projects: 15 },
    joined: "Just now"
  },
  {
    id: 5,
    name: "Neha Gupta",
    branch: "Commerce, 2nd Year",
    interests: ["Public Speaking", "Debate", "Theater"],
    image: "👩‍🎓",
    bio: "Debate club president. Love storytelling and theater performances.",
    skills: ["Public Speaking", "Creative Writing", "Leadership"],
    badges: ["🗣 Public Speaking", "🎭 Acting", "🏆 Debate Champ"],
    shortBio: "Debate champion. Theater club lead.",
    stats: { followers: 298, projects: 9 },
    joined: "5 days ago"
  },
  {
    id: 6,
    name: "Vikram Joshi",
    branch: "Computer Science, 3rd Year",
    interests: ["Competitive Programming", "Gaming", "Fitness"],
    image: "👨‍💻",
    bio: "ACM ICPC regional finalist. Building fitness apps in free time.",
    skills: ["C++", "Algorithms", "App Development"],
    badges: ["💻 Coder", "🏋️‍♂️ Fitness", "🏆 Top Talent"],
    shortBio: "Competitive programmer. Fitness enthusiast.",
    stats: { followers: 432, projects: 18 },
    joined: "2 weeks ago"
  }
];

const interestFilters = [
  { icon: Music, label: "Music", color: "from-pink-500 to-rose-500" },
  { icon: Camera, label: "Photography", color: "from-purple-500 to-indigo-500" },
  { icon: Dumbbell, label: "Fitness", color: "from-orange-500 to-red-500" },
  { icon: Code, label: "Coding", color: "from-green-500 to-emerald-500" },
  { icon: Palette, label: "Design", color: "from-blue-500 to-cyan-500" },
  { icon: Theater, label: "Acting", color: "from-yellow-500 to-amber-500" },
  { icon: BookOpen, label: "Study Nerds", color: "from-indigo-500 to-blue-500" },
  { icon: Mic, label: "Public Speaking", color: "from-teal-500 to-green-500" },
  { icon: GamepadIcon, label: "Gaming", color: "from-red-500 to-pink-500" },
  { icon: Smartphone, label: "Content Creators", color: "from-violet-500 to-purple-500" }
];

const topStars = [
  { type: "🏆 Top Talent", students: ["Vikram Joshi", "Aditi Sharma", "Priya Patel"] },
  { type: "🔥 Most Active", students: ["Arjun Singh", "Neha Gupta", "Rahul Verma"] },
  { type: "⭐ Most Liked", students: ["Priya Patel", "Aditi Sharma", "Arjun Singh"] }
];

const hallOfFame = [
  { title: "Best Reels Creator", name: "Arjun Singh", talent: "📱 Content Creation" },
  { title: "Best Photographer", name: "Rahul Verma", talent: "📸 Photography" },
  { title: "Best Editor", name: "Priya Patel", talent: "🎬 Video Editing" },
  { title: "Best Singer", name: "Aditi Sharma", talent: "🎵 Music" },
  { title: "Best Developer", name: "Vikram Joshi", talent: "💻 Coding" }
];

export default function CampusStarsPage() {
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredStudents = activeFilter 
    ? campusStars.filter(student => 
        student.interests.some(interest => 
          interest.toLowerCase().includes(activeFilter.toLowerCase())
        ) ||
        student.badges.some(badge => 
          badge.toLowerCase().includes(activeFilter.toLowerCase())
        )
      )
    : campusStars;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-6 md:py-8">
      <div className={`${isMobile ? 'max-w-full px-4' : 'max-w-7xl mx-auto px-6'}`}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25"
            >
              <Crown className="text-white" size={24} />
            </motion.div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Meet Campus Stars
              </h1>
              <p className="text-lg md:text-xl text-slate-700">
                Discover talented people from Miet college
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 1: Interest Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 text-center">
            Explore by Interests
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {interestFilters.map((filter, index) => (
              <motion.button
                key={filter.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(activeFilter === filter.label ? null : filter.label)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium text-sm md:text-base transition-all ${
                  activeFilter === filter.label
                    ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200/50'
                }`}
              >
                <filter.icon size={18} />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Section 2: Top Stars of the Week */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center">
            🌟 Top Stars of the Week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {topStars.map((category, index) => (
              <motion.div
                key={category.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-6 border border-slate-200/50 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                    {category.type.includes('Talent') && <Trophy className="text-white" size={20} />}
                    {category.type.includes('Active') && <Flame className="text-white" size={20} />}
                    {category.type.includes('Liked') && <Star className="text-white" size={20} />}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">{category.type}</h3>
                </div>
                <div className="space-y-2">
                  {category.students.map((student, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/60 rounded-2xl p-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-slate-700 font-medium">{student}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: People Like You */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              🎯 Students Who Share Your Interests
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/80 border border-slate-200/50 px-4 py-2 rounded-2xl text-slate-700 text-sm font-medium"
            >
              <Zap size={16} />
              See More
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredStudents.slice(0, 3).map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-6 border border-blue-200/30 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl w-12 h-12 flex items-center justify-center text-white">
                      {student.image}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg">{student.name}</h3>
                      <p className="text-slate-600 text-sm">{student.branch}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center"
                  >
                    <Plus size={16} className="text-white" />
                  </motion.button>
                </div>
                <p className="text-slate-600 text-sm mb-4 italic">"{student.shortBio}"</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {student.badges.slice(0, 2).map((badge) => (
                    <span key={badge} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-xl text-xs font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={14} />
                    Message
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Heart size={16} className="text-rose-500" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Spotlight Cards - Main Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center">
            ✨ Spotlight Stars
          </h2>
          
          <div className="flex items-center space-x-4 md:space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedProfile((prev) => (prev - 1 + filteredStudents.length) % filteredStudents.length)}
              className="w-12 h-12 bg-white/80 rounded-2xl flex items-center justify-center hover:bg-white border border-slate-200/50 shadow-lg transition-all"
            >
              <ChevronLeft size={24} />
            </motion.button>
            
            <div className="flex-1 min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProfile}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50/50 backdrop-blur-sm border border-purple-200/30 rounded-3xl p-6 md:p-8 shadow-2xl h-full"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    {/* Profile Image & Quick Stats */}
                    <div className="text-center md:text-left">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-6xl bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-6 w-32 h-32 flex items-center justify-center text-white shadow-2xl mb-4"
                      >
                        {filteredStudents[selectedProfile].image}
                      </motion.div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Users size={16} />
                          <span>{filteredStudents[selectedProfile].stats.followers} followers</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Award size={16} />
                          <span>{filteredStudents[selectedProfile].stats.projects} projects</span>
                        </div>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-wrap items-center gap-2 mb-3 justify-center md:justify-start">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                          {filteredStudents[selectedProfile].name}
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {filteredStudents[selectedProfile].badges.map((badge, index) => (
                            <motion.span
                              key={badge}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-xl text-xs font-bold"
                            >
                              {badge}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-pink-600 text-lg font-medium mb-4">
                        {filteredStudents[selectedProfile].branch}
                      </p>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed text-base italic">
                        "{filteredStudents[selectedProfile].shortBio}"
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="text-slate-800 font-semibold mb-3 text-lg">Skills & Talents</h4>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {filteredStudents[selectedProfile].skills.map((skill, index) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white/80 px-4 py-2 rounded-2xl text-sm text-slate-700 font-medium border border-slate-200/50"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 px-6 rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Star size={18} />
                          Follow Profile
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-3 px-6 rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <MessageCircle size={18} />
                          Send Message
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedProfile((prev) => (prev + 1) % filteredStudents.length)}
              className="w-12 h-12 bg-white/80 rounded-2xl flex items-center justify-center hover:bg-white border border-slate-200/50 shadow-lg transition-all"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </motion.section>

        {/* Section 5: Creators Hall of Fame */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center">
            🏆 Creators Hall of Fame
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {hallOfFame.map((creator, index) => (
              <motion.div
                key={creator.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-gradient-to-br from-white to-amber-50/50 rounded-3xl p-4 text-center border border-amber-200/50 shadow-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Trophy size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">{creator.title}</h3>
                <p className="text-slate-700 font-medium text-lg mb-1">{creator.name}</p>
                <p className="text-slate-600 text-xs">{creator.talent}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 6: Meet New Faces */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              🌈 New Faces at MIET
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/80 border border-slate-200/50 px-4 py-2 rounded-2xl text-slate-700 text-sm font-medium"
            >
              <Zap size={16} />
              Refresh
            </motion.button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {campusStars.filter(s => s.joined.includes('day') || s.joined === 'Just now').map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-gradient-to-br from-white to-green-50/30 rounded-2xl p-4 text-center border border-green-200/30 shadow-lg"
              >
                <div className="text-2xl mb-2">{student.image}</div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{student.name.split(' ')[0]}</h3>
                <p className="text-slate-600 text-xs mb-2">{student.branch.split(',')[0]}</p>
                <div className="flex justify-center gap-1">
                  {student.badges.slice(0, 1).map(badge => (
                    <span key={badge} className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-lg text-xs">
                      {badge}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mt-2"
                >
                  <Plus size={14} className="text-white" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}