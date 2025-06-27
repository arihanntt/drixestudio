import React from "react";

const MobileMenu = ({ setMobileOpen, onContactClick, currency, setCurrency }) => {
  const currencies = ["INR", "USD", "EUR", "GBP", "AED", "CAD"];

  return (
    <div className="fixed top-0 right-0 w-64 h-full bg-[#111] text-white z-[100] shadow-lg animate-slide-in px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Menu</h2>
        <button onClick={() => setMobileOpen(false)} className="text-sm text-gray-400 hover:text-white">Close</button>
      </div>
      <ul className="space-y-4">
        <li onClick={() => {
          window.scrollTo({ top: document.getElementById("plans").offsetTop - 80, behavior: "smooth" });
          setMobileOpen(false);
        }} className="cursor-pointer hover:text-blurple">Plans</li>
        <li onClick={() => {
          onContactClick();
          setMobileOpen(false);
        }} className="cursor-pointer hover:text-blurple">Contact</li>
        <li>
          <select
            className="w-full bg-[#1e1e1e] border border-gray-700 rounded p-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
