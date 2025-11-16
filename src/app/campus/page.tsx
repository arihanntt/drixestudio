"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, HeartHandshake, Search, Calendar, Sparkles, 
  MessageCircle, Home, User, Users2, QrCode, 
  ArrowRight, Star, Shield, Zap, Globe,
  ChevronLeft, ChevronRight, Send,
  Instagram, Twitter, Facebook, Linkedin
} from "lucide-react";

export default function CampusConnectPrototype() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Users className="text-white" size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          >
            Campus Connect
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 mt-2"
          >
            Connecting Campus Lives...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Enhanced Navigation Component
  const Navbar = () => (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-7xl bg-white/5 backdrop-blur-xl rounded-3xl p-4 mb-8 border border-white/10 shadow-2xl"
    >
      <div className="flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setCurrentPage("home")}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Users className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Campus Connect
          </span>
        </motion.div>

        <div className="flex space-x-2">
          {[
            { id: "home", label: "Home", icon: <Home size={18} /> },
            { id: "profiles", label: "Profiles", icon: <User size={18} /> },
            { id: "groups", label: "Groups", icon: <Users2 size={18} /> },
            { id: "connect", label: "Connect", icon: <HeartHandshake size={18} /> },
            { id: "chat", label: "Chat", icon: <MessageCircle size={18} /> },
            { id: "qr", label: "Get App", icon: <QrCode size={18} /> }
          ].map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentPage(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
                currentPage === item.id 
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-semibold">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );

  // Enhanced Footer Component
  const Footer = () => (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="w-full max-w-7xl mt-20 py-12 border-t border-white/10 text-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {["Product", "Company", "Resources", "Legal"].map((section, index) => (
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="font-bold text-white mb-4">{section}</h3>
            <div className="space-y-2 text-gray-400">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="cursor-pointer hover:text-white transition-colors">
                  Link {i + 1}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center space-x-6 mb-6">
        {[Instagram, Twitter, Facebook, Linkedin].map((Icon, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2, rotate: 360 }}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-all"
          >
            <Icon size={18} className="text-white" />
          </motion.div>
        ))}
      </div>

      <p className="text-gray-400">
        Made for Shark Tank Project | Campus Connect 2025 | Transforming Campus Connections
      </p>
    </motion.footer>
  );

  // Enhanced Home Page
  const HomePage = () => (
    <div className="w-full max-w-7xl">
      {/* HERO SECTION */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity }
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-3xl rounded-full mx-auto w-96 h-96 -z-10"
          />
          
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
            Campus Connect
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Where campus lives connect. Meet, collaborate, and grow together in your college ecosystem.
          </motion.p>

          <motion.div 
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-2xl flex items-center space-x-3 transition-all duration-300"
            >
              <span>Create Profile</span>
              <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-12 py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
            >
              Find Students
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* FEATURES GRID */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
      >
        {[
          {
            icon: <Users className="text-blue-400" size={32} />,
            title: "Verified Network",
            desc: "Exclusive to verified college students with official email IDs",
            gradient: "from-blue-500/20 to-blue-600/20",
            color: "text-blue-400"
          },
          {
            icon: <Calendar className="text-purple-400" size={32} />,
            title: "Campus Events",
            desc: "Discover and create events, fests, and activities",
            gradient: "from-purple-500/20 to-purple-600/20",
            color: "text-purple-400"
          },
          {
            icon: <Shield className="text-green-400" size={32} />,
            title: "Safe Space",
            desc: "Secure environment moderated by campus authorities",
            gradient: "from-green-500/20 to-green-600/20",
            color: "text-green-400"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center shadow-2xl cursor-pointer transition-all duration-500`}
          >
            <motion.div 
              className={`w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center mx-auto mb-6 ${feature.color}`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
            <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* PREMIUM SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12 mb-20 text-center shadow-2xl overflow-hidden"
      >
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity 
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -z-10"
        />
        
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <HeartHandshake size={36} className="text-white" />
          </div>
        </motion.div>

        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Campus Connect Premium
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Unlock intelligent matching algorithms that connect you with like-minded peers. 
          Find study partners, project collaborators, and build meaningful campus relationships.
        </p>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(192, 132, 252, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-300"
        >
          <span className="flex items-center space-x-3">
            <Star size={20} />
            <span>Unlock Premium Features</span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );

  // Enhanced Profiles Page
  const ProfilesPage = () => {
    const [selectedProfile, setSelectedProfile] = useState(0);

    const students = [
      { 
        name: "Aditi Sharma", 
        branch: "Computer Science, 2nd Year", 
        interests: ["AI/ML Research", "Classical Music", "Startup Culture"], 
        image: "👩‍💻",
        bio: "Passionate about building AI solutions. Looking for coding partners and startup enthusiasts.",
        skills: ["Python", "React", "Machine Learning"]
      },
      { 
        name: "Rahul Verma", 
        branch: "Mechanical Engineering, 3rd Year", 
        interests: ["Robotics", "Football", "Photography"], 
        image: "👨‍🔧",
        bio: "Robotics club lead. Love capturing campus life through my lens.",
        skills: ["CAD", "Python", "Photography"]
      },
      { 
        name: "Priya Patel", 
        branch: "Design, 1st Year", 
        interests: ["UI/UX Design", "Contemporary Dance", "Art"], 
        image: "👩‍🎨",
        bio: "Creating beautiful digital experiences. Dance keeps me creative!",
        skills: ["Figma", "Illustration", "Animation"]
      }
    ];

    return (
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Meet Campus Stars
          </h1>
          <p className="text-xl text-gray-300">Connect with talented students across your college</p>
        </motion.div>

        <div className="flex space-x-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedProfile((prev) => (prev - 1 + students.length) % students.length)}
            className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProfile}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex items-start space-x-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-8xl bg-black/30 rounded-3xl p-8"
                  >
                    {students[selectedProfile].image}
                  </motion.div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {students[selectedProfile].name}
                    </h3>
                    <p className="text-blue-400 text-lg mb-4">
                      {students[selectedProfile].branch}
                    </p>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {students[selectedProfile].bio}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Skills & Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {students[selectedProfile].skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-300"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-2xl font-semibold shadow-2xl transition-all duration-300"
                    >
                      Connect with {students[selectedProfile].name.split(' ')[0]}
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
            className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    );
  };

  // Enhanced Connect Page (Tinder-style)
  const ConnectPage = () => {
    const [currentCard, setCurrentCard] = useState(0);
    const [exitX, setExitX] = useState(0);

    const profiles = [
      {
        name: "Ananya Reddy",
        branch: "Psychology, 2nd Year",
        interests: "Mental Health Advocacy, Poetry, Dance",
        lookingFor: "Study Partners, Dance Crew Members",
        image: "👩‍🎓"
      },
      {
        name: "Karan Mehta",
        branch: "Business, 3rd Year",
        interests: "Entrepreneurship, Stock Markets, Debate",
        lookingFor: "Startup Co-founders, Case Study Partners",
        image: "👨‍💼"
      },
      {
        name: "Sneha Kapoor",
        branch: "Biotech, 1st Year",
        interests: "Research, Painting, Badminton",
        lookingFor: "Lab Partners, Art Club Members",
        image: "👩‍🔬"
      }
    ];

    const handleSwipe = (direction) => {
      setExitX(direction * 300);
      setTimeout(() => {
        setCurrentCard((prev) => (prev + 1) % profiles.length);
        setExitX(0);
      }, 200);
    };

    return (
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Find Your Match
          </h1>
          <p className="text-gray-300">Swipe right to connect, left to skip</p>
        </motion.div>

        <div className="relative h-[500px] mb-8">
          <AnimatePresence>
            <motion.div
              key={currentCard}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ x: exitX, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 100) handleSwipe(1);
                if (offset.x < -100) handleSwipe(-1);
              }}
              className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-8 border-2 border-purple-500/30 shadow-2xl cursor-grab active:cursor-grabbing"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-8xl text-center mb-6"
              >
                {profiles[currentCard].image}
              </motion.div>
              
              <h3 className="text-3xl font-bold text-center mb-2 text-white">
                {profiles[currentCard].name}
              </h3>
              <p className="text-blue-300 text-center mb-6 text-lg">
                {profiles[currentCard].branch}
              </p>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/30 rounded-2xl p-4 backdrop-blur-sm"
                >
                  <span className="font-semibold text-pink-400">Interests:</span>
                  <p className="text-gray-200 mt-1">{profiles[currentCard].interests}</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/30 rounded-2xl p-4 backdrop-blur-sm"
                >
                  <span className="font-semibold text-green-400">Looking for:</span>
                  <p className="text-gray-200 mt-1">{profiles[currentCard].lookingFor}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center space-x-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe(-1)}
            className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-3xl flex items-center justify-center shadow-2xl transition-all"
          >
            <span className="text-white font-bold text-2xl">✕</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe(1)}
            className="w-20 h-20 bg-green-500 hover:bg-green-600 rounded-3xl flex items-center justify-center shadow-2xl transition-all"
          >
            <span className="text-white font-bold text-2xl">✓</span>
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-400 space-y-2"
        >
          <p className="flex items-center justify-center space-x-2">
            <span>Swipe Right to Connect</span>
            <ArrowRight size={16} />
          </p>
          <p className="flex items-center justify-center space-x-2">
            <ArrowRight size={16} className="rotate-180" />
            <span>Swipe Left to Skip</span>
          </p>
        </motion.div>
      </div>
    );
  };

  // Enhanced Groups Page
  const GroupsPage = () => (
    <div className="w-full max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
          Join Campus Communities
        </h1>
        <p className="text-xl text-gray-300">Find your tribe and collaborate on amazing projects</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            icon: "📚", 
            title: "Study Groups", 
            desc: "Collaborate and ace your exams together with dedicated study sessions", 
            members: "240+ members",
            gradient: "from-blue-500/20 to-blue-600/20",
            activity: "Highly Active"
          },
          { 
            icon: "🛠", 
            title: "Project Teams", 
            desc: "Build amazing projects and participate in hackathons with talented peers", 
            members: "156+ members",
            gradient: "from-purple-500/20 to-purple-600/20",
            activity: "Very Active"
          },
          { 
            icon: "🏏", 
            title: "Sports Clubs", 
            desc: "Stay active, make friends, and represent your college in tournaments", 
            members: "420+ members",
            gradient: "from-green-500/20 to-green-600/20",
            activity: "Active"
          },
          { 
            icon: "🎨", 
            title: "Creative Arts", 
            desc: "Express your creativity with fellow artists and designers", 
            members: "98+ members",
            gradient: "from-pink-500/20 to-pink-600/20",
            activity: "Growing"
          },
          { 
            icon: "💻", 
            title: "Tech Community", 
            desc: "Hackathons, workshops, and coding challenges for tech enthusiasts", 
            members: "312+ members",
            gradient: "from-orange-500/20 to-orange-600/20",
            activity: "Very Active"
          },
          { 
            icon: "🎵", 
            title: "Music & Dance", 
            desc: "Jam sessions, performances, and cultural events", 
            members: "187+ members",
            gradient: "from-red-500/20 to-red-600/20",
            activity: "Active"
          },
        ].map((group, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`bg-gradient-to-br ${group.gradient} backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer`}
          >
            <div className="flex items-start space-x-4">
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="text-4xl bg-black/30 rounded-2xl p-3"
              >
                {group.icon}
              </motion.div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                    {group.activity}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3 leading-relaxed">{group.desc}</p>
                <p className="text-blue-400 text-sm mb-4">{group.members}</p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
                >
                  Join Community
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Enhanced Chat Page
  const ChatPage = () => (
    <div className="w-full max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Campus Connect Chat
        </h1>
        <p className="text-xl text-gray-300">Real-time messaging - Connect faster than ever!</p>
      </motion.div>

      <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Chat Header */}
        <div className="bg-white/5 border-b border-white/10 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl">
              👩‍💻
            </div>
            <div>
              <h3 className="text-white font-semibold">Aditi Sharma</h3>
              <p className="text-green-400 text-sm">Online - Typing...</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 p-6 space-y-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-start"
          >
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-3xl rounded-bl-none p-4 max-w-md">
              <p className="text-white">Hey! Are you joining the study group tomorrow? We're working on the AI project.</p>
              <span className="text-blue-300 text-xs mt-2 block">2:30 PM</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-end"
          >
            <div className="bg-purple-500/20 backdrop-blur-sm rounded-3xl rounded-br-none p-4 max-w-md">
              <p className="text-white">Yes! I've completed the data preprocessing part. What time are we meeting?</p>
              <span className="text-purple-300 text-xs mt-2 block">2:31 PM</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-start"
          >
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-3xl rounded-bl-none p-4 max-w-md">
              <p className="text-white">Let's meet at 3 PM in the central library. I'll bring the research papers! 📚</p>
              <span className="text-blue-300 text-xs mt-2 block">2:32 PM</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <span className="bg-white/10 text-gray-400 text-sm px-4 py-2 rounded-full">
              Today
            </span>
          </motion.div>
        </div>

        {/* Message Input */}
        <div className="border-t border-white/10 p-6">
          <div className="flex space-x-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all"
            >
              <Send size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced QR Code Page
  const QRPage = () => (
    <div className="w-full max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
          Get Campus Connect
        </h1>
        <p className="text-2xl text-gray-300 mb-8">Start Your Campus Journey Today!</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Animated QR Code */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            className="bg-white p-8 rounded-3xl inline-block shadow-2xl"
          >
            <div className="w-64 h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity 
                }}
                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"
              />
              <div className="text-center text-white relative z-10">
                <QrCode size={48} className="mx-auto mb-3" />
                <p className="font-bold text-lg">CAMPUS CONNECT</p>
                <p className="text-sm opacity-90">Scan to Download</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
          >
            SCAN TO START CONNECTING
          </motion.p>
        </motion.div>

        {/* App Features */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-left space-y-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Why Download Campus Connect?</h3>
          
          {[
            { icon: <Zap className="text-yellow-400" size={24} />, text: "Instant campus notifications" },
            { icon: <Users className="text-blue-400" size={24} />, text: "Connect with peers instantly" },
            { icon: <Calendar className="text-green-400" size={24} />, text: "Never miss campus events" },
            { icon: <Shield className="text-purple-400" size={24} />, text: "Secure verified network" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-black/30 rounded-2xl flex items-center justify-center">
                {feature.icon}
              </div>
              <span className="text-gray-300 text-lg">{feature.text}</span>
            </motion.div>
          ))}

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-5 rounded-2xl text-xl font-bold shadow-2xl transition-all duration-300 mt-6"
          >
            Download Now - It's Free!
          </motion.button>
        </motion.div>
      </div>

      {/* App Store Badges */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center space-x-6 mt-12"
      >
        {["Play Store", "App Store", "Web App"].map((store, index) => (
          <motion.div
            key={store}
            whileHover={{ scale: 1.1, y: -5 }}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-2xl cursor-pointer transition-all duration-300"
          >
            <span className="text-white font-semibold">Download on {store}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home": return <HomePage />;
      case "profiles": return <ProfilesPage />;
      case "groups": return <GroupsPage />;
      case "connect": return <ConnectPage />;
      case "chat": return <ChatPage />;
      case "qr": return <QRPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center px-6 py-8 overflow-x-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full flex justify-center"
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}