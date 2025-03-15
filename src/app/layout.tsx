import type { Metadata } from "next";
import { Inspiration } from "next/font/google";
import "./globals.css";
import LenisScrollProvider from "@/components/LenisScrollProvider";

const inspiration = Inspiration({ 
  variable: "--font-inspiration", 
  weight: "400", 
  subsets: ["latin"], 
  display: "swap" 
});

export const metadata: Metadata = {
  title: "Suraj",
  description: "Portfolio of Suraj",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inspiration.variable} antialiased`}
      >
        <LenisScrollProvider>
          <div className="min-h-screen w-full flex flex-col items-center px-4 sm:px-6 md:px-12">
            {children}
          </div>
        </LenisScrollProvider>
      </body>
    </html>
  );
}
