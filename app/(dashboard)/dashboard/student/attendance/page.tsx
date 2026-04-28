"use client";

import {
  Camera,
  CheckCircle2,
  Circle,
  Loader2,
  MapPin,
  RefreshCw,
  ShieldCheck,
  ShieldX,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function StudentAttendancePage() {
  // ---- Camera ----
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [camReady, setCamReady] = useState(false);
  const [camError, setCamError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    setCamReady(false);
  }, []);

  const startCamera = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setCamError("Kamera tidak didukung di browser ini.");
      return;
    }
    try {
      setCamError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      stopCamera();
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamReady(true);
    } catch {
      setCamError("Gagal mengakses kamera.");
      setCamReady(false);
    }
  }, [stopCamera]);

  const captureImage = useCallback(() => {
    const video = videoRef.current;
    if (!video || !camReady || video.videoWidth === 0 || video.videoHeight === 0) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, [camReady]);

  const handleCapture = () => {
    const img = captureImage();
    if (img) {
      setCapturedImage(img);
      stopCamera();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setCamError(null);
    void startCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // ---- Geolocation ----
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  const refreshLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocError("Geolocation tidak didukung di browser ini.");
      return;
    }
    setLocLoading(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setCoordinates({ latitude: p.coords.latitude, longitude: p.coords.longitude });
        setLocLoading(false);
      },
      () => {
        setLocError("Gagal mendapatkan lokasi.");
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  // ---- Submit ----
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canSubmit = Boolean(capturedImage) && Boolean(coordinates) && !isSubmitting && !submitted;

  const handleSubmit = async () => {
    if (!capturedImage || !coordinates) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: capturedImage,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setSubmitError(result.message ?? "Gagal menyimpan absensi.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Terjadi error saat mengirim absensi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- Derived ----
  const statusLabel = submitted ? "Sudah Absen Hari Ini" : "Belum Absen";
  const StatusIcon = submitted ? ShieldCheck : ShieldX;

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pt-6 pb-32 text-stone-900 md:px-6 md:pb-36">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Absensi</h1>
        <p className="mt-1 text-sm text-stone-500">Absen dengan kamera dan lokasi GPS.</p>
      </header>

      {/* Status Card */}
      <section className="mb-5">
        <article
          className={`flex items-center gap-4 rounded-2xl border p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)] transition ${
            submitted
              ? "border-emerald-200/80 bg-emerald-50/60"
              : "border-amber-200/80 bg-amber-50/60"
          }`}
        >
          <span
            className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
              submitted ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            <StatusIcon size={22} />
          </span>
          <div>
            <p className="text-sm font-semibold text-stone-900">{statusLabel}</p>
            <p className="text-xs text-stone-500">
              {submitted
                ? "Absensi berhasil tercatat hari ini."
                : "Lengkapi kamera dan lokasi untuk absen."}
            </p>
          </div>
          <span
            className={`ml-auto shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
              submitted
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {submitted ? "Selesai" : "Pending"}
          </span>
        </article>
      </section>

      {/* Checklist */}
      <section className="mb-5">
        <div className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_8px_20px_rgba(41,28,23,0.06)]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">Validasi</p>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              {capturedImage ? (
                <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
              ) : (
                <Circle size={18} className="shrink-0 text-stone-300" />
              )}
              <p className="text-sm text-stone-700">Foto wajah tercapture</p>
            </div>
            <div className="flex items-center gap-3">
              {coordinates ? (
                <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
              ) : (
                <Circle size={18} className="shrink-0 text-stone-300" />
              )}
              <p className="text-sm text-stone-700">Lokasi GPS tersedia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Camera */}
      {!submitted && (
        <section className="mb-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
            <Camera size={14} /> Kamera
          </h2>

          <div className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
            {/* Preview area */}
            <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="h-64 w-full object-cover sm:h-72"
                />
              ) : (
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  autoPlay
                  className="h-64 w-full object-cover sm:h-72"
                />
              )}
            </div>

            {camError && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                <XCircle size={16} className="mt-0.5 shrink-0" />
                <p>{camError}</p>
              </div>
            )}

            {/* Camera actions */}
            <div className="mt-4 flex items-center gap-3">
              {!camReady && !capturedImage && (
                <button
                  type="button"
                  onClick={() => void startCamera()}
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 shadow-md transition hover:bg-stone-800 active:scale-95"
                >
                  <Camera size={16} />
                  Aktifkan Kamera
                </button>
              )}

              {camReady && !capturedImage && (
                <button
                  type="button"
                  onClick={handleCapture}
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 shadow-md transition hover:bg-stone-800 active:scale-95"
                >
                  <Camera size={16} />
                  Ambil Foto
                </button>
              )}

              {capturedImage && (
                <button
                  type="button"
                  onClick={handleRetake}
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 active:scale-95"
                >
                  <RefreshCw size={16} />
                  Ulangi Foto
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Location */}
      {!submitted && (
        <section className="mb-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
            <MapPin size={14} /> Lokasi GPS
          </h2>

          <div className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-[0_10px_24px_rgba(41,28,23,0.08)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <MapPin size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {coordinates ? "Lokasi Aktif" : locLoading ? "Mencari Lokasi..." : "Lokasi Belum Tersedia"}
                  </p>
                  <p className="text-xs text-stone-500">
                    {coordinates
                      ? "Koordinat berhasil didapatkan."
                      : "Izinkan akses lokasi di browser."}
                  </p>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                  coordinates ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }`}
              >
                {coordinates ? "OK" : locLoading ? "..." : "Pending"}
              </span>
            </div>

            {coordinates && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-stone-50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Latitude</p>
                  <p className="mt-0.5 text-sm font-medium text-stone-900">{coordinates.latitude.toFixed(6)}</p>
                </div>
                <div className="rounded-xl bg-stone-50 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Longitude</p>
                  <p className="mt-0.5 text-sm font-medium text-stone-900">{coordinates.longitude.toFixed(6)}</p>
                </div>
              </div>
            )}

            {locError && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                <XCircle size={16} className="mt-0.5 shrink-0" />
                <p>{locError}</p>
              </div>
            )}

            <button
              type="button"
              onClick={refreshLocation}
              disabled={locLoading}
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-600 transition hover:bg-stone-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={13} className={locLoading ? "animate-spin" : ""} />
              {locLoading ? "Memuat..." : "Refresh Lokasi"}
            </button>
          </div>
        </section>
      )}

      {/* Main Action */}
      {!submitted && (
        <section className="mb-6">
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold shadow-lg transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: canSubmit
                ? "linear-gradient(135deg, #4a332e 0%, #3e2723 100%)"
                : "#d6d3d1",
              color: canSubmit ? "#fff" : "#78716c",
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Menyimpan Absensi...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Absen Sekarang
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[11px] text-stone-400">
            {canSubmit
              ? "Semua validasi terpenuhi. Siap absen."
              : "Aktifkan kamera dan pastikan lokasi tersedia."}
          </p>
        </section>
      )}

      {/* Success */}
      {submitted && (
        <section className="mb-6">
          <div className="flex flex-col items-center rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-8 shadow-[0_10px_24px_rgba(41,28,23,0.08)] text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={32} />
            </span>
            <p className="mt-4 text-lg font-bold text-stone-900">Absensi Berhasil</p>
            <p className="mt-1 text-sm text-stone-500">Absensi hari ini telah tercatat.</p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setCapturedImage(null);
                setSubmitError(null);
                refreshLocation();
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-emerald-50 active:scale-95"
            >
              <RefreshCw size={14} />
              Absen Lagi
            </button>
          </div>
        </section>
      )}

      {/* Error */}
      {submitError && !submitted && (
        <section className="mb-6">
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">
            <XCircle size={20} className="mt-0.5 shrink-0 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-red-800">Gagal Absen</p>
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
