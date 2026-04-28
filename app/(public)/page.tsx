"use client";

import Link from "next/link";
import { BookOpen, BarChart3, MapPin, Brain, Star, CheckCircle, ArrowRight, Play } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Course Berkualitas", desc: "Akses ratusan course dengan materi terstruktur dan instruktur profesional." },
  { icon: BarChart3, title: "Tracking Progress", desc: "Pantau perkembangan belajar secara real-time dengan dashboard interaktif." },
  { icon: MapPin, title: "Absensi Real-time", desc: "Validasi kehadiran dengan kamera dan lokasi untuk memastikan kedisiplinan." },
  { icon: Brain, title: "Insight Pembelajaran", desc: "Dapatkan rekomendasi course dan analisis performa belajar personal." },
];

const courses = [
  { title: "Matematika Dasar", instructor: "Andi Wijaya", rating: 4.8, students: 1200, price: 149000 },
  { title: "Bahasa Inggris Aktif", instructor: "Siti Rahayu", rating: 4.9, students: 850, price: 179000 },
  { title: "Pemrograman Web", instructor: "Budi Santoso", rating: 4.7, students: 2300, price: 249000 },
];

const testimonials = [
  { name: "Rina Kusuma", role: "Mahasiswa", text: "Belajar jadi lebih terarah dan mudah dipantau. UI-nya enak banget dipakai!" },
  { name: "Dewi Lestari", role: "Siswa SMA", text: "Sistem absensinya unik, bikin aku lebih disiplin mengikuti setiap course." },
];

const whyUs = [
  "UI modern dan intuitif untuk semua usia",
  "Sistem absensi unik dengan verifikasi lokasi",
  "Progress tracking lengkap untuk siswa dan orang tua",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold text-stone-900">LMS App</Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/dashboard/student/explore" className="text-stone-600 hover:text-stone-900">Course</Link>
            <Link href="/login" className="text-stone-600 hover:text-stone-900">Login</Link>
            <Link href="/register" className="rounded-lg bg-stone-900 px-4 py-2 text-white hover:bg-stone-800">Daftar</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-50 via-orange-50 to-stone-100 p-6 shadow-sm md:p-12">
          <div className="pointer-events-none absolute -top-20 -left-16 h-44 w-44 rounded-full bg-amber-200/60 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-52 w-52 rounded-full bg-orange-200/60 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
                <Play size={12} /> LMS Modern
              </span>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Belajar Skill Baru, Lebih Mudah & Terarah 🚀
              </h1>
              <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
                Akses course berkualitas, pantau progres, dan tingkatkan kemampuanmu dengan platform pembelajaran yang terstruktur.
              </p>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-amber-50 shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-800">
                  Mulai Belajar <ArrowRight size={16} />
                </Link>
                <Link href="/dashboard/student/explore" className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:-translate-y-0.5 hover:bg-amber-50">
                  Jelajahi Course
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[{n:"1000+",l:"Murid Aktif"},{n:"100+",l:"Course"},{n:"50+",l:"Pengajar"}].map((s)=>(
                  <div key={s.l} className="rounded-xl border border-white bg-white/70 p-3 text-center shadow-sm backdrop-blur">
                    <p className="text-lg font-bold text-stone-900">{s.n}</p>
                    <p className="text-[11px] text-stone-500">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* App Preview Card */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 rounded-3xl border border-stone-200 bg-white p-4 shadow-xl transition hover:-translate-y-1 md:p-5">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-stone-900" />
                  <div>
                    <p className="text-xs font-bold text-stone-900">Dashboard</p>
                    <p className="text-[10px] text-stone-500">Selamat datang kembali</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Aktif</span>
              </div>

              {/* Progress Card */}
              <div className="mb-3 rounded-2xl border border-stone-100 bg-stone-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-stone-700">Progress Belajar</p>
                  <span className="text-xs font-bold text-amber-700">72%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stone-200">
                  <div className="h-2 w-[72%] rounded-full bg-amber-500" />
                </div>
              </div>

              {/* Course List */}
              <div className="mb-3 rounded-2xl border border-stone-100 bg-stone-50 p-3">
                <p className="mb-2 text-xs font-semibold text-stone-700">Course Hari Ini</p>
                <div className="space-y-2">
                  {["Matematika Dasar","Bahasa Inggris"].map((c,i)=>(
                    <div key={c} className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-lg ${i===0?"bg-amber-200":"bg-orange-200"}`} />
                      <div className="flex-1">
                        <p className="text-[11px] font-semibold text-stone-800">{c}</p>
                        <p className="text-[10px] text-stone-500">{i===0?"08:00 - 09:30":"10:00 - 11:30"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance */}
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-emerald-600" />
                    <p className="text-xs font-semibold text-stone-700">Absensi</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Terverifikasi</span>
                </div>
                <p className="mt-1 text-[10px] text-stone-500">Lokasi & foto valid • 08:05 WIB</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12 md:mt-16">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Fitur Utama</h2>
            <p className="mt-2 text-sm text-stone-600 sm:text-base">Semua tools penting untuk proses belajar modern.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.title} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="inline-flex rounded-xl bg-amber-50 p-2.5 text-amber-700"><Icon size={22} /></span>
                  <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Course Preview */}
        <section className="mt-12 md:mt-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Course Populer</h2>
              <p className="mt-2 text-sm text-stone-600">Mulai dari course populer yang siap dipelajari.</p>
            </div>
            <Link href="/dashboard/student/explore" className="inline-flex items-center gap-1 rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:bg-amber-50">
              Lihat Semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <article key={c.title} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 h-36 w-full rounded-xl bg-stone-100" />
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-xs text-stone-500">{c.instructor}</p>
                <div className="mt-2 flex items-center gap-1 text-amber-600">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-semibold">{c.rating}</span>
                  <span className="text-xs text-stone-400">({c.students})</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-stone-900">Rp{c.price.toLocaleString("id-ID")}</p>
                  <Link href="/register" className="rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-amber-50 transition hover:bg-stone-800">Daftar</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Why Us */}
        <section className="mt-12 md:mt-16">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Kenapa Pilih Kami?</h2>
            <div className="mt-6 space-y-4">
              {whyUs.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-emerald-600" />
                  <p className="text-sm text-stone-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-12 md:mt-16">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Apa Kata Mereka?</h2>
            <p className="mt-2 text-sm text-stone-600">Testimoni dari pengguna aktif LMS App.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t) => (
              <article key={t.name} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">{t.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-stone-500">{t.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">"{t.text}"</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-3xl bg-linear-to-r from-stone-900 to-stone-700 p-6 text-center text-amber-50 md:mt-16 md:p-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Mulai Perjalanan Belajarmu Hari Ini</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-amber-100/80">
            Gabung bersama ribuan murid aktif dan tingkatkan skill-mu dengan course berkualitas.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-amber-100 px-6 py-3 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5 hover:bg-amber-200">
              Daftar Sekarang <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard/student/explore" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Explore Course
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-stone-200 pt-8 text-sm text-stone-600 md:mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium">© {new Date().getFullYear()} LMS App. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/login" className="transition hover:text-stone-900">Login</Link>
              <Link href="/register" className="transition hover:text-stone-900">Daftar</Link>
              <Link href="/dashboard/student/explore" className="transition hover:text-stone-900">Course</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
