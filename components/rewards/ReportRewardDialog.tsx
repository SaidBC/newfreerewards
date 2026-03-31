"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getDictionary, type Locale } from "@/lib/i18n";

type ReportRewardDialogProps = {
  locale: Locale;
  open: boolean;
  isPending: boolean;
  errorMessage: string | null;
  onOpenChange: (open: boolean) => void;
  onReport: (payload: {
    reportType: "expired" | "not_working" | "other";
    note?: string;
  }) => void;
};

export default function ReportRewardDialog({
  locale,
  open,
  isPending,
  errorMessage,
  onOpenChange,
  onReport,
}: ReportRewardDialogProps) {
  const t = getDictionary(locale);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) {
      setNote("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.common.report}</DialogTitle>
          <DialogDescription>{t.common.feedbackBoundToBrowser}</DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMessage}
          </p>
        )}

        <div className="grid gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onReport({ reportType: "expired" })}
          >
            {isPending ? <Spinner /> : null}
            {t.common.reportExpired}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onReport({ reportType: "not_working" })}
          >
            {isPending ? <Spinner /> : null}
            {t.common.reportNotWorking}
          </Button>
          <div className="grid gap-2 rounded-md border p-3">
            <label htmlFor="report-note" className="text-sm font-medium">
              {t.common.reportOther}
            </label>
            <textarea
              id="report-note"
              className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              placeholder={t.common.reportNotePlaceholder}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              disabled={isPending}
            />
            <Button
              type="button"
              variant="outline"
              disabled={isPending || note.trim().length === 0}
              onClick={() => onReport({ reportType: "other", note })}
            >
              {isPending ? <Spinner /> : null}
              {t.common.submitOtherReport}
            </Button>
          </div>
        </div>

        <DialogFooter showCloseButton>
          <div />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
