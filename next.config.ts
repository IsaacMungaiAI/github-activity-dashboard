import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ✅ This disables Turbopack for the dev server
  future: {
    unstable_dev: {
      // 👇 this line disables Turbopack
      bundler: "webpack",
    },
  },
};

export default nextConfig;
