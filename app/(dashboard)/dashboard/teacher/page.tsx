"use client";

import { AlertTriangle, BookOpen, ChevronUp, ClipboardCheck, ClipboardList, FilePlus, GraduationCap, Info, Layers, PlusCircle, TrendingUp, Users } from "lucide-react";

const ringkasanUtama = [
  { label: "Total Course Saya", nilai: "8", icon: BookOpen, accent: "bg-amber-100 text-amber-700", perubahan: "+2 minggu lalu" },
  { label: "Total Murid", nilai: "142", icon: GraduationCap, accent: "bg-blue-100 text-blue-700", perubahan: "+12%" },
  { label: "Quiz Aktif", nilai: "15", icon: ClipboardList, accent: "bg-orange-100 text-orange-700", perubahan: "+3 baru" },
  { label: "Rata-rata Progress", nilai: "78%", icon: TrendingUp, accent: "bg-emerald-100 text-emerald-700", perubahan: "+5%" },
];

const courseSaya = [
  { judul: "Dasar UI/UX Design", murid: 45, status: "Aktif", progress: 85 },
  { judul: "Web Development", murid: 38, status: "Aktif", progress: 62 },
  { judul: "Data Analytics", murid: 22, status: "Menunggu approval", progress: 30 },
  { judul: "Mobile App Dev", murid: 0, status: "Draft", progress: 10 },
];

const aktivitasMurid = [
  { nama: "Rina", aksi: "join course UI/UX", waktu: "3 menit lalu", avatar: "RI" },
  { nama: "Andi", aksi: "menyelesaikan quiz", waktu: "15 menit lalu", avatar: "AN" },
  { nama: "Budi", aksi: "belum aktif 2 hari", waktu: "2 jam lalu", avatar: "BU", warning: true },
  { nama: "Dewi", aksi: "submit tugas baru", waktu: "1 jam lalu", avatar: "DE" },
];

const insightHarian = [
  { teks: "3 murid belum menyelesaikan materi", icon: AlertTriangle, tone: "bg-amber-50 text-amber-700" },
  { teks: "2 quiz belum diperiksa", icon: ClipboardCheck, tone: "bg-blue-50 text-blue-700" },
  { teks: "1 course menunggu update", icon: Info, tone: "bg-rose-50 text-rose-700" },
];

const aksiCepat = [
  { label: "Buat Course", href: "/dashboard/teacher/courses", icon: PlusCircle },
  { label: "Tambah Materi", href: "/dashboard/teacher/courses", icon: Layers },
  { label: "Buat Quiz", href: "/dashboard/teacher/quiz", icon: FilePlus },
];

export default function TeacherDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f3] text-stone-900">
      <div className="space-y-6 px-4 pt-5 pb-28 md:px-6 md:pb-32">
        {/* Ringkasan */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Ringkasan</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ringkasanUtama.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_8px_20px_rgba(41,28,23,0.08)] transition hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{item.label}</p>
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${item.accent}`}>
                    <item.icon size={16} />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold leading-none text-stone-900">{item.nilai}</p>
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  <ChevronUp size={12} />
                  <span>{item.perubahan}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Insight Hari Ini */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Insight Hari Ini</h2>
          <div className="grid grid-cols-1 gap-3">
            {insightHarian.map((item) => (
              <article
                key={item.teks}
                className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5"
              >
                <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.tone}`}>
                  <item.icon size={15} />
                </span>
                <p className="text-sm text-stone-700">{item.teks}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Course Saya */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Course Saya</h2>
            <a href="/dashboard/teacher/courses" className="text-xs font-semibold text-stone-600 hover:text-stone-900 transition">Lihat Semua</a>
          </div>
          <div className="space-y-3">
            {courseSaya.map((course) => {
              const statusColor =
                course.status === "Aktif"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : course.status === "Menunggu approval"
                  ? "bg-amber-50 text-amber-700 border-amber-100"
                  : "bg-stone-50 text-stone-600 border-stone-200";
              return (
                <article
                  key={course.judul}
                  className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-stone-900">{course.judul}</p>
                      <p className="mt-1 text-xs text-stone-500">{course.murid} murid terdaftar</p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusColor}`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>Progress materi</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-stone-100">
                      <div
                        className="h-full rounded-full bg-[#d7ccc8] transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button type="button" className="rounded-lg bg-stone-900 px-3 py-1.5 text-[11px] font-semibold text-amber-50 transition hover:bg-stone-800 active:scale-95">
                      Edit
                    </button>
                    <button type="button" className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-700 transition hover:bg-stone-50 active:scale-95">
                      Lihat Detail
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Aktivitas Murid */}
        <section className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_8px_20px_rgba(41,28,23,0.08)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Aktivitas Murid</h2>
            <a href="/dashboard/teacher/students" className="text-xs font-semibold text-stone-600 hover:text-stone-900 transition">Lihat Semua</a>
          </div>
          <ul className="mt-3 space-y-3">
            {aktivitasMurid.map((item) => (
              <li key={item.nama + item.waktu} className={`flex items-start gap-3 rounded-xl px-3 py-3 transition hover:-translate-y-0.5 ${item.warning ? "bg-rose-50" : "bg-stone-50"}`}>
                <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${item.warning ? "bg-rose-200 text-rose-800" : "bg-[#d7ccc8] text-stone-900"}`}>
                  {item.avatar}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-stone-900">
                    {item.nama} <span className="font-normal text-stone-500">{item.aksi}</span>
                  </p>
                </div>
                <span className="text-[11px] text-stone-400">{item.waktu}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Aksi Cepat */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Aksi Cepat</h2>
          <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
            {aksiCepat.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="min-w-40 snap-start rounded-2xl border border-stone-200/90 bg-white px-4 py-4 text-left shadow-[0_8px_20px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d7ccc8] text-sm text-stone-900">
                  <action.icon size={16} />
                </span>
                <span className="mt-3 block text-sm font-semibold text-stone-900">{action.label}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
