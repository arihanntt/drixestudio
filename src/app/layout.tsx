import './globals.css';
import { Playfair_Display, Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import LayoutWrapper from '../components/LayoutWrapper';
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper"; 
import type { Metadata, Viewport } from 'next';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap', // ✅ Adds performance by swapping font faster
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: 'Drixe Studio | Digital Systems & Web Architecture',
  description: 'Premium Discord server design, high-performance websites, and content infrastructure for creators and brands.',
  keywords: ['Drixe Studio', 'Discord server setup', 'Web Architecture', 'Next.js developer'],
  metadataBase: new URL('https://drixestudio.services'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Drixe Studio | Digital Architecture',
    description: 'Custom Discord ecosystems and high-performance websites.',
    url: 'https://drixestudio.services',
    siteName: 'Drixe Studio',
    images: [{ url: '/drixe-preview.png', width: 1200, height: 630 }],
    type: 'website',
  },
  icons: {
    icon: '/drixe-icon.png',
    apple: '/drixe-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ❌ REMOVED: "scroll-smooth" class (It causes conflict with Lenis)
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* GA4 Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PB0HBP3GY2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PB0HBP3GY2');
          `}
        </Script>

        {/* Structured Data */}
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Drixe Studio',
            url: 'https://drixestudio.services',
            image: 'https://drixestudio.services/drixe-preview.png',
            description: 'Premium Discord server design and web architecture.',
            address: {
              '@type': 'PostalAddress',
              'addressCountry': 'IN'
            },
            areaServed: 'Worldwide',
            priceRange: '$$'
          })}
        </Script>
      </head>
      
      {/* ✅ Added transform-gpu to force hardware acceleration on the body */}
     <body className="bg-[#0a0a0a] text-white antialiased">

  <LayoutWrapper>
    <SmoothScrollWrapper>
      {children}
    </SmoothScrollWrapper>
  </LayoutWrapper>

  <SpeedInsights />

</body>
    </html>
  );
}