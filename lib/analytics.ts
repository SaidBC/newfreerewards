/**
 * Google Analytics 4 utilities for Next.js
 * Standardized implementation using @next/third-parties
 */

import clientEnv from "@/utils/clientEnv";
import { sendGAEvent } from "@next/third-parties/google";

// Environment variables
export const GA_MEASUREMENT_ID =
  clientEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

/**
 * Check if GA should be enabled
 * (Enabled in production, or in development if NEXT_PUBLIC_DEBUG_ANALYTICS is set)
 */
export const isAnalyticsEnabled = (): boolean => {
  const isProd = clientEnv.NEXT_PUBLIC_NODE_ENV === "production";
  const isDebug = clientEnv.NEXT_PUBLIC_DEBUG_ANALYTICS === "true";

  return (
    (isProd || isDebug) &&
    Boolean(GA_MEASUREMENT_ID) &&
    GA_MEASUREMENT_ID !== "G-XXXXXXXXXX"
  );
};

/**
 * Web Vitals metric interface
 */
export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  label?: string;
  attribution?: Record<string, unknown>;
}

/**
 * Custom Google Analytics event interface
 */
export interface GAEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

/**
 * Reports Web Vitals metrics to Google Analytics
 */
export function reportWebVitals(metric: WebVitalsMetric): void {
  const isDev = clientEnv.NEXT_PUBLIC_NODE_ENV === "development";

  if (!isAnalyticsEnabled()) {
    if (isDev && metric.label === "web-vital") {
      console.info("📊 Web Vital (logged, not sent):", metric.name, metric.value);
    }
    return;
  }

  // Only report actual web vitals metrics
  if (metric.label !== "web-vital") {
    return;
  }

  // Prepare metric value based on type
  // CLS needs to be multiplied by 1000 for analytics
  const value = Math.round(
    metric.name === "CLS" ? metric.value * 1000 : metric.value,
  );

  // Send to GA4 using standardized gtag format: gtag('event', name, params)
  sendGAEvent("event", "web_vitals", {
    event_category: "Web Vitals",
    event_label: metric.name,
    value: value,
    metric_id: metric.id,
    metric_rating: metric.rating,
    metric_delta: metric.delta,
    ...(metric.attribution || {}),
  });

  if (isDev) {
    console.info("📊 Web Vital sent:", metric.name, value);
  }
}

/**
 * Sends custom events to Google Analytics
 */
export function trackEvent(event: GAEvent): void {
  const isDev = clientEnv.NEXT_PUBLIC_NODE_ENV === "development";

  if (!isAnalyticsEnabled()) {
    if (isDev) {
      console.info("📈 GA Event (logged, not sent):", event.action, {
        category: event.category,
        label: event.label,
        value: event.value,
        ...event.custom_parameters,
      });
    }
    return;
  }

  // Flatten parameters for better GA4 compatibility
  // GA4 prefers top-level parameters rather than nested objects
  sendGAEvent("event", event.action, {
    event_category: event.category || "engagement",
    event_label: event.label,
    value: event.value,
    ...event.custom_parameters,
  });

  if (isDev) {
    console.info("📈 GA Event sent:", event.action, {
      category: event.category,
      label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });
  }
}

/**
 * Tracks page views (usually handled automatically by GoogleAnalytics component)
 */
export function trackPageView(url: string, title?: string): void {
  if (!isAnalyticsEnabled()) {
    return;
  }

  sendGAEvent("event", "page_view", {
    page_location: url,
    page_title: title || document.title,
  });
}

/**
 * Common event trackers for typical website interactions
 */
export const analytics = {
  // Track external link clicks
  trackExternalLink: (url: string, text?: string) => {
    trackEvent({
      action: "click_external_link",
      category: "engagement",
      label: url,
      custom_parameters: {
        link_text: text,
        link_url: url,
      },
    });
  },

  // Track download events
  trackDownload: (filename: string, fileType?: string) => {
    trackEvent({
      action: "download",
      category: "engagement",
      label: filename,
      custom_parameters: {
        file_name: filename,
        file_type: fileType,
      },
    });
  },

  // Track form submissions
  trackFormSubmission: (formName: string, success: boolean = true) => {
    trackEvent({
      action: "form_submission",
      category: "engagement",
      label: formName,
      value: success ? 1 : 0,
      custom_parameters: {
        form_name: formName,
        submission_success: success,
      },
    });
  },

  // Track search queries
  trackSearch: (query: string, results?: number) => {
    trackEvent({
      action: "search",
      category: "engagement",
      label: query,
      value: results,
      custom_parameters: {
        search_term: query,
        search_results: results,
      },
    });
  },

  // Track social media interactions
  trackSocialInteraction: (
    network: string,
    action: string,
    target?: string,
  ) => {
    trackEvent({
      action: "social_interaction",
      category: "social",
      label: `${network}_${action}`,
      custom_parameters: {
        social_network: network,
        social_action: action,
        social_target: target,
      },
    });
  },

  // Track reward reactions (love/dislike)
  trackRewardReaction: (rewardId: string, reactionType: "love" | "dislike") => {
    trackEvent({
      action: "reward_reaction",
      category: "engagement",
      label: reactionType,
      custom_parameters: {
        reward_id: rewardId,
        reaction_type: reactionType,
      },
    });
  },

  // Track reward reports
  trackRewardReport: (
    rewardId: string,
    reportType: "expired" | "not_working" | "other",
  ) => {
    trackEvent({
      action: "reward_report",
      category: "engagement",
      label: reportType,
      custom_parameters: {
        reward_id: rewardId,
        report_type: reportType,
      },
    });
  },

  // Track popunder triggers on elements marked with data-trigger-popunder
  trackPopunderTrigger: (elementTag: string, href?: string) => {
    trackEvent({
      action: "popunder_trigger",
      category: "engagement",
      label: elementTag,
      custom_parameters: {
        element: elementTag,
        href: href || null,
      },
    });
  },
};

/**
 * Type definitions for gtag (for backward compatibility if needed)
 */
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>,
    ) => void;
  }
}
