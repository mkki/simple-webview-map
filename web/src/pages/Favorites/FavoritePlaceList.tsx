import { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Trash from '@/assets/icons/Trash.svg?react';
import { useFavoriteStore } from '@/stores/favoriteStore';
import { useShallow } from 'zustand/react/shallow';
import { api } from '@/api/client';

import type { MapOutletContextType } from '@/types/naverMap';

import styles from './FavoritePlaceList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const FavoritePlaceList: React.FC = () => {
  const { mapRef } = useOutletContext<MapOutletContextType>();

  const { favoritePlaces, removeFavoritePlace, setShowFavoritePlaces } =
    useFavoriteStore(
      useShallow((state) => ({
        favoritePlaces: state.favoritePlaces,
        removeFavoritePlace: state.removeFavoritePlace,
        setShowFavoritePlaces: state.setShowFavoritePlaces,
      }))
    );
  const FavoritePlaceListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (favoritePlaces.length > 0 && mapRef?.current) {
      const firstPlace = favoritePlaces[0];
      if (firstPlace?.coord?.lat && firstPlace?.coord.lng) {
        mapRef.current.setCenter(
          new naver.maps.LatLng(firstPlace.coord.lat, firstPlace.coord.lng)
        );
        mapRef.current.setZoom(15);
        const panOffset =
          Number(FavoritePlaceListRef.current?.getBoundingClientRect().top) ||
          0;
        console.log('panOffset:', panOffset);
        mapRef.current.panBy(new naver.maps.Point(0, panOffset));
      }
    }
  }, [mapRef, favoritePlaces]);

  useEffect(() => {
    setShowFavoritePlaces(true);
  }, [setShowFavoritePlaces]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/favorites/${id}`);
      removeFavoritePlace(id);
    } catch (error) {
      console.error('Failed to delete favorite:', error);
    }
  };

  return (
    <ul ref={FavoritePlaceListRef} className={cx('favorite-place-list')}>
      {favoritePlaces.map((favoritePlace) => (
        <li key={favoritePlace.id} className={cx('favorite-place-item')}>
          <button type="button" className={cx('favorite-place-address')}>
            {favoritePlace.address}
          </button>
          <button
            type="button"
            className={cx('button-delete')}
            onClick={() => favoritePlace.id && handleDelete(favoritePlace.id)}
          >
            <Trash aria-hidden="true" />
            <span className="blind">삭제</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
