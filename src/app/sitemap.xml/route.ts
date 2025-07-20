import { NextResponse } from 'next/server';
import { blogPosts } from '@/components/blogData';

interface Route {
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

interface BlogPost {
  id: string;
  date: string;
  updatedDate?: string;
}

export async function GET() {
  const baseUrl = 'https://www.drixestudio.services';
  const currentDate = new Date().toISOString();

  // Static routes with priority and changefreq
  const staticRoutes: Route[] = [
    { path: '', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
    { path: '/whyus', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { path: '/plans', priority: '0.9', changefreq: 'monthly', lastmod: currentDate },
    { path: '/faq', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
    { path: '/contact', priority: '0.7', changefreq: 'yearly', lastmod: currentDate },
    { path: '/blog', priority: '0.9', changefreq: 'daily', lastmod: currentDate },
  ];

  // Blog posts with dynamic priorities (newer posts get higher priority)
  const blogRoutes: Route[] = (blogPosts as BlogPost[]).map((post) => {
    const postDate = new Date(post.date);
    const daysOld = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    
    // Calculate priority: newer posts (<=30 days) get 0.8, older get 0.6
    const priority = daysOld <= 30 ? '0.8' : '0.6';
    
    return {
      path: `/blog/${post.id}`,
      priority,
      changefreq: 'weekly',
      lastmod: post.updatedDate || post.date
    };
  });

  // Combine all routes
  const allRoutes: Route[] = [...staticRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${allRoutes
      .map(
        (route) => `
      <url>
        <loc>${baseUrl}${route.path}</loc>
        <lastmod>${route.lastmod}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
      </url>`
      )
      .join('')}
  </urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate' // Cache for 1 day
    },
  });
}