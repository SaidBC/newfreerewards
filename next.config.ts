import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lcusyxguyutbfjyqawzi.supabase.co",
      },
      {
        protocol: "http",
        hostname: "lcusyxguyutbfjyqawzi.supabase.co",
      },
    ],
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
