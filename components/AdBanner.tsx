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
    "relative bg-card border border-border rounded-lg shadow-sm overflow-hidden w-full h-full";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [loaded, setIsLoaded] = useState(false);

  const [offsetWidth, setOffsetWidth] = useState(0);

  // Use a ResizeObserver to track container width changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize width
    setOffsetWidth(container.offsetWidth);

    const observer = new ResizeObserver((entries) => {
      // Set the width state on resize
      setOffsetWidth(entries[0].contentRect.width);
    });

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isDev) return;

    setIsLoading(true);
    setIsLoaded(false);

    if (offsetWidth === 0) {
      setIsLoading(false);
      return;
    }

    const sortedConfigs = [...adConfigs].sort((a, b) => b.width - a.width);

    // 2. Find the largest configuration that fits the current offsetWidth
    const selectedConfig = sortedConfigs.find(
      (config) => offsetWidth + 2 >= config.width
    );
    // 3. Fallback to the smallest/default size if none fit (optional, depends on your design)
    const finalConfig =
      selectedConfig || sortedConfigs[sortedConfigs.length - 1];

    if (!finalConfig || !finalConfig.apiKey) {
      setIsBlocked(true);
      setIsLoading(false);
      return;
    }

    const { apiKey, width, height } = finalConfig;

    // --- 1. Detect AdBlock ---
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

    // --- 2. Load Adsterra Script ---

    let check: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    const delaySript = setTimeout(() => {
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
      adScript.src = `//www.highperformanceformat.com/${apiKey}/invoke.js`;
      adScript.async = true;

      // Use a temporary fragment to append both scripts at once for atomicity

      const fragment = document.createDocumentFragment();

      fragment.appendChild(optionsScript);
      fragment.appendChild(adScript);
      container.appendChild(fragment);

      // --- 3. Detect loaded iframe ---

      check = setInterval(() => {
        // Look for an iframe *inside* this specific container

        const iframe = container.querySelector("iframe");
        if (iframe) {
          setIsLoaded(true);
          setIsLoading(false);
          clearInterval(check);
          clearTimeout(timeout);
        }
      }, 150);

      // Timeout: Stop checking and assume failure/block after 3 seconds

      timeout = setTimeout(() => {
        clearInterval(check);
        if (!loaded) {
          setIsBlocked(true);
          setIsLoading(false);
        }
      }, 3000);
    }, delay); // NEW: delay before loading ad script

    return () => {
      clearInterval(check);
      clearTimeout(timeout);
      clearTimeout(delaySript);
      container.innerHTML = "";
    };
  }, [offsetWidth, delay]);
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
              GGfollows and keeps the platform free ❤️
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
