import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useFavoriteStore } from '@/stores/favoriteStore';

import type { MapRef } from '@/types/naverMap';
import { useMapStore } from '@/stores/mapStore';

interface useNaverMapFavoriteMarkersProps {
  mapRef: MapRef;
}

export const useNaverMapFavoriteMarkers = ({
  mapRef,
}: useNaverMapFavoriteMarkersProps) => {
  const { favoritePlaces, showFavoritePlaces } = useFavoriteStore(
    useShallow((state) => ({
      favoritePlaces: state.favoritePlaces,
      showFavoritePlaces: state.showFavoritePlaces,
    }))
  );
  const isMapInitialized = useMapStore((state) => state.isMapInitialized);
  const favoriteMarkersRef = useRef<Map<string, naver.maps.Marker>>(new Map());
  const showFavoritePlacesRef = useRef(showFavoritePlaces);

  useEffect(() => {
    showFavoritePlacesRef.current = showFavoritePlaces;
  }, [showFavoritePlaces]);

  useEffect(() => {
    if (!mapRef.current || !isMapInitialized) {
      return;
    }

    const mapInstance = mapRef.current;
    const favoriteMarkers = favoriteMarkersRef.current;

    const currentFavoritePlaceIds = new Set(
      favoritePlaces.map((place) => place.id)
    );
    const existingMarkerIds = new Set(favoriteMarkers.keys());

    existingMarkerIds.forEach((markerId) => {
      if (!currentFavoritePlaceIds.has(markerId)) {
        const marker = favoriteMarkers.get(markerId);
        if (marker) {
          marker.setMap(null);
          favoriteMarkers.delete(markerId);
        }
      }
    });

    favoritePlaces.forEach((favoritePlace) => {
      if (favoriteMarkers.has(favoritePlace.id)) {
        return;
      }

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
        visible: showFavoritePlacesRef.current,
      });

      favoriteMarkers.set(favoritePlace.id, marker);
    });
  }, [favoritePlaces, mapRef, isMapInitialized]);

  useEffect(() => {
    const favoriteMarkers = favoriteMarkersRef.current;

    favoriteMarkers.forEach((marker) => {
      marker.setVisible(showFavoritePlaces);
    });
  }, [showFavoritePlaces]);

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
