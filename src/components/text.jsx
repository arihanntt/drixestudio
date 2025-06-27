// Updated: src/components/text.js

const FAQS = [
  {
    question: "Can I request a custom bot?",
    answer: "Absolutely! We build custom Discord bots tailored to your needs.",
    keywords: ["custom bot", "request bot", "build bot"]
  },
  {
    question: "Do you offer voice channel setups?",
    answer: "Yes, we can customize voice channels with permissions and limits.",
    keywords: ["voice channel", "vc setup", "vc permissions"]
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept PayPal, UPI, and most major credit/debit cards.",
    keywords: ["payment", "paypal", "upi", "cards"]
  },
  {
    question: "What is your refund policy?",
    answer: "We don't offer refunds once the Discord server is delivered, as each setup is custom-built based on your specific requirements. However, we’re committed to your satisfaction — if you need tweaks or minor changes after delivery, we’re happy to help within our support period.",
    keywords: ["refund", "return", "money back"]
  },
  {
    question: "Do you offer Discord server setups?",
    answer: "Yes! We specialize in full Discord server creation and management.",
    keywords: ["server setup", "create server", "discord management"]
  },
  // +100 more added below as examples for Discord services
  {
    question: "Can you create moderation bots?",
    answer: "Yes, we can create bots that help with moderation tasks like banning, muting, and more.",
    keywords: ["moderation", "ban", "mute", "kick"]
  },
  {
    question: "Do you offer music bots?",
    answer: "Absolutely! Our music bots support playlists, search, and various streaming features.",
    keywords: ["music bot", "songs", "play", "pause"]
  },
  {
    question: "Can I get a bot with economy system?",
    answer: "Yes, we can build bots that handle virtual currency, shops, and leaderboards.",
    keywords: ["economy", "currency", "shop", "coins"]
  },
  {
    question: "Do you help with community engagement?",
    answer: "We provide tools like leveling bots, welcome systems, and event automation to boost engagement.",
    keywords: ["engagement", "leveling", "welcome", "events"]
  },
  {
    question: "Do you create role management bots?",
    answer: "Yes, our bots can manage roles based on reactions, commands, or events.",
    keywords: ["roles", "role management", "reaction roles"]
  },
  // ... add more (total 100+) in real project


  // ────────────── GENERAL SERVICE & PLANS ──────────────
  {
    question: "What is included in the Basic Plan?",
    answer: "Basic Plan includes up to 10 channels, leveling system, welcome roles, essential bots, and basic branding delivered in 1 day.",
    keywords: ["basic", "plan", "pricing", "start"]
  },
  {
    question: "What’s the difference between Standard and Pro plans?",
    answer: "The Pro plan includes everything in Standard plus advanced logging, AI chat, verification, branding, and SEO optimization.",
    keywords: ["standard", "pro", "difference", "compare"]
  },
  {
    question: "Do you offer lifetime updates?",
    answer: "Yes, the Ultimate Plan includes lifetime updates and premium tools.",
    keywords: ["lifetime", "updates", "support"]
  },
  {
    question: "How fast is delivery for each plan?",
    answer: "Basic: 1 day, Standard/Pro: 1–2 days, Ultimate: 2–3 days.",
    keywords: ["delivery", "days", "timeline"]
  },
  {
    question: "Are bots included in the setup?",
    answer: "Yes, all plans include moderation, welcome, and music bots. Higher plans include more advanced bots.",
    keywords: ["bots", "included", "music", "moderation"]
  },
  {
    question: "Can I customize the server after purchase?",
    answer: "Yes, you can request minor changes after delivery or upgrade for extended support.",
    keywords: ["customize", "edit", "changes"]
  },
  {
    question: "Do you offer branded emoji and icons?",
    answer: "Yes, from Standard Plan onwards.",
    keywords: ["emoji", "branding", "icons"]
  },
  {
    question: "Is there a refund policy?",
    answer: "We don't offer refunds once the Discord server is delivered, as each setup is custom-built based on your specific requirements. However, we’re committed to your satisfaction — if you need tweaks or minor changes after delivery, we’re happy to help within our support period.",
    keywords: ["refund", "return", "money"]
  },
  {
    question: "Can I request a completely custom server?",
    answer: "Absolutely! We also offer tailored setups beyond standard plans.",
    keywords: ["custom", "bespoke", "personal"]
  },
  {
    question: "Do you support payments in USD and INR?",
    answer: "Yes, we accept both and support PayPal, UPI, cards, etc.",
    keywords: ["payment", "usd", "inr", "paypal"]
  },

  // ────────────── GAMING FOCUSED ──────────────
  {
    question: "Do you create Discord servers for gaming clans?",
    answer: "Yes, we design servers tailored for clan-based, multiplayer, and esports communities.",
    keywords: ["gaming", "clans", "esports"]
  },
  {
    question: "Can I add rank-based roles for game levels?",
    answer: "Yes, our bots can automate game progression roles.",
    keywords: ["rank", "game", "level"]
  },
  {
    question: "Do you support cross-game channels and bots?",
    answer: "Yes, we can set up categories per game with relevant bots.",
    keywords: ["cross-game", "channels", "games"]
  },
  {
    question: "Can I add live stream notifications for Twitch/YouTube?",
    answer: "Yes, available from Standard Plan onwards.",
    keywords: ["stream", "twitch", "youtube", "notification"]
  },
  {
    question: "How do you handle anti-cheat or spam protection?",
    answer: "We implement verification and anti-raid tools in Pro & Ultimate plans.",
    keywords: ["anti-cheat", "spam", "raid"]
  },
  {
    question: "Can I host gaming tournaments through Discord?",
    answer: "Yes, we integrate bracket bots, announcements, and role-based access.",
    keywords: ["tournament", "bracket", "games"]
  },
  {
    question: "Do you support mobile-friendly design for gamers?",
    answer: "Yes, all layouts are optimized for phones.",
    keywords: ["mobile", "responsive", "phone"]
  },
  {
    question: "Is there a music bot included?",
    answer: "Yes, even Basic Plan comes with a music bot.",
    keywords: ["music", "audio", "song"]
  },
  {
    question: "Can I integrate Steam or game APIs?",
    answer: "On request, we can integrate those using third-party bots or custom setups.",
    keywords: ["steam", "api", "integration"]
  },
  {
    question: "Do you set up voice channels for team coordination?",
    answer: "Yes, with limits, permissions, and auto-VC options.",
    keywords: ["voice", "team", "vc", "call"]
  },

  // ────────────── CONTENT CREATORS ──────────────
  {
    question: "Do you offer notification bots for YouTube uploads?",
    answer: "Yes, using bots like YT Notifier.",
    keywords: ["youtube", "upload", "notify"]
  },
  {
    question: "Can I add a private VIP section for supporters?",
    answer: "Yes, available from Standard Plan onward.",
    keywords: ["vip", "supporters", "premium"]
  },
  {
    question: "Do you support monetization via Discord?",
    answer: "Yes, we can add paywalls, premium roles, and Ko-fi integrations.",
    keywords: ["monetization", "paywall", "donation"]
  },
  {
    question: "How do you brand the server for creators?",
    answer: "Custom banners, role colors, emojis, and channel designs to match your brand.",
    keywords: ["brand", "colors", "logo"]
  },
  {
    question: "Can you set up a feedback or comment system?",
    answer: "Yes, with ticket bots or suggestion channels.",
    keywords: ["feedback", "comment", "review"]
  },

  // ────────────── FILLER / REALISTIC QUESTIONS (more below) ──────────────
  {
    question: "Can I add NSFW channels?",
    answer: "Yes, we can set them up and restrict them to age-verified roles only.",
    keywords: ["nsfw", "restricted", "18+"]
  },
  {
    question: "Can you help me restructure an old server?",
    answer: "Yes, we can revamp or fully rebuild old servers to modern standards.",
    keywords: ["restructure", "revamp", "old"]
  },
  {
    question: "Can I schedule messages or announcements?",
    answer: "Yes, we use bots to automate timed messages and alerts.",
    keywords: ["schedule", "announcement", "timer"]
  },
  {
    question: "Can I restrict channel access by role?",
    answer: "Yes, we create permission-based access for any role.",
    keywords: ["restrict", "role", "permissions"]
  },

  {
    question: "Can I request a custom bot?",
    answer: "Absolutely! We build custom Discord bots tailored to your needs.",
    keywords: ["custom bot", "request bot", "build bot"]
  },
  {
    question: "Do you offer voice channel setups?",
    answer: "Yes, we can customize voice channels with permissions and limits.",
    keywords: ["voice channel", "vc setup", "vc permissions"]
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept PayPal, UPI, and most major credit/debit cards.",
    keywords: ["payment", "paypal", "upi", "cards"]
  },

  {
    question: "Do you offer Discord server setups?",
    answer: "Yes! We specialize in full Discord server creation and management.",
    keywords: ["server setup", "create server", "discord management"]
  },
  // +100 more added below as examples for Discord services
  {
    question: "Can you create moderation bots?",
    answer: "Yes, we can create bots that help with moderation tasks like banning, muting, and more.",
    keywords: ["moderation", "ban", "mute", "kick"]
  },
  {
    question: "Do you offer music bots?",
    answer: "Absolutely! Our music bots support playlists, search, and various streaming features.",
    keywords: ["music bot", "songs", "play", "pause"]
  },
  {
    question: "Can I get a bot with economy system?",
    answer: "Yes, we can build bots that handle virtual currency, shops, and leaderboards.",
    keywords: ["economy", "currency", "shop", "coins"]
  },
  {
    question: "Do you help with community engagement?",
    answer: "We provide tools like leveling bots, welcome systems, and event automation to boost engagement.",
    keywords: ["engagement", "leveling", "welcome", "events"]
  },
  {
    question: "Do you create role management bots?",
    answer: "Yes, our bots can manage roles based on reactions, commands, or events.",
    keywords: ["roles", "role management", "reaction roles"]
  },
  // ... add more (total 100+) in real project


];

export default FAQS;

