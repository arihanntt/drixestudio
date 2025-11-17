"use client";
type Room = {
  id: number;
  name: string;
  description: string;
  icon: string;
  activeUsers: number;
  lastMessage: string;
  isActive: boolean;
  color: string;
  badge: string | null;
  isLocked?: boolean; // <-- FIX for the red underline
};

type RoomCategory = {
  title: string;
  description: string;
  rooms: Room[];
};

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, MessageCircle, Eye, Lock, Shield, Crown, Flame, TrendingUp, Star, Filter, Plus, Volume2, Camera, Gamepad2, BookOpen, Heart, ShoppingBag, Briefcase, Lightbulb, Venus, Mars, GraduationCap } from "lucide-react";

// Room data structure
const roomCategories: RoomCategory[] = [

  {
    title: "🔥 CORE ROOMS",
    description: "Most active rooms everyone uses",
    rooms: [
      {
        id: 1,
        name: "Common Area",
        description: "General chat for all campus students",
        icon: "💬",
        activeUsers: 342,
        lastMessage: "Priya: Anyone going to the fest tomorrow?",
        isActive: true,
        color: "from-blue-500 to-cyan-500",
        badge: "HOT"
      },
      {
        id: 2,
        name: "Lost & Found",
        description: "Lost phones, cards, bottles, bags",
        icon: "🎒",
        activeUsers: 89,
        lastMessage: "Rahul: Found black wallet near library",
        isActive: true,
        color: "from-orange-500 to-red-500",
        badge: "NEW"
      },
      {
        id: 3,
        name: "Anonymous Confessions",
        description: "Post totally anonymously",
        icon: "👀",
        activeUsers: 156,
        lastMessage: "Anonymous: Need help with calculus...",
        isActive: true,
        color: "from-purple-500 to-pink-500",
        badge: "POPULAR"
      },
      {
        id: 4,
        name: "Events & Announcements",
        description: "Workshops, competitions, open mic nights",
        icon: "📢",
        activeUsers: 234,
        lastMessage: "Admin: Hackathon registration open!",
        isActive: true,
        color: "from-green-500 to-emerald-500",
        badge: "LIVE"
      }
    ]
  },
  {
    title: "🎓 ACADEMIC & HELP",
    description: "Study groups and academic support",
    rooms: [
      {
        id: 5,
        name: "CS Department",
        description: "Computer Science students chat",
        icon: "💻",
        activeUsers: 187,
        lastMessage: "Aditi: DSA assignment help needed",
        isActive: true,
        color: "from-indigo-500 to-blue-500",
        badge: null
      },
      {
        id: 6,
        name: "Study Buddies",
        description: "Find partners to study with",
        icon: "📚",
        activeUsers: 134,
        lastMessage: "Vikram: Group study at 4 PM?",
        isActive: true,
        color: "from-amber-500 to-orange-500",
        badge: "ACTIVE"
      },
      {
        id: 7,
        name: "Seniors Help Desk",
        description: "Seniors answering junior queries",
        icon: "👨‍🏫",
        activeUsers: 98,
        lastMessage: "Senior: Placement tips shared!",
        isActive: true,
        color: "from-teal-500 to-green-500",
        badge: "HELP"
      },
      {
        id: 8,
        name: "BBA Department",
        description: "Business Administration chat",
        icon: "📊",
        activeUsers: 76,
        lastMessage: "Neha: Case study discussion",
        isActive: true,
        color: "from-blue-500 to-cyan-500",
        badge: null
      }
    ]
  },
  {
    title: "🎭 INTEREST-BASED ROOMS",
    description: "Fun & engaging communities",
    rooms: [
      {
        id: 9,
        name: "Creativity & Art",
        description: "Share drawings, poems, designs, reels",
        icon: "🎨",
        activeUsers: 167,
        lastMessage: "Artist: New digital art uploaded!",
        isActive: true,
        color: "from-pink-500 to-rose-500",
        badge: "CREATIVE"
      },
      {
        id: 10,
        name: "Fitness & Sports",
        description: "Gym, workouts, matches, running",
        icon: "🏋️‍♂️",
        activeUsers: 145,
        lastMessage: "Coach: Morning gym session at 6 AM",
        isActive: true,
        color: "from-red-500 to-orange-500",
        badge: "FIT"
      },
      {
        id: 11,
        name: "Music Lounge",
        description: "Share playlists, sing, jam sessions",
        icon: "🎵",
        activeUsers: 123,
        lastMessage: "DJ: New playlist dropped!",
        isActive: true,
        color: "from-purple-500 to-violet-500",
        badge: "TRENDING"
      },
      {
        id: 12,
        name: "Movie/Anime Discussion",
        description: "Pop culture & fan communities",
        icon: "🎬",
        activeUsers: 198,
        lastMessage: "Weeb: New anime episode discussion",
        isActive: true,
        color: "from-yellow-500 to-amber-500",
        badge: "POPULAR"
      }
    ]
  },
  {
    title: "💬 SOCIAL & LIFESTYLE",
    description: "Safe spaces and mentorship",
    rooms: [
      {
        id: 13,
        name: "Female-Only Space",
        description: "Verified-only safe space for girls",
        icon: "👩",
        activeUsers: 234,
        lastMessage: "Sophia: Girls meetup this weekend?",
        isActive: true,
        color: "from-pink-500 to-purple-500",
        badge: "VERIFIED",
        isLocked: true
      },
      {
        id: 14,
        name: "Male-Only Space",
        description: "Safe space for boys",
        icon: "👨",
        activeUsers: 189,
        lastMessage: "Arjun: Basketball match tomorrow",
        isActive: true,
        color: "from-blue-500 to-indigo-500",
        badge: "VERIFIED",
        isLocked: true
      },
      {
        id: 15,
        name: "Mentor Room",
        description: "Career guidance and internships",
        icon: "🧠",
        activeUsers: 87,
        lastMessage: "Mentor: Internship opportunities",
        isActive: true,
        color: "from-green-500 to-teal-500",
        badge: "GUIDANCE"
      }
    ]
  },
  {
    title: "❤️ MATCH CONNECT",
    description: "Social connections and dating",
    rooms: [
      {
        id: 16,
        name: "Social Connect",
        description: "Make new friends casually",
        icon: "🤝",
        activeUsers: 276,
        lastMessage: "Riya: Anyone for coffee?",
        isActive: true,
        color: "from-cyan-500 to-blue-500",
        badge: "SOCIAL"
      },
      {
        id: 17,
        name: "Campus Dating",
        description: "Verified students only - Safe & moderated",
        icon: "💖",
        activeUsers: 154,
        lastMessage: "Connect with like-minded people",
        isActive: true,
        color: "from-rose-500 to-pink-500",
        badge: "VERIFIED",
        isLocked: true
      }
    ]
  },
  {
    title: "📜 UTILITY ROOMS",
    description: "Very useful everyday rooms",
    rooms: [
      {
        id: 18,
        name: "Buy/Sell/Exchange",
        description: "Used books, gadgets, notes, equipment",
        icon: "🛒",
        activeUsers: 167,
        lastMessage: "Seller: MacBook for sale - good condition",
        isActive: true,
        color: "from-amber-500 to-yellow-500",
        badge: "MARKET"
      },
      {
        id: 19,
        name: "Opportunities",
        description: "Internships, part-time gigs, volunteers",
        icon: "💼",
        activeUsers: 132,
        lastMessage: "Recruiter: Summer internships open!",
        isActive: true,
        color: "from-emerald-500 to-green-500",
        badge: "JOBS"
      },
      {
        id: 20,
        name: "Feedback & Suggestions",
        description: "Campus improvements and ideas",
        icon: "💡",
        activeUsers: 54,
        lastMessage: "Admin: New library hours implemented!",
        isActive: true,
        color: "from-violet-500 to-purple-500",
        badge: "IDEAS"
      }
    ]
  }
];

