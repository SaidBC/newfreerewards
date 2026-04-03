"use client";

import { useState, useEffect } from "react";
import { Platform, Reward, RewardContent } from "@prisma/client";
import { createReward, updateReward } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, GripVertical, Image as ImageIcon, Link as LinkIcon, Type, Code } from "lucide-react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../editor/Editor"), { ssr: false });

type ContentBlock = {
  type: "text" | "image" | "link" | "code";
  value?: string;
  href?: string;
  label?: string;
  imageSrc?: string;
  imageAlt?: string;
  translations: any;
};

export function RewardForm({ 
  platforms, 
  reward, 
  initialContents = [],
  onChange
}: { 
  platforms: Platform[]; 
  reward?: Reward; 
  initialContents?: RewardContent[];
  onChange?: (data: any) => void;
}) {
  const isEditing = !!reward;
  
  const [translations, setTranslations] = useState<any>(reward?.translations || { es: { title: "", description: "" }, ar: { title: "", description: "" } });
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(
    initialContents.map(c => ({
      type: c.type as any,
      value: c.value || "",
      href: c.href || "",
      label: c.label || "",
      imageSrc: c.imageSrc || "",
      imageAlt: c.imageAlt || "",
      translations: c.translations || { es: {}, ar: {} }
    })) || []
  );

  const [basicInfo, setBasicInfo] = useState({
    title: reward?.title || "",
    description: reward?.description || "",
    slug: reward?.slug || "",
    platformId: reward?.platformId || 0,
    previewImage: reward?.previewImage || "",
    claimUrl: reward?.claimUrl || "",
    status: reward?.status || "active"
  });

  useEffect(() => {
    if (onChange) {
      onChange({
        ...basicInfo,
        translations,
        contentBlocks
      });
    }
  }, [basicInfo, translations, contentBlocks, onChange]);

  const addBlock = (type: ContentBlock["type"]) => {
    setContentBlocks([...contentBlocks, { type, translations: { es: {}, ar: {} } }]);
  };

  const removeBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    setContentBlocks(newBlocks);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("translations", JSON.stringify(translations));
    formData.append("contentBlocks", JSON.stringify(contentBlocks));
    
    if (isEditing) {
      await updateReward(reward.id, formData);
    } else {
      await createReward(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Info & Localization */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-sm border-gray-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Reward" : "Add New Reward"}</CardTitle>
              <CardDescription>Enter the basic details and localized titles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="en" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="en">English (Default)</TabsTrigger>
                  <TabsTrigger value="es">Spanish</TabsTrigger>
                  <TabsTrigger value="ar">Arabic</TabsTrigger>
                </TabsList>
                
                <TabsContent value="en" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Reward Title (EN)</Label>
                      <Input 
                        name="title" 
                        value={basicInfo.title} 
                        onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input 
                        name="slug" 
                        value={basicInfo.slug} 
                        onChange={(e) => setBasicInfo({ ...basicInfo, slug: e.target.value })}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description (EN)</Label>
                    <Editor 
                      data={reward?.description ? { blocks: [{ type: "paragraph", data: { text: reward.description } }] } : undefined} 
                      onChange={(data) => {
                        // Extract plain text for simplicity or keep JSON if needed
                        // For now we use the description field as plain text or simple HTML
                      }} 
                    />
                    <input type="hidden" name="description" value={basicInfo.description} />
                  </div>
                </TabsContent>

                <TabsContent value="es" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Reward Title (ES)</Label>
                    <Input 
                      value={translations.es?.title || ""} 
                      onChange={(e) => setTranslations({ ...translations, es: { ...translations.es, title: e.target.value } })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description (ES)</Label>
                    <textarea 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={translations.es?.description || ""}
                      onChange={(e) => setTranslations({ ...translations, es: { ...translations.es, description: e.target.value } })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ar" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Reward Title (AR)</Label>
                    <Input 
                      dir="rtl"
                      value={translations.ar?.title || ""} 
                      onChange={(e) => setTranslations({ ...translations, ar: { ...translations.ar, title: e.target.value } })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description (AR)</Label>
                    <textarea 
                      dir="rtl"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={translations.ar?.description || ""}
                      onChange={(e) => setTranslations({ ...translations, ar: { ...translations.ar, description: e.target.value } })}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Content Blocks Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Step-by-Step Content Blocks</h3>
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="outline" onClick={() => addBlock("text")}><Type className="w-4 h-4 mr-1" /> Text</Button>
                <Button type="button" size="sm" variant="outline" onClick={() => addBlock("image")}><ImageIcon className="w-4 h-4 mr-1" /> Image</Button>
                <Button type="button" size="sm" variant="outline" onClick={() => addBlock("link")}><LinkIcon className="w-4 h-4 mr-1" /> Link</Button>
                <Button type="button" size="sm" variant="outline" onClick={() => addBlock("code")}><Code className="w-4 h-4 mr-1" /> Code</Button>
              </div>
            </div>

            <div className="space-y-4">
              {contentBlocks.map((block, index) => (
                <Card key={index} className="shadow-sm border-gray-200 dark:border-zinc-800">
                  <div className="p-2 border-b flex items-center justify-between bg-muted/50">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-bold uppercase tracking-wider">{block.type} Block</span>
                    </div>
                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removeBlock(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4 space-y-4">
                    {block.type === "text" && (
                      <div className="space-y-4">
                         <div className="space-y-2">
                          <Label>Value (EN)</Label>
                          <Input value={block.value} onChange={(e) => updateBlock(index, { value: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1">
                            <Label className="text-xs">Value (ES)</Label>
                            <Input value={block.translations.es?.value} onChange={(e) => updateBlock(index, { translations: { ...block.translations, es: { ...block.translations.es, value: e.target.value } } })} />
                          </div>
                           <div className="space-y-1">
                            <Label className="text-xs text-right block">Value (AR)</Label>
                            <Input dir="rtl" value={block.translations.ar?.value} onChange={(e) => updateBlock(index, { translations: { ...block.translations, ar: { ...block.translations.ar, value: e.target.value } } })} />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {block.type === "image" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Image URL / Source</Label>
                          <Input value={block.imageSrc} onChange={(e) => updateBlock(index, { imageSrc: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Alt Text (EN)</Label>
                          <Input value={block.imageAlt} onChange={(e) => updateBlock(index, { imageAlt: e.target.value })} />
                        </div>
                      </div>
                    )}

                    {block.type === "link" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Link URL (HREF)</Label>
                            <Input value={block.href} onChange={(e) => updateBlock(index, { href: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Label (EN)</Label>
                            <Input value={block.label} onChange={(e) => updateBlock(index, { label: e.target.value })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1">
                            <Label className="text-xs">Label (ES)</Label>
                            <Input value={block.translations.es?.label} onChange={(e) => updateBlock(index, { translations: { ...block.translations, es: { ...block.translations.es, label: e.target.value } } })} />
                          </div>
                           <div className="space-y-1">
                            <Label className="text-xs text-right block">Label (AR)</Label>
                            <Input dir="rtl" value={block.translations.ar?.label} onChange={(e) => updateBlock(index, { translations: { ...block.translations, ar: { ...block.translations.ar, label: e.target.value } } })} />
                          </div>
                        </div>
                      </div>
                    )}

                    {block.type === "code" && (
                      <div className="space-y-2">
                        <Label>Code Content</Label>
                        <Input value={block.value} onChange={(e) => updateBlock(index, { value: e.target.value })} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="space-y-8">
           <Card className="shadow-lg border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Reward Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 bg-background p-1 rounded-lg border">
                <Button 
                  type="button"
                  variant={basicInfo.status === 'active' ? 'default' : 'ghost'} 
                  className={`flex-1 h-9 font-bold transition-all ${basicInfo.status === 'active' ? 'shadow-md' : 'text-zinc-500'}`}
                  onClick={() => setBasicInfo({ ...basicInfo, status: 'active' })}
                >
                  ACTIVE
                </Button>
                <Button 
                  type="button"
                  variant={basicInfo.status === 'expired' ? 'destructive' : 'ghost'} 
                  className={`flex-1 h-9 font-bold transition-all ${basicInfo.status === 'expired' ? 'shadow-md' : 'text-zinc-500'}`}
                  onClick={() => setBasicInfo({ ...basicInfo, status: 'expired' })}
                >
                  EXPIRED
                </Button>
              </div>
              <input type="hidden" name="status" value={basicInfo.status} />
              
              <div className="space-y-2">
                <Label className="text-xs font-bold text-zinc-500 uppercase tracking-tight">Manual Expiration Date</Label>
                <Input 
                  type="datetime-local" 
                  name="expiresAt" 
                  className="h-9 text-xs"
                  defaultValue={reward?.expiresAt ? new Date(reward.expiresAt).toISOString().slice(0, 16) : ""} 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200 dark:border-zinc-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Publishing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Platform Target</Label>
                <select 
                  name="platformId" 
                  value={basicInfo.platformId} 
                  onChange={(e) => setBasicInfo({ ...basicInfo, platformId: parseInt(e.target.value) })}
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-medium"
                >
                  <option value={0} disabled>Select Platform</option>
                  {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Preview Image URL</Label>
                <Input 
                  name="previewImage" 
                  placeholder="https://..."
                  value={basicInfo.previewImage} 
                  onChange={(e) => setBasicInfo({ ...basicInfo, previewImage: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-primary/70">Direct Redemption Link</Label>
                <Input 
                  name="claimUrl" 
                  placeholder="https://link.clashroyale.com/..."
                  value={basicInfo.claimUrl} 
                  onChange={(e) => setBasicInfo({ ...basicInfo, claimUrl: e.target.value })}
                />
                <p className="text-[10px] text-muted-foreground italic">If provided, users will see a direct "Claim" button.</p>
              </div>
              
              <div className="pt-4 border-t">
                <Button type="submit" className="w-full h-11 font-bold text-base shadow-lg shadow-primary/20">
                  {isEditing ? "SAVE CHANGES" : "PUBLISH REWARD"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
