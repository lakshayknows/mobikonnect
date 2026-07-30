"use client";

import { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Code2,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { postBodyClass } from "@/components/blog/PostBody";
import { cn } from "@/lib/cn";

/**
 * Tiptap is headless, so the editing surface can reuse `postBodyClass` — the
 * exact prose styles the published article uses. What you type is what ships.
 *
 * StarterKit v3 already bundles Link and Underline, so they are configured here
 * rather than registered as separate extensions (double registration warns).
 */

type Props = {
  initialContent?: unknown;
  onChange: (value: { html: string; json: unknown }) => void;
  onRequestImage?: () => Promise<string | null>;
};

export function RichTextEditor({ initialContent, onChange, onRequestImage }: Props) {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    // Tiptap v3 requires this off for SSR to avoid hydration mismatches.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
        codeBlock: { HTMLAttributes: { class: "not-prose" } },
      }),
      Image.configure({ HTMLAttributes: { loading: "lazy" } }),
      Placeholder.configure({ placeholder: "Start writing the post…" }),
    ],
    content: (initialContent as never) ?? "",
    editorProps: {
      attributes: {
        class: cn(postBodyClass, "min-h-[420px] max-w-none px-5 py-5 focus:outline-none"),
      },
    },
    onUpdate: ({ editor: e }) => onChange({ html: e.getHTML(), json: e.getJSON() }),
  });

  useEffect(() => setMounted(true), []);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // Block javascript: and other non-navigational schemes at the source too.
    if (!/^(https?:|mailto:|tel:|\/|#)/i.test(url)) {
      window.alert("Only http(s), mailto, tel or relative links are allowed.");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const insertImage = useCallback(async () => {
    if (!editor) return;
    const url = onRequestImage ? await onRequestImage() : window.prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor, onRequestImage]);

  if (!mounted || !editor) {
    return (
      <div className="rounded-lg border border-cream-line bg-ink-deep">
        <div className="h-12 border-b border-cream-line" />
        <div className="min-h-[420px] px-5 py-5 text-sm text-cream-faint">Loading editor…</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-cream-line bg-ink-deep focus-within:border-coral/60">
      <Toolbar editor={editor} onLink={setLink} onImage={insertImage} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({
  editor,
  onLink,
  onImage,
}: {
  editor: Editor;
  onLink: () => void;
  onImage: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-cream-line bg-ink-soft/40 px-2 py-1.5">
      <ToolButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </ToolButton>
      <ToolButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </ToolButton>
      <ToolButton
        label="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolButton>
      <ToolButton
        label="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </ToolButton>

      <Divider />

      <ToolButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </ToolButton>
      <ToolButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" />
      </ToolButton>

      <Divider />

      <ToolButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </ToolButton>
      <ToolButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </ToolButton>
      <ToolButton
        label="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </ToolButton>
      <ToolButton
        label="Code block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code2 className="h-4 w-4" />
      </ToolButton>

      <Divider />

      <ToolButton label="Link" active={editor.isActive("link")} onClick={onLink}>
        <Link2 className="h-4 w-4" />
      </ToolButton>
      <ToolButton
        label="Remove link"
        disabled={!editor.isActive("link")}
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Link2Off className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Insert image" onClick={onImage}>
        <ImageIcon className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="h-4 w-4" />
      </ToolButton>

      <Divider />

      <ToolButton
        label="Undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className="h-4 w-4" />
      </ToolButton>
      <ToolButton
        label="Redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className="h-4 w-4" />
      </ToolButton>
    </div>
  );
}

function ToolButton({
  children,
  label,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "rounded p-2 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-30",
        active ? "bg-coral/15 text-coral" : "text-cream-dim hover:bg-ink-soft hover:text-cream",
      )}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="mx-1 h-5 w-px bg-cream-line" />;
