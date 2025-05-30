import { useEffect, useMemo, useRef, useState } from 'react';
import { useIsWebView } from '@/hooks/useIsWebView';
import { Outlet } from 'react-router-dom';
import { NaverMap } from '@/components/NaverMap/NaverMap';
import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';
import { handleWebViewMessage } from '@/lib/webViewMessage';
import type { MarkerInfo } from '@/types/naverMap';

import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

export const MainLayout: React.FC = () => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [favoritePlaces, setFavoritePlaces] = useState<MarkerInfo[]>([]);
  const [currentMarker, setCurrentMarker] = useState<MarkerInfo | null>(null);
  const mapOptions = useMemo(() => ({ zoom: 15 }), []);
  const isWebView = useIsWebView();

  useEffect(() => {
    if (!isWebView) return;

    const listener = (event: MessageEvent) =>
      handleWebViewMessage(event, mapRef);
    window.addEventListener('message', listener);

    window.receiveMessageFromApp = (message: string) => {
      listener({ data: message } as MessageEvent);
    };

    return () => {
      window.removeEventListener('message', listener);
      delete window.receiveMessageFromApp;
    };
  }, [isWebView]);

  return (
    <div className={cx('wrapper')}>
      <main className={cx('main')}>
        <span style={{ position: 'absolute', top: '40px', zIndex: 100, backgroundColor: 'white', padding: '4px' }}>
          즐겨찾기: {favoritePlaces.map(place => place.address).join('\n') || '없음'}
        </span>
        <span style={{ position: 'absolute', zIndex: 100 }}>
          {currentMarker ? '마커 있음' : '마커 없음'}
        </span>
        <NaverMap
          mapRef={mapRef}
          options={mapOptions}
          onAddMarker={setCurrentMarker}
        />
        <Outlet
          context={{ mapRef, currentMarker, favoritePlaces, setFavoritePlaces }}
        />
      </main>
      <BottomNavigation />
    </div>
  );
};