const trendingRooms = [
  { name: "Common Area", users: 342, trend: "up" },
  { name: "CS Department", users: 187, trend: "up" },
  { name: "Anonymous Confessions", users: 156, trend: "up" },
  { name: "Social Connect", users: 276, trend: "up" }
];

export default function CampusRoomsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredCategories = roomCategories.map(category => ({
    ...category,
    rooms: category.rooms.filter(room =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.rooms.length > 0);

  const allRooms = roomCategories.flatMap(category => category.rooms);
  const totalActiveUsers = allRooms.reduce((sum, room) => sum + room.activeUsers, 0);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-4 md:py-8">
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
              <MessageCircle className="text-white" size={24} />
            </motion.div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Campus Rooms
              </h1>
              <p className="text-lg md:text-xl text-slate-700">
                Connect with your college community
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6"
          >
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-slate-200/50">
              <Users size={18} className="text-green-500" />
              <span className="text-slate-700 font-medium">{totalActiveUsers}+ Active</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-slate-200/50">
              <Volume2 size={18} className="text-blue-500" />
              <span className="text-slate-700 font-medium">{allRooms.length} Rooms</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-slate-200/50">
              <Flame size={18} className="text-orange-500" />
              <span className="text-slate-700 font-medium">Live Chat</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search rooms, interests, or departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl pl-12 pr-4 py-4 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {["all", "trending", "academic", "social", "verified"].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(filter)}
                  className={`px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === filter
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200/50'
                  }`}
                >
                  {filter === "all" && "All Rooms"}
                  {filter === "trending" && "🔥 Trending"}
                  {filter === "academic" && "🎓 Academic"}
                  {filter === "social" && "💬 Social"}
                  {filter === "verified" && "🛡️ Verified"}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trending Rooms */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={24} className="text-orange-500" />
              🔥 Trending Now
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/80 border border-slate-200/50 px-4 py-2 rounded-2xl text-slate-700 text-sm font-medium"
            >
              <Filter size={16} />
              Sort
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingRooms.map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl p-6 border border-orange-200/50 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-800 text-lg">{room.name}</h3>
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <TrendingUp size={14} />
                    <span>Live</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={16} />
                    <span className="font-medium">{room.users} online</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    Join
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Main Rooms Grid */}
        <div className="space-y-8 md:space-y-12">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + categoryIndex * 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                    {category.title}
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base">
                    {category.description}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 bg-white/80 border border-slate-200/50 px-4 py-2 rounded-2xl text-slate-700 text-sm font-medium"
                >
                  <Plus size={16} />
                  View All
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {category.rooms.map((room, roomIndex) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + (categoryIndex * 0.2) + (roomIndex * 0.1) }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                  >
                    {/* Room Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${room.color} rounded-2xl flex items-center justify-center text-white text-lg shadow-lg`}>
                          {room.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg group-hover:text-purple-600 transition-colors">
                            {room.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1 text-slate-500 text-sm">
                              <Users size={12} />
                              <span>{room.activeUsers}</span>
                            </div>
                            {room.isLocked && (
                              <Lock size={12} className="text-slate-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Badge */}
                      {room.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`px-2 py-1 rounded-full text-xs font-bold text-white ${
                            room.badge === "HOT" ? "bg-gradient-to-r from-red-500 to-orange-500" :
                            room.badge === "NEW" ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                            room.badge === "POPULAR" ? "bg-gradient-to-r from-purple-500 to-pink-500" :
                            room.badge === "LIVE" ? "bg-gradient-to-r from-amber-500 to-orange-500" :
                            room.badge === "ACTIVE" ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                            room.badge === "HELP" ? "bg-gradient-to-r from-teal-500 to-green-500" :
                            room.badge === "CREATIVE" ? "bg-gradient-to-r from-pink-500 to-rose-500" :
                            room.badge === "FIT" ? "bg-gradient-to-r from-red-500 to-orange-500" :
                            room.badge === "TRENDING" ? "bg-gradient-to-r from-purple-500 to-violet-500" :
                            room.badge === "VERIFIED" ? "bg-gradient-to-r from-emerald-500 to-green-500" :
                            room.badge === "SOCIAL" ? "bg-gradient-to-r from-cyan-500 to-blue-500" :
                            room.badge === "MARKET" ? "bg-gradient-to-r from-amber-500 to-yellow-500" :
                            room.badge === "JOBS" ? "bg-gradient-to-r from-emerald-500 to-green-500" :
                            "bg-gradient-to-r from-violet-500 to-purple-500"
                          }`}
                        >
                          {room.badge}
                        </motion.span>
                      )}
                    </div>

                    {/* Room Description */}
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Last Message Preview */}
                    <div className="bg-slate-50/80 rounded-2xl p-3 mb-4 border border-slate-200/30">
                      <p className="text-slate-700 text-sm truncate">
                        {room.lastMessage}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg"
                      >
                        Join Room
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-colors"
                      >
                        <Heart size={16} className="text-slate-600" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Quick Join Footer */}
        
      </div>
    </div>
  );
}