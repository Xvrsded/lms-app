"use client";

import {
  ChevronDown, ChevronUp, ClipboardCheck, Eye, FilePlus, Pencil,
  Search, Trash2, TrendingDown, UserX,
} from "lucide-react";
import { useState } from "react";

const quizData = [
  {
    id: 1, judul: "Quiz UI/UX: Dasar Design", course: "Dasar UI/UX Design",
    soal: 20, peserta: 38, status: "Aktif", rataRata: 72,
    hasil: [
      { nama: "Rina Sari", skor: 95 },
      { nama: "Budi Hartono", skor: 42 },
      { nama: "Andi Wijaya", skor: 78 },
      { nama: "Dewi Lestari", skor: 65 },
      { nama: "Eka Putri", skor: 88 },
    ],
  },
  {
    id: 2, judul: "Quiz HTML & CSS", course: "Web Development",
    soal: 25, peserta: 32, status: "Aktif", rataRata: 68,
    hasil: [
      { nama: "Andi Wijaya", skor: 82 },
      { nama: "Eka Putri", skor: 90 },
      { nama: "Rina Sari", skor: 55 },
      { nama: "Dewi Lestari", skor: 48 },
    ],
  },
  {
    id: 3, judul: "Quiz Data Visualization", course: "Data Analytics",
    soal: 15, peserta: 10, status: "Aktif", rataRata: 55,
    hasil: [{ nama: "Dewi Lestari", skor: 70 }, { nama: "Fajar Nugraha", skor: 40 }],
  },
  {
    id: 4, judul: "Quiz Kotlin Basics", course: "Mobile App Dev",
    soal: 30, peserta: 0, status: "Draft", rataRata: 0, hasil: [],
  },
  {
    id: 5, judul: "Quiz Neural Network", course: "Machine Learning",
    soal: 22, peserta: 5, status: "Aktif", rataRata: 60,
    hasil: [{ nama: "Fajar Nugraha", skor: 62 }, { nama: "Budi Hartono", skor: 58 }],
  },
];

const insightData = [
  { teks: "Nilai rata-rata rendah", icon: TrendingDown, tone: "bg-amber-50 text-amber-700 border-amber-100" },
  { teks: "Banyak murid belum submit", icon: UserX, tone: "bg-rose-50 text-rose-700 border-rose-100" },
];

type FilterStatus = "Semua" | "Aktif" | "Draft";

