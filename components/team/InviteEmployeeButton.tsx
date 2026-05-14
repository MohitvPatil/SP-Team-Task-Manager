"use client";

import { useState } from "react";
import InviteEmployeeModal from "./InviteEmployeeModal";

export default function InviteEmployeeButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <InviteEmployeeModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 px-6 py-3 text-white font-semibold hover:bg-gray-800 transition-colors"
      >
        Invite Employee
      </button>
    </>
  );
}