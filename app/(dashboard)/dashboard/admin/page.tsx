"use client";

import { AlertTriangle, BookOpen, ChartColumnBig, ChevronUp, GraduationCap, Info, PlusCircle, UserPlus, UserRoundCheck, Users } from "lucide-react";

const ringkasanUtama = {
  label: "Total Pengguna",
  nilai: "1.284",
  perubahan: "+12% dari minggu lalu",
};

const ringkasanTambahan = [
  { label: "Total Murid", nilai: "1.120", icon: GraduationCap, accent: "bg-amber-100 text-amber-700" },
  { label: "Total Pengajar", nilai: "74", icon: UserRoundCheck, accent: "bg-stone-100 text-stone-700" },
  { label: "Course Aktif", nilai: "126", icon: BookOpen, accent: "bg-orange-100 text-orange-700" },
];

const insightHarian = [
  { teks: "12 course menunggu persetujuan", icon: Info, tone: "bg-blue-50 text-blue-700" },
  { teks: "5 murid belum melakukan absensi hari ini", icon: AlertTriangle, tone: "bg-amber-50 text-amber-700" },
  { teks: "3 course memiliki rating rendah", icon: AlertTriangle, tone: "bg-rose-50 text-rose-700" },
];

const dataStatistik = [
  { label: "Sen", nilai: 42 },
  { label: "Sel", nilai: 49 },
  { label: "Rab", nilai: 53 },
  { label: "Kam", nilai: 61 },
  { label: "Jum", nilai: 66 },
  { label: "Sab", nilai: 72 },
  { label: "Min", nilai: 75 },
];

const aktivitasTerbaru = [
  { nama: "User baru mendaftar", detail: "Nabila sebagai murid", waktu: "5 menit lalu", avatar: "NB" },
  { nama: "Pengajar membuat course", detail: "Kelas Data Analitik Dasar", waktu: "18 menit lalu", avatar: "TR" },
  { nama: "Murid melakukan absensi", detail: "Absensi berhasil untuk course UI/UX", waktu: "32 menit lalu", avatar: "ST" },
];

const aksiCepat = [
  { label: "Tambah User", href: "/dashboard/admin/users", icon: UserPlus },
  { label: "Tambah Course", href: "/dashboard/admin/courses", icon: PlusCircle },
  { label: "Lihat Laporan", href: "/dashboard/admin/reports", icon: ChartColumnBig },
  { label: "Kelola Pengajar", href: "/dashboard/admin/users", icon: Users },
];

export default function AdminDashboardPage() {
  const nilaiTertinggi = Math.max(...dataStatistik.map((item) => item.nilai));

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-stone-900">
      <div className="space-y-6 px-4 pt-5 pb-28 md:px-6 md:pb-32">
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Dashboard Admin</h2>
          <article className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_12px_26px_rgba(41,28,23,0.09)] transition hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{ringkasanUtama.label}</p>
            <p className="mt-3 text-4xl font-bold leading-none text-stone-900">{ringkasanUtama.nilai}</p>
            <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <ChevronUp size={14} />
              <span>{ringkasanUtama.perubahan}</span>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ringkasanTambahan.map((item) => (
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
              </article>
            ))}
          </div>
        </section>

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

        <section className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_8px_20px_rgba(41,28,23,0.08)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Statistik Pengguna</h2>
          <p className="mt-1 text-xs text-stone-500">Pertumbuhan pengguna 7 hari terakhir</p>
          <div className="mt-5 flex items-end gap-3">
            {dataStatistik.map((item) => {
              const tinggi = `${Math.max((item.nilai / nilaiTertinggi) * 100, 15)}%`;

              return (
                <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex h-36 w-full items-end rounded-xl bg-stone-100/80 px-1.5 pb-1.5">
                    <div
                      className="w-full rounded-lg bg-[#d7ccc8] transition-all duration-500"
                      style={{ height: tinggi }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-stone-500">{item.label}</span>
                </div>
              );
            })}
          </div>
        </section>

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

        <section className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_8px_20px_rgba(41,28,23,0.08)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Aktivitas Terbaru</h2>
          <ul className="mt-3 space-y-3 text-sm text-stone-700">
            {aktivitasTerbaru.map((item) => (
              <li key={item.nama} className="flex items-start gap-3 rounded-xl bg-stone-50 px-3 py-3 transition hover:-translate-y-0.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8] text-[11px] font-semibold text-stone-900">
                  {item.avatar}
                </span>
                <div>
                  <p className="font-semibold text-stone-900">{item.nama}</p>
                  <p className="mt-0.5 text-xs text-stone-500">{item.detail}</p>
                </div>
                <span className="ml-auto text-[11px] text-stone-400">{item.waktu}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

    </div>
  );
}
