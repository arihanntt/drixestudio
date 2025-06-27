import React, { useState, useEffect } from "react";
import "./PlanCard.css";
import { motion } from "framer-motion";

const PlanCard = ({ name, summary, details, price, currencySymbol, onOrder }) => {
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFlip = () => {
    if (isMobile) {
      setFlipped((prev) => !prev);
    }
  };

  const isUltimate = name.toLowerCase() === "ultimate";

  return (
    <motion.div
      className={`plan-card-container ${flipped ? "flipped" : ""}`}
      onMouseEnter={() => !isMobile && setFlipped(true)}
      onMouseLeave={() => !isMobile && setFlipped(false)}
      onClick={handleFlip}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={`card ${flipped ? "expanded glowing" : "collapsed"}`}>
        <div className="card-inner">
          {/* Front */}
          <div className="card-face card-front">
            {isUltimate && (
              <motion.div
                className="popular-badge"
                initial={{ scale: 0, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              >
                ⭐ Most Popular
              </motion.div>
            )}
            <h3 className="text-xl font-semibold mb-2">{name} Plan</h3>
            <p className="text-gray-300 mb-3">{summary}</p>
            <div className="text-2xl font-bold mb-4">
              {currencySymbol}
              {price}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent card flip
                onOrder();
              }}
              className="order-btn"
            >
              Order Now
            </button>
            <div className="flip-tip">Flip for more details</div>
          </div>

          {/* Back */}
          <div className="card-face card-back">
            <h4 className="text-lg font-semibold mb-2">What’s Included</h4>
            <ul className="list-disc list-inside text-sm text-gray-300 mb-4">
              {details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent card flip
                onOrder();
              }}
              className="order-btn"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanCard;
