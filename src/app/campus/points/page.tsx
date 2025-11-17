"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Star, Zap, Target, Users, Crown, Flame, Award, Gift, 
  Calendar, Clock, TrendingUp, Shield, Sparkles, Lock, CheckCircle, 
  Play, Home, MessageCircle, Heart, BookOpen, Gamepad2, Info, 
  ChevronRight, TrendingDown, User, Settings, HelpCircle, Bell,
  Coffee, Book, Music, Camera, Video, Code, Palette, Dumbbell,
  Search, Filter, X, Eye, EyeOff, Share, Download, Copy
} from "lucide-react";

// Enhanced mock data with more details
const userData = {
  points: 345,
  level: 3,
  levelProgress: 45,
  streak: 7,
  rank: 24,
  house: "Red Phoenix",
  nextLevelPoints: 700,
  weeklyProgress: 12,
  houseRank: 2,
  totalStudents: 1200,
  completedMissions: 12,
  unlockedRewards: 3
};

const levels = [
  { 
    level: 1, 
    name: "Rookie", 
    minPoints: 0, 
    maxPoints: 100, 
    badge: "🌱", 
    color: "from-gray-400 to-gray-600",
    perks: ["Basic Profile", "Join Clubs", "Access Chat Rooms"],
    description: "Just getting started on campus"
  },
  { 
    level: 2, 
    name: "Engaged", 
    minPoints: 100, 
    maxPoints: 300, 
    badge: "✨", 
    color: "from-green-400 to-emerald-600",
    perks: ["Event Notifications", "Study Groups", "Basic Badges"],
    description: "Active participant in campus life"
  },
  { 
    level: 3, 
    name: "Active", 
    minPoints: 300, 
    maxPoints: 700, 
    badge: "🔥", 
    color: "from-orange-400 to-red-600",
    perks: ["Priority Event Access", "Mentor Program", "Advanced Badges"],
    description: "Leading campus activities and helping others"
  },
  { 
    level: 4, 
    name: "Leader", 
    minPoints: 700, 
    maxPoints: 1500, 
    badge: "⭐", 
    color: "from-purple-400 to-indigo-600",
    perks: ["Exclusive Events", "Leadership Roles", "Profile Boosts"],
    description: "Campus influencer and role model"
  },
  { 
    level: 5, 
    name: "Campus Legend", 
    minPoints: 1500, 
    maxPoints: Infinity, 
    badge: "👑", 
    color: "from-yellow-400 to-amber-600",
    perks: ["Legend Status", "All Features Unlocked", "Campus Hall of Fame"],
    description: "Iconic presence that defines campus culture"
  }
];

const badges = [
  { id: 1, name: "Profile Completer", icon: "👤", description: "Completed 100% profile setup", earned: true, points: 15, rarity: "common" },
  { id: 2, name: "Club Joiner", icon: "🎭", description: "Joined first student club", earned: true, points: 20, rarity: "common" },
  { id: 3, name: "Event Lover", icon: "🎪", description: "Attended 5+ campus events", earned: true, points: 30, rarity: "uncommon" },
  { id: 4, name: "Helper", icon: "🤝", description: "Helped 3+ juniors with academics", earned: false, points: 30, rarity: "uncommon" },
  { id: 5, name: "Chat Star", icon: "💬", description: "Sent 100+ meaningful messages", earned: false, points: 25, rarity: "rare" },
  { id: 6, name: "Match Maker", icon: "💖", description: "10+ successful study matches", earned: false, points: 50, rarity: "rare" },
  { id: 7, name: "Streak Master", icon: "🔥", description: "30-day consecutive login streak", earned: false, points: 100, rarity: "epic" },
  { id: 8, name: "Campus Legend", icon: "👑", description: "Reached maximum level", earned: false, points: 200, rarity: "legendary" }
];

const activities = [
  { id: 1, action: "Joined Music Club", points: 20, time: "2 hours ago", icon: "🎵", type: "social" },
  { id: 2, action: "Daily Login Streak", points: 10, time: "1 day ago", icon: "🔥", type: "streak" },
  { id: 3, action: "Helped Junior with DSA", points: 10, time: "1 day ago", icon: "🤝", type: "academic" },
  { id: 4, action: "Posted in Lost & Found", points: 5, time: "2 days ago", icon: "🎒", type: "community" },
  { id: 5, action: "Completed Profile", points: 15, time: "3 days ago", icon: "👤", type: "profile" },
  { id: 6, action: "Got 5 Good Vibes", points: 10, time: "4 days ago", icon: "❤️", type: "social" }
];

