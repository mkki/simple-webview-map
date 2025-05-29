import { useNaverMap } from '@/hooks/useNaverMap';
import classNames from 'classnames/bind';
import styles from './NaverMap.module.scss';

const cx = classNames.bind(styles);

export const NaverMap: React.FC = () => {
  const mapRef = useNaverMap('naver-map', {
    center: { lat: 37.5665, lng: 126.978 },
    zoom: 14,
  });

  return <div id="naver-map" className={cx('naver-map')}></div>;
};
