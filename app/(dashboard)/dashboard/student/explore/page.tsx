"use client";

import { useCart } from "@/hooks/useCart";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Crown,
  Flame,
  Globe,
  Play,
  Plus,
  Rocket,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  StarHalf,
  Trash2,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface CourseItem {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  originalPrice?: number;
  category: string;
  thumbnail: string;
  description: string;
  materials: string[];
  isPopular: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  instructorAvatar: string;
}

const courses: CourseItem[] = [
  {
    id: 1,
    title: "Intro to Python",
    instructor: "Andi Wijaya",
    rating: 4.8,
    students: 1240,
    price: 0,
    category: "Programming",
    thumbnail: "https://placehold.co/320x180/3B82F6/FFFFFF?text=PY",
    description: "Belajar Python dari nol hingga bisa membuat program sederhana. Cocok untuk pemula tanpa background coding.",
    materials: ["Instalasi & Setup", "Variabel & Tipe Data", "Control Flow", "Fungsi", "List & Dictionary", "Mini Project"],
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    instructorAvatar: "https://placehold.co/40x40/3B82F6/FFFFFF?text=A",
  },
  {
    id: 2,
    title: "Data Structures",
    instructor: "Siti Aminah",
    rating: 4.6,
    students: 890,
    price: 99000,
    originalPrice: 199000,
    category: "Programming",
    thumbnail: "https://placehold.co/320x180/10B981/FFFFFF?text=DS",
    description: "Memahami struktur data fundamental: array, linked list, stack, queue, tree, dan graph dengan contoh praktis.",
    materials: ["Array & List", "Linked List", "Stack & Queue", "Tree", "Graph", "Analisis Big O"],
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    instructorAvatar: "https://placehold.co/40x40/10B981/FFFFFF?text=S",
  },
  {
    id: 3,
    title: "Database Design",
    instructor: "Rudi Hartono",
    rating: 4.5,
    students: 650,
    price: 79000,
    originalPrice: 159000,
    category: "Database",
    thumbnail: "https://placehold.co/320x180/F59E0B/FFFFFF?text=DB",
    description: "Desain database relasional yang efisien. Normalisasi, indexing, dan query optimization.",
    materials: ["Konsep Relasional", "ERD", "Normalisasi", "SQL Dasar", "Indexing", "Query Optimization"],
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    instructorAvatar: "https://placehold.co/40x40/F59E0B/FFFFFF?text=R",
  },
  {
    id: 4,
    title: "Design System",
    instructor: "Lina Marlina",
    rating: 4.9,
    students: 1520,
    price: 0,
    category: "Design",
    thumbnail: "https://placehold.co/320x180/8B5CF6/FFFFFF?text=UI",
    description: "Bangun sistem desain konsisten untuk produk digital. Typography, warna, spacing, dan komponen reusable.",
    materials: ["Design Tokens", "Typography", "Color System", "Spacing", "Component Library", "Figma Workflow"],
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    instructorAvatar: "https://placehold.co/40x40/8B5CF6/FFFFFF?text=L",
  },
  {
    id: 5,
    title: "React Advanced",
    instructor: "Andi Wijaya",
    rating: 4.7,
    students: 1100,
    price: 129000,
    originalPrice: 259000,
    category: "Programming",
    thumbnail: "https://placehold.co/320x180/EC4899/FFFFFF?text=RX",
    description: "Hooks, Context API, performa, testing, dan pola arsitektur modern dalam React 18.",
    materials: ["Hooks Lanjutan", "Context & State", "Performa", "Testing", "Patterns", "Deploy"],
    isPopular: true,
    isNew: true,
    isBestSeller: false,
    instructorAvatar: "https://placehold.co/40x40/EC4899/FFFFFF?text=A",
  },
  {
    id: 6,
    title: "Machine Learning",
    instructor: "Dr. Budi Santoso",
    rating: 4.8,
    students: 430,
    price: 199000,
    originalPrice: 399000,
    category: "Data Science",
    thumbnail: "https://placehold.co/320x180/6366F1/FFFFFF?text=ML",
    description: "Pengenalan machine learning dengan Python. Regression, classification, clustering, dan neural network.",
    materials: ["Preprocessing Data", "Regression", "Classification", "Clustering", "Neural Network", "Model Deployment"],
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    instructorAvatar: "https://placehold.co/40x40/6366F1/FFFFFF?text=B",
  },
  {
    id: 7,
    title: "Digital Marketing",
    instructor: "Dewi Kartika",
    rating: 4.3,
    students: 2100,
    price: 0,
    category: "Marketing",
    thumbnail: "https://placehold.co/320x180/F43F5E/FFFFFF?text=DM",
    description: "Strategi marketing digital: SEO, SEM, social media, content marketing, dan analytics.",
    materials: ["SEO Dasar", "SEM & Ads", "Social Media", "Content Strategy", "Email Marketing", "Analytics"],
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    instructorAvatar: "https://placehold.co/40x40/F43F5E/FFFFFF?text=D",
  },
  {
    id: 8,
    title: "Public Speaking",
    instructor: "Agus Pratama",
    rating: 4.6,
    students: 320,
    price: 59000,
    originalPrice: 119000,
    category: "Soft Skill",
    thumbnail: "https://placehold.co/320x180/14B8A6/FFFFFF?text=PS",
    description: "Teknik presentasi dan public speaking yang meyakinkan. Atasi nervousness dan bangun kredibilitas.",
    materials: ["Stage Presence", "Storytelling", "Voice Control", "Body Language", "Q&A Handling", "Persuasion"],
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    instructorAvatar: "https://placehold.co/40x40/14B8A6/FFFFFF?text=A",
  },
];

