"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Copy, ImagePlus, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UploadResponse = {
  url: string;
  assetPath: string;
  folder: string;
  publicId: string;
  width?: number;
  height?: number;
  bytes: number;
  format?: string;
};

export function AdminUploadForm({
  suggestedFolders,
}: {
  suggestedFolders: string[];
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFolder, setSelectedFolder] = useState(
    suggestedFolders[0] ?? "images/uploads"
  );
  const [customFolder, setCustomFolder] = useState("");
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [copiedField, setCopiedField] = useState<"url" | "assetPath" | null>(null);

  const resolvedFolder = useMemo(() => {
    const value = customFolder.trim();
    return value || selectedFolder;
  }, [customFolder, selectedFolder]);

  async function copyValue(field: "url" | "assetPath", value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField((current) => (current === field ? null : current)), 1500);
    } catch {
      setError("Copy failed. Please copy the value manually.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setCopiedField(null);

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setError("Choose an image before uploading.");
      return;
    }

    if (!resolvedFolder) {
      setError("Choose a folder or enter a custom one.");
      return;
    }

    const formData = new FormData();
    formData.set("file", file);
    formData.set("folder", resolvedFolder);

    setIsPending(true);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok) {
        setResult(null);
        setError(payload.error || "Upload failed.");
        return;
      }

      setResult(payload.file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setResult(null);
      setError("Upload failed because the request could not be completed.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <Card className="border-gray-200 shadow-sm dark:border-zinc-800">
        <CardHeader>
          <CardTitle>Upload image</CardTitle>
          <CardDescription>
            Choose a suggested folder or enter a custom folder like <code>images/clash-royale</code>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="folder-select">Suggested folder</Label>
                <select
                  id="folder-select"
                  value={selectedFolder}
                  onChange={(event) => setSelectedFolder(event.target.value)}
                  disabled={isPending}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                >
                  {suggestedFolders.map((folder) => (
                    <option key={folder} value={folder}>
                      {folder}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-folder">Custom folder override</Label>
                <Input
                  id="custom-folder"
                  value={customFolder}
                  onChange={(event) => setCustomFolder(event.target.value)}
                  placeholder="images/custom-folder"
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-file">Image file</Label>
              <Input
                id="image-file"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                disabled={isPending}
              />
              <p className="text-sm text-muted-foreground">
                Final folder: <span className="font-mono">{resolvedFolder}</span>
              </p>
            </div>

            {error ? (
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
            ) : null}

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <ImagePlus className="size-4" />
                  Upload image
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm dark:border-zinc-800">
        <CardHeader>
          <CardTitle>Latest upload</CardTitle>
          <CardDescription>Use the returned URL directly or save the asset path for `storageUrl(...)`.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {result ? (
            <>
              <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                <Image
                  src={result.url}
                  alt={result.publicId}
                  width={result.width ?? 1200}
                  height={result.height ?? 900}
                  unoptimized
                  className="h-64 w-full object-contain bg-white dark:bg-zinc-950"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uploaded-url">URL</Label>
                <div className="flex gap-2">
                  <Input id="uploaded-url" readOnly value={result.url} />
                  <Button type="button" variant="outline" onClick={() => copyValue("url", result.url)}>
                    <Copy className="size-4" />
                    {copiedField === "url" ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="asset-path">Asset path</Label>
                <div className="flex gap-2">
                  <Input id="asset-path" readOnly value={result.assetPath} />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => copyValue("assetPath", result.assetPath)}
                  >
                    <Copy className="size-4" />
                    {copiedField === "assetPath" ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <p>
                  Folder: <span className="font-mono text-foreground">{result.folder}</span>
                </p>
                <p>
                  Public ID: <span className="font-mono text-foreground">{result.publicId}</span>
                </p>
                <p>
                  Format: <span className="font-mono text-foreground">{result.format ?? "unknown"}</span>
                </p>
                <p>
                  Size: <span className="font-mono text-foreground">{Math.round(result.bytes / 1024)} KB</span>
                </p>
                <p>
                  Dimensions:{" "}
                  <span className="font-mono text-foreground">
                    {result.width ?? "?"}x{result.height ?? "?"}
                  </span>
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
              Upload an image to see the final URL and asset path here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
