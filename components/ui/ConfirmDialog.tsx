interface ConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-gray-500">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="rounded-xl border px-6 py-3"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-500 px-6 py-3 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}