import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import MobileMenu from "./MobileMenu";

const Navbar = ({ currency, setCurrency, onContactClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currencies = ["INR", "USD", "EUR", "GBP", "AED", "CAD"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#111] border-b border-gray-800 px-6 py-3 flex items-center justify-between text-white">
      <h1 className="text-xl font-bold">Drixe Studio</h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6 ml-auto">
        <button
          onClick={() =>
            window.scrollTo({
              top: document.getElementById("plans").offsetTop - 80,
              behavior: "smooth",
            })
          }
          className="group relative text-sm font-medium hover:text-blurple transition"
        >
          <span className="relative z-10">Plans</span>
          <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blurple group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out shadow-md shadow-blurple"></span>
        </button>

        <button
          onClick={onContactClick}
          className="group relative text-sm font-medium hover:text-blurple transition"
        >
          <span className="relative z-10">Contact</span>
          <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blurple group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out shadow-md shadow-blurple"></span>
        </button>

        <select
          className="bg-[#1e1e1e] border border-gray-700 rounded p-1 text-sm"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-white text-xl"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <FaBars />
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <MobileMenu
          setMobileOpen={setMobileOpen}
          onContactClick={onContactClick}
          currency={currency}
          setCurrency={setCurrency}
        />
      )}
    </nav>
  );
};

export default Navbar;
