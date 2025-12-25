import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { blogPosts } from "@/components/blogData";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Components } from "react-markdown";

export const dynamic = "force-static";

type PageParams = {
  params: Promise<{ id: string }>;
};

const estimateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return `${Math.ceil(words / wordsPerMinute)} min read`;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return { title: "404 Not Found" };

  return {
    title: `${post.title} | Drixe Studio Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.thumbnail],
      url: `https://www.drixestudio.services/blog/${post.id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.thumbnail],
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

// CSS-only animated markdown components
const markdownComponents: Components = {
  code({ inline, className, children, ...props }: any) {
    return inline ? (
      <code
        className={`relative bg-gray-900 px-2 py-1 rounded-md font-mono text-sm text-blue-300 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-600/30 before:to-purple-600/30 before:rounded-md before:-z-10 ${className || ""}`}
        {...props}
      >
        {children}
      </code>
    ) : (
      <div className="relative my-8 animate-fade-in">
        <div className="relative bg-gray-900/95 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
          <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-800">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-xs text-gray-400">Code snippet</div>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className={`text-sm text-gray-300 ${className || ""}`} {...props}>
              {children}
            </code>
          </pre>
        </div>
      </div>
    );
  },
  img({ ...props }) {
    return (
      <div className="my-10 relative aspect-[3/2] animate-fade-in">
        <div className="relative overflow-hidden rounded-xl border border-gray-800 shadow-xl h-full">
          <img 
            className="w-full h-full object-cover" 
            {...props} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-sm text-gray-300">{props.alt || "Image"}</p>
          </div>
        </div>
      </div>
    );
  },
  a({ href, children, ...props }) {
    return (
      <a
        href={href}
        className="relative text-blue-400 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:bg-blue-400"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  h1({ children }) {
    return (
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-16 mb-8 leading-tight relative animate-fade-in-up">
        <span className="relative inline-block">
          <span className="relative bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {children}
          </span>
        </span>
      </h1>
    );
  },
  h2({ children }) {
    return (
      <h2 className="text-3xl font-bold mt-12 mb-6 leading-tight relative animate-fade-in-up">
        <span className="relative inline-block">
          <span className="relative bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {children}
          </span>
        </span>
      </h2>
    );
  },
  h3({ children }) {
    return <h3 className="text-2xl font-semibold mt-10 mb-5 text-white/90 animate-fade-in">{children}</h3>;
  },
  ul({ children }) {
    return (
      <ul className="my-6 space-y-3 animate-fade-in">
        {React.Children.map(children, (child) => (
          <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-2 before:bg-blue-500 before:rounded-full">
            {child}
          </li>
        ))}
      </ul>
    );
  },
  ol({ children }) {
    return (
      <ol className="my-6 space-y-3 list-decimal list-inside marker:text-blue-400 marker:font-bold animate-fade-in">
        {children}
      </ol>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="relative my-8 pl-8 italic text-white/90 border-l-4 border-blue-500 bg-gradient-to-r from-blue-900/20 to-transparent py-4 rounded-r-lg animate-fade-in">
        <svg
          className="absolute left-2 top-0 w-6 h-6 text-blue-500 opacity-30"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clipRule="evenodd"
          />
        </svg>
        {children}
      </blockquote>
    );
  },
  p({ children }) {
    return <p className="my-6 text-white/80 leading-relaxed animate-fade-in">{children}</p>;
  },
};
function ArticleSchema({ post }: { post: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.thumbnail
      ? [`https://www.drixestudio.services${post.thumbnail}`]
      : [],
    author: {
      "@type": "Organization",
      name: "Drixe Studio",
      url: "https://www.drixestudio.services",
    },
    publisher: {
      "@type": "Organization",
      name: "Drixe Studio",
      logo: {
        "@type": "ImageObject",
        url: "https://www.drixestudio.services/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.drixestudio.services/blog/${post.id}`,
    },
    keywords: post.keywords?.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function SingleBlogPage({ params }: PageParams) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return notFound();

  const shareLinks = [
    {
      name: "Twitter",
      icon: "🐦",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://www.drixestudio.services/blog/${post.id}`
    },
    {
      name: "LinkedIn",
      icon: "🔗",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=https://www.drixestudio.services/blog/${post.id}`
    },
    {
      name: "Facebook",
      icon: "👍",
      url: `https://www.facebook.com/sharer/sharer.php?u=https://www.drixestudio.services/blog/${post.id}`
    }
  ];

  return (

    <>
    {/* ✅ SEO JSON-LD GOES HERE */}
    <ArticleSchema post={post} />
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Global CSS Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>

      {/* Floating Particles Background (CSS-only) */}
      <div className="fixed inset-0 overflow-hidden -z-50 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: "float 10s linear infinite",
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* 🌟 Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 -z-10"></div>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-4 mb-6 animate-fade-in">
            <Link href="/blog" className="flex items-center text-sm text-blue-400">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              All Articles
            </Link>
            <span className="text-sm text-gray-400">/</span>
            <span className="text-sm text-gray-400">{post.category || "General"}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in-up">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-xs font-bold">DS</span>
              </div>
              <div>
                <p className="text-sm font-medium">Drixe Studio</p>
                <p className="text-xs text-gray-400">{post.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-400">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {estimateReadingTime(post.content)}
              </div>
              <span className="px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-400 rounded-full">
                {post.category || "General"}
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl mb-16 aspect-[3/2] animate-fade-in">
            {post.thumbnail && (
              <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 📝 Article Content */}
      <article className="max-w-3xl mx-auto px-6 pb-20 relative">
        {/* Main content */}
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Social sharing */}
        <div className="mt-12 pt-8 border-t border-gray-800 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share this post
          </h3>
          <div className="flex flex-wrap gap-4">
            {shareLinks.map((platform, index) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mr-2">{platform.icon}</span>
                {platform.name}
              </a>
            ))}
          </div>
        </div>
      </article>

      {/* 💎 Author Bio */}
      <section className="max-w-3xl mx-auto px-6 pb-20 animate-fade-in">
        <div className="border-t border-gray-800 pt-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
              <span className="text-xl font-bold">DS</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">About Drixe Studio</h3>
              <p className="text-gray-400 mb-4">
                We create stunning digital experiences that push boundaries and deliver results.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Next Article CTA */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-950 border-t border-b border-gray-800 py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Keep Reading</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Explore more articles from our collection of insights and tutorials.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium"
          >
            Browse All Articles
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}