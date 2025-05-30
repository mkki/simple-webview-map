import { useNaverMap } from '@/hooks/useNaverMap';
import type { MapRef, NaverMapOptions, MarkerInfo } from '@/types/naverMap';

import classNames from 'classnames/bind';
import styles from './NaverMap.module.scss';

const cx = classNames.bind(styles);

interface NaverMapProps {
  mapRef: MapRef;
  options: NaverMapOptions;
  onAddMarker: (markerInfo: MarkerInfo | null) => void;
}

export const NaverMap: React.FC<NaverMapProps> = ({ mapRef, options, onAddMarker  }) => {
  const containerRef = useNaverMap({ mapRef, options, onAddMarker });

  return <div ref={containerRef} className={cx('naver-map')}></div>;
};
