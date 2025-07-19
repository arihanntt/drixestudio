import { NextResponse } from 'next/server';
import { blogPosts } from '@/components/blogData'; // adjust the import path

export async function GET() {
  const baseUrl = 'https://www.drixestudio.services';

  const staticRoutes = ['', '/whyus', '/plans', '/faq', '/contact', '/blog'];
  const blogRoutes = blogPosts.map((post) => `/blog/${post.id}`);
  const allRoutes = [...staticRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map(
        (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`
      )
      .join('')}
  </urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
