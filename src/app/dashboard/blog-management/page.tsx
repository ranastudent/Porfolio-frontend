import BlogEditor from "@/components/BlogEditor";

export default function CreateBlogPage() {
  return (
    <main className="pt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Create New Blog</h1>
      <BlogEditor />
    </main>
  );
}
