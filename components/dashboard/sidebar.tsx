"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const dashboardLinks = [
  { href: "/dashboard/admin", label: "Admin" },
  { href: "/dashboard/teacher", label: "Teacher" },
  { href: "/dashboard/student", label: "Student" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-zinc-200 bg-white px-4 py-4 md:border-b-0 md:border-r md:px-5 md:py-6">
      <div className="mb-4 text-lg font-semibold">LMS Dashboard</div>
      <nav className="flex flex-wrap gap-2 md:flex-col md:gap-1">
        {dashboardLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              pathname === link.href
                ? "bg-zinc-900 text-white"
                : "text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
