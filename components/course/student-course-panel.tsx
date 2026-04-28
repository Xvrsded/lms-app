"use client";

import { useEffect, useState } from "react";
import { Notice } from "@/components/ui/notice";

type Course = {
  id: string;
  title: string;
  description: string;
  price: number | string;
  teacher?: {
    name?: string;
  };
};

export function StudentCoursePanel() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set());
  const [loadingEnrollId, setLoadingEnrollId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/courses");
      const result = (await response.json()) as { courses?: Course[]; message?: string };

      if (!response.ok) {
        setError(result.message ?? "Gagal mengambil course.");
        return;
      }

      setCourses(result.courses ?? []);
    } catch {
      setError("Terjadi error saat mengambil course.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchCourses();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const handleEnroll = async (courseId: string) => {
    try {
      setLoadingEnrollId(courseId);
      setError(null);
      setSuccess(null);

      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(result.message ?? "Gagal enroll course.");
        return;
      }

      setEnrolledIds((prev) => new Set(prev).add(courseId));
      setSuccess(result.message ?? "Enroll berhasil.");
    } catch {
      setError("Terjadi error saat enroll.");
    } finally {
      setLoadingEnrollId(null);
    }
  };

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-zinc-900">Course Tersedia</h2>
        <button
          type="button"
          onClick={() => {
            void fetchCourses();
          }}
          className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          Refresh
        </button>
      </div>

      {success && <Notice message={success} variant="success" />}
      {error && <div className="mt-2"><Notice message={error} variant="error" /></div>}

      {isLoading && <p className="mt-3 text-sm text-zinc-600">Loading course...</p>}

      {!isLoading && courses.length === 0 && <p className="mt-3 text-sm text-zinc-600">Belum ada course.</p>}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {courses.map((course) => {
          const enrolled = enrolledIds.has(course.id);
          const loading = loadingEnrollId === course.id;

          return (
            <article key={course.id} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <h3 className="font-semibold text-zinc-900">{course.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{course.description}</p>
              <p className="mt-1 text-xs text-zinc-500">Teacher: {course.teacher?.name ?? "-"}</p>
              <p className="mt-2 text-sm font-medium text-zinc-800">Rp {Number(course.price).toLocaleString()}</p>

              <button
                type="button"
                disabled={enrolled || loading}
                onClick={() => {
                  void handleEnroll(course.id);
                }}
                className="mt-3 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-zinc-400"
              >
                {enrolled ? "Sudah Enroll" : loading ? "Memproses..." : "Enroll"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
