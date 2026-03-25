import { Platform, Reward } from "@prisma/client";
import { createReward, updateReward } from "@/app/[locale]/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RewardForm({ platforms, reward }: { platforms: Platform[]; reward?: Reward }) {
  const isEditing = !!reward;
  const action = isEditing ? updateReward.bind(null, reward.id) : createReward;
  
  const formatDateForInput = (date: Date | null | undefined) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 16);
  };

  return (
    <Card className="shadow-sm border-gray-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Reward" : "Add New Reward"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Reward Title</Label>
            <Input id="title" type="text" name="title" defaultValue={reward?.title} required placeholder="e.g. 500 Gems" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" type="text" name="slug" defaultValue={reward?.slug} required placeholder="e.g. 500-gems" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platformId">Platform</Label>
            <select
              id="platformId"
              name="platformId"
              defaultValue={reward?.platformId || ""}
              required
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Select Platform</option>
              {platforms.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="claimUrl">Claim URL</Label>
            <Input id="claimUrl" type="text" name="claimUrl" defaultValue={reward?.claimUrl || ""} placeholder="https://..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Main Content Image URL</Label>
            <Input id="image" type="text" name="image" defaultValue={reward?.image || ""} placeholder="https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previewImage">Preview Image URL</Label>
            <Input id="previewImage" type="text" name="previewImage" defaultValue={reward?.previewImage || ""} placeholder="https://lcusyxguyutbfjyqawzi.supabase.co/storage/v1/object/public/newfreerewards/images/..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiresAt">Expires At</Label>
            <Input id="expiresAt" type="datetime-local" name="expiresAt" defaultValue={formatDateForInput(reward?.expiresAt)} />
          </div>

          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={reward.status}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          )}

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              defaultValue={reward?.description}
              required
              placeholder="Detailed description of the reward..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[80px]"
            />
          </div>

          <div className="md:col-span-2 mt-2">
            <Button type="submit" variant={isEditing ? "default" : "default"} className={!isEditing ? "bg-green-600 hover:bg-green-700 text-white" : "w-full md:w-auto"}>
              {isEditing ? "Update Reward" : "Create Reward"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
