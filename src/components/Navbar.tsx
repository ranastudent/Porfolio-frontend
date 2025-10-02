"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/authSlice";

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link href="/">Portfolio</Link>
      </div>

      <div className="flex space-x-6">
        {/* ✅ Public Nav */}
        <Link href="/">Home</Link>
        <Link href="/about">About Me</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Blog</Link>

        {/* ✅ Private Nav (visible only when logged in) */}
        {user && (
          <>
            <Link href="/resume-builder">Resume Builder</Link>

            {/* ✅ Admin-only Nav */}
            {user.role === "ADMIN" && (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/blog-management">Blog Management</Link>
                <Link href="/project-management">Project Management</Link>
              </>
            )}
          </>
        )}

        {/* ✅ Auth Buttons */}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
