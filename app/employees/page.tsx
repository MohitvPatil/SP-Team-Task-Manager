"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/ui/Navbar";
import { EmployeeFullDetail } from "@/lib/employees-data";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  IndianRupee, 
  ShieldCheck,
  Search,
  User,
  X,
  ExternalLink,
  ChevronRight,
  Pencil,
  Trash2
} from "lucide-react";
import { sampleUser } from "@/lib/sample-data";

// ── Profile Overlay Component ──────────────────────────────────────────────────
function EmployeeProfileOverlay({ 
  employee, 
  onClose 
}: { 
  employee: EmployeeFullDetail; 
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all dark:border-gray-800 dark:bg-gray-950">
        
        {/* Header / Banner Area */}
        <div className="relative h-32 bg-gray-900 dark:bg-gray-800">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white backdrop-blur-md hover:bg-black/40 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Summary Header */}
        <div className="relative px-8 pb-4">
          <div className="absolute -top-12 left-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gray-900 text-3xl font-bold text-white shadow-lg dark:border-gray-950 dark:bg-white dark:text-gray-900">
              {employee.name.charAt(0)}
            </div>
          </div>
          
          <div className="ml-28 pt-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{employee.name}</h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {employee.department}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              {employee.position} <span className="mx-2 text-gray-300">•</span> <span className="font-bold text-blue-600 dark:text-blue-400">{employee.employeeId}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 border-t border-gray-100 dark:border-gray-800 md:grid-cols-3">
          
          {/* Column 1: Contact Info */}
          <div className="space-y-6 p-8 border-r border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                  <Mail size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-gray-400">Email Address</p>
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{employee.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                  <Phone size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-gray-400">Phone Number</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{employee.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                  <MapPin size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-gray-400">Office Location</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{employee.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Employment Info */}
          <div className="space-y-6 p-8 border-r border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Professional Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                  <ShieldCheck size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-gray-400">System Role</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{employee.role}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                  <Calendar size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-gray-400">Joined Company</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {new Date(employee.joinedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                  <IndianRupee size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-medium text-gray-400">Annual CTC</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{employee.salary} <span className="text-[10px] font-normal text-gray-500">gross</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Active Projects */}
          <div className="space-y-6 p-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Active Projects</h3>
            <div className="space-y-2">
              {employee.projects.map((proj) => (
                <div key={proj} className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{proj}</p>
                </div>
              ))}
              {employee.projects.length === 0 && (
                <p className="text-sm italic text-gray-400">No active projects assigned.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-between bg-gray-50 px-8 py-4 dark:bg-gray-900/50">
          <p className="text-xs text-gray-500">Employee ID: {employee.employeeId}</p>
          <button className="flex items-center gap-1.5 rounded-full bg-gray-900 px-6 py-2 text-xs font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
            Export Records
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Invite Modal ───────────────────────────────────────────────────────────────
function InviteModal({ onSend, onClose }: { onSend: (email: string) => void; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400)); // simulate API
    onSend(email.trim());
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Invite Employee</h2>
            <p className="text-[10px] text-gray-400 mt-0.5">They'll register using their Employee ID + company email</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handle} className="px-6 py-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="employee@company.com"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white pl-9 pr-4 py-2.5 text-sm outline-none focus:border-gray-800 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 px-4 py-3 text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <p className="font-semibold">How it works:</p>
            <p>• Employee receives this invite & goes to <span className="font-bold">/register</span></p>
            <p>• They enter their Employee ID + company email + password</p>
            <p>• Profile auto-fills from the employee database</p>
            <p>• You get notified once they accept — then you can set role & position</p>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              Cancel
            </button>
            <button disabled={loading || !email.trim()} className="flex-1 rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 py-2.5 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-40 transition-all shadow-sm">
              {loading ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Edit Role Modal (only role + position) ────────────────────────────────────
function EditRoleModal({
  employee,
  onSave,
  onClose,
}: {
  employee: EmployeeFullDetail;
  onSave: (id: string, data: { role: string; position: string }) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    role: employee.role,
    position: employee.position,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const ROLES = [
    { value: "MEMBER", label: "Member", icon: User, desc: "Standard access to projects and tasks." },
    { value: "MANAGER", label: "Manager", icon: Briefcase, desc: "Can manage projects, invites and roles." },
    { value: "ADMIN", label: "Admin", icon: ShieldCheck, desc: "Full system access and configurations." },
  ];

  const currentRole = ROLES.find(r => r.value === form.role) || ROLES[0];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Edit Role & Position</h2>
            <p className="text-[10px] text-gray-400 mt-0.5">{employee.name}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-3 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">From Employee Database (read-only)</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{employee.name}</p>
            <p className="text-xs text-gray-500">{employee.email} · {employee.department}</p>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Project Position *</label>
            <input
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:border-gray-800 transition-colors"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              placeholder="e.g. Senior Developer"
            />
          </div>

          <div className="relative">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-gray-500">System Role</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-left text-sm transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-50 p-1.5 dark:bg-gray-800">
                  <currentRole.icon size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <span className="font-semibold">{currentRole.label}</span>
              </div>
              <ChevronRight 
                size={16} 
                className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-90" : ""}`} 
              />
            </button>

            {isDropdownOpen && (
              <div className="relative z-50 mt-2 origin-top rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 dark:border-gray-800 dark:bg-gray-950">
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => {
                      setForm({ ...form, role: role.value });
                      setIsDropdownOpen(false);
                    }}
                    className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors ${
                      form.role === role.value 
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" 
                        : "hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className={`mt-0.5 rounded-lg p-1.5 ${
                      form.role === role.value 
                        ? "bg-white/10 dark:bg-gray-900/10" 
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}>
                      <role.icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{role.label}</p>
                      <p className={`text-[10px] leading-tight ${
                        form.role === role.value ? "text-white/60 dark:text-gray-900/60" : "text-gray-400"
                      }`}>
                        {role.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800 px-6 py-4 bg-gray-50/50 dark:bg-gray-900/50">
          <button onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onSave(employee.id, form)}
            disabled={!form.position.trim()}
            className="rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 px-6 py-2 text-sm font-bold text-white disabled:opacity-40 hover:bg-gray-800 transition-all shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────
export default function EmployeesPage() {
  const isLead = sampleUser.role === "ADMIN" || sampleUser.role === "MANAGER";
  const [employees, setEmployees] = useState<EmployeeFullDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFullDetail | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<EmployeeFullDetail | null>(null);

  const handleSaveRole = (id: string, data: { role: string; position: string }) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, role: data.role, position: data.position } : e))
    );
    setEditEmployee(null);
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm("Remove this employee from the team?"))
      setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSendInvite = (email: string) => {
    if (employees.some((e) => e.email === email)) {
      import("react-hot-toast").then((t) => t.default.error("This employee is already on the team."));
      setInviteOpen(false);
      return;
    }
    import("react-hot-toast").then((t) =>
      t.default.success(`Invite sent to ${email}. They'll register using their Employee ID.`)
    );
    setInviteOpen(false);
  };

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      });
  }, []);

  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Navbar />

        {/* Profile Overlay Render */}
        {selectedEmployee && (
          <EmployeeProfileOverlay 
            employee={selectedEmployee} 
            onClose={() => setSelectedEmployee(null)} 
          />
        )}
        {editEmployee && (
          <EditRoleModal
            employee={editEmployee}
            onSave={handleSaveRole}
            onClose={() => setEditEmployee(null)}
          />
        )}
        {inviteOpen && <InviteModal onSend={handleSendInvite} onClose={() => setInviteOpen(false)} />}

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Employee Directory</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">List of all active personnel and professional profiles.</p>
            </div>
            
            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:max-w-md">
              <div className="relative w-full flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-gray-700 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {isLead && (
                <button
                  onClick={() => setInviteOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  <Mail size={16} />
                  Invite
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredEmployees.map((employee) => (
                <div 
                  key={employee.id}
                  className="group grid grid-cols-12 items-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
                >
                  {/* Name & Position - 5 cols */}
                  <div className="col-span-5 flex items-center gap-4 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white dark:bg-white dark:text-gray-900">
                      {employee.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{employee.name}</h3>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{employee.employeeId}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-medium">{employee.position}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                        <span>{employee.department}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact - 3 cols */}
                  <div className="col-span-3 hidden flex-col items-start md:flex">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Contact</p>
                    <p className="truncate text-xs font-medium text-gray-600 dark:text-gray-300 w-full">{employee.email}</p>
                  </div>

                  {/* Role - 2 cols */}
                  <div className="col-span-2 hidden flex-col items-start md:flex">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Role</p>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{employee.role}</p>
                  </div>

                  {/* Profile Button - 2 cols */}
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    {isLead && (
                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => setEditEmployee(employee)}
                          title="Edit Role & Position"
                          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Pencil size={14} className="dark:text-gray-300" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          title="Remove"
                          className="rounded-lg border border-red-100 dark:border-red-900/30 bg-white dark:bg-red-950/20 p-2 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Trash2 size={14} className="text-red-500 dark:text-red-400" />
                        </button>
                      </div>
                    )}
                    <button 
                      onClick={() => setSelectedEmployee(employee)}
                      className="flex items-center gap-1 rounded-xl bg-gray-50 px-4 py-2 text-xs font-bold text-gray-900 transition hover:bg-gray-900 hover:text-white dark:bg-gray-900 dark:text-white dark:hover:bg-white dark:hover:text-gray-900"
                    >
                      Profile <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredEmployees.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 py-20 dark:border-gray-800">
              <User size={40} className="mb-4 text-gray-200 dark:text-gray-800" />
              <p className="text-gray-500">No employees found matching your search.</p>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
