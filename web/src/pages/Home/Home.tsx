import { useState } from 'react';
import { useToggle } from '@/hooks/useToggle';
import RoundStar from '@/assets/icons/RoundStar.svg?react';
import Location from '@/assets/icons/Location.svg?react';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

export const Home: React.FC = () => {
  const [selectedLoaction, setSelectedLocation] = useState(false);
  const [showFavoritePlace, toggleShowFavoritePlace] = useToggle(false);
  const [isFavoritePlace, toggleFavoritePlace] = useToggle(false);

  const handleCurrentLocation = () => {
  }

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
        aria-disabled={selectedLoaction ? undefined : true}
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
