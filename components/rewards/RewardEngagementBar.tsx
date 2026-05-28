"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  MessageSquareWarning,
  RefreshCw,
  ThumbsDown,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getDictionary, type Locale } from "@/lib/i18n";
import { analytics } from "@/lib/analytics";
import ReportRewardDialog from "./ReportRewardDialog";
import type { RewardEngagementSummary } from "@/lib/rewardEngagementService";

type RewardEngagementBarProps = {
  rewardId: string;
  locale: Locale;
  initialSummary?: RewardEngagementSummary | null;
};

type ReportErrorPayload = {
  message?: string;
  code?: string;
  summary?: RewardEngagementSummary;
};

function applyReactionOptimistically(
  summary: RewardEngagementSummary,
  reactionType: "love" | "dislike",
): RewardEngagementSummary {
  const currentReaction = summary.reactions.viewerReaction;
  const nextReaction = currentReaction === reactionType ? null : reactionType;

  let love = summary.reactions.love;
  let dislike = summary.reactions.dislike;

  if (currentReaction === "love") {
    love -= 1;
  } else if (currentReaction === "dislike") {
    dislike -= 1;
  }

  if (nextReaction === "love") {
    love += 1;
  } else if (nextReaction === "dislike") {
    dislike += 1;
  }

  return {
    ...summary,
    reactions: {
      ...summary.reactions,
      love,
      dislike,
      viewerReaction: nextReaction,
    },
  };
}

export default function RewardEngagementBar({
  rewardId,
  locale,
  initialSummary,
}: RewardEngagementBarProps) {
  const t = getDictionary(locale);
  const [summary, setSummary] = useState<RewardEngagementSummary | null>(initialSummary || null);
  const [isLoading, setIsLoading] = useState(!initialSummary);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [pendingReaction, setPendingReaction] = useState<
    "love" | "dislike" | null
  >(null);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  async function fetchEngagement() {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await fetch(`/api/rewards/${rewardId}/engagement`);
      if (!response.ok) {
        throw new Error("Failed to load engagement");
      }

      const nextSummary = (await response.json()) as RewardEngagementSummary;
      setSummary(nextSummary);
    } catch {
      setLoadError(t.common.failedToLoadEngagement);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!initialSummary) {
      void fetchEngagement();
    }
  }, [rewardId, initialSummary]);

  async function handleReaction(reactionType: "love" | "dislike") {
    if (!summary || pendingReaction || isSubmittingReport) {
      return;
    }

    const previousSummary = summary;
    setPendingReaction(reactionType);
    setActionError(null);
    setSuccessMessage(null);
    setSummary(applyReactionOptimistically(previousSummary, reactionType));

    try {
      // Analytics event for reaction
      analytics.trackRewardReaction(rewardId, reactionType);

      const response = await fetch(`/api/rewards/${rewardId}/reaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reactionType }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reaction");
      }

      const nextSummary = (await response.json()) as RewardEngagementSummary;
      setSummary(nextSummary);
    } catch {
      setSummary(previousSummary);
      setActionError(t.common.failedToLoadEngagement);
    } finally {
      setPendingReaction(null);
    }
  }

  async function handleReport(payload: {
    reportType: "expired" | "not_working" | "other";
    note?: string;
  }) {
    setIsSubmittingReport(true);
    setActionError(null);
    setSuccessMessage(null);

    try {
      // Analytics event for report attempts
      analytics.trackRewardReport(rewardId, payload.reportType);

      const response = await fetch(`/api/rewards/${rewardId}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const nextSummary = (await response.json()) as RewardEngagementSummary;
        setSummary(nextSummary);
        setSuccessMessage(t.common.reportSubmitted);
        setIsReportOpen(false);
        return;
      }

      const errorPayload = (await response.json()) as ReportErrorPayload;
      if (errorPayload.summary) {
        setSummary(errorPayload.summary);
      }

      if (response.status === 409) {
        setActionError(t.common.reportAlreadySubmittedToday);
        return;
      }

      throw new Error(errorPayload.message || "Failed to submit report");
    } catch {
      setActionError(t.common.failedToLoadEngagement);
    } finally {
      setIsSubmittingReport(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border bg-card/40 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner />
          <span>{t.common.loading}</span>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="rounded-2xl border bg-card/40 p-4">
        <p className="text-sm text-destructive">
          {loadError || t.common.failedToLoadEngagement}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => void fetchEngagement()}
        >
          <RefreshCw />
          {t.common.retry}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border bg-card/40 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={
                summary.reactions.viewerReaction === "love"
                  ? "default"
                  : "outline"
              }
              size="sm"
              disabled={Boolean(pendingReaction) || isSubmittingReport}
              onClick={() => void handleReaction("love")}
            >
              <Heart className="size-4" />
              {t.common.love}
              <span>{summary.reactions.love}</span>
            </Button>

            <Button
              type="button"
              variant={
                summary.reactions.viewerReaction === "dislike"
                  ? "default"
                  : "outline"
              }
              size="sm"
              disabled={Boolean(pendingReaction) || isSubmittingReport}
              onClick={() => void handleReaction("dislike")}
            >
              <ThumbsDown className="size-4" />
              {t.common.dislike}
              <span>{summary.reactions.dislike}</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={Boolean(pendingReaction) || isSubmittingReport}
              onClick={() => {
                setActionError(null);
                setSuccessMessage(null);
                setIsReportOpen(true);
              }}
            >
              <MessageSquareWarning className="size-4" />
              {t.common.report}
            </Button>
          </div>

          {summary.reports.needsReview && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700">
              <TriangleAlert className="size-4" />
              {t.common.needsReview}
            </span>
          )}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {t.common.feedbackBoundToBrowser}
        </p>

        {actionError && (
          <p className="mt-3 text-sm text-destructive">{actionError}</p>
        )}

        {successMessage && (
          <p className="mt-3 text-sm text-green-600">{successMessage}</p>
        )}
      </div>

      <ReportRewardDialog
        locale={locale}
        open={isReportOpen}
        isPending={isSubmittingReport}
        errorMessage={
          actionError === t.common.reportAlreadySubmittedToday
            ? actionError
            : null
        }
        onOpenChange={setIsReportOpen}
        onReport={(payload) => void handleReport(payload)}
      />
    </>
  );
}
