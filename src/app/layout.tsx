import type { Metadata } from "next";
import { Inspiration } from "next/font/google";
import "./globals.css";
import LenisScrollProvider from "@/components/LenisScrollProvider";


const inspiration = Inspiration({ variable: "--font-inspiration", weight: '400', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: "Suraj",
  description: "Portfolio of Suraj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inspiration.variable} antialiased`}
      >
        <LenisScrollProvider>{children}</LenisScrollProvider>
      </body>
    </html>
  );
}
