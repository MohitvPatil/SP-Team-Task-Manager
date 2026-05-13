"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import Modal from "@/components/ui/Modal";

import { inviteMember } from "@/services/teamService";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteMemberModal({
  isOpen,
  onClose,
}: InviteMemberModalProps) {
  const [email, setEmail] =
    useState("");

  const handleInvite =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await inviteMember(email);

        toast.success(
          "Invitation sent"
        );

        onClose();
      } catch {
        toast.error(
          "Failed to invite member"
        );
      }
    };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="mb-6 text-2xl font-bold">
        Invite Team Member
      </h2>

      <form
        onSubmit={handleInvite}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Member Email"
          className="w-full rounded-xl border p-3"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <button className="w-full rounded-xl bg-black py-3 text-white">
          Send Invitation
        </button>
      </form>
    </Modal>
  );
}