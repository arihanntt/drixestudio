"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, Check, Heart, Zap, Star, Crown, Gift, MessageSquare, Coffee } from 'lucide-react';
import Script from 'next/script';

export default function SupportPage() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [conversionRates, setConversionRates] = useState({});
  const [userCountry, setUserCountry] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  // Supported currencies by Razorpay
  const supportedCurrencies = [
    { code: 'INR', symbol: '₹' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'AUD', symbol: 'A$' },
  ];

  // Contact methods for Standard, Premium, PRO MAX, Custom
  const contactMethods = ['Email', 'Discord', 'Telegram', 'Instagram'];

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
      border: "border-pink-500/20",
      highlight: false
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
      border: "border-amber-500/20",
      highlight: false
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
      border: "border-purple-500/20",
      highlight: true
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
      border: "border-blue-500/20",
      highlight: false
    },
    {
      id: 5,
      name: "Custom Support",
      price: null, // Dynamic price
      features: [
        "Set your own support amount",
        "Personalized thank you message",
        "All Basic Support benefits",
        "Customized recognition based on amount"
      ],
      icon: <Gift className="text-indigo-400" size={24} />,
      color: "from-indigo-900 to-purple-900",
      border: "border-indigo-500/20",
      highlight: false
    }
  ];

  // Fetch conversion rates and user's country
  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_code);
        const countryCurrencyMap = {
          'IN': 'INR',
          'US': 'USD',
          'GB': 'GBP',
          'EU': 'EUR',
          'AU': 'AUD'
        };
        const preferredCurrency = countryCurrencyMap[data.country_code] || 'USD';
        setCurrency(preferredCurrency);
      } catch (error) {
        console.error('Error fetching user country:', error);
        setCurrency('USD');
      }
    };

    const fetchConversionRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setConversionRates(data.rates);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };

    fetchUserCountry();
    fetchConversionRates();
  }, []);

  const convertPrice = (usdPrice) => {
    if (!usdPrice || !conversionRates[currency] || currency === 'USD') return usdPrice || 0;
    return Math.round(usdPrice * conversionRates[currency] * 100) / 100;
  };

  const getMinMaxAmounts = () => {
    const minUSD = 40;
    const maxUSD = 500;
    if (currency === 'USD') return { min: minUSD, max: maxUSD };
    return {
      min: Math.round(minUSD * conversionRates[currency] * 100) / 100,
      max: Math.round(maxUSD * conversionRates[currency] * 100) / 100
    };
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty input or any numeric input for flexibility during typing
    if (value === '' || !isNaN(value)) {
      setCustomAmount(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let amount;
      let description;
      let planName;

      if (selectedTier === 5 && customAmount) {
        const { min, max } = getMinMaxAmounts();
        const numericAmount = Number(customAmount);
        if (isNaN(numericAmount) || numericAmount < min || numericAmount > max) {
          alert(`Please enter an amount between ${supportedCurrencies.find(c => c.code === currency)?.symbol}${min} and ${supportedCurrencies.find(c => c.code === currency)?.symbol}${max}.`);
          setIsSubmitting(false);
          return;
        }
        amount = Math.round(numericAmount * 100); // Convert to smallest currency unit
        description = `Custom support amount of ${supportedCurrencies.find(c => c.code === currency)?.symbol}${numericAmount}`;
        planName = 'Custom';
      } else {
        const selectedTierData = supportTiers.find(t => t.id === selectedTier);
        amount = convertPrice(selectedTierData.price) * 100;
        description = `Support for ${selectedTierData.name}`;
        planName = selectedTierData.name;
      }

      // Validate contact details for Standard, Premium, PRO MAX, Custom
      if (selectedTier && selectedTier !== 1 && (!contactMethod || !contactDetails)) {
        alert('Please select a contact method and provide contact details.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency }),
      });

      if (!response.ok) throw new Error('Failed to create order');

      const { orderId } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'Drixe Studio',
        description,
        order_id: orderId,
        handler: async function (response) {
          const verifyResponse = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              planName,
              amount,
              currency,
              message,
              contactMethod: selectedTier === 1 ? null : contactMethod,
              contactDetails: selectedTier === 1 ? null : contactDetails,
            }),
          });

          const verifyResult = await verifyResponse.json();
          if (verifyResult.isOk) {
            setSubmitSuccess(true);
            setMessage('');
            setSelectedTier(null);
            setCustomAmount('');
            setContactMethod('');
            setContactDetails('');
          } else {
            alert('Payment verification failed: ' + verifyResult.message);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#6366f1',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        alert('Payment failed: ' + response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred during payment processing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        
        <header className="text-center mb-20 px-8 py-12 bg-gradient-to-br from-gray-800/50 to-gray-900/70 rounded-3xl border border-gray-700/30 backdrop-blur-md shadow-2xl shadow-purple-500/10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-500 mb-6 leading-tight">
              Fuel Our Creative Journey
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your support helps us build amazing things. Choose a tier or set your own amount.
            </p>
            <div className="flex justify-center">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                {supportedCurrencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {submitSuccess ? (
          <div className="text-center bg-gradient-to-br from-gray-800/80 to-gray-900/90 text-gray-100 p-12 rounded-3xl max-w-2xl mx-auto border border-emerald-500/30 backdrop-blur-lg shadow-xl shadow-emerald-500/10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                <Check className="text-emerald-400" size={48} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Thank You for Your Support!</h2>
            <p className="mb-8 text-gray-300 text-lg">You're officially part of what makes Drixe Studio special. We appreciate you!</p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20 font-medium text-lg"
            >
              Support Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
              {supportTiers.map((tier) => (
                <div 
                  key={tier.id}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${selectedTier === tier.id ? 
                    'ring-4 ring-offset-2 ring-indigo-500/80 scale-[1.02] shadow-xl' : 
                    'hover:shadow-lg hover:-translate-y-2'} 
                    border ${tier.border} bg-gradient-to-b from-gray-800/50 to-gray-900/70 backdrop-blur-sm
                    ${tier.highlight ? 'border-2 border-yellow-400/30 shadow-lg shadow-yellow-500/10' : ''}`}
                >
                  {tier.highlight && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                      POPULAR
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-10`} />
                  <div className="relative p-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">{tier.name}</h2>
                    <div className="p-3 rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/30">
                      {tier.icon}
                    </div>
                  </div>
                  <div className="relative px-8 pb-8 pt-0">
                    <div className="text-4xl font-bold mb-6 text-white">
                      {tier.price ? (
                        <>
                          {supportedCurrencies.find(c => c.code === currency)?.symbol}
                          {convertPrice(tier.price)}
                          <span className="text-base font-normal text-gray-400 ml-1">/one-time</span>
                        </>
                      ) : (
                        <span className="text-base font-normal text-gray-300">Set Your Amount</span>
                      )}
                    </div>
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="text-emerald-400 mr-3 mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setSelectedTier(tier.id)}
                      className={`w-full py-4 px-6 rounded-xl font-medium transition-all ${
                        selectedTier === tier.id ? 
                        'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20' : 
                        'bg-gray-700/70 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600/30'
                      }`}
                    >
                      {selectedTier === tier.id ? 'Selected' : 'Select Tier'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedTier && (
              <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-3xl border border-gray-700/50 overflow-hidden p-10 backdrop-blur-lg shadow-2xl shadow-purple-500/10">
                <div className="flex items-center mb-8">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${supportTiers.find(t => t.id === selectedTier).color} mr-6`}>
                    {supportTiers.find(t => t.id === selectedTier).icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {supportTiers.find(t => t.id === selectedTier).name}
                    </h2>
                    <p className="text-gray-400">
                      {selectedTier === 5 ? 'Set your own support amount' : 'Your support means everything to us'}
                    </p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {selectedTier === 5 && (
                    <div className="mb-8">
                      <label htmlFor="customAmount" className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                        Enter Your Amount ({currency})
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-lg">
                          {supportedCurrencies.find(c => c.code === currency)?.symbol}
                        </span>
                        <input
                          type="number"
                          id="customAmount"
                          min={getMinMaxAmounts().min}
                          max={getMinMaxAmounts().max}
                          step="0.01"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="w-full pl-12 pr-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-600 text-lg"
                          placeholder={getMinMaxAmounts().min}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                          ({getMinMaxAmounts().min}-{getMinMaxAmounts().max})
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedTier !== 1 && (
                    <div className="mb-8">
                      <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                        Select Contact Method
                      </label>
                      <select
                        id="contactMethod"
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 mb-4"
                        required
                      >
                        <option value="">Select a contact method</option>
                        {contactMethods.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="contactDetails" className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                        Enter Contact Details
                      </label>
                      <input
                        type="text"
                        id="contactDetails"
                        value={contactDetails}
                        onChange={(e) => setContactDetails(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-600"
                        placeholder={contactMethod === 'Email' ? 'your.email@example.com' : 
                                     contactMethod === 'Discord' ? 'YourDiscord#1234' : 
                                     contactMethod === 'Telegram' ? '@YourTelegram' : 
                                     contactMethod === 'Instagram' ? '@YourInstagram' : 'Enter your contact details'}
                        required
                      />
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                      Special Message (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-gray-500" size={20} />
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full pl-12 pr-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-600"
                        placeholder="'Your work inspires me!' or 'Would love to see more...'"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="text-3xl font-bold text-white">
                      {supportedCurrencies.find(c => c.code === currency)?.symbol}
                      {selectedTier === 5 ? 
                        (customAmount ? Number(customAmount).toFixed(2) : getMinMaxAmounts().min) : 
                        convertPrice(supportTiers.find(t => t.id === selectedTier).price)
                      }
                      <span className="text-base font-normal text-gray-400 ml-2">one-time</span>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || (selectedTier === 5 && (!customAmount || isNaN(customAmount)))}
                      className="w-full sm:w-auto flex-1 flex items-center justify-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all disabled:opacity-70 shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 text-lg"
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
                          Complete Support <ArrowRight className="ml-4" size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="mt-10 pt-8 border-t border-gray-700/50 flex items-center text-sm text-gray-500">
                  <Coffee className="mr-4 text-amber-500/80" size={20} />
                  <span className="text-gray-400 text-lg">
                    Your contribution keeps our creative furnace burning bright. Thank you for being part of our journey!
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}