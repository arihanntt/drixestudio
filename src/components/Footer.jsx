const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-8 border-t border-neutral-800 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-lg font-semibold text-center md:text-left tracking-wide">
          Drixe Studio © {new Date().getFullYear()}
        </h2>

        {/* Contact Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="https://discord.com/users/928934131893686292"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 inline-flex items-center px-5 py-2.5 rounded-full border border-blurple text-blurple font-semibold hover:bg-blurple hover:text-black shadow-md"
          >
            💬 Discord
          </a>
          <a
            href="https://t.me/darkxkid"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 inline-flex items-center px-5 py-2.5 rounded-full border border-teal-400 text-teal-400 font-semibold hover:bg-teal-400 hover:text-black shadow-md"
          >
            📱 Telegram
          </a>
          <a
            href="mailto:drixebusiness@gmail.com"
            className="transition-all duration-300 inline-flex items-center px-5 py-2.5 rounded-full border border-rose-400 text-rose-400 font-semibold hover:bg-rose-400 hover:text-black shadow-md"
          >
            📧 Email
          </a>
        </div>
      </div>

      {/* ➤ Navigation Links */}
      <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400 flex-wrap">
        <a href="#plans" className="footer-link hover:text-white">Plans</a>
        <a href="#faq" className="footer-link hover:text-white">FAQ</a>
        
      </div>

      {/* ➤ Signature */}
      <div className="text-sm text-center text-gray-400 mt-6">
        Made with 💜 by <span className="text-white">Drixe Studio</span> · Helping creators grow since 2019
      </div>
    </footer>
  );
};

export default Footer;
