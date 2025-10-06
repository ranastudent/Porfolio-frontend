/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetAllBlogsQuery } from "../redux/features/blog/blogSlice";

export default function Blog() {
  const { data: blogs, isLoading, isError } = useGetAllBlogsQuery();

  if (isLoading)
    return <p className="text-center py-10 text-gray-500">Loading blogs...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-500">Failed to load blogs.</p>;

  const latestBlogs = blogs?.slice(0, 3); // show 3 blogs on home page

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Latest Blogs</h2>

      {/* Responsive card layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestBlogs?.map((blog: any) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="block border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {blog.image && (
              <div className="relative w-full h-52">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                {blog.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Button to go to all blogs */}
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
