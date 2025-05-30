import { useEffect, useRef } from 'react';
import { loadNaverMapsScript } from '@/lib/naverMaps';
import type { MapRef, NaverMapOptions } from '@/types/naverMap';
import { useIsWebView } from '@/hooks/useIsWebView';

interface useNaverMapProp {
  mapRef: MapRef;
  options: NaverMapOptions;
}

export const useNaverMap = ({ mapRef, options }: useNaverMapProp) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isWebView = useIsWebView();

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

        if (isWebView) {
          window.ReactNativeWebView?.postMessage(JSON.stringify({
            type: 'NAVER_MAP_LOADED',
            payload: { ready: true, timestamp: Date.now() }
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    initializeMap();

    return () => {
      mapRef.current = null;
    };
  }, [mapRef, options, isWebView]);

  return containerRef;
};
