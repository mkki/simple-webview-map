import { useState } from 'react';
import { useToggle } from '@/hooks/useToggle';
import { useIsWebView } from '@/hooks/useIsWebView';
import { useOutletContext } from 'react-router-dom';
import RoundStar from '@/assets/icons/RoundStar.svg?react';
import Location from '@/assets/icons/Location.svg?react';

import type { MapRef } from '@/types/naverMap';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { NAVER_MAPS } from '@/constants/naverMaps';

const cx = classNames.bind(styles);

export const Home: React.FC = () => {
  const mapRef = useOutletContext<MapRef>();
  const isWebView = useIsWebView();

  const [selectedLocation, setSelectedLocation] = useState(false);
  const [showFavoritePlace, toggleShowFavoritePlace] = useToggle(false);
  const [isFavoritePlace, toggleFavoritePlace] = useToggle(false);

  const handleCurrentLocation = () => {
    if (isWebView) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'GET_CURRENT_LOCATION',
        })
      );
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            mapRef.current?.setCenter(
              new naver.maps.LatLng(latitude, longitude)
            );
          },
          (error) => {
            console.error('위치 정보를 가져올 수 없습니다:', error);
          }
        );
      } else {
        console.error('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
      }

      mapRef.current?.setCenter(
        new naver.maps.LatLng(
          NAVER_MAPS.DEFAULT_CENTER.LAT,
          NAVER_MAPS.DEFAULT_CENTER.LNG
        )
      );
    }
  };

  return (
    <>
      <span
        role="checkbox"
        className={cx('toggle-favorite-place')}
        tabIndex={0}
        onClick={toggleShowFavoritePlace}
        aria-checked={showFavoritePlace}
      >
        <RoundStar aria-hidden="true" />
        즐겨찾기
      </span>

      <span
        role="checkbox"
        className={cx('toggle-favorite')}
        tabIndex={0}
        onClick={toggleFavoritePlace}
        aria-disabled={selectedLocation ? undefined : true}
        aria-checked={isFavoritePlace}
      >
        <RoundStar aria-hidden="true" />
        <span className="blind">선택된 위치 즐겨찾는 장소로 추가</span>
      </span>

      <button
        type="button"
        className={cx('button-current')}
        onClick={handleCurrentLocation}
      >
        <Location aria-hidden="true" />
        <span className="blind">현재 위치로 이동</span>
      </button>
    </>
  );
};
