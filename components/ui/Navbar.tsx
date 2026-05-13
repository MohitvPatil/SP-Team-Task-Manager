import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import UserDropdown from "@/components/ui/UserDropdown";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:px-8">
      <Link href="/dashboard" className="text-xl font-bold text-slate-950 dark:text-white">
        TaskFlow
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserDropdown />
      </div>
    </nav>
  );
}