export default function TeacherQuizPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("Semua");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = quizData.filter((q) => {
    const cocok = q.judul.toLowerCase().includes(query.toLowerCase()) || q.course.toLowerCase().includes(query.toLowerCase());
    return cocok && (filter === "Semua" || q.status === filter);
  });

  const statusBadge = (s: string) => s === "Aktif" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-stone-50 text-stone-600 border-stone-200";
  const skorColor = (skor: number) => skor >= 80 ? "bg-emerald-50 text-emerald-700" : skor >= 60 ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-600";
  const barColor = (skor: number) => skor >= 80 ? "bg-emerald-400" : skor >= 60 ? "bg-amber-400" : "bg-rose-400";

  const filters: FilterStatus[] = ["Semua", "Aktif", "Draft"];

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      <header className="mb-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Quiz</h1>
          <p className="mt-1 text-sm text-stone-500">Buat dan pantau hasil quiz murid</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {insightData.map((item) => (
            <div key={item.teks} className={`flex items-center gap-3 rounded-2xl border p-4 shadow-[0_6px_16px_rgba(41,28,23,0.05)] ${item.tone}`}>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/60"><item.icon size={16} /></span>
              <p className="text-sm font-medium">{item.teks}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-stone-400" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari quiz..."
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
            <ClipboardCheck size={36} className="text-stone-300" />
            <p className="mt-3 text-sm font-semibold text-stone-700">Belum ada quiz</p>
            <p className="mt-1 text-xs text-stone-400">Buat quiz pertama Anda</p>
          </div>
        ) : (
          filtered.map((quiz) => {
            const isOpen = expandedId === quiz.id;
            const best = quiz.hasil.length ? quiz.hasil.reduce((a, b) => a.skor > b.skor ? a : b) : null;
            const worst = quiz.hasil.length ? quiz.hasil.reduce((a, b) => a.skor < b.skor ? a : b) : null;
            const maxSkor = Math.max(...quiz.hasil.map((h) => h.skor), 1);

            return (
              <article key={quiz.id} className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5">
                <button type="button" onClick={() => setExpandedId(isOpen ? null : quiz.id)} className="flex w-full items-start gap-3 text-left">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8] text-stone-900"><ClipboardCheck size={16} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-stone-900">{quiz.judul}</p>
                      <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusBadge(quiz.status)}`}>{quiz.status}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-stone-500">{quiz.course}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                      <span className="rounded-full bg-stone-100 px-2 py-1">{quiz.soal} soal</span>
                      <span className="rounded-full bg-stone-100 px-2 py-1">{quiz.peserta} peserta</span>
                      {quiz.status === "Aktif" && <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">rata-rata {quiz.rataRata}</span>}
                    </div>
                  </div>
                  <span className="ml-2 shrink-0 text-stone-400">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
                </button>

                {/* Actions row */}
                <div className="mt-3 flex items-center gap-2">
                  <button type="button" className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-[11px] font-semibold text-amber-50 transition hover:bg-stone-800 active:scale-95"><Pencil size={12} /> Edit</button>
                  <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-700 transition hover:bg-stone-50 active:scale-95"><Eye size={12} /> Lihat Hasil</button>
                  <button type="button" className="ml-auto inline-flex items-center gap-1 rounded-lg border border-rose-100 bg-rose-50 px-3 py-1.5 text-[11px] font-semibold text-rose-600 transition hover:bg-rose-100 active:scale-95"><Trash2 size={12} /> Hapus</button>
                </div>

                {/* Expanded results */}
                {isOpen && quiz.hasil.length > 0 && (
                  <div className="mt-4 space-y-4 border-t border-stone-100 pt-4">
                    {/* Summary */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-stone-50 p-3 text-center">
                        <p className="text-[11px] text-stone-500">Rata-rata</p>
                        <p className="mt-1 text-lg font-bold text-stone-900">{quiz.rataRata}</p>
                      </div>
                      <div className="rounded-xl bg-emerald-50 p-3 text-center">
                        <p className="text-[11px] text-emerald-600">Terbaik</p>
                        <p className="mt-1 text-sm font-bold text-emerald-800">{best?.nama}</p>
                        <p className="text-xs font-semibold text-emerald-700">{best?.skor}</p>
                      </div>
                      <div className="rounded-xl bg-rose-50 p-3 text-center">
                        <p className="text-[11px] text-rose-600">Terendah</p>
                        <p className="mt-1 text-sm font-bold text-rose-800">{worst?.nama}</p>
                        <p className="text-xs font-semibold text-rose-700">{worst?.skor}</p>
                      </div>
                    </div>

                    {/* Bar chart */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">Distribusi Nilai</p>
                      <div className="flex items-end gap-2 rounded-xl bg-stone-50 p-3">
                        {quiz.hasil.map((h, i) => (
                          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                            <div className="relative flex h-28 w-full items-end rounded-lg bg-white px-1">
                              <div className={`w-full rounded-md transition-all`} style={{ height: `${Math.max((h.skor / maxSkor) * 100, 10)}%`, backgroundColor: h.skor >= 80 ? "#34d399" : h.skor >= 60 ? "#fbbf24" : "#fb7185" }} />
                            </div>
                            <span className="text-center text-[10px] font-medium text-stone-500">{h.nama.split(" ")[0]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Result list */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">Hasil Murid</p>
                      <div className="space-y-2">
                        {quiz.hasil.map((h, i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-2">
                            <span className="text-xs font-medium text-stone-700">{h.nama}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${skorColor(h.skor)}`}>{h.skor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {isOpen && quiz.hasil.length === 0 && (
                  <div className="mt-4 border-t border-stone-100 pt-4 text-center">
                    <p className="text-xs text-stone-400">Belum ada hasil</p>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      <button type="button" className="fixed right-4 bottom-24 z-30 inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-amber-50 shadow-xl transition hover:scale-105 active:scale-95">
        <FilePlus size={18} /> Buat Quiz
      </button>
    </div>
  );
}