const leaderboard = [
  { rank: 1, name: "Priya Sharma", points: 1245, level: 5, house: "Blue Dragon", avatar: "👩‍💻", progress: 12, change: "up" },
  { rank: 2, name: "Rahul Verma", points: 987, level: 4, house: "Red Phoenix", avatar: "👨‍🔧", progress: 8, change: "up" },
  { rank: 3, name: "Aditi Patel", points: 876, level: 4, house: "Green Tiger", avatar: "👩‍🎨", progress: 15, change: "up" },
  { rank: 4, name: "Vikram Singh", points: 765, level: 4, house: "Yellow Wolf", avatar: "👨‍🎤", progress: -3, change: "down" },
  { rank: 5, name: "Neha Gupta", points: 654, level: 3, house: "Red Phoenix", avatar: "👩‍🎓", progress: 5, change: "up" },
  { rank: 6, name: "Arjun Kumar", points: 543, level: 3, house: "Blue Dragon", avatar: "👨‍💼", progress: 10, change: "up" },
  { rank: 7, name: "Sneha Reddy", points: 432, level: 3, house: "Green Tiger", avatar: "👩‍🍳", progress: -2, change: "down" },
  { rank: 8, name: "Rohan Mehta", points: 321, level: 2, house: "Yellow Wolf", avatar: "👨‍🎓", progress: 7, change: "up" },
  { rank: 9, name: "Anjali Joshi", points: 298, level: 2, house: "Red Phoenix", avatar: "👩‍🔬", progress: 3, change: "up" },
  { rank: 10, name: "Karan Malhotra", points: 265, level: 2, house: "Blue Dragon", avatar: "👨‍🚀", progress: -5, change: "down" }
];

const missions = [
  { id: 1, title: "Chat Champion", description: "Send messages to 3 different students", reward: 15, progress: 2, total: 3, icon: MessageCircle, type: "social", timeLeft: "5h", category: "daily" },
  { id: 2, title: "Event Explorer", description: "Join any campus event this week", reward: 30, progress: 0, total: 1, icon: Calendar, type: "event", timeLeft: "2d", category: "weekly" },
  { id: 3, title: "Helper Spirit", description: "Help 1 junior with academics", reward: 10, progress: 0, total: 1, icon: Users, type: "academic", timeLeft: "7d", category: "weekly" },
  { id: 4, title: "Club Enthusiast", description: "Join a new club", reward: 20, progress: 1, total: 1, icon: Home, type: "social", timeLeft: "3d", category: "weekly" },
  { id: 5, title: "Profile Perfectionist", description: "Complete your profile setup", reward: 15, progress: 85, total: 100, icon: User, type: "profile", timeLeft: "No limit", category: "one-time" },
  { id: 6, title: "Study Buddy", description: "Connect with 2 study partners", reward: 25, progress: 1, total: 2, icon: Users, type: "academic", timeLeft: "4d", category: "weekly" },
  { id: 7, title: "Early Bird", description: "Login before 9 AM for 3 days", reward: 20, progress: 1, total: 3, icon: Clock, type: "streak", timeLeft: "2d", category: "weekly" },
  { id: 8, title: "Social Butterfly", description: "Get 10 Good Vibes reactions", reward: 30, progress: 6, total: 10, icon: Heart, type: "social", timeLeft: "6d", category: "weekly" }
];

const rewards = [
  { id: 1, name: "Profile Badge", cost: 50, icon: "🛡️", unlocked: true, description: "Show off your achievements", category: "badge" },
  { id: 2, name: "Chat Stickers", cost: 100, icon: "💬", unlocked: true, description: "Express yourself better", category: "cosmetic" },
  { id: 3, name: "Boosted Visibility", cost: 200, icon: "🚀", unlocked: false, description: "Get seen by more students", category: "boost" },
  { id: 4, name: "Campus Star", cost: 300, icon: "⭐", unlocked: false, description: "Featured on leaderboard", category: "premium" },
  { id: 5, name: "Verified Helper", cost: 400, icon: "✅", unlocked: false, description: "Trusted mentor badge", category: "badge" },
  { id: 6, name: "Exclusive Rooms", cost: 500, icon: "🔒", unlocked: false, description: "Access premium chat rooms", category: "premium" },
  { id: 7, name: "Custom Theme", cost: 150, icon: "🎨", unlocked: false, description: "Personalize your profile", category: "cosmetic" },
  { id: 8, name: "Priority Support", cost: 250, icon: "⚡", unlocked: false, description: "Faster help when needed", category: "premium" }
];

