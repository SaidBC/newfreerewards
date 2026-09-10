"use client";

import { useEffect } from "react";

const SMARTLINK_URL = "https://omg10.com/4/11769152";

export default function SmartlinkPopunder() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const triggerElement = target.closest('[data-trigger-popunder="true"]');

      if (triggerElement) {
        const chance = Math.floor(Math.random() * 5) + 1;
        if (chance === 1) {
          window.open(SMARTLINK_URL, "_blank");
        }
      }
    };

    window.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
