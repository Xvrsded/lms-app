"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Notice } from "@/components/ui/notice";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForceLogoutSubmitting, setIsForceLogoutSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = (await response.json()) as {
        message?: string;
        user?: { role?: "admin" | "teacher" | "student" };
      };

      if (!response.ok || !result.user?.role) {
        setError(result.message ?? "Login gagal.");
        return;
      }

      const roleDashboard = {
        admin: "/dashboard/admin",
        teacher: "/dashboard/teacher",
        student: "/dashboard/student",
      };

      window.location.href = roleDashboard[result.user.role];
    } catch {
      setError("Terjadi error saat login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForceLogout = async () => {
    try {
      setIsForceLogoutSubmitting(true);
      setError(null);
      setSuccess(null);

      const response = await fetch("/api/auth/logout", { method: "POST" });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(result.message ?? "Gagal logout session lama.");
        return;
      }

      setPassword("");
      setSuccess("Session lama sudah dihapus. Silakan login dengan akun lain.");
    } catch {
      setError("Gagal logout session lama.");
    } finally {
      setIsForceLogoutSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
            placeholder="******"
            className="w-full rounded-xl border border-stone-300 bg-amber-50/70 py-2.5 pr-3 pl-9 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
            required
          />
        </div>
      </div>

      {success && <Notice message={success} variant="success" />}
      {error && <Notice message={error} variant="error" />}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 transition duration-300 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-500"
      >
        {isSubmitting ? "Memproses..." : "Login"}
      </button>

      <div className="space-y-2 text-center">
        <button
          type="button"
          onClick={handleForceLogout}
          disabled={isForceLogoutSubmitting || isSubmitting}
          className="text-sm font-medium text-stone-700 transition hover:text-stone-900 hover:underline disabled:cursor-not-allowed disabled:text-stone-400"
        >
          {isForceLogoutSubmitting ? "Memproses logout..." : "Login dengan akun lain"}
        </button>
        <Link href="#" className="text-sm text-stone-700 transition hover:text-stone-900 hover:underline">
          Lupa password?
        </Link>
        <p className="text-sm text-stone-700">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-stone-900 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </form>
  );
}
