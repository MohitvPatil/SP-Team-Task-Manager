"use client";

import Modal from "@/components/ui/Modal";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProjectModal({
  isOpen,
  onClose,
}: EditProjectModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="mb-6 text-2xl font-bold">
        Edit Project
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          className="w-full rounded-xl border p-3"
        />

        <textarea
          placeholder="Project Description"
          className="w-full rounded-xl border p-3"
        />

        <button className="w-full rounded-xl bg-black py-3 text-white">
          Update Project
        </button>
      </form>
    </Modal>
  );
}