"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/authSlice";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, hydrated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  if (!hydrated) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl">
          <Link href="/">Portfolio</Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/#home" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/#about" className="hover:text-blue-400 transition">About Me</Link>
          <Link href="/#projects" className="hover:text-blue-400 transition">Projects</Link>
          <Link href="/#blog" className="hover:text-blue-400 transition">Blog</Link>

          {user && (
            <>
              <Link href="/resume-builder" className="hover:text-blue-400 transition">Resume Builder</Link>

              {user.role === "ADMIN" && (
                <>
                  <Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                  <Link href="/project-management" className="hover:text-blue-400 transition">Project Management</Link>
                  <Link href="/manage-about" className="hover:text-blue-400 transition">Manage About</Link>
                 
                </>
              )}
            </>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:text-blue-400 transition">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 bg-gray-800 rounded-lg p-4">
          <Link href="/#home" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/#about" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>About Me</Link>
          <Link href="/#projects" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link href="/#blog" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Blog</Link>

          {user && (
            <>
              <Link href="/resume-builder" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Resume Builder</Link>

              {user.role === "ADMIN" && (
                <>
                  <Link href="/dashboard" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <Link href="/project-management" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Project Management</Link>
                  <Link href="/manage-about" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Manage About</Link>
                  
                </>
              )}
            </>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:text-blue-400" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
