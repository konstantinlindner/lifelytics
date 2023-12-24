export const dynamic = 'force-dynamic';

import '@/styles/globals.css';
import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils';

import { ThemeProvider } from '@/components/themeProvider';
import { ProfileProvider } from '@/contexts/ProfileContext';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = localFont({
  src: './assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://life.konstantin.app'),
  title: {
    default: 'Lifelytics',
    template: `%s | Lifelytics`,
  },
  description: 'A base for productivity and financial well being.',
  keywords: ['Financial', 'Budget', 'Tool', 'Expense', 'Tracker'],
  authors: [
    {
      name: 'Konstantin Lindner',
      url: 'https://konstantinlindner.com',
    },
  ],
  creator: 'Konstantin Lindner',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'life.konstantin.app',
    title: 'Lifelytics',
    description: 'A base for productivity and financial well being.',
    siteName: 'Lifelytics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lifelytics',
    description: 'A base for productivity and financial well being.',
    images: '/og.png',
    creator: '@konstantinlindner',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProfileProvider>{children}</ProfileProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
