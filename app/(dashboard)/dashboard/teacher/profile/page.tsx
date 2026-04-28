"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { Activity, AtSign, Bell, BookOpen, CalendarDays, Camera, ChevronRight, GraduationCap, KeyRound, LogOut, Moon, Pencil, ShieldCheck, Sun, UserCheck } from "lucide-react";
import { useState } from "react";

export default function TeacherProfilePage() {
  const [gelap, setGelap] = useState(false);
  const [notif, setNotif] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Profile Pengajar</h1>
        <p className="mt-1 text-sm text-stone-500">Kelola informasi akun dan keamanan</p>
      </header>

      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_12px_28px_rgba(41,28,23,0.09)]">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#d7ccc8] text-3xl font-bold text-stone-900 shadow-md">P</div>
            <button type="button" className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white bg-stone-900 text-amber-50 shadow-sm transition-all active:scale-95">
              <Camera size={14} />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-bold text-stone-900">Pak Budi Santoso</h2>
          <p className="mt-1 text-sm text-stone-500">teacher@lms.local</p>
          <span className="mt-2 inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <ShieldCheck size={12} className="mr-1" /> Pengajar
          </span>
          <div className="mt-5 flex gap-2">
            <button type="button" className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-amber-50 shadow-md transition-all hover:bg-stone-800 active:scale-95">
              <Pencil size={14} /> Edit Profil
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:bg-stone-50 active:scale-95">
              <Camera size={14} /> Ubah Foto
            </button>
          </div>
        </div>
      </section>

      {/* Statistik Mini */}
      <section className="mb-6 grid grid-cols-2 gap-3">
        <article className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d7ccc8] text-stone-900"><BookOpen size={14} /></span>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Course</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">6</p>
          <p className="mt-0.5 text-[11px] text-stone-400">3 aktif, 2 draft</p>
        </article>
        <article className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d7ccc8] text-stone-900"><GraduationCap size={14} /></span>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Murid</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">127</p>
          <p className="mt-0.5 text-[11px] text-stone-400">45 aktif minggu ini</p>
        </article>
      </section>

      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Informasi Akun</h3>
        <ul className="space-y-1">
          <li className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-stone-50">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600"><UserCheck size={14} /></span>
            <div className="flex-1"><p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">Nama Lengkap</p><p className="mt-0.5 text-sm font-semibold text-stone-900">Pak Budi Santoso</p></div>
          </li>
          <li className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-stone-50">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600"><AtSign size={14} /></span>
            <div className="flex-1"><p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">Email</p><p className="mt-0.5 text-sm font-semibold text-stone-900">teacher@lms.local</p></div>
          </li>
          <li className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-stone-50">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600"><ShieldCheck size={14} /></span>
            <div className="flex-1"><p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">Role</p><p className="mt-0.5 text-sm font-semibold text-stone-900">Pengajar</p></div>
          </li>
          <li className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-stone-50">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600"><CalendarDays size={14} /></span>
            <div className="flex-1"><p className="text-[11px] font-medium uppercase tracking-wide text-stone-400">Tanggal Bergabung</p><p className="mt-0.5 text-sm font-semibold text-stone-900">15 Agustus 2023</p></div>
          </li>
        </ul>
      </section>

      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Aktivitas Terakhir</h3>
        <ul className="space-y-1">
          <li className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-stone-50">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8]/40 text-stone-700"><Activity size={14} /></span>
            <div className="flex-1"><p className="text-sm font-medium text-stone-900">Login terakhir dari perangkat baru</p><p className="mt-0.5 text-[11px] text-stone-400">2 jam yang lalu</p></div>
          </li>
          <li className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-stone-50">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8]/40 text-stone-700"><KeyRound size={14} /></span>
            <div className="flex-1"><p className="text-sm font-medium text-stone-900">Mengubah password</p><p className="mt-0.5 text-[11px] text-stone-400">Kemarin, 14:32</p></div>
          </li>
          <li className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-stone-50">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8]/40 text-stone-700"><UserCheck size={14} /></span>
            <div className="flex-1"><p className="text-sm font-medium text-stone-900">Membuat course baru</p><p className="mt-0.5 text-[11px] text-stone-400">3 hari lalu</p></div>
          </li>
        </ul>
      </section>

      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Keamanan</h3>
        <div className="space-y-3">
          <button type="button" className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700"><KeyRound size={15} /></span>
              <div><p className="text-sm font-semibold text-stone-900">Ubah Password</p><p className="text-[11px] text-stone-500">Perbarui kata sandi</p></div>
            </div>
            <ChevronRight size={16} className="text-stone-400" />
          </button>
          <button type="button" className="flex w-full items-center justify-between rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-700"><LogOut size={15} /></span>
              <div><p className="text-sm font-semibold text-rose-700">Keluar dari Semua Perangkat</p><p className="text-[11px] text-rose-500">Akhiri semua sesi</p></div>
            </div>
            <ChevronRight size={16} className="text-rose-400" />
          </button>
          <LogoutButton className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]" />
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Preferensi</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700"><Bell size={15} /></span>
              <div><p className="text-sm font-semibold text-stone-900">Notifikasi</p><p className="text-[11px] text-stone-500">Pemberitahuan penting</p></div>
            </div>
            <button type="button" onClick={() => setNotif(p => !p)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${notif ? "bg-stone-900" : "bg-stone-300"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${notif ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700">{gelap ? <Moon size={15} /> : <Sun size={15} />}</span>
              <div><p className="text-sm font-semibold text-stone-900">Mode Tampilan</p><p className="text-[11px] text-stone-500">{gelap ? "Tema Gelap" : "Tema Terang"}</p></div>
            </div>
            <button type="button" onClick={() => setGelap(p => !p)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${gelap ? "bg-stone-900" : "bg-stone-300"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${gelap ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
