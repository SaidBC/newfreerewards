"use client";

import { useState } from "react";

export default function CopyBox({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-slate-200">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md bg-slate-800 px-2 py-1 text-xs transition hover:bg-slate-700"
      >
        {copied ? "✔ Copied" : "Copy"}
      </button>

      <pre className="overflow-x-auto">
        <code>{text}</code>
      </pre>
    </div>
  );
}
