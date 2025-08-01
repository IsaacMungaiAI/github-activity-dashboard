import type { Metadata } from "next";
import "./globals.css";
//import { cn } from "@/lib/utils";
import { Geist, Geist_Mono, Inter } from "next/font/google";
//import '@fontsource/inter/variable.css';
import { ThemeProvider } from "@/components/theme-provider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
