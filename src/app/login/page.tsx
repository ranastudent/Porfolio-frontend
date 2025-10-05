/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormEvent, useState } from "react";
import { useLoginUserMutation } from "../../redux/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Spinner from "@/components/Spinner";


export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }).unwrap();

      // ✅ normalize role
      const normalizedRole = res.user.role;

      dispatch(setCredentials({ token: res.token, user: res.user, role: normalizedRole  }));
      toast.success("Login successful!");

      // ✅ consistent navigation
      if (normalizedRole === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid email or password");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Not registered yet?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Click here to register
          </Link>
        </p>
      </div>
    </div>
  );
}
