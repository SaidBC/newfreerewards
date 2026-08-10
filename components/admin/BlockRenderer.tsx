"use client";

import { ContentBlock } from "@/components/admin/RewardForm";
import {
  Type,
  Heading,
  List,
  Italic,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  QrCode,
} from "lucide-react";

interface BlockRendererProps {
  block: ContentBlock;
  index: number;
}

export default function BlockRenderer({ block, index }: BlockRendererProps) {
  const getBlockIcon = () => {
    switch (block.type) {
      case "text":
        return <Type className="w-4 h-4" />;
      case "title":
        return <Heading className="w-4 h-4" />;
      case "list":
        return <List className="w-4 h-4" />;
      case "italic":
        return <Italic className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "link":
        return <LinkIcon className="w-4 h-4" />;
      case "code":
        return <Code className="w-4 h-4" />;
      case "qr":
        return <QrCode className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  const getBlockColor = () => {
    switch (block.type) {
      case "text":
        return "bg-blue-500";
      case "title":
        return "bg-purple-500";
      case "list":
        return "bg-green-500";
      case "italic":
        return "bg-orange-500";
      case "image":
        return "bg-pink-500";
      case "link":
        return "bg-cyan-500";
      case "code":
        return "bg-gray-700";
      case "qr":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  const renderPreview = () => {
    switch (block.type) {
      case "text":
        return (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {block.value || "Empty text block"}
          </p>
        );
      case "title":
        const TitleTag = block.titleLevel || "h2";
        return (
          <TitleTag
            className={`font-bold ${block.titleLevel === "h2" ? "text-xl" : block.titleLevel === "h3" ? "text-lg" : "text-base"} line-clamp-2`}
          >
            {block.value || "Empty title"}
          </TitleTag>
        );
      case "list":
        return (
          <div className="space-y-1">
            {(block.listItems || []).slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground mt-0.5">
                  {block.listType === "ordered" ? `${i + 1}.` : "•"}
                </span>
                <span className="text-muted-foreground line-clamp-1">
                  {item || "Empty item"}
                </span>
              </div>
            ))}
            {(block.listItems || []).length > 3 && (
              <p className="text-xs text-muted-foreground italic">
                +{(block.listItems || []).length - 3} more items
              </p>
            )}
          </div>
        );
      case "italic":
        return (
          <p className="text-sm text-muted-foreground italic line-clamp-2">
            {block.value || "Empty italic text"}
          </p>
        );
      case "image":
        return (
          <div className="flex items-center gap-2">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {block.imageAlt || "Image"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {block.imageSrc || "No URL"}
              </p>
            </div>
          </div>
        );
      case "link":
        return (
          <div className="flex items-center gap-2">
            <LinkIcon className="w-8 h-8 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {block.label || "Link"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {block.href || "No URL"}
              </p>
            </div>
          </div>
        );
      case "code":
        return (
          <div className="bg-zinc-900 text-zinc-100 p-2 rounded font-mono text-xs">
            {block.value || "No code"}
          </div>
        );
      case "qr":
        return (
          <div className="flex items-center gap-2">
            <QrCode className="w-8 h-8 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {block.label || "QR Code"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {block.href || "No URL"}
              </p>
            </div>
          </div>
        );
      default:
        return (
          <p className="text-sm text-muted-foreground">Unknown block type</p>
        );
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors">
      <div
        className={`mt-1 p-2 rounded-lg ${getBlockColor()} bg-opacity-10 text-gray-700 dark:text-gray-300`}
      >
        {getBlockIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {block.type}
          </span>
          <span className="text-xs text-muted-foreground">#{index + 1}</span>
        </div>
        <div className="mt-2">{renderPreview()}</div>
      </div>
    </div>
  );
}
