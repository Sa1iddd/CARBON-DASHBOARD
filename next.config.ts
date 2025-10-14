import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["super.universitaspertamina.ac.id"],
  },
};

export default nextConfig;
