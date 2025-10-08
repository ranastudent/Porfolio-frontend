import BlogList from "@/components/BlogList";

// ISR: rebuild every 60 seconds
export const revalidate = 60;

async function getAllBlogs() {
  try {
    const res = await fetch("https://portfolio-backend-kuda.onrender.com/api/blogs", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Blog fetch failed:", error);
    return [];
  }
}


export default async function AllBlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <main>
      <BlogList blogs={blogs} />
    </main>
  );
}
