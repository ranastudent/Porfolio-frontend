"use client";
import React from "react";
import ProjectForm from "@/components/ProjectForm"; // adjust path if needed
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function AddProjectPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>

      <ProjectForm
        onSuccess={() => {
          toast.success("✅ Project created successfully!");
          setTimeout(() => {
            router.push("/"); // redirect after toast
          }, 1200);
        }}
        onError={(errMsg?: string) => {
          toast.error(errMsg || "❌ Failed to create project");
        }}
      />
    </div>
  );
}
