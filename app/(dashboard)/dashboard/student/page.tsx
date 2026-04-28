"use client";

import {
  BookOpen,
  CalendarCheck,
  Camera,
  ChevronRight,
  Flame,
  MapPin,
  PlayCircle,
  Trophy,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const courseAktif = [
  {
    id: 1,
    judul: "Dasar UI/UX Design",
    progress: 72,
    totalMateri: 12,
    selesaiMateri: 9,
    status: "Aktif",
    lastLesson: "Wireframe & Prototype",
  },
  {
    id: 2,
    judul: "Web Development",
    progress: 45,
    totalMateri: 20,
    selesaiMateri: 9,
    status: "Aktif",
    lastLesson: "CSS Flexbox",
  },
  {
    id: 3,
    judul: "Data Analytics",
    progress: 20,
    totalMateri: 15,
    selesaiMateri: 3,
    status: "Aktif",
    lastLesson: "Pengenalan Excel",
  },
];

const progressTotal = 46;
const streakHari = 5;

export default function StudentDashboardPage() {
  const [absenDone, setAbsenDone] = useState(false);
  const [absenLoading, setAbsenLoading] = useState(false);

  // Minimal attendance camera/loc refs (visual only for this page, real logic kept in attendance-form)
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camOn, setCamOn] = useState(false);
  const [loc, setLoc] = useState<GeolocationCoordinates | null>(null);
  const [locErr, setLocErr] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCamOn(true);
    } catch {
      setLocErr("Kamera tidak dapat diakses");
    }
  };

  const getLoc = () => {
    setLocErr(null);
    navigator.geolocation.getCurrentPosition(
      (p) => setLoc(p.coords),
      () => setLocErr("Gagal mengambil lokasi"),
    );
  };

  useEffect(() => {
    getLoc();
  }, []);

  const handleAbsen = async () => {
    if (!camOn) {
      await startCamera();
      return;
    }
    setAbsenLoading(true);
    // simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setAbsenLoading(false);
    setAbsenDone(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Halo, Andi 👋</h1>
            <p className="mt-1 text-sm text-stone-500">Siap belajar hari ini?</p>
          </div>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8] text-sm font-bold text-stone-900">
            A
          </span>
        </div>

        {/* Progress & Streak */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <article className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600"><Trophy size={14} /></span>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Progress Belajar</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-stone-900">{progressTotal}%</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-100">
              <div className="h-full rounded-full bg-[#d7ccc8]" style={{ width: `${progressTotal}%` }} />
            </div>
          </article>
          <article className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-600"><Flame size={14} /></span>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Streak</p>
            </div>
            <p className="mt-2 text-2xl font-bold text-stone-900">{streakHari} hari</p>
            <p className="mt-0.5 text-[11px] text-stone-400">Berturut-turut belajar 🔥</p>
          </article>
        </div>
      </header>

      {/* Lanjutkan Belajar */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Lanjutkan Belajar</h2>
        <article className="relative overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_12px_28px_rgba(41,28,23,0.09)] transition hover:-translate-y-0.5">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d7ccc8] text-stone-900"><PlayCircle size={22} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900">Dasar UI/UX Design</p>
              <p className="mt-0.5 text-xs text-stone-500">Materi terakhir: Wireframe &amp; Prototype</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-[#d7ccc8]" style={{ width: "72%" }} />
                </div>
                <span className="text-[11px] font-semibold text-stone-600">72%</span>
              </div>
            </div>
          </div>
          <button type="button" className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 shadow-md transition hover:bg-stone-800 active:scale-95">
            Lanjutkan <ChevronRight size={14} />
          </button>
        </article>
      </section>

      {/* Course Saya */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Course Saya</h2>
        <div className="space-y-3">
          {courseAktif.map((c) => (
            <article key={c.id} className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8] text-stone-900"><BookOpen size={16} /></span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stone-900">{c.judul}</p>
                    <p className="mt-0.5 text-xs text-stone-500">{c.selesaiMateri}/{c.totalMateri} materi selesai</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">{c.status}</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>Progress</span>
                  <span className="font-medium">{c.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-[#d7ccc8]" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Absensi Cepat */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Absensi Hari Ini</h2>
        <article className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${absenDone ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                <CalendarCheck size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  {absenDone ? "Sudah Absen" : "Belum Absen"}
                </p>
                <p className="text-xs text-stone-500">
                  {absenDone ? "Absensi tercatat hari ini" : "Jangan lupa absen sebelum belajar"}
                </p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${absenDone ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
              {absenDone ? "Selesai" : "Pending"}
            </span>
          </div>

          {!absenDone && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <MapPin size={12} />
                {loc ? (
                  <span>Lokasi aktif: {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}</span>
                ) : locErr ? (
                  <span className="text-rose-500">{locErr}</span>
                ) : (
                  <span>Mengambil lokasi...</span>
                )}
              </div>
              {camOn && (
                <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                  <video ref={videoRef} className="h-40 w-full object-cover" muted playsInline autoPlay />
                </div>
              )}
              <button
                type="button"
                onClick={handleAbsen}
                disabled={absenLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 shadow-md transition hover:bg-stone-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-stone-500"
              >
                <Camera size={16} />
                {absenLoading ? "Menyimpan..." : camOn ? "Absen Sekarang" : "Aktifkan Kamera & Absen"}
              </button>
            </div>
          )}
        </article>
      </section>

      {/* Insight Personal */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Insight Personal 🔥</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600"><Flame size={15} /></span>
            <p className="text-sm text-stone-700">Kamu sudah belajar <span className="font-semibold">{streakHari} hari berturut-turut</span>. Pertahankan streak-mu!</p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Trophy size={15} /></span>
            <p className="text-sm text-stone-700">Selesaikan <span className="font-semibold">Dasar UI/UX Design</span> untuk mendapatkan sertifikat.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
