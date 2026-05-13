"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
} from "@/services/authService";

export default function useAuth() {
  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchUser =
      async () => {
        try {
          const data =
            await getCurrentUser();

          setUser(data);
        } catch {
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

    fetchUser();
  }, []);

  return {
    user,
    loading,
  };
}