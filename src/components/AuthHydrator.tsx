"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateAuth } from "../redux/features/authSlice";

export default function AuthHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  return null; // nothing to render, just hydrates
}
