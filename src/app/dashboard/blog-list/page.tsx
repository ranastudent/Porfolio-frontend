import BlogList from "@/components/BlogListDashboard";

// ISR: rebuild every 60 seconds
export const revalidate = 60;

async function getAllBlogs() {
  const res = await fetch("https://portfolio-backend-kuda.onrender.com/api/blogs", {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function AllBlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <main>
      <BlogList blogs={blogs} />
    </main>
  );
}
