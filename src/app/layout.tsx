import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevSyntix | Building Digital Experiences. Engineering Tomorrow.",
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
    title: "DevSyntix | Building Digital Experiences. Engineering Tomorrow.",
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
    title: "DevSyntix | Building Digital Experiences. Engineering Tomorrow.",
    description:
      "We transform ideas into powerful digital products through innovative software engineering, intelligent automation, and scalable SaaS solutions.",
    images: ["/brand/banner.png"],
    creator: "@DevSyntix",
  },
  icons: {
    icon: "/brand/logo-icon.jpg",
    apple: "/brand/logo-icon.jpg",
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
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#030308] text-gray-100 antialiased selection:bg-cyan-500/30 selection:text-white flex flex-col">
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
