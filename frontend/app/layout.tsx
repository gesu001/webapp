import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { PreferencesProvider } from "@/app/context/PreferencesContext";
import Header from "@/app/components/Header";
import Navigation from "@/app/components/Navigation";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Footer from "@/app/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RSS2LMS - Assessment 2",
  description: "API-driven RSS server and database-backed client for the LMS workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen bg-white dark:bg-black">
        <ThemeProvider>
          <PreferencesProvider>
            <Header />
            <Navigation />
            <Breadcrumbs />
            <main className="flex-1 w-full bg-white dark:bg-black">
              {children}
            </main>
            <Footer />
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
