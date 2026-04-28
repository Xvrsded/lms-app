"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Notice } from "@/components/ui/notice";

type Role = "admin" | "teacher" | "student";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      if (password !== confirmPassword) {
        setError("Konfirmasi password tidak sama.");
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const result = (await response.json()) as {
        message?: string;
        user?: { role?: Role };
      };

      if (!response.ok || !result.user?.role) {
        setError(result.message ?? "Register gagal.");
        return;
      }

      setSuccess("Register berhasil. Mengalihkan ke dashboard...");
      const roleDashboard = {
        admin: "/dashboard/admin",
        teacher: "/dashboard/teacher",
        student: "/dashboard/student",
      };

      window.setTimeout(() => {
        window.location.href = roleDashboard[result.user!.role!];
      }, 500);
    } catch {
      setError("Terjadi error saat register.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium text-stone-800">
          Nama
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nama lengkap"
          className="w-full rounded-xl border border-stone-300 bg-amber-50/70 px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-stone-800">
          Email
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-500">✉</span>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-stone-300 bg-amber-50/70 py-2.5 pr-3 pl-9 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-stone-800">
          Password
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-500">🔒</span>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimal 6 karakter"
            className="w-full rounded-xl border border-stone-300 bg-amber-50/70 py-2.5 pr-3 pl-9 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
            required
            minLength={6}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-stone-800">
          Konfirmasi Password
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-500">🔒</span>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Ulangi password"
            className="w-full rounded-xl border border-stone-300 bg-amber-50/70 py-2.5 pr-3 pl-9 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="role" className="text-sm font-medium text-stone-800">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(event) => setRole(event.target.value as Role)}
          className="w-full rounded-xl border border-stone-300 bg-amber-50/70 px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      {success && <Notice message={success} variant="success" />}
      {error && <Notice message={error} variant="error" />}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 transition duration-300 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-500"
      >
        {isSubmitting ? "Memproses..." : "Daftar"}
      </button>

      <p className="text-center text-sm text-stone-700">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-semibold text-stone-900 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
