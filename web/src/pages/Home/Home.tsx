import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CurrentLocationButton } from './CurrentLocationButton';
import { FavoriteToggleButton } from './FavoriteToggleButton';
import { FavoritePlaceToggleButton } from './FavoritePlaceToggleButton';

import type { MapOutletContextType } from '@/types/naverMap';

export const Home: React.FC = () => {
  const { mapRef, setShowFavoritePlaces } =
    useOutletContext<MapOutletContextType>();

  useEffect(() => {
    if (!mapRef?.current) return;
    mapRef.current?.setZoom(15);
  }, [mapRef]);

  useEffect(() => {
    setShowFavoritePlaces(false);
  }, [setShowFavoritePlaces]);

  return (
    <>
      <FavoritePlaceToggleButton />
      <FavoriteToggleButton />
      <CurrentLocationButton />
    </>
  );
};
