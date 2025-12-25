export default function ServicesFaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does Drixe Studio offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Drixe Studio offers professional Discord server setup, website and landing page design, and short-form social media content creation for creators, brands, and communities."
        }
      },
      {
        "@type": "Question",
        "name": "Do you build Discord servers for creators and businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. We build structured, secure, and scalable Discord servers for creators, gaming communities, startups, NFT projects, and businesses."
        }
      },
      {
        "@type": "Question",
        "name": "What type of websites do you design?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "We design fast, SEO-optimized websites including business websites, landing pages, portfolios, and SaaS marketing sites using modern frontend technology."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer social media content services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes. We create short-form video content for Instagram Reels, YouTube Shorts, and TikTok, focused on reach, retention, and brand consistency."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get started with Drixe Studio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "You can view our pricing plans or contact us directly on WhatsApp to discuss your goals and get a recommended setup."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