const pointCategories = [
  { name: "Joining Clubs", points: 20, icon: Users, description: "Expand your campus network" },
  { name: "Attending Events", points: "30-50", icon: Calendar, description: "Participate in campus activities" },
  { name: "Helping Juniors", points: 10, icon: Heart, description: "Mentorship and guidance" },
  { name: "Lost & Found Posts", points: 5, icon: BookOpen, description: "Helpful community contributions" },
  { name: "Profile Completion", points: 15, icon: User, description: "Complete your campus profile" },
  { name: "Good Vibes Reactions", points: 2, icon: Sparkles, description: "Positive interactions" },
  { name: "Match Connect", points: 10, icon: MessageCircle, description: "Successful study matches" },
  { name: "Daily Login Streak", points: "2-25", icon: Flame, description: "Consistent engagement" }
];

const houses = [
  { name: "Red Phoenix", color: "from-red-500 to-pink-600", points: 12450, members: 320, rank: 1 },
  { name: "Blue Dragon", color: "from-blue-500 to-cyan-600", points: 11870, members: 310, rank: 2 },
  { name: "Green Tiger", color: "from-green-500 to-emerald-600", points: 11230, members: 295, rank: 3 },
  { name: "Yellow Wolf", color: "from-yellow-500 to-amber-600", points: 10560, members: 275, rank: 4 }
];

