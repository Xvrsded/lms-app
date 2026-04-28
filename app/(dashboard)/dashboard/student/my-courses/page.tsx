"use client";

import { BookOpen,CheckCircle2,Clock,Flame,Lightbulb,Play,Search,TrendingUp,X } from "lucide-react";
import { useState,useMemo } from "react";
import Link from "next/link";

const courses=[
  {id:1,title:"Intro to Python",desc:"Dasar-dasar pemrograman Python.",progress:75,total:12,done:9,status:"in_progress" as const,last:"2 jam lalu",img:"https://placehold.co/80x80/3B82F6/FFFFFF?text=PY",bg:"bg-blue-50 text-blue-700 border-blue-100"},
  {id:2,title:"Data Structures",desc:"Array, Stack, Queue, Tree.",progress:40,total:10,done:4,status:"in_progress" as const,last:"Kemarin",img:"https://placehold.co/80x80/10B981/FFFFFF?text=DS",bg:"bg-emerald-50 text-emerald-700 border-emerald-100"},
  {id:3,title:"Database Design",desc:"Relasi, normalisasi, SQL.",progress:100,total:8,done:8,status:"completed" as const,last:"3 hari lalu",img:"https://placehold.co/80x80/F59E0B/FFFFFF?text=DB",bg:"bg-amber-50 text-amber-700 border-amber-100"},
  {id:4,title:"Design System",desc:"Prinsip UI/UX reusable.",progress:100,total:6,done:6,status:"completed" as const,last:"1 minggu lalu",img:"https://placehold.co/80x80/8B5CF6/FFFFFF?text=UI",bg:"bg-violet-50 text-violet-700 border-violet-100"},
  {id:5,title:"React Advanced",desc:"Hooks, Context, performa.",progress:15,total:14,done:2,status:"in_progress" as const,last:"5 hari lalu",img:"https://placehold.co/80x80/EC4899/FFFFFF?text=RX",bg:"bg-pink-50 text-pink-700 border-pink-100"},
];

function pColor(p:number){return p>=80?"bg-emerald-500":p>=50?"bg-blue-500":p>=25?"bg-amber-500":"bg-stone-400";}
function pLabel(p:number){return p===100?"Selesai":p>=50?"Setengah jalan":"Dimulai";}

