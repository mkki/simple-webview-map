import { useEffect, useRef } from 'react';

import type { MapRef, MarkerInfo } from '@/types/naverMap';

interface useNaverMapFavoriteMarkersProps {
  mapRef: MapRef;
  isMapInitialized: boolean;
  favoritePlaces: MarkerInfo[];
  showFavoritePlaces: boolean;
}

export const useNaverMapFavoriteMarkers = ({
  mapRef,
  isMapInitialized,
  favoritePlaces,
  showFavoritePlaces,
}: useNaverMapFavoriteMarkersProps) => {
  const favoriteMarkersRef = useRef<Map<string, naver.maps.Marker>>(new Map());

  useEffect(() => {
    if (!mapRef.current || !isMapInitialized) {
      return;
    }

    const mapInstance = mapRef.current;
    const favoriteMarkers = favoriteMarkersRef.current;

    favoriteMarkers.forEach((marker) => {
      marker.setMap(null);
    });
    favoriteMarkers.clear();

    if (showFavoritePlaces) {
      favoritePlaces.forEach((favoritePlace) => {
        if (!favoritePlace.id) return;

        console.log('Creating marker for:', favoritePlace);
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            favoritePlace.coord.lat,
            favoritePlace.coord.lng
          ),
          map: mapInstance,
          icon: {
            url: '/icons/RoundStar.svg',
            size: new naver.maps.Size(16, 16),
            anchor: new naver.maps.Point(8, 16),
            scaledSize: new naver.maps.Size(16, 16),
          },
        });

        favoriteMarkers.set(favoritePlace.id, marker);
      });
    }
  }, [favoritePlaces, showFavoritePlaces, mapRef, isMapInitialized]);

  useEffect(() => {
    const favoriteMarkers = favoriteMarkersRef.current;
    return () => {
      favoriteMarkers.forEach((marker) => {
        marker.setMap(null);
      });
      favoriteMarkers.clear();
    };
  }, []);
};
