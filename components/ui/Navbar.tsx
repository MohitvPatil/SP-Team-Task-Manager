"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "@/components/ui/UserDropdown";
import { LayoutDashboard, FolderKanban, CheckSquare, CalendarDays } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects",  label: "Projects",  icon: FolderKanban  },
  { href: "/tasks",     label: "Tasks",     icon: CheckSquare   },
  { href: "/deadlines", label: "Deadlines", icon: CalendarDays  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Brand */}
        <Link
          href="/dashboard"
          className="text-base font-bold tracking-tight text-gray-900"
        >
          TaskFlow
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <UserDropdown />
      </div>
    </header>
  );
}
