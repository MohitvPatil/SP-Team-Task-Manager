import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Join the Team</h1>
          <p className="mt-2 text-sm text-gray-500">
            Use your company Employee ID and email to create your account.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-900 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}