import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { NaverMap } from '@/components/NaverMap/NaverMap';
import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';

import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

export const MainLayout: React.FC = () => {
  const mapRef = useRef<naver.maps.Map | null>(null);

  const mapOptions = {
    zoom: 15,
  };

  return (
    <div className={cx('wrapper')}>
      <main className={cx('main')}>
        <NaverMap mapRef={mapRef} options={mapOptions} />
        <Outlet context={mapRef} />
      </main>
      <BottomNavigation />
    </div>
  );
};
