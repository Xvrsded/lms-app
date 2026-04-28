"use client";

import { Activity, AtSign, Bell, CalendarDays, Camera, ChevronRight, KeyRound, LogOut, Moon, Pencil, ShieldCheck, Smartphone, Sun, UserCheck, UserRound } from "lucide-react";
import { useState } from "react";

export default function AdminProfilePage() {
  const [gelap, setGelap] = useState(false);
  const [notif, setNotif] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      {/* Profile Card */}
      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_12px_28px_rgba(41,28,23,0.09)] transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#d7ccc8] text-3xl font-bold text-stone-900 shadow-md">A</div>
            <button type="button" className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white bg-stone-900 text-amber-50 shadow-sm transition-all active:scale-95">
              <Camera size={14} />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-bold text-stone-900">Admin LMS</h2>
          <p className="mt-1 text-sm text-stone-500">admin@lms.local</p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
            <ShieldCheck size={13} /> Admin
          </span>
          <div className="mt-5 flex w-full gap-3">
            <button type="button" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
              <Pencil size={16} /> Edit Profil
            </button>
            <button type="button" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
              <Camera size={16} /> Ubah Foto
            </button>
          </div>
        </div>
      </section>

      {/* Informasi Akun */}
      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-0.5">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700"><UserCheck size={15} /></span>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Informasi Akun</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Nama Lengkap", value: "Admin LMS", Icon: UserRound },
            { label: "Email", value: "admin@lms.local", Icon: AtSign },
            { label: "Role", value: "Administrator", Icon: ShieldCheck },
            { label: "Tanggal Bergabung", value: "15 Januari 2024", Icon: CalendarDays },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d7ccc8]/40 text-stone-700">
                <item.Icon size={15} />
              </span>
              <div>
                <p className="text-xs font-medium text-stone-500">{item.label}</p>
                <p className="text-sm font-semibold text-stone-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Aktivitas Terakhir */}
      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-0.5">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700"><Activity size={15} /></span>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Aktivitas Terakhir</h3>
        </div>
        <ul className="space-y-3">
          {[
            { teks: "Anda login dari perangkat desktop", waktu: "2 jam yang lalu", Icon: Activity },
            { teks: "Menambahkan 3 pengguna baru", waktu: "Kemarin, 14:32", Icon: UserRound },
            { teks: "Mengubah informasi profil", waktu: "3 hari yang lalu", Icon: Pencil },
            { teks: "Menyetujui 2 course baru", waktu: "5 hari yang lalu", Icon: ShieldCheck },
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3 rounded-xl bg-stone-50 px-3 py-3 transition-all duration-200 hover:-translate-y-0.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8]/40 text-stone-700">
                <item.Icon size={14} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">{item.teks}</p>
                <p className="mt-0.5 text-[11px] text-stone-400">{item.waktu}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Keamanan */}
      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-0.5">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700"><KeyRound size={15} /></span>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Keamanan</h3>
        </div>
        <div className="space-y-3">
          <button type="button" className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700"><KeyRound size={15} /></span>
              <div>
                <p className="text-sm font-semibold text-stone-900">Ubah Password</p>
                <p className="text-[11px] text-stone-500">Perbarui kata sandi secara berkala</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-stone-400" />
          </button>
          <button type="button" className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700"><Smartphone size={15} /></span>
              <div>
                <p className="text-sm font-semibold text-stone-900">Perangkat Aktif</p>
                <p className="text-[11px] text-stone-500">Kelola perangkat yang terhubung</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-stone-400" />
          </button>
          <button type="button" className="flex w-full items-center justify-between rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-700"><LogOut size={15} /></span>
              <div>
                <p className="text-sm font-semibold text-rose-700">Keluar dari Semua Perangkat</p>
                <p className="text-[11px] text-rose-500">Akhiri semua sesi aktif</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-rose-400" />
          </button>
        </div>
      </section>

      {/* Preferensi */}
      <section className="mb-6 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-0.5">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700"><Bell size={15} /></span>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Preferensi</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700"><Bell size={15} /></span>
              <div>
                <p className="text-sm font-semibold text-stone-900">Notifikasi</p>
                <p className="text-[11px] text-stone-500">Aktifkan pemberitahuan penting</p>
              </div>
            </div>
            <button type="button" onClick={() => setNotif((prev) => !prev)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${notif ? "bg-stone-900" : "bg-stone-300"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${notif ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-700">{gelap ? <Moon size={15} /> : <Sun size={15} />}</span>
              <div>
                <p className="text-sm font-semibold text-stone-900">Mode Tampilan</p>
                <p className="text-[11px] text-stone-500">{gelap ? "Tema Gelap" : "Tema Terang"}</p>
              </div>
            </div>
            <button type="button" onClick={() => setGelap((prev) => !prev)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${gelap ? "bg-stone-900" : "bg-stone-300"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${gelap ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
