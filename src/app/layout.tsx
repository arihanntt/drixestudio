// app/layout.tsx

import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClientHelmetProvider from '../components/ClientHelmetProvider';
import LayoutWrapper from '../components/LayoutWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drixe Studio | Premium Discord Server Setups',
  description: 'Drixe Studio builds custom Discord servers with bots, moderation, automation & style.',
  keywords: [
    'Drixe Studio',
    'Discord server setup',
    'Discord server design',
    'custom Discord',
    'Discord bots',
    'moderation',
    'role setup',
    'Drixe services',
  ],
  authors: [{ name: 'Drixe Studio' }],
  openGraph: {
    title: 'Drixe Studio | Discord Server Setup Experts',
    description: 'Custom, stylish, and functional Discord server setups — perfect for communities, creators, and brands.',
    url: 'https://drixestudio.services',
    siteName: 'Drixe Studio',
    images: [
      {
        url: 'https://drixestudio.services/drixe-preview.png',
        width: 1200,
        height: 630,
        alt: 'Drixe Studio Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drixe Studio | Discord Server Setup Experts',
    description: 'Custom, stylish, and functional Discord server setups — perfect for communities, creators, and brands.',
    images: ['https://drixestudio.services/drixe-preview.png'],
  },
  metadataBase: new URL('https://drixestudio.services'),
  icons: {
    icon: '/drixe-icon.png',
    apple: '/drixe-icon.png',
  },
  themeColor: '#5f4ab4',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon & Apple Icon fallback */}
        <link rel="icon" href="/drixe-icon.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="/drixe-icon.png" />

        {/* ✅ Mobile Web App Config */}
        <meta name="theme-color" content="#5f4ab4" />
        <meta name="apple-mobile-web-app-title" content="Drixe Studio" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href="https://drixestudio.services/" />

        {/* ✅ Fonts Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ✅ GA4 Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PB0HBP3GY2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PB0HBP3GY2');
            `,
          }}
        />

        {/* ✅ Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Drixe Studio',
              url: 'https://drixestudio.services',
              logo: 'https://drixestudio.services/drixe-icon.png',
              sameAs: ['https://www.instagram.com/drixestudio/'],
            }),
          }}
        />

        {/* ✅ Structured Data: ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Drixe Studio',
              url: 'https://drixestudio.services',
              image: 'https://drixestudio.services/drixe-preview.png',
              description:
                'Premium Discord server design and setup services — roles, bots, UI, moderation, branding.',
              areaServed: 'Worldwide',
              availableLanguage: 'English',
              serviceType: 'Discord server setup and design',
            }),
          }}
        />
      </head>
      <body className="bg-black text-white">
        <ClientHelmetProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <SpeedInsights />
        </ClientHelmetProvider>
      </body>
    </html>
  );
}
