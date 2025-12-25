// 📦 Discord Plan Data (Revamped & Repositioned)

export const plans = [
  {
    name: "Basic",
    price: 4500, // ↑ from 3000
    summary:
      "Essential Discord server setup with automation, roles, and core engagement systems — ideal for new communities.",
    details: [
      "Custom channels (Text & Voice)",
      "Invite tracking system",
      "Automated welcome & role system",
      "Essential bots (Moderation, Music, Auto-messages)",
      "Boosting & announcement system",
      "Giveaway & polling system",
      "Basic security configuration",
      "Delivery: 1 day",
    ],
  },
  {
    name: "Standard",
    price: 8000, // ↑ from 6000
    summary:
      "Structured Discord server designed for growing communities with verification, branding, and engagement tools.",
    details: [
      "Everything in Basic plan",
      "Professional server layout & design",
      "Verification system",
      "Basic logging system",
      "Moderate security configuration",
      "3–5 bots (Moderation, Games, Reaction Roles, Auto-moderation)",
      "Static & animated emojis",
      "Level system",
      "Delivery: 1–2 days",
    ],
  },
  {
    name: "Pro",
    price: 11500, // ↑ from 9000
    summary:
      "Advanced Discord system with branding, AI features, support tools, and strong security — built for creators and teams.",
    details: [
      "Everything in Standard plan",
      "Support system (Ticket setup)",
      "Complete branding package (icons, banners)",
      "Anti-raid & spam protection",
      "Advanced security configuration",
      "Advanced logging system",
      "AI-powered chat engagement system",
      "Post-delivery technical support",
      "Delivery: 2–3 days",
    ],
  },
  {
    name: "Ultimate",
    price: 13500, // ↑ from 9700
    popular: true,
    summary:
      "Highly automated Discord server with advanced AI, dynamic channels, and deep customization.",
    details: [
      "Everything in Pro plan",
      "Unlimited channels & full automation",
      "Advanced AI (auto-responses & engagement)",
      "Temporary voice & text channels",
      "Delivery: 2–3 days",
    ],
  },
  {
    name: "Empire",
    price: 15000, // HARD CAP (≤ 15k)
    summary:
      "Enterprise-grade Discord ecosystem with onboarding flows, rank systems, automation, and extended support.",
    details: [
      "Everything in Ultimate plan",
      "Server backup (excluding bots & messages)",
      "Custom onboarding flow (intro & start-here channels)",
      "Automated DMs with server guide",
      "Rank-naming theme (e.g. Novice → OG → Legend)",
      "Auto-perks for high-level members",
      "Dedicated 20-day priority support",
      "Delivery: 3–4 days",
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
