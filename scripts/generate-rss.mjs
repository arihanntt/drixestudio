import fs from "fs";
import path from "path";
import { Feed } from "feed";
import { blogPosts } from "../src/components/blogData.js";
import { fileURLToPath } from "url";

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base site URL
const siteUrl = "https://www.drixestudio.services";

function generateRssFeed() {
  const feed = new Feed({
    title: "Drixe Studio Blog",
    description: "Explore our latest design and development insights, tips, and updates.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Drixe Studio`,
  });

  blogPosts.forEach((post) => {
    const fullImageUrl = post.thumbnail?.startsWith("http")
      ? post.thumbnail
      : `${siteUrl}${post.thumbnail}`;

    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.id}`,
      link: `${siteUrl}/blog/${post.id}`,
      description: post.description || "",
      date: new Date(post.date || Date.now()),
      image: fullImageUrl,
    });
  });

  fs.writeFileSync(path.join(__dirname, "../public/rss.xml"), feed.rss2());
  console.log("✅ RSS feed generated: /public/rss.xml");
}

generateRssFeed();
