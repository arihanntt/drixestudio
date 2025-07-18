import React from "react";
import "./ReviewStrip.css";

const reviews = [
  {
    name: "Luna",
    role: "Streamer | Valorant",
    tag: "Gaming",
    avatar: "/avatars/luna.gif",
    text: "Insane setup! Got exactly what I imagined and even more. Love the custom emojis and vibe!",
    stars: 5,
    reaction: "🎮",
  },
  {
    name: "Ayaan",
    role: "Ecom Brand Owner",
    tag: "Business",
    avatar: "/avatars/ayaan.gif",
    text: "Super clean layout. My support system is automated now. My team loved the result.",
    stars: 5,
    reaction: "💼",
  },
  {
    name: "Yuki",
    role: "Anime Server Admin",
    tag: "Kawaii",
    avatar: "/avatars/yuki.gif",
    text: "My server looks like a literal dream 🌸 the animated channels and themed bots are fire!",
    stars: 5,
    reaction: "🌸",
  },
  {
    name: "Nova",
    role: "Community Lead",
    tag: "Moderation",
    avatar: "/avatars/nova.gif",
    text: "Was up and running within a day. Dashboard + logging setup was chef’s kiss. 10/10.",
    stars: 5,
    reaction: "🛡️",
  },
  {
    name: "Mira",
    role: "Tech Influencer",
    tag: "Content",
    avatar: "/avatars/mira.gif",
    text: "My creator hub is perfect. Commands, alerts, and auto-content — loved the creativity!",
    stars: 5,
    reaction: "🚀",
  },
];

const ReviewStrip = () => {
  const looped = [...reviews, ...reviews, ...reviews];

  return (
    <section className="review-strip-section">
      <div className="strip-title">✨ Loved by the Discord community — gamers, brands & influencers</div>

      <div className="strip-fade-left" />
      <div className="strip-fade-right" />

      <div className="scroll-container">
        <div className="scroll-strip">
          {looped.map((r, i) => (
            <div className="review-box fancy-shadow" key={i}>
              <div className="review-header">
                <img src={r.avatar} alt={r.name} className="avatar" />
                <div>
                  <div className="name">{r.name} <span className="verified">✔️</span></div>
                  <div className="from">{r.role}</div>
                </div>
              </div>
              <div className="review-text">“{r.text}”</div>
              <div className="review-footer">
                <div className="stars">{"⭐️".repeat(r.stars)}</div>
                <div className="tag">#{r.tag}</div>
                <div className="reaction">{r.reaction}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewStrip;
