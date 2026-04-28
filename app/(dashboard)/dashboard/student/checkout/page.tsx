"use client";

import { useCart } from "@/hooks/useCart";
import { ArrowLeft, Banknote, CheckCircle2, QrCode, ShieldCheck, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<"transfer" | "qris">("transfer");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const discount = useMemo(() => {
    const subtotal = cart.reduce((s, c) => s + (c.originalPrice ?? c.price), 0);
    return subtotal - cartTotal;
  }, [cart, cartTotal]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Nama lengkap wajib diisi";
    if (!email.trim()) next.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Format email tidak valid";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    router.push(`/dashboard/student/payment?method=${method}`);
  };

  if (success) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f6f3] px-6 text-center">
      <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 size={40} /></span>
      <h1 className="mt-6 text-2xl font-bold text-stone-900">Pembayaran Berhasil!</h1>
      <p className="mt-2 max-w-xs text-sm text-stone-500">Course telah ditambahkan ke daftar kursus kamu.</p>
      <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
        <Link href="/dashboard/student/my-courses" className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 text-sm font-bold text-amber-50 shadow-lg transition hover:bg-stone-800 active:scale-95">Lihat Kursus Saya</Link>
        <Link href="/dashboard/student/explore" className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 active:scale-95">Kembali ke Explore</Link>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f6f3] px-6 text-center">
      <ShieldCheck size={48} className="text-stone-300" />
      <h1 className="mt-4 text-lg font-bold text-stone-900">Keranjang Kosong</h1>
      <p className="mt-1 text-sm text-stone-500">Tambahkan course ke keranjang sebelum checkout.</p>
      <Link href="/dashboard/student/explore" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg transition hover:bg-stone-800 active:scale-95"><ArrowLeft size={16} /> Cari Course</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-4 pb-28 text-stone-900 md:px-6 md:pb-32">
      <header className="mb-6 flex items-center gap-3">
        <button onClick={() => router.back()} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:bg-stone-50 active:scale-95"><ArrowLeft size={18} /></button>
        <div><h1 className="text-lg font-bold">Checkout</h1><p className="text-xs text-stone-500">Lengkapi data untuk melanjutkan</p></div>
      </header>
      <div className="mx-auto max-w-md">
        <section className="mb-5 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500">Course Dibeli</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img src={item.thumbnail} alt={item.title} className="h-14 w-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-stone-900 line-clamp-1">{item.title}</p>
                  <p className="text-[11px] text-stone-500">{item.instructor}</p>
                  <p className="mt-0.5 text-sm font-bold text-stone-900">{item.price === 0 ? "Gratis" : `Rp ${item.price.toLocaleString("id-ID")}`}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-400 transition hover:bg-red-50 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500">Data Pembeli</h2>
          <div className="space-y-3">
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-stone-700"><User size={12} /> Nama Lengkap</label>
              <input type="text" value={name} onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: "" })); }} placeholder="Masukkan nama kamu"
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-stone-400 focus:ring-2 ${errors.name ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-stone-200 focus:border-stone-400 focus:ring-stone-200"}`} />
              {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-stone-700"><User size={12} /> Email</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: "" })); }} placeholder="nama@email.com"
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-stone-400 focus:ring-2 ${errors.email ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-stone-200 focus:border-stone-400 focus:ring-stone-200"}`} />
              {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
            </div>
          </div>
        </section>

        <section className="mb-5 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500">Metode Pembayaran</h2>
          <div className="space-y-2">
            <button onClick={() => { setMethod("transfer"); if (errors.method) setErrors(p => ({ ...p, method: "" })); }}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.98] ${method === "transfer" ? "border-amber-400 bg-amber-50" : "border-stone-200 bg-white hover:bg-stone-50"}`}>
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${method === "transfer" ? "bg-amber-200 text-amber-700" : "bg-stone-100 text-stone-500"}`}><Banknote size={16} /></span>
              <span className="text-sm font-semibold text-stone-800">Transfer Bank</span>
              <span className="ml-auto h-4 w-4 rounded-full border-2 border-stone-300">{method === "transfer" && <span className="m-0.5 block h-2.5 w-2.5 rounded-full bg-amber-500" />}</span>
            </button>
            <button onClick={() => { setMethod("qris"); if (errors.method) setErrors(p => ({ ...p, method: "" })); }}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.98] ${method === "qris" ? "border-amber-400 bg-amber-50" : "border-stone-200 bg-white hover:bg-stone-50"}`}>
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${method === "qris" ? "bg-amber-200 text-amber-700" : "bg-stone-100 text-stone-500"}`}><QrCode size={16} /></span>
              <span className="text-sm font-semibold text-stone-800">QRIS</span>
              <span className="ml-auto h-4 w-4 rounded-full border-2 border-stone-300">{method === "qris" && <span className="m-0.5 block h-2.5 w-2.5 rounded-full bg-amber-500" />}</span>
            </button>
          </div>
          {errors.method && <p className="mt-1 text-[11px] text-red-500">{errors.method}</p>}
        </section>

        <section className="mb-5 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500">Ringkasan Pembayaran</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-stone-600"><span>Subtotal</span><span className="font-semibold">Rp {cart.reduce((s,c)=>(s+(c.originalPrice??c.price)),0).toLocaleString("id-ID")}</span></div>
            {discount > 0 && <div className="flex justify-between text-stone-600"><span>Diskon</span><span className="font-semibold text-emerald-600">- Rp {discount.toLocaleString("id-ID")}</span></div>}
            <div className="flex justify-between border-t border-stone-100 pt-2 text-base font-bold text-stone-900"><span>Total</span><span>Rp {cartTotal.toLocaleString("id-ID")}</span></div>
          </div>
          <button onClick={handlePay} disabled={submitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 text-sm font-bold text-amber-50 shadow-lg transition hover:bg-stone-800 active:scale-95 disabled:opacity-60">
            {submitting ? "Memproses..." : "Bayar Sekarang"}
          </button>
        </section>
      </div>
    </div>
  );
}
