"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadMe = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const result = (await response.json()) as { user?: { role?: string } };
        setRole(result.user?.role ?? null);
      } catch {
        setRole(null);
      }
    };

    void loadMe();
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Learning Management System</p>
          <p className="text-sm text-zinc-700">Dashboard Panel</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Home
          </Link>
          <span className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-semibold uppercase text-white">
            {role ?? "guest"}
          </span>
        </div>
      </div>
    </header>
  );
}
