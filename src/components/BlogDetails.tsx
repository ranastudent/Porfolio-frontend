"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

export default function BlogDetails() {
  const { id } = useParams(); // e.g. /blogs/123
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        // replace with your backend API endpoint
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="p-6">Loading blog...</p>;
  if (!blog) return <p className="p-6 text-red-500">Blog not found.</p>;

  return (
    <article className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="text-gray-500 mb-6">
        By {blog.author} • {new Date(blog.date).toLocaleDateString()}
      </div>
      <div className="prose prose-lg">
        {blog.content}
      </div>
    </article>
  );
}
