import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedDown — Free LinkedIn Video Downloader",
  description:
    "Download LinkedIn videos in the best quality, no limits and for free. No account required. Works on all devices.",
  keywords: [
    "LinkedIn video downloader",
    "download LinkedIn video",
    "LinkedIn video saver",
    "free video downloader",
  ],
  openGraph: {
    title: "LinkedDown — Free LinkedIn Video Downloader",
    description:
      "Download LinkedIn videos in the best quality, no limits and for free.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
