"use client";

import AdBanner from "./AdBanner";
import clientEnv from "@/utils/clientEnv";

export default function AdsterraBanner({ className }: { className?: string }) {
  const adConfigs = [
    {
      apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_728X90_API_KEY,
      width: 728,
      height: 90,
    },
    {
      apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_468X60_API_KEY,
      width: 468,
      height: 60,
    },
    {
      apiKey: clientEnv.NEXT_PUBLIC_ADSTERRA_BANNER_320X50_API_KEY,
      width: 320,
      height: 50,
    },
  ];
  return <AdBanner adConfigs={adConfigs} className={className} />;
}
