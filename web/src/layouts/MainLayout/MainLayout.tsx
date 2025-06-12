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
  const [showFavoritePlaces, setShowFavoritePlaces] = useState<boolean>(false);
  const isWebView = useIsWebView();

  const mapOptions = useMemo(() => ({ zoom: 15 }), []);

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

  useEffect(() => {
    fetch('/api/favorites')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        return response.json();
      })
      .then((data) => {
        setFavoritePlaces(data);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
      });
  }, []);

  return (
    <div className={cx('wrapper')}>
      <main className={cx('main')}>
        <NaverMap
          mapRef={mapRef}
          options={mapOptions}
          favoritePlaces={favoritePlaces}
          showFavoritePlaces={showFavoritePlaces}
          onAddMarker={setCurrentMarker}
        />
        <Outlet
          context={{
            mapRef,
            currentMarker,
            favoritePlaces,
            setFavoritePlaces,
            showFavoritePlaces,
            setShowFavoritePlaces,
          }}
        />
      </main>
      <BottomNavigation />
    </div>
  );
};
