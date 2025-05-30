import { useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import Trash from '@/assets/icons/Trash.svg?react';

import type { MapOutletContextType } from '@/types/naverMap';

import styles from './FavoritePlaceList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const FavoritePlaceList: React.FC = () => {
  const { favoritePlaces, setFavoritePlaces } =
    useOutletContext<MapOutletContextType>();

  const handleClick = useCallback((id: string) => {
    /**
     * DELETE 요청으로 구현 필요
     */
    setFavoritePlaces((prev) => {
      return prev.filter((place) => place.id !== id);
    });
  }, [setFavoritePlaces]);

  return (
    <ul className={cx('favorite-place-list')}>
      {favoritePlaces.map((favoritePlace) => (
        <li key={favoritePlace.id} className={cx('favorite-place-item')}>
          <button type="button" className={cx('favorite-place-address')}>
            {favoritePlace.address}
          </button>
          <button
            type="button"
            className={cx('button-delete')}
            onClick={() => favoritePlace.id && handleClick(favoritePlace.id)}
          >
            <Trash aria-hidden="true" />
            <span className="blind">삭제</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
