import type { NextConfig } from "next";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
const storageHostname = storageUrl ? new URL(storageUrl).hostname : null;

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: storageHostname
      ? [
          {
            protocol: "https",
            hostname: storageHostname,
          },
          {
            protocol: "http",
            hostname: storageHostname,
          },
        ]
      : [],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/en",
      },
      {
        source:
          "/:path((?!en|es|ar|api|_next|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
        destination: "/en/:path",
      },
    ];
  },
};

module.exports = nextConfig;

export default nextConfig;
