"use client";

import useModal from "@/hooks/useModal";
import Modal from "@/components/ui/Modal";
import ProjectForm from "@/components/forms/ProjectForm";

export default function CreateProjectButton() {
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
        Create Project
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
      >
        <ProjectForm />
      </Modal>
    </>
  );
}