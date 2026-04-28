"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarCheck,
  Compass,
  Home,
  User,
} from "lucide-react";

export function BottomNavStudent() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard/student") return pathname === href;
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: "/dashboard/student", label: "Dashboard", icon: Home },
    { href: "/dashboard/student/my-courses", label: "Course", icon: BookOpen },
    null, // Center placeholder for Explore
    { href: "/dashboard/student/attendance", label: "Absensi", icon: CalendarCheck },
    { href: "/dashboard/student/profile", label: "Profile", icon: User },
  ] as const;

  const exploreActive = isActive("/dashboard/student/explore");

  return (
    <nav className="pointer-events-none fixed bottom-4 left-0 right-0 z-40 flex justify-center">
      <div className="pointer-events-auto mx-auto flex h-16 max-w-md items-center justify-between rounded-3xl border border-white/10 bg-white/25 px-4 backdrop-blur-2xl shadow-xl transition-shadow duration-500 ease-out">
        {/* Left items */}
        {navItems.slice(0, 2).map((item) => {
          if (!item) return null;
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-90 ${
                active ? "text-stone-900" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                active ? "bg-white/70 shadow-sm ring-1 ring-white/40" : "bg-transparent"
              }`}>
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              </span>
              <span className={active ? "font-semibold" : "font-medium opacity-80"}>{item.label}</span>
            </Link>
          );
        })}

        {/* Center - Explore (Highlighted) */}
        <Link
          href="/dashboard/student/explore"
          className={`relative flex flex-col items-center justify-center rounded-full border-2 border-white/40 p-0.5 shadow-md transition-all duration-300 hover:scale-110 active:scale-95 ${
            exploreActive
              ? "bg-linear-to-br from-amber-400 to-amber-500 scale-110"
              : "bg-linear-to-br from-stone-700 to-stone-900"
          }`}
        >
          <span className={`flex h-10 w-10 items-center justify-center rounded-full ${
            exploreActive ? "bg-white/20" : "bg-white/10"
          }`}>
            <Compass size={20} className={exploreActive ? "text-stone-900" : "text-amber-50"} strokeWidth={2.5} />
          </span>
          <span className={`mt-0.5 text-[10px] font-bold ${exploreActive ? "text-stone-900" : "text-stone-600"}`}>
            Explore
          </span>
        </Link>

        {/* Right items */}
        {navItems.slice(3).map((item) => {
          if (!item) return null;
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-90 ${
                active ? "text-stone-900" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                active ? "bg-white/70 shadow-sm ring-1 ring-white/40" : "bg-transparent"
              }`}>
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              </span>
              <span className={active ? "font-semibold" : "font-medium opacity-80"}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
