import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import LayoutWrapper from '../components/LayoutWrapper';
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper"; 
import type { Metadata, Viewport } from 'next';

// Clean, professional sans-serif for body
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Technical mono-space for specs and PHASE_ labels
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: 'Drixe Studio | Custom Web Development & Discord Server Setup',
  description: 'Drixe Studio specialize in building custom Next.js websites, professional Discord server , and high-retention content systems.',
  keywords: [
    'Drixe Studio', 
    'Discord server setup', 
    'Website development agency', 
    'Next.js developer', 
    'Professional Discord designer',
    'Short form video editing systems'
  ],
  metadataBase: new URL('https://www.drixestudio.services'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Drixe Studio | Custom Web Development & Discord Server Setup',
    description: 'Custom Discord server and high-performance web systems.',
    url: 'https://www.drixestudio.services',
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
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} bg-black`}>
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

        {/* Structured Data - Refined for Organization Authority */}
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Drixe Studio',
            url: 'https://www.drixestudio.services',
            image: 'https://www.drixestudio.services/drixe-preview.png',
            description: 'Elite digital laboratory specializing in Next.js web systems and Discord community engineering.',
            address: {
              '@type': 'PostalAddress',
              'addressCountry': 'IN'
            },
            areaServed: 'Worldwide',
            priceRange: '$$$'
          })}
        </Script>
      </head>
      
      <body className="bg-black text-white antialiased selection:bg-cyan-500 selection:text-black">
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