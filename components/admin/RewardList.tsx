"use client";

import { Platform, Reward, RewardContent } from "@prisma/client";
import { deleteReward } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RewardForm } from "./RewardForm";

type RewardWithPlatformAndContents = Reward & { platform: Platform ,contents:RewardContent[]};

export function RewardList({
  rewards,
  platforms,
}: {
  rewards: RewardWithPlatformAndContents[];
  platforms: Platform[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Existing Rewards</h3>
      <div className="grid grid-cols-1 gap-4">
        {rewards.map((reward) => (
          <Card key={reward.id} className="border-gray-200 dark:border-zinc-800 shadow-sm">
            <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{reward.title}</h4>
                <p className="text-sm text-gray-500 dark:text-zinc-500">
                  {reward.platform.name} • {reward.slug}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${reward.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                    {reward.status}
                  </span>
                  {reward.expiresAt && (
                    <span className="text-xs text-muted-foreground">
                      Expires: {new Date(reward.expiresAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Reward Details</DialogTitle>
                      <DialogDescription>
                        Make changes to {reward.title}. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    {/* The Reward Form */}
                    <div className="mt-4 text-left">
                      <RewardForm platforms={platforms} reward={reward} initialContents={reward.contents} />
                    </div>
                  </DialogContent>
                </Dialog>

                <form action={deleteReward.bind(null, reward.id)}>
                  <Button type="submit" variant="destructive" size="sm">
                    Delete
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
        {rewards.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No rewards found. Add one above.</p>
        )}
      </div>
    </div>
  );
}
