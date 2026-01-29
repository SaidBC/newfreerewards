import clientEnv from "@/utils/clientEnv";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: clientEnv.NEXT_PUBLIC_URL + "/sitemap.xml",
  };
}
