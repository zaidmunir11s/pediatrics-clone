import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Serve the reference's original image files untouched, as the live site does.
  images: { unoptimized: true },
  // Hide the dev-only Next.js badge so it isn't mistaken for page UI during visual review.
  devIndicators: false,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
