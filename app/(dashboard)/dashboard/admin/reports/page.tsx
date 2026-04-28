"use client";

import { AlertTriangle, ArrowDownRight, ArrowUpRight, Download, FileBarChart2, Info, Layers3, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as XLSX from "xlsx";

type Periode = "hari-ini" | "mingguan" | "bulanan";
type Role = "Murid" | "Pengajar" | "Admin";
type Status = "Aktif" | "Nonaktif";

type BarisLaporan = {
  nama: string;
  role: Role;
  aktivitasTerakhir: string;
  status: Status;
};

const kpiPeriode: Record<
  Periode,
  {
    totalPengguna: { nilai: string; perubahan: string; naik: boolean };
    totalCourse: { nilai: string; perubahan: string; naik: boolean };
    totalPendapatan: { nilai: string; perubahan: string; naik: boolean };
    totalAbsensi: { nilai: string; perubahan: string; naik: boolean };
  }
> = {
  "hari-ini": {
    totalPengguna: { nilai: "1.284", perubahan: "+2,1%", naik: true },
    totalCourse: { nilai: "126", perubahan: "+1,2%", naik: true },
    totalPendapatan: { nilai: "Rp 24,8 Jt", perubahan: "+4,4%", naik: true },
    totalAbsensi: { nilai: "842", perubahan: "-1,3%", naik: false },
  },
  mingguan: {
    totalPengguna: { nilai: "1.310", perubahan: "+12%", naik: true },
    totalCourse: { nilai: "132", perubahan: "+5%", naik: true },
    totalPendapatan: { nilai: "Rp 184 Jt", perubahan: "+8,7%", naik: true },
    totalAbsensi: { nilai: "5.920", perubahan: "-3%", naik: false },
  },
  bulanan: {
    totalPengguna: { nilai: "1.540", perubahan: "+18%", naik: true },
    totalCourse: { nilai: "148", perubahan: "+11%", naik: true },
    totalPendapatan: { nilai: "Rp 612 Jt", perubahan: "+14,2%", naik: true },
    totalAbsensi: { nilai: "24.600", perubahan: "+2,5%", naik: true },
  },
};

const pertumbuhanPenggunaPeriode: Record<Periode, { label: string; pengguna: number }[]> = {
  "hari-ini": [
    { label: "00", pengguna: 1204 },
    { label: "04", pengguna: 1212 },
    { label: "08", pengguna: 1230 },
    { label: "12", pengguna: 1251 },
    { label: "16", pengguna: 1270 },
    { label: "20", pengguna: 1284 },
  ],
  mingguan: [
    { label: "Sen", pengguna: 1208 },
    { label: "Sel", pengguna: 1221 },
    { label: "Rab", pengguna: 1238 },
    { label: "Kam", pengguna: 1264 },
    { label: "Jum", pengguna: 1279 },
    { label: "Sab", pengguna: 1291 },
    { label: "Min", pengguna: 1310 },
  ],
  bulanan: [
    { label: "M1", pengguna: 1260 },
    { label: "M2", pengguna: 1328 },
    { label: "M3", pengguna: 1410 },
    { label: "M4", pengguna: 1540 },
  ],
};

const coursePeriode: Record<Periode, { status: string; jumlah: number }[]> = {
  "hari-ini": [
    { status: "Aktif", jumlah: 98 },
    { status: "Pending", jumlah: 17 },
    { status: "Draft", jumlah: 11 },
  ],
  mingguan: [
    { status: "Aktif", jumlah: 103 },
    { status: "Pending", jumlah: 19 },
    { status: "Draft", jumlah: 10 },
  ],
  bulanan: [
    { status: "Aktif", jumlah: 116 },
    { status: "Pending", jumlah: 21 },
    { status: "Draft", jumlah: 11 },
  ],
};

const absensiPeriode: Record<Periode, { nama: string; jumlah: number; warna: string }[]> = {
  "hari-ini": [
    { nama: "Hadir", jumlah: 842, warna: "#7c5c53" },
    { nama: "Tidak Hadir", jumlah: 128, warna: "#d7ccc8" },
  ],
  mingguan: [
    { nama: "Hadir", jumlah: 5920, warna: "#7c5c53" },
    { nama: "Tidak Hadir", jumlah: 960, warna: "#d7ccc8" },
  ],
  bulanan: [
    { nama: "Hadir", jumlah: 24600, warna: "#7c5c53" },
    { nama: "Tidak Hadir", jumlah: 3800, warna: "#d7ccc8" },
  ],
};

const tabelPeriode: Record<Periode, BarisLaporan[]> = {
  "hari-ini": [
    { nama: "Rahma Putri", role: "Murid", aktivitasTerakhir: "Menyelesaikan kuis UI/UX", status: "Aktif" },
    { nama: "Budi Santoso", role: "Pengajar", aktivitasTerakhir: "Membuat materi baru", status: "Aktif" },
    { nama: "Nanda Wijaya", role: "Murid", aktivitasTerakhir: "Belum login hari ini", status: "Nonaktif" },
    { nama: "Tari Kurnia", role: "Pengajar", aktivitasTerakhir: "Mengoreksi tugas", status: "Aktif" },
    { nama: "Adi Saputra", role: "Murid", aktivitasTerakhir: "Absensi kelas pagi", status: "Aktif" },
    { nama: "Dina Maharani", role: "Admin", aktivitasTerakhir: "Meninjau approval course", status: "Aktif" },
  ],
  mingguan: [
    { nama: "Rahma Putri", role: "Murid", aktivitasTerakhir: "Menyelesaikan 3 modul", status: "Aktif" },
    { nama: "Budi Santoso", role: "Pengajar", aktivitasTerakhir: "Publikasi 2 course", status: "Aktif" },
    { nama: "Sinta Mahardika", role: "Murid", aktivitasTerakhir: "Ujian mingguan", status: "Aktif" },
    { nama: "Tari Kurnia", role: "Pengajar", aktivitasTerakhir: "Update kurikulum", status: "Aktif" },
    { nama: "Arif Pratama", role: "Pengajar", aktivitasTerakhir: "Draft course baru", status: "Nonaktif" },
    { nama: "Dina Maharani", role: "Admin", aktivitasTerakhir: "Audit absensi", status: "Aktif" },
  ],
  bulanan: [
    { nama: "Rahma Putri", role: "Murid", aktivitasTerakhir: "Menyelesaikan course React", status: "Aktif" },
    { nama: "Budi Santoso", role: "Pengajar", aktivitasTerakhir: "Mentoring bulanan", status: "Aktif" },
    { nama: "Nadia Wulandari", role: "Murid", aktivitasTerakhir: "Evaluasi akhir", status: "Aktif" },
    { nama: "Tari Kurnia", role: "Pengajar", aktivitasTerakhir: "Review performa kelas", status: "Aktif" },
    { nama: "Arif Pratama", role: "Pengajar", aktivitasTerakhir: "Belum aktif mengajar", status: "Nonaktif" },
    { nama: "Dina Maharani", role: "Admin", aktivitasTerakhir: "Rekap laporan bulanan", status: "Aktif" },
  ],
};

const jumlahPerHalaman = 4;

export default function AdminReportsPage() {
  const [periode, setPeriode] = useState<Periode>("mingguan");
  const [kataKunci, setKataKunci] = useState("");
  const [filterRole, setFilterRole] = useState<"semua" | Role>("semua");
  const [halaman, setHalaman] = useState(1);

  const kpi = kpiPeriode[periode];
  const dataPertumbuhan = pertumbuhanPenggunaPeriode[periode];
  const dataCourse = coursePeriode[periode];
  const dataAbsensi = absensiPeriode[periode];

  const dataTabelFilter = useMemo(() => {
    const query = kataKunci.trim().toLowerCase();

    return tabelPeriode[periode].filter((item) => {
      const cocokKataKunci = query
        ? item.nama.toLowerCase().includes(query) || item.aktivitasTerakhir.toLowerCase().includes(query)
        : true;
      const cocokRole = filterRole === "semua" ? true : item.role === filterRole;

      return cocokKataKunci && cocokRole;
    });
  }, [filterRole, kataKunci, periode]);

  const totalHalaman = Math.max(1, Math.ceil(dataTabelFilter.length / jumlahPerHalaman));
  const halamanAktif = Math.min(halaman, totalHalaman);
  const dataHalaman = dataTabelFilter.slice((halamanAktif - 1) * jumlahPerHalaman, halamanAktif * jumlahPerHalaman);

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();

    const sheetRingkasan = XLSX.utils.json_to_sheet([
      { KPI: "Total Pengguna", Nilai: kpi.totalPengguna.nilai, Perubahan: kpi.totalPengguna.perubahan },
      { KPI: "Total Course", Nilai: kpi.totalCourse.nilai, Perubahan: kpi.totalCourse.perubahan },
      { KPI: "Total Pendapatan", Nilai: kpi.totalPendapatan.nilai, Perubahan: kpi.totalPendapatan.perubahan },
      { KPI: "Total Absensi Hari Ini", Nilai: kpi.totalAbsensi.nilai, Perubahan: kpi.totalAbsensi.perubahan },
    ]);

    const sheetPengguna = XLSX.utils.json_to_sheet(
      dataTabelFilter.map((item) => ({
        Nama: item.nama,
        Role: item.role,
        "Aktivitas Terakhir": item.aktivitasTerakhir,
        Status: item.status,
      })),
    );

    const sheetCourse = XLSX.utils.json_to_sheet(
      dataCourse.map((item) => ({
        Status: item.status,
        Jumlah: item.jumlah,
      })),
    );

    const sheetAbsensi = XLSX.utils.json_to_sheet(
      dataAbsensi.map((item) => ({
        Kehadiran: item.nama,
        Jumlah: item.jumlah,
      })),
    );

    XLSX.utils.book_append_sheet(workbook, sheetRingkasan, "Ringkasan");
    XLSX.utils.book_append_sheet(workbook, sheetPengguna, "Pengguna");
    XLSX.utils.book_append_sheet(workbook, sheetCourse, "Course");
    XLSX.utils.book_append_sheet(workbook, sheetAbsensi, "Absensi");

    XLSX.writeFile(workbook, `laporan-admin-${periode}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-28 text-stone-900 md:px-6 md:pb-32">
      <header className="mb-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Laporan & Analitik</h1>
          <p className="mt-1 text-sm text-stone-500">Pantau performa sistem dan aktivitas pengguna</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <select
            value={periode}
            onChange={(event) => {
              setPeriode(event.target.value as Periode);
              setHalaman(1);
            }}
            className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-stone-400"
          >
            <option value="hari-ini">Hari ini</option>
            <option value="mingguan">Mingguan</option>
            <option value="bulanan">Bulanan</option>
          </select>

          <button
            type="button"
            onClick={handleExportExcel}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 transition-all duration-300 hover:-translate-y-0.75 hover:bg-stone-800 active:scale-95"
          >
            <Download size={16} /> Export Excel
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { label: "Total Pengguna", data: kpi.totalPengguna, icon: Users, accent: "bg-blue-50 text-blue-700" },
          { label: "Total Course", data: kpi.totalCourse, icon: Layers3, accent: "bg-amber-50 text-amber-700" },
          { label: "Total Pendapatan", data: kpi.totalPendapatan, icon: FileBarChart2, accent: "bg-emerald-50 text-emerald-700" },
          { label: "Total Absensi Hari Ini", data: kpi.totalAbsensi, icon: Info, accent: "bg-stone-100 text-stone-700" },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-0.75"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{item.label}</p>
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${item.accent}`}>
                <item.icon size={16} />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold leading-none text-stone-900">{item.data.nilai}</p>
            <div
              className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                item.data.naik ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
              }`}
            >
              {item.data.naik ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{item.data.perubahan}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4">
        <article className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Grafik Pertumbuhan Pengguna</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataPertumbuhan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e2de" />
                <XAxis dataKey="label" stroke="#8a817c" fontSize={11} />
                <YAxis stroke="#8a817c" fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="pengguna" stroke="#7c5c53" strokeWidth={3} dot={{ r: 4 }} isAnimationActive />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Grafik Course</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCourse}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e2de" />
                <XAxis dataKey="status" stroke="#8a817c" fontSize={11} />
                <YAxis stroke="#8a817c" fontSize={11} />
                <Tooltip />
                <Bar dataKey="jumlah" radius={[10, 10, 0, 0]} fill="#c8b5ad" isAnimationActive />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Grafik Absensi</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataAbsensi} dataKey="jumlah" nameKey="nama" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} isAnimationActive>
                  {dataAbsensi.map((entry) => (
                    <Cell key={entry.nama} fill={entry.warna} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Insight Sistem</h2>
        <article className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_10px_24px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-0.75">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <Info size={15} />
          </span>
          <p className="text-sm text-stone-700">Pengguna meningkat 12% minggu ini</p>
        </article>
        <article className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_10px_24px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-0.75">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <ArrowUpRight size={15} />
          </span>
          <p className="text-sm text-stone-700">Course aktif meningkat 5%</p>
        </article>
        <article className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_10px_24px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-0.75">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700">
            <AlertTriangle size={15} />
          </span>
          <p className="text-sm text-stone-700">Absensi menurun 3% hari ini</p>
        </article>
      </section>

      <section className="mt-6 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">Data Aktivitas Pengguna</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <label className="relative block">
              <Search size={14} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={kataKunci}
                onChange={(event) => {
                  setKataKunci(event.target.value);
                  setHalaman(1);
                }}
                placeholder="Cari nama atau aktivitas"
                className="w-full rounded-xl border border-stone-200 bg-white py-2 pr-3 pl-8 text-sm outline-none transition focus:border-stone-400"
              />
            </label>
            <select
              value={filterRole}
              onChange={(event) => {
                setFilterRole(event.target.value as "semua" | Role);
                setHalaman(1);
              }}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-stone-400"
            >
              <option value="semua">Semua Role</option>
              <option value="Murid">Murid</option>
              <option value="Pengajar">Pengajar</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-140 text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
                <th className="px-3 py-2">Nama User</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Aktivitas Terakhir</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {dataHalaman.map((baris) => (
                <tr key={`${baris.nama}-${baris.aktivitasTerakhir}`} className="border-b border-stone-100 text-stone-700">
                  <td className="px-3 py-3 font-medium text-stone-900">{baris.nama}</td>
                  <td className="px-3 py-3">{baris.role}</td>
                  <td className="px-3 py-3">{baris.aktivitasTerakhir}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        baris.status === "Aktif" ? "bg-emerald-100 text-emerald-700" : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {baris.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 text-sm">
          <p className="text-stone-500">
            Halaman {halamanAktif} dari {totalHalaman}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHalaman((prev) => Math.max(1, prev - 1))}
              disabled={halamanAktif === 1}
              className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={() => setHalaman((prev) => Math.min(totalHalaman, prev + 1))}
              disabled={halamanAktif === totalHalaman}
              className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
