"use client";

import { AlertTriangle, BookOpen, CheckCircle2, Clock3, Eye, FileText, Layers3, Pencil, Plus, Search, Sparkles, Star, Users, X } from "lucide-react";
import { useMemo, useState } from "react";

type StatusCourse = "aktif" | "pending" | "draft";

type Course = {
  id: string;
  judul: string;
  pengajar: string;
  status: StatusCourse;
  jumlahMurid: number;
  progresMateri: number;
  rating: number;
  deskripsi: string;
  materi: string[];
  dibuatPada: string;
};

const dataCourse: Course[] = [
  {
    id: "CRS-001",
    judul: "UI/UX Dasar",
    pengajar: "Tari Kurnia",
    status: "aktif",
    jumlahMurid: 120,
    progresMateri: 88,
    rating: 4.8,
    deskripsi: "Membahas dasar UI/UX dari riset pengguna hingga prototyping.",
    materi: ["Pengenalan UX", "User Flow", "Wireframe", "Prototyping"],
    dibuatPada: "2026-04-27",
  },
  {
    id: "CRS-002",
    judul: "Data Analitik Dasar",
    pengajar: "Budi Santoso",
    status: "pending",
    jumlahMurid: 84,
    progresMateri: 62,
    rating: 4.4,
    deskripsi: "Fundamental analitik data untuk pemula menggunakan studi kasus nyata.",
    materi: ["Pengenalan Data", "Statistik Dasar", "Visualisasi", "Latihan Studi Kasus"],
    dibuatPada: "2026-04-28",
  },
  {
    id: "CRS-003",
    judul: "React untuk Pemula",
    pengajar: "Arif Pratama",
    status: "draft",
    jumlahMurid: 0,
    progresMateri: 35,
    rating: 0,
    deskripsi: "Course draft untuk pengembangan aplikasi web modern dengan React.",
    materi: ["Komponen Dasar", "State dan Props"],
    dibuatPada: "2026-04-26",
  },
  {
    id: "CRS-004",
    judul: "Public Speaking Pro",
    pengajar: "Nanda Wijaya",
    status: "aktif",
    jumlahMurid: 67,
    progresMateri: 74,
    rating: 4.7,
    deskripsi: "Strategi komunikasi publik untuk presentasi profesional.",
    materi: ["Struktur Presentasi", "Penguasaan Panggung", "Latihan Praktik"],
    dibuatPada: "2026-04-25",
  },
  {
    id: "CRS-005",
    judul: "SQL Fundamental",
    pengajar: "Budi Santoso",
    status: "pending",
    jumlahMurid: 39,
    progresMateri: 55,
    rating: 4.2,
    deskripsi: "Belajar query SQL dari dasar hingga optimasi sederhana.",
    materi: ["Select Query", "Join", "Aggregation"],
    dibuatPada: "2026-04-24",
  },
  {
    id: "CRS-006",
    judul: "Desain Sistem Pembelajaran",
    pengajar: "Dina Maharani",
    status: "draft",
    jumlahMurid: 0,
    progresMateri: 28,
    rating: 0,
    deskripsi: "Perancangan arsitektur konten untuk pembelajaran digital.",
    materi: ["Analisis Kebutuhan", "Pemetaan Kurikulum"],
    dibuatPada: "2026-04-23",
  },
];

const JUMLAH_AWAL = 4;

