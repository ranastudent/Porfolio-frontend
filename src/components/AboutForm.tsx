/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useCreateAboutMutation } from "@/redux/features/about/aboutApi";
import { toast } from "react-hot-toast";

export default function AboutForm() {
  const [createAbout, { isLoading }] = useCreateAboutMutation();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    email: "",
    contact: "",
    skills: "",
    image: "", // use string for image URL
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert skills string to array
      const skillsArray = form.skills
        ? form.skills.split(",").map((s) => s.trim())
        : [];

      const payload = {
        name: form.name,
        bio: form.bio,
        email: form.email,
        contact: form.contact || null,
        skills: skillsArray,
        image: form.image || null, // send as URL string
      };

      await createAbout(payload).unwrap();
      toast.success("About created successfully!");

      // Reset form
      setForm({
        name: "",
        bio: "",
        email: "",
        contact: "",
        skills: "",
        image: "",
      });
    } catch (error: any) {
      console.error(error);
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data)
          ? error.data.map((e: any) => e.message).join(", ")
          : "Failed to create About.");
      toast.error(message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create About Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="contact"
          placeholder="Contact (optional)"
          value={form.contact}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
