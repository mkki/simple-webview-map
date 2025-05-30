import { useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import RoundStar from '@/assets/icons/RoundStar.svg?react';
import type { MapOutletContextType } from '@/types/naverMap';

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

  const handleClick = useCallback(() => {
    if (!currentMarker) return;

    console.log('Toggle favorite places:', currentMarker);
    if (isCurrentPlaceFavorite) {
      console.log('Removing from favorites');
    } else {
      console.log('Adding to favorites');
    }

    setFavoritePlaces((prev) => {
      if (isCurrentPlaceFavorite) {
        return prev.filter((place) => place.id !== currentMarker.id);
      } else {
        return [...prev, currentMarker];
      }
    });
  }, [currentMarker, setFavoritePlaces, isCurrentPlaceFavorite]);

  return (
    <span
      role="checkbox"
      className={cx('toggle-favorite', {
        'is-favorite': isCurrentPlaceFavorite,
        'is-disabled': !currentMarker,
      })}
      tabIndex={currentMarker ? 0 : -1}
      onClick={handleClick}
      aria-disabled={!currentMarker}
      aria-checked={isCurrentPlaceFavorite}
    >
      <RoundStar aria-hidden="true" />
      <span className="blind">즐겨찾는 장소</span>
    </span>
  );
};
