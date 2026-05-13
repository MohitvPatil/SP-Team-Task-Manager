"use client";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import { useState } from "react";

import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserDropdown";
import MobileSidebar from "./MobileSidebar";

export default function Topbar() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <MobileSidebar
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-4 shadow">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden"
          >
            <Menu />
          </button>

          <div className="hidden items-center gap-3 rounded-xl border px-4 py-2 md:flex">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search tasks..."
              className="outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button className="relative rounded-xl border bg-white p-3 shadow">
            <Bell />

            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
          </button>

          <UserDropdown />
        </div>
      </div>
    </>
  );
}