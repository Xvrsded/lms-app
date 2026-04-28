"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { ProfileDropdown } from "@/components/dashboard/profile-dropdown";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Learning Management System</p>
          <p className="text-sm text-zinc-700">
            {user ? `Halo, ${user.name}` : "Dashboard Panel"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Home
          </Link>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
