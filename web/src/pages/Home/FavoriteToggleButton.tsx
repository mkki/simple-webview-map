import { useMemo } from 'react';
import RoundStar from '@/assets/icons/RoundStar.svg?react';
import { useMapStore } from '@/stores/mapStore';
import { useFavoriteStore } from '@/stores/favoriteStore';
import { useShallow } from 'zustand/react/shallow';
import { api } from '@/api/client';
import type { MarkerInfo } from '@/types/naverMap';

import classNames from 'classnames/bind';
import styles from './FavoriteToggleButton.module.scss';

const cx = classNames.bind(styles);

export const FavoriteToggleButton: React.FC = () => {
  const currentMarker = useMapStore((state) => state.currentMarker);

  const { favoritePlaces, addFavoritePlace, removeFavoritePlace } =
    useFavoriteStore(
      useShallow((state) => ({
        favoritePlaces: state.favoritePlaces,
        addFavoritePlace: state.addFavoritePlace,
        removeFavoritePlace: state.removeFavoritePlace,
      }))
    );

  const isCurrentPlaceFavorite = useMemo(
    () =>
      currentMarker && currentMarker.address
        ? favoritePlaces.some(
            (place) => place.address === currentMarker.address
          )
        : false,
    [currentMarker, favoritePlaces]
  );

  const handleToggleFavorite = async () => {
    if (!currentMarker || !currentMarker.address) return;

    try {
      if (isCurrentPlaceFavorite) {
        console.log('Removing from favorites');
        await api.delete(`/favorites/${currentMarker.address}`);
        removeFavoritePlace(currentMarker.address);
      } else {
        console.log('Adding to favorites');
        const newFavorite: MarkerInfo = await api.post('/favorites', {
          id: currentMarker.id,
          coord: currentMarker.coord,
          address: currentMarker.address,
        });
        addFavoritePlace(newFavorite);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <span
      role="checkbox"
      className={cx('toggle-favorite', {
        'is-favorite': isCurrentPlaceFavorite,
        'is-disabled': !currentMarker,
      })}
      tabIndex={currentMarker ? 0 : -1}
      onClick={handleToggleFavorite}
      aria-disabled={!currentMarker}
      aria-checked={isCurrentPlaceFavorite}
    >
      <RoundStar aria-hidden="true" />
      <span className="blind">즐겨찾는 장소</span>
    </span>
  );
};
