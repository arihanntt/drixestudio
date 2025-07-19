// app/faq/page.jsx
'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Search, Sparkles, BookOpen, MessageSquare, Shield, CreditCard, Clock, Settings, Users, BarChart, Globe, Code, Zap, Layout, Palette, Lock, Server, Headphones, Gift, UserPlus, PieChart, RefreshCw, ShieldCheck } from "lucide-react";
import { Helmet } from 'react-helmet-async';

// Custom debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Icon mapping for categories
const categoryIcons = {
  "🛠 Services & Features": <Settings className="w-5 h-5" />,
  "💸 Pricing & Payments": <CreditCard className="w-5 h-5" />,
  "🕐 Turnaround & Delivery": <Clock className="w-5 h-5" />,
  "🎨 Customization": <Palette className="w-5 h-5" />,
  "🔒 Security & Permissions": <ShieldCheck className="w-5 h-5" />,
  "📦 Plans & Upgrades": <Gift className="w-5 h-5" />,
  "🌎 International Clients": <Globe className="w-5 h-5" />,
  "🧰 Technical Stuff": <Code className="w-5 h-5" />,
  "📞 Support & Revisions": <Headphones className="w-5 h-5" />,
  "🤝 Partnerships & Referrals": <Users className="w-5 h-5" />,
  "🧑‍🎓 Onboarding & First-Time Buyers": <UserPlus className="w-5 h-5" />,
  "📊 Analytics & Reporting": <PieChart className="w-5 h-5" />,
  "⚙️ Post-Sale Support": <RefreshCw className="w-5 h-5" />,
  "🖥 Server Management": <Server className="w-5 h-5" />
};

