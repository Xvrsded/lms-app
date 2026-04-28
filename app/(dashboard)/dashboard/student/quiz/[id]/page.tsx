"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  XCircle,
  Trophy,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useParams } from "next/navigation";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

interface QuizData {
  id: number;
  title: string;
  course: string;
  questions: Question[];
}

const quizzes: Record<number, QuizData> = {
  1: {
    id: 1,
    title: "Quiz Dasar Pemrograman",
    course: "Intro to Python",
    questions: [
      {
        id: 1,
        text: "Manakah tipe data yang digunakan untuk menyimpan teks di Python?",
        options: ["int", "str", "float", "bool"],
        correct: 1,
      },
      {
        id: 2,
        text: "Fungsi apa yang digunakan untuk menampilkan output ke layar?",
        options: ["input()", "print()", "echo()", "write()"],
        correct: 1,
      },
      {
        id: 3,
        text: "Operator apa yang digunakan untuk perbandingan sama dengan?",
        options: ["=", "==", "===", "<>"],
        correct: 1,
      },
      {
        id: 4,
        text: "Struktur kontrol mana yang digunakan untuk perulangan?",
        options: ["if", "for", "switch", "try"],
        correct: 1,
      },
      {
        id: 5,
        text: "List di Python ditulis dengan tanda kurung apa?",
        options: ["()", "{}", "[]", "<>"],
        correct: 2,
      },
    ],
  },
  2: {
    id: 2,
    title: "Quiz Algoritma",
    course: "Data Structures",
    questions: [
      {
        id: 1,
        text: "Kompleksitas waktu Bubble Sort dalam kasus terburuk adalah?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
        correct: 2,
      },
      {
        id: 2,
        text: "Struktur data yang bekerja dengan prinsip LIFO adalah?",
        options: ["Queue", "Stack", "Linked List", "Tree"],
        correct: 1,
      },
      {
        id: 3,
        text: "Algoritma pencarian yang memerlukan data terurut adalah?",
        options: ["Linear Search", "Binary Search", "Hash Search", "DFS"],
        correct: 1,
      },
      {
        id: 4,
        text: "Node pertama dalam Linked List disebut?",
        options: ["Tail", "Root", "Head", "Leaf"],
        correct: 2,
      },
      {
        id: 5,
        text: "Depth-First Search menggunakan struktur data?",
        options: ["Queue", "Stack", "Array", "Heap"],
        correct: 1,
      },
    ],
  },
  3: {
    id: 3,
    title: "Quiz Basis Data",
    course: "Database Design",
    questions: [
      {
        id: 1,
        text: "Perintah SQL untuk mengambil data adalah?",
        options: ["GET", "SELECT", "FETCH", "READ"],
        correct: 1,
      },
      {
        id: 2,
        text: "Kunci utama yang unik untuk setiap baris disebut?",
        options: ["Foreign Key", "Primary Key", "Candidate Key", "Super Key"],
        correct: 1,
      },
      {
        id: 3,
        text: "Relasi many-to-many biasanya dipecah dengan?",
        options: ["Trigger", "Join Table", "View", "Index"],
        correct: 1,
      },
      {
        id: 4,
        text: "Normalisasi tujuannya adalah?",
        options: ["Meningkatkan kecepatan", "Mengurangi redundansi", "Menambah kolom", "Backup data"],
        correct: 1,
      },
      {
        id: 5,
        text: "ACID dalam transaksi database berarti?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Index, Data",
          "Array, Cache, Input, Disk",
          "Authentication, Connection, Interface, Design",
        ],
        correct: 0,
      },
    ],
  },
  4: {
    id: 4,
    title: "Quiz UI/UX",
    course: "Design System",
    questions: [
      {
        id: 1,
        text: "Prinsip desain yang menekankan keseragaman adalah?",
        options: ["Kontras", "Konsistensi", "Keseimbangan", "Proporsi"],
        correct: 1,
      },
      {
        id: 2,
        text: "Warna yang berlawanan dalam roda warna disebut?",
        options: ["Analog", "Monokromatik", "Komplementer", "Triadik"],
        correct: 2,
      },
      {
        id: 3,
        text: "Jarak antar elemen dalam desain disebut?",
        options: ["Margin", "Padding", "White Space", "Border"],
        correct: 2,
      },
      {
        id: 4,
        text: "Figma adalah tool untuk?",
        options: ["Coding", "Prototyping", "Database", "Deployment"],
        correct: 1,
      },
      {
        id: 5,
        text: "Responsive design berarti?",
        options: [
          "Desain yang cepat",
          "Desain yang beradaptasi di semua ukuran layar",
          "Desain minimalis",
          "Desain beranimasi",
        ],
        correct: 1,
      },
    ],
  },
};

