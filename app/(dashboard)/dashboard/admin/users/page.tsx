"use client";

import { Search, UserPlus, Users, GraduationCap, UserRoundCheck, Eye, Pencil, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

type JenisPengguna = "murid" | "pengajar";
type StatusPengguna = "aktif" | "nonaktif";

type Pengguna = {
  id: string;
  nama: string;
  email: string;
  jenis: JenisPengguna;
  status: StatusPengguna;
  course: string[];
  aktivitasTerakhir: string;
};

const dataPengguna: Pengguna[] = [
  {
    id: "USR-001",
    nama: "Rahma Putri",
    email: "rahma@lms.id",
    jenis: "murid",
    status: "aktif",
    course: ["UI/UX Dasar", "Pengantar Figma"],
    aktivitasTerakhir: "Menyelesaikan kuis UI/UX • 12 menit lalu",
  },
  {
    id: "USR-002",
    nama: "Budi Santoso",
    email: "budi@lms.id",
    jenis: "pengajar",
    status: "aktif",
    course: ["Data Analitik Dasar", "SQL Fundamental"],
    aktivitasTerakhir: "Membuat materi baru • 34 menit lalu",
  },
  {
    id: "USR-003",
    nama: "Nanda Wijaya",
    email: "nanda@lms.id",
    jenis: "murid",
    status: "nonaktif",
    course: ["Dasar React"],
    aktivitasTerakhir: "Belum login dalam 4 hari",
  },
  {
    id: "USR-004",
    nama: "Tari Kurnia",
    email: "tari@lms.id",
    jenis: "pengajar",
    status: "aktif",
    course: ["Public Speaking", "Presentasi Efektif"],
    aktivitasTerakhir: "Mengoreksi tugas murid • 1 jam lalu",
  },
  {
    id: "USR-005",
    nama: "Adi Saputra",
    email: "adi@lms.id",
    jenis: "murid",
    status: "aktif",
    course: ["Dasar JavaScript", "Pemrograman Web"],
    aktivitasTerakhir: "Absensi harian berhasil • 2 jam lalu",
  },
  {
    id: "USR-006",
    nama: "Sinta Mahardika",
    email: "sinta@lms.id",
    jenis: "murid",
    status: "aktif",
    course: ["UI Writing"],
    aktivitasTerakhir: "Menyelesaikan modul 3 • 4 jam lalu",
  },
];

const JUMLAH_AWAL = 4;

export default function AdminUsersPage() {
  const [kataKunci, setKataKunci] = useState("");
  const [filterJenis, setFilterJenis] = useState<"semua" | JenisPengguna>("semua");
  const [jumlahTampil, setJumlahTampil] = useState(JUMLAH_AWAL);
  const [penggunaTerpilih, setPenggunaTerpilih] = useState<Pengguna | null>(null);

  const hasilFilter = useMemo(() => {
    const query = kataKunci.trim().toLowerCase();

    return dataPengguna.filter((item) => {
      const cocokJenis = filterJenis === "semua" ? true : item.jenis === filterJenis;
      const cocokPencarian = query
        ? item.nama.toLowerCase().includes(query) || item.email.toLowerCase().includes(query)
        : true;

      return cocokJenis && cocokPencarian;
    });
  }, [filterJenis, kataKunci]);

  const daftarTampil = hasilFilter.slice(0, jumlahTampil);
  const masihAdaData = jumlahTampil < hasilFilter.length;

  const totalPengguna = dataPengguna.length;
  const totalMurid = dataPengguna.filter((item) => item.jenis === "murid").length;
  const totalPengajar = dataPengguna.filter((item) => item.jenis === "pengajar").length;

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-28 text-stone-900 md:px-6 md:pb-32">
      <header className="mb-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Pengguna</h1>
          <p className="mt-1 text-sm text-stone-500">Kelola data murid dan pengajar dengan mudah</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={kataKunci}
              onChange={(event) => {
                setKataKunci(event.target.value);
                setJumlahTampil(JUMLAH_AWAL);
              }}
              placeholder="Cari nama atau email"
              className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pr-3 pl-9 text-sm outline-none transition focus:border-stone-400"
            />
          </label>

          <select
            value={filterJenis}
            onChange={(event) => {
              setFilterJenis(event.target.value as "semua" | JenisPengguna);
              setJumlahTampil(JUMLAH_AWAL);
            }}
            className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-stone-400"
          >
            <option value="semua">Semua</option>
            <option value="murid">Murid</option>
            <option value="pengajar">Pengajar</option>
          </select>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <article className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ede0db] text-stone-800">
            <Users size={16} />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">{totalPengguna}</p>
          <p className="text-xs font-medium text-stone-500">Total Pengguna</p>
        </article>
        <article className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <GraduationCap size={16} />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">{totalMurid}</p>
          <p className="text-xs font-medium text-stone-500">Total Murid</p>
        </article>
        <article className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-700">
            <UserRoundCheck size={16} />
          </div>
          <p className="mt-2 text-2xl font-bold text-stone-900">{totalPengajar}</p>
          <p className="text-xs font-medium text-stone-500">Total Pengajar</p>
        </article>
      </section>

      {daftarTampil.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-stone-300 bg-white/80 p-8 text-center shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ede0db] text-stone-700">
            <Users size={22} />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-stone-900">Belum ada pengguna</h2>
          <p className="mt-1 text-sm text-stone-500">Coba ubah filter atau tambahkan data pengguna baru.</p>
          <button
            type="button"
            className="mt-5 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:-translate-y-0.5 hover:bg-stone-800"
          >
            Tambah Pengguna
          </button>
        </section>
      ) : (
        <section className="space-y-3">
          {daftarTampil.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d7ccc8] text-sm font-semibold text-stone-900">
                  {item.nama
                    .split(" ")
                    .map((kata) => kata[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stone-900">{item.nama}</p>
                  <p className="truncate text-xs text-stone-500">{item.email}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        item.jenis === "murid" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.jenis === "murid" ? "Murid" : "Pengajar"}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        item.status === "aktif" ? "bg-emerald-100 text-emerald-700" : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {item.status === "aktif" ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPenggunaTerpilih(item)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50 active:scale-95"
                >
                  <Eye size={14} /> Detail
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50 active:scale-95"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-100 active:scale-95"
                >
                  <Trash2 size={14} /> Hapus
                </button>
              </div>
            </article>
          ))}

          {masihAdaData && (
            <button
              type="button"
              onClick={() => setJumlahTampil((prev) => prev + JUMLAH_AWAL)}
              className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50"
            >
              Muat Lebih Banyak
            </button>
          )}
        </section>
      )}

      <button
        type="button"
        className="fixed right-5 bottom-24 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-amber-50 shadow-[0_12px_25px_rgba(41,28,23,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 active:scale-95"
      >
        <UserPlus size={20} />
      </button>

      {penggunaTerpilih && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/35 p-4 sm:items-center sm:justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900">Detail Pengguna</h3>
                <p className="text-xs text-stone-500">ID: {penggunaTerpilih.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setPenggunaTerpilih(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Nama</p>
                <p className="text-stone-900">{penggunaTerpilih.nama}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Email</p>
                <p className="text-stone-900">{penggunaTerpilih.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Course Diikuti</p>
                <ul className="mt-1 space-y-1 text-stone-700">
                  {penggunaTerpilih.course.map((course) => (
                    <li key={course} className="rounded-lg bg-stone-50 px-2.5 py-1.5">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Aktivitas Terakhir</p>
                <p className="text-stone-700">{penggunaTerpilih.aktivitasTerakhir}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
