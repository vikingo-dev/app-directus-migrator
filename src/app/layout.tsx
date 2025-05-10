import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@styles/globals.css";
import Footer from "@sections/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Directus Migrador by VikingDev",
  description: "Migrate your development structure from Directus to Deploy in just a few steps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bgGradient`}
      >
        <Toaster richColors />
        <div className='min-h-screen flex flex-col relative bgNoiseAnimated'>
          <main className='flex-1 flex'>
            <div
              className='p-4 md:px-8 md:py-6 max-w-7xl mx-auto flex flex-col items-center justify-center'
            >
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
