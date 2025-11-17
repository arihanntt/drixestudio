"use client";
type FormDataType = {
  campus: string;
  userType: string;
  fullName: string;
  email: string;
  password: string;
  department: string;
  gender: string;
  interests: string[]; // <-- IMPORTANT
};

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, Building2, CheckCircle, XCircle, Sparkles, Shield, Users, BookOpen } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({

    campus: "MIET Jammu",
    userType: "student",
    fullName: "",
    email: "",
    password: "",
    department: "",
    gender: "",
    interests: []
  });

  const campuses = ["MIET Jammu"];
  const departments = ["CSE", "ECE", "Civil", "Mechanical", "Administration"];
  const interestsList = [
    { icon: "🎧", label: "Music" },
    { icon: "🏀", label: "Sports" },
    { icon: "💻", label: "Coding" },
    { icon: "📸", label: "Photography" },
    { icon: "🎬", label: "Movies" },
    { icon: "🎨", label: "Art" },
    { icon: "📚", label: "Academics" },
    { icon: "🎤", label: "Speaking & Debates" },
    { icon: "🎮", label: "Gaming" }
  ];

  const handleInterestToggle = (interest: string) => {

    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission - redirect to home
      window.location.href = "/";
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isEmailValid = formData.email.endsWith("@mietjammu.in");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-8">
      <div className="max-w-md mx-auto px-4">
        
        {/* Header Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25"
            >
              <Users className="text-white" size={24} />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Campus Connect
              </h1>
              <p className="text-slate-600 text-sm mt-1">Your Campus. Your People. Your Network.</p>
            </div>
          </div>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 shadow-xl"
        >
          
          {/* Toggle Switch */}
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                isLogin 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                !isLogin 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              /* LOGIN FORM */
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back!</h2>
                  <p className="text-slate-600">Login to your campus account</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        placeholder="your.email@mietjammu.in"
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <label className="flex items-center space-x-2 text-sm text-slate-700">
                      <input type="checkbox" className="rounded border-slate-300 text-purple-500 focus:ring-purple-500" />
                      <span>Remember me</span>
                    </label>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                      Forgot password? <span className="text-xs">(Coming Soon)</span>
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} />
                  Login to Campus
                </motion.button>

                <div className="text-center">
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-slate-600 hover:text-slate-800 text-sm transition-colors"
                  >
                    Don't have an account? <span className="text-purple-600 font-semibold">Create one</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* SIGNUP FORM - Multi Step */
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                        step === currentStep 
                          ? 'bg-purple-500 text-white shadow-lg' 
                          : step < currentStep 
                          ? 'bg-green-500 text-white' 
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {step < currentStep ? <CheckCircle size={16} /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`w-12 h-1 mx-2 transition-all ${
                          step < currentStep ? 'bg-green-500' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* STEP 1: Campus & User Type */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to Campus Connect</h2>
                        <p className="text-slate-600">Select your campus to get started</p>
                      </div>

                      {/* Campus Selection */}
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-3 block">Select Your Campus</label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                          <select 
                            value={formData.campus}
                            onChange={(e) => setFormData({...formData, campus: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none"
                          >
                            {campuses.map(campus => (
                              <option key={campus} value={campus}>{campus}</option>
                            ))}
                          </select>
                        </div>
                        <p className="text-slate-500 text-xs mt-2 text-center">More campuses coming soon</p>
                      </div>

                      {/* User Type Selection */}
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-3 block">You Are A:</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { icon: "🧑‍🎓", label: "Student", value: "student" },
                            { icon: "👨‍🏫", label: "Faculty", value: "faculty" },
                            { icon: "🧑‍💼", label: "Staff", value: "staff" }
                          ].map((type) => (
                            <motion.button
                              key={type.value}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setFormData({...formData, userType: type.value})}
                              className={`p-4 rounded-2xl border-2 transition-all ${
                                formData.userType === type.value
                                  ? 'border-purple-500 bg-purple-50 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-purple-300'
                              }`}
                            >
                              <div className="text-2xl mb-2">{type.icon}</div>
                              <div className="text-sm font-medium text-slate-700">{type.label}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNextStep}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300"
                      >
                        Continue
                      </motion.button>
                    </motion.div>
                  )}

                  {/* STEP 2: Basic Information */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Your Account</h2>
                        <p className="text-slate-600">Basic information for your profile</p>
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Email with Validation */}
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">MIET Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="email"
                            placeholder="your.name@mietjammu.in"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={`w-full bg-white border rounded-2xl pl-12 pr-12 py-4 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                              formData.email ? 
                                isEmailValid 
                                  ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20' 
                                  : 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-slate-200 focus:border-purple-500 focus:ring-purple-500/20'
                            }`}
                          />
                          {formData.email && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              {isEmailValid ? (
                                <CheckCircle className="text-green-500" size={18} />
                              ) : (
                                <XCircle className="text-red-500" size={18} />
                              )}
                            </div>
                          )}
                        </div>
                        {formData.email && !isEmailValid && (
                          <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                            <XCircle size={12} />
                            Use your college email to continue
                          </p>
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {/* Department */}
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Department</label>
                        <div className="relative">
                          <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                          <select 
                            value={formData.department}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none"
                          >
                            <option value="">Select your department</option>
                            {departments.map(dept => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePreviousStep}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-2xl font-semibold transition-all duration-300"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNextStep}
                          disabled={!formData.fullName || !isEmailValid || !formData.password || !formData.department}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Profile Setup */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Complete Your Profile</h2>
                        <p className="text-slate-600">Help us personalize your experience</p>
                      </div>

                      {/* Gender Selection */}
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-3 block">Gender</label>
                        <div className="grid grid-cols-3 gap-3">
                          {["Male", "Female", "Prefer Not to Say"].map((gender) => (
                            <motion.button
                              key={gender}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setFormData({...formData, gender})}
                              className={`p-3 rounded-2xl border-2 transition-all ${
                                formData.gender === gender
                                  ? 'border-purple-500 bg-purple-50 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-purple-300'
                              }`}
                            >
                              <div className="text-sm font-medium text-slate-700">{gender}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Interests Selection */}
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-3 block">Choose Your Interests</label>
                        <div className="flex flex-wrap gap-2">
                          {interestsList.map((interest) => (
                            <motion.button
                              key={interest.label}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleInterestToggle(interest.label)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-sm font-medium transition-all ${
                                formData.interests.includes(interest.label)
                                  ? 'bg-purple-500 text-white shadow-lg'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300'
                              }`}
                            >
                              <span>{interest.icon}</span>
                              {interest.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePreviousStep}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-2xl font-semibold transition-all duration-300"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNextStep}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Shield size={18} />
                          Continue to Verify College Email
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-slate-200/50">
                  <button 
                    onClick={() => setIsLogin(true)}
                    className="text-slate-600 hover:text-slate-800 text-sm transition-colors"
                  >
                    Already have an account? <span className="text-purple-600 font-semibold">Login here</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-slate-500 text-sm">
            Made for MIET students with ❤️ — Demo Version
          </p>
        </motion.div>
      </div>
    </div>
  );
}