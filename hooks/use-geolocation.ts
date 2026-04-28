"use client";

import { useCallback, useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type UseGeoLocationResult = {
  coordinates: Coordinates | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => void;
};

export function useGeoLocation(): UseGeoLocationResult {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Geolocation tidak didukung di browser ini.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(false);
      },
      () => {
        setError("Gagal mendapatkan lokasi.");
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }, []);

  return {
    coordinates,
    isLoading,
    error,
    refreshLocation,
  };
}
