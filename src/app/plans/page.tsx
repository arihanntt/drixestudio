"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { plans } from "@/components/plans";
import { CheckCircle, X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/Modal";

interface Plan {
  name: string;
  price: number;
  summary: string;
  details: string[];
  popular?: boolean;
}

const currencyRates: { [key: string]: number } = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AUD: 0.018,
  CAD: 0.016,
  JPY: 1.76,
  CNY: 0.085,
  AED: 0.044,
  SGD: 0.016,
  MYR: 0.056,
  KRW: 16.0,
};

const currencySymbols: { [key: string]: string } = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  JPY: "¥",
  CNY: "¥",
  AED: "د.إ",
  SGD: "S$",
  MYR: "RM",
  KRW: "₩",
};

const PlanCard = React.memo(({ 
  plan, 
  selectedCurrency, 
  openModal
}: { 
  plan: Plan; 
  selectedCurrency: string; 
  openModal: (plan: Plan) => void;
}) => {
  const getConvertedPrice = (price: number) => {
    const rate = currencyRates[selectedCurrency] || 1;
    return (price * rate).toFixed(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative border border-white/10 bg-gradient-to-b from-[#161622]/90 to-[#161622]/70 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden ${
        plan.popular ? "border-violet-500 ring-2 ring-violet-500/30" : ""
      }`}
      whileHover={{
        boxShadow: "0 0 20px 5px rgba(167, 39, 250, 0.4)",
        transform: "translateY(-5px)",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white drop-shadow-md">
          {plan.name}
        </h3>
        <span className="text-2xl font-bold text-violet-400 drop-shadow-lg">
          {currencySymbols[selectedCurrency]}
          {getConvertedPrice(plan.price)}
          <span className="text-sm text-white/70"></span>
        </span>
      </div>

      <p className="text-white/70 italic mb-6 text-sm sm:text-base leading-snug bg-gradient-to-r from-violet-500/10 to-indigo-500/10 p-4 rounded-lg">
        {plan.summary}
      </p>

      <ul className="space-y-4 text-sm sm:text-base text-white/90 mb-8">
        {plan.details.map((item: string, idx: number) => (
          <motion.li
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-violet-500 shrink-0" />
            <span className="flex-1">{item}</span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-violet-500/50 relative overflow-hidden group"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => openModal(plan)}
      >
        <span className="relative z-10">Get Started</span>
        <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </motion.button>
    </motion.div>
  );
});

const ComparisonTable = ({ 
  plansToCompare, 
  selectedCurrency,
  onClose 
}: { 
  plansToCompare: Plan[], 
  selectedCurrency: string,
  onClose: () => void 
}) => {
  const getConvertedPrice = (price: number) => {
    const rate = currencyRates[selectedCurrency] || 1;
    return (price * rate).toFixed(0);
  };

  // Get all unique features from all compared plans
  const allFeatures = Array.from(
    new Set(plansToCompare.flatMap(plan => plan.details))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div 
        className="bg-[#161622] rounded-2xl shadow-2xl border border-white/10 w-full max-w-6xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        style={{ marginTop: '20vh' }} // Added margin to avoid header clash
      >
        <div className="sticky top-0 bg-[#161622]/90 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Plan Comparison</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="overflow-x-auto pb-2">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 text-left text-white/70 font-medium">Feature</th>
                  {plansToCompare.map(plan => (
                    <th key={plan.name} className="pb-4 px-2 sm:px-4 text-center">
                      <div className="font-bold text-white">{plan.name}</div>
                      <div className="text-violet-400 text-sm sm:text-base">
                        {currencySymbols[selectedCurrency]}
                        {getConvertedPrice(plan.price)}
                        <span className="text-xs sm:text-sm text-white/70"></span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 text-white/80 text-sm sm:text-base">{feature}</td>
                    {plansToCompare.map(plan => (
                      <td key={`${plan.name}-${index}`} className="py-4 px-2 sm:px-4 text-center">
                        {plan.details.includes(feature) ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500/70 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CompareDropdown = ({
  plans,
  selectedPlans,
  toggleCompare,
  onCompare,
  isMobile
}: {
  plans: Plan[],
  selectedPlans: string[],
  toggleCompare: (planName: string) => void,
  onCompare: () => void,
  isMobile: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
          selectedPlans.length > 0
            ? "bg-emerald-500/10 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/20"
            : "bg-transparent border border-white/20 text-white/70 hover:border-violet-500"
        } ${isOpen ? "bg-white/10" : ""}`}
        onClick={() => {
          setIsOpen(!isOpen);
          if (selectedPlans.length > 0 && !isOpen && isMobile) {
            onCompare();
          }
        }}
      >
        <span>Compare Plans</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`absolute z-10 mt-2 w-full sm:w-64 bg-[#1d1d2b] border border-white/10 rounded-xl shadow-lg overflow-hidden ${
            isMobile ? "left-0" : "right-0"
          }`}
        >
          <div className="p-2 max-h-60 overflow-y-auto">
            {plans.map(plan => (
              <div
                key={plan.name}
                className="flex items-center p-3 hover:bg-white/5 rounded-lg cursor-pointer"
                onClick={() => toggleCompare(plan.name)}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 ${
                  selectedPlans.includes(plan.name)
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                    : "border-white/20"
                }`}>
                  {selectedPlans.includes(plan.name) && <Check className="w-3 h-3" />}
                </div>
                <span className="text-white/90">{plan.name}</span>
                {plan.popular && (
                  <span className="ml-auto bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
              </div>
            ))}
          </div>
          {selectedPlans.length > 0 && (
            <div className="border-t border-white/10 p-2">
              <button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition-colors"
                onClick={() => {
                  onCompare();
                  setIsOpen(false);
                }}
              >
                Compare Selected ({selectedPlans.length})
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default function PlansPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [plansToCompare, setPlansToCompare] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mark Empire plan as popular
  const modifiedPlans = useMemo(() => {
    return plans.map(plan => ({
      ...plan,
      popular: plan.name === "Empire" // Only Empire plan will have popular badge now
    }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openModal = useCallback((plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  }, []);

  const toggleCompare = useCallback((planName: string) => {
    setPlansToCompare(prev => 
      prev.includes(planName) 
        ? prev.filter(name => name !== planName)
        : [...prev, planName]
    );
  }, []);

  const toggleComparisonModal = useCallback(() => {
    if (plansToCompare.length > 0) {
      setShowComparison(!showComparison);
    }
  }, [plansToCompare]);

  const plansGrid = useMemo(() => {
    return modifiedPlans.map((plan: Plan, index: number) => (
      <div key={index} className="h-full">
        <PlanCard 
          plan={plan} 
          selectedCurrency={selectedCurrency} 
          openModal={openModal}
        />
      </div>
    ));
  }, [modifiedPlans, selectedCurrency, openModal]);

  const comparedPlans = useMemo(() => {
    return modifiedPlans.filter(plan => plansToCompare.includes(plan.name));
  }, [plansToCompare, modifiedPlans]);

  return (
    <section className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-br from-[#0e0e10] via-[#1a1a2e] to-[#11101c] text-white border-t border-neutral-800 overflow-hidden min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14]/80 via-[#1a1a2e]/70 to-[#11101c]/80"></div>
        <div className="absolute -top-32 left-1/3 w-[900px] h-[900px] bg-violet-700/20 blur-[180px] rounded-full opacity-20"></div>
        <div className="absolute top-[-15vw] -right-[15vw] w-[800px] h-[800px] bg-indigo-400/10 blur-[160px] rounded-full"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20, x: Math.random() * 100 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -100],
              x: [Math.random() * 100, Math.random() * 100 + 50]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-violet-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20 max-w-3xl mx-auto px-2"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-semibold text-white/60 tracking-wide uppercase mb-2"
        >
          Our Discord Setup Packages
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg mb-4"
        >
          Premium Server Solutions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/50 max-w-xl mx-auto mt-4 leading-relaxed"
        >
          Elevate your Discord community with our expertly crafted plans - designed to scale with your vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <div className="flex items-center">
            <label htmlFor="currency-select" className="text-sm text-white/60 mr-4">
              Select Currency:
            </label>
            <select
              id="currency-select"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-[#1d1d2b] text-white px-5 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all hover:border-violet-500 appearance-none relative"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                backgroundSize: "1em 1em",
              }}
            >
              {Object.keys(currencyRates).map((currency) => (
                <option key={currency} value={currency} className="bg-[#1d1d2b] text-white">
                  {currencySymbols[currency]} {currency}
                </option>
              ))}
            </select>
          </div>
          
          <CompareDropdown
            plans={modifiedPlans}
            selectedPlans={plansToCompare}
            toggleCompare={toggleCompare}
            onCompare={toggleComparisonModal}
            isMobile={isMobile}
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-0">
        <AnimatePresence>
          {plansGrid}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-white/60 mb-4">
          Need something custom? We'll craft the perfect solution for your community.
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-violet-500/50 relative overflow-hidden group"
        >
          <span className="relative z-10">Request Custom Plan</span>
          <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.a>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            plan={selectedPlan?.name || "Unknown Plan"}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showComparison && (
          <ComparisonTable 
            plansToCompare={comparedPlans} 
            selectedCurrency={selectedCurrency}
            onClose={() => setShowComparison(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}