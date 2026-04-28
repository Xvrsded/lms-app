"use client";

import { FormEvent, useEffect, useState } from "react";
import { Notice } from "@/components/ui/notice";

type Course = {
  id: string;
  title: string;
  description: string;
  price: number | string;
};

export function TeacherCoursePanel() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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

  const handleCreateCourse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
        }),
      });

      const result = (await response.json()) as {
        message?: string;
        course?: Course;
      };

      if (!response.ok || !result.course) {
        setError(result.message ?? "Gagal membuat course.");
        return;
      }

      setCourses((prev) => [result.course!, ...prev]);
      setSuccess(result.message ?? "Course berhasil dibuat.");
      setTitle("");
      setDescription("");
      setPrice("");
    } catch {
      setError("Terjadi error saat membuat course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-5">
      <form onSubmit={handleCreateCourse} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm md:p-6">
        <h2 className="text-lg font-semibold text-zinc-900">Create Course</h2>
        <p className="mt-1 text-sm text-zinc-600">Isi data course yang akan diajarkan.</p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Judul course"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-300 focus:ring md:col-span-2"
            required
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Deskripsi course"
            className="min-h-24 rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-300 focus:ring md:col-span-2"
            required
          />
          <input
            type="number"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Harga"
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-300 focus:ring"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Course"}
        </button>
      </form>

      {success && <Notice message={success} variant="success" />}
      {error && <Notice message={error} variant="error" />}

      <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-zinc-900">Daftar Course</h2>
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

        {isLoading && <p className="text-sm text-zinc-600">Loading course...</p>}

        {!isLoading && courses.length === 0 && (
          <p className="text-sm text-zinc-600">Belum ada course yang kamu buat.</p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {courses.map((course) => (
            <article key={course.id} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <h3 className="font-semibold text-zinc-900">{course.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{course.description}</p>
              <p className="mt-2 text-sm font-medium text-zinc-800">Rp {Number(course.price).toLocaleString()}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
