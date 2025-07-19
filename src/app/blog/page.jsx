"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Rocket,
  Wrench,
  Gem,
} from "lucide-react";
import { blogPosts } from "@/components/blogData";
import Image from "next/image";

const tagColors = {
  Design: "bg-pink-600",
  Code: "bg-indigo-600",
  News: "bg-green-600",
  Update: "bg-yellow-500",
  Tips: "bg-purple-500",
};

const tagIcons = {
  Design: <Sparkles size={16} className="mr-1" />,
  Code: <Wrench size={16} className="mr-1" />,
  News: <ShieldCheck size={16} className="mr-1" />,
  Update: <Rocket size={16} className="mr-1" />,
  Tips: <Gem size={16} className="mr-1" />,
};

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());

    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#181818] text-white px-4 pt-[120px] pb-10">
      {/* Header + Search */}
      <div className="max-w-5xl mx-auto text-center mb-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🌟 Explore Our Latest Blogs
        </motion.h1>

        <motion.input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl mx-auto p-3 rounded-lg bg-zinc-800 text-white border border-zinc-600 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        />
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-2">
        {currentPosts.length > 0 ? (
          currentPosts.map((post, index) => (
            <Tilt key={post.id} tiltMaxAngleX={4} tiltMaxAngleY={4}>
              <Link href={`/blog/${post.id}`} className="block h-full">
                <motion.div
                  className="bg-zinc-900/80 backdrop-blur-lg rounded-xl p-0 shadow-xl border border-zinc-700 hover:shadow-pink-500/30 transition-all duration-300 h-full flex flex-col hover:scale-[1.02] overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  {post.thumbnail && (
                    <div className="aspect-[3/2] w-full overflow-hidden rounded-t-xl">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                        <span>{post.category}</span>
                        <span>{post.readingTime || "3 min read"}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Rocket className="text-pink-500" size={18} />
                        <h2 className="text-lg font-semibold text-pink-400 line-clamp-2">
                          {post.title}
                        </h2>
                      </div>

                      <p className="text-zinc-300 text-sm mb-4 line-clamp-4">
                        {post.content.replace(/[#>*`]/g, "").slice(0, 180)}...
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-1 rounded-full flex items-center ${
                            tagColors[tag] || "bg-pink-600"
                          } text-white`}
                        >
                          {tagIcons[tag]} {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 text-sm text-pink-500 hover:underline">
                      Read more →
                    </div>
                  </div>
                </motion.div>
              </Link>
            </Tilt>
          ))
        ) : (
          <p className="text-zinc-400 text-center col-span-full">
            No blog posts match your search or tag.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition border border-zinc-600 ${
                currentPage === i + 1
                  ? "bg-pink-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
