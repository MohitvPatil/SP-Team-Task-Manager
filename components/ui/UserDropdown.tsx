"use client";

import {
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { logout } from "@/services/authService";

import toast from "react-hot-toast";

export default function UserDropdown() {
  const handleLogout =
    async () => {
      try {
        await logout();

        toast.success(
          "Logged out successfully"
        );

        window.location.href =
          "/login";
      } catch {
        toast.error(
          "Logout failed"
        );
      }
    };

  return (
    <div className="relative">
      <button className="flex items-center gap-3 rounded-xl border bg-white px-4 py-2 shadow">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
          M
        </div>

        <div className="text-left">
          <h3 className="text-sm font-semibold">
            Mohit
          </h3>

          <p className="text-xs text-gray-500">
            Admin
          </p>
        </div>
      </button>

      <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white p-3 shadow-xl">
        <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-gray-100">
          <User size={18} />

          Profile
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-gray-100">
          <Settings size={18} />

          Settings
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl p-3 text-red-500 hover:bg-red-50"
        >
          <LogOut size={18} />

          Logout
        </button>
      </div>
    </div>
  );
}