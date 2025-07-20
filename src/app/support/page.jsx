"use client";
import { useState } from 'react';
import { ArrowRight, Check, Heart, Zap, Star, Crown, Gift, MessageSquare, Coffee } from 'lucide-react';

export default function SupportPage() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const supportTiers = [
    {
      id: 1,
      name: "Basic Support",
      price: 5,
      features: [
        "Priority in our hearts",
        "Our sincere gratitude",
        "Warm fuzzy feelings"
      ],
      icon: <Heart className="text-pink-400" size={24} />,
      color: "from-pink-900 to-pink-700",
      border: "border-pink-500/20"
    },
    {
      id: 2,
      name: "Standard Support",
      price: 10,
      features: [
        "Everything in Basic",
        "Shoutout on our social media",
        "Early access to beta features"
      ],
      icon: <Zap className="text-yellow-400" size={24} />,
      color: "from-amber-900 to-amber-700",
      border: "border-amber-500/20"
    },
    {
      id: 3,
      name: "Premium Support",
      price: 20,
      features: [
        "Everything in Standard",
        "Your name in our credits",
        "Monthly development updates",
        "Vote on feature priorities"
      ],
      icon: <Star className="text-purple-400" size={24} />,
      color: "from-purple-900 to-purple-700",
      border: "border-purple-500/20"
    },
    {
      id: 4,
      name: "PRO MAX Support",
      price: 50,
      features: [
        "Everything in Premium",
        "Exclusive Discord role",
        "1:1 monthly Q&A session",
        "Custom thank you video",
        "Your suggestions get top priority"
      ],
      icon: <Crown className="text-blue-400" size={24} />,
      color: "from-blue-900 to-blue-700",
      border: "border-blue-500/20"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitSuccess(true);
    setMessage('');
    setSelectedTier(null);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Premium Padding */}
        <header className="text-center mb-16 px-6 py-8 bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            Support Drixe Studio
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Fuel our creative engine! Choose your support tier and join our journey.
          </p>
        </header>

        {submitSuccess ? (
          <div className="text-center bg-gray-800/80 text-gray-100 p-8 rounded-2xl max-w-2xl mx-auto border border-emerald-500/30 backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Check className="text-emerald-400" size={48} />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">Legendary Support!</h2>
            <p className="mb-6 text-gray-300">You're officially awesome. Expect magic soon.</p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/10"
            >
              Support Again
            </button>
          </div>
        ) : (
          <>
            {/* Mobile-Optimized Tier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {supportTiers.map((tier) => (
                <div 
                  key={tier.id}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${selectedTier === tier.id ? 
                    'ring-2 ring-offset-2 ring-indigo-500 scale-[1.02] shadow-lg' : 
                    'hover:shadow-xl hover:-translate-y-1'} 
                    border ${tier.border} bg-gray-800/50 backdrop-blur-sm`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-20`} />
                  <div className="relative p-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{tier.name}</h2>
                    <div className="p-2 rounded-full bg-gray-700/50 backdrop-blur-sm">
                      {tier.icon}
                    </div>
                  </div>
                  <div className="relative p-6 pt-0">
                    <div className="text-3xl font-bold mb-4 text-white">
                      ${tier.price}
                      <span className="text-sm font-normal text-gray-400 ml-1">/one-time</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="text-emerald-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setSelectedTier(tier.id)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                        selectedTier === tier.id ? 
                        'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20' : 
                        'bg-gray-700/70 text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      {selectedTier === tier.id ? 'Selected' : 'Select Tier'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedTier && (
              <div className="max-w-2xl mx-auto bg-gray-800/80 rounded-2xl border border-gray-700/50 overflow-hidden p-8 backdrop-blur-sm shadow-2xl shadow-purple-500/10">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${supportTiers.find(t => t.id === selectedTier).color} mr-4`}>
                    {supportTiers.find(t => t.id === selectedTier).icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {supportTiers.find(t => t.id === selectedTier).name}
                    </h2>
                    <p className="text-gray-400">Your support means everything</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-3">
                      SPECIAL MESSAGE (OPTIONAL)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-gray-500" size={18} />
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-600"
                        placeholder="'Your work inspires me!' or 'Would love to see more...'"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-2xl font-bold text-white">
                      ${supportTiers.find(t => t.id === selectedTier).price}
                      <span className="text-sm font-normal text-gray-400 ml-1">one-time</span>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all disabled:opacity-70 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Support <ArrowRight className="ml-3" size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-700/50 flex items-center text-sm text-gray-500">
                  <Coffee className="mr-3 text-amber-500/80" size={18} />
                  <span className="text-gray-400">Your contribution keeps our creative furnace burning bright</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}