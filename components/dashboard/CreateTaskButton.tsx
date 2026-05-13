"use client";

import useModal from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import TaskForm from "@/components/forms/TaskForm";

export default function CreateTaskButton() {
  const {
    isOpen,
    openModal,
    closeModal,
  } = useModal();

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-xl bg-black px-6 py-3 text-white"
      >
        Create Task
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
      >
        <TaskForm />
      </Modal>
    </>
  );
}