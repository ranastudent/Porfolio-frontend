import AboutMe from "@/components/AboutMe";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import BlogList from "@/components/BlogList";

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
        <BlogList />
      </section>
    </main>
  );
}
