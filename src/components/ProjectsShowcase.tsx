/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import Link from "next/link";
import { useState, useEffect } from "react";
import ConfirmModal from "./ConfirmModal";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDeleteProjectMutation } from "../redux/features/project/projectSlice";

export default function ProjectsShowcase() {
  const { role } = useSelector((state: RootState) => state.auth);
  const [projects, setProjects] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const [deleteProject] = useDeleteProjectMutation();

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(
        "https://portfolio-backend-kuda.onrender.com/api/projects",
        { next: { revalidate: 60 } }
      );
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id).unwrap();
      toast.success("Project deleted successfully ✅");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete project ❌");
    } finally {
      setModalOpen(false);
      setSelectedProjectId(null);
    }
  };

  // Helper to get safe thumbnail URL
  const getThumbnailUrl = (thumbnail: string | null | undefined) => {
    if (!thumbnail) return null;

    if (thumbnail.startsWith("http")) return thumbnail;

    // Backend image path
    return `https://portfolio-backend-kuda.onrender.com/uploads/${thumbnail}`;
  };

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Projects Showcase</h2>

      <div className="grid md:grid-cols-3 gap-6 sm:grid-cols-1">
        {projects.map((project) => {
          const thumbnailUrl = getThumbnailUrl(project.thumbnail);

          return (
            <div
              key={project.id}
              className="p-4 border rounded-lg shadow-md bg-white flex flex-col"
            >
              {/* Thumbnail */}
              {thumbnailUrl ? (
                <div className="relative w-full h-48 mb-4">
                  <img
                    src={project.thumbnail || "/placeholder.png"}
                    alt={project.title}
                    className="object-cover w-full h-64 rounded"
                  />
                </div>
              ) : (
                <div className="w-full h-48 mb-4 bg-gray-200 flex items-center justify-center rounded text-gray-500">
                  No Image
                </div>
              )}

              {/* Title + Description */}
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-3 line-clamp-3">
                {project.description}
              </p>

              {/* Features */}
              {project.features?.length > 0 && (
                <ul className="list-disc list-inside mb-3 text-sm text-gray-700">
                  {project.features
                    .slice(0, 4)
                    .map((f: string, idx: number) => (
                      <li key={idx}>{f}</li>
                    ))}
                </ul>
              )}

              {/* Links */}
              <div className="mt-auto flex gap-3 mb-2">
                {project.repoLink && (
                  <Link
                    href={project.repoLink}
                    target="_blank"
                    className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
                  >
                    GitHub
                  </Link>
                )}
                {project.liveLink && (
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500"
                  >
                    Live Site
                  </Link>
                )}
              </div>

              {/* ADMIN Buttons */}
              {role === "ADMIN" && (
                <div className="flex gap-2">
                  <Link
                    href={`/project-edit/${project.id}`}
                    className="flex-1 text-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      setModalOpen(true);
                    }}
                    className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => selectedProjectId && handleDelete(selectedProjectId)}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </section>
  );
}
