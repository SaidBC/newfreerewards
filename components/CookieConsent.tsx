"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary, type Locale } from "@/lib/i18n";

interface CookieConsentProps {
  locale: Locale;
}

export default function CookieConsent({ locale }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const t = getDictionary(locale);

  useEffect(() => {
    // Check if consent already given
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: Date.now(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShowBanner(false);
    // Reload to initialize analytics/ads
    window.location.reload();
  };

  const rejectAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      advertising: false,
      timestamp: Date.now(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShowBanner(false);
  };

  const savePreferences = (analytics: boolean, advertising: boolean) => {
    const consent = {
      necessary: true,
      analytics,
      advertising,
      timestamp: Date.now(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShowBanner(false);
    setShowPreferences(false);
    window.location.reload();
  };

  if (!showBanner) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background border-t border-border shadow-lg animate-slide-up",
        showPreferences && "max-h-[80vh] overflow-y-auto",
      )}
      role="dialog"
      aria-label={t.common.cookieConsentTitle}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">
              {t.common.cookieConsentTitle}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t.common.cookieConsentDescription}
            </p>

            {!showPreferences && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={acceptAll} className="w-full sm:w-auto">
                  {t.common.acceptAll}
                </Button>
                <Button
                  variant="outline"
                  onClick={rejectAll}
                  className="w-full sm:w-auto"
                >
                  {t.common.rejectAll}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreferences(true)}
                  className="w-full sm:w-auto text-xs"
                >
                  {t.common.customizePreferences}
                </Button>
              </div>
            )}

            {showPreferences && (
              <div className="space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="font-medium">
                        {t.common.necessaryCookies}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {t.common.necessaryCookiesDesc}
                      </p>
                    </div>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="analytics-cookies"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="font-medium">
                        {t.common.analyticsCookies}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {t.common.analyticsCookiesDesc}
                      </p>
                    </div>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="advertising-cookies"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="font-medium">
                        {t.common.advertisingCookies}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {t.common.advertisingCookiesDesc}
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 pt-2 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowPreferences(false)}
                    className="w-full sm:w-auto"
                  >
                    {t.common.back}
                  </Button>
                  <Button
                    onClick={() => {
                      const analytics = document.getElementById(
                        "analytics-cookies",
                      ) as HTMLInputElement;
                      const advertising = document.getElementById(
                        "advertising-cookies",
                      ) as HTMLInputElement;
                      savePreferences(
                        analytics?.checked ?? false,
                        advertising?.checked ?? false,
                      );
                    }}
                    className="w-full sm:w-auto"
                  >
                    {t.common.savePreferences}
                  </Button>
                </div>
              </div>
            )}

            <p className="mt-4 text-xs text-muted-foreground">
              {t.common.cookiePolicyLinkPrefix}{" "}
              <a
                href={locale === "en" ? "/privacy" : `/${locale}/privacy`}
                className="underline hover:text-primary"
              >
                {t.common.cookiePolicy}
              </a>{" "}
              {t.common.cookiePolicyLinkSuffix}
            </p>
          </div>

          <button
            onClick={() => {
              if (showPreferences) {
                setShowPreferences(false);
              } else {
                setShowBanner(false);
              }
            }}
            className="md:absolute md:top-4 md:right-4 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label={t.common.close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
