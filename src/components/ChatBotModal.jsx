// ✅ ChatBot.jsx — Fixed with Smart Context, Locale, and Accurate FAQ Match
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  getSuggestions,
  parseLinks,
  getSmartDelay,
  allTips,
  rewordQuestion,
  getLocalizedGreeting,
  getFollowUps,
  getBestMatchFAQ,
} from "./utils";
import FAQS from "./text";
import { Send } from "lucide-react";

const commonReplies = {
  hi: () => `${getLocalizedGreeting()}! How can I assist you today?`,
  hello: () => `${getLocalizedGreeting()}!`,
  "how are you": () => "I'm just a bot, but I'm running smoothly 😄",
  "what can you do": () => "I can help you with questions about our services, FAQs, and more.",
  "how can you help me": () => "Just type your question! I’ll try my best to assist you.",
  "who are you": () => "I’m Drixe Bot, your friendly assistant 🤖",
  "what's your name": () => "You can call me Drixe Bot 🧠",
  contact: () => ({
    type: "contact",
    content: `📞 Need support? Choose one of the contact methods below:`,
  }),
};

const ChatBot = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: `${getLocalizedGreeting()}! I’m Drixe Bot. Ask me anything about our services!\n\n${allTips.join("\n")}`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    const cleanText = text.trim().toLowerCase();
    setChat((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setSuggestions([]);
    setIsTyping(true);

    setTimeout(() => {
      let reply;
      const commonKey = Object.keys(commonReplies).find((key) => cleanText.includes(key));

      if (commonKey) {
        reply = commonReplies[commonKey]();
      } else {
        const rewritten = rewordQuestion(cleanText);
        const match = getBestMatchFAQ(rewritten, FAQS);
        reply = match
          ? { type: "text", content: `${match.question}\n\n${match.answer}` }
          : { type: "text", content: "❓ Sorry, I couldn’t find an answer." };
      }

      const followUps = getBestMatchFAQ(cleanText, FAQS);
      const nextQ = getFollowUps(followUps, FAQS);

      setChat((prev) => [
        ...prev,
        { sender: "bot", ...formatReply(reply) },
        ...(nextQ.length > 0
          ? [
              {
                sender: "bot",
                text: `🔍 You might also ask: ${nextQ.map((q) => `“${q}”`).join(", ")}`,
              },
            ]
          : []),
      ]);
      setIsTyping(false);
    }, getSmartDelay(text));
  };

  const formatReply = (reply) => {
    if (typeof reply === "string") return { text: reply };
    if (reply.type === "contact") {
      return {
        custom: (
          <div className="space-y-2">
            <p>{reply.content}</p>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="https://discord.com/users/928934131893686292"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5865F2] text-white px-4 py-2 rounded-xl text-center text-sm hover:scale-105 transition"
              >
                💬 Discord
              </a>
              <a
                href="https://t.me/darkxkid"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#3B82F6] text-white px-4 py-2 rounded-xl text-center text-sm hover:scale-105 transition"
              >
                📲 Telegram
              </a>
              <a
                href="mailto:drixebusiness@gmail.com"
                className="bg-[#EC4899] text-white px-4 py-2 rounded-xl text-center text-sm hover:scale-105 transition"
              >
                📧 Email
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Or use the <strong>Contact Form</strong> at the top of the website header.
            </p>
          </div>
        ),
      };
    }
    return { text: reply.content };
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    const match = getSuggestions(val, FAQS);
    setSuggestions(match);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 right-2 sm:right-4 w-[95%] max-w-md z-50 backdrop-blur-md bg-black/70 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#222] to-[#111] px-4 py-3 text-white font-semibold flex justify-between items-center border-b border-gray-700">
        Drixe AI Bot
        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">
          ×
        </button>
      </div>

      <div className="h-[320px] overflow-y-auto px-3 sm:px-4 py-4 space-y-3 text-sm text-white bg-transparent scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent scroll-smooth">
        {chat.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              title={new Date().toLocaleTimeString()}
              className={`px-4 py-2 rounded-2xl max-w-[90%] sm:max-w-[80%] whitespace-pre-wrap shadow-md text-sm sm:text-base ${
                msg.sender === "user"
                  ? "bg-gradient-to-tr from-indigo-600 to-blue-500"
                  : "bg-[#2a2a2a] text-white"
              }`}
            >
              {msg.custom || (
                <span
                  dangerouslySetInnerHTML={{
                    __html: parseLinks(msg.text || msg.content || ""),
                  }}
                />
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-sm italic text-gray-400"
          >
            Drixe Bot is typing...
          </motion.div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      <div className="relative px-3 sm:px-4 py-3 border-t border-gray-700 bg-black/80">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
              if (e.key === "Tab" && suggestions.length > 0) {
                e.preventDefault();
                handleSend(suggestions[0].question);
              }
            }}
            placeholder="Ask your question..."
            className="flex-1 bg-[#111] text-white px-4 py-2 rounded-xl outline-none border border-gray-700 focus:border-indigo-500 text-sm sm:text-base"
          />
          <button
            onClick={() => handleSend()}
            className="bg-blurple p-2 sm:p-2.5 rounded-xl text-white hover:scale-105 transition shadow-md"
          >
            <Send size={18} />
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute bottom-16 left-3 right-3 sm:left-4 sm:right-4 bg-[#111] border border-gray-700 rounded-xl shadow-lg z-10 text-sm text-white overflow-hidden">
            {suggestions.map((sug, idx) => {
              const start = sug.question.toLowerCase().indexOf(input.toLowerCase());
              const end = start + input.length;
              return (
                <div
                  key={idx}
                  onClick={() => handleSend(sug.question)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-800 border-b border-gray-800 last:border-none"
                >
                  {start !== -1 ? (
                    <>
                      {sug.question.substring(0, start)}
                      <span className="text-indigo-400 font-medium">
                        {sug.question.substring(start, end)}
                      </span>
                      {sug.question.substring(end)}
                    </>
                  ) : (
                    sug.question
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-gray-700 bg-[#1a1a1a] text-center">
        <a
          href="https://discord.com/users/928934131893686292"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blurple text-white px-4 py-2 rounded-full text-sm hover:scale-105 transition"
        >
          💬 Contact Us on Discord
        </a>
      </div>
    </motion.div>
  );
};

export default ChatBot;
