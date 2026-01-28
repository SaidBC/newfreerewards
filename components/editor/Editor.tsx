"use client";

import { useEffect, useRef } from "react";

export default function Editor({
  data,
  onChange,
}: {
  data?: any;
  onChange: (data: any) => void;
}) {
  const ref = useRef<any>(null);

  useEffect(() => {
    let editor: any;

    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const Image = (await import("@editorjs/image")).default;
      const Warning = (await import("@editorjs/warning")).default;

      editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data,
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
          warning: Warning,
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile: async (file: File) => ({
                  success: 1,
                  file: {
                    url: URL.createObjectURL(file),
                  },
                }),
              },
            },
          },
        },
        async onChange() {
          const content = await editor.save();
          onChange(content);
        },
      });

      ref.current = editor;
    };

    initEditor();

    return () => {
      if (ref.current) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, []);

  return <div id="editorjs" className="prose max-w-none" />;
}
