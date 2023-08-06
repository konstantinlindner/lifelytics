import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Lifelytics",
    template: `%s | Lifelytics`,
  },
  description: "A base for productivity and financial well being.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "Konstantin Lindner",
      url: "https://konstantinlindner.com",
    },
  ],
  creator: "Konstantin Lindner",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "life.konstantin.app",
    title: "Lifelytics",
    description: "A base for productivity and financial well being.",
    siteName: "Lifelytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lifelytics",
    description: "A base for productivity and financial well being.",
    images: "https://life.konstantin.app/og.jpg",
    creator: "@konstantinlindner",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
