/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormEvent, useState } from "react";
import { useRegisterUserMutation } from "../../redux/api/authApiSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Spinner from "@/components/Spinner";


export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form).unwrap();
      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to register");
    }
  };

  if(isLoading) return <Spinner />

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-sm text-center mt-4">
          Already registered?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Click here to login
          </Link>
        </p>
      </div>
    </div>
  );
}
