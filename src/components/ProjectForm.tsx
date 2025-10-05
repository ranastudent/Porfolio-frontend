/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../redux/features/project/projectSlice";
import toast from "react-hot-toast";

interface ProjectFormProps {
  project?: any;
  onSuccess?: () => void;
  onError?: (errMsg?: string) => void;
}

export default function ProjectForm({
  project,
  onSuccess,
  onError,
}: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [features, setFeatures] = useState<string[]>(project?.features || [""]);
  const [liveLink, setLiveLink] = useState(project?.liveLink || "");
  const [repoLink, setRepoLink] = useState(project?.repoLink || "");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    project?.thumbnail || ""
  ); // ✅ URL input

  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();

  const data = new FormData();
  data.append("title", title);
  data.append("description", description);

  // Handle feature change
  const handleFeatureChange = (value: string, index: number) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index: number) =>
    setFeatures(features.filter((_, i) => i !== index));

  // Submit handler
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Fix common i.ibb.co typo
  let fixedThumbnail = thumbnailUrl;
  if (fixedThumbnail.includes("i.ibb.co.com")) {
    fixedThumbnail = fixedThumbnail.replace("i.ibb.co.com", "i.ibb.co");
  }

  const payload = {
    title,
    description,
    features,
    thumbnail: fixedThumbnail, // ✅ fixed URL
    liveLink,
    repoLink,
  };

  try {
    if (project) {
      await updateProject({ id: project.id, data: payload }).unwrap();
      toast.success("✅ Project updated successfully");
    } else {
      await createProject(payload).unwrap();
      toast.success("✅ Project created successfully");
    }
    onSuccess?.();
  } catch (error: any) {
    const msg = error?.data?.message || "❌ Failed to save project";
    toast.error(msg);
    onError?.(msg);
  }
};



  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold">
        {project ? "Update Project" : "Create Project"}
      </h2>

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
        {features.map((feature, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(e.target.value, idx)}
              placeholder={`Feature ${idx + 1}`}
              className="flex-1 p-2 border rounded"
              required
            />
            {idx > 0 && (
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          + Add Feature
        </button>
      </div>

      <input
        type="url"
        placeholder="Thumbnail Image URL"
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

      <button
        type="submit"
        disabled={creating || updating}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {creating || updating
          ? "Saving..."
          : project
          ? "Update Project"
          : "Create Project"}
      </button>
    </form>
  );
}