const categories = ["Semua", "Programming", "Database", "Design", "Data Science", "Marketing", "Soft Skill"];

function formatPrice(n: number) {
  if (n === 0) return "Gratis";
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function RatingStars({ rating, showNumber = true }: { rating: number; showNumber?: boolean }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} size={12} className="fill-amber-400 text-amber-400" />
      ))}
      {half && <StarHalf size={12} className="fill-amber-400 text-amber-400" />}
      {showNumber && <span className="ml-1 text-[11px] font-semibold text-stone-700">{rating}</span>}
    </span>
  );
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "fire" | "crown" | "new" }) {
  const variants = {
    default: "bg-stone-900 text-amber-50",
    fire: "bg-amber-500 text-white",
    crown: "bg-purple-600 text-white",
    new: "bg-blue-600 text-white",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold shadow ${variants[variant]}`}>
      {children}
    </span>
  );
}

export default function StudentExplorePage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, cartTotal, itemCount } = useCart();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Semua");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [detail, setDetail] = useState<CourseItem | null>(null);
  const [enrolled, setEnrolled] = useState<Set<number>>(new Set());
  const [justEnrolled, setJustEnrolled] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToCart = (course: CourseItem) => {
    if (!cart.find((c) => c.id === course.id) && !enrolled.has(course.id)) {
      addToCart(course);
      showToast("Berhasil ditambahkan ke keranjang");
    }
  };

  const handleBuyNow = (course: CourseItem) => {
    if (!cart.find((c) => c.id === course.id) && !enrolled.has(course.id)) {
      addToCart(course);
    }
    router.push("/dashboard/student/checkout");
  };

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchQuery = c.title.toLowerCase().includes(query.toLowerCase());
      const matchCat = cat === "Semua" || c.category === cat;
      const matchPrice = priceFilter === "all" || (priceFilter === "free" ? c.price === 0 : c.price > 0);
      return matchQuery && matchCat && matchPrice;
    });
  }, [query, cat, priceFilter]);

  const handleEnroll = (course: CourseItem) => {
    setEnrolled((prev) => new Set(prev).add(course.id));
    setJustEnrolled(course.id);
    setTimeout(() => setJustEnrolled(null), 2500);
  };

  // Best seller for hero
  const bestSeller = courses.find((c) => c.isBestSeller) || courses[0];
  
  // Recommendations (random 3 courses not in filtered)
  const recommendations = useMemo(() => {
    const other = courses.filter((c) => !filtered.some((f) => f.id === c.id)).slice(0, 3);
    return other.length ? other : courses.slice(0, 3);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-4 pb-24 text-stone-900 md:px-6 md:pb-28">
      {/* Hero Banner */}
      <section className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-5 text-white shadow-[0_12px_40px_rgba(41,28,23,0.25)]">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-1 text-[10px] font-bold text-amber-300">
              <Zap size={10} /> Mulai Belajar Hari Ini
            </span>
            <h2 className="mt-2 text-xl font-bold">Temukan Course Terbaik 🔥</h2>
            <p className="mt-1 text-xs text-stone-300">Tingkatkan skill kamu dengan course pilihan.</p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition hover:bg-amber-400 active:scale-95"
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
                {itemCount}
              </span>
            )}
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button 
            onClick={() => setDetail(bestSeller)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-stone-900 shadow transition hover:bg-amber-400 active:scale-95"
          >
            <Play size={14} /> Lihat Course
          </button>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-2 text-[10px] font-semibold">
            <Flame size={12} className="text-amber-400" /> Diskon 50%
          </span>
        </div>
      </section>

      {/* Search Big */}
      <section className="mb-5">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari course, skill, atau topik..."
            className="w-full rounded-2xl border border-stone-200 bg-white py-4 pl-12 pr-12 text-sm shadow-md outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-2 focus:ring-stone-200"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </section>

      {/* Category Pills */}
      <section className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition active:scale-95 ${
              cat === c
                ? "bg-stone-900 text-amber-50 shadow-md"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            {c}
          </button>
        ))}
      </section>

      {/* Price Filter */}
      <section className="mb-5 flex gap-2">
        {(["all", "free", "paid"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPriceFilter(p)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 ${
              priceFilter === p
                ? "bg-stone-900 text-amber-50 shadow"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            {p === "all" ? "Semua Harga" : p === "free" ? "Gratis" : "Berbayar"}
          </button>
        ))}
      </section>

      {/* Course Grid - Marketplace Style */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((course) => {
          const isEnrolled = enrolled.has(course.id);
          const hasDiscount = course.originalPrice && course.price < course.originalPrice;
          return (
            <div
              key={course.id}
              className="group relative overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_8px_24px_rgba(41,28,23,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(41,28,23,0.12)] active:scale-[0.98]"
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  {course.isBestSeller && (
                    <Badge variant="crown"><Crown size={10} /> Terlaris</Badge>
                  )}
                  {course.isNew && (
                    <Badge variant="new"><Sparkles size={10} /> Baru</Badge>
                  )}
                  {course.isPopular && !course.isBestSeller && (
                    <Badge variant="fire"><Flame size={10} /> Best Seller</Badge>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-stone-700 backdrop-blur">
                    <Globe size={10} /> {course.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-stone-900 line-clamp-1">{course.title}</h3>
                
                {/* Instructor */}
                <div className="mt-2 flex items-center gap-2">
                  <img src={course.instructorAvatar} alt={course.instructor} className="h-5 w-5 rounded-full" />
                  <span className="text-xs text-stone-500">{course.instructor}</span>
                </div>

                {/* Rating & Students */}
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <RatingStars rating={course.rating} />
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-stone-400">
                    <Users size={11} /> {course.students.toLocaleString()}
                  </span>
                </div>

                {/* Social Proof */}
                <p className="mt-1.5 text-[10px] text-stone-400">
                  {course.students > 1000 ? "1000+ murid telah mengikuti" : `${course.students}+ murid telah mengikuti`}
                </p>

                {/* Price & CTA */}
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    {hasDiscount && (
                      <p className="text-[11px] text-stone-400 line-through">
                        {formatPrice(course.originalPrice!)}
                      </p>
                    )}
                    <p className={`text-base font-bold ${course.price === 0 ? "text-emerald-600" : "text-stone-900"}`}>
                      {formatPrice(course.price)}
                    </p>
                  </div>
                  
                  {isEnrolled ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 size={12} /> Terdaftar
                    </span>
                  ) : course.price === 0 ? (
                    <button
                      onClick={() => handleEnroll(course)}
                      className="rounded-xl bg-stone-900 px-3 py-1.5 text-xs font-bold text-amber-50 shadow transition hover:bg-stone-800 active:scale-95"
                    >
                      Ikuti
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(course)}
                        disabled={!!cart.find((c) => c.id === course.id)}
                        className="rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50 active:scale-95 disabled:opacity-50"
                      >
                        {cart.find((c) => c.id === course.id) ? "Di Keranjang" : "Tambah"}
                      </button>
                      <button
                        onClick={() => handleBuyNow(course)}
                        className="rounded-xl bg-stone-900 px-3 py-1.5 text-xs font-bold text-amber-50 shadow transition hover:bg-stone-800 active:scale-95"
                      >
                        Beli
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="mb-8 flex flex-col items-center rounded-2xl border border-stone-200/90 bg-white p-10 shadow-[0_8px_20px_rgba(41,28,23,0.06)] text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            <Search size={28} />
          </span>
          <p className="mt-4 text-base font-semibold text-stone-900">Course tidak ditemukan</p>
          <p className="mt-1 text-sm text-stone-500">Coba ubah kata kunci atau filter pencarian.</p>
        </div>
      )}

      {/* Recommendations */}
      {filtered.length > 0 && (
        <section className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-stone-900">Rekomendasi untuk kamu</h2>
            <span className="text-xs text-stone-500">Berdasarkan pencarian</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recommendations.map((course) => (
              <button
                key={course.id}
                onClick={() => setDetail(course)}
                className="shrink-0 w-40 rounded-xl border border-stone-200/90 bg-white p-3 text-left shadow-[0_4px_12px_rgba(41,28,23,0.06)] transition hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(41,28,23,0.1)] active:scale-95"
              >
                <img src={course.thumbnail} alt={course.title} className="mb-2 h-20 w-full rounded-lg object-cover" />
                <p className="text-xs font-bold text-stone-900 line-clamp-1">{course.title}</p>
                <p className="mt-0.5 text-[10px] text-stone-500">{course.instructor}</p>
                <p className={`mt-1 text-xs font-bold ${course.price === 0 ? "text-emerald-600" : "text-stone-900"}`}>
                  {formatPrice(course.price)}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Toast */}
      {justEnrolled !== null && (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex max-w-sm animate-[slideInDown_0.3s_ease-out]">
          <div className="mx-4 flex w-full items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-lg">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
            <p className="text-sm font-semibold text-emerald-800">Berhasil membeli course!</p>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="relative h-full w-full max-w-md overflow-y-auto bg-[#f8f6f3] shadow-2xl sm:rounded-l-3xl">
            {/* Close */}
            <button
              onClick={() => setDetail(null)}
              className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white/90 px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur transition hover:bg-stone-50 active:scale-95"
            >
              <ArrowLeft size={14} /> Kembali
            </button>

            {/* Hero Image */}
            <div className="relative h-56">
              <img src={detail.thumbnail} alt={detail.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="mb-2 flex gap-1.5">
                  {detail.isBestSeller && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                      <Crown size={9} /> Terlaris
                    </span>
                  )}
                  {detail.isNew && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                      <Sparkles size={9} /> Baru
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white">{detail.title}</h2>
                <p className="mt-0.5 text-sm text-stone-200">{detail.category}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Instructor Card */}
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3">
                <img src={detail.instructorAvatar} alt={detail.instructor} className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-stone-900">{detail.instructor}</p>
                  <p className="text-[11px] text-stone-500">Pengajar Professional</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <RatingStars rating={detail.rating} showNumber={false} />
                    <span className="ml-1 text-xs font-bold text-stone-900">{detail.rating}</span>
                  </div>
                  <p className="text-[10px] text-stone-400">{detail.students.toLocaleString()} murid</p>
                </div>
              </div>

              {/* Social Proof Banner */}
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-amber-50 p-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <Award size={14} />
                </span>
                <div>
                  <p className="text-xs font-bold text-stone-900">Rating 4.8/5 dari 1000+ murid</p>
                  <p className="text-[10px] text-stone-500">Course ini sangat direkomendasikan</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-500">Tentang Course</h3>
                <p className="text-sm leading-relaxed text-stone-700">{detail.description}</p>
              </div>

              {/* What You'll Learn */}
              <div className="mb-4">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-500">Yang Akan Kamu Pelajari</h3>
                <ul className="space-y-2">
                  {detail.materials.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & CTA Fixed */}
              <div className="sticky bottom-0 -mx-5 -mb-5 border-t border-stone-200 bg-white p-4">
                <div className="mb-3 flex items-end justify-between">
                  <div>
                    {detail.originalPrice && detail.price < detail.originalPrice && (
                      <p className="text-xs text-stone-400 line-through">
                        {formatPrice(detail.originalPrice)}
                      </p>
                    )}
                    <p className="text-2xl font-bold text-stone-900">{formatPrice(detail.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-stone-400">{detail.students.toLocaleString()} murid</p>
                    <div className="flex items-center justify-end gap-1">
                      <Star size={10} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold">{detail.rating}</span>
                    </div>
                  </div>
                </div>
                
                {enrolled.has(detail.id) ? (
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-100 py-3 text-sm font-bold text-emerald-700">
                    <CheckCircle2 size={16} /> Sudah Terdaftar
                  </button>
                ) : detail.price === 0 ? (
                  <button
                    onClick={() => handleEnroll(detail)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 text-sm font-bold text-amber-50 shadow-lg transition hover:bg-stone-800 active:scale-95"
                  >
                    <Zap size={16} /> Ikuti Course Gratis
                  </button>
                ) : cart.find((c) => c.id === detail.id) ? (
                  <button
                    onClick={() => { setDetail(null); setCartOpen(true); }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-bold text-stone-900 shadow-lg transition hover:bg-amber-400 active:scale-95"
                  >
                    <ShoppingCart size={16} /> Lihat Keranjang
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => { handleAddToCart(detail); }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white py-3 text-sm font-bold text-stone-700 transition hover:bg-stone-50 active:scale-95"
                    >
                      <Plus size={16} /> Tambah ke Keranjang
                    </button>
                    <button
                      onClick={() => handleBuyNow(detail)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 text-sm font-bold text-amber-50 shadow-lg transition hover:bg-stone-800 active:scale-95"
                    >
                      <ShoppingCart size={16} /> Beli Sekarang
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="relative h-full w-full max-w-md overflow-y-auto bg-[#f8f6f3] shadow-2xl sm:rounded-l-3xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white/90 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-stone-700" />
                <h2 className="text-base font-bold text-stone-900">Keranjang</h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <ShoppingCart size={48} className="text-stone-300" />
                  <p className="mt-4 text-sm font-semibold text-stone-700">Keranjang kosong</p>
                  <p className="mt-1 text-xs text-stone-500">Tambahkan course untuk mulai belajar.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3"
                      >
                        <img src={item.thumbnail} alt={item.title} className="h-14 w-14 rounded-lg object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-stone-900 line-clamp-1">{item.title}</p>
                          <p className="text-[11px] text-stone-500">{item.instructor}</p>
                          <p className="mt-0.5 text-sm font-bold text-stone-900">{formatPrice(item.price)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Payment Box */}
                  <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-stone-500">Ringkasan Pembayaran</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-stone-600">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Diskon</span>
                        <span className="text-emerald-600">- Rp 0</span>
                      </div>
                      <div className="flex justify-between border-t border-stone-100 pt-2 text-base font-bold text-stone-900">
                        <span>Total</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { setCartOpen(false); router.push("/dashboard/student/checkout"); }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3.5 text-sm font-bold text-amber-50 shadow-lg transition hover:bg-stone-800 active:scale-95"
                  >
                    <ShoppingCart size={18} /> Bayar Sekarang
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex max-w-sm animate-[slideInDown_0.3s_ease-out]">
          <div className="mx-4 flex w-full items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 shadow-lg">
            <CheckCircle2 size={18} className="shrink-0 text-amber-600" />
            <p className="text-sm font-semibold text-amber-800">{toast}</p>
          </div>
        </div>
      )}
    </div>
  );
}
