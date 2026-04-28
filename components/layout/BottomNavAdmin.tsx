"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Home, User, Users } from "lucide-react";

const adminNavItems = [
  { href: "/dashboard/admin", label: "Dashboard", icon: Home },
  { href: "/dashboard/admin/users", label: "Pengguna", icon: Users },
  { href: "/dashboard/admin/courses", label: "Course", icon: BookOpen },
  { href: "/dashboard/admin/reports", label: "Laporan", icon: BarChart3 },
  { href: "/dashboard/admin/profile", label: "Profil", icon: User },
] as const;

export function BottomNavAdmin() {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-4 mb-4">
      <ul className="pointer-events-auto mx-auto flex min-h-16 w-full max-w-3xl items-stretch justify-around rounded-3xl border border-white/10 bg-white/20 px-1 backdrop-blur-3xl shadow-2xl">
        {adminNavItems.map((item) => {
          const isActive =
            item.href === "/dashboard/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <li key={item.href} className="flex flex-1">
              <Link
                href={item.href}
                className={`flex w-full flex-col items-center justify-center py-2 text-[11px] font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-95 ${
                  isActive ? "text-stone-900" : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
                    isActive ? "scale-110 bg-white/40 shadow-sm" : "bg-transparent"
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className={`mt-1 text-[10px] leading-none transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-80"}`}>
                  {item.label}
                </span>
                <span
                  className={`mt-1 h-1.5 w-1.5 rounded-full transition-all duration-300 ease-in-out ${isActive ? "scale-100 bg-stone-800" : "scale-0 bg-transparent"}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
