"use client";

import { useState } from "react";
import { X, UserPlus, Shield, Briefcase } from "lucide-react";
import InviteEmployeeModal from "@/components/team/InviteEmployeeModal";

interface ProjectEmployee {
  id: string;
  employeeId: string;
  userId: string;
  projectId: string;
  role: string;
  position: string;
  user: {
    name: string;
    email: string;
    employeeId: string;
  };
}

export default function ManageEmployeesModal({
  projectId,
  members,
  onUpdateMember,
  onClose,
}: {
  projectId: string;
  members: any[];
  onUpdateMember: (userId: string, data: { role: string; position: string }) => void;
  onClose: () => void;
}) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <>
      <InviteEmployeeModal 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
        projectId={projectId} 
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all">
        <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Manage Project Team</h2>
              <p className="text-xs text-gray-500">Update roles or invite new employees.</p>
            </div>
            <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Members</h3>
              <button 
                onClick={() => setIsInviteOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <UserPlus size={14} /> Invite New
              </button>
            </div>

            <div className="space-y-4">
              {members.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                  No members yet.
                </div>
              ) : (
                members.map((member) => (
                  <div key={member.id} className="flex flex-col gap-3 rounded-xl border border-gray-100 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/30 transition-colors hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 dark:bg-gray-800 text-sm font-bold text-white shadow-inner">
                        {member.user?.name?.charAt(0) || "?"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{member.user?.name || "Unknown User"}</p>
                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{member.user?.employeeId}</span>
                        </div>
                        <p className="truncate text-[10px] font-medium text-gray-400 uppercase tracking-tight">{member.user?.email || "No Email"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <Briefcase size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text"
                          value={member.position || ""}
                          onChange={(e) => onUpdateMember(member.userId, { role: member.role, position: e.target.value })}
                          placeholder="Position"
                          className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white outline-none focus:border-gray-800 dark:focus:border-gray-400 transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <Shield size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select 
                          value={member.role || "MEMBER"}
                          onChange={(e) => onUpdateMember(member.userId, { role: e.target.value, position: member.position })}
                          className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white outline-none focus:border-gray-800 dark:focus:border-gray-400 transition-colors appearance-none"
                        >
                          <option value="MEMBER">Member</option>
                          <option value="MANAGER">Manager</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/50 dark:bg-gray-900/50">
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 py-3 text-sm font-bold text-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
