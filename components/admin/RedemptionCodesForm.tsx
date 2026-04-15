"use client";

import { useState } from "react";
import { saveRedemptionCodes } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { Platform } from "@prisma/client";

type CodeItem = {
  value: string;
  label: string;
};

export function RedemptionCodesForm({ 
  platform, 
  initialCodes = [] 
}: { 
  platform: Platform; 
  initialCodes?: CodeItem[]; 
}) {
  const [codes, setCodes] = useState<CodeItem[]>(initialCodes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCode = () => {
    setCodes([{ value: "", label: "" }, ...codes]);
  };

  const removeCode = (index: number) => {
    setCodes(codes.filter((_, i) => i !== index));
  };

  const updateCode = (index: number, field: keyof CodeItem, value: string) => {
    const newCodes = [...codes];
    newCodes[index][field] = value;
    setCodes(newCodes);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("codes", JSON.stringify(codes.filter(c => c.value.trim() !== "")));
      await saveRedemptionCodes(platform.id, formData);
      alert("Codes saved successfully!");
    } catch (err) {
      alert("Failed to save codes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="shadow-sm border-gray-200 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b mb-4">
          <div>
            <CardTitle className="text-xl">Redemption Codes for {platform.name}</CardTitle>
            <CardDescription>Add or remove active codes for this game.</CardDescription>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button type="button" variant="outline" onClick={addCode} className="w-full border-dashed">
            <Plus className="w-4 h-4 mr-2" /> Add New Code
          </Button>
          
          {codes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No codes currently active. Add one!
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              {codes.map((code, index) => (
                <div key={index} className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg border">
                  <div className="space-y-1 flex-1">
                    <Label className="text-xs">Code (e.g. FREEGEMS)</Label>
                    <Input 
                      placeholder="Code"
                      value={code.value} 
                      onChange={(e) => updateCode(index, "value", e.target.value)} 
                      required
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label className="text-xs">Reward (e.g. 500 Gems)</Label>
                    <Input 
                      placeholder="Label / Reward Description"
                      value={code.label} 
                      onChange={(e) => updateCode(index, "label", e.target.value)} 
                    />
                  </div>
                  <Button 
                    type="button" 
                    size="icon" 
                    variant="ghost" 
                    className="text-destructive self-end mb-1" 
                    onClick={() => removeCode(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
