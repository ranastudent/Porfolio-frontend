/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useGetProjectByIdQuery, useUpdateProjectMutation } from "../redux/features/project/projectSlice";
import toast from "react-hot-toast";

interface ProjectEditFormProps {
  projectId: string;
  onSuccess?: () => void;
}

export default function ProjectEditForm({ projectId, onSuccess }: ProjectEditFormProps) {
  const { data: project, isLoading } = useGetProjectByIdQuery(projectId);
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [liveLink, setLiveLink] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setFeatures(project.features || [""]);
      setLiveLink(project.liveLink || "");
      setRepoLink(project.repoLink || "");
      setThumbnailUrl(project.thumbnail || "");
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProject({
        id: projectId,
        data: {
          title,
          description,
          features,
          liveLink,
          repoLink,
          thumbnail: thumbnailUrl,
        },
      }).unwrap();
      toast.success("✅ Project updated successfully");
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "❌ Failed to update project");
    }
  };

  if (isLoading) return <p>Loading project...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow rounded">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <div>
        <label className="block font-medium">Features</label>
        {features.map((f, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              value={f}
              onChange={(e) => {
                const newFeatures = [...features];
                newFeatures[idx] = e.target.value;
                setFeatures(newFeatures);
              }}
              className="flex-1 p-2 border rounded"
              required
            />
            {idx > 0 && (
              <button
                type="button"
                onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => setFeatures([...features, ""])} className="px-3 py-1 bg-blue-500 text-white rounded">
          + Add Feature
        </button>
      </div>
      <input
        type="url"
        placeholder="Thumbnail URL"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Live Link"
        value={liveLink}
        onChange={(e) => setLiveLink(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Repository Link"
        value={repoLink}
        onChange={(e) => setRepoLink(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" disabled={updating} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
        {updating ? "Saving..." : "Update Project"}
      </button>
    </form>
  );
}
