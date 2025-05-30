import { useEffect, useRef } from 'react';
import { loadNaverMapsScript } from '@/lib/naverMaps';
import type { NaverMapOptions } from '@/types/naverMap';

interface useNaverMapProp {
  mapRef: React.RefObject<naver.maps.Map | null>;
  options: NaverMapOptions;
}

export const useNaverMap = ({ mapRef, options }: useNaverMapProp) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!containerRef.current || mapRef.current) return;

      try {
        await loadNaverMapsScript();
        const { center, ...restOptions } = options;
        mapRef.current = new naver.maps.Map(containerRef.current, {
          ...restOptions,
          center: center && new naver.maps.LatLng(center.lat, center.lng),
        });
      } catch (error) {
        console.error(error);
      }
    };

    initializeMap();

    return () => {
      mapRef.current = null;
    };
  }, [options, mapRef]);

  return containerRef;
};
