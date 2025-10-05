"use client";
import { useRouter, useParams } from "next/navigation";
import ProjectEditForm from "../../../components/ProjectEditForm";

export default function ProjectEditPage() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <ProjectEditForm
        projectId={id as string}
        onSuccess={() => router.push("/")}
      />
    </div>
  );
}
