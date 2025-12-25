'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";
import { blogPosts } from "@/components/blogData";

/* =========================
   ALLOWED CATEGORIES ONLY
========================= */
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "discord", label: "Discord" },
  { id: "website", label: "Websites" },
  { id: "social", label: "Social Media" },
];

/* =========================
   HELPERS
========================= */
const readingTime = (content = "") => {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const posts = blogPosts
    .filter((post) => {
      const matchesQuery =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        category === "all" ? true : post.category === category;

      return matchesQuery && matchesCategory;
    })
    .map((post) => ({
      ...post,
      readingTime: readingTime(post.content),
    }));

  return (
    <main className="min-h-screen bg-black text-white px-4 pt-32 pb-24">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-violet-400 mb-3">
            Drixe Studio Blog
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Discord, Websites & <br className="hidden sm:block" />
            Digital Growth Insights
          </h1>

          <p className="text-white/70 text-lg">
            Practical guides, tutorials, and real-world insights on Discord
            servers, modern websites, and creator-focused systems.
          </p>
        </motion.header>

        {/* ================= SEARCH ================= */}
        <div className="relative max-w-xl mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            type="text"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full pl-12 pr-4 py-3 rounded-xl
              bg-white/5 text-white
              border border-white/10
              placeholder-white/40
              focus:outline-none focus:ring-2 focus:ring-violet-500/40
            "
          />
        </div>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="flex gap-3 flex-wrap mb-16">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                category === c.id
                  ? "bg-violet-600 text-white"
                  : "border border-white/15 text-white/60 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ================= BLOG GRID ================= */}
        {posts.length === 0 ? (
          <p className="text-white/50">No articles found.</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="
                  group rounded-2xl overflow-hidden
                  border border-white/10
                  bg-white/5 hover:border-violet-500/30
                  transition
                "
              >
                {post.thumbnail && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex justify-between text-xs text-white/40 mb-3">
                    <span>{post.category}</span>
                    <span>{post.readingTime} min read</span>
                  </div>

                  <h2 className="text-lg font-semibold leading-snug mb-3">
                    {post.title}
                  </h2>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug || post.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300"
                  >
                    Read article
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ================= CTA ================= */}
        <div className="mt-28 border-t border-white/10 pt-16 max-w-3xl">
          <h3 className="text-2xl font-semibold mb-4">
            Want systems like this built for you?
          </h3>

          <p className="text-white/60 mb-6">
            We design Discord servers, high-performance websites, and content
            systems for creators and brands.
          </p>

          <Link
            href="/plans"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-medium hover:opacity-90 transition"
          >
            View Services & Plans
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </main>
  );
}
