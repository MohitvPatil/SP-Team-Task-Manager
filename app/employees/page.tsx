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
  ChevronRight
} from "lucide-react";

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
            <p className="text-gray-500 dark:text-gray-400">{employee.position}</p>
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
          <p className="text-xs text-gray-500">Employee ID: {employee.id}</p>
          <button className="flex items-center gap-1.5 rounded-full bg-gray-900 px-6 py-2 text-xs font-bold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
            Export Records
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────────
export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeFullDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFullDetail | null>(null);

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

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Employee Directory</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">List of all active personnel and professional profiles.</p>
            </div>
            
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-gray-700 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                  className="grid grid-cols-12 items-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
                >
                  {/* Name & Position - 5 cols */}
                  <div className="col-span-5 flex items-center gap-4 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white dark:bg-white dark:text-gray-900">
                      {employee.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">{employee.name}</h3>
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
                  <div className="col-span-2 flex justify-end">
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
