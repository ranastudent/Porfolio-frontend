"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  MenuIcon,
} from "lucide-react";

const sidebarLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "About", href: "/dashboard/about", icon: MenuIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "bg-gray-900 text-white flex-col transition-all duration-300 hidden md:flex",
          isOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && <span className="text-xl font-bold">My Dashboard</span>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-800"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-800"
              >
                <Icon className="h-4 w-4" />
                {isOpen && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-gray-800">
          <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm hover:bg-gray-800">
            <LogOut className="h-4 w-4" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity md:hidden",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-gray-900 text-white w-64 transform transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-bold">My Dashboard</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-800"
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-gray-800">
          <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm hover:bg-gray-800">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile top menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}
