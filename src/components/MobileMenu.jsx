'use client';

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

const MobileMenu = ({ setMobileOpen, activeLink, navLinks }) => {
  const router = useRouter();
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    exit: { opacity: 0, y: -10 }
  };

  const handleNavigation = (path) => {
    if (pathname !== path) {
      router.push(path);
    }
    setMobileOpen(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="mobileMenu"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 left-0 w-full z-50 md:hidden h-screen"
      >
        {/* Backdrop that closes menu when clicked */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative w-full h-full bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl overflow-y-auto">
          {/* Close Button - Fixed in top left corner */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 left-4 z-50 p-2 text-white text-2xl"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          
          {/* Logo - Centered at top */}
          <div className="pt-16 pb-4 flex justify-center">
            <div 
              onClick={() => {
                router.push("/");
                setMobileOpen(false);
              }}
              className="text-xl font-extrabold tracking-wider text-white cursor-pointer"
            >
              DRIXE STUDIO
            </div>
          </div>

          {/* Menu Items */}
          <motion.ul 
            variants={containerVariants}
            className="space-y-2 px-6 py-6"
          >
            {navLinks.map(({ label, path, icon, color }, i) => (
              <motion.li
                key={label}
                custom={i}
                variants={itemVariants}
                onClick={() => handleNavigation(path)}
                className={`relative overflow-hidden rounded-xl ${
                  activeLink === path.slice(1)
                    ? "bg-white/5"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center px-4 py-4 cursor-pointer">
                  <span className="text-xl mr-3">{icon}</span>
                  <span className="font-medium text-white">{label}</span>
                  
                  {activeLink === path.slice(1) && (
                    <motion.div
                      layoutId="mobileActiveIndicator"
                      className="absolute inset-0 -z-10 bg-gradient-to-r opacity-20"
                      style={{ background: `linear-gradient(to right, ${color.replace('from-', '').replace('to-', '').replace(' ', ', ')})` }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="ml-auto w-2 h-2 rounded-full"
                    style={{ 
                      background: `linear-gradient(to right, ${color.replace('from-', '').replace('to-', '').replace(' ', ', ')})`,
                      opacity: activeLink === path.slice(1) ? 1 : 0.5
                    }}
                  />
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div 
            variants={itemVariants}
            custom={navLinks.length + 1}
            className="mt-6 pt-4 border-t border-white/5 text-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-400 hover:text-white transition px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/20"
            >
              Close Menu
            </button>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            custom={navLinks.length + 2}
            className="mt-6 text-xs text-center text-gray-500"
          >
            Drixe Studio © {new Date().getFullYear()}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;