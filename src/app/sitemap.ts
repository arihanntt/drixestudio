import { MetadataRoute } from 'next';
import { blogPosts } from '@/components/blogData';

// This is the "Official" Next.js way
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.drixestudio.services';
  const currentDate = new Date();

  // 1. Static Money Pages (The ones that make you $$, get 1.0/0.9 priority)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/discord-server-setup`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/plans`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/whyus`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
  ];

  // 2. Dynamic Blog Pages
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post: any) => {
    const postDate = new Date(post.date);
    const daysOld = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    
    // Newer blogs are crawled more often
    return {
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.updatedDate || post.date),
      changeFrequency: daysOld <= 30 ? 'daily' : 'monthly',
      priority: daysOld <= 30 ? 0.7 : 0.5,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}