export default function AdminCoursesPage() {
  const [kataKunci, setKataKunci] = useState("");
  const [filterStatus, setFilterStatus] = useState<"semua" | StatusCourse>("semua");
  const [urutan, setUrutan] = useState<"terbaru" | "terpopuler">("terbaru");
  const [jumlahTampil, setJumlahTampil] = useState(JUMLAH_AWAL);
  const [courseTerpilih, setCourseTerpilih] = useState<Course | null>(null);

  const hasilFilter = useMemo(() => {
    const query = kataKunci.trim().toLowerCase();

    const filtered = dataCourse.filter((item) => {
      const cocokStatus = filterStatus === "semua" ? true : item.status === filterStatus;
      const cocokPencarian = query
        ? item.judul.toLowerCase().includes(query) || item.pengajar.toLowerCase().includes(query)
        : true;

      return cocokStatus && cocokPencarian;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (urutan === "terbaru") {
        return new Date(b.dibuatPada).getTime() - new Date(a.dibuatPada).getTime();
      }

      return b.jumlahMurid - a.jumlahMurid;
    });

    return sorted;
  }, [filterStatus, kataKunci, urutan]);

  const daftarTampil = hasilFilter.slice(0, jumlahTampil);
  const masihAdaData = jumlahTampil < hasilFilter.length;

  const totalCourse = dataCourse.length;
  const totalAktif = dataCourse.filter((item) => item.status === "aktif").length;
  const totalPending = dataCourse.filter((item) => item.status === "pending").length;
  const totalDraft = dataCourse.filter((item) => item.status === "draft").length;

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-28 text-stone-900 md:px-6 md:pb-32">
      <header className="mb-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Course</h1>
          <p className="mt-1 text-sm text-stone-500">Kelola dan pantau semua course dalam sistem</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label className="relative block">
            <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={kataKunci}
              onChange={(event) => {
                setKataKunci(event.target.value);
                setJumlahTampil(JUMLAH_AWAL);
              }}
              placeholder="Cari judul course atau nama pengajar"
              className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pr-3 pl-9 text-sm outline-none transition focus:border-stone-400"
            />
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <select
              value={filterStatus}
              onChange={(event) => {
                setFilterStatus(event.target.value as "semua" | StatusCourse);
                setJumlahTampil(JUMLAH_AWAL);
              }}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-stone-400"
            >
              <option value="semua">Semua</option>
              <option value="aktif">Aktif</option>
              <option value="pending">Menunggu Persetujuan</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={urutan}
              onChange={(event) => {
                setUrutan(event.target.value as "terbaru" | "terpopuler");
                setJumlahTampil(JUMLAH_AWAL);
              }}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-stone-400"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terpopuler">Terpopuler</option>
            </select>
          </div>
        </div>
      </header>

      <section className="-mx-1 mb-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
        <article className="min-w-36 snap-start rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ede0db] text-stone-800">
            <Layers3 size={16} />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">{totalCourse}</p>
          <p className="text-xs font-medium text-stone-500">Total Course</p>
        </article>
        <article className="min-w-36 snap-start rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={16} />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">{totalAktif}</p>
          <p className="text-xs font-medium text-stone-500">Course Aktif</p>
        </article>
        <article className="min-w-44 snap-start rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Clock3 size={16} />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">{totalPending}</p>
          <p className="text-xs font-medium text-stone-500">Menunggu Persetujuan</p>
        </article>
        <article className="min-w-36 snap-start rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 text-stone-700">
            <FileText size={16} />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">{totalDraft}</p>
          <p className="text-xs font-medium text-stone-500">Course Draft</p>
        </article>
      </section>

      <section className="mb-6 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Insight Course</h2>
        <article className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <Sparkles size={15} />
          </span>
          <p className="text-sm text-stone-700">12 course menunggu persetujuan</p>
        </article>
        <article className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700">
            <AlertTriangle size={15} />
          </span>
          <p className="text-sm text-stone-700">5 course belum memiliki materi lengkap</p>
        </article>
        <article className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-700">
            <AlertTriangle size={15} />
          </span>
          <p className="text-sm text-stone-700">3 course memiliki engagement rendah</p>
        </article>
      </section>

      {daftarTampil.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-stone-300 bg-white/80 p-8 text-center shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ede0db] text-stone-700">
            <BookOpen size={22} />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-stone-900">Belum ada course tersedia</h2>
          <p className="mt-1 text-sm text-stone-500">Coba ubah filter pencarian atau tambahkan course baru.</p>
          <button
            type="button"
            className="mt-5 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:-translate-y-0.5 hover:bg-stone-800 active:scale-95"
          >
            Tambah Course
          </button>
        </section>
      ) : (
        <section className="space-y-3">
          {daftarTampil.map((course) => (
            <article
              key={course.id}
              className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_16px_30px_rgba(41,28,23,0.1)]"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#ede0db] text-stone-800">
                  <BookOpen size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stone-900">{course.judul}</p>
                  <p className="truncate text-xs text-stone-500">Pengajar: {course.pengajar}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        course.status === "aktif"
                          ? "bg-emerald-100 text-emerald-700"
                          : course.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {course.status === "aktif" ? "Aktif" : course.status === "pending" ? "Pending" : "Draft"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-600">
                      <Users size={12} /> {course.jumlahMurid} Murid
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-stone-500">
                  <span>Progres Materi</span>
                  <span>{course.progresMateri}%</span>
                </div>
                <div className="h-2 rounded-full bg-stone-100">
                  <div className="h-full rounded-full bg-[#c8b5ad] transition-all duration-300" style={{ width: `${course.progresMateri}%` }} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCourseTerpilih(course)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition-all duration-200 hover:translate-y-[-2px] hover:bg-stone-50 active:scale-95"
                >
                  <Eye size={14} /> Lihat Detail
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition-all duration-200 hover:translate-y-[-2px] hover:bg-stone-50 active:scale-95"
                >
                  <Pencil size={14} /> Edit
                </button>
                {course.status === "pending" && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-all duration-200 hover:translate-y-[-2px] hover:bg-emerald-100 active:scale-95"
                  >
                    <CheckCircle2 size={14} /> Approve
                  </button>
                )}
              </div>
            </article>
          ))}

          {masihAdaData && (
            <button
              type="button"
              onClick={() => setJumlahTampil((prev) => prev + JUMLAH_AWAL)}
              className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition-all duration-200 hover:translate-y-[-2px] hover:bg-stone-50 active:scale-95"
            >
              Muat Lebih Banyak
            </button>
          )}
        </section>
      )}

      <button
        type="button"
        className="fixed right-5 bottom-24 z-30 inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-3 text-sm font-semibold text-amber-50 shadow-[0_12px_25px_rgba(41,28,23,0.35)] transition-all duration-300 hover:translate-y-[-2px] hover:bg-stone-800 active:scale-95"
      >
        <Plus size={18} /> Tambah Course
      </button>

      {courseTerpilih && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/35 p-4 sm:items-center sm:justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Detail Course</h3>
                <p className="text-xs text-stone-500">ID: {courseTerpilih.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setCourseTerpilih(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Deskripsi</p>
                <p className="text-stone-700">{courseTerpilih.deskripsi}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Daftar Materi</p>
                <ul className="mt-1 space-y-1 text-stone-700">
                  {courseTerpilih.materi.map((materi) => (
                    <li key={materi} className="rounded-lg bg-stone-50 px-2.5 py-1.5">
                      {materi}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-stone-50 p-2.5">
                  <p className="text-[11px] text-stone-500">Jumlah Murid</p>
                  <p className="text-sm font-semibold text-stone-900">{courseTerpilih.jumlahMurid}</p>
                </div>
                <div className="rounded-lg bg-stone-50 p-2.5">
                  <p className="text-[11px] text-stone-500">Rating</p>
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-stone-900">
                    <Star size={13} className="text-amber-500" /> {courseTerpilih.rating > 0 ? courseTerpilih.rating : "Belum ada"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Status Approval</p>
                <p className="text-stone-700">
                  {courseTerpilih.status === "aktif"
                    ? "Course aktif dan sudah dipublikasikan"
                    : courseTerpilih.status === "pending"
                      ? "Menunggu persetujuan admin"
                      : "Masih dalam status draft"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
