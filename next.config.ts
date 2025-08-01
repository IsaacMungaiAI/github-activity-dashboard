import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ✅ This disables Turbopack for the dev server
  
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
