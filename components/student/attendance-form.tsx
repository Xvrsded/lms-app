"use client";

import { useState } from "react";
import { useCamera } from "@/hooks/use-camera";
import { useGeoLocation } from "@/hooks/use-geolocation";

export function AttendanceForm() {
  const { videoRef, isReady: cameraReady, error: cameraError, startCamera, captureImage } = useCamera();
  const {
    coordinates,
    isLoading: locationLoading,
    error: locationError,
    refreshLocation,
  } = useGeoLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canSubmit = cameraReady && Boolean(coordinates) && !isSubmitting;

  const handleSubmit = async () => {
    const image = captureImage();

    if (!image) {
      setSubmitError("Gagal mengambil gambar dari kamera.");
      return;
    }

    if (!coordinates) {
      setSubmitError("Lokasi belum tersedia.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setMessage(null);

      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setSubmitError(result.message ?? "Gagal menyimpan absensi.");
        return;
      }

      setMessage(result.message ?? "Absensi berhasil disimpan.");
    } catch {
      setSubmitError("Terjadi error saat mengirim absensi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm md:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">Absensi Student</h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">Kamera</p>
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
            <video ref={videoRef} className="h-56 w-full object-cover md:h-64" muted playsInline />
          </div>

          {cameraError && <p className="mt-2 text-sm text-red-600">{cameraError}</p>}

          {!cameraReady && (
            <button
              type="button"
              onClick={() => {
                void startCamera();
              }}
              className="mt-3 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Aktifkan Kamera
            </button>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">Lokasi</p>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            {locationLoading && <p className="text-sm text-zinc-600">Mengambil lokasi...</p>}
            {!locationLoading && coordinates && (
              <div className="space-y-1 text-sm text-zinc-700">
                <p>
                  Latitude: <span className="font-medium">{coordinates.latitude.toFixed(6)}</span>
                </p>
                <p>
                  Longitude: <span className="font-medium">{coordinates.longitude.toFixed(6)}</span>
                </p>
              </div>
            )}
            {locationError && <p className="text-sm text-red-600">{locationError}</p>}
          </div>

          <button
            type="button"
            onClick={refreshLocation}
            className="mt-3 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Refresh Lokasi
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          void handleSubmit();
        }}
        disabled={!canSubmit}
        className="mt-5 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white enabled:hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        {isSubmitting ? "Menyimpan..." : "Absen Sekarang"}
      </button>

      {message && <p className="mt-3 text-sm text-emerald-700">{message}</p>}
      {submitError && <p className="mt-3 text-sm text-red-600">{submitError}</p>}
    </section>
  );
}
