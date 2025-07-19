import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { blogPosts } from '@/components/blogData'; // Correct reference to blogdata.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Components } from 'react-markdown';

// ✅ Mark the route as static (keep this, but we'll also await params)
export const dynamic = 'force-static';

type PageParams = {
  params: Promise<{ id: string }>; // Update type to reflect async params
};

const estimateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return `${Math.ceil(words / wordsPerMinute)} min read`;
};

// ✅ Dynamic metadata (made async to await params)
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { id } = await params; // Await params
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return { title: '404 Not Found' };

  return {
    title: `${post.title} | Drixe Studio Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.thumbnail],
      url: `https://www.drixestudio.services/blog/${post.id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.thumbnail],
    },
  };
}

// ✅ Static routes
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

// ✅ Markdown styling
const markdownComponents: Components = {
  code({ inline, className, children, ...props }: any) {
    return inline ? (
      <code
        className={`bg-black/40 px-1 py-0.5 rounded font-mono text-sm text-blue-300 ${className || ''}`}
        {...props}
      >
        {children}
      </code>
    ) : (
      <pre className="bg-black/50 p-4 rounded-md overflow-x-auto my-4">
        <code className={`text-sm text-blue-300 ${className || ''}`} {...props}>
          {children}
        </code>
      </pre>
    );
  },
  img({ ...props }) {
    return (
      <div className="my-8">
        <img
          className="rounded-xl w-full object-cover shadow-lg hover:scale-[1.01] transition duration-300"
          {...props}
        />
      </div>
    );
  },
  a({ href, children, ...props }) {
    return (
      <a
        href={href}
        className="text-blue-400 underline hover:text-blue-300 transition"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  h1({ children }) {
    return <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>;
  },
  ul({ children }) {
    return <ul className="list-disc ml-6 my-4">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="list-decimal ml-6 my-4">{children}</ol>;
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-white/80 my-6">
        {children}
      </blockquote>
    );
  },
};

// ✅ Blog page (made async to await params)
export default async function SingleBlogPage({ params }: PageParams) {
  const { id } = await params; // Await params
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return notFound();

  return (
    <div className="min-h-screen px-4 pt-32 pb-16 max-w-3xl mx-auto text-white animate-fadeIn">
      {/* 🧠 Header */}
      <div className="relative mb-10 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[#141b2b] to-[#1f2a3f] shadow-lg border border-white/10">
        <div className="mb-2">
          <span className="bg-blue-600/80 text-white text-xs uppercase font-semibold tracking-wide px-3 py-1 rounded-full shadow-md">
            {post.category ?? 'General'}
          </span>
        </div>
        <Link href="/blog" className="text-sm text-blue-400 underline inline-block mb-3">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{post.title}</h1>
        <div className="text-sm text-white/60 flex justify-between items-center">
          <p>{post.date}</p>
          <p>{estimateReadingTime(post.content)}</p>
        </div>
      </div>

      {/* 📄 Content */}
      <div className="bg-[#101522]/80 rounded-2xl p-6 md:p-8 border border-white/10 backdrop-blur-md shadow-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={markdownComponents}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* 📤 Share */}
      <div className="mt-16 border-t border-white/10 pt-6 text-sm text-white/80">
        <p className="mb-2 font-semibold">📤 Enjoyed this post? Share it:</p>
        <div className="flex gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.title
            )}&url=https://www.drixestudio.services/blog/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            🐦 Twitter
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.drixestudio.services/blog/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            🔗 LinkedIn
          </a>
        </div>
      </div>

      {/* 🔁 Explore More */}
      <div className="mt-20 text-center text-white/80 border-t border-white/10 pt-10">
        <p className="text-sm mb-3">Want to read more?</p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white shadow-lg transition"
        >
          Browse All Posts →
        </Link>
      </div>
    </div>
  );
}