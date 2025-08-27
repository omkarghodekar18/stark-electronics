import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/providers/toast-provider";
import Footer from "@/components/Footer";
import Providers from "@/components/providers";
import SkipLink from "@/components/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stark Electronics - Arduino Kits & Electronic Components",
    template: "%s | Stark Electronics"
  },
  description: "Premium Arduino starter kits, electronic components, and educational resources. Start your electronics journey with Stark Electronics - India's trusted electronics store.",
  keywords: ["arduino", "electronics", "components", "starter kit", "sensors", "microcontrollers", "DIY electronics", "India"],
  authors: [{ name: "Stark Electronics" }],
  creator: "Stark Electronics",
  publisher: "Stark Electronics",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://starkelectronics.in",
    siteName: "Stark Electronics",
    title: "Stark Electronics - Arduino Kits & Electronic Components",
    description: "Premium Arduino starter kits, electronic components, and educational resources for makers and students in India.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stark Electronics - Arduino Starter Kits"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stark Electronics - Arduino Kits & Electronic Components",
    description: "Premium Arduino starter kits, electronic components, and educational resources for makers and students.",
    images: ["/og-image.jpg"],
    creator: "@starkelectronics"
  },
  viewport: "width=device-width, initial-scale=1",
  verification: {
    google: "your-google-verification-code"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SkipLink />
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