export default function CampusPointsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [missionFilter, setMissionFilter] = useState("all");
  const [rewardFilter, setRewardFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentLevel = levels.find(level => level.level === userData.level);
  const nextLevel = levels.find(level => level.level === userData.level + 1);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };



  const filteredMissions = missions.filter(mission => {
    if (missionFilter === "all") return true;
    return mission.category === missionFilter;
  });

  const filteredRewards = rewards.filter(reward => {
    if (rewardFilter === "all") return true;
    return reward.category === rewardFilter;
  });

  const filteredLeaderboard = leaderboard.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.house.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-4 md:py-8">
      <div className={`${isMobile ? 'max-w-full px-4' : 'max-w-7xl mx-auto px-6'}`}>
        
        {/* Enhanced Header with Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25"
              >
                <Trophy className="text-white" size={24} />
              </motion.div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Campus Points
                </h1>
                <p className="text-lg md:text-xl text-slate-700">
                  Level up your campus life - Earn rewards, unlock achievements!
                </p>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-1 border border-slate-200/50">
              {["overview", "missions", "leaderboard", "rewards", "info"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Current Level</p>
                  <p className="text-2xl font-bold text-slate-800">{currentLevel?.name}</p>
                </div>
                <div className="text-2xl">{currentLevel?.badge}</div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Total Points</p>
                  <p className="text-2xl font-bold text-slate-800">{userData.points}</p>
                </div>
                <Zap className="text-amber-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Login Streak</p>
                  <p className="text-2xl font-bold text-slate-800">{userData.streak} days</p>
                </div>
                <Flame className="text-red-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Campus Rank</p>
                  <p className="text-2xl font-bold text-slate-800">#{userData.rank}</p>
                </div>
                <TrendingUp className="text-green-500" size={24} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {/* Left Column - Progress & Levels */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                
                {/* Enhanced Level Progress Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Your Progress</h2>
                    <button 
                      onClick={() => setShowTutorial(true)}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-800 text-sm"
                    >
                      <HelpCircle size={16} />
                      How it works
                    </button>
                  </div>

                  {/* Level Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-4xl bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl w-16 h-16 flex items-center justify-center text-white shadow-2xl"
                    >
                      {currentLevel?.badge}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800">Level {userData.level} • {currentLevel?.name}</h3>
                      <p className="text-slate-600 text-sm">{currentLevel?.description}</p>
                    </div>
                  </div>

                  {/* Enhanced XP Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-600 mb-3">
                      <span>{userData.points} points</span>
                      <span>{nextLevel ? `${nextLevel.minPoints - userData.points} to next level` : 'Max Level'}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${userData.levelProgress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full shadow-lg relative"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-amber-500 rounded-full shadow-lg"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Level Perks */}
                  <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/50">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                      <Sparkles size={16} />
                      Current Level Perks
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentLevel?.perks.map((perk, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-amber-700">
                          <CheckCircle size={14} className="text-green-500" />
                          {perk}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Points Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-lg"
                >
                  <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Zap size={24} className="text-amber-500" />
                    How to Earn Points
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pointCategories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-4 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/30 hover:border-amber-300 transition-all"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white">
                          <category.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 text-sm">{category.name}</h3>
                          <p className="text-slate-600 text-xs">{category.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-amber-600 font-bold text-sm">
                            <Zap size={14} />
                            +{category.points}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Activity History with Filters */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Calendar size={24} className="text-blue-500" />
                      Recent Activity
                    </h2>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-sm transition-colors">
                        All
                      </button>
                      <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-sm transition-colors">
                        This Week
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-slate-50/80 rounded-2xl border border-slate-200/30 hover:bg-white transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{activity.icon}</div>
                          <div>
                            <div className="font-medium text-slate-800 text-sm">{activity.action}</div>
                            <div className="text-slate-500 text-xs">{activity.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-lg">
                            +{activity.points}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Enhanced Sidebar */}
              <div className="space-y-6 md:space-y-8">
                
                {/* House Competition */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Crown size={24} />
                    <div>
                      <h3 className="font-bold text-lg">House Competition</h3>
                      <p className="text-red-100 text-sm">Monthly Ranking</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-red-100">Your House</span>
                      <span className="font-bold">Red Phoenix</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-100">Current Rank</span>
                      <span className="font-bold">#{userData.houseRank}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-100">Season Ends</span>
                      <span className="font-bold">12 days</span>
                    </div>
                  </div>

                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '65%' }} />
                  </div>
                  <div className="text-red-100 text-xs mt-2 text-center">65% to next rank</div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-lg"
                >
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Target size={20} />
                    Quick Wins
                  </h3>
                  
                  <div className="space-y-3">
                    {missions.slice(0, 2).map((mission) => (
                      <div key={mission.id} className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/30">
                        <mission.icon size={16} className="text-blue-500" />
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 text-sm">{mission.title}</div>
                          <div className="text-slate-600 text-xs">{mission.description}</div>
                        </div>
                        <div className="text-amber-600 font-bold text-sm">+{mission.reward}</div>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerConfetti}
                    className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={16} />
                    Earn Points Now
                  </motion.button>
                </motion.div>

                {/* Next Level Preview */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl"
                >
                  <h3 className="font-bold text-lg mb-3">Next Level Preview</h3>
                  {nextLevel ? (
                    <>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{nextLevel.badge}</div>
                        <div>
                          <div className="font-bold">Level {nextLevel.level}</div>
                          <div className="text-purple-100 text-sm">{nextLevel.name}</div>
                        </div>
                      </div>
                      <div className="text-purple-100 text-sm mb-3">
                        {nextLevel.description}
                      </div>
                      <div className="space-y-2">
                        {nextLevel.perks.slice(0, 2).map((perk, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Sparkles size={12} />
                            {perk}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <Crown size={32} className="mx-auto mb-2" />
                      <div className="font-bold">Max Level Reached!</div>
                      <div className="text-purple-100 text-sm">You're a Campus Legend</div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Missions Tab */}
          {activeTab === "missions" && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Daily Missions</h2>
                    <p className="text-slate-600">Complete missions to earn points and level up faster</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="bg-amber-50 rounded-2xl px-4 py-2 border border-amber-200">
                      <div className="text-amber-800 font-bold text-sm">Completed: {userData.completedMissions}</div>
                    </div>
                  </div>
                </div>

                {/* Mission Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {["all", "daily", "weekly", "one-time"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setMissionFilter(filter)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                        missionFilter === filter
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {filter === "all" ? "All Missions" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Missions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredMissions.map((mission, index) => (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white">
                            <mission.icon size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 text-lg">{mission.title}</h3>
                            <p className="text-slate-600 text-sm">{mission.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-amber-600 font-bold text-lg">
                            <Zap size={16} />
                            +{mission.reward}
                          </div>
                          <div className="text-slate-500 text-xs">{mission.timeLeft} left</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span>Progress</span>
                          <span>{mission.progress}/{mission.total}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                          />
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${
                          mission.progress >= mission.total
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                        }`}
                      >
                        {mission.progress >= mission.total ? 'Claim Reward' : 'Continue Mission'}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Campus Leaderboard</h2>
                    <p className="text-slate-600">Top students across the campus</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        type="text"
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* User Rank Highlight */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold">#{userData.rank}</div>
                      <div>
                        <div className="font-bold">Your Rank</div>
                        <div className="text-amber-100 text-sm">{userData.points} points • Level {userData.level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{userData.house}</div>
                      <div className="text-amber-100 text-sm">Top {Math.round((userData.rank / userData.totalStudents) * 100)}%</div>
                    </div>
                  </div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-white rounded-2xl border border-slate-200/50 overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-sm">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Student</div>
                    <div className="col-span-2">House</div>
                    <div className="col-span-2">Points</div>
                    <div className="col-span-2">Progress</div>
                  </div>
                  
                  <div className="divide-y divide-slate-100">
                    {filteredLeaderboard.map((student, index) => (
                      <motion.div
                        key={student.rank}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50/50 transition-colors"
                      >
                        <div className="col-span-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            student.rank <= 3 
                              ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {student.rank}
                          </div>
                        </div>
                        
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="text-2xl">{student.avatar}</div>
                          <div>
                            <div className="font-semibold text-slate-800">{student.name}</div>
                            <div className="text-slate-500 text-sm">Level {student.level}</div>
                          </div>
                        </div>
                        
                        <div className="col-span-2">
                          <div className="text-slate-700 font-medium">{student.house}</div>
                        </div>
                        
                        <div className="col-span-2">
                          <div className="font-bold text-slate-800">{student.points}</div>
                        </div>
                        
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            {student.change === "up" ? (
                              <TrendingUp size={16} className="text-green-500" />
                            ) : (
                              <TrendingDown size={16} className="text-red-500" />
                            )}
                            <span className={`text-sm font-medium ${
                              student.change === "up" ? "text-green-600" : "text-red-600"
                            }`}>
                              {student.progress > 0 ? "+" : ""}{student.progress}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* House Rankings */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">House Rankings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {houses.map((house, index) => (
                      <motion.div
                        key={house.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-br ${house.color} rounded-2xl p-4 text-white`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-lg">{house.name}</div>
                            <div className="text-white/80 text-sm">{house.members} members</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">#{house.rank}</div>
                            <div className="text-white/80 text-sm">{house.points} points</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Rewards Tab */}
          {activeTab === "rewards" && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Rewards Shop</h2>
                    <p className="text-slate-600">Redeem your points for exclusive rewards</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="bg-amber-50 rounded-2xl px-4 py-2 border border-amber-200">
                      <div className="text-amber-800 font-bold">Available Points: {userData.points}</div>
                    </div>
                  </div>
                </div>

                {/* Reward Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {["all", "badge", "cosmetic", "boost", "premium"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setRewardFilter(filter)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                        rewardFilter === filter
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {filter === "all" ? "All Rewards" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Rewards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRewards.map((reward, index) => (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white rounded-2xl p-6 border-2 shadow-lg transition-all ${
                        reward.unlocked 
                          ? 'border-green-200 bg-green-50/50' 
                          : 'border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{reward.icon}</div>
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{reward.name}</h3>
                        <p className="text-slate-600 text-sm">{reward.description}</p>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-amber-600 font-bold">
                          <Zap size={16} />
                          {reward.cost} points
                        </div>
                        {reward.unlocked && (
                          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                            <CheckCircle size={14} />
                            Unlocked
                          </div>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: reward.unlocked ? 1 : 1.02 }}
                        whileTap={{ scale: reward.unlocked ? 1 : 0.98 }}
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${
                          reward.unlocked
                            ? 'bg-green-500 text-white shadow-lg cursor-default'
                            : userData.points >= reward.cost
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                        disabled={reward.unlocked || userData.points < reward.cost}
                      >
                        {reward.unlocked ? 'Unlocked' : userData.points >= reward.cost ? 'Redeem Now' : 'Need More Points'}
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Tab */}
          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-xl">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">About Campus Points</h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Your guide to understanding how the Campus Points system works and how to make the most of your campus experience.
                  </p>
                </div>

                {/* System Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Zap className="text-blue-500" size={24} />
                        What Are Campus Points?
                      </h3>
                      <p className="text-slate-700 mb-4">
                        Campus Points is a gamified system that rewards you for engaging with your campus community. 
                        Think of it like Instagram + Duolingo + College Life mixed together!
                      </p>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          Earn points for meaningful campus activities
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          Level up to unlock exclusive perks
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          Compete with friends and houses
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          Redeem points for awesome rewards
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Target className="text-amber-500" size={24} />
                        Level System
                      </h3>
                      <div className="space-y-4">
                        {levels.map((level) => (
                          <div key={level.level} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-amber-100">
                            <div className="text-2xl">{level.badge}</div>
                            <div className="flex-1">
                              <div className="font-semibold text-slate-800">
                                Level {level.level} • {level.name}
                              </div>
                              <div className="text-slate-600 text-sm">{level.description}</div>
                            </div>
                            <div className="text-slate-500 text-sm text-right">
                              {level.minPoints}-{level.maxPoints === Infinity ? '∞' : level.maxPoints} pts
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Crown className="text-purple-500" size={24} />
                        House System
                      </h3>
                      <p className="text-slate-700 mb-4">
                        Students are sorted into one of four houses that compete for monthly rankings. 
                        Your house earns points based on member activities!
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {houses.map((house) => (
                          <div key={house.name} className={`bg-gradient-to-br ${house.color} rounded-xl p-3 text-white text-center`}>
                            <div className="font-bold">{house.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Flame className="text-green-500" size={24} />
                        Daily Streak Bonus
                      </h3>
                      <p className="text-slate-700 mb-4">
                        Login daily to build your streak and earn bonus points! The longer your streak, the more points you earn.
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white rounded-lg p-2 border border-green-200">
                          <div className="font-bold text-green-600">Day 1</div>
                          <div className="text-sm text-slate-600">+2 pts</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-green-200">
                          <div className="font-bold text-green-600">Day 5</div>
                          <div className="text-sm text-slate-600">+10 pts</div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-green-200">
                          <div className="font-bold text-green-600">Day 10</div>
                          <div className="text-sm text-slate-600">+25 pts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">How do I earn points quickly?</h4>
                      <p className="text-slate-600 text-sm">
                        Focus on daily missions, join clubs, attend events, and help other students. 
                        Consistency is key - maintain your daily login streak for bonus points!
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">Can I lose points?</h4>
                      <p className="text-slate-600 text-sm">
                        No, points are only added and never deducted. However, your house ranking can change based on other students' activities.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-2">What happens at the end of the season?</h4>
                      <p className="text-slate-600 text-sm">
                        House rankings are reset, but you keep all your personal points, levels, and rewards. 
                        Top performers get special recognition and bonus rewards!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tutorial Modal */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowTutorial(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-slate-800 mb-4">How Campus Points Work</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Zap className="text-amber-500 mt-1" size={16} />
                    <div>
                      <div className="font-semibold text-slate-800">Earn Points</div>
                      <div className="text-slate-600 text-sm">Participate in campus activities, help others, and engage with the community</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="text-green-500 mt-1" size={16} />
                    <div>
                      <div className="font-semibold text-slate-800">Level Up</div>
                      <div className="text-slate-600 text-sm">Gain levels to unlock exclusive perks and recognition</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Gift className="text-purple-500 mt-1" size={16} />
                    <div>
                      <div className="font-semibold text-slate-800">Redeem Rewards</div>
                      <div className="text-slate-600 text-sm">Spend points on profile boosts, badges, and exclusive features</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold"
                >
                  Got it!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    scale: 0,
                    opacity: 1,
                    x: 0,
                    y: 0
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200,
                    rotate: Math.random() * 360
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut"
                  }}
                  className="absolute text-2xl"
                  style={{
                    color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#FF8E53'][Math.floor(Math.random() * 4)]
                  }}
                >
                  {['⭐', '🎉', '✨', '🔥'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}