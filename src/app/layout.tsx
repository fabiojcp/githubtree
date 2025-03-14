import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Repository Tree Generator",
  description:
    "Generate a dynamic SVG visualization of a GitHub repository's structure, including folders and files.",
  keywords:
    "GitHub, repository, tree, visualization, SVG, folder, file structure",
  openGraph: {
    title: "GitHub Repository Tree Generator",
    description:
      "Easily generate an SVG representation of your GitHub repository's structure.",
    url: "https://githubtree.vercel.app",
    type: "website",
    images: [
      {
        url: "https://githubtree.vercel.com/preview.png",
        width: 1200,
        height: 630,
        alt: "GitHub Repository Tree Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@fabioCasanova88",
    creator: "@fabioCasanova88",
    title: "GitHub Repository Tree Generator",
    description:
      "Easily generate an SVG representation of your GitHub repository's structure.",
    images: "https://githubtree.vercel.app/preview.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
