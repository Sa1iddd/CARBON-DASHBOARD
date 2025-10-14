<<<<<<< HEAD
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // or 'export' for static sites
};

export default nextConfig;
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['super.universitaspertamina.ac.id'],
  },
};

module.exports = nextConfig;
>>>>>>> 4b0d695 (commit)
