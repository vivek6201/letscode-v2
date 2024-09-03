"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapUnderline from "@tiptap/extension-underline";
import TipTapLink from "@tiptap/extension-link";
import TipTapHighlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TipTapYoutube from "@tiptap/extension-youtube";
import { all, createLowlight } from "lowlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Image from "@tiptap/extension-image";
import ImageResize from 'tiptap-extension-resize-image';

const TiptapRenderer = ({ content }: { content: any }) => {
  const lowlight = createLowlight(all);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapUnderline,
      TipTapLink.configure({
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          target: "_blank",
          class: "text-blue-400 cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TipTapHighlight.configure({ multicolor: true }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-black/30",
        },
      }),
      TipTapYoutube.configure({
        nocookie: true,
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Placeholder.configure({
        placeholder: "Write your content…",
      }),
      Image,
      ImageResize,
      Superscript,
      Subscript,
    ],
    content,
    editable: false, // Disable editing
  });

  if (!editor) return null;

  return (
    <EditorContent editor={editor} className="prose dark:prose-invert max-w-none"/>
  );
};

export default TiptapRenderer;
