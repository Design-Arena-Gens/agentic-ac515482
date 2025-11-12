import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hello Atlas",
  description:
    "Craft bespoke multilingual greetings with live time-of-day inspiration.",
  metadataBase: new URL("https://agentic-ac515482.vercel.app"),
  openGraph: {
    title: "Hello Atlas",
    description:
      "Craft bespoke multilingual greetings with live time-of-day inspiration.",
    url: "https://agentic-ac515482.vercel.app",
    siteName: "Hello Atlas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Atlas",
    description:
      "Craft bespoke multilingual greetings with live time-of-day inspiration.",
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
      </body>
    </html>
  );
}
