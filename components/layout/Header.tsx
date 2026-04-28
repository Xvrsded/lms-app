"use client";

import { Bell, BookOpen, LogOut, Settings, User, UserRound, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Notifikasi = {
  id: number;
  pesan: string;
  waktu: string;
};

const notifAdmin: Notifikasi[] = [
  { id: 1, pesan: "User baru mendaftar", waktu: "5 menit lalu" },
  { id: 2, pesan: "Course baru dibuat", waktu: "12 menit lalu" },
  { id: 3, pesan: "Murid melakukan absensi", waktu: "1 jam lalu" },
];

const notifTeacher: Notifikasi[] = [
  { id: 1, pesan: "Murid baru join course UI/UX", waktu: "3 menit lalu" },
  { id: 2, pesan: "Andi menyelesaikan quiz", waktu: "15 menit lalu" },
  { id: 3, pesan: "Budi belum aktif selama 2 hari", waktu: "2 jam lalu" },
];

export function Header({ role }: { role: "admin" | "teacher" }) {
  const isAdmin = role === "admin";
  const label = isAdmin ? "Admin" : "Pengajar";
  const subtext = isAdmin
    ? "Selamat datang kembali"
    : "Pantau aktivitas course dan murid hari ini";
  const profileBase = isAdmin ? "/dashboard/admin/profile" : "/dashboard/teacher/profile";
  const email = isAdmin ? "admin@lms.local" : "teacher@lms.local";
  const notifikasiData = isAdmin ? notifAdmin : notifTeacher;

  const [notifikasiOpen, setNotifikasiOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifikasi] = useState<Notifikasi[]>(notifikasiData);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotifikasiOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      window.location.href = "/login";
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-[#f8f6f3]/95 px-4 py-4 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Halo, {label} 👋
          </h1>
          <p className="mt-0.5 text-sm text-stone-500">{subtext}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifikasi */}
          <div ref={notifRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifikasiOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-stone-50 active:scale-95"
            >
              <Bell size={17} />
              {notifikasi.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-[#f8f6f3]">
                  {notifikasi.length}
                </span>
              )}
            </button>

            <div
              className={`absolute top-full right-0 mt-2 w-72 origin-top-right rounded-xl border border-stone-200/80 bg-white p-3 shadow-xl transition-all duration-200 ${
                notifikasiOpen
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-sm font-semibold text-stone-900">Notifikasi</p>
                <button
                  type="button"
                  onClick={() => setNotifikasiOpen(false)}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
                >
                  <X size={14} />
                </button>
              </div>

              {notifikasi.length === 0 ? (
                <p className="px-1 py-3 text-center text-xs text-stone-400">
                  Tidak ada notifikasi
                </p>
              ) : (
                <ul className="max-h-60 space-y-1 overflow-y-auto">
                  {notifikasi.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start gap-2.5 rounded-lg px-2 py-2.5 transition hover:bg-stone-50"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8]/40 text-stone-700">
                        {isAdmin ? <Users size={12} /> : <BookOpen size={12} />}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-stone-800">{item.pesan}</p>
                        <p className="mt-0.5 text-[10px] text-stone-400">{item.waktu}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Avatar */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setNotifikasiOpen(false);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#d7ccc8] text-sm font-semibold text-stone-900 ring-2 ring-white shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <UserRound size={18} />
            </button>

            <div
              className={`absolute top-full right-0 mt-2 w-60 origin-top-right rounded-xl border border-stone-200/80 bg-white p-1 shadow-xl transition-all duration-200 ${
                profileOpen
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <div className="px-3 py-3">
                <p className="text-sm font-semibold text-stone-900">
                  {label} LMS
                </p>
                <p className="text-xs text-stone-500">{email}</p>
              </div>
              <div className="my-1 h-px bg-stone-100" />
              <a
                href={profileBase}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50"
              >
                <User size={15} className="text-stone-500" />
                Profil Saya
              </a>
              <a
                href={profileBase}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50"
              >
                <Settings size={15} className="text-stone-500" />
                Pengaturan
              </a>
              <div className="my-1 h-px bg-stone-100" />
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutLoading}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogOut size={15} />
                {logoutLoading ? "Memproses logout..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
