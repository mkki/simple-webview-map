import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect, useRef } from 'react';
import {
  loadNaverMapsScript,
  searchCoordinateToAddress,
} from '@/lib/naverMaps';
import type { MapRef, NaverMapOptions, MarkerInfo } from '@/types/naverMap';
import { useIsWebView } from '@/hooks/useIsWebView';
import { useNaverMapFavoriteMarkers } from './useNaverMapFavoriteMarkers';
import { useMapStore } from '@/stores/mapStore';

interface useNaverMapProp {
  mapRef: MapRef;
  options: NaverMapOptions;
}

export const useNaverMap = ({ mapRef, options }: useNaverMapProp) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  const setMapInitialized = useMapStore((state) => state.setMapInitialized);
  const setCurrentMarker = useMapStore((state) => state.setCurrentMarker);

  const isWebView = useIsWebView();

  const handleMapClick = useCallback(
    async (e: naver.maps.PointerEvent) => {
      if (!mapRef.current) return;

      const lat = e.coord.y;
      const lng = e.coord.x;

      if (!markerRef.current) {
        const marker = new naver.maps.Marker({
          position: e.coord,
          map: mapRef.current,
          icon: {
            url: '/icons/Marker.svg',
            size: new naver.maps.Size(46, 46),
            anchor: new naver.maps.Point(23, 46),
            scaledSize: new naver.maps.Size(46, 46),
          },
        });

        markerRef.current = marker;
      } else {
        markerRef.current.setPosition(e.coord);
      }

      let address;

      try {
        const response = await searchCoordinateToAddress(lat, lng);
        const rawAddress = response.v2.address.roadAddress
          ? response.v2.address.roadAddress
          : response.v2.address.jibunAddress;
        address = rawAddress?.replace(/\s{2,}/g, ' ');
      } catch (error) {
        console.error('Failed to fetch address information:', error);
      }

      const markerInfo: MarkerInfo = {
        id: uuidv4(),
        coord: {
          lat,
          lng,
        },
        address,
      };

      setCurrentMarker(markerInfo);
    },
    [mapRef, setCurrentMarker]
  );

  useEffect(() => {
    const initializeMap = async () => {
      if (!containerRef.current || mapRef.current) return;

      try {
        await loadNaverMapsScript();

        if (typeof naver === 'undefined') {
          console.error('Naver Maps API is not loaded');
          return;
        }

        const { center, ...restOptions } = options;
        mapRef.current = new naver.maps.Map(containerRef.current, {
          ...restOptions,
          center: center && new naver.maps.LatLng(center.lat, center.lng),
        });

        naver.maps.Event.addListener(mapRef.current, 'click', handleMapClick);

        setMapInitialized(true);
        console.log('Map initialized successfully');

        if (isWebView) {
          window.ReactNativeWebView?.postMessage(
            JSON.stringify({
              type: 'GET_CURRENT_LOCATION',
            })
          );
        }
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    };

    initializeMap();

    return () => {
      if (mapRef.current) {
        naver.maps.Event.clearInstanceListeners(mapRef.current);
      }
    };
  }, [mapRef, options, isWebView, handleMapClick, setMapInitialized]);

  useNaverMapFavoriteMarkers({
    mapRef,
  });

  return containerRef;
};
