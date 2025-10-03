"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store"; // adjust path if needed
import { useEffect } from "react";
import { hydrateAuth } from "@/redux/features/authSlice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  // 🔹 Run once on client to sync localStorage → Redux
  useEffect(() => {
    store.dispatch(hydrateAuth());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
