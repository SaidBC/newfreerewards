"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TEMPLATES, type TemplateInfo } from "@/lib/rewardTemplates";

export default function TemplateSelector() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Store selection in sessionStorage to pass to the form
    sessionStorage.setItem("selectedTemplate", templateId);
    router.push(`/admin/rewards/new?template=${templateId}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Create New Reward</h1>
        <p className="text-muted-foreground">
          Choose a template to get started quickly, or create from scratch
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {TEMPLATES.map((template: TemplateInfo) => (
          <Card
            key={template.id}
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary group"
          >
            <CardHeader>
              <div className="flex items-start gap-4">
                <div
                  className={`text-4xl p-3 rounded-lg ${template.color} bg-opacity-10`}
                >
                  {template.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {template.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => handleSelectTemplate(template.id)}
                disabled={selectedTemplate === template.id}
              >
                {selectedTemplate === template.id
                  ? "Loading..."
                  : "Use This Template"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/rewards/new?template=NONE")}
          className="text-muted-foreground"
        >
          Skip template - Create from scratch
        </Button>
      </div>
    </div>
  );
}
