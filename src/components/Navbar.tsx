"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/authSlice";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  // ✅ helper to add active class
  const linkClass = (href: string) =>
    `hover:text-blue-400 transition ${
      pathname === href ? "text-blue-500 font-semibold underline" : ""
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md text-white px-6 py-4 shadow-md mb-2">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl">
          <Link href="/" className="hover:text-blue-400">
            Portfolio
          </Link>
        </div>

        {/* Hamburger menu (mobile/tablet) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav links (desktop) */}
        <div className="hidden md:flex space-x-6">
          {/* ✅ Public */}
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/about" className={linkClass("/about")}>About Me</Link>
          <Link href="/projects" className={linkClass("/projects")}>Projects</Link>
          <Link href="/blog" className={linkClass("/blog")}>Blog</Link>

          {/* ✅ Private */}
          {user && (
            <>
              <Link href="/resume-builder" className={linkClass("/resume-builder")}>
                Resume Builder
              </Link>
              {user.role === "ADMIN" && (
                <>
                  <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
                  <Link href="/blog-management" className={linkClass("/blog-management")}>Blog Management</Link>
                  <Link href="/project-management" className={linkClass("/project-management")}>Project Management</Link>
                </>
              )}
            </>
          )}

          {/* ✅ Auth */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className={linkClass("/login")}>Login</Link>
          )}
        </div>
      </div>

      {/* Mobile/Tablet dropdown menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 bg-gray-800/80 backdrop-blur-md p-4 rounded-lg shadow-lg">
          <Link href="/" className={linkClass("/")} onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className={linkClass("/about")} onClick={() => setIsOpen(false)}>About Me</Link>
          <Link href="/projects" className={linkClass("/projects")} onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="/blog" className={linkClass("/blog")} onClick={() => setIsOpen(false)}>Blog</Link>

          {user && (
            <>
              <Link href="/resume-builder" className={linkClass("/resume-builder")} onClick={() => setIsOpen(false)}>
                Resume Builder
              </Link>
              {user.role === "ADMIN" && (
                <>
                  <Link href="/dashboard" className={linkClass("/dashboard")} onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <Link href="/blog-management" className={linkClass("/blog-management")} onClick={() => setIsOpen(false)}>Blog Management</Link>
                  <Link href="/project-management" className={linkClass("/project-management")} onClick={() => setIsOpen(false)}>Project Management</Link>
                </>
              )}
            </>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-left"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className={linkClass("/login")} onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
