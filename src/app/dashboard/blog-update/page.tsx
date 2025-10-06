/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useGetAllBlogsQuery, useUpdateBlogMutation, useDeleteBlogMutation } from "@/redux/features/blog/blogSlice";
import toast from "react-hot-toast";

export default function BlogUpdatePage() {
  const { data: blogs = [], isLoading: loadingBlogs } = useGetAllBlogsQuery();
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const handleSelectBlog = (id: string) => {
    const blog = blogs.find((b: any) => b.id === id || b._id === id);
    if (!blog) {
      toast.error("Blog not found!");
      return;
    }

    setSelectedBlog(blog);
    setTitle(blog.title || "");
    setDescription(blog.description || "");
    setEditMode(false);
  };

  const handleEdit = () => {
    if (!selectedBlog) {
      toast.error("Select a blog first!");
      return;
    }
    setEditMode(true);
    toast("Edit mode activated ✏️");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBlog) {
      toast.error("Please select a blog to update!");
      return;
    }

    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required!");
      return;
    }

    try {
      await updateBlog({
        id: selectedBlog.id || selectedBlog._id,
        title,
        description,
      }).unwrap();

      toast.success("✅ Blog updated successfully!");
      setEditMode(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update blog");
    }
  };

  const handleDelete = async () => {
    if (!selectedBlog) {
      toast.error("Please select a blog to delete!");
      return;
    }

    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    try {
      await deleteBlog(selectedBlog.id || selectedBlog._id).unwrap();
      toast.success("🗑 Blog deleted successfully!");
      setSelectedBlog(null);
      setTitle("");
      setDescription("");
      setEditMode(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Blog</h2>

      {loadingBlogs ? (
        <p>Loading blogs...</p>
      ) : (
        <select
          className="w-full border p-2 rounded-md mb-4"
          onChange={(e) => handleSelectBlog(e.target.value)}
          value={selectedBlog?.id || selectedBlog?._id || ""}
        >
          <option value="">-- Select a blog to edit --</option>
          {blogs.map((b: any) => (
            <option key={b.id || b._id} value={b.id || b._id}>
              {b.title}
            </option>
          ))}
        </select>
      )}

      {selectedBlog && (
        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Blog title"
            className="w-full border p-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!editMode}
          />

          {/* Description */}
          <textarea
            placeholder="Short description"
            className="w-full border p-2 rounded-md min-h-[80px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!editMode}
          />

          {/* Edit / Update / Delete Buttons */}
          <div className="flex gap-4 mt-4">
            {!editMode && (
              <>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`px-4 py-2 rounded-md ${
                    isDeleting
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </>
            )}

            {editMode && (
              <button
                type="submit"
                disabled={isUpdating}
                className={`px-4 py-2 rounded-md ${
                  isUpdating
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isUpdating ? "Updating..." : "Update Blog"}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
