"use client";
type BusPosition = { x: number; y: number };
type BusPositionMap = Record<number, BusPosition>;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, MapPin, Clock, Users, Navigation, AlertCircle, Bell, Wifi, Battery, Zap, Shield, Eye, Calendar, Route, TrendingUp, Satellite, Brain, Thermometer, QrCode } from "lucide-react";

// Mock bus data
const buses = [
  {
    id: 1,
    name: "Bus 01",
    route: "Route A - Engineering Block → Main Gate",
    status: "arriving",
    eta: 4,
    currentLocation: "Library Road",
    seatsLeft: 12,
    driver: "Mr. Raj Kumar",
    capacity: 40,
    speed: "25 km/h",
    nextStop: "Main Gate",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Bus 02",
    route: "Route B - Hostel Complex → Academic Block",
    status: "moving",
    eta: 8,
    currentLocation: "Sports Complex",
    seatsLeft: 5,
    driver: "Ms. Priya Sharma",
    capacity: 40,
    speed: "30 km/h",
    nextStop: "Academic Block",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    name: "Bus 03",
    route: "Route C - Bus Stand → Campus Circle",
    status: "delayed",
    eta: 12,
    currentLocation: "City Center",
    seatsLeft: 25,
    driver: "Mr. Amit Singh",
    capacity: 40,
    speed: "18 km/h",
    nextStop: "Campus Circle",
    color: "from-orange-500 to-amber-500"
  }
];

const schedule = [
  { time: "7:30 AM", route: "Hostel → College", type: "morning" },
  { time: "8:00 AM", route: "Bus Stand → College", type: "morning" },
  { time: "9:30 AM", route: "City Center → College", type: "morning" },
  { time: "4:30 PM", route: "College → Hostel", type: "evening" },
  { time: "5:00 PM", route: "College → Bus Stand", type: "evening" },
  { time: "6:00 PM", route: "College → City Center", type: "evening" }
];

const alerts = [
  { id: 1, message: "Bus 01 arriving in 2 minutes at Main Gate", type: "info", time: "2 min ago" },
  { id: 2, message: "Route B delayed due to traffic near Sports Complex", type: "warning", time: "5 min ago" },
  { id: 3, message: "Extra bus added for evening route due to high demand", type: "success", time: "1 hour ago" }
];

const upcomingFeatures = [
  { icon: Satellite, title: "Live GPS Integration", description: "Real-time tracking with actual bus locations" },
  { icon: Brain, title: "AI Crowd Predictor", description: "Smart seat availability forecasting" },
  { icon: Thermometer, title: "Bus Load Heatmap", description: "Visual capacity tracking across routes" },
  { icon: QrCode, title: "Attendance Check-ins", description: "Automated attendance via QR codes" }
];

// Bus stops for the map
const busStops = [
  { id: 1, name: "Hostel", x: 50, y: 80 },
  { id: 2, name: "Library", x: 200, y: 40 },
  { id: 3, name: "Academic Block", x: 350, y: 70 },
  { id: 4, name: "Sports Complex", x: 280, y: 150 },
  { id: 5, name: "Main Gate", x: 150, y: 200 },
  { id: 6, name: "Campus Circle", x: 400, y: 180 }
];

