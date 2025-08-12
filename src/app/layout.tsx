
import type { Metadata } from "next";
import "./globals.css";
//import { cn } from "@/lib/utils";
//import { Geist, Geist_Mono } from "next/font/google";
//import '@fontsource/inter/variable.css';
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider";
import { GithubProvider } from "@/context/GithubContext";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/components/Providers";



/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

const geistSans = localFont({
  src: [
    { path: "../../public/fonts/geist/Geist-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/geist/Geist-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: [
    { path: "../../public/fonts/geist/GeistMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/geist/GeistMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-geist-mono",
});


export const metadata: Metadata = {
  title: "github-activity-dashboard",
  description: "A GitHub-integrated dashboard for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
