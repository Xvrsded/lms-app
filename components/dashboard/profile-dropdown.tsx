"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

export function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-amber-50 transition hover:bg-stone-800 active:scale-95"
      >
        {user.name.charAt(0).toUpperCase()}
      </button>

      {open && (
        <div className="animate-in fade-in zoom-in-95 absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-stone-200 bg-white p-2 shadow-lg">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold text-stone-900">{user.name}</p>
            <p className="text-xs text-stone-500">{user.email}</p>
          </div>

          <div className="my-1 h-px bg-stone-100" />

          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-700 transition hover:bg-stone-100">
            <User size={16} />
            Profile
          </button>

          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-700 transition hover:bg-stone-100">
            <Settings size={16} />
            Pengaturan
          </button>

          <div className="my-1 h-px bg-stone-100" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
