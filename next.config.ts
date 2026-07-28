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
        source: "/:locale(en|es|ar)/admin/:path*",
        destination: "/admin/:path*",
      },
      {
        source:
          "/:path((?!en|es|ar|admin|api|_next|favicon\\.ico|sitemap\\.xml|robots\\.txt|ads\\.txt|googleb4dbf7b15189f25e\\.html|site\\.webmanifest|android-chrome-.*\\.png|apple-touch-icon\\.png|favicon-.*\\.png|sw\\.js|.*\\..*).*)",
        destination: "/en/:path",
      },
    ];
  },
};

module.exports = nextConfig;

export default nextConfig;
