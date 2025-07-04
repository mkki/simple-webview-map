import { useNaverMap } from '@/hooks/useNaverMap';
import type { MapRef, NaverMapOptions } from '@/types/naverMap';

import classNames from 'classnames/bind';
import styles from './NaverMap.module.scss';

const cx = classNames.bind(styles);

interface NaverMapProps {
  mapRef: MapRef;
  options: NaverMapOptions;
}

export const NaverMap: React.FC<NaverMapProps> = ({ mapRef, options }) => {
  const containerRef = useNaverMap({
    mapRef,
    options,
  });

  return <div ref={containerRef} className={cx('naver-map')}></div>;
};
