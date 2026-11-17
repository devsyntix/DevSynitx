import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DevSyntix — Building Digital Experiences. Engineering Tomorrow.",
  description:
    "We transform ideas into powerful digital products through innovative software engineering, intelligent automation, and scalable SaaS solutions.",
  keywords: [
    "DevSyntix",
    "Software Development",
    "SaaS Products",
    "Custom Software",
    "Cloud Architecture",
    "AI Automation",
    "Web Applications",
    "Next.js Development",
  ],
  authors: [{ name: "DevSyntix Engineering" }],
  creator: "DevSyntix",
  metadataBase: new URL("https://devsyntix.com"),
  openGraph: {
    title: "DevSyntix — Building Digital Experiences. Engineering Tomorrow.",
    description:
      "We transform ideas into powerful digital products through innovative software engineering, intelligent automation, and scalable SaaS solutions.",
    url: "https://devsyntix.com",
    siteName: "DevSyntix",
    images: [
      {
        url: "/brand/banner.png",
        width: 1200,
        height: 630,
        alt: "DevSyntix — Software Development & SaaS Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevSyntix — Building Digital Experiences. Engineering Tomorrow.",
    description:
      "We transform ideas into powerful digital products through innovative software engineering, intelligent automation, and scalable SaaS solutions.",
    images: ["/brand/banner.png"],
    creator: "@DevSyntix",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/logo-icon.png", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth dark`}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", var(--font-inter), system-ui, sans-serif',
      }}
    >
      <body className="min-h-screen bg-black text-[#f5f5f7] antialiased selection:bg-[#29d8ff]/30 selection:text-white flex flex-col font-sans">
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
