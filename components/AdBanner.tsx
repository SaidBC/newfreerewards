"use client";

import { useEffect, useRef, useState } from "react";
import { Spinner } from "./ui/spinner";
import clientEnv from "@/utils/clientEnv";

interface AdConfigs {
  apiKey: string;
  width: number;
  height: number;
}

interface AdBannerProps {
  className?: string;
  delay?: number;
  adConfigs: AdConfigs[];
}

export default function AdBanner({
  className,
  adConfigs,
  delay = 0,
}: AdBannerProps) {
  const isDev = clientEnv.NEXT_PUBLIC_NODE_ENV === "development";
  const containerClass =
    "relative bg-card border border-border rounded-lg shadow-sm overflow-hidden min-w-[320px]";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isDev || scriptLoadedRef.current) return;

    const doLoad = () => {
      if (scriptLoadedRef.current) return;

      const containerWidth = container.offsetWidth;
      if (containerWidth === 0) return;

      scriptLoadedRef.current = true;

      const sortedConfigs = [...adConfigs].sort((a, b) => b.width - a.width);
      const selectedConfig = sortedConfigs.find(
        (config) => containerWidth + 2 >= config.width,
      );
      const finalConfig =
        selectedConfig || sortedConfigs[sortedConfigs.length - 1];

      if (!finalConfig || !finalConfig.apiKey) {
        setIsBlocked(true);
        setIsLoading(false);
        return;
      }

      const bait = document.createElement("div");
      bait.className = `adsbygoogle banner-ad ad-unit ad-slot advertisement sponsored ad-check`;
      bait.style.height = "1px";
      bait.style.width = "1px";
      bait.style.position = "absolute";
      bait.style.left = "-9999px";
      document.body.appendChild(bait);

      const adBlockDetected =
        window.getComputedStyle(bait).display === "none" ||
        bait.offsetParent === null;
      document.body.removeChild(bait);

      if (adBlockDetected) {
        setIsBlocked(true);
        setIsLoading(false);
        return;
      }

      const { apiKey, width, height } = finalConfig;

      const optionsScript = document.createElement("script");
      optionsScript.innerHTML = `
      window.atOptions = {
        'key': '${apiKey}',
        'format': 'iframe',
        'height': ${height},
        'width': ${width},
        'params': {}
      };`;

      const adScript = document.createElement("script");
      adScript.src = `//www.highrevenueformat.com/${apiKey}/invoke.js`;
      adScript.async = true;

      const fragment = document.createDocumentFragment();
      fragment.appendChild(optionsScript);
      fragment.appendChild(adScript);
      container.appendChild(fragment);

      const check = setInterval(() => {
        const iframe = container.querySelector("iframe");
        if (iframe) {
          setLoaded(true);
          setIsLoading(false);
          clearInterval(check);
        }
      }, 150);

      const timeout = setTimeout(() => {
        clearInterval(check);
        setIsBlocked(true);
        setIsLoading(false);
      }, 5000);

      return () => {
        clearInterval(check);
        clearTimeout(timeout);
      };
    };

    const cleanup = doLoad();
    return cleanup;
  }, [adConfigs, delay, isDev]);

  return (
    <div className={className}>
      {isLoading && !isBlocked && !isDev && (
        <div className={containerClass}>
          <div className="absolute inset-0 flex gap-2 items-center justify-center text-xs text-muted-foreground">
            <Spinner className="size-6" />
            <span>Loading ad…</span>
          </div>
        </div>
      )}
      {isBlocked && !isDev && (
        <div className={containerClass}>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-sm text-muted-foreground bg-card">
            <p className="font-medium">Ad blocked 🙁</p>
            <p className="text-xs opacity-70 mt-1">
              Please consider disabling your ad blocker — it helps support
              NewFreeRewards and keeps the platform free ❤️
            </p>
          </div>
        </div>
      )}
      {isDev && (
        <div className={containerClass}>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-sm text-muted-foreground bg-card">
            <p className="font-medium">Ad blocked 🙁</p>
            <p className="text-xs opacity-70 mt-1">
              You are in developement mode
            </p>
          </div>
        </div>
      )}
      <div
        className={containerClass}
        style={{ opacity: loaded ? 1 : 0 }}
        ref={containerRef}
      ></div>
    </div>
  );
}
