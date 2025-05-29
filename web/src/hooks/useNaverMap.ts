import { loadNaverMapsScript } from '@/lib/naverMaps';
import { useEffect, useRef } from 'react';

interface MapOptions {
  center?: { lat: number; lng: number };
  zoom?: number;
}

export const useNaverMap = (containerId: string, options: MapOptions) => {
  const mapRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadNaverMapsScript();

        if (mapRef.current) {
          return;
        }

        mapRef.current = new naver.maps.Map(containerId, {
          center: options?.center
            ? new naver.maps.LatLng(options.center.lat, options.center.lng)
            : new naver.maps.LatLng(37.5665, 126.978),
          zoom: options?.zoom ?? 14,
        });
      } catch (error) {
        console.error(error);
      }
    };

    initializeMap();
  }, [containerId, options]);

  return mapRef;
};
