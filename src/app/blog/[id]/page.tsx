import { Metadata } from "next";
import BlogDetails from "../../../components/BlogDetails";

export const revalidate = 60;

type BlogPageProps = {
  params: Promise<{ id: string }>;
};

// Fetch individual blog from backend
async function getBlog(id: string) {
  try {
    const res = await fetch(
      `https://portfolio-backend-kuda.onrender.com/api/blogs/${id}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      console.error(`Failed to fetch blog (status: ${res.status})`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { id } = await params; // 👈 important change here
  const blog = await getBlog(id);

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

export default async function BlogDetailsPage({ params }: BlogPageProps) {
  const { id } = await params; // 👈 same here
  const blog = await getBlog(id);

  if (!blog) {
    return <h1 className="text-center py-10">Blog Not Found</h1>;
  }

  return <BlogDetails blog={blog} />;
}
