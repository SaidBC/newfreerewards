"use client";

import { useState, useCallback } from "react";
import { RewardForm, RewardPrefill } from "./RewardForm";
import RewardDetailViewClient from "@/components/rewards/RewardDetailViewClient";
import { Platform, Reward, RewardContent } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Edit3, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentBlockData {
  id: string;
  type: any;
  value: string;
  href: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  order: number;
  translations: any;
  rewardId: string;
  createdAt?: string | Date | null;
}

interface RewardEditorPageProps {
  platforms: Platform[];
  reward: Reward & { platform: Platform };
  initialContents: ContentBlockData[];
  dictionary: Record<string, any>;
  prefill?: RewardPrefill;
}

export default function RewardEditorPage({
  platforms,
  reward,
  initialContents,
  dictionary,
  prefill,
}: RewardEditorPageProps) {
  const [previewLocale, setPreviewLocale] = useState<"en" | "es" | "ar">("en");
  const [viewportMode, setViewportMode] = useState<"mobile" | "desktop">(
    "mobile",
  );
  const [previewData, setPreviewData] = useState<any>(() => {
    // Initialize preview immediately with existing reward data
    const platform = reward.platform;
    // If template applied, use template content blocks for preview
    const contentSource =
      prefill?.contentBlocks && prefill.contentBlocks.length > 0
        ? prefill.contentBlocks
        : (initialContents || []).map((c: any) => ({
            type: c.type,
            value: c.value || "",
            href: c.href || "",
            label: c.label || "",
            src: c.imageSrc || "",
            imageSrc: c.imageSrc || "",
            alt: c.imageAlt || "",
            imageAlt: c.imageAlt || "",
            listType: c.listType || "ordered",
            listItems: c.listItems || [],
            titleLevel: c.titleLevel || "h2",
            translations: c.translations || { es: {}, ar: {} },
          }));

    return {
      ...reward,
      id: reward.id,
      platform,
      name: reward.title,
      title: reward.title,
      description: reward.description,
      content: contentSource,
    };
  });

  const handleFormChange = useCallback(
    (data: any) => {
      const platform =
        platforms.find((p) => p.id === data.platformId) || reward.platform;

      const translatedReward = {
        ...data,
        id: reward.id,
        platform,
        name: data.translations?.[previewLocale]?.title || data.title,
        title: data.translations?.[previewLocale]?.title || data.title,
        description:
          data.translations?.[previewLocale]?.description || data.description,
        content: (data.contentBlocks || []).map((block: any) => {
          const trans = block.translations?.[previewLocale] || {};
          return {
            ...block,
            value: trans.value || block.value,
            label: trans.label || block.label,
            alt: trans.alt || block.imageAlt || block.alt,
            src: block.imageSrc || block.src,
            imageSrc: block.imageSrc || block.src,
            imageAlt: block.imageAlt || block.alt,
            listType: block.listType || "ordered",
            listItems: block.listItems || [],
            titleLevel: block.titleLevel || "h2",
          };
        }),
      };

      setPreviewData(translatedReward);
    },
    [previewLocale, platforms, reward],
  );

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 overflow-y-auto custom-scrollbar">
      {/* Preview Section - NOW ON TOP */}
      <div className="w-full bg-zinc-100 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800 relative flex flex-col">
        {/* Preview Header / Utility Bar - Sticky for convenience */}
        <div className="px-6 py-3 border-b border-zinc-200 dark:border-zinc-800/50 flex items-center justify-between backdrop-blur-md bg-white/50 dark:bg-zinc-950/50 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 dark:bg-white rounded-full text-white dark:text-zinc-900 text-[11px] font-bold shadow-lg shadow-zinc-900/10">
              <Eye className="w-3 h-3" />
              LIVE PREVIEW
            </div>

            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 mx-1 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-0.5 rounded-lg">
              <Button
                variant={viewportMode === "mobile" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={() => setViewportMode("mobile")}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
              <Button
                variant={viewportMode === "desktop" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={() => setViewportMode("desktop")}
              >
                <Monitor className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Tabs
              value={previewLocale}
              onValueChange={(v: any) => setPreviewLocale(v)}
              className="w-auto"
            >
              <TabsList className="h-9 bg-zinc-200/50 dark:bg-zinc-800/50">
                <TabsTrigger
                  value="en"
                  className="text-xs font-bold px-3 h-7 uppercase"
                >
                  EN
                </TabsTrigger>
                <TabsTrigger
                  value="es"
                  className="text-xs font-bold px-3 h-7 uppercase"
                >
                  ES
                </TabsTrigger>
                <TabsTrigger
                  value="ar"
                  className="text-xs font-bold px-3 h-7 uppercase"
                >
                  AR
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="flex-1 p-6 lg:p-12 flex justify-center items-start bg-grid-zinc-200/[0.05] dark:bg-grid-white/[0.02]">
          <div
            className={`transition-all duration-500 ease-in-out bg-white dark:bg-zinc-950 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] rounded-3xl border border-zinc-200 dark:border-zinc-800 ring-8 ring-zinc-100 dark:ring-zinc-900 overflow-y-auto max-h-[800px] custom-scrollbar ${
              viewportMode === "mobile" ? "w-[400px]" : "w-full max-w-5xl"
            }`}
          >
            {previewData ? (
              <RewardDetailViewClient
                reward={previewData}
                locale={previewLocale}
                t={dictionary[previewLocale] || dictionary.en}
                isPreview
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-20 text-zinc-400 gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="font-medium italic">Building your preview...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Section - NOW BELOW */}
      <div className="w-full flex-1 flex flex-col bg-white dark:bg-zinc-950 relative">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-white dark:bg-zinc-950 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Edit3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white">
                Content Editor
              </h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-mono">
                Live Sync Active
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <RewardForm
              platforms={platforms}
              reward={reward}
              initialContents={initialContents}
              prefill={prefill}
              onChange={handleFormChange}
            />
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-500 flex justify-between items-center mt-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Connected to Database
          </div>
          <div className="font-mono">Antigravity Editor v2.1</div>
        </div>
      </div>
    </div>
  );
}
