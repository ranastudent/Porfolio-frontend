/* eslint-disable @typescript-eslint/no-explicit-any */


export const revalidate = 60; // ISR: Rebuild every 60s

async function getProjects() {
  const res = await fetch("https://portfolio-backend-kuda.onrender.com/api/projects", {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export default async function ProjectsShowcase() {
  const projects = await getProjects();

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-6">Projects Showcase</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <div key={project.id} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
