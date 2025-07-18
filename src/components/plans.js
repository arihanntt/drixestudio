// 📦 Plan Data
export const plans = [
  {
    name: "Basic",
    price: 3000,
    summary:
      "Starter Discord server setup with essential bots, custom roles, and auto systems — great for beginners.",
    details: [
      "Custom channels (Text & Voice)",
      "Invite Tracking System",
      "Automated welcome & role system",
      "Essential bots (Moderation, Music, & Auto-messages)",
      "Boosting & announcement system",
      "Giveaway & Polling System",
      "Basic security setup",
      "Delivery: 1 day",
    ],
  },
  {
    name: "Standard",
    price: 6000,
    summary:
      "Designed for growing Discord communities — custom server layout, verification, emojis, and user engagement tools.",
    details: [
      "Everything in Basic plan",
      "Epic Server Design",
      "Verification System",
      "Basic logging system",
      "Moderate security",
      "3-5 bots (Moderation, Games, Reaction Roles, Auto-moderation)",
      "Static & Animated Emojis",
      "Level System",
      "Delivery: 1–2 days",
    ],
  },
  {
    name: "Pro",
    price: 9000,
    summary:
      "Advanced Discord server setup with branding, AI features, and monetization tools for creators and teams.",
    details: [
      "Everything in Standard plan",
      "Support System i.e. Ticket",
      "Full branding package (icons, banners)",
      "Anti-Raid & Spam protection",
      "Advanced security system",
      "Advanced logging system",
      "AI-powered chat engagement system",
      "After Delivery Technical Support",
      "Delivery: 2–3 days",
    ],
  },
  {
    name: "Ultimate",
    price: 9700,
    popular: true,
    summary:
      "Fully automated Discord server setup with advanced AI, temporary channels, and unlimited customization.",
    details: [
      "Everything in Pro Plan",
      "Unlimited channels & full automation",
      "Advanced AI (Auto-response)",
      "Temporary voice and Text Channel's",
      "Delivery: 2–3 days",
    ],
  },
  {
    name: "Empire",
    price: 10000,
    summary:
      "Enterprise-level Discord setup with onboarding flow, advanced ranks, DM automation, and pro-level moderation.",
    details: [
      "Everything in Ultimate Plan",
      "Server backup without Bots and messages",
      "Onboarding Flow Design (Intro channel, start-here)",
      "Auto-DM with server guide",
      "Rank-naming theme (e.g. “Novice” → “OG” → “Legend”)",
      "Auto-perks for high-level users (access to secret VC, etc.)",
      "Dedicated 20-day support",
      "Delivery: 3-4 days",
    ],
  },
];

export function getCurrencySymbol(currency = "INR") {
  switch (currency) {
    case "INR":
      return "₹";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return "";
  }
}

export default plans;
