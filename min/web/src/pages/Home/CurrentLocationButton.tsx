import { useOutletContext } from 'react-router-dom';
import { useIsWebView } from '@/hooks/useIsWebView';
import Location from '@/assets/icons/Location.svg?react';
import { NAVER_MAPS } from '@/constants/naverMaps';

import type { MapOutletContextType } from '@/types/naverMap';

import classNames from 'classnames/bind';
import styles from './CurrentLocationButton.module.scss';

const cx = classNames.bind(styles);

export const CurrentLocationButton: React.FC = () => {
  const { mapRef } = useOutletContext<MapOutletContextType>();
  const isWebView = useIsWebView();

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
    <button
      type="button"
      className={cx('button-current')}
      onClick={handleCurrentLocation}
    >
      <Location aria-hidden="true" />
      <span className="blind">현재 위치로 이동</span>
    </button>
  );
};
