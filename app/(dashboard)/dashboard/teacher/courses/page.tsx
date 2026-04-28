"use client";

import { BookOpen, Eye, FilePlus, Flame, Pencil, Search, Trash2, TrendingDown } from "lucide-react";
import { useState } from "react";

type Course = {
  id: number;
  judul: string;
  murid: number;
  status: "Aktif" | "Draft" | "Menunggu Persetujuan";
  progress: number;
  insight?: string;
  tone?: string;
};

const semuaCourse: Course[] = [
  { id: 1, judul: "Dasar UI/UX Design", murid: 45, status: "Aktif", progress: 85, insight: "Course ini populer", tone: "bg-emerald-50 text-emerald-700" },
  { id: 2, judul: "Web Development", murid: 38, status: "Aktif", progress: 62 },
  { id: 3, judul: "Data Analytics", murid: 22, status: "Menunggu Persetujuan", progress: 30, insight: "Course ini memiliki engagement rendah", tone: "bg-amber-50 text-amber-700" },
  { id: 4, judul: "Mobile App Dev", murid: 0, status: "Draft", progress: 10 },
  { id: 5, judul: "Machine Learning", murid: 12, status: "Aktif", progress: 55 },
  { id: 6, judul: "Cloud Computing", murid: 0, status: "Draft", progress: 15 },
];

type FilterStatus = "Semua" | "Aktif" | "Menunggu Persetujuan" | "Draft";

export default function TeacherCoursesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("Semua");

  const filtered = semuaCourse.filter((c) => {
    const cocokQuery = c.judul.toLowerCase().includes(query.toLowerCase());
    const cocokStatus = filter === "Semua" || c.status === filter;
    return cocokQuery && cocokStatus;
  });

  const statusBadge = (s: string) => {
    if (s === "Aktif") return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (s === "Menunggu Persetujuan") return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-stone-50 text-stone-600 border-stone-200";
  };

  const filters: FilterStatus[] = ["Semua", "Aktif", "Menunggu Persetujuan", "Draft"];

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      <header className="mb-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Course Saya</h1>
          <p className="mt-1 text-sm text-stone-500">Kelola dan pantau semua course Anda</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari course..."
              className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pr-3 pl-9 text-sm text-stone-900 shadow-sm outline-none transition focus:border-stone-400 focus:ring-1 focus:ring-stone-300"
            />
          </div>
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`snap-start rounded-full border px-3.5 py-2 text-xs font-semibold transition whitespace-nowrap ${
                  filter === f
                    ? "border-stone-900 bg-stone-900 text-amber-50"
                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* List Course */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200/90 bg-white py-12 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <BookOpen size={36} className="text-stone-300" />
            <p className="mt-3 text-sm font-semibold text-stone-700">Belum ada course</p>
            <p className="mt-1 text-xs text-stone-400">Mulai buat course pertama Anda</p>
          </div>
        ) : (
          filtered.map((course) => (
            <article
              key={course.id}
              className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8] text-stone-900">
                    <BookOpen size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stone-900">{course.judul}</p>
                    <p className="mt-0.5 text-xs text-stone-500">{course.murid} murid terdaftar</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusBadge(course.status)}`}>
                  {course.status}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>Progress materi</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-[#d7ccc8] transition-all" style={{ width: `${course.progress}%` }} />
                </div>
              </div>

              {course.insight && (
                <div className={`mt-3 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${course.tone}`}>
                  {course.insight.includes("populer") ? <Flame size={12} /> : <TrendingDown size={12} />}
                  {course.insight}
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <button type="button" className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-[11px] font-semibold text-amber-50 transition hover:bg-stone-800 active:scale-95">
                  <Pencil size={12} /> Edit
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-700 transition hover:bg-stone-50 active:scale-95">
                  <Eye size={12} /> Lihat Detail
                </button>
                <button type="button" className="ml-auto inline-flex items-center gap-1 rounded-lg border border-rose-100 bg-rose-50 px-3 py-1.5 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-100 active:scale-95">
                  <Trash2 size={12} /> Hapus
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Floating add */}
      <button
        type="button"
        className="fixed right-4 bottom-24 z-30 inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-amber-50 shadow-xl transition hover:scale-105 active:scale-95"
      >
        <FilePlus size={18} /> Tambah Course
      </button>
    </div>
  );
}
