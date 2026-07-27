"use client";

import { useState } from "react";
import type { ScanResult } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  AlertTriangle,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";

interface ScanResultsListProps {
  results: ScanResult[];
}

type ExpandedResult = {
  summary: Record<string, unknown>;
  missingRewards: Record<string, unknown>[];
  expiredRewards: Record<string, unknown>[];
  matches: Record<string, unknown>[];
  rawOutput: Record<string, unknown>;
};

export function ScanResultsList({ results }: ScanResultsListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this scan result?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/scan-results/${id}`, { method: "DELETE" });
      window.location.reload();
    } catch {
      alert("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg">No scan results yet.</p>
        <p className="text-sm">
          Configure your automation tool (n8n, etc.) to POST to{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs">
            POST /api/admin/scan-results
          </code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => {
        const summary = (result.summary as ExpandedResult["summary"]) || {};
        const missingRewards =
          (result.missingRewards as ExpandedResult["missingRewards"]) || [];
        const expiredRewards =
          (result.expiredRewards as ExpandedResult["expiredRewards"]) || [];
        const matches = (result.matches as ExpandedResult["matches"]) || [];

        return (
          <Card key={result.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">Scan Results</CardTitle>
                    {result.status === "COMPLETED" && (
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {result.status === "FAILED" && (
                      <Badge variant="destructive">
                        <XCircle className="w-3 h-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                    {result.status === "PENDING" && (
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(result.createdAt).toLocaleString()}
                    {result.platformSlug && (
                      <>
                        {" "}
                        — Platform:{" "}
                        <span className="font-medium">
                          {result.platformSlug}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(result.id)}
                    disabled={deleting === result.id}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              {/* Summary stats */}
              {summary && Object.keys(summary).length > 0 && (
                <div className="flex flex-wrap gap-3 mb-3">
                  {typeof summary.urlsScanned === "number" && (
                    <StatBadge
                      label="URLs Scanned"
                      value={summary.urlsScanned}
                    />
                  )}
                  {typeof summary.totalFoundOnSource === "number" && (
                    <StatBadge
                      label="Found on Source"
                      value={summary.totalFoundOnSource}
                    />
                  )}
                  {typeof summary.totalInMyData === "number" && (
                    <StatBadge label="In DB" value={summary.totalInMyData} />
                  )}
                  {typeof summary.missingCount === "number" && (
                    <StatBadge
                      label="Missing"
                      value={summary.missingCount}
                      variant="warning"
                    />
                  )}
                  {typeof summary.possiblyExpiredCount === "number" && (
                    <StatBadge
                      label="Expired"
                      value={summary.possiblyExpiredCount}
                      variant="danger"
                    />
                  )}
                </div>
              )}

              {/* Source URLs */}
              {result.sourceUrls && result.sourceUrls.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.sourceUrls.map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {url.length > 50 ? url.slice(0, 50) + "..." : url}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <Separator className="my-3" />

              {/* Details button */}
              <DetailDialog
                summary={summary}
                missingRewards={missingRewards}
                expiredRewards={expiredRewards}
                matches={matches}
                sourceUrls={result.sourceUrls}
                error={result.error}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function StatBadge({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: number;
  variant?: "default" | "warning" | "danger";
}) {
  const colorClass =
    variant === "danger"
      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      : variant === "warning"
        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
        : "bg-muted text-muted-foreground";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      {label}: <strong>{value}</strong>
    </span>
  );
}

function DetailDialog({
  summary,
  missingRewards,
  expiredRewards,
  matches,
  sourceUrls,
  error,
}: {
  summary: Record<string, unknown>;
  missingRewards: Record<string, unknown>[];
  expiredRewards: Record<string, unknown>[];
  matches: Record<string, unknown>[];
  sourceUrls: string[];
  error: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          View Full Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Scan Result Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Error */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-400">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  {error}
                </p>
              </div>
            )}

            {/* Missing Rewards */}
            {missingRewards.length > 0 && (
              <Section title={`Missing Rewards (${missingRewards.length})`}>
                {missingRewards.map((r, i) => (
                  <RewardItem key={i} reward={r} type="missing" />
                ))}
              </Section>
            )}

            {/* Expired Rewards */}
            {expiredRewards.length > 0 && (
              <Section
                title={`Possibly Expired Rewards (${expiredRewards.length})`}
              >
                {expiredRewards.map((r, i) => (
                  <RewardItem key={i} reward={r} type="expired" />
                ))}
              </Section>
            )}

            {/* Matches */}
            {matches.length > 0 && (
              <Section title={`Matches (${matches.length})`}>
                {matches.map((r, i) => (
                  <RewardItem key={i} reward={r} type="match" />
                ))}
              </Section>
            )}

            {/* Raw summary */}
            {summary && Object.keys(summary).length > 0 && (
              <Section title="Summary">
                <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(summary, null, 2)}
                </pre>
              </Section>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      {children}
    </div>
  );
}

function RewardItem({
  reward,
  type,
}: {
  reward: Record<string, unknown>;
  type: "missing" | "expired" | "match";
}) {
  const borderColor =
    type === "missing"
      ? "border-green-200 dark:border-green-800"
      : type === "expired"
        ? "border-red-200 dark:border-red-800"
        : "border-blue-200 dark:border-blue-800";

  // Build the prefill URL for missing rewards so the admin can create them
  // directly from the scan UI.
  let createUrl: string | undefined;
  if (type === "missing") {
    const title = String(reward.title ?? reward.rewardId ?? "");
    const slug = String(reward.suggestedSlug ?? reward.rewardId ?? "");
    const claimUrl = String(reward.claimLink ?? "");
    const platformName = String(reward.game ?? "");
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (slug) params.set("slug", slug);
    if (claimUrl) params.set("claimUrl", claimUrl);
    if (platformName) params.set("platformName", platformName);
    params.set("fromScan", "1");
    createUrl = `/admin/rewards/new?${params.toString()}`;
  }

  return (
    <div className={`p-3 mb-2 border rounded-lg bg-muted/30 ${borderColor}`}>
      {createUrl && (
        <div className="mb-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-green-700 border-green-400 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-950"
          >
            <Link href={createUrl}>
              <Plus className="w-3.5 h-3.5 mr-1" />
              Create as Reward
            </Link>
          </Button>
        </div>
      )}
      <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
        {JSON.stringify(reward, null, 2)}
      </pre>
    </div>
  );
}