const faqData = [
  {
    title: "🛠 Services & Features",
    faqs: [
      { q: "What services do you offer?", a: "We offer comprehensive Discord server setup, revamps, bot integration, role design, security configurations, channel organization, and custom theme development." },
      { q: "Can I request a fully custom setup?", a: "Absolutely! We specialize in tailor-made setups designed specifically for your community or brand's unique needs." },
      { q: "Do you support game servers or esports teams?", a: "Yes! We have extensive experience working with esports teams, gaming clans, streamers, and competitive communities." },
      { q: "Is bot configuration included in your services?", a: "Definitely. All our plans include bot setups (MEE6, Carl-bot, Dyno) and we can work with custom bots too." },
      { q: "Can you migrate my existing server to a new setup?", a: "Yes, we can seamlessly migrate your existing community while preserving all important data and relationships." },
      { q: "Do you offer voice channel setups?", a: "Yes, we configure advanced voice channel hierarchies with permissions and special features." },
      { q: "Can you integrate with Twitch/YouTube?", a: "Absolutely! We set up integrations with streaming platforms for subscriber roles and notifications." },
      { q: "Do you provide moderation system setups?", a: "Yes, we implement comprehensive moderation systems including auto-moderation and reporting tools." },
      { q: "Can you create custom Discord emojis?", a: "Yes, we offer custom emoji creation as an add-on service to all packages." },
      { q: "Do you offer server templates?", a: "We provide custom templates that you can reuse across multiple servers." },
      { q: "Can you set up reaction roles?", a: "Yes, we implement advanced reaction role systems with custom designs." },
      { q: "Do you configure ticket systems?", a: "We set up fully functional ticket systems for support and moderation." },
      { q: "Can you create custom welcome screens?", a: "Yes, we design immersive welcome experiences for new members." },
      { q: "Do you offer server branding services?", a: "We provide complete branding including color schemes, banners, and logos." },
      { q: "Can you set up leveling systems?", a: "Yes, we configure XP and leveling systems with custom rewards." },
      { q: "Do you implement music bots?", a: "We can set up and configure music bots with custom playlists." },
      { q: "Can you create custom commands?", a: "Yes, we develop custom bot commands tailored to your needs." },
      { q: "Do you offer NSFW server setups?", a: "We can configure age-gated NSFW servers with proper security measures." },
      { q: "Can you set up partnership systems?", a: "We implement partnership management systems with verification." },
      { q: "Do you provide server documentation?", a: "Yes, we deliver comprehensive setup documentation with all projects." }
    ],
  },
  {
    title: "💸 Pricing & Payments",
    faqs: [
      { q: "What payment methods do you accept?", a: "We accept UPI, PayPal, international cards, and select cryptocurrencies." },
      { q: "Are your prices fixed or negotiable?", a: "Our standard plans have fixed pricing, but custom projects are quoted individually." },
      { q: "What's your refund policy?", a: "Refunds are available if work hasn't started. After work begins, we offer service credits." },
      { q: "Do you offer bulk or agency discounts?", a: "Yes! We provide special pricing for bulk orders and agency collaborations." },
      { q: "Are there any hidden fees?", a: "No, all costs are transparently listed upfront with no surprises." },
      { q: "Do you offer payment plans?", a: "For large projects, we can arrange installment payments." },
      { q: "Is there a difference in pricing for international clients?", a: "No, our pricing is consistent globally with automatic currency conversion." },
      { q: "Do you charge for revisions?", a: "Each plan includes free revisions (3 for Standard, 5 for Pro, unlimited for Ultimate)." },
      { q: "Can I upgrade my plan later?", a: "Yes, you can upgrade anytime by paying the difference." },
      { q: "Do you offer student discounts?", a: "We provide 15% discounts for students with valid ID." },
      { q: "Is there a money-back guarantee?", a: "We offer satisfaction guarantees on all our work." },
      { q: "How do currency conversions work?", a: "Payments are processed at current exchange rates with no extra fees." },
      { q: "Do you store payment information?", a: "No, all payments are processed through secure third-party providers." },
      { q: "Can I get an invoice for my purchase?", a: "Yes, we provide professional invoices for all transactions." },
      { q: "Are taxes included in the price?", a: "All prices are net. Taxes are added based on your location." },
      { q: "Do you accept bank transfers?", a: "Yes, we accept direct bank transfers for larger projects." },
      { q: "Is there a minimum project size?", a: "No, we work with projects of all sizes." },
      { q: "Do you charge for consultations?", a: "Initial consultations are always free with no obligation." },
      { q: "Can I pay after the work is done?", a: "We require 50% upfront with the balance upon completion." },
      { q: "Do you offer non-profit discounts?", a: "We provide 20% discounts for registered non-profits." }
    ],
  },
  {
  title: "🕐 Turnaround & Delivery",
  faqs: [
    { q: "How long does a standard setup take?", a: "Our standard setups are completed within 48-72 hours after receiving all required materials." },
    { q: "What's the timeline for a complete server revamp?", a: "Complete revamps typically take 3-5 business days depending on complexity." },
    { q: "Do you offer expedited services?", a: "Yes, we provide 24-hour rush services for an additional 30% fee." },
    { q: "What factors affect delivery time?", a: "Complexity, customization level, and client response times all impact delivery." },
    { q: "Can I get a progress update during setup?", a: "Absolutely! We provide daily progress reports through Discord." },
    { q: "What's your current workload/queue time?", a: "We maintain a maximum 2-day queue before starting new projects." },
    { q: "Do you work on weekends?", a: "Our team works Monday-Friday, but premium clients receive weekend support." },
    { q: "How do you handle delivery delays?", a: "We communicate proactively and offer compensation for any unexpected delays." },
    { q: "What timezone do you operate in?", a: "Our primary team works in IST, but we have global coverage across timezones." },
    { q: "Can I schedule setup for a specific date?", a: "Yes, we can schedule projects to begin on your preferred start date." },
    { q: "What's included in the delivery package?", a: "You'll receive the configured server, documentation, and training materials." },
    { q: "Do you provide post-setup training?", a: "Yes, we offer 30-minute onboarding sessions with all deliveries." },
    { q: "How quickly can you fix urgent issues?", a: "Critical issues are addressed within 4 hours for premium clients." },
    { q: "What's your fastest completed project?", a: "Our record is a basic server setup completed in 6 hours." },
    { q: "Can I request specific delivery times?", a: "We accommodate time-specific deliveries for events and launches." },
    { q: "Do you offer phased deliveries?", a: "Large projects can be delivered in milestones upon request." },
    { q: "How do you handle time-sensitive updates?", a: "Time-sensitive work is prioritized with clear communication." },
    { q: "What if I need changes after delivery?", a: "All plans include free revision periods (duration varies by plan)." },
    { q: "Do you provide delivery notifications?", a: "Yes, we notify you via Discord and email upon completion." },
    { q: "Can I track progress in real-time?", a: "Premium clients get access to our project management dashboard." }
  ]
},
{
  title: "🎨 Customization",
  faqs: [
    { q: "How customizable are your server designs?", a: "We offer 100% custom designs tailored to your exact specifications." },
    { q: "Can you match my existing brand colors?", a: "Yes, we precisely match Pantone, HEX, and RGB color codes." },
    { q: "Do you create custom server icons?", a: "We design high-quality custom icons sized perfectly for Discord." },
    { q: "Can you replicate a specific aesthetic?", a: "Our designers can recreate any style from minimal to cyberpunk." },
    { q: "Do you offer custom emoji packages?", a: "Yes, we create full emoji sets with your branding/mascot." },
    { q: "Can you design animated banners?", a: "We create stunning animated banners in multiple formats." },
    { q: "Do you provide custom role colors?", a: "We implement sophisticated color-coding systems for roles." },
    { q: "Can you create custom channel categories?", a: "We design intuitive category structures with custom icons." },
    { q: "Do you offer themed server designs?", a: "Choose from our library of 50+ themes or request custom ones." },
    { q: "Can you design custom Discord bots?", a: "We develop bots with custom commands, responses, and features." },
    { q: "Do you create custom welcome messages?", a: "We design immersive welcome flows with images and embeds." },
    { q: "Can you make custom reaction menus?", a: "We build interactive reaction-based navigation systems." },
    { q: "Do you offer custom sound effects?", a: "We can implement custom sounds for notifications and events." },
    { q: "Can you design role selection interfaces?", a: "We create beautiful role selection menus with descriptions." },
    { q: "Do you provide custom font implementations?", a: "We can integrate custom fonts through our bot systems." },
    { q: "Can you animate server elements?", a: "We implement subtle animations for key interface elements." },
    { q: "Do you offer seasonal designs?", a: "We provide seasonal theme updates for holiday periods." },
    { q: "Can you create mascot characters?", a: "Our artists can design original mascots for your community." },
    { q: "Do you provide style guides?", a: "We deliver complete brand guidelines with all custom designs." },
    { q: "Can you make everything mobile-friendly?", a: "All our designs are optimized for both desktop and mobile." }
  ]
},
{
  title: "🔒 Security & Permissions",
  faqs: [
    { q: "How do you secure my server during setup?", a: "We use temporary access with 2FA and strict permission controls." },
    { q: "What security measures do you implement?", a: "We set up verification levels, moderation bots, and role hierarchies." },
    { q: "Can you recover hacked servers?", a: "We offer emergency recovery services with 24/7 response." },
    { q: "Do you set up anti-raid systems?", a: "All our configurations include advanced anti-raid protection." },
    { q: "How do you handle admin permissions?", a: "We implement least-privilege access with clear permission trees." },
    { q: "Can you audit my server's security?", a: "We provide comprehensive security audits with risk reports." },
    { q: "Do you configure moderation bots?", a: "We set up AI-powered moderation with custom rule sets." },
    { q: "How do you protect against scams?", a: "We implement verification systems and scam detection bots." },
    { q: "Can you set up privacy controls?", a: "We configure granular privacy settings for all channels." },
    { q: "Do you implement backup systems?", a: "We establish automated backup routines for critical data." },
    { q: "How do you handle NSFW content?", a: "We create secure age-gated systems with proper verification." },
    { q: "Can you set up VIP/Staff areas?", a: "We design exclusive spaces with multiple security layers." },
    { q: "Do you configure audit logs?", a: "We implement comprehensive logging of all moderation actions." },
    { q: "Can you protect against spam?", a: "Our setups include multi-layered spam prevention systems." },
    { q: "How do you handle ban appeals?", a: "We can set up automated ban appeal systems with moderation." },
    { q: "Do you implement IP protection?", a: "We configure systems to prevent IP grabbing and doxxing." },
    { q: "Can you set up 2FA requirements?", a: "We can mandate 2FA for all staff and privileged roles." },
    { q: "Do you provide security training?", a: "We offer security best practices guides for server staff." },
    { q: "Can you create emergency protocols?", a: "We develop crisis response plans for server emergencies." },
    { q: "How do you handle data privacy?", a: "We implement GDPR-compliant data handling procedures." }
  ]
},
{
  title: "📦 Plans & Upgrades",
  faqs: [
    { q: "What's included in the Basic plan?", a: "Basic includes server structure, 5 bots, and simple theming." },
    { q: "What does the Pro plan offer?", a: "Pro adds custom branding, 10 bots, and advanced features." },
    { q: "What makes Ultimate different?", a: "Ultimate provides complete customization and premium support." },
    { q: "Can I mix features from different plans?", a: "Yes, we can create hybrid plans tailored to your needs." },
    { q: "How often do you update your plans?", a: "We review and update plans quarterly based on new features." },
    { q: "Do you offer enterprise solutions?", a: "We provide custom enterprise packages for large organizations." },
    { q: "What add-ons are available?", a: "Add-ons include extra bots, custom art, and priority support." },
    { q: "Can I downgrade my plan?", a: "You can downgrade at renewal, with some feature adjustments." },
    { q: "How do plan limits work?", a: "Limits are soft caps - we can adjust as your community grows." },
    { q: "Do you offer free trials?", a: "We provide 24-hour trials of our Basic plan features." },
    { q: "What's your most popular plan?", a: "70% of clients choose Pro for its balance of features and value." },
    { q: "Can I get a plan comparison chart?", a: "Yes, we provide detailed comparison charts upon request." },
    { q: "Do plans include maintenance?", a: "All plans include 30 days of basic maintenance and support." },
    { q: "How do bot limits work?", a: "Bot counts are for configuration - we optimize each bot's functionality." },
    { q: "Can I gift a plan to someone?", a: "We offer giftable plan purchases with custom messaging." },
    { q: "Do you offer non-profit discounts?", a: "Registered non-profits receive 25% off all plans." },
    { q: "What's the best plan for growing servers?", a: "We recommend Pro as it scales well from 100-10k members." },
    { q: "Can I get a custom plan quote?", a: "We provide free custom quotes based on your specific needs." },
    { q: "Do plans auto-renew?", a: "You can choose manual or auto-renewal during checkout." },
    { q: "How do I choose the right plan?", a: "Our consultants can recommend the perfect plan for your goals." }
  ]
},
{
  title: "🌎 International Clients",
  faqs: [
    { q: "Do you work with clients outside India?", a: "Yes! 60% of our clients are international across 35+ countries." },
    { q: "How do timezone differences work?", a: "We have team members covering all major timezones for support." },
    { q: "Do you offer multilingual support?", a: "We provide support in English, Spanish, and Hindi currently." },
    { q: "How are currency conversions handled?", a: "Prices auto-convert to your local currency at checkout." },
    { q: "Are there regional restrictions?", a: "We only restrict services where prohibited by local laws." },
    { q: "Do you accommodate cultural differences?", a: "Our designs adapt to cultural norms and preferences." },
    { q: "Can you set up region-specific channels?", a: "We create geo-targeted spaces with appropriate moderation." },
    { q: "How do you handle international payments?", a: "We accept all major currencies and payment methods." },
    { q: "Do you adjust for regional holidays?", a: "We accommodate major holidays in our delivery timelines." },
    { q: "Can you implement translation bots?", a: "We configure auto-translation for multilingual servers." },
    { q: "Do you have international case studies?", a: "We showcase global success stories in our portfolio." },
    { q: "How do you handle regional regulations?", a: "We stay compliant with GDPR, CCPA, and other frameworks." },
    { q: "Can you optimize for regional platforms?", a: "We integrate with local platforms like WeChat when needed." },
    { q: "Do you offer localized pricing?", a: "Prices adjust automatically based on purchasing power parity." },
    { q: "How do you handle international disputes?", a: "We follow international arbitration standards." },
    { q: "Can you set up region-locked content?", a: "We implement geo-fencing for location-specific channels." },
    { q: "Do you work with international nonprofits?", a: "We support global NGOs with special pricing." },
    { q: "How do you handle cross-border taxes?", a: "We automatically calculate and remit appropriate taxes." },
    { q: "Can you accommodate regional aesthetics?", a: "Our designers specialize in localized visual styles." },
    { q: "Do you have international references?", a: "We can connect you with global clients for references." }
  ]
},
{
  title: "🧰 Technical Stuff",
  faqs: [
    { q: "What bots do you recommend?", a: "Top picks: MEE6 for moderation, Carl-bot for reactions, and Dyno for utilities." },
    { q: "Can you set up custom bot commands?", a: "We develop custom commands with personalized responses." },
    { q: "Do you work with bot APIs?", a: "We integrate with all major bot APIs and webhooks." },
    { q: "How do you handle bot permissions?", a: "We implement least-privilege access for all bots." },
    { q: "Can you create dashboard panels?", a: "We build custom control panels for server management." },
    { q: "Do you configure webhook systems?", a: "We set up automated webhook notifications and feeds." },
    { q: "How do you optimize server performance?", a: "We streamline channels and bots for maximum efficiency." },
    { q: "Can you implement slash commands?", a: "We develop custom slash commands for easier navigation." },
    { q: "Do you set up auto-moderation?", a: "Our auto-mod systems learn and adapt to your community." },
    { q: "Can you create custom embeds?", a: "We design beautiful, functional embeds for all purposes." },
    { q: "How do you handle bot conflicts?", a: "We test all bot interactions during setup." },
    { q: "Can you set up RSS feeds?", a: "We implement automated content feeds from any source." },
    { q: "Do you configure backup systems?", a: "We establish automated daily backups for critical data." },
    { q: "Can you integrate with external APIs?", a: "We connect Discord with thousands of external services." },
    { q: "How do you handle rate limits?", a: "Our configurations respect and optimize around API limits." },
    { q: "Can you set up custom statuses?", a: "We implement dynamic status messages for your server." },
    { q: "Do you optimize for mobile users?", a: "All our setups are mobile-optimized for best performance." },
    { q: "Can you create custom bridge bots?", a: "We develop bots that connect multiple platforms." },
    { q: "How do you handle bot downtimes?", a: "We implement fallback systems for critical bot functions." },
    { q: "Can you audit existing tech setups?", a: "We provide comprehensive technical audits and reports." }
  ]
},
{
  title: "📞 Support & Revisions",
  faqs: [
    { q: "How do I request support?", a: "Open a ticket in our Discord server or email support@drixestudio.com." },
    { q: "What's your response time?", a: "We guarantee responses within 12 hours (often much faster)." },
    { q: "Do you offer phone support?", a: "Premium clients receive scheduled call support." },
    { q: "How many revisions are included?", a: "Basic: 3, Pro: 5, Ultimate: Unlimited for 30 days." },
    { q: "What's covered in revisions?", a: "We'll adjust anything that doesn't match your initial request." },
    { q: "How do emergency requests work?", a: "Emergency issues are prioritized with 4-hour response SLA." },
    { q: "Do you provide screen share help?", a: "Yes, we offer guided screen share sessions." },
    { q: "Can I request feature additions?", a: "New features can be added as paid upgrades." },
    { q: "How do you handle bug fixes?", a: "All bugs are fixed free of charge, regardless of plan." },
    { q: "Do you offer training sessions?", a: "We provide 1-on-1 training for server admins." },
    { q: "Can I extend my support period?", a: "Support extensions are available monthly or annually." },
    { q: "How do you document support issues?", a: "All tickets are logged and available in your client portal." },
    { q: "Do you provide after-hours support?", a: "24/7 support is available for Ultimate clients." },
    { q: "Can I speak to the same agent each time?", a: "We maintain continuity with dedicated account managers." },
    { q: "How do you measure support quality?", a: "We track resolution time, satisfaction, and first-contact resolution." },
    { q: "Do you offer support in languages other than English?", a: "We currently support English, Spanish, and Hindi." },
    { q: "Can I upgrade support without changing plans?", a: "Support packages can be upgraded separately." },
    { q: "How do you handle feature requests?", a: "Requests are logged and prioritized based on demand." },
    { q: "Do you provide support analytics?", a: "Premium clients receive monthly support metrics reports." },
    { q: "What's your customer satisfaction rate?", a: "We maintain a 98% satisfaction rating across all support interactions." }
  ]
},
{
  title: "🤝 Partnerships & Referrals",
  faqs: [
    { q: "Do you offer affiliate programs?", a: "Yes! Earn 15% commission on all referrals for 12 months." },
    { q: "How do I become a partner?", a: "Apply through our partner portal with your portfolio." },
    { q: "What are the benefits of partnership?", a: "Partners get early access, higher commissions, and co-marketing." },
    { q: "Can I resell your services?", a: "We offer white-label solutions for qualified agencies." },
    { q: "How do referrals work?", a: "Share your unique link and earn when clients purchase." },
    { q: "Do you have partner tiers?", a: "We have Silver, Gold, and Platinum partnership levels." },
    { q: "Can we co-host events?", a: "We frequently co-host workshops and community events." },
    { q: "Do you offer bulk discounts?", a: "Partners receive volume discounts for large projects." },
    { q: "How are partner payouts handled?", a: "Monthly payments via PayPal, Wise, or bank transfer." },
    { q: "Can I partner if I'm outside India?", a: "We welcome global partners from all countries." },
    { q: "Do you provide partner resources?", a: "Access our media kit, templates, and training materials." },
    { q: "How do you track referrals?", a: "Through unique links and promo codes in our system." },
    { q: "Can I partner as a content creator?", a: "We have special programs for streamers and YouTubers." },
    { q: "Do you offer partner certifications?", a: "Complete our training to become a certified partner." },
    { q: "How do joint ventures work?", a: "We collaborate on special projects with revenue sharing." },
    { q: "Can I feature your work in my portfolio?", a: "Partners can showcase collaborative projects." },
    { q: "Do you attend partner events?", a: "We participate in select industry events with partners." },
    { q: "How do I track my referral performance?", a: "Access real-time stats in your partner dashboard." },
    { q: "Can I refer other service providers?", a: "We have special programs for complementary services." },
    { q: "What's your top partner earning?", a: "Our top partner earned $8,500 in commissions last quarter." }
  ]
},
{
  title: "🧑‍🎓 Onboarding & First-Time Buyers",
  faqs: [
    { q: "I'm new to Discord - can you help?", a: "Absolutely! We specialize in onboarding new Discord users." },
    { q: "Do I need to prepare anything?", a: "Just your ideas - we'll handle all the technical setup." },
    { q: "Should I create the server first?", a: "We can create it for you or work with your existing server." },
    { q: "How do I communicate my vision?", a: "We'll guide you through our creative briefing process." },
    { q: "What if I don't know what I need?", a: "Our consultants will recommend the perfect setup." },
    { q: "Do you provide beginner tutorials?", a: "Yes, we include step-by-step video guides." },
    { q: "Can you train my team?", a: "We offer group training sessions for server staff." },
    { q: "How technical do I need to be?", a: "Not at all! We explain everything in simple terms." },
    { q: "What's your simplest package?", a: "Our Basic plan is perfect for first-time server owners." },
    { q: "Can I upgrade later if I need more?", a: "You can upgrade anytime as your community grows." },
    { q: "Do you offer money-back guarantees?", a: "We offer 100% satisfaction guarantees for new clients." },
    { q: "How do I know if I'm ready?", a: "If you have 10+ community members, it's time to get organized." },
    { q: "Can you help with community guidelines?", a: "We provide template guidelines you can customize." },
    { q: "Do you offer starter templates?", a: "Choose from 20+ starter templates we can customize." },
    { q: "What's the biggest newbie mistake?", a: "Overcomplicating early - we focus on simple but scalable." },
    { q: "Can you help name my server?", a: "Our branding experts can suggest perfect name options." },
    { q: "Do you provide growth advice?", a: "We include community growth tips with every setup." },
    { q: "How do I know which bots I need?", a: "We'll recommend the perfect starter bot package." },
    { q: "Can you set up test servers?", a: "We create staging servers so you can practice safely." },
    { q: "What ongoing costs should I expect?", a: "We'll outline all potential future costs upfront." }
  ]
},
{
  title: "📊 Analytics & Reporting",
  faqs: [
    { q: "What analytics do you track?", a: "Member growth, engagement, channel activity, and moderation metrics." },
    { q: "Can you set up Statbot?", a: "Yes, we're Statbot experts and configure all its features." },
    { q: "Do you provide custom dashboards?", a: "We create tailored analytics dashboards for your needs." },
    { q: "How often are reports generated?", a: "Daily automated reports with weekly executive summaries." },
    { q: "Can you track ROI on server features?", a: "We measure feature adoption and engagement impact." },
    { q: "Do you integrate with Google Analytics?", a: "We can connect Discord activity to your GA property." },
    { q: "How do you measure engagement?", a: "Through message frequency, reaction rates, and voice activity." },
    { q: "Can you identify inactive members?", a: "Our systems flag inactive users for re-engagement." },
    { q: "Do you provide competitor benchmarking?", a: "We offer industry-specific performance benchmarks." },
    { q: "How do you handle data privacy?", a: "All analytics are anonymized and GDPR compliant." },
    { q: "Can you predict growth trends?", a: "Our models forecast growth based on current metrics." },
    { q: "Do you track moderation effectiveness?", a: "We measure resolution time and repeat offenses." },
    { q: "Can you analyze conversation topics?", a: "Our sentiment analysis identifies key discussion themes." },
    { q: "How do you visualize data?", a: "Through interactive charts, heatmaps, and trend lines." },
    { q: "Can you set up custom metrics?", a: "We track any KPI that matters to your community." },
    { q: "Do you provide API access to data?", a: "Premium clients get direct API access to their metrics." },
    { q: "How far back does data go?", a: "We maintain full history from when we start tracking." },
    { q: "Can you compare channel performance?", a: "Our channel analytics identify top performers." },
    { q: "Do you track event participation?", a: "We measure event RSVPs, attendance, and engagement." },
    { q: "Can you export data to CSV?", a: "All data can be exported for further analysis." }
  ]
},
{
  title: "⚙️ Post-Sale Support",
  faqs: [
    { q: "How long does support last after purchase?", a: "Basic: 30 days, Pro: 60 days, Ultimate: 90 days." },
    { q: "Can I extend my support period?", a: "Support extensions available in 30-day increments." },
    { q: "What's covered in post-sale support?", a: "Bug fixes, minor adjustments, and usage questions." },
    { q: "How do I submit support requests?", a: "Via Discord ticket, email, or your client portal." },
    { q: "Do you offer maintenance plans?", a: "Yes, monthly maintenance packages are available." },
    { q: "Can you train new staff after setup?", a: "Additional training sessions can be purchased." },
    { q: "How do you handle emergency issues?", a: "24/7 emergency support for critical problems." },
    { q: "Do you provide update notifications?", a: "We alert you to relevant Discord/bot updates." },
    { q: "Can you audit my server after changes?", a: "Post-change audits available as add-on service." },
    { q: "How do you handle third-party updates?", a: "We monitor and adapt to major bot/platform changes." },
    { q: "Do you offer discounted refreshes?", a: "Existing clients get 20% off design refreshes." },
    { q: "Can you document custom configurations?", a: "We provide detailed documentation for all work." },
    { q: "How do you sunset deprecated features?", a: "We help migrate from outdated features smoothly." },
    { q: "Do you provide upgrade recommendations?", a: "Quarterly reviews of potential upgrades." },
    { q: "Can you consult on community growth?", a: "Ongoing growth consulting available monthly." },
    { q: "How do you handle abandoned projects?", a: "We maintain archives for 1 year after inactivity." },
    { q: "Do you offer loyalty discounts?", a: "Returning clients receive 10-15% loyalty discounts." },
    { q: "Can you transfer ownership if I sell?", a: "We facilitate smooth transitions for server sales." },
    { q: "How do you sunset unused features?", a: "We help clean up and optimize unused elements." },
    { q: "Do you provide annual checkups?", a: "Comprehensive annual reviews available." }
  ]
},
{
  title: "🖥 Server Management",
  faqs: [
    { q: "What's included in managed services?", a: "Daily monitoring, updates, backups, and moderation support." },
    { q: "How do you handle server moderation?", a: "24/7 AI moderation with human oversight." },
    { q: "Can you manage my community events?", a: "Full event planning and execution available." },
    { q: "Do you provide content calendars?", a: "Custom content schedules for your community." },
    { q: "How do you handle member onboarding?", a: "Automated welcome flows with personal touches." },
    { q: "Can you manage staff teams?", a: "We handle staff recruitment, training, and scheduling." },
    { q: "Do you offer growth management?", a: "Complete growth strategy and execution." },
    { q: "How do you handle conflicts?", a: "Professional conflict resolution protocols." },
    { q: "Can you manage partnerships?", a: "End-to-end partnership management services." },
    { q: "Do you provide activity reports?", a: "Weekly detailed activity analytics." },
    { q: "How do you handle rule enforcement?", a: "Consistent, fair enforcement with documentation." },
    { q: "Can you manage multiple servers?", a: "Enterprise multi-server management available." },
    { q: "Do you offer crisis management?", a: "24/7 crisis response teams for emergencies." },
    { q: "How do you handle NSFW content?", a: "Strict age-gating with verification systems." },
    { q: "Can you manage VIP programs?", a: "Complete VIP experience design and management." },
    { q: "Do you provide transcription services?", a: "Voice channel transcription available." },
    { q: "How do you handle seasonal changes?", a: "Automatic seasonal theme updates." },
    { q: "Can you manage cross-platform integration?", a: "Seamless multi-platform synchronization." },
    { q: "Do you offer backup management?", a: "Automated daily backups with cloud storage." },
    { q: "How do you handle server transfers?", a: "Complete server migration services." }
  ]
}
  // ... (similar detailed expansions for all other categories)
  // Note: Due to length, I've shown 2 complete categories. You would expand all 14 categories similarly
];

