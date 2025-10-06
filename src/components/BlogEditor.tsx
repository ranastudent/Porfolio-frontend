/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useCreateBlogMutation } from "@/redux/features/blog/blogSlice";
import toast from "react-hot-toast";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [mounted, setMounted] = useState(false);

  const [createBlog, { isLoading }] = useCreateBlogMutation();

  // Wait for client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({
        placeholder: "Write your amazing blog here...",
      }),
    ],
    content: "<p></p>",
    immediatelyRender: false, // ✅ prevent SSR hydration mismatch
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editor) return;
    const content = editor.getHTML();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required!");
      return;
    }

    try {
      await createBlog({ title, image, content }).unwrap();
      toast.success("Blog created successfully!");
      setTitle("");
      setImage("");
      editor.commands.setContent("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create blog");
    }
  };

  // 🚫 Prevent TipTap from rendering before client mount
  if (!mounted) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Enter blog title"
        className="w-full border p-2 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Cover Image URL */}
      <input
        type="text"
        placeholder="Enter image URL (optional)"
        className="w-full border p-2 rounded-md"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* TipTap Editor */}
      <div className="border rounded-md min-h-[300px] p-3">
        <EditorContent editor={editor} />
      </div>

      {/* Toolbar */}
      {editor && (
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 border rounded ${
              editor.isActive("bold") ? "bg-blue-500 text-white" : ""
            }`}
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 border rounded ${
              editor.isActive("italic") ? "bg-blue-500 text-white" : ""
            }`}
          >
            Italic
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`px-2 py-1 border rounded ${
              editor.isActive("paragraph") ? "bg-blue-500 text-white" : ""
            }`}
          >
            Paragraph
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`px-2 py-1 border rounded ${
              editor.isActive("heading", { level: 2 })
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="px-2 py-1 border rounded"
          >
            HR
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt("Enter image URL");
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
            className="px-2 py-1 border rounded"
          >
            Image
          </button>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {isLoading ? "Publishing..." : "Publish Blog"}
      </button>
    </form>
  );
}
