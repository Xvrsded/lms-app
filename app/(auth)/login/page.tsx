import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-stone-900 p-4 text-stone-900 sm:p-6 lg:p-8">
      <section className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-stone-800 shadow-2xl lg:min-h-170 lg:grid-cols-2">
        <div className="relative order-2 flex items-center overflow-hidden bg-stone-800 p-6 text-amber-50 lg:order-1 lg:p-10 xl:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#4a332e_0%,#3e2723_55%,#2e1c18_100%)] opacity-72" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,#fde68a_0,transparent_42%),radial-gradient(circle_at_84%_24%,#fdba74_0,transparent_40%)] opacity-10" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(35deg,transparent_0%,transparent_46%,#fef3c7_46%,transparent_47%,transparent_100%)] opacity-4" />

          <div className="relative z-10 w-full">
            <p className="inline-flex rounded-full border border-amber-200/40 bg-amber-100/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-100">
              LMS Platform
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Selamat Datang Kembali</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-amber-100/80 sm:text-base">
              Kelola pembelajaran, pantau progres, dan tingkatkan kualitas belajar dalam satu platform.
            </p>

            <div className="mt-8 rounded-2xl border border-amber-100/20 bg-amber-100/10 p-4 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-amber-50/15 p-3">
                  <p className="text-xs uppercase tracking-wide text-amber-100/80">Kelas Aktif</p>
                  <p className="mt-1 text-lg font-semibold text-amber-50">+128</p>
                </div>
                <div className="rounded-xl bg-amber-50/15 p-3">
                  <p className="text-xs uppercase tracking-wide text-amber-100/80">Absensi Harian</p>
                  <p className="mt-1 text-lg font-semibold text-amber-50">Realtime</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 flex items-center justify-center bg-amber-100 p-6 sm:p-8 lg:order-2 lg:p-10 xl:p-12">
          <section className="w-full max-w-md rounded-3xl border border-stone-200 bg-[#D7CCC8] p-6 shadow-xl sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">Login</h2>
            <p className="mt-2 text-sm text-stone-700">Masuk untuk melanjutkan ke dashboard sesuai role.</p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
