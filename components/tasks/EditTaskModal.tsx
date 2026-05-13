"use client";

import Modal from "@/components/ui/Modal";

import FileUpload from "@/components/ui/FileUpload";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditTaskModal({
  isOpen,
  onClose,
}: EditTaskModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="mb-6 text-2xl font-bold">
        Edit Task
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          className="w-full rounded-xl border p-3"
        />

        <textarea
          placeholder="Task Description"
          className="w-full rounded-xl border p-3"
        />

        <select className="w-full rounded-xl border p-3">
          <option>HIGH</option>
          <option>MEDIUM</option>
          <option>LOW</option>
        </select>

        <select className="w-full rounded-xl border p-3">
          <option>TODO</option>

          <option>
            IN_PROGRESS
          </option>

          <option>
            COMPLETED
          </option>
        </select>

        <FileUpload />

        <button className="w-full rounded-xl bg-black py-3 text-white">
          Update Task
        </button>
      </form>
    </Modal>
  );
}