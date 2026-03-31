"use client";
import { storageUrl } from "@/lib/storage";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";

interface EditorProps {
  data?: any;
  onChange?: (data: any) => void;
  holder?: string;
}

export default function Editor({ data, onChange, holder = "editorjs" }: EditorProps) {
  const ejInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const Image = (await import("@editorjs/image")).default;
    const Link = (await import("@editorjs/warning")).default; // Using warning for link-like stuff or just generic
    const Paragraph = (await import("@editorjs/paragraph")).default;

    const editor = new EditorJS({
      holder: holder,
      data: data || {},
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await editor.save();
        onChange?.(content);
      },
      tools: {
        header: Header,
        list: List,
        paragraph: Paragraph,
        image: {
          class: Image,
          config: {
            // Here we could add endpoints for image upload
            uploader: {
              uploadByFile(file: File) {
                // Placeholder for file upload to Supabase
                return Promise.resolve({
                  success: 1,
                  file: {
                    url: storageUrl("images/placeholder.png"),
                  }
                });
              },
              uploadByUrl(url: string) {
                return Promise.resolve({
                  success: 1,
                  file: {
                    url: url,
                  }
                });
              }
            }
          }
        }
      },
    });
  };

  return (
    <div id={holder} className="prose prose-sm dark:prose-invert max-w-none min-h-[100px] p-4 border rounded-md bg-background" />
  );
}
