"use client";

import { Platform, Reward, RewardContent, RewardReaction, RewardReport } from "@prisma/client";
import { deleteReward } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { 
  Heart, 
  ThumbsDown, 
  MessageCircle, 
  Trash2, 
  AlertCircle, 
  ChevronRight,
  Clock,
  User,
  StickyNote
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type RewardWithMetrics = Reward & { 
  platform: Platform; 
  contents: RewardContent[];
  reactions: RewardReaction[];
  reports: RewardReport[];
};

export function RewardList({
  rewards,
  platforms,
}: {
  rewards: RewardWithMetrics[];
  platforms: Platform[];
}) {
  const [selectedReward, setSelectedReward] = useState<RewardWithMetrics | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const loves = reward.reactions.filter(r => r.reactionType === 'love').length;
          const dislikes = reward.reactions.filter(r => r.reactionType === 'dislike').length;
          const reports = reward.reports.length;

          return (
            <Card key={reward.id} className="border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
              <div className="relative aspect-video bg-muted border-b">
                {reward.previewImage ? (
                  <Image 
                    src={reward.previewImage} 
                    alt={reward.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs italic">
                    No preview image
                  </div>
                )}
                
                {/* Status Badge */}
                <div className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm z-10 ${reward.status === "active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  {reward.status}
                </div>

                {/* Metrics Overlay */}
                <div className="absolute bottom-2 left-2 flex gap-1.5 z-10">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-[10px] font-bold">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                    {loves}
                  </div>
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-[10px] font-bold">
                    <ThumbsDown className="w-3 h-3 text-zinc-400" />
                    {dislikes}
                  </div>
                  <div className={`flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-[10px] font-bold ${reports > 0 ? "border border-red-500/50" : ""}`}>
                    <MessageCircle className={`w-3 h-3 ${reports > 0 ? "text-red-500 fill-red-500" : "text-zinc-400"}`} />
                    {reports}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 flex-1">{reward.title}</h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-7 w-7 rounded-full ${reports > 0 ? "text-red-500 bg-red-50 dark:bg-red-950/20" : "text-zinc-400"}`}
                          onClick={() => setSelectedReward(reward)}
                        >
                          <AlertCircle className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden">
                        <DialogHeader className="p-6 pb-2">
                          <DialogTitle className="flex items-center gap-2 text-xl">
                            <MessageCircle className="w-5 h-5 text-primary" />
                            Visitor Feedback & Reports
                          </DialogTitle>
                          <DialogDescription>
                            Detailed reports and technical issues submitted for: <span className="font-bold text-foreground">{reward.title}</span>
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="max-h-[550px] overflow-y-auto px-6 py-4 custom-scrollbar">
                          <div className="space-y-4 pb-8">
                            {reward.reports.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-3">
                                <MessageCircle className="w-12 h-12 opacity-20" />
                                <p className="italic font-medium">No reports submitted yet.</p>
                              </div>
                            ) : (
                              reward.reports.map((report) => (
                                <div key={report.id} className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900/50 space-y-3 relative overflow-hidden group">
                                  {/* Sidebar color for type */}
                                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                                    report.reportType === 'expired' ? 'bg-orange-500' : 
                                    report.reportType === 'not_working' ? 'bg-red-500' : 'bg-blue-500'
                                  }`} />
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider border ${
                                        report.reportType === 'expired' ? 'border-orange-200 bg-orange-50 text-orange-700' : 
                                        report.reportType === 'not_working' ? 'border-red-200 bg-red-50 text-red-700' : 
                                        'border-blue-200 bg-blue-50 text-blue-700'
                                      }`}>
                                        {report.reportType.replace('_', ' ')}
                                      </div>
                                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(report.createdAt).toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                                      <User className="w-3 h-3" />
                                      {report.visitorId.slice(0, 8)}...
                                    </div>
                                  </div>

                                  {report.note && (
                                    <div className="bg-white dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 text-sm shadow-sm">
                                      <div className="flex gap-2">
                                        <StickyNote className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed italic">"{report.note}"</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-1 uppercase font-mono tracking-wider">
                    {reward.slug}
                  </p>
                  {reward.expiresAt && (
                     <p className={`text-[10px] mt-1 font-semibold flex items-center gap-1 ${new Date(reward.expiresAt) < new Date() ? "text-red-500" : "text-zinc-400"}`}>
                      <Clock className="w-3 h-3" />
                      Expires: {new Date(reward.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2 pt-3 border-t mt-auto">
                  <Button variant="outline" size="sm" className="flex-1 font-bold text-xs" asChild>
                    <Link href={`/admin/rewards/${reward.platform.slug}/${reward.slug}/edit`}>
                      EDIT REWARD
                    </Link>
                  </Button>

                  <form action={deleteReward.bind(null, reward.id)} className="flex-shrink-0" onSubmit={(e) => {
                    if (!confirm("Are you sure you want to delete this reward? This cannot be undone.")) {
                      e.preventDefault();
                    }
                  }}>
                    <Button type="submit" variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {rewards.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8 col-span-full italic">No rewards found for this platform.</p>
        )}
      </div>
    </div>
  );
}
