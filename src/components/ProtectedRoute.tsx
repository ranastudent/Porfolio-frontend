"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string; // Expected role, e.g., "ADMIN"
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!token || !user) {
      // Not logged in → force logout and go to login
      dispatch(logout());
      router.push("/login");
    } else if (role && user.role !== role) {
      // Logged in but doesn’t match required role → logout and redirect
      dispatch(logout());
      router.push("/login");
    }
  }, [token, user, role, dispatch, router]);

  if (!token || !user) return null; // Prevent rendering before check

  return <>{children}</>;
}
