// src/app/blog/page.tsx
import BlogList from "@/components/BlogList";

export const metadata = {
  title: "Blog | My Portfolio",
  description: "Read my latest blogs and insights.",
};

export default function BlogPage() {
  return <BlogList />;
}
