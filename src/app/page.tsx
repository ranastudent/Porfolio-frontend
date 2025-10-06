import AboutMe from "@/components/AboutMe";
import Blog from "@/components/Blog";
import ProjectsShowcase from "@/components/ProjectsShowcase";



export const revalidate = 60;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getLatestBlogs() {
  const res = await fetch(
    "https://portfolio-backend-kuda.onrender.com/api/blogs"
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.slice(0, 3); // show 3 latest blogs
}


export default function HomePage() {
  return (
    <main>
      <section id="about">
        <AboutMe />
      </section>

      <section id="projects">
        <ProjectsShowcase />
      </section>

      <section id="blog">
        <Blog/>
      </section>
    </main>
  );
}
