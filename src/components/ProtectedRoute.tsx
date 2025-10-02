"use client";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode;
  role: "ADMIN" | "USER";
}) {
  const { token, role: userRole } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else if (role && userRole !== role) {
      router.replace("/"); // redirect non-admins to home
    }
  }, [token, userRole, router, role]);

  return <>{children}</>;
}
