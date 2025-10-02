// src/app/blog/[slug]/page.tsx
import BlogDetails from "../../../components/BlogDetails";

// Pretend we fetch from API
async function getBlog(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`, {
    next: { revalidate: 60 }, // ISR for blog details
  });
  if (!res.ok) return null;
  return res.json();
}

// 👇 Generate SEO dynamically
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found | My Portfolio",
      description: "This blog could not be found.",
    };
  }

  return {
    title: `${blog.title} | My Portfolio`,
    description: blog.excerpt || "Read this detailed blog post.",
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imageUrl || "/default-blog.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imageUrl || "/default-blog.png"],
    },
  };
}

export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return <h1>Blog Not Found</h1>;
  }

  return <BlogDetails  />;
}
