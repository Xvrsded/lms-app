"use client";

import {
  BookOpen,
  CheckCircle2,
  Circle,
  FileText,
  GraduationCap,
  Play,
  Trophy,
  X,
} from "lucide-react";
import { useState } from "react";

type Materi = {
  id: number;
  judul: string;
  tipe: "video" | "pdf";
  durasi?: string;
  selesai: boolean;
};

type Course = {
  id: number;
  judul: string;
  deskripsi: string;
  progress: number;
  totalMateri: number;
  selesaiMateri: number;
  status: "Aktif" | "Selesai";
  materi: Materi[];
};

const dataCourses: Course[] = [
  {
    id: 1,
    judul: "Dasar UI/UX Design",
    deskripsi: "Pelajari fundamental desain antarmuka dan pengalaman pengguna dari nol.",
    progress: 72,
    totalMateri: 12,
    selesaiMateri: 9,
    status: "Aktif",
    materi: [
      { id: 1, judul: "Pengenalan UI/UX", tipe: "video", durasi: "12:30", selesai: true },
      { id: 2, judul: "User Research", tipe: "video", durasi: "18:45", selesai: true },
      { id: 3, judul: "Design Thinking", tipe: "pdf", selesai: true },
      { id: 4, judul: "Wireframe", tipe: "video", durasi: "15:20", selesai: true },
      { id: 5, judul: "Prototype", tipe: "video", durasi: "22:10", selesai: true },
      { id: 6, judul: "Usability Testing", tipe: "pdf", selesai: true },
      { id: 7, judul: "Figma Basics", tipe: "video", durasi: "25:00", selesai: true },
      { id: 8, judul: "Auto Layout", tipe: "video", durasi: "14:50", selesai: true },
      { id: 9, judul: "Design System", tipe: "pdf", selesai: true },
      { id: 10, judul: "Micro Interaction", tipe: "video", durasi: "10:15", selesai: false },
      { id: 11, judul: "Handoff ke Developer", tipe: "pdf", selesai: false },
      { id: 12, judul: "Final Project", tipe: "video", durasi: "30:00", selesai: false },
    ],
  },
  {
    id: 2,
    judul: "Web Development",
    deskripsi: "Bangun website modern dengan HTML, CSS, JavaScript, dan framework populer.",
    progress: 45,
    totalMateri: 20,
    selesaiMateri: 9,
    status: "Aktif",
    materi: [
      { id: 1, judul: "HTML Dasar", tipe: "video", durasi: "20:00", selesai: true },
      { id: 2, judul: "Semantic HTML", tipe: "pdf", selesai: true },
      { id: 3, judul: "CSS Dasar", tipe: "video", durasi: "25:00", selesai: true },
      { id: 4, judul: "CSS Flexbox", tipe: "video", durasi: "18:30", selesai: true },
      { id: 5, judul: "CSS Grid", tipe: "video", durasi: "22:00", selesai: true },
      { id: 6, judul: "Responsive Design", tipe: "pdf", selesai: true },
      { id: 7, judul: "JavaScript Dasar", tipe: "video", durasi: "30:00", selesai: true },
      { id: 8, judul: "DOM Manipulation", tipe: "video", durasi: "15:00", selesai: true },
      { id: 9, judul: "Event Handling", tipe: "pdf", selesai: true },
      { id: 10, judul: "ES6+ Features", tipe: "video", durasi: "28:00", selesai: false },
      { id: 11, judul: "Async JavaScript", tipe: "video", durasi: "24:00", selesai: false },
      { id: 12, judul: "Git & GitHub", tipe: "pdf", selesai: false },
      { id: 13, judul: "React Intro", tipe: "video", durasi: "35:00", selesai: false },
      { id: 14, judul: "React Hooks", tipe: "video", durasi: "40:00", selesai: false },
      { id: 15, judul: "React Router", tipe: "pdf", selesai: false },
      { id: 16, judul: "State Management", tipe: "video", durasi: "32:00", selesai: false },
      { id: 17, judul: "API Integration", tipe: "video", durasi: "28:00", selesai: false },
      { id: 18, judul: "Deployment", tipe: "pdf", selesai: false },
      { id: 19, judul: "Next.js Dasar", tipe: "video", durasi: "38:00", selesai: false },
      { id: 20, judul: "Final Project", tipe: "video", durasi: "45:00", selesai: false },
    ],
  },
  {
    id: 3,
    judul: "Data Analytics",
    deskripsi: "Analisis data dengan Excel, SQL, dan visualisasi untuk pengambilan keputusan.",
    progress: 20,
    totalMateri: 15,
    selesaiMateri: 3,
    status: "Aktif",
    materi: [
      { id: 1, judul: "Pengenalan Data Analytics", tipe: "video", durasi: "15:00", selesai: true },
      { id: 2, judul: "Excel Dasar", tipe: "video", durasi: "20:00", selesai: true },
      { id: 3, judul: "Formula & Function", tipe: "pdf", selesai: true },
      { id: 4, judul: "Pivot Table", tipe: "video", durasi: "18:00", selesai: false },
      { id: 5, judul: "Data Visualization", tipe: "video", durasi: "22:00", selesai: false },
      { id: 6, judul: "SQL Dasar", tipe: "pdf", selesai: false },
      { id: 7, judul: "Query Lanjutan", tipe: "video", durasi: "25:00", selesai: false },
      { id: 8, judul: "Database Design", tipe: "pdf", selesai: false },
      { id: 9, judul: "Python untuk Data", tipe: "video", durasi: "30:00", selesai: false },
      { id: 10, judul: "Pandas & NumPy", tipe: "video", durasi: "28:00", selesai: false },
      { id: 11, judul: "Data Cleaning", tipe: "pdf", selesai: false },
      { id: 12, judul: "Statistik Dasar", tipe: "video", durasi: "24:00", selesai: false },
      { id: 13, judul: "Storytelling with Data", tipe: "video", durasi: "20:00", selesai: false },
      { id: 14, judul: "Dashboard Creation", tipe: "pdf", selesai: false },
      { id: 15, judul: "Final Project", tipe: "video", durasi: "35:00", selesai: false },
    ],
  },
];

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(dataCourses);
  const [openCourseId, setOpenCourseId] = useState<number | null>(null);

  const aktifCount = courses.filter((c) => c.status === "Aktif").length;
  const selesaiCount = courses.filter((c) => c.status === "Selesai").length;
  const avgProgress = Math.round(
    courses.reduce((s, c) => s + c.progress, 0) / (courses.length || 1),
  );

  const toggleMateri = (courseId: number, materiId: number) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const updatedMateri = c.materi.map((m) =>
          m.id === materiId ? { ...m, selesai: !m.selesai } : m,
        );
        const selesaiMateri = updatedMateri.filter((m) => m.selesai).length;
        const progress = Math.round((selesaiMateri / c.totalMateri) * 100);
        const status = progress === 100 ? ("Selesai" as const) : ("Aktif" as const);
        return { ...c, materi: updatedMateri, selesaiMateri, progress, status };
      }),
    );
  };

  const openCourse = courses.find((c) => c.id === openCourseId);

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Course Saya</h1>
        <p className="mt-1 text-sm text-stone-500">Kelola dan lanjutkan belajarmu.</p>
      </header>

      {/* Stat mini */}
      <section className="mb-6 grid grid-cols-3 gap-3">
        <article className="rounded-2xl border border-stone-200/90 bg-white p-3.5 text-center shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Aktif</p>
          <p className="mt-1 text-xl font-bold text-stone-900">{aktifCount}</p>
        </article>
        <article className="rounded-2xl border border-stone-200/90 bg-white p-3.5 text-center shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Selesai</p>
          <p className="mt-1 text-xl font-bold text-stone-900">{selesaiCount}</p>
        </article>
        <article className="rounded-2xl border border-stone-200/90 bg-white p-3.5 text-center shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Avg</p>
          <p className="mt-1 text-xl font-bold text-stone-900">{avgProgress}%</p>
        </article>
      </section>

      {/* Course List */}
      <section className="mb-6 space-y-4">
        {courses.map((c) => {
          const isOpen = openCourseId === c.id;
          const sisaMateri = c.totalMateri - c.selesaiMateri;
          return (
            <div key={c.id}>
              <article
                onClick={() => setOpenCourseId(isOpen ? null : c.id)}
                className={`cursor-pointer rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5 ${isOpen ? "ring-1 ring-stone-300" : ""}`}
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#d7ccc8] text-stone-900 shadow-sm">
                    <GraduationCap size={26} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{c.judul}</p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-stone-500">{c.deskripsi}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          c.status === "Selesai"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-stone-500">
                        <span>
                          {c.selesaiMateri}/{c.totalMateri} materi
                        </span>
                        <span className="font-semibold text-stone-700">{c.progress}%</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-stone-100">
                        <div
                          className="h-full rounded-full bg-[#d7ccc8] transition-all duration-500"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Expandable Detail */}
              {isOpen && (
                <div className="mt-3 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_12px_28px_rgba(41,28,23,0.09)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-stone-900">{c.judul}</p>
                      <p className="text-xs text-stone-500">
                        {c.selesaiMateri} dari {c.totalMateri} materi selesai
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenCourseId(null);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-200 hover:text-stone-800"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Big Progress */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Progress Keseluruhan</span>
                      <span className="text-sm font-bold text-stone-900">{c.progress}%</span>
                    </div>
                    <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-stone-100">
                      <div
                        className="h-full rounded-full bg-[#d7ccc8] transition-all duration-500"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Materi List */}
                  <div className="mt-5 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Daftar Materi</p>
                    <div className="space-y-2">
                      {c.materi.map((m, idx) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => toggleMateri(c.id, m.id)}
                          className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                            m.selesai
                              ? "border-emerald-100 bg-emerald-50/50"
                              : "border-stone-100 bg-stone-50/70 hover:border-stone-200 hover:bg-stone-50"
                          }`}
                        >
                          <span className="text-[11px] font-medium text-stone-400">{String(idx + 1).padStart(2, "0")}</span>
                          <span
                            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                              m.selesai ? "bg-[#d7ccc8] text-stone-900" : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            {m.tipe === "video" ? <Play size={14} /> : <FileText size={14} />}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-medium ${m.selesai ? "text-stone-700 line-through" : "text-stone-900"}`}>
                              {m.judul}
                            </p>
                            {m.durasi && <p className="text-[11px] text-stone-400">{m.durasi}</p>}
                          </div>
                          {m.selesai ? (
                            <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
                          ) : (
                            <Circle size={18} className="shrink-0 text-stone-300" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Insight */}
                  {sisaMateri <= 3 && c.progress < 100 && (
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50/60 p-3">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600"><Trophy size={13} /></span>
                      <p className="text-sm text-stone-700">
                        Kamu hampir selesai course ini! Tersisa <span className="font-semibold">{sisaMateri} materi</span> lagi.
                      </p>
                    </div>
                  )}
                  {c.progress === 100 && (
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Trophy size={13} /></span>
                      <p className="text-sm text-stone-700">Selamat! Course ini sudah <span className="font-semibold">lengkap</span>.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Insight Personal */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Insight</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600"><BookOpen size={15} /></span>
            <p className="text-sm text-stone-700">
              Lanjutkan <span className="font-semibold">Dasar UI/UX Design</span> — tinggal 3 materi lagi untuk selesai.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
