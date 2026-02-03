"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Underline as UnderlineIcon,
} from "lucide-react";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `p-2 transition-colors ${active ? "text-primary bg-dark-tertiary" : "text-gray-500 hover:text-soft-white"}`;

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-dark-tertiary bg-dark-secondary sticky top-0 z-10">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={btnClass(editor.isActive("underline"))}
      >
        <UnderlineIcon size={16} />
      </button>
      <div className="w-[1px] h-6 bg-dark-tertiary mx-1 self-center" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={btnClass(editor.isActive("heading", { level: 1 }))}
      >
        <Heading1 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive("heading", { level: 2 }))}
      >
        <Heading2 size={16} />
      </button>
      <div className="w-[1px] h-6 bg-dark-tertiary mx-1 self-center" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive("orderedList"))}
      >
        <ListOrdered size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive("blockquote"))}
      >
        <Quote size={16} />
      </button>
    </div>
  );
};

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write your article content here...",
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // MUST BE A SINGLE LINE STRING TO AVOID "InvalidCharacterError"
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[400px] p-4 font-sans text-soft-white bg-dark-primary leading-normal prose-p:my-1 prose-headings:mt-4 prose-headings:mb-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0",
      },
    },
  });

  return (
    <div className="w-full border border-dark-tertiary focus-within:border-primary transition-all overflow-hidden bg-dark-primary">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
