"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

type LoginData = {
  username: string;
  password: string;
};

export const login = async (values: LoginData) => {
  const { username, password } = values;

  const defaultCredentials = {
    username: "admin",
    password: "admin",
  };

  if (!username || username.trim().length === 0) {
    return { error: "Username is required." };
  }

  if (!password || password.trim().length === 0) {
    return { error: "Password is required." };
  }

  if (
    username !== defaultCredentials.username ||
    password !== defaultCredentials.password
  ) {
    return { error: "Invalid credentials." };
  }

  await createSession(username);

  return {
    success: "Logged in successfully.",
  };
};

export const logout = () => {
  deleteSession();
  redirect("/login");
};