export default function MyCoursesPage(){
  const [q,setQ]=useState("");
  const [f,setF]=useState<"all"|"in_progress"|"completed">("all");
  const list=useMemo(()=>{
    let r=courses.filter(c=>c.title.toLowerCase().includes(q.toLowerCase()));
    if(f!=="all")r=r.filter(c=>c.status===f);
    return r;
  },[q,f]);
  const cont=courses.filter(c=>c.status==="in_progress").sort((a,b)=>b.progress-a.progress)[0]??null;
  const ip=courses.filter(c=>c.status==="in_progress").length;
  const done=courses.filter(c=>c.status==="completed").length;
  const almost=courses.filter(c=>c.status==="in_progress"&&c.progress>=70).length;

  return(
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Course Saya</h1>
        <p className="mt-1 text-sm text-stone-500">Lanjutkan perjalanan belajar kamu.</p>
      </header>

      <section className="mb-5">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari course..."
            className="w-full rounded-2xl border border-stone-200 bg-white py-3 pl-10 pr-10 text-sm shadow-sm outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-2 focus:ring-stone-200"/>
          {q&&<button onClick={()=>setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition"><X size={14}/></button>}
        </div>
      </section>

      {cont&&(
        <section className="mb-5">
          <div className="relative overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-5 shadow-[0_12px_32px_rgba(41,28,23,0.1)]">
            <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-stone-100 opacity-50"/>
            <div className="relative">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700"><Flame size={11}/>Lanjutkan Belajar</div>
              <h2 className="text-lg font-bold text-stone-900">{cont.title}</h2>
              <p className="mt-0.5 text-xs text-stone-500">{cont.desc}</p>
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs font-semibold"><span className="text-stone-600">{cont.done}/{cont.total} materi</span><span>{cont.progress}%</span></div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-stone-100"><div className={`h-full rounded-full transition-all duration-700 ${pColor(cont.progress)}`} style={{width:`${cont.progress}%`}}/></div>
              </div>
              <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-bold text-amber-50 shadow transition hover:bg-stone-800 active:scale-95"><Play size={14}/>Lanjutkan Belajar</button>
            </div>
          </div>
        </section>
      )}

      <section className="mb-5 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_20px_rgba(41,28,23,0.06)]"><p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Aktif</p><p className="mt-1 text-xl font-bold">{ip}</p></div>
        <div className="rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_20px_rgba(41,28,23,0.06)]"><p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Selesai</p><p className="mt-1 text-xl font-bold text-emerald-700">{done}</p></div>
        <div className="rounded-2xl border border-stone-200/90 bg-white p-3 shadow-[0_8px_20px_rgba(41,28,23,0.06)]"><p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Hampir Selesai</p><p className="mt-1 text-xl font-bold text-amber-600">{almost}</p></div>
      </section>

      <section className="mb-4 flex gap-2">
        {(["all","in_progress","completed"]as const).map(v=>(
          <button key={v} onClick={()=>setF(v)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 ${f===v?"bg-stone-900 text-amber-50 shadow":"border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"}`}>
            {v==="all"?"Semua":v==="in_progress"?"Berjalan":"Selesai"}
          </button>
        ))}
      </section>

      <section className="mb-5 space-y-3">
        {list.map(c=>(
          <div key={c.id} className="flex items-start gap-4 rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(41,28,23,0.1)]">
            <img src={c.img} alt={c.title} className="h-16 w-16 shrink-0 rounded-xl object-cover"/>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div><p className="text-sm font-bold text-stone-900">{c.title}</p><p className="mt-0.5 text-[11px] text-stone-500 line-clamp-1">{c.desc}</p></div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${c.status==="completed"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{c.status==="completed"?"Selesai":"Berjalan"}</span>
              </div>
              <div className="mt-2.5">
                <div className="mb-1 flex items-center justify-between text-[11px] font-semibold"><span className="text-stone-500">{pLabel(c.progress)}</span><span>{c.progress}%</span></div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100"><div className={`h-full rounded-full transition-all duration-700 ${pColor(c.progress)}`} style={{width:`${c.progress}%`}}/></div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-stone-400"><Clock size={11}/><span>Terakhir dibuka {c.last}</span></div>
            </div>
          </div>
        ))}
        {list.length===0&&<div className="rounded-2xl border border-stone-200/90 bg-white p-6 text-center shadow-[0_8px_20px_rgba(41,28,23,0.06)]"><p className="text-sm font-semibold">Tidak ditemukan</p><p className="mt-1 text-xs text-stone-500">Coba kata kunci lain.</p></div>}
      </section>

      <section className="mb-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Insight Belajar</h2>
        <div className="space-y-3">
          {almost>0&&(
            <div className="flex items-center gap-4 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700"><TrendingUp size={16}/></span>
              <div><p className="text-sm font-semibold">Kamu hampir menyelesaikan {almost} course</p><p className="mt-0.5 text-xs text-stone-500">Sedikit lagi, tetap konsisten!</p></div>
            </div>
          )}
          <div className="flex items-center gap-4 rounded-2xl border border-rose-200/80 bg-rose-50/60 p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700"><Flame size={16}/></span>
            <div><p className="text-sm font-semibold">Pertahankan streak belajar kamu 🔥</p><p className="mt-0.5 text-xs text-stone-500">{ip} course sedang berjalan, jangan berhenti.</p></div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-blue-200/80 bg-blue-50/60 p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700"><Lightbulb size={16}/></span>
            <div><p className="text-sm font-semibold">Tip: Belajar rutin 30 menit/hari</p><p className="mt-0.5 text-xs text-stone-500">Lebih efektif daripada marathon belajar.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