const FAQPage = () => {
  const [openIndexes, setOpenIndexes] = useState([0, 1, 2]); // Auto-open first 3 categories
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [activeCategory, setActiveCategory] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const toggle = (i) => {
    setOpenIndexes((prev) =>
      prev.includes(i) ? prev.filter((index) => index !== i) : [...prev, i]
    );
    setActiveCategory(faqData[i].title);
  };

  const filterFaqs = (section) => {
    if (!debouncedQuery.trim()) return section.faqs;
    return section.faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setOpenIndexes([0, 1, 2]);
      return;
    }
    const matchingIndexes = faqData.reduce((acc, section, i) => {
      if (filterFaqs(section).length > 0) acc.push(i);
      return acc;
    }, []);
    setOpenIndexes(matchingIndexes);
  }, [debouncedQuery]);

  // Auto-scroll to category when selected
  useEffect(() => {
    if (activeCategory) {
      const index = faqData.findIndex(section => section.title === activeCategory);
      if (index !== -1) {
        const element = document.getElementById(`category-${index}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [activeCategory]);

  return (
    <section className="relative min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-6 pt-32 pb-20 overflow-hidden">
      

      {/* Advanced Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#0f0f1c] via-[#1a1a30] to-[#12101f]"
          style={{ y }}
        />
        
        {/* Animated Gradient Circles */}
        <motion.div 
          className="absolute -top-32 left-1/3 w-[900px] h-[900px] bg-gradient-to-br from-purple-700/30 to-indigo-700/30 blur-[200px] rounded-full"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-[-15vw] -right-[15vw] w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/20 to-blue-500/20 blur-[160px] rounded-full"
          animate={{
            x: [0, -20, 0],
            y: [0, -30, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-indigo-400/30"
          style={{
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 120],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Title Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-5xl">📚</span>
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 mb-6"
          >
            <span className="relative inline-block">
              Frequently Asked Questions
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </motion.h1>
          
          <motion.p
            className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Everything you need to know about our services. Can't find an answer?{' '}
            <a href="/contact" className="text-purple-400 hover:underline hover:text-purple-300 transition-colors">Contact us directly</a>.
          </motion.p>
        </motion.div>

        {/* Advanced Search & Filter System */}
        <motion.div 
          className="sticky top-20 z-20 bg-[#0f0f0f]/90 backdrop-blur-lg py-4 mb-8 border-b border-gray-800 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Enhanced Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search across 200+ questions..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1a1a1a] text-white placeholder-gray-400 border border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 shadow-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <motion.button
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex space-x-2">
                {faqData.map((section, i) => {
                  const filtered = filterFaqs(section);
                  if (filtered.length === 0 && query) return null;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => {
                        toggle(i);
                        setActiveCategory(section.title);
                      }}
                      className={`flex items-center whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md ${
                        openIndexes.includes(i) 
                          ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-purple-500/30' 
                          : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a] shadow-black/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2">
                        {React.cloneElement(categoryIcons[section.title], {
                          className: `w-4 h-4 ${openIndexes.includes(i) ? 'text-white' : 'text-purple-400'}`
                        })}
                      </span>
                      {section.title.split(' ')[0]}
                      {filtered.length > 0 && (
                        <span className="ml-2 bg-white/10 px-2 py-0.5 rounded-full text-xs">
                          {filtered.length}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Sections with Advanced Animations */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqData.map((section, i) => {
            const filtered = filterFaqs(section);
            if (filtered.length === 0 && query) return null;
            const isOpen = openIndexes.includes(i);

            return (
              <motion.div
                key={i}
                id={`category-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border transition-all duration-300 ${
                  isOpen 
                    ? 'border-purple-500/50 shadow-purple-500/10' 
                    : 'border-purple-900/30 hover:border-purple-500/40'
                }`}
                whileHover={{ 
                  scale: isOpen ? 1 : 1.02,
                  boxShadow: isOpen ? '' : '0 10px 25px -5px rgba(139, 92, 246, 0.1)'
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center text-left group"
                >
                  <div className="flex items-center">
                    <motion.div 
                      className="mr-4 p-2 rounded-lg bg-purple-900/30 group-hover:bg-purple-900/50 transition-colors duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      {categoryIcons[section.title]}
                    </motion.div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">
                      {section.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`text-gray-400 group-hover:text-purple-400 transition-colors ${isOpen ? "text-purple-400" : ""}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: 1, 
                        height: "auto",
                        transition: { duration: 0.3, ease: "easeInOut" }
                      }}
                      exit={{ 
                        opacity: 0, 
                        height: 0,
                        transition: { duration: 0.2, ease: "easeInOut" }
                      }}
                      className="mt-4 space-y-4 overflow-hidden"
                    >
                      {filtered.map((faq, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: j * 0.03, duration: 0.3 }
                          }}
                          className="border-b border-gray-800/50 pb-4 last:border-0 last:pb-0"
                        >
                          <p className="font-semibold text-purple-100 flex items-start">
                            <motion.span 
                              className="inline-block mr-2 text-purple-400"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                transition: { delay: j * 0.1, duration: 0.5 }
                              }}
                            >
                              •
                            </motion.span>
                            {faq.q}
                          </p>
                          <motion.p 
                            className="text-gray-300 mt-2 pl-6"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: 1,
                              transition: { delay: j * 0.05 + 0.2 }
                            }}
                          >
                            <span className="inline-block mr-2 text-gray-500">→</span>
                            {faq.a}
                          </motion.p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Empty State */}
        {query && faqData.every(section => filterFaqs(section).length === 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="col-span-full text-center py-20"
          >
            <div className="mx-auto max-w-md">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  transition: { duration: 3, repeat: Infinity }
                }}
              >
                <Search className="mx-auto h-14 w-14 text-gray-500 mb-4" />
              </motion.div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">No results found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any questions matching "{query}"
              </p>
              <motion.button
                onClick={() => setQuery("")}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Search
              </motion.button>
              <p className="text-gray-500 mt-6">
                Still need help?{' '}
                <a href="/contact" className="text-purple-400 hover:underline">Contact our support team</a>
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.a
          href="/contact"
          className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 group relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              x: ['-100%', '100%'],
              transition: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
          <MessageSquare className="h-6 w-6 text-white relative z-10 group-hover:animate-pulse" />
          <span className="sr-only">Get Help</span>
          <motion.span 
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0f0f0f]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.a>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity
          }}
          className="text-gray-400 flex flex-col items-center"
        >
          <ChevronDown className="h-6 w-6" />
          <span className="text-xs mt-1">Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FAQPage;