"use client";

import {
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Search,
  TrendingDown,
  TrendingUp,
  UserX,
} from "lucide-react";
import { useState } from "react";

const muridData = [
  {
    id: 1, nama: "Rina Sari", course: "Dasar UI/UX Design", progress: 92, aktif: true, avatar: "RS",
    terakhirAktif: "2 jam lalu",
    quiz: [
      { judul: "Quiz UI/UX: Dasar Design", skor: 88, tanggal: "20 Okt 2024" },
      { judul: "Quiz Wireframe", skor: 95, tanggal: "25 Okt 2024" },
    ],
    aktivitas: ["Menyelesaikan materi Design Thinking", "Submit tugas wireframe"],
  },
  {
    id: 2, nama: "Andi Wijaya", course: "Web Development", progress: 78, aktif: true, avatar: "AW",
    terakhirAktif: "Kemarin",
    quiz: [
      { judul: "Quiz HTML & CSS", skor: 82, tanggal: "22 Okt 2024" },
      { judul: "Quiz Flexbox", skor: 75, tanggal: "28 Okt 2024" },
    ],
    aktivitas: ["Mengerjakan quiz CSS", "Baca materi responsive design"],
  },
  {
    id: 3, nama: "Budi Hartono", course: "Dasar UI/UX Design", progress: 45, aktif: false, avatar: "BH",
    terakhirAktif: "5 hari lalu",
    quiz: [{ judul: "Quiz UI/UX: Dasar Design", skor: 55, tanggal: "15 Okt 2024" }],
    aktivitas: ["Login terakhir 5 hari lalu"],
  },
  {
    id: 4, nama: "Dewi Lestari", course: "Data Analytics", progress: 65, aktif: true, avatar: "DL",
    terakhirAktif: "4 jam lalu",
    quiz: [{ judul: "Quiz Data Visualization", skor: 70, tanggal: "30 Okt 2024" }],
    aktivitas: ["Mengunggah dataset", "Mengerjakan latihan Excel"],
  },
  {
    id: 5, nama: "Eka Putri", course: "Web Development", progress: 88, aktif: true, avatar: "EP",
    terakhirAktif: "1 jam lalu",
    quiz: [
      { judul: "Quiz HTML & CSS", skor: 90, tanggal: "22 Okt 2024" },
      { judul: "Quiz JavaScript Dasar", skor: 85, tanggal: "1 Nov 2024" },
    ],
    aktivitas: ["Menyelesaikan proyek portfolio", "Diskusi di forum"],
  },
  {
    id: 6, nama: "Fajar Nugraha", course: "Machine Learning", progress: 30, aktif: false, avatar: "FN",
    terakhirAktif: "1 minggu lalu",
    quiz: [],
    aktivitas: ["Belum mengikuti quiz"],
  },
];

const insightData = [
  { teks: "5 murid belum aktif minggu ini", icon: UserX, tone: "bg-rose-50 text-rose-700 border-rose-100" },
  { teks: "3 murid progress rendah (<50%)", icon: TrendingDown, tone: "bg-amber-50 text-amber-700 border-amber-100" },
];

type FilterKey = "Semua" | "Aktif" | "Tidak Aktif" | "Progress Rendah";

export default function TeacherStudentsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("Semua");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleDetail = (id: number) => setExpandedId((p) => (p === id ? null : id));

  const filtered = muridData.filter((m) => {
    const cocokQuery = m.nama.toLowerCase().includes(query.toLowerCase()) || m.course.toLowerCase().includes(query.toLowerCase());
    if (!cocokQuery) return false;
    if (filter === "Aktif") return m.aktif;
    if (filter === "Tidak Aktif") return !m.aktif;
    if (filter === "Progress Rendah") return m.progress < 50;
    return true;
  });

  const filters: FilterKey[] = ["Semua", "Aktif", "Tidak Aktif", "Progress Rendah"];

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      <header className="mb-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Murid</h1>
          <p className="mt-1 text-sm text-stone-500">Pusat monitoring progress dan aktivitas murid</p>
        </div>

        {/* Insight */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {insightData.map((item) => (
            <div key={item.teks} className={`flex items-center gap-3 rounded-2xl border p-4 shadow-[0_6px_16px_rgba(41,28,23,0.05)] ${item.tone}`}>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/60"><item.icon size={16} /></span>
              <p className="text-sm font-medium">{item.teks}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-stone-400" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama atau course..."
              className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pr-3 pl-9 text-sm text-stone-900 shadow-sm outline-none transition focus:border-stone-400 focus:ring-1 focus:ring-stone-300" />
          </div>
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`snap-start rounded-full border px-3.5 py-2 text-xs font-semibold transition whitespace-nowrap ${filter === f ? "border-stone-900 bg-stone-900 text-amber-50" : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200/90 bg-white py-12 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <GraduationCap size={36} className="text-stone-300" />
            <p className="mt-3 text-sm font-semibold text-stone-700">Tidak ada murid ditemukan</p>
            <p className="mt-1 text-xs text-stone-400">Coba ubah kata kunci atau filter</p>
          </div>
        ) : (
          filtered.map((murid) => {
            const isOpen = expandedId === murid.id;
            return (
              <article key={murid.id} className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5">
                <button type="button" onClick={() => toggleDetail(murid.id)} className="flex w-full items-center gap-3 text-left">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8] text-[11px] font-semibold text-stone-900">{murid.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-stone-900">{murid.nama}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${murid.aktif ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"}`}>
                        {murid.aktif ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-stone-500">{murid.course}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
                        <div className="h-full rounded-full bg-[#d7ccc8]" style={{ width: `${murid.progress}%` }} />
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-stone-600"><TrendingUp size={10} />{murid.progress}%</span>
                    </div>
                  </div>
                  <span className="ml-2 shrink-0 text-stone-400">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
                </button>

                {isOpen && (
                  <div className="mt-4 space-y-4 border-t border-stone-100 pt-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">Progress Detail</p>
                      <div className="flex items-center justify-between text-xs text-stone-600"><span>Materi dikerjakan</span><span>{murid.progress}%</span></div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-stone-100">
                        <div className={`h-full rounded-full ${murid.progress >= 80 ? "bg-emerald-400" : murid.progress >= 50 ? "bg-amber-400" : "bg-rose-400"}`} style={{ width: `${murid.progress}%` }} />
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">Aktivitas Terakhir</p>
                      <ul className="space-y-2">
                        {murid.aktivitas.map((akt, i) => (
                          <li key={i} className="flex items-start gap-2 rounded-lg bg-stone-50 px-3 py-2 text-xs text-stone-700"><Clock size={12} className="mt-0.5 shrink-0 text-stone-400" />{akt}</li>
                        ))}
                        <li className="flex items-center gap-2 text-[11px] text-stone-400"><Clock size={12} />Terakhir aktif: {murid.terakhirAktif}</li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">Hasil Quiz</p>
                      {murid.quiz.length === 0 ? (
                        <p className="text-xs text-stone-400">Belum mengikuti quiz</p>
                      ) : (
                        <div className="space-y-2">
                          {murid.quiz.map((q, i) => (
                            <div key={i} className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <ClipboardCheck size={12} className="shrink-0 text-stone-400" />
                                <div className="min-w-0">
                                  <p className="text-xs font-medium text-stone-800 truncate">{q.judul}</p>
                                  <p className="text-[11px] text-stone-400">{q.tanggal}</p>
                                </div>
                              </div>
                              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${q.skor >= 80 ? "bg-emerald-50 text-emerald-700" : q.skor >= 60 ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-600"}`}>{q.skor}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
