"use client";

import { ClipboardList, Circle, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const quizzes = [
  { id: 1, title: "Quiz Dasar Pemrograman", course: "Intro to Python", status: "not_started" as const, totalQuestions: 5 },
  { id: 2, title: "Quiz Algoritma", course: "Data Structures", status: "completed" as const, score: 80, totalQuestions: 5 },
  { id: 3, title: "Quiz Basis Data", course: "Database Design", status: "not_started" as const, totalQuestions: 5 },
  { id: 4, title: "Quiz UI/UX", course: "Design System", status: "completed" as const, score: 60, totalQuestions: 5 },
];

export default function StudentQuizListPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "not_started">("all");
  const filtered = quizzes.filter((q) => filter === "all" || q.status === filter);

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Quiz</h1>
        <p className="mt-1 text-sm text-stone-500">Latihan dan evaluasi pembelajaran.</p>
      </header>

      <section className="mb-5 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <p className="text-xs font-semibold text-stone-500">Total</p>
          <p className="mt-1 text-xl font-bold text-stone-900">{quizzes.length}</p>
        </div>
        <div className="rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <p className="text-xs font-semibold text-stone-500">Selesai</p>
          <p className="mt-1 text-xl font-bold text-emerald-700">{quizzes.filter((q) => q.status === "completed").length}</p>
        </div>
        <div className="rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <p className="text-xs font-semibold text-stone-500">Avg Nilai</p>
          <p className="mt-1 text-xl font-bold text-stone-900">
            {Math.round(
              quizzes.filter((q) => q.score !== undefined).reduce((a, q) => a + (q.score ?? 0), 0) /
                Math.max(1, quizzes.filter((q) => q.score !== undefined).length),
            )}
          </p>
        </div>
      </section>

      <section className="mb-4 flex gap-2">
        {(["all", "not_started", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
              filter === f
                ? "bg-stone-900 text-amber-50 shadow"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            {f === "all" ? "Semua" : f === "completed" ? "Selesai" : "Belum"}
          </button>
        ))}
      </section>

      <section className="space-y-3">
        {filtered.map((quiz) => {
          const done = quiz.status === "completed";
          return (
            <div
              key={quiz.id}
              className="flex items-center gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(41,28,23,0.1)]"
            >
              <span
                className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  done ? "bg-emerald-50 text-emerald-600" : "bg-[#d7ccc8] text-stone-900"
                }`}
              >
                <ClipboardList size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-stone-900">{quiz.title}</p>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-stone-500">
                  <BookOpen size={11} />
                  <span className="truncate">{quiz.course}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      done ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {done ? <CheckCircle2 size={11} /> : <Circle size={11} />}
                    {done ? "Selesai" : "Belum dikerjakan"}
                  </span>
                  {done && quiz.score !== undefined && (
                    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-600">
                      Nilai {quiz.score}
                    </span>
                  )}
                </div>
              </div>
              <Link
                href={`/dashboard/student/quiz/${quiz.id}`}
                className={`inline-flex shrink-0 items-center gap-1 rounded-xl px-3.5 py-2 text-xs font-semibold transition active:scale-95 ${
                  done
                    ? "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                    : "bg-stone-900 text-amber-50 hover:bg-stone-800"
                }`}
              >
                {done ? "Lihat Hasil" : "Kerjakan"}
                <ArrowRight size={13} />
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}
