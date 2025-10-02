"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link href="/">Portfolio</Link>
      </div>

      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>

        {user ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
