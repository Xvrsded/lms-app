"use client";

import {
  BookOpen,
  CalendarCheck,
  Flame,
  Lock,
  LogOut,
  Mail,
  TrendingUp,
  User,
  UserCircle,
  ChevronRight,
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

const mockProfile = {
  name: "Budi Santoso",
  email: "budi@student.local",
  avatar: null as string | null,
  courseCount: 3,
  avgProgress: 46,
  streak: 7,
  lastLogin: "28 April 2026, 09:15 WIB",
  lastCourse: "Intro to Python",
  lastActivity: "Mengerjakan Quiz Algoritma",
};

export default function StudentProfilePage() {
  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-stone-500">Informasi dan aktivitas belajarmu.</p>
      </header>

      {/* Profile Card */}
      <section className="mb-5">
        <div className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
          <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8] text-stone-900">
            <UserCircle size={28} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-stone-900">{mockProfile.name}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
              <Mail size={11} />
              <span className="truncate">{mockProfile.email}</span>
            </div>
            <span className="mt-2 inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600">
              Student
            </span>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-5 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
            <BookOpen size={12} />
            Course
          </div>
          <p className="mt-1.5 text-xl font-bold text-stone-900">{mockProfile.courseCount}</p>
        </div>
        <div className="rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
            <TrendingUp size={12} />
            Progress
          </div>
          <p className="mt-1.5 text-xl font-bold text-stone-900">{mockProfile.avgProgress}%</p>
        </div>
        <div className="rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500">
            <Flame size={12} />
            Streak
          </div>
          <p className="mt-1.5 text-xl font-bold text-amber-600">{mockProfile.streak}</p>
        </div>
      </section>

      {/* Activity */}
      <section className="mb-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
          Aktivitas Terakhir
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <CalendarCheck size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900">Login Terakhir</p>
              <p className="mt-0.5 text-xs text-stone-500">{mockProfile.lastLogin}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <BookOpen size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900">Course Terakhir</p>
              <p className="mt-0.5 text-xs text-stone-500">{mockProfile.lastCourse}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <Flame size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900">Aktivitas Terbaru</p>
              <p className="mt-0.5 text-xs text-stone-500">{mockProfile.lastActivity}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mb-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
          Keamanan
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-700">
              <Lock size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900">Ubah Password</p>
              <p className="mt-0.5 text-xs text-stone-500">Perbarui kata sandi akunmu.</p>
            </div>
            <ChevronRight size={16} className="shrink-0 text-stone-400" />
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
              <LogOut size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900">Keluar Akun</p>
              <p className="mt-0.5 text-xs text-stone-500">Logout dari semua perangkat.</p>
            </div>
            <LogoutButton
              className="shrink-0 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
