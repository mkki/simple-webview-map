import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '@/api/client';
import RoundStar from '@/assets/icons/RoundStar.svg?react';
import type { MapOutletContextType, MarkerInfo } from '@/types/naverMap';

import classNames from 'classnames/bind';
import styles from './FavoriteToggleButton.module.scss';

const cx = classNames.bind(styles);

export const FavoriteToggleButton: React.FC = () => {
  const { currentMarker, favoritePlaces, setFavoritePlaces } =
    useOutletContext<MapOutletContextType>();

  const isCurrentPlaceFavorite = useMemo(
    () =>
      currentMarker
        ? favoritePlaces.some((place) => place.id === currentMarker.id)
        : false,
    [currentMarker, favoritePlaces]
  );

  const handleToggleFavorite = async () => {
    if (!currentMarker) return;

    try {
      if (isCurrentPlaceFavorite) {
        console.log('Removing from favorites');
        await api.delete(`/favorites/${currentMarker.id}`);
        setFavoritePlaces((previous) =>
          previous.filter((place) => place.id !== currentMarker.id)
        );
      } else {
        console.log('Adding to favorites');
        const newFavorite: MarkerInfo = await api.post('/favorites', {
          id: currentMarker.id,
          coord: currentMarker.coord,
          address: currentMarker.address,
        });
        setFavoritePlaces((previous) => [...previous, newFavorite]);
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
