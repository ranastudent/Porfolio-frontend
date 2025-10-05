/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type Role = "admin" | "user" | "agent" | null;

interface AuthState {
  token: string | null;
  user: any | null;
  role: Role;
  hydrated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  role: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: any; role: Role }>
    ) => {
      const { token, user, role } = action.payload;
      state.token = token;
      state.user = user;
      state.role = role;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        if (role) localStorage.setItem("role", role);
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
      }
    },
    hydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const role = localStorage.getItem("role") as Role;

        state.token = token;
        state.user = user ? JSON.parse(user) : null;
        state.role = role ?? null;
        state.hydrated = true;
      }
    },
  },
});

export const { setCredentials, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
