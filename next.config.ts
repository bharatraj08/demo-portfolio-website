import type { NextConfig } from "next";

// GitHub Pages serves this repo from /<repo-name>. The deploy workflow passes the
// right base path in; locally it is empty so `npm run dev` works at localhost:3000.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
