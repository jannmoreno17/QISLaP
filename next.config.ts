import type { NextConfig } from "next";

// The site is served from the root of https://qislap.com, so no base path is needed.
// Set NEXT_PUBLIC_BASE_PATH (e.g. "/qislap-website") only to host it under a sub-path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
