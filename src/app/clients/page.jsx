'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEATURES } from '../../data/featuresData';

export default function ClientsPage() {
  const router = useRouter();
  const [owner, setOwner] = useState('');
  const [discord, setDiscord] = useState('');
  const [password, setPassword] = useState('');
  const [selected, setSelected] = useState([]);
  const [mainPagePassword, setMainPagePassword] = useState('');
  const [isMainPageUnlocked, setIsMainPageUnlocked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const storedMainPassword = sessionStorage.getItem('mainPagePassword');
    const correctMainPassword = process.env.NEXT_PUBLIC_MAIN_PAGE_PASSWORD || 'admin123';
    if (storedMainPassword === correctMainPassword) {
      setIsMainPageUnlocked(true);
    }
  }, []);

  const toggleFeature = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!owner.trim()) newErrors.owner = 'Owner name is required';
    if (!discord.trim()) newErrors.discord = 'Discord username is required';
    if (selected.length === 0) newErrors.features = 'At least one feature must be selected';
    if (password && password.length < 4) newErrors.password = 'Password must be at least 4 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateLink = async () => {
    if (!validateForm()) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/launch-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner, discord, features: selected, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create launch page');
      }

      const { pageId } = result;

      if (password) {
        sessionStorage.setItem('launchPagePassword', password);
      } else {
        sessionStorage.removeItem('launchPagePassword');
      }

      // Animation before navigation
      await new Promise(resolve => setTimeout(resolve, 800));
      const params = new URLSearchParams({ pageId });
      router.push(`/clients/launch?${params.toString()}`);
    } catch (error) {
      console.error('Error creating launch page:', error);
      alert('Failed to create launch page. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMainPageUnlock = () => {
    const correctMainPassword = process.env.NEXT_PUBLIC_MAIN_PAGE_PASSWORD || 'admin123';
    if (mainPagePassword === correctMainPassword) {
      setIsMainPageUnlocked(true);
      sessionStorage.setItem('mainPagePassword', mainPagePassword);
    } else {
      alert('Incorrect main page password!');
      setMainPagePassword('');
    }
  };

  if (!isMainPageUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20"
        >
          <div className="text-white text-5xl mb-6">🔐</div>
          <h1 className="text-2xl font-bold text-white mb-2">Clients launch portal</h1>
          <p className="text-white/80 mb-8">Enter the admin password to continue</p>
          
          <motion.div whileHover={{ scale: 1.02 }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={mainPagePassword}
              onChange={(e) => setMainPagePassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleMainPageUnlock()}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
            />
          </motion.div>
          
          <motion.button
            onClick={handleMainPageUnlock}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Unlock Admin Portal
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Create Client Launch Guide</h1>
            <p className="text-purple-100">Generate a customized launch page for your clients</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="space-y-8">
              {/* Owner Info */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Server Owner Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        errors.owner 
                          ? 'border-red-500 focus:ring-red-200' 
                          : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                      }`}
                      value={owner}
                      onChange={(e) => setOwner(e.target.value)}
                      placeholder="Client's name"
                    />
                    {errors.owner && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-5 left-0 text-red-500 text-xs"
                      >
                        {errors.owner}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discord Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">@</span>
                    </div>
                    <input
                      type="text"
                      className={`w-full pl-8 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                        errors.discord 
                          ? 'border-red-500 focus:ring-red-200' 
                          : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                      }`}
                      value={discord}
                      onChange={(e) => setDiscord(e.target.value)}
                      placeholder="username"
                    />
                    {errors.discord && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-5 left-0 text-red-500 text-xs"
                      >
                        {errors.discord}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Password (optional)</label>
                <div className="relative">
                  <input
                    type="password"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set a password to protect the page"
                  />
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-5 left-0 text-red-500 text-xs"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">Leave empty for no password protection</p>
              </motion.div>

              {/* Features Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Select Features</label>
                  <button 
                    onClick={() => setShowFeatures(!showFeatures)}
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    {showFeatures ? 'Hide all' : 'Show all'}
                  </button>
                </div>

                {errors.features && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.features}
                  </motion.p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {FEATURES.map((f) => (
                      <motion.div
                        key={f.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`relative rounded-xl border overflow-hidden transition-all ${
                          selected.includes(f.key)
                            ? 'border-purple-500 bg-purple-50 shadow-md'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <label className="block p-4 cursor-pointer">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                checked={selected.includes(f.key)}
                                onChange={() => toggleFeature(f.key)}
                                className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                              />
                            </div>
                            <div className="ml-3">
                              <div className="flex items-center">
                                <span className="text-lg mr-2">{f.icon || '⚙️'}</span>
                                <span className="font-medium text-gray-900">{f.label}</span>
                              </div>
                              {showFeatures && (
                                <p className="mt-1 text-sm text-gray-600">{f.description}</p>
                              )}
                            </div>
                          </div>
                        </label>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer with Generate Button */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <motion.button
              onClick={generateLink}
              disabled={isGenerating || !owner || !discord || selected.length === 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all ${
                isGenerating || !owner || !discord || selected.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Launch Page...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Launch Page
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}