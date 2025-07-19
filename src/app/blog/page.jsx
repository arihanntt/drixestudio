'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { Sparkles, ShieldCheck, Rocket, Wrench, Gem, Search, ChevronLeft, ChevronRight, ArrowRight, Loader2, X } from "lucide-react";
import Image from "next/image";
import { blogPosts } from "@/components/blogData";

const tagColors = {
  Design: "from-pink-500 to-rose-500",
  Code: "from-indigo-500 to-blue-500",
  News: "from-green-500 to-emerald-500",
  Update: "from-yellow-500 to-amber-500",
  Tips: "from-purple-500 to-violet-500",
  Tutorial: "from-cyan-500 to-sky-500",
  CaseStudy: "from-orange-500 to-red-500",
};

const tagIcons = {
  Design: <Sparkles size={14} />,
  Code: <Wrench size={14} />,
  News: <ShieldCheck size={14} />,
  Update: <Rocket size={14} />,
  Tips: <Gem size={14} />,
  Tutorial: <Rocket size={14} />,
  CaseStudy: <ShieldCheck size={14} />,
};

const readingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("newest"); // 'newest' or 'popular'
  const searchRef = useRef(null);
  const postsPerPage = viewMode === "grid" ? 9 : 6;

  // Enhanced posts with calculated reading time
  const enhancedPosts = blogPosts.map(post => ({
    ...post,
    readingTime: readingTime(post.content || ""),
    date: post.date || new Date().toISOString()
  }));

  useEffect(() => {
    if (search || selectedTag) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 200);
      return () => clearTimeout(timer);
    }
  }, [search, selectedTag]);

  const filteredPosts = enhancedPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  }).sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return (b.views || 0) - (a.views || 0);
    }
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearch("");
    searchRef.current?.focus();
  };

  const allTags = [...new Set(enhancedPosts.flatMap(post => post.tags || []))];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearch("");
        setSelectedTag(null);
      }
      if (e.key === "/" && e.target.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#181818] text-white px-4 pt-32 pb-20">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#181818]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500/10 blur-[80px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-[80px] animate-float-delay" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p 
            className="text-sm uppercase tracking-widest text-pink-400 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Insights & Updates
          </motion.p>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Discover Our Knowledge
            </span>
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-zinc-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {enhancedPosts.length} articles to explore • {filteredPosts.length} matching your search
          </motion.p>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search articles... (Press '/' to focus)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl bg-zinc-900/50 backdrop-blur-sm text-white border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  layout
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center transition-all ${
                    selectedTag === tag
                      ? `${tagColors[tag]} text-white shadow-lg`
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tagIcons[tag]} {tag}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSortBy("newest")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center transition-all ${
                  sortBy === "newest" 
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg" 
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setSortBy("popular")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center transition-all ${
                  sortBy === "popular" 
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg" 
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs font-medium flex items-center transition-all"
              >
                {viewMode === "grid" ? "List View" : "Grid View"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Blog Content */}
        {isLoading ? (
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(postsPerPage)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="h-full bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden"
              >
                <div className="aspect-[3/2] bg-zinc-800/50 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-zinc-800/50 rounded w-1/3 animate-pulse" />
                  <div className="h-5 bg-zinc-800/50 rounded w-2/3 animate-pulse" />
                  <div className="h-3 bg-zinc-800/50 rounded w-full animate-pulse" />
                  <div className="h-3 bg-zinc-800/50 rounded w-4/5 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <LayoutGroup>
            <AnimatePresence mode="wait">
              {currentPosts.length > 0 ? (
                viewMode === "grid" ? (
                  <motion.div 
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    layout
                  >
                    {currentPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        onMouseEnter={() => setHoveredPost(post.id)}
                        onMouseLeave={() => setHoveredPost(null)}
                        className="relative group"
                        whileHover={{ y: -5 }}
                      >
                        <Link href={`/blog/${post.slug || post.id}`} className="block h-full">
                          <div className="h-full bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden transition-all duration-300 group-hover:border-pink-500/30 group-hover:shadow-lg group-hover:shadow-pink-500/10">
                            {post.thumbnail && (
                              <div className="aspect-[3/2] relative overflow-hidden">
                                <Image
                                  src={post.thumbnail}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  priority={currentPosts.indexOf(post) < 3}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            )}

                            <div className="p-5">
                              <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                <span>{post.readingTime} min read • {post.views || 0} views</span>
                              </div>

                              <h2 className="text-xl font-bold mb-3 line-clamp-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                {post.title}
                              </h2>

                              <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
                                {post.excerpt}
                              </p>

                              {post.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                  {post.tags.map((tag) => (
                                    <motion.span
                                      key={tag}
                                      layout
                                      className={`text-xs px-2.5 py-1 rounded-full flex items-center ${tagColors[tag]} text-white shadow-md`}
                                    >
                                      {tagIcons[tag]} {tag}
                                    </motion.span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="space-y-6 max-w-4xl mx-auto"
                    layout
                  >
                    {currentPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="relative group"
                      >
                        <Link href={`/blog/${post.slug || post.id}`} className="block">
                          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden transition-all duration-300 group-hover:border-pink-500/30 group-hover:shadow-lg group-hover:shadow-pink-500/10">
                            <div className="flex flex-col md:flex-row">
                              {post.thumbnail && (
                                <div className="md:w-1/3 aspect-video relative overflow-hidden">
                                  <Image
                                    src={post.thumbnail}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={currentPosts.indexOf(post) < 3}
                                  />
                                </div>
                              )}
                              <div className="p-6 md:w-2/3">
                                <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                                  <span>{new Date(post.date).toLocaleDateString()}</span>
                                  <span>{post.readingTime} min read • {post.views || 0} views</span>
                                </div>
                                <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                  {post.title}
                                </h2>
                                <p className="text-zinc-400 text-sm mb-4">
                                  {post.excerpt}
                                </p>
                                {post.tags?.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                      <motion.span
                                        key={tag}
                                        layout
                                        className={`text-xs px-2.5 py-1 rounded-full flex items-center ${tagColors[tag]} text-white shadow-md`}
                                      >
                                        {tagIcons[tag]} {tag}
                                      </motion.span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )
              ) : (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-5xl mb-4">😕</div>
                  <h3 className="text-xl font-medium text-zinc-300 mb-2">
                    No articles found
                  </h3>
                  <motion.button
                    onClick={() => {
                      setSearch("");
                      setSelectedTag(null);
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium text-sm hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="mt-16 flex justify-center items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={18} />
            </motion.button>

            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <motion.button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === pageNum
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {pageNum}
                </motion.button>
              );
            })}

            {totalPages > 5 && (
              <span className="px-2 text-zinc-400">...</span>
            )}

            <motion.button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(-10px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-2deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 10s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}