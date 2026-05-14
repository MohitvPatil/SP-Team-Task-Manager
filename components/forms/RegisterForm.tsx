"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/authService";
import toast from "react-hot-toast";
import { Eye, EyeOff, IdCard, Mail, Lock, AlertCircle } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!employeeId || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      // Name is auto-fetched from the employee database on the server
      const result = await register({ name: "", email, employeeId, password });
      toast.success(`Welcome! ${result.user?.name || "Account"} created successfully.`);
      router.push("/dashboard");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Registration failed. Check your Employee ID and company email.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-gray-600">
          Employee ID
        </label>
        <div className="relative">
          <IdCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="e.g. EMP-001"
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
          />
        </div>
        <p className="mt-1 text-[10px] text-gray-400">
          Use the Employee ID assigned by your company (e.g. EMP-001)
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-gray-600">
          Company Email
        </label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="you@company.com"
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p className="mt-1 text-[10px] text-gray-400">
          Must match the email registered with your Employee ID
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-gray-600">
          Create Password
        </label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-10 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-gray-900 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800 disabled:opacity-50 mt-2"
      >
        {loading ? "Verifying..." : "Create Account"}
      </button>

      <p className="text-center text-xs text-gray-400">
        Your name and profile will be auto-filled from the company employee database.
      </p>
    </form>
  );
}