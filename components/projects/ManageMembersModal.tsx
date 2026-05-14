import { useState } from "react";
import { X } from "lucide-react";
import { sampleTeamMembers } from "@/lib/sample-data";

export default function ManageMembersModal({
  initialMemberIds,
  onSave,
  onClose,
}: {
  initialMemberIds: string[];
  onSave: (memberIds: string[]) => void;
  onClose: () => void;
}) {
  const [memberIds, setMemberIds] = useState<string[]>(initialMemberIds);

  const toggle = (id: string) => {
    setMemberIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Manage Team Members</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {sampleTeamMembers.map((m) => {
              const active = memberIds.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggle(m.id)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition ${
                    active
                      ? "border-gray-800 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      active ? "bg-white text-gray-900" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{m.name.split(" ")[0]}</span>
                    <span className="block truncate text-[10px] opacity-80">{m.position}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(memberIds)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
