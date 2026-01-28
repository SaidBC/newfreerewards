"use client";

import Editor from "@/components/editor/Editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function CreateRewardsCard() {
  const [content, setContent] = useState(null);
  console.log(content);

  return (
    <Card>
      <CardTitle>Create Rewards</CardTitle>
      <CardDescription>
        Fill the following for creating a reward
      </CardDescription>
      <CardContent>
        <Editor onChange={setContent} />
      </CardContent>
    </Card>
  );
}
