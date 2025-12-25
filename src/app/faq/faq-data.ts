export type FaqCategory =
  | "discord"
  | "website"
  | "social"
  | "pricing"
  | "security";

export const faqData = [
  /* ================= DISCORD ================= */
  {
    category: "discord" as FaqCategory,
    title: "Discord Server Setup",
    faqs: [
      {
        q: "What Discord services do you offer?",
        a: "We offer complete Discord server setup services including channel structure, role hierarchy, permissions, bot configuration, automation, moderation systems, security, and branding. Our setups are designed for scalability and long-term community growth."
      },
      {
        q: "Do you build Discord servers for creators and businesses?",
        a: "Yes. We build Discord servers for creators, startups, brands, gaming communities, NFT projects, and online businesses that need professional and scalable community systems."
      },
      {
        q: "How long does a Discord server setup take?",
        a: "Most Discord server setups are completed within 24–48 hours. Advanced servers with automation, security layers, and custom systems may take 2–4 days depending on requirements."
      },
      {
        q: "Can you redesign my existing Discord server?",
        a: "Yes. We can redesign and restructure your existing Discord server without deleting members, messages, or important roles while improving usability and performance."
      },
      {
        q: "Do you set up moderation and auto-mod systems?",
        a: "Yes. We configure moderation bots, spam filters, verification systems, anti-raid protection, and automated rule enforcement to keep your server secure."
      },
      {
        q: "Can you create custom roles and permissions?",
        a: "Yes. We design clean and secure role hierarchies with properly scoped permissions for admins, moderators, members, and premium roles."
      },
      {
        q: "Do you add ticket and support systems?",
        a: "Yes. We set up professional ticket systems for customer support, reports, partnerships, and moderation using reliable Discord bots."
      },
      {
        q: "Can you set up leveling and reward systems?",
        a: "Yes. We configure XP systems, level rewards, role perks, and engagement mechanics to encourage active participation."
      },
      {
        q: "Do you work with gaming and esports servers?",
        a: "Yes. We specialize in gaming communities, esports teams, and competitive servers with optimized voice, roles, and moderation systems."
      },
      {
        q: "Can you integrate Twitch, YouTube, or other platforms?",
        a: "Yes. We integrate Twitch, YouTube, and other platforms with live alerts, subscriber roles, creator notifications, and automation tools."
      }
    ]
  },

  /* ================= WEBSITE ================= */
  {
    category: "website" as FaqCategory,
    title: "Website Development",
    faqs: [
      {
        q: "What type of websites do you build?",
        a: "We build modern websites including portfolios, business websites, landing pages, SaaS websites, and conversion-focused marketing sites."
      },
      {
        q: "Are your websites mobile responsive?",
        a: "Yes. Every website we build is fully responsive and optimized for mobile, tablet, and desktop devices."
      },
      {
        q: "Do you build websites using modern frameworks?",
        a: "Yes. We use modern frontend frameworks like Next.js and React to ensure performance, scalability, and clean architecture."
      },
      {
        q: "Will my website be SEO optimized?",
        a: "Yes. We follow SEO best practices including metadata optimization, clean structure, fast loading speeds, and accessibility standards."
      },
      {
        q: "Do you provide website hosting and deployment?",
        a: "Yes. We assist with hosting setup, domain configuration, deployment, and production optimization."
      },
      {
        q: "Can you redesign an existing website?",
        a: "Yes. We can redesign, modernize, or optimize existing websites to improve performance, design, and conversions."
      },
      {
        q: "Do you build landing pages for ads?",
        a: "Yes. We create high-conversion landing pages optimized for ads, product launches, and marketing campaigns."
      },
      {
        q: "Is website maintenance included?",
        a: "Post-launch support is included, and optional ongoing maintenance plans are available if required."
      },
      {
        q: "How fast will my website load?",
        a: "We focus heavily on performance and aim for fast load times with strong Lighthouse and Core Web Vitals scores."
      },
      {
        q: "Can I update my website myself later?",
        a: "Yes. We build websites that are easy to maintain or provide guidance after delivery."
      }
    ]
  },

  /* ================= SOCIAL ================= */
  {
    category: "social" as FaqCategory,
    title: "Social Media & Content",
    faqs: [
      {
        q: "What social media services do you offer?",
        a: "We offer short-form video creation, reels, branded edits, and simple content systems for consistent posting."
      },
      {
        q: "Which platforms do you support?",
        a: "We support Instagram Reels, YouTube Shorts, TikTok, and similar short-form video platforms."
      },
      {
        q: "How many videos do you deliver?",
        a: "Content plans typically include 2–5 short-form videos per week depending on the selected package."
      },
      {
        q: "Do you help with content ideas?",
        a: "Yes. We help plan content hooks, formats, and structures designed for reach and engagement."
      },
      {
        q: "Do you provide captions and posting guidance?",
        a: "Yes. We provide caption guidance, hashtag strategy, and posting recommendations."
      },
      {
        q: "Is this full social media management?",
        a: "No. Our focus is content creation and strategy, not full account management."
      },
      {
        q: "Can you match my brand style?",
        a: "Yes. All content is edited to match your brand colors, fonts, tone, and visual identity."
      },
      {
        q: "Do you work with creators and businesses?",
        a: "Yes. We work with personal brands, creators, startups, and small businesses."
      },
      {
        q: "Do you offer long-form video editing?",
        a: "Currently, we specialize only in short-form video content."
      },
      {
        q: "Can I upgrade content volume later?",
        a: "Yes. You can scale your content plan at any time as your needs grow."
      }
    ]
  },

  /* ================= PRICING ================= */
  {
    category: "pricing" as FaqCategory,
    title: "Pricing & Payments",
    faqs: [
      {
        q: "How much do your services cost?",
        a: "Pricing depends on the scope of work. We offer fixed packages as well as custom quotes based on requirements."
      },
      {
        q: "Do you have fixed packages?",
        a: "Yes. We offer clear packages for Discord servers, websites, and social media content services."
      },
      {
        q: "Do you offer custom pricing?",
        a: "Yes. Custom projects are priced individually based on features, complexity, and timelines."
      },
      {
        q: "Is there any hidden cost?",
        a: "No. All pricing is transparent and discussed upfront before the project begins."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept UPI, debit and credit cards, PayPal, and international payment methods."
      },
      {
        q: "Do you require advance payment?",
        a: "Yes. Most projects require partial or full advance payment before work starts."
      },
      {
        q: "Can I upgrade my plan later?",
        a: "Yes. You can upgrade your plan by paying the price difference."
      },
      {
        q: "Do you offer refunds?",
        a: "Refunds depend on project status and are evaluated on a case-by-case basis."
      },
      {
        q: "Do you offer discounts?",
        a: "Discounts may be available for long-term or bundled projects."
      },
      {
        q: "Are taxes included in the price?",
        a: "Taxes may apply depending on your country or region."
      }
    ]
  },

  /* ================= SECURITY ================= */
  {
    category: "security" as FaqCategory,
    title: "Security & Reliability",
    faqs: [
      {
        q: "Is my Discord server safe during setup?",
        a: "Yes. We follow strict security practices and permission controls during the setup process."
      },
      {
        q: "Do you protect against raids and spam?",
        a: "Yes. Anti-raid systems, verification flows, and spam filters are included in our setups."
      },
      {
        q: "Will you have admin access to my server?",
        a: "Temporary admin access may be required and is removed once the setup is completed."
      },
      {
        q: "Do you back up server configurations?",
        a: "Yes. We help ensure backups of critical server configurations and settings."
      },
      {
        q: "Is my website secure?",
        a: "Yes. We follow modern security best practices to protect performance and data."
      },
      {
        q: "Do you add SSL and security headers?",
        a: "Yes. Secure HTTPS connections and recommended security headers are included."
      },
      {
        q: "Do you store my data?",
        a: "No. We do not store sensitive client data."
      },
      {
        q: "Can you help recover a compromised server?",
        a: "Yes. We can assist with server cleanup, recovery, and security hardening."
      },
      {
        q: "Are bots configured safely?",
        a: "Yes. Bots are permission-scoped, reviewed, and configured securely."
      },
      {
        q: "Do you offer ongoing security support?",
        a: "Yes. Ongoing security and maintenance support is available as an add-on."
      }
    ]
  }
];
