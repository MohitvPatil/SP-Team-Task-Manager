"use client";

import { useState } from "react";
import { register } from "@/services/authService";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await register({
        name,
        email,
        password,
      });

      toast.success(
        "Account created successfully"
      );
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="Full Name"
        className="w-full rounded-lg border p-3"
        onChange={(e) =>
          setName(e.target.value)
        }
      />

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
        Register
      </button>
    </form>
  );
}