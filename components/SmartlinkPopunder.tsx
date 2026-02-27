"use client";

import { useEffect } from "react";

export default function SmartlinkPopunder() {
  useEffect(() => {
    const SMART_LINK = "https://omg10.com/4/10657502";
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const triggerElement = target.closest('[data-trigger-popunder="true"]');
      
      if (triggerElement) {
        // Open the smart link in a new tab/window
        const win = window.open(SMART_LINK, "_blank");
        
        // Attempt to focus back to current window to simulate "pop-under"
        if (win) {
          window.focus();
        }
        
        // Optionally remove listener if you only want it once per page load
        // window.removeEventListener("click", handleClick);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
