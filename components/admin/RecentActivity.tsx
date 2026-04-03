"use client";

import { RewardReaction, RewardReport, Reward, Platform } from "@prisma/client";
import { 
  Heart, 
  ThumbsDown, 
  MessageSquare, 
  AlertTriangle, 
  Clock, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type ExtendedReaction = RewardReaction & { reward: Reward & { platform: Platform } };
type ExtendedReport = RewardReport & { reward: Reward & { platform: Platform } };

interface RecentActivityProps {
  reactions: ExtendedReaction[];
  reports: ExtendedReport[];
}

export function RecentActivity({ reactions, reports }: RecentActivityProps) {
  // Combine and sort by date
  const activities = [
    ...reactions.map(r => ({ ...r, type: 'reaction' as const })),
    ...reports.map(r => ({ ...r, type: 'report' as const }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
   .slice(0, 10);

  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-950 rounded-xl border p-8 text-center">
        <Clock className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
        <p className="text-zinc-500 font-medium italic text-sm">No recent activity found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between">
        <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Recent Activity
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Live Feed</span>
      </div>
      
      <div className="divide-y divide-zinc-100 dark:divide-zinc-900 max-h-[400px] overflow-y-auto custom-scrollbar">
        {activities.map((activity, idx) => {
          const isReaction = activity.type === 'reaction';
          const isLove = isReaction && (activity as any).reactionType === 'love';
          const isDislike = isReaction && (activity as any).reactionType === 'dislike';
          
          return (
            <div key={`${activity.type}-${activity.id}`} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl mt-0.5 ${
                  isLove ? 'bg-red-50 text-red-500' : 
                  isDislike ? 'bg-zinc-100 text-zinc-500' : 
                  'bg-orange-50 text-orange-500'
                }`}>
                  {isLove ? <Heart className="w-4 h-4 fill-current" /> : 
                   isDislike ? <ThumbsDown className="w-4 h-4" /> : 
                   <AlertTriangle className="w-4 h-4" />}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
                      {activity.type === 'report' ? (activity as any).reportType.replace('_', ' ') : (activity as any).reactionType}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-900 dark:text-zinc-100 leading-tight">
                    <span className="font-bold">Visitor {(activity as any).visitorId.slice(0, 6)}</span> 
                    {isLove ? ' loved ' : isDislike ? ' disliked ' : ' reported '}
                    <Link 
                      href={`/admin/rewards/${activity.reward.platform.slug}/${activity.reward.slug}/edit`}
                      className="text-primary font-bold hover:underline"
                    >
                      {activity.reward.title}
                    </Link>
                  </p>
                  
                  {activity.type === 'report' && (activity as any).note && (
                    <div className="mt-2 p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-xs italic text-zinc-600 dark:text-zinc-400 border-l-2 border-orange-400">
                      "{(activity as any).note}"
                    </div>
                  )}
                </div>
                
                <Link 
                  href={`/admin/rewards/${activity.reward.platform.slug}/${activity.reward.slug}/edit`}
                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
