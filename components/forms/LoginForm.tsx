"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/services/authService";
import toast from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = await login({
        email,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Login successful");
      router.replace(searchParams.get("next") || "/dashboard");
      router.refresh();
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4"
    >
      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border p-3"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-lg border p-3"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button className="w-full rounded-lg bg-black p-3 text-white">
        Login
      </button>
    </form>
  );
}
