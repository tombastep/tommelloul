import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Tom Melloul - Architect & Designer',
  description: 'Portfolio of architectural and design projects by Tom Melloul',
  keywords: 'architecture, design, portfolio, Tom Melloul',
  authors: [{ name: 'Tom Melloul' }],
  creator: 'Tom Melloul',
  publisher: 'Tom Melloul',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tommelloul.com',
    siteName: 'Tom Melloul Portfolio',
    title: 'Tom Melloul - Architect & Designer',
    description: 'Portfolio of architectural and design projects by Tom Melloul',
    images: [
      {
        url: '/images/Presentation.jpg',
        width: 1200,
        height: 630,
        alt: 'Tom Melloul Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tom Melloul - Architect & Designer',
    description: 'Portfolio of architectural and design projects by Tom Melloul',
    images: ['/images/Presentation.jpg'],
  },
  metadataBase: new URL('https://tommelloul.com'),
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <link rel="canonical" href="https://tommelloul.com" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}