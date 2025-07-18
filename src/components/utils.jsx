// utils.js — Updated with getBestMatchFAQ()

export const getSuggestions = (input, faqs) => {
  if (!input.trim()) return [];
  const lowerInput = input.toLowerCase();
  return faqs
    .filter((faq) => faq.question.toLowerCase().includes(lowerInput))
    .slice(0, 5);
};

export const parseLinks = (text) => {
  const urlRegex = /((https?:\/\/)?[\w-]+(\.[\w-]+)+(\/[\w-./?%&=]*)?)/gi;
  return text.replace(urlRegex, (match) => {
    const href = match.startsWith("http") ? match : `https://${match}`;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="underline text-indigo-400 hover:text-indigo-300">${match}</a>`;
  });
};

export const getSmartDelay = (text) => {
  const base = 300;
  const length = text?.length || 0;
  return Math.min(2000, base + length * 25);
};

export const rewordQuestion = (input) => {
  const vagueTerms = ["help", "info", "what", "how", "why", "details"];
  const trimmed = input.trim().toLowerCase();
  for (const vague of vagueTerms) {
    if (trimmed === vague || trimmed.startsWith(`${vague} `)) {
      return `Can you explain more about ${input}?`;
    }
  }
  return input;
};

export const allTips = [
  "💡 Tip: Type 'contact' to reach our team directly.",
  "💡 Tip: Use keywords like 'music', 'roles', or 'setup' to explore features.",
  "💡 Tip: Ask about plans like Basic or Pro to learn what's included."
];

export const updateContextMemory = (context, newMessage) => {
  const updated = [...context, newMessage];
  return updated.slice(-3);
};

export const getLocalizedGreeting = () => {
  const hour = new Date().getHours();
  const lang = navigator.language;
  const locale = lang.startsWith("fr")
    ? ["Bonjour ☀️", "Bon après-midi ☀️", "Bonsoir 🌙"]
    : ["Good morning 🌅", "Good afternoon ☀️", "Good evening 🌙"];

  if (hour < 12) return locale[0];
  if (hour < 18) return locale[1];
  return locale[2];
};

export const getFollowUps = (faq, faqs) => {
  if (!faq || !faq.keywords) return [];
  const keywords = new Set(faq.keywords.map((k) => k.toLowerCase()));
  return faqs
    .filter(
      (f) =>
        f !== faq &&
        f.keywords?.some((k) => keywords.has(k.toLowerCase()))
    )
    .slice(0, 3)
    .map((f) => f.question);
};

// ✅ New: Get best matching FAQ
export const getBestMatchFAQ = (input, faqs) => {
  const cleaned = input.toLowerCase();
  return (
    faqs.find((f) => f.question.toLowerCase().includes(cleaned)) ||
    faqs.find((f) => cleaned.includes(f.question.toLowerCase()))
  );
};
