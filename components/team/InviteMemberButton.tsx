"use client";

import { useState } from "react";

import InviteMemberModal from "./InviteMemberModal";

export default function InviteMemberButton() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <InviteMemberModal
        isOpen={open}
        onClose={() =>
          setOpen(false)
        }
      />

      <button
        onClick={() =>
          setOpen(true)
        }
        className="rounded-xl bg-black px-6 py-3 text-white"
      >
        Invite Member
      </button>
    </>
  );
}