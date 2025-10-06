import BlogDetails from "../../../components/BlogDetails";

// ISR: fetch individual blog every 60 seconds
export const revalidate = 60;

async function getBlog(id: string) {
  const res = await fetch(
    `https://portfolio-backend-kuda.onrender.com/api/blogs/${id}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  return res.json();
}

// Dynamic SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);

  if (!blog) {
    return {
      title: "Blog Not Found | My Portfolio",
      description: "This blog could not be found.",
    };
  }

  return {
    title: `${blog.title} | My Portfolio`,
    description: blog.description || "Read this detailed blog post.",
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.image || "/default-blog.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image || "/default-blog.png"],
    },
  };
}

export default async function BlogDetailsPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);

  if (!blog) return <h1 className="text-center py-10">Blog Not Found</h1>;

  return <BlogDetails blog={blog} />;
}
