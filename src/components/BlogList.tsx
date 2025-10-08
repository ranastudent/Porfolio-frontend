
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";

export default function BlogList({ blogs }: { blogs: any[] }) {
  if (!blogs || blogs.length === 0)
    return <p className="text-center py-10 text-gray-500">No blogs available.</p>;

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Latest Blogs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog: any) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="block border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <div className="w-full h-52 bg-gray-100 overflow-hidden">
             
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                {blog.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
}
