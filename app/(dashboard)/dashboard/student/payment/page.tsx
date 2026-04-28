"use client";

import { useCart } from "@/hooks/useCart";
import { ArrowLeft, CheckCircle2, Clock, Copy, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function formatCountdown(totalSeconds: number) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function QrPlaceholder() {
  return (
    <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 bg-white p-4">
      <div className="grid grid-cols-5 grid-rows-5 gap-1 h-full w-full">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-sm ${Math.random() > 0.5 ? "bg-stone-800" : "bg-white border border-stone-200"}`}
            style={{ opacity: 0.85 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [method, setMethod] = useState<"transfer" | "qris">("transfer");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const m = new URLSearchParams(window.location.search).get("method") as "transfer" | "qris";
      if (m) setMethod(m);
    }
  }, []);

  const [secondsLeft, setSecondsLeft] = useState(14 * 60 + 59);
  const [status, setStatus] = useState<"idle" | "loading" | "verifying" | "success">("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => router.push("/dashboard/student/my-courses"), 2000);
      return () => clearTimeout(t);
    }
  }, [status, router]);

  const countdown = useMemo(() => formatCountdown(secondsLeft), [secondsLeft]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const handleConfirm = () => {
    if (status !== "idle") return;
    setStatus("loading");
    setTimeout(() => setStatus("verifying"), 1400);
    setTimeout(() => {
      setStatus("success");
      clearCart();
    }, 3200);
  };

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 animate-in fade-in duration-500">
        <div className="mx-auto max-w-sm text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={40} strokeWidth={2} />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-stone-900">Pembayaran Berhasil</h1>
          <p className="mt-2 text-sm text-stone-500">Course telah ditambahkan ke daftar kursus kamu.</p>
          <p className="mt-1 text-xs text-stone-400">Mengalihkan ke halaman kursus…</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <ShieldCheck size={48} className="text-stone-300" />
        <h1 className="mt-4 text-lg font-bold text-stone-900">Tidak Ada Pembayaran</h1>
        <p className="mt-1 text-sm text-stone-500">Keranjang kamu kosong. Tambahkan course terlebih dahulu.</p>
        <Link href="/dashboard/student/explore" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg transition hover:bg-stone-800 active:scale-95">
          <ArrowLeft size={16} /> Cari Course
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-8 pb-28 animate-in fade-in duration-500 md:items-center md:pt-0">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:bg-stone-50 active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-stone-900">Selesaikan Pembayaran</h1>
            <p className="text-xs text-stone-500">Lakukan pembayaran untuk melanjutkan</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          {/* Timer */}
          <div className="mb-6 flex items-center justify-center gap-2 text-xs font-medium text-red-500">
            <Clock size={14} />
            <span>Selesaikan dalam {countdown}</span>
          </div>

          {/* Total */}
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Total Pembayaran</p>
            <p className="mt-1 text-4xl font-extrabold text-stone-900">
              Rp {cartTotal.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="mb-6 h-px bg-stone-100" />

          {/* Method */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-400">Metode Pembayaran</p>
            {method === "transfer" ? (
              <div className="space-y-3">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-xs text-stone-500">Transfer ke Bank</p>
                  <p className="mt-1 text-lg font-bold text-stone-900">BCA</p>
                </div>

                <div className="space-y-3 rounded-2xl border border-stone-200 bg-white p-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Nomor Rekening</p>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-lg font-bold tracking-wider text-stone-900">1234 5678 9012</p>
                      <button
                        onClick={() => handleCopy("123456789012")}
                        className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-200 active:scale-95"
                      >
                        {copied ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        {copied ? "Tersalin" : "Salin"}
                      </button>
                    </div>
                  </div>
                  <div className="h-px bg-stone-100" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Atas Nama</p>
                    <p className="mt-1 text-sm font-semibold text-stone-800">PT LMS EDUKASI INDONESIA</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
                  <p className="text-xs text-stone-500">Bayar dengan</p>
                  <p className="mt-1 text-lg font-bold text-stone-900">QRIS</p>
                </div>
                <QrPlaceholder />
                <p className="text-center text-xs text-stone-500">Scan menggunakan aplikasi e-wallet atau mobile banking</p>
              </div>
            )}
          </div>

          <div className="mb-6 h-px bg-stone-100" />

          {/* Course summary mini */}
          <div className="mb-6 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-stone-400">Detail Pembelian</p>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="truncate pr-4 text-stone-700">{item.title}</span>
                <span className="shrink-0 font-semibold text-stone-900">
                  Rp {item.price.toLocaleString("id-ID")}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-sm font-bold text-stone-900">
              <span>Total</span>
              <span>Rp {cartTotal.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* CTA */}
          {status === "verifying" ? (
            <div className="rounded-xl bg-amber-50 p-4 text-center">
              <div className="mx-auto mb-2 h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-stone-800" />
              <p className="text-sm font-semibold text-stone-800">Pembayaran sedang diverifikasi</p>
              <p className="mt-0.5 text-xs text-stone-500">Mohon tunggu sebentar…</p>
            </div>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 text-sm font-bold text-amber-50 shadow-lg transition hover:bg-stone-800 active:scale-95 disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-400 border-t-amber-50" />
                  Memproses…
                </>
              ) : (
                "Saya Sudah Bayar"
              )}
            </button>
          )}
        </div>

        {/* Helper text */}
        <p className="mt-4 text-center text-[11px] text-stone-400">
          Jangan tutup halaman ini sebelum pembayaran selesai.
        </p>
      </div>
    </div>
  );
}
