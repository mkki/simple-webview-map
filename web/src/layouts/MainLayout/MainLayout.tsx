import { useEffect, useMemo, useRef } from 'react';
import { useIsWebView } from '@/hooks/useIsWebView';
import { Outlet } from 'react-router-dom';
import { NaverMap } from '@/components/NaverMap/NaverMap';
import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';
import { handleWebViewMessage } from '@/lib/webViewMessage';

import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

export const MainLayout: React.FC = () => {
  const mapRef = useRef<naver.maps.Map | null>(null);
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

  return (
    <div className={cx('wrapper')}>
      <main className={cx('main')}>
        <NaverMap mapRef={mapRef} options={mapOptions} />
        <Outlet
          context={{
            mapRef,
          }}
        />
      </main>
      <BottomNavigation />
    </div>
  );
};