function getFeedback(scorePct: number) {
  if (scorePct >= 80) return { label: "Bagus!", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" };
  if (scorePct >= 60) return { label: "Cukup Baik", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" };
  return { label: "Perlu Belajar Lagi", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" };
}

export default function QuizPlayPage() {
  const params = useParams();
  const quizId = Number(params.id);
  const quiz = quizzes[quizId];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900">
        <header className="mb-6 flex items-center gap-3">
          <Link href="/dashboard/student/quiz" className="inline-flex rounded-xl border border-stone-200 bg-white p-2 shadow-sm transition hover:bg-stone-50 active:scale-95">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-lg font-bold">Quiz Tidak Ditemukan</h1>
        </header>
        <p className="text-sm text-stone-500">Quiz yang kamu cari tidak tersedia.</p>
      </div>
    );
  }

  const total = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = ((current + 1) / total) * 100;

  const handleOption = (optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [quiz.questions[current].id]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRestart = () => {
    setCurrent(0);
    setAnswers({});
    setSubmitted(false);
  };

  const score = submitted
    ? quiz.questions.reduce((acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc), 0)
    : 0;
  const scorePct = submitted ? Math.round((score / total) * 100) : 0;
  const feedback = submitted ? getFeedback(scorePct) : null;

  const isAnswered = (qid: number) => answers[qid] !== undefined;

  const goNext = useCallback(() => {
    if (current < total - 1) setCurrent((c) => c + 1);
  }, [current, total]);

  const goPrev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1);
  }, [current]);

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      {/* Header */}
      <header className="mb-6 flex items-center gap-3">
        <Link href="/dashboard/student/quiz" className="inline-flex rounded-xl border border-stone-200 bg-white p-2 shadow-sm transition hover:bg-stone-50 active:scale-95">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-lg font-bold leading-tight">{quiz.title}</h1>
          <p className="text-xs text-stone-500">{quiz.course}</p>
        </div>
      </header>

      {/* Progress */}
      {!submitted && (
        <section className="mb-5">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-stone-500">
            <span>
              Soal {current + 1} / {total}
            </span>
            <span>{answeredCount} dijawab</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-stone-900 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>
      )}

      {/* Question Navigator (dots) */}
      {!submitted && (
        <section className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {quiz.questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrent(idx)}
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition active:scale-95 ${
                idx === current
                  ? "bg-stone-900 text-amber-50 shadow"
                  : isAnswered(q.id)
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-white text-stone-500 border border-stone-200"
              }`}
            >
              {isAnswered(q.id) ? <CheckCircle2 size={14} /> : idx + 1}
            </button>
          ))}
        </section>
      )}

      {/* Question Card */}
      <section className="mb-5">
        <div className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
          {submitted ? (
            <div className="text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-stone-900 text-amber-50 shadow-lg">
                <Trophy size={28} />
              </span>
              <p className="mt-4 text-2xl font-bold text-stone-900">
                {score} / {total}
              </p>
              <p className="text-sm text-stone-500">Nilai kamu: {scorePct}</p>
              {feedback && (
                <div className={`mt-4 inline-block rounded-2xl border ${feedback.border} ${feedback.bg} px-5 py-2.5 text-sm font-bold ${feedback.color}`}>
                  {feedback.label}
                </div>
              )}

              {/* Review answers */}
              <div className="mt-6 space-y-3 text-left">
                {quiz.questions.map((q) => {
                  const chosen = answers[q.id];
                  const correct = q.correct;
                  const isCorrect = chosen === correct;
                  return (
                    <div key={q.id} className="rounded-xl border border-stone-200 bg-stone-50 p-3">
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                        ) : (
                          <XCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{q.text}</p>
                          <p className="mt-1 text-xs text-stone-500">
                            Jawaban kamu: <span className={isCorrect ? "font-semibold text-emerald-700" : "font-semibold text-red-600"}>{chosen !== undefined ? q.options[chosen] : "Tidak dijawab"}</span>
                          </p>
                          {!isCorrect && (
                            <p className="mt-0.5 text-xs text-emerald-700">
                              Jawaban benar: <span className="font-semibold">{q.options[correct]}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleRestart}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 active:scale-95"
                >
                  <RotateCcw size={14} />
                  Ulangi
                </button>
                <Link
                  href="/dashboard/student/quiz"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 text-sm font-semibold text-amber-50 shadow-lg transition hover:bg-stone-800 active:scale-95"
                >
                  Kembali
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold leading-relaxed text-stone-900">
                {quiz.questions[current].text}
              </p>
              <div className="mt-4 space-y-2.5">
                {quiz.questions[current].options.map((opt, idx) => {
                  const selected = answers[quiz.questions[current].id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOption(idx)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition active:scale-[0.98] ${
                        selected
                          ? "border-stone-900 bg-stone-900 text-amber-50 shadow"
                          : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                      }`}
                    >
                      <span
                        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                          selected ? "bg-amber-50 text-stone-900" : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-medium">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Buttons */}
      {!submitted && (
        <section className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
          >
            <ChevronLeft size={16} />
            Sebelumnya
          </button>

          {current === total - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount < total}
              className={`ml-auto inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-bold shadow transition active:scale-95 ${
                answeredCount >= total
                  ? "bg-stone-900 text-amber-50 hover:bg-stone-800"
                  : "bg-stone-300 text-stone-600 cursor-not-allowed"
              }`}
            >
              Kirim Jawaban
              <CheckCircle2 size={16} />
            </button>
          ) : (
            <button
              onClick={goNext}
              className="ml-auto inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-bold text-amber-50 shadow transition hover:bg-stone-800 active:scale-95"
            >
              Selanjutnya
              <ChevronRight size={16} />
            </button>
          )}
        </section>
      )}
    </div>
  );
}
