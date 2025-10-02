"use client";

import { ReactNode } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  return (
    <ProtectedRoute role="ADMIN">
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
          <nav className="flex flex-col space-y-3">
            <Link href="/dashboard">Overview</Link>
            <Link href="/dashboard/projects">Projects</Link>
            <Link href="/dashboard/settings">Settings</Link>
            <Link href="/">Home</Link>
          </nav>
          <button
            onClick={() => dispatch(logout())}
            className="mt-auto bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow px-6 py-4">
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
