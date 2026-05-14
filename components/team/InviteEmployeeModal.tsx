"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { inviteEmployee } from "@/services/teamService";

interface InviteEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteEmployeeModal({
  isOpen,
  onClose,
}: InviteEmployeeModalProps) {
  const [email, setEmail] = useState("");

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inviteEmployee(email);
      toast.success("Invitation sent");
      onClose();
    } catch {
      toast.error("Failed to invite employee");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Invite Team Employee
      </h2>

      <form
        onSubmit={handleInvite}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Employee Email"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white p-3 outline-none focus:border-gray-800 transition-colors"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <button className="w-full rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 py-3 text-white font-semibold hover:bg-gray-800 transition-colors">
          Send Invitation
        </button>
      </form>
    </Modal>
  );
}