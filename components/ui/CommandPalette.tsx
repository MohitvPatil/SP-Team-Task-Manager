"use client";

import {
  useEffect,
  useState,
} from "react";

export default function CommandPalette() {
  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (
        e.ctrlKey &&
        e.key === "k"
      ) {
        e.preventDefault();

        setOpen((prev) => !prev);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-32">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <input
          type="text"
          placeholder="Search commands..."
          className="w-full rounded-xl border p-4 outline-none"
        />

        <div className="mt-6 space-y-3">
          <button className="w-full rounded-xl border p-4 text-left hover:bg-gray-100">
            Create Task
          </button>

          <button className="w-full rounded-xl border p-4 text-left hover:bg-gray-100">
            Open Projects
          </button>

          <button className="w-full rounded-xl border p-4 text-left hover:bg-gray-100">
            Invite Team Member
          </button>
        </div>
      </div>
    </div>
  );
}