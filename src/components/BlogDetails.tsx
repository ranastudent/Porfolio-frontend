/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function BlogDetails({ blog }: { blog: any }) {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mt-10 mb-6">{blog.title}</h1>

      {blog.image && (
        <div className="w-full h-64 mb-6 overflow-hidden rounded-lg">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <p className="text-gray-700 mb-4">{blog.description}</p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <p className="mt-6 text-sm text-gray-500">
        ✍️ {blog.author?.name || "Unknown"} |{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
    </section>
  );
}
