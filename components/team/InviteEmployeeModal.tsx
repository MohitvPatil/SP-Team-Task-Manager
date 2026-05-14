"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { inviteEmployee } from "@/services/teamService";

interface InviteEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export default function InviteEmployeeModal({
  isOpen,
  onClose,
  projectId,
}: InviteEmployeeModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !position) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await inviteEmployee(email, projectId, role, position);
      toast.success("Invitation sent successfully");
      setEmail("");
      setPosition("");
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to invite employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-1">
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          Invite to Project
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Send an email invitation to join this project.
        </p>

        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="employee@company.com"
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white p-3 text-sm outline-none focus:border-gray-800 dark:focus:border-gray-500 transition-colors"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Initial Position
              </label>
              <input
                type="text"
                placeholder="e.g. Designer"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white p-3 text-sm outline-none focus:border-gray-800 dark:focus:border-gray-500 transition-colors"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Initial Role
              </label>
              <select
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white p-3 text-sm outline-none focus:border-gray-800 dark:focus:border-gray-500 transition-colors appearance-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="MEMBER">Member</option>
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 py-3.5 text-sm font-bold text-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50 shadow-lg shadow-gray-200 dark:shadow-none"
          >
            {loading ? "Sending..." : "Send Invitation"}
          </button>
        </form>
      </div>
    </Modal>
  );
}