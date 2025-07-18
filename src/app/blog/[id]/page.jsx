'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { blogPosts } from '@/components/blogData';

const estimateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return `${Math.ceil(words / wordsPerMinute)} min read`;
};

export default function SingleBlogPage() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
    window.scrollTo(0, 0);
    if (post) {
      document.title = `${post.title} | Blog`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">404 - Blog Not Found</h1>
        <p className="opacity-60 mb-6">We couldn't find the blog you're looking for.</p>
        <Link href="/blog" className="text-blue-400 underline">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Drixe Studio Blog</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords?.join(', ')} />
        <meta name="author" content={post.author} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.thumbnail} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.thumbnail} />
        <meta name="twitter:creator" content="@drixestudio" />
        <link rel="canonical" href={url} />
      </Head>

      <div className="min-h-screen px-4 pt-32 pb-16 max-w-3xl mx-auto text-white animate-fadeIn">
        {/* Header */}
        <div className="relative mb-10 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[#141b2b] to-[#1f2a3f] shadow-lg border border-white/10">
          <div className="mb-2">
            <span className="bg-blue-600/80 text-white text-xs uppercase font-semibold tracking-wide px-3 py-1 rounded-full shadow-md">
              {post.category ?? 'General'}
            </span>
          </div>
          <Link href="/blog" className="text-sm text-blue-400 underline inline-block mb-3">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            {post.title}
          </h1>
          <div className="text-sm text-white/60 flex justify-between items-center">
            <p>{post.date}</p>
            <p>{estimateReadingTime(post.content)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#101522]/80 rounded-2xl p-6 md:p-8 border border-white/10 backdrop-blur-md shadow-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                return (
                  <code
                    className="bg-black/40 px-2 py-1 rounded-md font-mono text-sm text-blue-300"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              img({ node, ...props }) {
                return (
                  <div className="my-8">
                    <img
                      className="rounded-xl w-full object-cover shadow-lg hover:scale-[1.01] transition duration-300"
                      {...props}
                    />
                  </div>
                );
              },
              h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>,
              ul: ({ children }) => <ul className="list-disc ml-6 my-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal ml-6 my-4">{children}</ol>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-white/80 my-6">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-blue-400 underline hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Share */}
        <div className="mt-16 border-t border-white/10 pt-6 text-sm text-white/80">
          <p className="mb-2 font-semibold">📤 Enjoyed this post? Share it:</p>
          <div className="flex gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              🐦 Twitter
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              🔗 LinkedIn
            </a>
          </div>
        </div>

        {/* Explore More */}
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
    </>
  );
}
