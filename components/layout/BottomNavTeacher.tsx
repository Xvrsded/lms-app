"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardList, GraduationCap, Home, User } from "lucide-react";

const teacherNavItems = [
  { href: "/dashboard/teacher", label: "Dashboard", icon: Home },
  { href: "/dashboard/teacher/courses", label: "Course", icon: BookOpen },
  { href: "/dashboard/teacher/students", label: "Murid", icon: GraduationCap },
  { href: "/dashboard/teacher/quiz", label: "Quiz", icon: ClipboardList },
  { href: "/dashboard/teacher/profile", label: "Profile", icon: User },
] as const;

export function BottomNavTeacher() {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-4 mb-4">
      <ul className="pointer-events-auto mx-auto flex min-h-15 w-full max-w-3xl items-stretch justify-around rounded-3xl border border-white/10 bg-white/25 px-2 py-1 backdrop-blur-2xl shadow-xl transition-shadow duration-500 ease-out">
        {teacherNavItems.map((item) => {
          const isActive =
            item.href === "/dashboard/teacher"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <li key={item.href} className="flex flex-1">
              <Link
                href={item.href}
                className={`group relative flex w-full flex-col items-center justify-center rounded-2xl py-1.5 text-[11px] font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-90 ${
                  isActive ? "text-stone-900" : "text-stone-500 hover:text-stone-800"
                }`}
              >
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? "bg-white/70 shadow-md ring-1 ring-white/40"
                      : "bg-transparent group-hover:bg-white/30"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="transition-all duration-300" />
                </span>
                <span className={`mt-1 text-[10px] leading-none transition-all duration-300 ${isActive ? "font-semibold opacity-100" : "font-medium opacity-80"}`}>
                  {item.label}
                </span>
                <span
                  className={`mt-1.5 h-1.5 w-1.5 rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? "scale-100 bg-stone-800 shadow-[0_0_6px_rgba(41,37,36,0.45)]"
                      : "scale-0 bg-transparent"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
