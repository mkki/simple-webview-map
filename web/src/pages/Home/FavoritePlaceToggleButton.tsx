import RoundStar from '@/assets/icons/RoundStar.svg?react';
import { useFavoriteStore } from '@/stores/favoriteStore';

import classNames from 'classnames/bind';
import styles from './FavoritePlaceToggleButton.module.scss';

const cx = classNames.bind(styles);

export const FavoritePlaceToggleButton = () => {
  const showFavoritePlaces = useFavoriteStore((state) => state.showFavoritePlaces);
  const toggleShowFavoritePlaces = useFavoriteStore((state) => state.toggleShowFavoritePlaces);

  const handleClick = () => {
    toggleShowFavoritePlaces();
  };

  return (
    <span
      role="checkbox"
      className={cx('toggle-favorite-place')}
      tabIndex={0}
      onClick={handleClick}
      aria-checked={showFavoritePlaces}
    >
      <RoundStar aria-hidden="true" />
      즐겨찾기
    </span>
  );
};
