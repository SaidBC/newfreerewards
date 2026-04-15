"use client";

import { useState } from "react";

export default function CopyBox({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-slate-200 border border-slate-800 min-h-[56px] flex items-center overflow-hidden">
      {!revealed ? (
        <button 
          onClick={() => setRevealed(true)}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900/40 backdrop-blur-sm rounded-lg font-bold text-sm hover:bg-slate-800/60 transition z-10"
        >
          Click to Reveal Code
        </button>
      ) : (
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded-md bg-slate-700 px-2 py-1 text-xs font-semibold shadow-sm transition hover:bg-slate-600 z-10"
        >
          {copied ? "✔ Copied" : "Copy"}
        </button>
      )}

      <pre className={`overflow-x-auto ${!revealed ? 'opacity-30 blur-[2px] select-none' : ''}`}>
        <code>{text}</code>
      </pre>
    </div>
  );
}