export default function BusTrackerPage() {
  const [selectedBus, setSelectedBus] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [busPositions, setBusPositions] = useState<BusPositionMap>({
  1: { x: 180, y: 60 },
  2: { x: 250, y: 120 },
  3: { x: 320, y: 160 }
});


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate bus movement
    const interval = setInterval(() => {
      setBusPositions(prev => ({
        1: { x: (prev[1].x + 2) % 400, y: (prev[1].y + 1) % 200 },
        2: { x: (prev[2].x + 3) % 400, y: (prev[2].y + 2) % 200 },
        3: { x: (prev[3].x + 1) % 400, y: (prev[3].y + 3) % 200 }
      }));
    }, 2000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  const selectedBusData = buses.find(bus => bus.id === selectedBus);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/20 py-4 md:py-8">
      <div className={`${isMobile ? 'max-w-full px-4' : 'max-w-7xl mx-auto px-6'}`}>
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
            >
              <Bus className="text-white" size={24} />
            </motion.div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Campus Transport Tracker
              </h1>
              <p className="text-lg md:text-xl text-slate-700">
                Track buses in real-time, check seat availability, and reach class on time
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6"
          >
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-slate-200/50">
              <Bus size={18} className="text-green-500" />
              <span className="text-slate-700 font-medium">{buses.length} Active Buses</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-slate-200/50">
              <Users size={18} className="text-blue-500" />
              <span className="text-slate-700 font-medium">500+ Daily Riders</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-slate-200/50">
              <Shield size={18} className="text-emerald-500" />
              <span className="text-slate-700 font-medium">100% Safe & Verified</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Left Column - Bus List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Route size={24} className="text-blue-500" />
                  Active Buses
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white/80 border border-slate-200/50 px-3 py-2 rounded-2xl text-slate-700 text-sm font-medium"
                >
                  <Navigation size={16} />
                  Refresh
                </motion.button>
              </div>

              <div className="space-y-4">
                {buses.map((bus, index) => (
                  <motion.div
                    key={bus.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => setSelectedBus(bus.id)}
                    className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 cursor-pointer transition-all ${
                      selectedBus === bus.id 
                        ? 'border-blue-500 shadow-xl shadow-blue-500/10' 
                        : 'border-slate-200/50 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${bus.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                          <Bus size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg">{bus.name}</h3>
                          <p className="text-slate-600 text-sm">{bus.route}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ 
                          scale: selectedBus === bus.id ? [1, 1.2, 1] : 1 
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-3 h-3 rounded-full ${
                          bus.status === 'arriving' ? 'bg-green-500' :
                          bus.status === 'moving' ? 'bg-blue-500' :
                          'bg-orange-500'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Clock size={14} />
                          <span>ETA: {bus.eta} min</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <MapPin size={14} />
                          <span className="truncate">{bus.currentLocation}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <Users size={14} />
                          <span>{bus.seatsLeft} seats left</span>
                        </div>
                        <div className="text-slate-600 text-sm">
                          Driver: {bus.driver.split(' ')[0]}
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg"
                    >
                      Track on Map
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Live Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <MapPin size={24} className="text-green-500" />
                  Live Campus Map
                </h2>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Wifi size={14} />
                  <span>Live</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Map Container */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-xl h-[500px] relative overflow-hidden">
                {/* Fake Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-60"></div>
                
                {/* Roads */}
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" className="opacity-40">
                    {/* Main road */}
                    <path d="M50,80 L200,40 L350,70" stroke="#64748b" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M200,40 L280,150 L400,180" stroke="#64748b" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M150,200 L280,150" stroke="#64748b" strokeWidth="8" strokeLinecap="round" fill="none" />
                  </svg>
                </div>

                {/* Bus Stops */}
                {busStops.map((stop) => (
                  <motion.div
                    key={stop.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"
                    style={{ left: `${stop.x}px`, top: `${stop.y}px` }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                      {stop.name}
                    </div>
                  </motion.div>
                ))}

                {/* Moving Buses */}
                {buses.map((bus) => (
                  <motion.div
                    key={bus.id}
                    animate={busPositions[bus.id]}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-xl flex items-center justify-center ${
                      selectedBus === bus.id ? 'z-10 ring-4 ring-blue-400' : ''
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${bus.color.split(' ')[1]}, ${bus.color.split(' ')[3]})`
                    }}
                  >
                    <Bus size={14} className="text-white" />
                    {selectedBus === bus.id && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                        {bus.name} • {bus.eta} min
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Selected Bus Info Overlay */}
                {selectedBusData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{selectedBusData.name}</h3>
                        <p className="text-slate-600 text-sm">{selectedBusData.route}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{selectedBusData.eta} min</div>
                        <div className="text-slate-600 text-sm">to {selectedBusData.nextStop}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div className="text-center">
                        <div className="text-slate-600">Speed</div>
                        <div className="font-semibold text-slate-800">{selectedBusData.speed}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-600">Seats</div>
                        <div className="font-semibold text-slate-800">{selectedBusData.seatsLeft}/{selectedBusData.capacity}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-600">Driver</div>
                        <div className="font-semibold text-slate-800">{selectedBusData.driver.split(' ')[0]}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Schedule Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Calendar className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Today's Schedule</h3>
                  <p className="text-slate-600 text-sm">Real-time bus timings</p>
                </div>
              </div>

              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/30"
                  >
                    <div className="w-12 text-center">
                      <div className="text-slate-800 font-bold text-sm">{item.time}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-700 font-medium">{item.route}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'morning' 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.type}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Alerts & Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-lg h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Bell className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Live Alerts</h3>
                  <p className="text-slate-600 text-sm">Important notifications</p>
                </div>
              </div>

              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-200/30"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      alert.type === 'info' ? 'bg-blue-100 text-blue-600' :
                      alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <AlertCircle size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-700 text-sm">{alert.message}</p>
                      <p className="text-slate-500 text-xs mt-1">{alert.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Coming Soon</h3>
                  <p className="text-white/80 text-sm">Future innovations</p>
                </div>
              </div>

              <div className="space-y-4">
                {upcomingFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl backdrop-blur-sm"
                  >
                    <feature.icon size={18} className="text-white/90" />
                    <div>
                      <div className="font-semibold text-white text-sm">{feature.title}</div>
                      <div className="text-white/70 text-xs">{feature.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}