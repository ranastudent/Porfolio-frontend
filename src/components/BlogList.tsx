/* eslint-disable @typescript-eslint/no-explicit-any */
export const revalidate = 120; // ISR every 2 minutes

async function getBlogs() {
  const res = await fetch("https://portfolio-backend-kuda.onrender.com/api/blogs", {
    next: { revalidate: 120 }, // ISR
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export default async function BlogList() {
  const blogs = await getBlogs();

  return (
    <section className="py-12 px-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>
      <div className="space-y-4">
        {blogs.map((blog: any) => (
          <div key={blog.id} className="p-4 border rounded-md shadow-sm">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.excerpt || blog.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </section>
  );
}
