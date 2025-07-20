'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Lottie from 'lottie-react';
import confetti from 'canvas-confetti';
import successAnim from '@/components/successAnim.json';
import {
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  User,
  Send,
  Sparkles,
  ShieldCheck,
  Bot,
  Smartphone,
  X,
  ChevronDown,
} from 'lucide-react';
import axios from 'axios';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Event listener for resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
};

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [showMethodOptions, setShowMethodOptions] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    method: 'Telegram',
    contact: '',
    reason: '',
  });

  const isMobile = useIsMobile();
  const controls = useAnimation();
  const formRef = useRef(null);
  const methodOptionsRef = useRef(null);

  // Handle click outside method options
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (methodOptionsRef.current && !methodOptionsRef.current.contains(event.target)) {
        setShowMethodOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      zIndex: 9999,
      colors: ['#7289da', '#ffffff', '#a0c4ff', '#43b581', '#faa61a'],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMethodChange = (method) => {
    setFormData((prev) => ({
      ...prev,
      method,
      contact: '',
    }));
    setShowMethodOptions(false);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading || submitted) return;

  // Method-specific validation
  if (formData.method === 'Email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact)) {
    await controls.start({ x: [0, -10, 10, -10, 10, 0] });
    return;
  }

  if (formData.method === 'Discord' && !formData.contact.includes('#')) {
    await controls.start({ x: [0, -10, 10, -10, 10, 0] });
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post('/api/contact', {
      name: formData.name,
      contactMethod: formData.method,
      contactInfo: formData.contact,
      message: formData.reason
    });

    if (response.data.success) {
      // Success handling (confetti, etc.)
      new Audio('/success.mp3').play().catch(() => {});
      await controls.start({ scale: [1, 1.05, 1] });
      fireConfetti();
      setSubmitted(true);
      setShowSuccessBox(true);
      
      setTimeout(() => {
        setShowSuccessBox(false);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            method: 'Telegram',
            contact: '',
            reason: '',
          });
        }, 500);
      }, 3500);
    }
  } catch (error) {
    console.error('Error:', error.response?.data);
    // Error handling
  } finally {
    setLoading(false);
  }
};

  const getContactPlaceholder = () => {
    switch (formData.method) {
      case 'Email':
        return 'you@example.com';
      case 'Discord':
        return 'username#1234';
      case 'Phone':
        return '+1 (555) 123-4567';
      default:
        return '@telegram_handle';
    }
  };

  const MethodIcon = () => {
    switch (formData.method) {
      case 'Email':
        return <Mail size={16} className="text-blurple" />;
      case 'Discord':
        return <MessageSquare size={16} className="text-indigo-400" />;
      case 'Phone':
        return <Smartphone size={16} className="text-green-400" />;
      default:
        return <Send size={16} className="text-blue-400" />;
    }
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-gradient-to-br from-[#0c0c10] via-[#10131c] to-[#0c0c10] text-white px-4 sm:px-6 py-20 md:py-32 relative scroll-mt-20"
      animate={controls}
      ref={formRef}
    >
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-[10%] w-72 h-72 bg-blurple/20 blur-[120px] rounded-full opacity-40"
          animate={{
            y: [0, 20, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-[5%] w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full opacity-20"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 w-full"
        >
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blurple to-white bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Let's Connect
            </motion.h1>
            <motion.p
              className="text-gray-400 text-sm md:text-base mt-3 mb-6 max-w-md mx-auto md:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Reach out for partnerships, server setup, bot development, or anything else.
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <InputField
              label="Your Name"
              icon={<User size={18} className="text-gray-400" />}
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setActiveField('name')}
              onBlur={() => setActiveField(null)}
              placeholder="e.g. Alex Johnson"
              required
              isActive={activeField === 'name'}
            />

            <div className="relative" ref={methodOptionsRef}>
              <label className="text-sm text-gray-300">Preferred Contact Method</label>
              <button
                type="button"
                onClick={() => setShowMethodOptions(!showMethodOptions)}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-black border border-gray-700 text-white text-sm focus:outline-none flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <MethodIcon />
                  <span>{formData.method}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showMethodOptions ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {showMethodOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 mt-1 w-full bg-[#0c0c10] border border-gray-700 rounded-xl overflow-hidden shadow-lg"
                  >
                    {['Telegram', 'Discord', 'Email', 'Phone'].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleMethodChange(option)}
                        className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-800 transition-colors ${
                          formData.method === option ? 'bg-blurple/10' : ''
                        }`}
                      >
                        {option === 'Email' && <Mail size={16} className="text-blurple" />}
                        {option === 'Discord' && <MessageSquare size={16} className="text-indigo-400" />}
                        {option === 'Phone' && <Smartphone size={16} className="text-green-400" />}
                        {option === 'Telegram' && <Send size={16} className="text-blue-400" />}
                        <span>{option}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <InputField
              label="Your Contact"
              icon={<MethodIcon />}
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              onFocus={() => setActiveField('contact')}
              onBlur={() => setActiveField(null)}
              placeholder={getContactPlaceholder()}
              required
              isActive={activeField === 'contact'}
              type={formData.method === 'Phone' ? 'tel' : 'text'}
            />

            <InputField
              label="Reason for Contact"
              icon={<MessageSquare size={18} className="text-gray-400" />}
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              onFocus={() => setActiveField('reason')}
              onBlur={() => setActiveField(null)}
              placeholder="e.g. Partnership, Support, Custom Bot Development..."
              required
              isActive={activeField === 'reason'}
              textarea
              rows={3}
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={loading || submitted}
              className={`w-full py-4 font-semibold flex items-center justify-center gap-2 rounded-xl transition-all duration-300 relative overflow-hidden ${
                loading
                  ? 'bg-gray-700 cursor-not-allowed'
                  : submitted
                  ? 'bg-green-600/20 border border-green-400/30'
                  : 'bg-gradient-to-r from-blurple to-indigo-600 hover:shadow-lg hover:shadow-blurple/30'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Sending...</span>
                </>
              ) : submitted ? (
                <>
                  <CheckCircle size={20} />
                  <span>Sent Successfully!</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Request</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="space-y-8 hidden md:block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InfoBlock
            icon={<Sparkles className="text-blurple" />}
            title="Premium Services"
            desc="Custom Discord server design, optimization, and management for all your needs."
            delay={0.3}
          />
          <InfoBlock
            icon={<ShieldCheck className="text-green-400" />}
            title="Enterprise Security"
            desc="Advanced protection against raids, spam, and unauthorized access."
            delay={0.4}
          />
          <InfoBlock
            icon={<Bot className="text-yellow-300" />}
            title="AI-Powered Bots"
            desc="Custom bots with machine learning capabilities for your unique requirements."
            delay={0.5}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-6 bg-gradient-to-br from-black/40 to-gray-900/30 border border-gray-700/50 rounded-2xl backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="bg-blurple/10 p-2 rounded-lg">
                <MessageSquare size={18} className="text-blurple" />
              </span>
              Quick Support
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Need immediate assistance? Our team is available 24/7 for urgent requests.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gray-400" />
                <span>hello@drixestudio.services</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Smartphone size={16} className="text-gray-400" />
                <span>+91 7889386542</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-6 right-6 md:hidden z-40"
        >
          <button
            onClick={() => (window.location.href = 'tel:+15551234567')}
            className="p-4 bg-blurple rounded-full shadow-lg hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            <Smartphone size={24} />
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {showSuccessBox && (
          <motion.div
            key="success-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#111] text-white p-6 rounded-2xl shadow-xl border border-blurple/40 flex flex-col items-center max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <button
                onClick={() => setShowSuccessBox(false)}
                className="self-end p-1 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X size={18} />
              </button>

              <Lottie animationData={successAnim} loop={false} className="w-24 h-24" />

              <motion.h3
                className="mt-3 text-center text-white text-lg font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <CheckCircle className="inline mr-2 text-green-400" size={20} />
                Message sent successfully!
              </motion.h3>

              <motion.p
                className="text-center text-gray-400 text-sm mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                We'll get back to you within 24 hours. Check your {formData.method.toLowerCase()} for updates.
              </motion.p>

              <motion.button
                onClick={() => setShowSuccessBox(false)}
                className="mt-6 px-6 py-2 bg-blurple/10 hover:bg-blurple/20 border border-blurple/40 rounded-lg text-sm transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InputField = ({ label, icon, textarea = false, isActive = false, ...props }) => {
  return (
    <motion.div
      animate={{
        borderColor: isActive ? 'rgba(114, 137, 218, 0.5)' : 'rgba(55, 65, 81, 0.7)',
      }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className={`flex items-center mt-1 px-4 py-3 rounded-xl bg-black border ${
          isActive ? 'border-blurple/50' : 'border-gray-700'
        } text-white text-sm focus-within:ring-2 focus-within:ring-blurple/50`}
      >
        <span
          className={`mr-3 transition-colors ${isActive ? 'text-blurple' : 'text-gray-400'}`}
        >
          {icon}
        </span>

        {textarea ? (
          <textarea
            {...props}
            className="bg-transparent outline-none w-full text-sm placeholder-gray-500 resize-none"
          />
        ) : (
          <input
            {...props}
            className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
          />
        )}
      </div>
    </motion.div>
  );
};

const InfoBlock = ({ icon, title, desc, delay = 0 }) => (
  <motion.div
    className="flex gap-4 items-start"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <div className="p-3 rounded-xl bg-white/5 border border-white/10">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{desc}</p>
    </div>
  </motion.div>
);

export default ContactPage;