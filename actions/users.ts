"use server";

import { verifySession } from "@/lib/session";

export const getUsers = async () => {
  const session = await verifySession();

  if (session) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (response.ok) {
        const userData = await response.json();

        return { users: userData };
      }
    } catch (error) {
      return {
        error: "Oops! Something went wrong.",
      };
    }
  } else {
    return { error: "Unauthorized! Please login first." };
  }
};
